<template>
  <v-container>
    <transition-group>
      <section v-for="{ key, name, text } in messages" :key="key">
        {{ name }}, {{ text }}
      </section>
    </transition-group>
    <v-form>
      <BaseTextField
        v-model="input"
        label="メッセージ">
      </BaseTextField>

      <v-btn
        @click="send">
        送信
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import firebase from 'firebase';
import BaseTextField from '../atoms/BaseTextField.vue';
import { Message } from '../../modules/Message';

@Component({
  name: 'Chat',
  components: {
    BaseTextField,
  },
})
export default class Chat extends Vue {
  private input: string = '';
  private messages: Message[] = new Array();
  private user: firebase.User | null = null;

  public created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      const refMessage = firebase.database().ref('message');
      if (user) {
        this.messages = [];
        refMessage.limitToLast(10).on('child_added', this.chilidAdded);
      } else {
        refMessage.limitToLast(10).on('child_added', this.chilidAdded);
      }
    });
  }

  // 受け取ったメッセージを追加
  // Firebaseのデータベースに新しい要素が追加されると随時呼び出しする
  public chilidAdded(snap: firebase.database.DataSnapshot) {
    const message = snap.val() as Message;
    this.messages.push({
      key: snap.key || '',
      name: message.name,
      text: message.text,
    });
  }

  // メッセージの送信
  public send() {
    if (this.user && this.user.uid && this.input.length > 0) {
      const message: Message = {
        name: this.user.email || '',
        text: this.input,
      };
      firebase.database().ref('message').push(message, () => {
        this.input = ''; // 成功時にはフォームを空にする。
      });
    }
  }
}
</script>

<style>

</style>
