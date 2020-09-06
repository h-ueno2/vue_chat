<template>
  <v-card class="pa-10 ma-10">
    <ErrorMessageText
      :text="errorMessage" />
    <v-form 
      ref="form"
      v-model="valid"
      lazy-validation>

      <BaseTextField
        v-model="name"
        label="name"
        :rules="[requiredRules]"></BaseTextField>

      <BaseTextField
        v-model="email"
        label="E-mail"
        :rules="[requiredRules,emailRules]">
      </BaseTextField>

      <PasswordField
        class="ma-0"
        v-model="password"
        label="Password"
        :rules="[requiredRules]">
      </PasswordField>

      <PasswordField
        class="ma-0"
        v-model="passwordConfirmation"
        label="Password確認"
        :rules="[requiredRules,passwordConfirmationRule]">
      </PasswordField>

      <v-btn
        rounded
        outlined
        color="primary"
        :disabled="isClicked"
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
import UserAccess from '@/modules/access/UserAccess';
import Auth from '@/modules/access/Auth';
import { RoutePath } from '@/router/RoutePath';
import MixinValid from '@/components/mixins/MixinValid';
import BaseTextField from '@/components/atoms/BaseTextField.vue';
import PasswordField from '@/components/atoms/PasswordField.vue';
import ErrorMessageText from '@/components/atoms/ErrorMessageText.vue';

@Component({
  name: 'SignupForm',
  components: {
    BaseTextField,
    PasswordField,
    ErrorMessageText,
  },
})
export default class Signup extends Mixins(MixinValid) {
  public name: string = '';
  public email: string = '';
  public password: string = '';
  public passwordConfirmation: string = '';
  public valid: boolean = false;
  private errorMessage: string = '';
  private isClicked: boolean = false;

  get passwordConfirmationRule() {
    return this.password === this.passwordConfirmation || 'Passwordと異なります。';
  }

  public signup() {
    this.isClicked = true;

    if (!this.validate()) {
      this.isClicked = false;
      return;
    }

    Auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        const newUser = Auth.getCurrentUser();
        if (!newUser) {
          return;
        }
        newUser.updateProfile({
          displayName: this.name,
        });
        this.writeUserData(newUser.uid, this.name, newUser.email || '');
        this.$router.push(RoutePath.ROUNGE);
      })
      .catch((error) => {
        this.isClicked = false;
        this.errorMessage = '入力されたE-mail, Passwordでは登録できません。';
      });
  }

  /**
   * Realtime DatabaseにUserデータを格納します。
   */
  public writeUserData(uid: string, name: string, email: string) {
    UserAccess.createUser(uid, name, email);
  }
}
</script>
