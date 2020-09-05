<template>
  <v-card class="pa-10 ma-10">
    <ErrorMessageText
      :text="errorMessage" />
    <v-form 
      ref="form"
      v-model="valid"
      lazy-validation>

      <BaseTextField
        v-model="email"
        label="E-mail"
        :rules="[requiredRules,emailRules]"></BaseTextField>

      <PasswordField
        class="ma-0"
        v-model="password"
        label="Password"
        :rules="[requiredRules]"></PasswordField>

      <v-btn
        rounded
        outlined
        color="primary"
        :disabled="isClicked"
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
import Auth from '@/modules/access/Auth';
import { RoutePath } from '@/router/RoutePath';
import MixinValid from '@/components/mixins/MixinValid';
import BaseTextField from '@/components/atoms/BaseTextField.vue';
import PasswordField from '@/components/atoms/PasswordField.vue';
import ErrorMessageText from '@/components/atoms/ErrorMessageText.vue';

@Component({
  name: 'SigninForm',
  components: {
    BaseTextField,
    PasswordField,
    ErrorMessageText,
  },
})
export default class SigninForm extends Mixins(MixinValid) {
  private email: string = '';
  private password: string = '';
  private valid: boolean = true;
  private errorMessage: string = '';
  private isClicked: boolean = false;

  public signin() {
    this.isClicked = true;

    if (!this.validate()) {
      this.isClicked = false;
      return;
    }

    Auth.signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.errorMessage = '';
        this.$router.push(RoutePath.ROUNGE);
      }, (err) => {
        this.isClicked = false;
        this.errorMessage = 'E-mail、Passwordの入力に誤りがあるか登録されていません。';
      });
  }
}
</script>
