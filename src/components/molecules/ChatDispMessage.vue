<template>
  <v-container>
    {{ message.name }}, {{ message.text }}
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Message } from '../../modules/Message';

@Component({
  name: 'ChatDispMessage',
})
export default class ChatDispMessage extends Vue {
  @Prop({required: true})
  public message!: Message;
}
</script>

