import Vue from 'vue'
import Router from 'vue-router'
import Users from './components/Users/Users.vue'
import BoardGames from './components/BoardGames.vue'
import Login from './layouts/Login.vue'
import Home from './layouts/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/boardgames',
      name: 'BoardGames',
      component: BoardGames
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})

/* router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    //if (1) {
    return next({
      path: '/login',
      query: { returnUrl: to.path }
    })
  }

  next()
}) */

export default router
