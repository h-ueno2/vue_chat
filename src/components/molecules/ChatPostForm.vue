<template>
  <v-container>
    <v-flex>
      <v-row>
        <v-col
          cols="9">
          <BaseTextField
            v-model="localValue"
            label="メッセージ">
          </BaseTextField>
        </v-col>
        <v-col
          cols="3">
          <v-btn
            :disabled="!isInputed"
            @click="send"
            rounded
            outlined="">
            送信
          </v-btn>
        </v-col>
      </v-row>
    </v-flex>
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

  private get isInputed(): boolean {
    return this.value.length > 0;
  }

  private get localValue(): string {
    return this.value;
  }

  private set localValue(value: string) {
    this.input(value);
  }
}
</script>

