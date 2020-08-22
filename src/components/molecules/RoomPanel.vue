<template>
  <v-card
    class="rounded-card ma-1"
    color="rgba(179, 229, 252, 0.7)">
    <v-card-title>
      {{ room.name }}
    </v-card-title>
    <v-card-actions>
      <v-btn
        rounded
        small
        color="primary"
        @click="inRoom">
        入室
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { RoutePath } from '@/router/RoutePath';
import Room from '@/modules/Room';

@Component({
  name: 'RoomPanel',
})
export default class RoomPanel extends Vue {
  @Prop({ required: true })
  private room!: Room;

  public inRoom() {
    this.$router.push(RoutePath.ROOM + '/' + this.room.getCode());
  }
}
</script>
