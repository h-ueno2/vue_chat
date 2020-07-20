<template>
  <v-container>
    <div
      class="text-h3 d-flex align-center justify-center">
      Signin
    </div>
    <SigninForm/>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SigninForm from '../components/molecules/SigninForm.vue';

@Component({
  name: 'Signin',
  components: {
    SigninForm,
  },
})
export default class Signin extends Vue {}
</script>
