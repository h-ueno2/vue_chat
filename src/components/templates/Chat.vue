<template>
  <v-sheet>
    <v-card>
      <v-container>
        <v-card-actions>
          <v-btn @click="back">
            一覧に戻る
          </v-btn>
        </v-card-actions>
        <v-card-title>
          {{room.name}}
        </v-card-title>
        <v-responsive
          max-height="80vh"
          class="overflow-y-auto">
          <ChatMessageArea
            v-if="messages.length > 0"
            :messages="messages"
            :room="room"
            :currentUserUid="currentUserUid"
            />
        </v-responsive>
      </v-container>
    </v-card>

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
import DateFormatter, { FormatType } from '@/modules/util/DateFormatter';
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

  @Prop({ required: true })
  private roomCd!: string;

  get currentUserUid(): string {
    return this.user ? this.user.uid : '';
  }

  public created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        return;
      }
      this.setUser(user.uid);

      this.setRoom(this.roomCd);

      if (user) {
        this.messages = [];
        firebase.database().ref('message/' + this.roomCd).limitToLast(10).on('child_added', this.messageAdded);
      } else {
        firebase.database().ref('message/' + this.roomCd).limitToLast(10).on('child_added', this.messageAdded);
      }
    });
  }

  public async setUser(uid: string) {
    this.user =  await this.getUserByUid(uid);
  }

  public async setRoom(roomCd: string) {
    this.room = await new Promise<Room>((resolve, reject) => {
      firebase.database().ref('rooms/' + roomCd).once('value').then((snap) => {
        const members: ChatUser[] = [];
        snap.child('members').forEach((member) => {
          if (member.key && member.val()) {
            this.getUserByUid(member.key).then((res) => {
              members.push(res);
            });
          }
        });
        resolve(new Room(this.roomCd, snap.child('name').val(), members));
      });
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
      };
      firebase.database().ref('message/' + this.roomCd).push(message, () => {
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

  public back() {
    this.$router.push('/');
  }
}
</script>

<style>

</style>
