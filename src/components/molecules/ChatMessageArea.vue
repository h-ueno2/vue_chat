<template>
  <v-container>
    <transition-group>
      <section v-for="{ key, name, text } in messages" :key="key">
        {{ name }}, {{ text }}
      </section>
    </transition-group>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Message } from '../../modules/Message';


@Component({
  name: 'ChatMessageArea',
})
export default class ChatMessageArea extends Vue {
  @Prop({default: () => {}})
  public messages?: Message[];
}
</script>

