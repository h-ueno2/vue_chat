<template>
  <v-btn
    v-if="isSigned"
    rounded
    outlined
    coloer="white"
    @click="signout">
    SignOut
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

@Component({
  name: 'SignoutBtn',
})
export default class SignoutBtn extends Vue {
  @Prop({default: true})
  public isSigned?: boolean;

  public signout() {
    firebase.auth().signOut().then(() => {
        this.$router.push('/signin');
      });
  }
}
</script>
