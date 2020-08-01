<template>
  <v-sheet>
    <v-container>
      <v-responsive
        class="overflow-y-auto"
        max-height="calc(85vh)">
        <ChatMessageArea
          v-if="messages.length > 0"
          :messages="messages"
          :currentUserUid="currentUserUid"
          />
      </v-responsive>
    </v-container>

    <v-footer
      class="white"
      fixed>
      <ChatPostForm
        v-model="input"
        @send="send" />
    </v-footer>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import firebase from 'firebase';
import BaseTextField from '@/components/atoms/BaseTextField.vue';
import { Message } from '@/modules/type';
import ChatPostForm from '@/components/molecules/ChatPostForm.vue';
import ChatMessageArea from '@/components/molecules/ChatMessageArea.vue';

@Component({
  name: 'Chat',
  components: {
    BaseTextField,
    ChatPostForm,
    ChatMessageArea,
  },
})
export default class Chat extends Vue {
  private input: string = '';
  private messages: Message[] = new Array();
  private user: firebase.User | null = null;

  get currentUserUid(): string {
    return this.user ? this.user.uid : '';
  }

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
      userUid: message.userUid,
      text: message.text,
      name: message.name,
    });
  }

  // メッセージの送信
  public send() {
    if (this.user && this.user.uid && this.input.length > 0) {
      const message: Message = {
        userUid: this.user.uid || '',
        text: this.input,
        name: this.user.email || '',
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
