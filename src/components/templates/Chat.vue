<template>
  <v-sheet>
    <div
      class="text-h4 d-flex align-center justify-center">
      {{ room.name }}
    </div>
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
import firebase, { User, database } from 'firebase';
import BaseTextField from '@/components/atoms/BaseTextField.vue';
import { Message, ChatUser } from '@/modules/type';
import ChatPostForm from '@/components/molecules/ChatPostForm.vue';
import ChatMessageArea from '@/components/organisms/ChatMessageArea.vue';
import { DateFormatter, FormatType } from '@/modules/util/DateFormatter';
import Room from '@/modules/Room';

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
  private room: Room = new Room();

  // propにする予定
  private roomCd = 'room1';
  private refMessage: firebase.database.Reference = firebase.database().ref('message/' + this.roomCd);

  get currentUserUid(): string {
    return this.user ? this.user.uid : '';
  }

  public created() {
    this.chatInit();
  }

  /** チャットの初期化処理 */
  public async chatInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        return;
      }
      this.getUserByUid(user.uid).then((res) => {
        this.user = res;
      });

      firebase.database().ref('rooms/' + this.roomCd).once('value').then((snap) => {
        const members: ChatUser[] = [];
        snap.child('members').forEach((member) => {
          if (member.key && member.val()) {
            this.getUserByUid(member.key).then((res) => {
              members.push(res);
            });
          }
        });
        this.room = new Room(this.roomCd, snap.child('name').val(), members);
      });

      if (user) {
        this.messages = [];
        this.refMessage.limitToLast(10).on('child_added', this.messageAdded);
      } else {
        this.refMessage.limitToLast(10).on('child_added', this.messageAdded);
      }
    });
  }

  // 受け取ったメッセージを追加
  // Firebaseのデータベースに新しい要素が追加されると随時呼び出しする
  public messageAdded(snap: firebase.database.DataSnapshot) {
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
