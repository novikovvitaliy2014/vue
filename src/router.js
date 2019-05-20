import Vue from 'vue'
import Donors from './views/donorsPage/Donors.vue'
import signup from './views/auth/signup.vue'
import signin from './views/auth/signin.vue'
import UserPage from './views/projects/UserPage.vue'
import PageMain from './views/mainPage/PageMain.vue'
import store from "./store/store.js"
import VueRouter from 'vue-router'
import CreateProject from './views/projects/CreateProject.vue'
import PrivateProjects from './views/projects/PrivateProjects.vue'
import PrivateProject from './views/projects/PrivateProject.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/',
    name: 'PageMain',
    component: PageMain
  },
  { path: '/project/new',
    name: 'CreateProject',
    component: CreateProject,
    beforeRouteUpdate: (to, from, next) => {
      if(store.getters.userId) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/private-projects',
    name: 'PrivateProjects',
    component: PrivateProjects,
    beforeRouteUpdate: (to, from, next) => {
      if(store.getters.userId) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  { path: '/user-page',
    name: 'UserPage',
    component: UserPage,
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
    component: PrivateProject,
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
    component: signup
  },
  // { path: '/profile',
  //   name: 'profile',
  //   component: profile
  // },
  // { path: '/donors',
  //     name: 'CreateProject'
  //     component: Donors,
  //     beforeEnter: (to, from, next) => {
  //       if(store.getters.isAuthenticated) {
  //         next()
  //       } else {
  //         next('/signin')
  //       }
  //     }
  // },
  { path: '/signin',
    name: 'signin',
    component: signin
  }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

