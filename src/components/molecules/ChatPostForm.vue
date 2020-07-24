<template>
  <v-container>
    <v-form>
      <BaseTextField
        v-model="localValue"
        label="メッセージ">
      </BaseTextField>
      <v-btn
        @click="send">
        送信
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import BaseTextField from '../atoms/BaseTextField.vue';

@Component({
  name: 'ChatPostForm',
  components: {
    BaseTextField,
  },
})
export default class ChatPostForm extends Vue {
  @Prop()
  public value!: string;

  @Emit()
  public input(value: string) {}

  @Emit()
  public send() {}

  private get localValue(): string {
    return this.value;
  }

  private set localValue(value: string) {
    this.input(value);
  }
}
</script>

