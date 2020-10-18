<template>
  <v-card
    class="rounded-card ma-1"
    color="rgba(252, 226, 206, 0.7)">
    <v-card-title>
      新規ルーム
    </v-card-title>
    <v-card-actions>
      <v-btn
        rounded
        small
        color="primary"
        @click="addRoom">
        作成
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component({
  name: 'RoomAddPanel',
})
export default class RoomAddPanel extends Vue {
  @Emit('addRoom')
  public addRoom() {
  }
}
</script>
