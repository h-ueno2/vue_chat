<template>
  <v-card class="pa-10 ma-10">
    <v-card-subtitle
      v-if="errorMessage!=''"
      class="red--text">
      {{errorMessage}}
    </v-card-subtitle>
    <v-form 
      ref="form"
      v-model="valid"
      lazy-validation>

      <v-text-field
        v-model="username"
        label="E-mail"
        :rules="MailRules"
        required
        outlined></v-text-field>

      <v-text-field
        class="ma-0"
        v-model="password"
        label="Password"
        :rules="passwordRules"
        required
        outlined></v-text-field>
      <v-btn
        rounded
        outlined
        color="primary"
        @click="signin">ログイン</v-btn>
      <v-card-text>
        アカウントを新規作成しますか？
        <router-link to="/signup">sign up now!!</router-link>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import firebase from 'firebase';
import MixinValid from '../components/mixins/MixinValid';

@Component
export default class Signin extends Mixins(MixinValid) {
  private username: string = '';
  private password: string = '';
  private valid: boolean = true;
  private errorMessage: string = '';

  public signin() {
    if (!this.validate()) {
      return;
    }

    firebase.auth().signInWithEmailAndPassword(this.username, this.password)
      .then((user) => {
        this.errorMessage = '';
        this.$router.push('/');
      }, (err) => {
        this.errorMessage = 'E-mail、Passwordの入力に誤りがあるか登録されていません。';
      });
  }
}
</script>
