<template>
  <v-card
    class="lighten-4"
    :class="messageColor">
    <v-card-text
      class="pt-1 pb-0">
      {{ message.name }}
    </v-card-text>
    <v-card-text
      class="pt-0 pb-1">
      {{ message.text }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Message } from '@/modules/type';

@Component({
  name: 'ChatDispMessage',
})
export default class ChatDispMessage extends Vue {
  @Prop({required: true})
  public message!: Message;

  @Prop({default: ''})
  public currentUserUid?: string;

  get isCurrentUserMessage(): boolean {
    return this.currentUserUid === this.message.userUid;
  }

  get messageColor(): string {
    return this.isCurrentUserMessage ? 'light-green' : 'light-blue';
  }
}
</script>

