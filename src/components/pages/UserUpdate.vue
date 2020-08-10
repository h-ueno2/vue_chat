<template>
  <v-container>
    <div
      class="text-h3 d-flex align-center justify-center">
      ユーザー情報の作成
    </div>
    <v-card class="pa-10 ma-10">
      <ErrorMessageText
        :text="errorMessage" />
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent=""
        lazy-validation>

        <BaseTextField
          v-model="name"
          label="name"
          :rules="[requiredRules]"></BaseTextField>

        <v-btn
          rounded
          outlined
          color="primary"
          :disabled="isClicked"
          @click="update">更新</v-btn>
      </v-form>

    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import firebase from 'firebase';
import MixinValid from '@/components/mixins/MixinValid';
import BaseTextField from '@/components/atoms/BaseTextField.vue';
import ErrorMessageText from '@/components/atoms/ErrorMessageText.vue';

@Component({
  name: 'UserUpdate',
  components: {
    BaseTextField,
    ErrorMessageText,
  },
})
export default class UserUpdate extends Mixins(MixinValid) {
  public name: string = '';
  public valid: boolean = false;
  private user?: firebase.User | null;
  private errorMessage: string = '';
  private isClicked: boolean = false;

  public created() {
    this.user = firebase.auth().currentUser;
  }

  public update() {
    if (!this.validate()) {
      return;
    }

    if (!this.user) {
      return;
    }

    this.isClicked = true;

    this.user.updateProfile({
      displayName: this.name,
    }).then(() => {
      this.$router.push('/');
    }).catch((error) => {
      this.isClicked = false;
      this.errorMessage = '更新に失敗しました。';
    });
  }
}
</script>
