<template>
  <div class="home">
    <div v-if="hasRoom">
      <Chat :roomCd="roomCd"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Chat from '@/components/templates/Chat.vue';

@Component({
  name: 'ChatRoom',
  components: {
    Chat,
  },
})
export default class ChatRoom extends Vue {
  private roomCd!: string;

  get hasRoom(): boolean {
    return this.roomCd !== '';
  }

  public created() {
    this.roomCd = this.$route.params.roomCd;
  }
}
</script>
