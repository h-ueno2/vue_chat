<template>
  <v-container>
    <v-layout class="align-center">
      <v-flex xs10
        class="ma-2">
        <v-textarea
          v-model="localValue"
          label="メッセージ"
          :outlined="true"
          :auto-grow="true"
          :hide-details="true"
          :row-height="14"
          :rows="1">
        </v-textarea>
      </v-flex>
      <v-flex xs2>
        <v-btn
          :disabled="!isInputed"
          @click="send"
          color="primary"
          rounded
          block
          outlined>
          送信
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import BaseTextField from '@/components/atoms/BaseTextField.vue';

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

<style lang="scss" scoped>
.v-text-field .v-input__control {
  vertical-align: middle;
}
</style>
