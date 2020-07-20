<template>
  <v-btn
    rounded
    outlined
    coloer="white"
    @click="signout">
    SignOut
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

@Component({
  name: 'SignoutBtn',
})
export default class SignoutBtn extends Vue {
  public signout() {
    firebase.auth().signOut().then(() => {
        this.$router.push('/signin');
      });
  }
}
</script>
