import outlayBakerEn from "./../../data/outlay-baker-en.js"
import outlayBakerRu from "./../../data/outlay-baker-ru.js"
import finalOutlayBakerEn from "./../../data/final-outlay-baker-en.js"
import finalOutlayBakerRu from "./../../data/final-outlay-baker-ru.js"
import {i18n} from '../../plugins/i18n.js'

// import outlaySchool from "./../../data/outlay-school.js"

const state = {
  outlayBaker: outlayBakerRu,
  finalOutlayBaker: finalOutlayBakerRu
  // outlaySchool: []
}
const mutations = {
  'setOutlay' (state, payload) {
    if (payload === 'ru'){
        state.outlayBaker = outlayBakerRu
        state.finalOutlayBaker = finalOutlayBakerRu
    } else if (payload === 'en'){
        state.outlayBaker = outlayBakerEn
        state.finalOutlayBaker = finalOutlayBakerEn
    }
  }
}
const actions = {
  'initOutlay' ({commit}, payload) {
    commit('setOutlay',  payload)
  }
}
const getters = {
  outlayBaker(state) {
    return state.outlayBaker
  },
  finalOutlayBaker(state) {
    return state.finalOutlayBaker
  },
  // outlaySchool(state) {
  //   return state.outlaySchool
  // }
}

export default {
  state,
  actions,
  mutations,
  getters
}

