<template>
  <v-container>
    <v-card row wrap>
      <v-card-title class="font-weight-bold display-1">
        ルーム一覧
      </v-card-title>
      <v-card-subtitle>
        入室するチャットルームを選択してください
      </v-card-subtitle>
      <v-layout wrap>
        <v-flex v-for="(room, index) in rooms" :key="index" md4 sm6 xs12>
          <RoomPanel 
            class="ma-1 pa-1"
            :room="room"
            @inRoom="inRoom">
          </RoomPanel>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import firebase, { User, database } from 'firebase';
import { RoutePath } from '@/router/RoutePath';
import Room from '@/modules/Room';
import RoomPanel from '@/components/molecules/RoomPanel.vue';

@Component({
  name: 'Rounge',
  components: {
    RoomPanel,
  },
})
export default class Rounge extends Vue {
  private rooms: Room[] = [];

  public created() {
    firebase.auth().onAuthStateChanged((user) => {
      // 表示内容の検討しだいで取得方法を変更する。
      firebase.database().ref('rooms').on('child_added', this.roomAdded);
    });
  }

  public roomAdded(snap: firebase.database.DataSnapshot) {
    const roomCd = snap.key || '';
    const memberIds: string[]  = [];
    snap.child('members').forEach((member) => {
      if (member.val()) {
        memberIds.push(member.key as string);
      }
    });
    const room = new Room(
      roomCd,
      snap.child('name').val(),
      memberIds,
    );
    this.rooms.push(room);
  }

  public inRoom(roomCd: string) {
    this.$router.push(RoutePath.ROOM + '/' + roomCd);
  }
}
</script>
