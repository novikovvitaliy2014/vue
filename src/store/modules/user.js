import {i18n} from '../../plugins/i18n.js'
import axios from './../../axios-auth'
import globalAxios from 'axios'
import * as firebase from 'firebase'
import router from '../../router.js'

const state = {
}
const mutations = {
}
const actions = {
  tryAutoSignin ({commit}, payload) {
    const token = localStorage.getItem('token')
    if(!token) {
      return
    }
    const expirationDate = localStorage.getItem('expirationDate')
    const now = Math.floor(Date.now())
    if(now >= expirationDate) {
      return
    }
    const userId = localStorage.getItem('userId')
    // const pseudo = localStorage.getItem('pseudo')
    commit('authUser', {
      token: token,
      userId: userId
    })
    // commmit('getNick', pseudo)

  },
}
const getters = {
}

export default {
  state,
  actions,
  mutations,
  getters
}

