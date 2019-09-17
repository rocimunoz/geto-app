<template>
  <v-layout align-center justify-center>
    <v-app-bar app clipped-left color="amber">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">Gestion de Torneos</span>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>
      <div class="flex-grow-1"></div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
            {{ item.heading }}
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          ></v-divider>
          <v-list-item v-else :key="i" :to="{ path: item.link }">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-container fluid class="grey lighten-4 fill-height ma-10">
      <v-layout row wrap justify="center" align="center">
        <!--https://markus.oberlehner.net/blog/dynamic-vue-layout-components/-->
        <slot></slot>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'home',
  created() {
    this.$store.commit('SET_LAYOUT', 'main-layout')
  },
  props: {
    source: String
  },
  components: {},
  data: () => ({
    drawer: null,
    items: [
      { icon: 'lightbulb_outline', text: 'Usuarios', link: '/users' },
      { icon: 'touch_app', text: 'Juegos', link: 'boardgames' },
      { divider: true }
      //{ icon: 'keyboard', text: 'Keyboard shortcuts' },
      //{ divider: true },
    ]
  })
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
