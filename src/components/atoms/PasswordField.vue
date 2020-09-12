<template>
  <BaseTextField
    v-model="localValue"
    :label="label"
    :rules="rules"
    :type="showPassword ? 'text' : 'password'"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click="$emit('click')"
    @click:append="showPassword = !showPassword"
    outlined>
  </BaseTextField>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import BaseTextField from './BaseTextField.vue';

@Component({
  name: 'PasswordField',
  components: {
    BaseTextField,
  },
})
export default class PasswordField extends Vue {
  @Prop()
  public value!: string;

  @Prop({default: ''})
  public label?: string;

  @Prop({default: []})
  public rules?: any;

  @Prop({default: 'text'})
  public type?: string;

  @Prop({default: ''})
  public appendIcon?: string;

  private showPassword: boolean = false;

  @Emit()
  public input(value: string) {}

  private get localValue(): string {
    return this.value;
  }

  private set localValue(value: string) {
    this.input(value);
  }
}
</script>
