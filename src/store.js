import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: 'login-layout',
    user_selected: {},
    edit_mode: false,
    new_mode: false
  },
  mutations: {
    toggleUserDetails(state, payload) {
      state.user_selected = payload
    },
    editMode(state, payload) {
      state.edit_mode = payload
    },
    newMode(state, payload) {
      state.new_mode = payload
    },
    SET_LAYOUT(state, newLayout) {
      state.layout = newLayout
    }
  },
  actions: {}
})
