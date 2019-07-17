import Vue from 'vue'
import PageMain from './views/mainPage/PageMain.vue'
import store from "./store/store.js"
import VueRouter from 'vue-router'
import Contacts from './components/header/Contacts.vue'
import NotFoundComponent from './views/mainPage/NotFoundComponent.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/',
    name: 'PageMain',
    component: PageMain
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
})


export default router

