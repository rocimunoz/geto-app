<template>
   <v-app id="keep">
    <v-app-bar app clipped-left  color="amber">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">Gestion de Torneos</span></span>
      <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field>
      <div class="flex-grow-1"></div>
    </v-app-bar>
    
    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
             {{ item.heading }}
          </v-row>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-4"></v-divider>
          <v-list-item v-else :key="i" :to="{path: item.link}">
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

     <v-content>
      <v-container fluid class="grey lighten-4 fill-height">
        
        <v-row justify="center" align="center">
          <router-view></router-view>
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }"></template>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }"></template>
              <span>Codepen</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
   </v-app>
</template>

<script>



export default {
    name: "App",
    props:{
       source: String,
    },
    components:{
      
    },
     data: () => ({
      drawer: null,
      items: [
        { icon: 'lightbulb_outline', text: 'Usuarios', link:'/users'},
        { icon: 'touch_app', text: 'Juegos', link:'boardgames' },
        { divider: true },
        //{ icon: 'keyboard', text: 'Keyboard shortcuts' },
         //{ divider: true },
      ],
    }),
    
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>
