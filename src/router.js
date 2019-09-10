import Vue from 'vue'
import Router from 'vue-router'
import Users from './components/Users/Users.vue'
import BoardGames from './components/BoardGames.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/boardgames',
      name: 'BoardGames',
      component: BoardGames
    }
  ]
})
