<template>
  <v-app>
    <v-content transition="slide-x-transition">
      <component :is="layout">
        <router-view :layout.sync="layout" />
      </component>
    </v-content>
  </v-app>
</template>

<script>
import LoginLayout from './layouts/Login.vue'
import HomeLayout from './layouts/Home.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  props: {
    source: String
  },
  components: { LoginLayout, HomeLayout },
  data: () => ({
    layout: 'div',
    drawer: null,
    items: [
      { icon: 'lightbulb_outline', text: 'Usuarios', link: '/users' },
      { icon: 'touch_app', text: 'Juegos', link: 'boardgames' },
      { divider: true }
      //{ icon: 'keyboard', text: 'Keyboard shortcuts' },
      //{ divider: true },
    ]
  }),
  computed: mapState(['layout'])
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
