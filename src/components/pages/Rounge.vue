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
import { RoutePath } from '@/router/RoutePath';
import Room from '@/modules/Room';
import RoomPanel from '@/components/molecules/RoomPanel.vue';
import RoomAccess from '@/modules/access/RoomAccess';

@Component({
  name: 'Rounge',
  components: {
    RoomPanel,
  },
})
export default class Rounge extends Vue {
  private rooms: Room[] = [];

  public created() {
    // 表示内容の検討しだいで取得方法を変更する。
    RoomAccess.getRooms().then((rooms) => {
      this.rooms = rooms;
    });
  }

  public inRoom(roomCd: string) {
    this.$router.push(RoutePath.ROOM + '/' + roomCd);
  }
}
</script>
