import smetaBakerEn from "./../../data/smeta-baker-en.js"
import smetaBakerRu from "./../../data/smeta-baker-ru.js"
import finalSmetaBakerEn from "./../../data/final-smeta-baker-en.js"
import finalSmetaBakerRu from "./../../data/final-smeta-baker-ru.js"
import {i18n} from '../../plugins/i18n.js'
// import smetaSchool from "./../../data/smeta-school.js"

const state = {
  smetaBaker: smetaBakerRu,
  finalSmetaBaker: finalSmetaBakerRu
  // smetaSchool: []
}
const mutations = {
  'setSmeta' (state, payload) {
    if (payload === 'ru'){
        state.smetaBaker = smetaBakerRu
        state.finalSmetaBaker = finalSmetaBakerRu
    } else if (payload === 'en'){
        state.smetaBaker = smetaBakerEn
        state.finalSmetaBaker = finalSmetaBakerEn
    }
  }
}
const actions = {
  'initSmeta' ({commit}, payload) {
    commit('setSmeta',  payload)
  }
}
const getters = {
  smetaBaker(state) {
    return state.smetaBaker
  },
  finalSmetaBaker(state) {
    return state.finalSmetaBaker
  },
  // smetaSchool(state) {
  //   return state.smetaSchool
  // }
}

export default {
  state,
  actions,
  mutations,
  getters
}

