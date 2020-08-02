<template>
  <v-card-subtitle
    v-if="text!=''"
    class="red--text">
    {{text}}
  </v-card-subtitle>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'ErrorMessageText',
})
export default class ErrorMessageText extends Vue {
  @Prop({default: ''})
  public text?: string;
}
</script>

<style>

</style>
