<template>
  <home>
    <v-layout row justify-space-around>
      <v-flex xs12 mb-4 fill-height><users-grid></users-grid></v-flex>
    </v-layout>
    <v-layout row justify-space-around>
      <v-flex xs12 fill-height><users-details></users-details></v-flex>
    </v-layout>
  </home>
</template>

<script>
import home from '../../layouts/Home.vue'
import usersGrid from './UsersGrid.vue'
import usersDetails from './UsersDetails.vue'

export default {
  components: {
    usersGrid,
    usersDetails,
    home
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'home-layout')
  },
  methods: {}
}
</script>

<style lang=""></style>
