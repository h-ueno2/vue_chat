import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import firebase from 'firebase';

Vue.config.productionTip = false;

// Your web app's Firebase configurationß
const firebaseConfig = {
  apiKey: 'AIzaSyB239gyetB31syginKbw9-e9jSykcw40Fs',
  authDomain: 'my-chat-3b9fe.firebaseapp.com',
  databaseURL: 'https://my-chat-3b9fe.firebaseio.com',
  projectId: 'my-chat-3b9fe',
  storageBucket: 'my-chat-3b9fe.appspot.com',
  messagingSenderId: '1091242592496',
  appId: '1:1091242592496:web:32237a111760df05a65a35',
  measurementId: 'G-V104TV8LMT',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
