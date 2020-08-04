<template>
  <v-sheet>
    <v-container>
      <v-responsive
        max-height="80vh"
        class="overflow-y-auto">
        <ChatMessageArea
          v-if="messages.length > 0"
          :messages="messages"
          :currentUserUid="currentUserUid"
          />
      </v-responsive>
    </v-container>

    <v-footer
      class="white"
      >
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
import ChatMessageArea from '@/components/organisms/ChatMessageArea.vue';

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
      postedAt: message.postedAt,
      name: message.name,
    });
  }

  // メッセージの送信
  public send() {
    if (this.user && this.user.uid && this.input.length > 0) {
      const message: Message = {
        userUid: this.user.uid || '',
        text: this.input,
        postedAt: this.formatDate(new Date()),
        name: this.user.email || '',
      };
      firebase.database().ref('message').push(message, () => {
        this.input = ''; // 成功時にはフォームを空にする。
      });
    }
  }

  private formatDate(date: Date): string {

    const year = date.getFullYear().toString();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate().toString()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    const second = ('0' + date.getSeconds()).slice(-2);
    const format = 'YYYY-MM-DD hh:mm:ss';

    return format.replace(/YYYY/g, year)
                 .replace(/MM/g, month)
                 .replace(/DD/g, day)
                 .replace(/hh/g, hour)
                 .replace(/mm/g, minute)
                 .replace(/ss/g, second);
  }
}
</script>

<style>

</style>
