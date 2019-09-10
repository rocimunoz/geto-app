import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyDlQUfOtriJvhDd3k480bLwSnn3SNYkZq4',
  authDomain: 'geto-ebcf9.firebaseapp.com',
  databaseURL: 'https://geto-ebcf9.firebaseio.com',
  projectId: 'geto-ebcf9',
  storageBucket: 'geto-ebcf9.appspot.com',
  messagingSenderId: '550557742199',
  appId: '1:550557742199:web:244c3f295e0ab5b2'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
