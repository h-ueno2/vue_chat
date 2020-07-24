<template>
  <div class="home">
    <Chat/>
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from '@/components/templates/Chat.vue';

export default {
  name: 'Home',
  components: {
    Chat,
  },
};
</script>
