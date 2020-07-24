<template>
  <div class="home">
    <Chat/>
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from '@/components/molecules/Chat.vue';

export default {
  name: 'Home',
  components: {
    Chat,
  },
};
</script>
