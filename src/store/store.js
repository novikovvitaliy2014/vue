import Vue from "vue"
import Vuex from "vuex"
import axios from './../axios-auth'
import globalAxios from 'axios'
import * as firebase from 'firebase'
import router from '../router.js'
import outlay from './modules/outlay.js'
import user from './modules/user.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    projects: [],
    project: [],
    error: false,
    success: false,
    loading: false,
    projectContacts: [],
    idToken: null,
    userId: null,
    user: {},
    users: [],
    resetError: null,
    resetSuccess: null,
  },
  mutations: {
    resetError(state, payload) {
      state.resetError = payload
    },
    resetSuccess(state) {
      state.resetSuccess = true
    },
    getUsers(state, payload){
      state.users = payload
    },
    getUser(state, payload){
      const user = state.users.find((user) => {
        return user.email === payload.email
      })
      state.user = user
    },
    authUser (state, payload) {
      state.idToken = payload.token,
      state.userId = payload.userId
    },
    clearAuthData (state) {
      state.IdToken = null,
      state.userId = null
    },
    clearIdToken(state) {
      state.idToken = null
    },
    setLoading(state, payload){
      state.loading = payload
    },
    setLoadedProjects(state, payload) {
      state.projects = payload
    },
    setError(state, payload) {
      state.error = payload.status
    },
    clearError(state) {
      state.error = null
    },
    setSuccess(state, payload) {
      state.success = payload.status
    },
    clearSuccess(state) {
      state.success = false
    },
    createProject(state, payload){
      state.projects.push(payload)
    },
    editProject(state, payload){
      const project = state.projects.find((project) => {
          return project.id === payload.id
        })
      if(payload.title){
        project.title = payload.title
      }
      if(payload.description){
        project.description = payload.description
      }
      if(payload.date){
        project.date = payload.date
      }
      if(payload.dataOutlay){
        project.dataOutlay = payload.dataOutlay
      }
      if(payload.dataFinal){
        project.dataFinal = payload.dataFinal
      }
      if(payload.currency){
        project.currency = payload.currency
      }
      if(payload.donation){
        project.contacts[payload.index] = payload
      }
      if(payload.dataPhotos){
        project.dataPhotos = payload.dataPhotos
      }
      if(payload.dataFinalImages){
        project.dataFinalImages = payload.dataFinalImages
      }
    },
    deleteProject(state, payload){
      state.projects.splice(payload, 1)
    },
    deleteFinalOutlay(state, payload){
      state.projects[payload].dataFinal = []
    },
    deleteOutlay(state, payload){
      state.projects[payload].dataOutlay = []
    },
    storeContact(state, payload){
      const contact = {}
      contact[payload.key].push(payload.contact)
      contact[payload.key].push(payload.nickname)
      state.projectContacts.push(contact)
    }
  },
  actions: {
    resetPassword({commit}, payload) {
      firebase.auth().sendPasswordResetEmail(payload).then(function() {
        commit('resetSuccess')
      }).catch(function(error) {
        commit('resetError', error)
      })
    },
    clearError({commit}) {
      commit('clearError')
    },
    getUser({commit}, payload){
      commit('getUser', payload)
    },
    fetchUsers ({commit, state}) {
      if (!state.idToken) {
        return
      }
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
      .then(res => {
        const data = res.data
        const users =[]
        for (let key in data) {
        const user = data[key]
          user.id = key
          users.push(user)
        }
        commit('getUsers', users)
      })
      // .catch(error => console.log(error))
    },
    signup ({commit, dispatch}, signupData) {
      commit('clearError')
        axios.post('/signupNewUser?key=AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4', {
          email: signupData.email,
          password: signupData.password,
          returnSecureToken: true
        })
          .then(user => {
            commit('authUser', {
              token: user.data.idToken,
              userId: user.data.localId
            })
            const now = Math.floor(Date.now())
            const expirationDate = now + (1000 * 3600 * 24 * 30)
            localStorage.setItem('token', user.data.idToken)
            localStorage.setItem('userId', user.data.localId)
            localStorage.setItem('pseudo', signupData.pseudo)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch('storeUser', signupData) // save to users.json
            router.replace('/')
          })
          .catch(error => {
            commit('setError', {status: error})
            }
          )
      },
      signin ({commit}, signinData) {
        commit('clearError')
        axios.post('/verifyPassword?key=AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4', {
          email: signinData.email,
          password: signinData.password,
          returnSecureToken: true
        })
          .then(user => {
            const now = Math.floor(Date.now())
            const expirationDate = now + (1000 * 3600 * 24 * 30)
            localStorage.setItem('token', user.data.idToken)
            localStorage.setItem('userId', user.data.localId)
            localStorage.setItem('expirationDate', expirationDate)
            commit('authUser', {
              token: user.data.idToken,
              userId: user.data.localId
            })
            commit('setSuccess', {status: true})
          })
          .catch(error => {
            commit('setError', {status: error})
            // console.log(error)
            }
          )
      },
      logout({commit}) {
        commit('clearAuthData')
        commit('clearIdToken')
        commit('clearSuccess')
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        router.replace('/signin')
      },
      storeUser ({state}, signupData) {
        if (!state.idToken) {
          return
        } else {
          globalAxios.post('/users.json' + '?auth=' + state.idToken, signupData)
        }
      },

     createProject ({commit, getters}, payload) {
      const project = {
        title: payload.title,
        description: payload.description,
        projectId: payload.projectId,
        dataOutlay: payload.dataOutlay,
        date: payload.date.toISOString(),
        currency: payload.currency,
        creatorId: getters.userId
      }
      let key
      firebase.database().ref('projects').push(project)
      // globalAxios.post('/projects.json' + '?auth=' + state.idToken, project)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          let imagesArray = payload.images
          if(imagesArray != undefined) {
            for(let i = 0; i < 2; i++) {
              if(imagesArray[i] != undefined){
                firebase.storage().ref('projects/' + key + "/" + key + i).put(imagesArray[i])
              }
            }
          }
          commit('setSuccess', {status: true})
        })
        .catch(error => {
          commit('setError', {status: error})
        })
    },
    resizeImages({state}){
      globalAxios.get('/projects.json' + '?auth=' + state.idToken)
        .then(res => {
          const obj = res.data
          for (let key in obj) {
            for(let i = 0; i < 2; i++){
              const image = firebase.storage().ref("projects/" + key + i + "/" + "resized-" + key + i)
              if(image !== undefined && image !== null){
                image.getDownloadURL().then((url) => {
                  return firebase.database().ref('projects').child(key).child("images").child(i).update({imageUrl: url})
                })
              }
            }
            for(let i = 0; i < 5; i++){
              const imageCheck = firebase.storage().ref("projects/" + key + i + "/" + "dataFinal/" + "resized-" + key + i)
              if(imageCheck !== undefined && imageCheck !== null){
                imageCheck.getDownloadURL().then((url) => {
                  return firebase.database().ref('projects').child(key).child("dataFinalImages").child(i).update({imageUrl: url})
                })
              }
            }
            for(let i = 0; i < 4; i++){
              const imageFinal = firebase.storage().ref("projects/" + key + i + "/" + "dataPhotos/" + "resized-" + key + i)
              if(imageFinal !== undefined && imageFinal !== null){
                imageFinal.getDownloadURL().then((url) => {
                  return firebase.database().ref('projects').child(key).child("dataPhotos").child(i).update({imageUrl: url})
                })
              }
            }
          }
        })
        // .catch(error => {
        //   console.log(error)
        // })
    },
    loadProjects({commit}) {
      commit('setLoading', true)
      firebase.database().ref('projects').on('value', snap => {
          const obj = snap.val()
          const projects = []
          for (let key in obj) {
            projects.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              currency: obj[key].currency,
              date: obj[key].date,
              projectImages: obj[key].images,
              dataOutlay: obj[key].dataOutlay,
              dataFinal: obj[key].dataFinal,
              projectId: obj[key].projectId,
              creatorId: obj[key].creatorId,
              contacts: obj[key].contacts,
              dataPhotos: obj[key].dataPhotos,
              dataFinalImages: obj[key].dataFinalImages
            })
          }
          commit('setLoadedProjects', projects)
          commit('setLoading', false)
        })
        // .catch(error => {
        //   commit('setLoading', false)
        //   // console.log(error)
        // })
    },
    deleteProject({state, commit}, payload) {
      const pros = state.projects
      const proIndex = pros.map(x => x.id).indexOf(payload.id)
      firebase.database().ref().child('projects/' + payload.id).remove()
      for(let i = 0; i < 2; i++) {
        firebase.storage().ref("projects/" + payload.id + i + "/" + "resized-" + payload.id + i).delete()
        firebase.storage().ref("projects/" + payload.id + "/" + payload.id + i).delete()
      }
      for(let i = 0; i < 5; i++) {
        firebase.storage().ref("projects/" + payload.id + i + "/" + "dataFinal/" + "resized-" + payload.id + i).delete()
        firebase.storage().ref("projects/" + payload.id + "/" + "dataFinal/" + payload.id + i).delete()
      }
      commit("deleteProject", proIndex)
    },
    deleteFinalOutlay({state, commit}, payload) {
      const pros = state.projects
      const proIndex = pros.map(x => x.id).indexOf(payload.id)
      firebase.database().ref().child('projects/' + payload.id + "/"+ "dataFinal").remove()
      for(let i = 0; i < 5; i++) {
        firebase.storage().ref("projects/" + payload.id + i + "/" + "dataFinal/" + "resized-" + payload.id + i).delete()
        firebase.storage().ref("projects/" + payload.id + "/" + "dataFinal/" + payload.id + i).delete()
      }
      commit("deleteFinalOutlay", proIndex)
    },
    deleteOutlay({state, commit}, payload){
      const pros = state.projects
      const proIndex = pros.map(x => x.id).indexOf(payload.id)
      firebase.database().ref().child('projects/' + payload.id + "/"+ "dataOutlay").remove()
      commit("deleteOutlay", proIndex)
    },
    editProject({commit}, payload){
      const projectForServer = {}
      if(payload.title){
        projectForServer.title = payload.title
      }
      if(payload.description){
        projectForServer.description = payload.description
      }
      if(payload.currency){
        projectForServer.currency = payload.currency
      }
      if(payload.date){
        projectForServer.date = payload.date
      }
      if(payload.dataOutlay){
        projectForServer.dataOutlay = payload.dataOutlay
      }
      if(payload.dataFinal){
        projectForServer.dataFinal = payload.dataFinal
      }
      if(payload.contact && !payload.donation){
        firebase.database().ref('projects').child(payload.id).child("contacts").push(payload)
      }
      if(payload.donation){
        firebase.database().ref('projects').child(payload.id).child("contacts").child(payload.index).update(payload)
      }
      let key = payload.id
      firebase.database().ref('projects').child(payload.id).update(projectForServer)
      .then(() => {
          if(payload.editedImages) {
            let imagesArray = payload.editedImages
            for (let i = 0; i < 2; i++){
              if(imagesArray[i] != undefined){
                firebase.storage().ref('projects/' + key + "/" + key + i).put(imagesArray[i])
              }
            }
          }
            if(payload.dataFinalImages){
              let imagesArray = payload.dataFinalImages
              for(let i = 0; i < 5; i++ ){
                if(imagesArray[i] != undefined){
                  firebase.storage().ref('projects/' + key + "/" + "dataFinal/" + key + i).put(imagesArray[i])
                }
              }
            }
          if(payload.dataPhotos) {
            let imagesArray = payload.dataPhotos
            for(let i = 0; i < 4; i++ ){
              if(imagesArray[i] != undefined){
                firebase.storage().ref('projects/' + key + "/" + "dataPhotos/" + key + i).put(imagesArray[i])
              }
            }
          }
        })
      .then(() => {
          commit('editProject', payload)
          commit('setSuccess', {status: true})
        })
        .catch(error => {
          commit('setError', {status: error})
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    users (state) {
     return state.users
    },
    projects(state) {
      return state.projects.sort((projectA, projectB) => {
        return projectA.date > projectB.date
      })
    },
    project(state) {
      return (projectId) => {
        return state.projects.find((project) => {
          return project.id === projectId
        })
      }
    },
    userId(state) {
      return state.userId
    },
    error (state) {
      return state.error
    },
    success (state) {
      return state.success
    },
    loading(state){
      return state.loading
    },
    resetError (state) {
      return state.resetError
    },
    resetSuccess (state) {
      return state.resetSuccess
    }
  },
  modules: {
    outlay,
    user
  }
})

export default store
