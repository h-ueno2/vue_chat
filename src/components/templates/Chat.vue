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
import { RoutePath } from '@/router/RoutePath';
import BaseTextField from '@/components/atoms/BaseTextField.vue';
import { Message, ChatUser } from '@/modules/type';
import ChatPostForm from '@/components/molecules/ChatPostForm.vue';
import ChatMessageArea from '@/components/organisms/ChatMessageArea.vue';
import DateFormatter, { FormatType } from '@/modules/util/DateFormatter';
import Room from '@/modules/Room';
import UserAccess from '@/modules/access/UserAccess';
import RoomAccess from '@/modules/access/RoomAccess';

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

  public async created() {
    this.user = await UserAccess.getCurrentUser();
    this.setRoom(this.roomCd);
    this.messages = [];
    firebase.database().ref('message/' + this.roomCd).limitToLast(10).on('child_added', this.messageAdded);
  }

  public async setUser(uid: string) {
    this.user =  await UserAccess.getUserByUid(uid);
  }

  public async setRoom(roomCd: string) {
    this.room = await RoomAccess.getRoom(roomCd);
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

  public back() {
    this.$router.push(RoutePath.ROUNGE);
  }
}
</script>

<style>

</style>
