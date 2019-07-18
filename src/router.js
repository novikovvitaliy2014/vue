import Vue from 'vue'
import PageMain from './views/mainPage/PageMain.vue'
import store from "./store/store.js"
import VueRouter from 'vue-router'
import Contacts from './components/header/Contacts.vue'
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
    component: PageMain,
  },
  { path: '/project/new',
    name: 'CreateProject',
    component: () => import(/* webpackChunkName: "create" */ './views/projects/CreateProject.vue'),
    beforeRouteUpdate: (to, from, next) => {
      if(store.getters.userId && store.getters.projects) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/private-projects',
    name: 'PrivateProjects',
    component: () => import(/* webpackChunkName: "Private-Projects" */ './views/projects/PrivateProjects.vue'),
    beforeRouteUpdate: (to, from, next) => {
      if(store.getters.userId && store.getters.projects) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/user-page',
    name: 'UserPage',
    component: () => import(/* webpackChunkName: "UserPage" */ './views/projects/UserPage.vue'),
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
    component: () => import(/* webpackChunkName: "Private-Project" */ './views/projects/PrivateProject.vue'),
    props: true,
    beforeRouteUpdate: (to, from, next) => {
      if(store.getters.userId) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ './views/auth/signup.vue')
  },
  { path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ './views/auth/signin.vue')
  }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})


export default router

