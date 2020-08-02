<template>
  <v-container>
    <div
      class="text-h3 d-flex align-center justify-center">
      Signup
    </div>
    <SignupForm/>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SignupForm from '@/components/organisms/SignupForm.vue';

@Component({
  name: 'Signup',
  components: {
    SignupForm,
  },
})
export default class Signin extends Vue {}
</script>
