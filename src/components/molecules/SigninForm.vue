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

      <BaseTextField
        v-model="username"
        label="E-mail"
        :rules="MailRules"></BaseTextField>

      <v-text-field
        class="ma-0"
        v-model="password"
        label="Password"
        :rules="passwordRules"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
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
import MixinValid from '../mixins/MixinValid';
import BaseTextField from '../atoms/BaseTextField.vue';

@Component({
  name: 'SigninForm',
  components: {
    BaseTextField,
  },
})
export default class SigninForm extends Mixins(MixinValid) {
  private username: string = '';
  private password: string = '';
  private valid: boolean = true;
  private errorMessage: string = '';
  private showPassword: boolean = false;

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
