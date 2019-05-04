import Vue from "vue"
import Vuex from "vuex"
import { mapState, mapGetter, mapActions } from 'vuex'
import axios from './../axios-auth'
import globalAxios from 'axios'
import * as firebase from 'firebase'
import router from '../router.js'
import smeta from './modules/smeta.js'
import {i18n} from '../plugins/i18n.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    projects: [],
    user: {},
    users: [],
    idToken: null,
    userId: null,
    // pseudo: 'Tom',
    // usersBaker: [],
    // usersSchool: [],
    error: '',
    resetError: null,
    resetSuccess: null,
    success: false,
    loading: false,
    projectContacts: []
  },
  mutations: {
    getUsers(state, payload){
      state.users = payload
    },
    getUser(state, payload){
      const user = state.users.find((user) => {
        return user.email === payload.email
      })
      console.log(payload.email)
      console.log(state.users)
      state.user = user
    },
    setLoading(state, payload){
      state.loading = payload
    },
    setLoadedProjects(state, payload) {
      state.projects = payload
    },
    authUser (state, payload) {
      state.idToken = payload.token,
      state.userId = payload.userId
      // state.pseudo = payload.pseudo
    },
    // storeUser (state, payload) {
    //   state.pseudo = payload.pseudo
    // },
    // storeUsersBaker (state, payload) {
    //   state.usersBaker = payload
    // },
    // storeUsersSchool (state, payload) {
    //   state.usersSchool = payload
    // },
    clearAuthData (state) {
      state.IdToken = null,
      state.userId = null
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    clearIdToken(state) {
      state.idToken = null
    },
    resetError(state, payload) {
      state.resetError = payload
    },
    resetSuccess(state, payload) {
      state.resetSuccess = payload
    },
    sendSuccess(state) {
      state.success = true
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
      if(payload.data){
        project.data = payload.data
      }
      if(payload.dataFinal){
        project.dataFinal = payload.dataFinal
      }
      // if(payload.image_1){
      //   project.imageUrl = payload.image_1
      // }
      // if(payload.date){
      //   project.date = payload.date
      // }
      // console.log(project.imageUrl)
    },
    // editProjectUrl(state, payload) {
    //   const project = state.projects.find((project) => {
    //     return project.id === payload.id
    //   })
    //   if(payload){
    //     project.imageUrl = payload
    //   }
    // },
    deleteProject(state, payload){
      state.projects.splice(payload, 1)
      console.log(state.projects)
    },
    storeContact(state, payload){
      const contact = {}
      contact[payload.selected] = payload.contact
      state.projectContacts.push(contact)
    }
    // setUser(state, newUser) {
    //   state.user = newUser
    // }
  },
  actions: {
    loadProjects({commit, state}) {
      commit('setLoading', true)
      globalAxios.get('/projects.json' + '?auth=' + state.idToken)
        .then(res => {
          const projects = []
          const obj = res.data
          for (let key in obj) {
            projects.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              date: obj[key].date,
              // currentImage: obj[key].images[0],
              projectImages: obj[key].images,
              // imageUrl_2: obj[key].image1.imageUrl,

              data: obj[key].data,
              dataFinal: obj[key].dataFinal,
              // finalImage1: obj[key].dataFinal.image0,
              projectId: obj[key].projectId,
              creatorId: obj[key].creatorId,
              // smetaQuantity1: obj[key].smetaQuantity1,
              // smetaPrice1: obj[key].smetaPrice1,
              // smetaName1: obj[key].smetaName1,
              // smetaQuantity2: obj[key].smetaQuantity2,
              // smetaPrice2: obj[key].smetaPrice2,
              // smetaName2: obj[key].smetaName2,
              // smetaQuantity3: obj[key].smetaQuantity3,
              // smetaPrice3: obj[key].smetaPrice3,
              // smetaName3: obj[key].smetaName3,
              // smetaQuantity4: obj[key].smetaQuantity4,
              // smetaPrice4: obj[key].smetaPrice4,
              // smetaName4: obj[key].smetaName4,
              // smetaQuantity5: obj[key].smetaQuantity5,
              // smetaPrice5: obj[key].smetaPrice5,
              // smetaName5: obj[key].smetaName5
            })
          }
          commit('setLoadedProjects', projects)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', true)
        })
    },
    // setLogoutTimer({commit}, expirationTime) {
    //   setTimeout(() => {
    //     commit('clearAuthData')
    //   }, expirationTime * 1000 * 24 * 30)
    // },
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
        .catch(error => alert(error))
    },
    signup ({commit, dispatch}, signupData) {
      commit('clearError')
      axios.post('/signupNewUser?key=AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4', {
        email: signupData.email,
        password: signupData.password,
        // pseudo: signupData.pseudo,
        returnSecureToken: true
      })
        .then(user => {
          // console.log(user)
          commit('authUser', {//authentication after signing up
            token: user.data.idToken,
            userId: user.data.localId
            // registeredProjects: []
            // userPseudo: res.data.pseudo
          })
          const now = Math.floor(Date.now())
          const expirationDate = now + (1000 * 3600 * 24 * 30)
          localStorage.setItem('token', user.data.idToken)
          localStorage.setItem('userId', user.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          localStorage.setItem('email', signupData.email)
          dispatch('storeUser', signupData) // save to users.json
          // commit('storeUser', signupData)// save to state
          router.replace('/')
        })
        .catch(error => {
          commit('setError', error)
          console.log(error)
          }
        )
    },
    tryAutoSignin ({commit}, payload) {
      const token = localStorage.getItem('token')
      if(!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = Math.floor(Date.now() / (1000 * 3600 * 24))
      if(now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit ('authUser', {
        token: token,
        userId: userId
      })
    },
    signin ({commit, dispatch}, signinData) {
      // dispatch('tryAutoSignin')
      commit('clearError')
      axios.post('/verifyPassword?key=AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4', {
        email: signinData.email,
        password: signinData.password,
        returnSecureToken: true
      })
        .then(user => {
          const now = Math.floor(Date.now() / (1000 * 3600 * 24))// days
          const expirationDate = now + 30
          // const expirationDate = new Date(now.getTime() + user.data.expiresIn * 1000)
          localStorage.setItem('token', user.data.idToken)
          localStorage.setItem('userId', user.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: user.data.idToken,
            userId: user.data.localId
          })
          commit('getUser', {email: signinData.email})
          commit('sendSuccess')
        })
        .catch(error => {
          commit('setError', error)
          alert(error)
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
      router.replace('/')
    },
    storeUser ({state}, signupData) {
      if (!state.idToken) {
        return
      } else {
        globalAxios.post('/users.json' + '?auth=' + state.idToken, signupData)
      }
    },
    clearError({commit}) {
      commit('clearError')
    },
    resetPassword({commit}, payload) {
      firebase.auth().sendPasswordResetEmail(payload).then(function() {
        commit('resetSuccess')
      }).catch(function(error) {
        commit('resetError', error)
      })
    },
     createProject ({commit, dispatch, state, getters}, payload) {
      const project = {
        title: payload.title,
        description: payload.description,
        projectId: payload.projectId,
        // smetaQuantity1: payload.smetaQuantity1,
        // smetaPrice1: payload.smetaPrice1,
        // smetaName1: payload.smetaName1,
        // smetaQuantity2: payload.smetaQuantity2,
        // smetaPrice2: payload.smetaPrice2,
        // smetaName2: payload.smetaName2,
        // smetaQuantity3: payload.smetaQuantity3,
        // smetaPrice3: payload.smetaPrice3,
        // smetaName3: payload.smetaName3,
        // smetaQuantity4: payload.smetaQuantity4,
        // smetaPrice4: payload.smetaPrice4,
        // smetaName4: payload.smetaName4,
        // smetaQuantity5: payload.smetaQuantity5,
        // smetaPrice5: payload.smetaPrice5,
        // smetaName5: payload.smetaName5,
        data: payload.data,
        // images: payload.images,
        date: payload.date.toISOString(),
        creatorId: getters.userId
      }
      let key
      let newImagesDataArray = []
      firebase.database().ref('projects').push(project)
      // globalAxios.post('/projects.json' + '?auth=' + state.idToken, project)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          let imagesArray = payload.images
          let newImagesArray = []
          if(imagesArray) {
            if(imagesArray[0] != undefined){
              let filename = imagesArray[0].name
              let ext = filename.slice(filename.lastIndexOf('.'))
              let fbImage = firebase.storage().ref('projects/' + key + "/" + key + "0" + ext).put(imagesArray[0])
              newImagesArray[0] = fbImage
            }
            if(imagesArray[1] != undefined){
              let filename = imagesArray[1].name
              let ext = filename.slice(filename.lastIndexOf('.'))
              let fbImage = firebase.storage().ref('projects/' + key + "/" + key + "1" + ext).put(imagesArray[1])
              newImagesArray[1] = fbImage
            }
          }
          // for (let i=0; i<imagesArray.length; i++){
          //   let filename = imagesArray[i].name
          //   let ext = filename.slice(filename.lastIndexOf('.'))
          //   let fbImage = firebase.storage().ref('projects/' + key + "/" + key + i+ ext).put(imagesArray[i])
          //   newImagesArray.push(fbImage)
          // }
          console.log(newImagesArray)
          return Promise.all(newImagesArray)
        })
        .then((newImagesArray) => {
          // for(let i=0; i<newImagesArray.length; i++){
          //   let imageUr = newImagesArray[i]
          //   imageUr.ref.getDownloadURL().then((url) => {
          //     return firebase.database().ref('projects').child(key).child("images").child(i).update({imageUrl: url})
          //   })
          // }
          // console.log(newImagesArray)
          if(newImagesArray[0] != undefined){
            let imageUr = newImagesArray[0]
            imageUr.ref.getDownloadURL().then((url) => {
              return firebase.database().ref('projects').child(key).child("images").child(0).update({imageUrl: url})
            })
          }
          if(newImagesArray[1] != undefined){
            let imageUr = newImagesArray[1]
            imageUr.ref.getDownloadURL().then((url) => {
              return firebase.database().ref('projects').child(key).child("images").child(1).update({imageUrl: url})
            })
          }
          // for(let i=0; i<newImagesArray.length; i++){

          // }
          console.log(newImagesArray)
          // return Promise.all(newImagesArrayFinal)
          // return Promise.all(newImagesDataArray)
        })
        // .then((newImagesDataArray) => {
        //   for(let i=0; i<newImagesDataArray.length; i++){
        //     let imageUr = newImagesDataArray[i]
        //     imageUr.ref.getDownloadURL().then((url) => {
        //       return firebase.database().ref('projects').child(key).child(i).update({imageUrl: url})
        //     })
        //   }
        //   console.log(newImagesDataArray)
        //   commit('sendSuccess')
        // })
        .catch(error => {
          commit('setError', error)
        })
    },
    deleteProject({state, commit}, payload) {
      const pros = state.projects
      const proIndex = pros.map(x => x.id).indexOf(payload.id)
      firebase.database().ref().child('projects/' + payload.id).remove()
      commit("deleteProject", proIndex)
    },
    editProject({commit}, payload){
      const projectForServer = {}
      if(payload.title){
        projectForServer.title = payload.title
      }
      if(payload.description){
        projectForServer.description = payload.description
      }
      if(payload.date){
        projectForServer.date = payload.date
      }
      if(payload.data){
        projectForServer.data = payload.data
      }
      if(payload.dataFinal){
        projectForServer.dataFinal = payload.dataFinal
      }
      // let key
      let key = payload.id
      let newImagesArray = []
      let newImagesArrayFinal = []
      firebase.database().ref('projects').child(payload.id).update(projectForServer)
      .then(() => {
          if(payload.editedImages) {
            let imagesArray = payload.editedImages
            if(imagesArray[0] != undefined){
              let filename = imagesArray[0].name
              let ext = filename.slice(filename.lastIndexOf('.'))
              let fbImage = firebase.storage().ref('projects/' + key + "/" + key + "0" + ext).put(imagesArray[0])
              newImagesArray[0] = fbImage
            }
            if(imagesArray[1] != undefined){
              let filename = imagesArray[1].name
              let ext = filename.slice(filename.lastIndexOf('.'))
              let fbImage = firebase.storage().ref('projects/' + key + "/" + key + "1" + ext).put(imagesArray[1])
              newImagesArray[1] = fbImage
            }
          }
            // for (let i=0; i<2; i++){
            //   let filename = imagesArray[i].name
            //   let ext = filename.slice(filename.lastIndexOf('.'))
            //   let fbImage = firebase.storage().ref('projects/' + key + "/" + key + i+ ext).put(imagesArray[i])
            //   newImagesArray.push(fbImage)
            // }


          // if(payload.dataFinal.images) {
          //   let imagesArray = payload.dataFinal.images
          //   for (let i=0; i<imagesArray.length; i++){
          //     let filename = imagesArray[i].name
          //     let ext = filename.slice(filename.lastIndexOf('.'))
          //     let fbImage = firebase.storage().ref('projects/' + key + "/" + "dataFinal/"+ key + i+ ext).put(imagesArray[i])
          //     newImagesArrayFinal.push(fbImage)
          //   }
          // }
          if(payload.dataFinal) {
            if(payload.dataFinal.images){
              let imagesArray = payload.dataFinal.images
              if(imagesArray[0] != undefined){
                let filename = imagesArray[0].name
                let ext = filename.slice(filename.lastIndexOf('.'))
                let fbImage = firebase.storage().ref('projects/' + key + "/" + "dataFinal/" + key + "0" + ext).put(imagesArray[0])
                newImagesArrayFinal[0] = fbImage
              }
              if(imagesArray[1] != undefined){
                let filename = imagesArray[1].name
                let ext = filename.slice(filename.lastIndexOf('.'))
                let fbImage = firebase.storage().ref('projects/' + key + "/" + "dataFinal/" + key + "1" + ext).put(imagesArray[1])
                newImagesArrayFinal[1] = fbImage
              }
            }
          }
          return Promise.all(newImagesArray)
        })
      .then((newImagesArray) => {
        if(newImagesArray[0] != undefined){
          let imageUr = newImagesArray[0]
          imageUr.ref.getDownloadURL().then((url) => {
            return firebase.database().ref('projects').child(key).child("images").child(0).update({imageUrl: url})
          })
        }
        if(newImagesArray[1] != undefined){
          let imageUr = newImagesArray[1]
          imageUr.ref.getDownloadURL().then((url) => {
            return firebase.database().ref('projects').child(key).child("images").child(1).update({imageUrl: url})
          })
        }
          // for(let i=0; i<newImagesArray.length; i++){

          // }
          console.log(newImagesArray)
          return Promise.all(newImagesArrayFinal)
        })
      .then((newImagesArrayFinal) => {
          if(newImagesArrayFinal[0] != undefined){
            let imageUr = newImagesArrayFinal[0]
            imageUr.ref.getDownloadURL().then((url) => {
              return firebase.database().ref('projects').child(key).child("dataFinal").child("images").child(0).update({imageUrl: url})
            })
          }
          if(newImagesArrayFinal[1] != undefined){
            let imageUr = newImagesArrayFinal[1]
            imageUr.ref.getDownloadURL().then((url) => {
              return firebase.database().ref('projects').child(key).child("dataFinal").child("images").child(1).update({imageUrl: url})
            })
          }
          // for(let i=0; i<newImagesArrayFinal.length; i++){
          //   let imageUr = newImagesArrayFinal[i]
          //   imageUr.ref.getDownloadURL().then((url) => {
          //     return firebase.database().ref('projects').child(key).child("dataFinal").child("images").child(i).update({imageUrl: url})
          //   })
          // }
          console.log(newImagesArrayFinal)
          // return Promise.all(newImagesArrayFinal)
        })
      .then(() => {
          commit('editProject', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
      // .then(fbImage_1 => {
      //     fbImage_1.ref.getDownloadURL().then((url_1) => {
      //       return firebase.database().ref('projects').child(payload.id).update({imageUrl_1: url_1})
      //     })
      //     return fbImage_2
      //   })
      // .then((data) => {
      //     key = data.key
      //     return key
      //   })
      //   .then(key => {
      //     let imagesArray = payload.images
      //     let newImagesArray = []
      //     for (let i=0; i<imagesArray.length; i++){
      //       let filename = imagesArray[i].name
      //       let ext = filename.slice(filename.lastIndexOf('.'))
      //       let fbImage = firebase.storage().ref('projects/' + key + "/" + key + i+ ext).put(imagesArray[i])
      //       newImagesArray.push(fbImage)
      //     }
      //     console.log(newImagesArray)
      //     return Promise.all(newImagesArray)
      //   })

      // let fbImage_1
      // let fbImage_2
      // const filename1 = payload.image_1.name
      // const ext1 = filename1.slice(filename1.lastIndexOf('.'))
      // const filename2 = payload.image_2.name
      // const ext2 = filename2.slice(filename2.lastIndexOf('.'))
      // firebase.database().ref('projects').child(payload.id).update(projectForServer)
      //   .then(() => {
      //     if(payload.image_1 || payload.image_2) {
      //       fbImage_1 = firebase.storage().ref('projects/' + payload.id + "/" + payload.id + "1" + ext1).put(payload.image_1)
      //       fbImage_2 = firebase.storage().ref('projects/' + payload.id + "/" + payload.id + "2" + ext2).put(payload.image_2)
      //       return fbImage_1
      //     }
      //   })
        // .then(fbImage_1 => {
        //   fbImage_1.ref.getDownloadURL().then((url_1) => {
        //     return firebase.database().ref('projects').child(payload.id).update({imageUrl_1: url_1})
        //   })
        //   return fbImage_2
        // })
        // .then(fbImage_2 => {
        //   fbImage_2.ref.getDownloadURL().then((url_2) => {
        //     return firebase.database().ref('projects').child(payload.id).update({imageUrl_2: url_2})
        //   })
        // })

    sendContact({commit}, payload){
      firebase.database().ref('contacts/' + payload.selected).push(payload.contact)
        .then(() => {
          commit('storeContact', payload)
          commit('sendSuccess')
        })
        .catch(error => {
          commit('setError', error)
        })
    }
  },
  getters: {
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
    images(state, getters) {
      return getters.project.images
    },
    userId(state) {
      return state.userId
    },
    // pseudo (state) {
    //   return state.pseudo
    // },
    user (state) {
      return state.user
      // state.user = state.users.find((user) => {
      //   return user.email === payload.email
      // })
     // return (projectId) => {
     //    return state.users.find((project) => {
     //      return project.id === projectId
     //    })
     //  }
    },
    users (state) {
     return state.users
    },
    isAuthenticated (state) {
      return state.userId
    },
    error (state) {
      return state.error
    },
    resetError (state) {
      return state.resetError
    },
    resetSuccess (state) {
      return state.resetSuccess
    },
    success (state) {
      return state.success
    },
    loading(state){
      return state.loading
    }
  },
  modules: {
    smeta
  }
})

export default store
