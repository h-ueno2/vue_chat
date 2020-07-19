<template>
  <v-container>
    <SigninForm/>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import SigninForm from '../components/molecules/SigninForm.vue';

@Component({
  components: {
    SigninForm,
  },
})
export default class Signin extends Vue {}
</script>
