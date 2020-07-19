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
        @click="signin">ログイン</v-btn>
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
  private username: string = '';
  private password: string = '';
  private valid: boolean = true;
  private errorMessage: string = '';
  private MailRules: any = [
    (v: any) => !!v || 'E-mailを入力してください',
    (v: any) => /.+@.+\..+/.test(v)　|| 'E-mailの形式ではありません',
  ];
  private passwordRules: any = [
    (v: any) => !!v || 'Passwordを入力してください',
  ];

  get refs(): any {
    return this.$refs as any;
  }

  public signin() {
    if (!this.refs.form.validate()) {
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
