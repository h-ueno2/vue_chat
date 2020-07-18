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
        <v-btn>登録</v-btn>
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

@Component
export default class Signin extends Vue {
  public username: string = '';
  public password: string = '';
  public valid: boolean = false;
}
</script>
