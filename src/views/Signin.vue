<template>
  <v-form v-model="valid">
    <v-container fill-hegiht>
      <v-row>
        <v-text-field
          v-model="username"
          lavel="e-mailアドレスを入力してください"
          required></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="password"
          lavel="passwordを入力してください"
          required></v-text-field>
      </v-row>
      <v-row>
        <v-btn @click="signin">ログイン</v-btn>
      </v-row>
      <v-row>
        アカウントを新規作成しますか？
      <router-link to="/signup">sign up now!!</router-link>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

@Component
export default class Signin extends Vue {
  public username: string = '';
  public password: string = '';
  public valid: boolean = false;

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
