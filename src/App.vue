<template>
  <v-app>
    <NavBar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import NavBar from './components/templates/NavBar.vue';
import { RouteConfig, Route } from 'vue-router';

@Component({
  name: 'App',
  components: {
    NavBar,
  },
})
export default class App extends Vue {
  private isSigned: boolean = false;

  @Watch('$route')
  private onRouteChanged(route: Route) {
    const requiresAuth = route.matched.some((record) => record.meta.requiresAuth);
    // requiresAuthが必要なページであればログイン済みとする。
    // Firebaseにアクセスしてログイン状態を判定する方法も考えられるが、
    // 通信が気になるのでアプリケーション内で完結させたい。
    this.isSigned = requiresAuth;
  }
}
</script>
