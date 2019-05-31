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

// import WebFontLoader from 'webfontloader'
export default {
  components: {
    'app-header': Header,
    'app-footer': Footer,
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
  // mounted () {
  //   WebFontLoader.load({
  //     google: {
  //       families: ['Roboto:100,300,400,500,700,900']
  //     }
  //   })
  // }
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
</style>
