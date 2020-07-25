<template>
  <v-container>
    <transition-group>
      <section v-for="message in messages" :key="message.key">
        <ChatDispMessage
          :message="message"
          />
      </section>
    </transition-group>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Message } from '../../modules/Message';
import ChatDispMessage from './ChatDispMessage.vue';


@Component({
  name: 'ChatMessageArea',
  components: {
    ChatDispMessage,
  },
})
export default class ChatMessageArea extends Vue {
  @Prop({default: () => {}})
  public messages?: Message[];
}
</script>

