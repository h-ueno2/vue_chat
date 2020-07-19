<template>
  <v-container>
    <SignupForm/>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SignupForm from '../components/molecules/SignupForm.vue';

@Component({
  name: 'Signup',
  components: {
    SignupForm,
  },
})
export default class Signin extends Vue {}
</script>
