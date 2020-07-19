<template>
  <v-text-field
    v-model="localValue"
    :label="label"
    :rules="rules"
    :type="type"
    :append-icon="appendIcon"
    @click="$emit('click')"
    @click:append="$emit('click:append')"
    outlined>
  </v-text-field>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'BaseTextField',
})
export default class BaseTextFiled extends Vue {
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

<style>

</style>
