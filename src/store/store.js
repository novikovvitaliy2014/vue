import Vue from "vue"
import Vuex from "vuex"
import { mapState, mapGetter, mapActions } from 'vuex'
import axios from './../axios-auth'
import globalAxios from 'axios'
import * as firebase from 'firebase'
import router from '../router.js'
import outlay from './modules/outlay.js'
import {i18n} from '../plugins/i18n.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    projects: [],
    project: [],
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
      console.log(state.users)
    },
    getUser(state, payload){
      // console.log(payload.email)
      console.log(state.users)
      // state.user = payload
      const user = state.users.find((user) => {
        return user.email === payload.email
      })
      state.user = user
      // console.log(payload.email)
      // console.log(state.users)
      console.log(state.user)
      // // console.log(state.user.pseudo)
      // // state.user = user
      // console.log(state.user.pseudo)
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
      if(payload.dataOutlay){
        project.dataOutlay = payload.dataOutlay
      }
      if(payload.dataFinal){
        project.dataFinal = payload.dataFinal
      }
      if(payload.contact){
        project.contacts = payload
      }
      if(payload.donation){
        project.publicList = payload
      }
      if(payload.dataPhotos){
        project.dataPhotos = payload.dataPhotos
      }
    },
    deleteProject(state, payload){
      state.projects.splice(payload, 1)
      console.log(state.projects)
    },
    deleteFinalOutlay(state, payload){
      state.projects[payload].dataFinal = []
      console.log(state.projects[payload])
    },
    deleteOutlay(state, payload){
      state.projects[payload].dataOutlay = []
      console.log(state.projects[payload])
    },

    storeContact(state, payload){
      const contact = {}
      contact[payload.key].push(payload.contact)
      contact[payload.key].push(payload.nickname)
      state.projectContacts.push(contact)
    }
    // setUser(state, newUser) {
    //   state.user = newUser
    // }
  },
  actions: {
    getUser({commit, state}, payload){
      commit('getUser', payload)
    },
    // setLogoutTimer({commit}, expirationTime) {
    //   setTimeout(() => {
    //     commit('clearAuthData')
    //   }, expirationTime * 1000 * 24 * 30)
    // },
    fetchUsers ({commit, state}) {
      console.log(state.idToken)
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
          console.log(users)
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
          // const now = Math.floor(Date.now())
          // const expirationDate = now + (1000 * 3600 * 24 * 30)
          // localStorage.setItem('token', user.data.idToken)
          // localStorage.setItem('userId', user.data.localId)
          // localStorage.setItem('expirationDate', expirationDate)
          // localStorage.setItem('email', signupData.email)
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
      const now = Math.floor(Date.now())
      if(now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit ('authUser', {
        token: token,
        userId: userId
      })
    },
    signin ({commit, dispatch, state}, signinData) {
      // dispatch('tryAutoSignin')
      commit('clearError')
      axios.post('/verifyPassword?key=AIzaSyDNMxHSzaOvcKd6E8GasiSoIRXlm7k7x_4', {
        email: signinData.email,
        password: signinData.password,
        returnSecureToken: true
      })
        .then(user => {
          // const now = Math.floor(Date.now())
          // const expirationDate = now + (1000 * 3600 * 24 * 30)
          // const expirationDate = new Date(now.getTime() + user.data.expiresIn * 1000)
          // localStorage.setItem('token', user.data.idToken)
          // localStorage.setItem('userId', user.data.localId)
          // localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: user.data.idToken,
            userId: user.data.localId
          })
          // dispatch('fetchUsers')
          // commit('getUser', {email: signinData.email})
          commit('sendSuccess')
          // const id = state.idToken
          console.log(user.data.idToken)
          return
          // dispatch('fetchUsers')
        })
        // .then((id) => {
        //   dispatch('fetchUsers')
        //   // console.log(state.idToken)
        //   // commit('getUser', {email: signinData.email})
        //   // console.log(state.users)
        //   // const users = state.users
        //   const id2 = state.idToken
        //   console.log(id2)
        //   return id2
        // })
        // .then((id2) => {
        //   commit('getUser', {email: signinData.email})
        // //   commit('sendSuccess')
        // //   console.log(state.users)
        // })
        .catch(error => {
          commit('setError', error)
          console.log(error)
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
        // outlayQuantity1: payload.outlayQuantity1,
        // outlayPrice1: payload.outlayPrice1,
        // outlayName1: payload.outlayName1,
        // outlayQuantity2: payload.outlayQuantity2,
        // outlayPrice2: payload.outlayPrice2,
        // outlayName2: payload.outlayName2,
        // outlayQuantity3: payload.outlayQuantity3,
        // outlayPrice3: payload.outlayPrice3,
        // outlayName3: payload.outlayName3,
        // outlayQuantity4: payload.outlayQuantity4,
        // outlayPrice4: payload.outlayPrice4,
        // outlayName4: payload.outlayName4,
        // outlayQuantity5: payload.outlayQuantity5,
        // outlayPrice5: payload.outlayPrice5,
        // outlayName5: payload.outlayName5,
        dataOutlay: payload.dataOutlay,
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
          // let newImagesArray = []
          if(imagesArray != undefined) {
            for(let i = 0; i < 2; i++) {
              if(imagesArray[i] != undefined){
                firebase.storage().ref('projects/' + key + "/" + key + i).put(imagesArray[i])
              }
            }
            // if(imagesArray[0] != undefined){
            //   let filename = imagesArray[0].name
            //   let ext = filename.slice(filename.lastIndexOf('.'))
            //   let fbImage = firebase.storage().ref('projects/' + key + "/" + key + "0").put(imagesArray[0])
            //   newImagesArray[0] = fbImage
            // }
            // if(imagesArray[1] != undefined){
            //   let filename = imagesArray[1].name
            //   let ext = filename.slice(filename.lastIndexOf('.'))
            //   let fbImage = firebase.storage().ref('projects/' + key + "/" + key + "1").put(imagesArray[1])
            //   let fbImage = firebase.storage().ref("resized-" + key + "1" + ext)
            //   newImagesArray[1] = fbImage
            // }
          }
          // for (let i=0; i<imagesArray.length; i++){
          //   let filename = imagesArray[i].name
          //   let ext = filename.slice(filename.lastIndexOf('.'))
          //   let fbImage = firebase.storage().ref('projects/' + key + "/" + key + i+ ext).put(imagesArray[i])
          //   newImagesArray.push(fbImage)
          // }
          console.log(newImagesArray[0])
          console.log(newImagesArray[1])
          console.log(newImagesArray)
          // return Promise.all(newImagesArray)
        })
        // .then((newImagesArray) =>{
        //   })
        // .then((newImagesArray) => {
          // for(let i=0; i<newImagesArray.length; i++){
          //   let imageUr = newImagesArray[i]
          //   imageUr.ref.getDownloadURL().then((url) => {
          //     return firebase.database().ref('projects').child(key).child("images").child(i).update({imageUrl: url})
          //   })
          // }
          // console.log(newImagesArray)
          // if(newImagesArray[0] != undefined){
          //   let imageUr = newImagesArray[0]
          //   // let imageUr = firebase.storage().ref("resized-" + key + "1" + ext)
          //   imageUr.ref.getDownloadURL().then((url) => {
          //     return firebase.database().ref('projects').child(key).child("images").child(0).update({imageUrl: url})
          //   })
          // }
          // if(newImagesArray[1] != undefined){
          //   // let imageUr = newImagesArray[1]
          //   // let imageUr = firebase.storage().ref('resized-' + key + "1" + ext)
          //   let imageUr = firebase.storage().ref('projects/' + key + "1"  + "/"  + 'resized-' + key + "1" )
          //   console.log(imageUr)
          //   imageUr.ref.getDownloadURL().then((url) => {
          //     return firebase.database().ref('projects').child(key).child("images").child(1).update({imageUrl: url})
          //   })
          // }
          // console.log(newImagesArray)
          // return Promise.all(newImagesArrayFinal)
          // return Promise.all(newImagesDataArray)
        // })

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
    resizeImages({commit, state}){
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
                  return firebase.database().ref('projects').child(key).child("dataFinal").child("images").child(i).update({imageUrl: url})
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




            // const imageFinal0 = firebase.storage().ref("projects/" + key + "0" + "/" + "dataFinal/" + "resized-" + key + "0")
            // if(imageFinal0 !== undefined && imageFinal0 !== null){
            //   imageFinal0.getDownloadURL().then((url) => {
            //     return firebase.database().ref('projects').child(key).child("dataFinal").child("images").child(0).update({imageUrl: url})
            //   })
            // }

            // const imageFinal1 = firebase.storage().ref("projects/" + key + "1" + "/" + "dataFinal/" + "resized-" + key + "1")
            // if(imageFinal1 !== undefined && imageFinal1 !== null){
            //   imageFinal1.getDownloadURL().then((url) => {
            //     return firebase.database().ref('projects').child(key).child("dataFinal").child("images").child(1).update({imageUrl: url})
            //   })
            // }

          }
          console.log('resized')
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadProjects({commit, state}) {
      commit('setLoading', true)
      globalAxios.get('/projects.json' + '?auth=' + state.idToken)
        // .then(res => {
        //   const obj = res.data
        //   for (let key in obj) {
        //     const imageUr = firebase.storage().refFromURL("gs://vue-city.appspot.com/" + "projects/" + key + "1"+ "/"  + "resized-" + key + "1" )
        //     imageUr.getDownloadURL().then((url) => {
        //       return firebase.database().ref('projects').child(key).child("images").child(1).update({imageUrl: url})
        //     })
        //   }
        //   return res
        // })
        .then(res => {
          const projects = []
          const obj = res.data
          for (let key in obj) {
            projects.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              date: obj[key].date,
              projectImages: obj[key].images,
              dataOutlay: obj[key].dataOutlay,
              dataFinal: obj[key].dataFinal,
              projectId: obj[key].projectId,
              creatorId: obj[key].creatorId,
              contacts: obj[key].contacts,
              dataPhotos: obj[key].dataPhotos
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
      if(payload.date){
        projectForServer.date = payload.date
      }
      if(payload.dataOutlay){
        projectForServer.dataOutlay = payload.dataOutlay
      }
      if(payload.dataFinal){
        projectForServer.dataFinal = payload.dataFinal
      }
      if(payload.contact){
        firebase.database().ref('projects').child(payload.id).child("contacts").push(payload)
      }
      if(payload.donation){
        firebase.database().ref('projects').child(payload.id).child("contacts").child(payload.index).update(payload)
      }
      // let key
      let key = payload.id
      let newImagesArray = []
      let newImagesArrayFinal = []
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
            // if(imagesArray[0] != undefined){
            //   let filename = imagesArray[0].name
            //   let ext = filename.slice(filename.lastIndexOf('.'))
            //   let fbImage = firebase.storage().ref('projects/' + key + "/" + key + "0").put(imagesArray[0])
            //   newImagesArray[0] = fbImage
            // }
            // if(imagesArray[1] != undefined){
            //   let filename = imagesArray[1].name
            //   let ext = filename.slice(filename.lastIndexOf('.'))
            //   let fbImage = firebase.storage().ref('projects/' + key + "/" + key + "1").put(imagesArray[1])
            //   newImagesArray[1] = fbImage
            // }

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
              for(let i = 0; i < 5; i++ ){
                if(imagesArray[i] != undefined){
                  firebase.storage().ref('projects/' + key + "/" + "dataFinal/" + key + i).put(imagesArray[i])
                }
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
      // .then((newImagesArray) => {
      //   if(newImagesArray[0] != undefined){
      //     let imageUr = newImagesArray[0]
      //     imageUr.ref.getDownloadURL().then((url) => {
      //       return firebase.database().ref('projects').child(key).child("images").child(0).update({imageUrl: url})
      //     })
      //   }
      //   if(newImagesArray[1] != undefined){
      //     let imageUr = newImagesArray[1]
      //     imageUr.ref.getDownloadURL().then((url) => {
      //       return firebase.database().ref('projects').child(key).child("images").child(1).update({imageUrl: url})
      //     })
      //   }
      //     console.log(newImagesArray)
      //     return Promise.all(newImagesArrayFinal)
      //   })
      // .then((newImagesArrayFinal) => {
      //     if(newImagesArrayFinal[0] != undefined){
      //       let imageUr = newImagesArrayFinal[0]
      //       imageUr.ref.getDownloadURL().then((url) => {
      //         return firebase.database().ref('projects').child(key).child("dataFinal").child("images").child(0).update({imageUrl: url})
      //       })
      //     }
      //     if(newImagesArrayFinal[1] != undefined){
      //       let imageUr = newImagesArrayFinal[1]
      //       imageUr.ref.getDownloadURL().then((url) => {
      //         return firebase.database().ref('projects').child(key).child("dataFinal").child("images").child(1).update({imageUrl: url})
      //       })
      //     }
      //     for(let i=0; i<newImagesArrayFinal.length; i++){
      //       let imageUr = newImagesArrayFinal[i]
      //       imageUr.ref.getDownloadURL().then((url) => {
      //         return firebase.database().ref('projects').child(key).child("dataFinal").child("images").child(i).update({imageUrl: url})
      //       })
      //     }
      //     console.log(newImagesArrayFinal)
      //     return Promise.all(newImagesArrayFinal)
      //   })
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
      const contactsData = {
        contact: payload.contact,
        nickname: payload.nickname
      }
      firebase.database().ref('projects').child(payload.key).child("contacts").push(contactsData)
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
    outlay
  }
})

export default store
