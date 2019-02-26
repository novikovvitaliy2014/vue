import Vue from 'vue'
import Vuetify from 'vuetify'
import 'babel-polyfill'
import axios from 'axios'
import * as firebase from 'firebase'
import './plugins/vuetify'
import App from './App.vue'
import store from "./store/store.js"
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
Vue.config.productionTip = false

axios.defaults.baseURL = 'https://vue-city.firebaseio.com'

Vue.use(Vuetify)

new Vue({
  store,
  router,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4",
      authDomain: "vue-city.firebaseapp.com",
      databaseURL: "https://vue-city.firebaseio.com",
      projectId: "vue-city",
      storageBucket: "vue-city.appspot.com",
    })
    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
        this.$store.dispatch('tryAutoLogin', user)
      } else {
        this.$store.getters.isAuthenticated
      }
    })
    firebase.auth().useDeviceLanguage();
  }
}).$mount('#app')
