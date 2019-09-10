import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //layout: 'main-layout',
    user_selected: {}
  },
  mutations: {
    toggleUserDetails(state, payload) {
      state.user_selected = payload
    }
  },
  actions: {}
})
