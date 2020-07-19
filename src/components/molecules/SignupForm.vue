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

      <PasswordField
        class="ma-0"
        v-model="password"
        label="Password"
        :rules="passwordRules"></PasswordField>

      <v-btn
        rounded
        outlined
        color="primary"
        @click="signup">登録</v-btn>

      <v-card-text>
        既にアカウントを持っていますか？
        <router-link to="/signin">sign in now!!</router-link>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import firebase from 'firebase';
import MixinValid from '../mixins/MixinValid';
import BaseTextField from '../atoms/BaseTextField.vue';
import PasswordField from '../atoms/PasswordField.vue';

@Component({
  name: 'SignupForm',
  components: {
    BaseTextField,
    PasswordField,
  },
})
export default class Signup extends Mixins(MixinValid) {
  public username: string = '';
  public password: string = '';
  public valid: boolean = false;
  private errorMessage: string = '';

  public signup() {
    if (!this.validate()) {
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
      .then((user) => {
        this.$router.push('/');
      })
      .catch((error) => {
        this.errorMessage = '入力されたE-mail, Passwordでは登録できません。';
      });
  }
}
</script>
