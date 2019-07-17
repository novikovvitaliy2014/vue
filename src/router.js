import Vue from 'vue'
import PageMain from './views/mainPage/PageMain.vue'
import store from "./store/store.js"
import VueRouter from 'vue-router'
import Contacts from './components/header/Contacts.vue'
import NotFoundComponent from './views/mainPage/NotFoundComponent.vue'
Vue.use(VueRouter)

// const CreateProject = () => import(/* webpackChunkName: "create" */ './views/projects/CreateProject.vue')
// const PrivateProjects = () => import(/* webpackChunkName: "Private-Projects" */ './views/projects/PrivateProjects.vue')
// const PrivateProject = () => import(/* webpackChunkName: "Private-Project" */ './views/projects/PrivateProject.vue')
// const signup = () => import(/* webpackChunkName: "signup" */ './views/auth/signup.vue')
// const signin = () => import(/* webpackChunkName: "signin" */ './views/auth/signin.vue')
// const UserPage = () => import(/* webpackChunkName: "UserPage" */ './views/projects/UserPage.vue')
const routes = [
  { path: '/',
    name: 'PageMain',
    component: PageMain
    // beforeRouteLeave: (to, from, next) => {
    //   if(true) {

    //     next()
    //   } else {
    //     next('/signin')
    //   }
    // }
    // component: () => import(/* webpackChunkName: "mainPage", webpackPrefetch: true */ './views/mainPage/PageMain.vue')
  },
  { path: '/project/new',
    name: 'CreateProject',
    component: () => import(/* webpackChunkName: "create", webpackPreFetch: true */ './views/projects/CreateProject.vue'),
    beforeEnter: (to, from, next) => {
      if(store.getters.userId !== null) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/private-projects',
    name: 'PrivateProjects',
    component: () => import(/* webpackChunkName: "Private-Projects", webpackPreFetch: true */ './views/projects/PrivateProjects.vue')
    // beforeRouteUpdate: (to, from, next) => {
    //   if(store.getters.userId && store.getters.projects) {
    //     next()
    //   } else {
    //     next('/signin')
    //   }
    // }
  },
  { path: '/user-page',
    name: 'UserPage',
    component: () => import(/* webpackChunkName: "UserPage", webpackPreFetch: true */ './views/projects/UserPage.vue'),
    beforeRouteUpdate: (to, from, next) => {
      if(store.getters.userId) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/contacts',
    name: 'Contacts',
    component: Contacts,
    beforeRouteUpdate: (to, from, next) => {
      if(store.getters.userId) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/private-projects/:id',
    name: 'PrivateProject',
    component: () => import(/* webpackChunkName: "Private-Project", webpackPreFetch: true */ './views/projects/PrivateProject.vue'),
    props: true
    // beforeEnter: (to, from, next) => {
    //   if(store.getters.userId !== null) {
    //     // console.log(store.getters.userId)
    //     next()
    //   } else {
    //     next('/signin')
    //   }
    // }
  },
  { path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup", webpackPreFetch: true */ './views/auth/signup.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin", webpackPreFetch: true */ './views/auth/signin.vue')
  },
  {
    path: '*', component: NotFoundComponent
  }
]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
    // routes: [
    //   { path: '*', component: NotFoundComponent }
    // ]
})


export default router

