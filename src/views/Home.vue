<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    まだ何もないよ！
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/templates/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
