<template>
  <v-app>
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from './components/header/Header.vue'
import Footer from './components/footer/Footer.vue'
import PageMain from './views/mainPage/PageMain.vue'
import Donors from './views/donorsPage/Donors.vue'
import Signin from './views/auth/signin.vue'
import Signup from './views/auth/signup.vue'
import UserPage from './views/projects/UserPage.vue'
import CreateProject from './views/projects/CreateProject.vue'
import PrivateProjects from './views/projects/PrivateProjects.vue'
import PrivateProject from './views/projects/PrivateProject.vue'
// import Signup from './views/auth/signup.vue'

import WebFontLoader from 'webfontloader'
export default {
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'private-projects': PrivateProjects,
    'private-project': PrivateProject,
    CreateProject,
    PageMain,
    Donors,
    Signin,
    Signup,
    "user-page": UserPage
  },
  computed: {
    auth() {
      return this.$store.getters.userId !== null && this.$store.getters.userId !== undefined
    }
  },
  created() {
    this.$store.dispatch('tryAutoSignin')
    this.$vuetify.theme.green = "#4CAF50"
    this.$vuetify.theme.primary = "#4CAF50"
    this.$vuetify.theme.greendarken4 = "#1B5E20"
  },
  mounted () {
    WebFontLoader.load({
      google: {
        families: ['Roboto:100,300,400,500,700,900']
      }
    })
  }
};
</script>

<style lang="sass">
  @import "./sass/_mixins.sass"
  @import "./sass/_variables.sass"
  @import "./sass/_base.sass"
  @import "./sass/_auth.sass"
  @import "./sass/_about.sass"
  @import "./sass/_contacts.sass"
  @import "./sass/_donors.sass"
  @import "./sass/_dialogs.sass"
  @import "./sass/_features.sass"
  @import "./sass/_footer.sass"
  @import "./sass/_header.sass"
  @import "./sass/_project.sass"
  @import "./sass/_logo.sass"
  @import "./sass/_side-menu.sass"
  @import "./sass/_private-projects.sass"
  @import "./sass/_create.sass"
  @import "./sass/_user-page.sass"
  @import "./sass/_final-photos.sass"
</style>
