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
import firebase, { User } from 'firebase';
import BaseTextField from '@/components/atoms/BaseTextField.vue';
import { Message, ChatUser } from '@/modules/type';
import ChatPostForm from '@/components/molecules/ChatPostForm.vue';
import ChatMessageArea from '@/components/organisms/ChatMessageArea.vue';
import { DateFormatter, FormatType } from '@/modules/util/DateFormatter';

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
  private user: ChatUser | null = null;
  private refUser: firebase.database.Reference = firebase.database().ref('users');
  private refMessage: firebase.database.Reference = firebase.database().ref('message');

  get currentUserUid(): string {
    return this.user ? this.user.uid : '';
  }

  public created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        return;
      }
      this.getUserByUid(user.uid).then((res) => {
        this.user = res;
      });
      if (user) {
        this.messages = [];
        this.refMessage.limitToLast(10).on('child_added', this.chilidAdded);
      } else {
        this.refMessage.limitToLast(10).on('child_added', this.chilidAdded);
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
      const formatter = new DateFormatter(new Date());
      const message: Message = {
        userUid: this.user.uid || '',
        text: this.input,
        postedAt: formatter.format(FormatType.HYPHEN_DATE_TIME),
        name: this.user.name || '',
      };
      this.refMessage.push(message, () => {
        this.input = ''; // 成功時にはフォームを空にする。
      });
    }
  }

  public async getUserByUid(uid: string): Promise<ChatUser> {
    return await new Promise<ChatUser> ((resolve, reject) => {
      firebase.database().ref('users/' + uid).once('value').then((snap) => {
        const user: ChatUser = {
          uid,
          name: snap.child('name').val(),
          email: snap.child('email').val(),
        };
        resolve(user);
      });
    });
  }
}
</script>

<style>

</style>
