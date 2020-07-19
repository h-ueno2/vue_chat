<template>
  <v-card class="pa-10 ma-10">
    <v-form 
      ref="form"
      v-model="valid"
      lazy-validation>
      <v-text-field
        v-model="username"
        label="E-mail"
        required
        outlined></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        required
        outlined></v-text-field>
      <v-btn @click="signin">ログイン</v-btn>
      <v-card-text>
        アカウントを新規作成しますか？
        <router-link to="/signup">sign up now!!</router-link>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import VForm from '@/modlues/VForm.vue';

@Component
export default class Signin extends Vue {
  public username: string = '';
  public password: string = '';
  public valid: boolean = true;

  get form(): VForm {
    return (this.$refs as any).form;
  }

  public signin() {
    firebase.auth().signInWithEmailAndPassword(this.username, this.password)
      .then((user) => {
        this.$router.push('/');
      }, (err) => {
        alert('error');
      });
  }
}
</script>
