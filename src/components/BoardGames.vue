<template>
  <home>
    Cargando juegos de mesa
  </home>
</template>

<script>
import home from '../layouts/Home.vue'
export default {
  components: {
    home
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'home-layout')
  }
}
</script>

<style lang=""></style>
