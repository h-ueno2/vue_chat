<template>
  <v-app>
    <NavBar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import NavBar from './components/NavBar.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld,
    NavBar,
  },
  data: () => ({
    //
  }),
});
</script>
