<template>
  <v-container>
    <v-layout row justify-space-around>
      <v-flex xs12 mb-4 fill-height><users-grid></users-grid></v-flex>
    </v-layout>
    <v-layout row justify-space-around>
      <v-flex xs12 fill-height><users-details></users-details></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import usersGrid from './UsersGrid.vue'
import usersDetails from './UsersDetails.vue'

export default {
  components: {
    usersGrid,
    usersDetails
  },
  methods: {}
}
</script>

<style lang=""></style>
