<template>
  <v-sheet>
    <v-card>
      <v-container>
        <v-card-actions>
          <v-btn
            class="my-0 py-0"
            small
            rounded
            outlined
            @click="back">
            一覧に戻る
          </v-btn>
        </v-card-actions>
        <v-card-title class="my-0 py-0">
          {{room.name}}
        </v-card-title>
        <v-responsive
          max-height="70vh"
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
import { RoutePath } from '@/router/RoutePath';
import BaseTextField from '@/components/atoms/BaseTextField.vue';
import { Message, ChatUser } from '@/modules/type';
import ChatPostForm from '@/components/molecules/ChatPostForm.vue';
import ChatMessageArea from '@/components/organisms/ChatMessageArea.vue';
import DateFormatter, { FormatType } from '@/modules/util/DateFormatter';
import Room from '@/modules/Room';
import UserAccess from '@/modules/access/UserAccess';
import RoomAccess from '@/modules/access/RoomAccess';
import MessageAccess from '@/modules/access/MessageAccess';

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
    this.room = await RoomAccess.getRoom(this.roomCd);
    this.messages = [];

    MessageAccess.childAdded(this.roomCd, (snap) => {
      const message = snap.val() as Message;
      this.messages.push({
        key: snap.key || '',
        userUid: message.userUid,
        text: message.text,
        postedAt: message.postedAt,
      });
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
      MessageAccess.push(this.roomCd, message, () => {
        this.input = ''; // 成功時にはフォームを空にする。
      });
    }
  }

  public back() {
    this.$router.push(RoutePath.ROUNGE);
  }
}
</script>
