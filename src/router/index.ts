import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import ChatRoom from '@/components/pages/ChatRoom.vue';
import Signup from '@/components/pages/Signup.vue';
import Signin from '@/components/pages/Signin.vue';
import UserUpdate from '@/components/pages/UserUpdate.vue';
import Rounge from '@/components/pages/Rounge.vue';
import firebase from 'firebase';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '*',
    redirect: 'signin',
  },
  {
    path: '/room/:roomCd',
    name: 'Room',
    component: ChatRoom,
    meta: { requiresAuth: true },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/userUpdate',
    name: 'UserUpdate',
    component: UserUpdate,
  },
  {
    path: '/',
    name: 'Rounge',
    component: Rounge,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath },
        });
      }
    });
  } else {
    next(); // next() を常に呼び出すようにしてください!
  }
});
export default router;
