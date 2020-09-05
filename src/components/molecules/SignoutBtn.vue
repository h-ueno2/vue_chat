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
import Auth from '@/modules/access/Auth';

@Component({
  name: 'SignoutBtn',
})
export default class SignoutBtn extends Vue {
  @Prop({default: false})
  public isSigned?: boolean;

  public signout() {
    Auth.signOut().then(() => {
        this.$router.push('/signin');
    });
  }
}
</script>
