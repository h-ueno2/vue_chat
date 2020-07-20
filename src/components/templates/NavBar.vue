<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-spacer></v-spacer>
    <SignoutBtn/>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SignoutBtn from '../molecules/SignoutBtn.vue';

@Component({
  name: 'NavBar',
  components: {
    SignoutBtn,
  },
})
export default class NavBar extends Vue {}
</script>
