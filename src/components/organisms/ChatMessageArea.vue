<template>
  <v-container>
    <v-timeline
      dense>
      <v-timeline-item
        v-for="message in messages"
        :key="message.key"
        fill-dot=""
        small>
        <ChatDispMessage
          :message="message"
          :currentUserUid="currentUserUid"
          />
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Message } from '@/modules/type';
import ChatDispMessage from '@/components/molecules/ChatDispMessage.vue';


@Component({
  name: 'ChatMessageArea',
  components: {
    ChatDispMessage,
  },
})
export default class ChatMessageArea extends Vue {
  @Prop({default: () => {}})
  public messages?: Message[];

  @Prop({default: ''})
  public currentUserUid?: string;
}
</script>

