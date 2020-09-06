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
import Auth from '@/modules/access/Auth';
import UserAccess from '@/modules/access/UserAccess';
import MixinValid from '@/components/mixins/MixinValid';
import BaseTextField from '@/components/atoms/BaseTextField.vue';
import ErrorMessageText from '@/components/atoms/ErrorMessageText.vue';
import { ChatUser } from '@/modules/type';

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
  private user?: ChatUser;
  private errorMessage: string = '';
  private isClicked: boolean = false;

  public async  created() {
    this.user = await UserAccess.getCurrentUser();
  }

  public update() {
    if (!this.validate()) {
      return;
    }

    if (!this.user) {
      return;
    }

    this.isClicked = true;
    UserAccess.updateUser(this.user.uid, {
      name:  this.name,
    }).then(() => {
      this.$router.push('/');
    });
  }
}
</script>
