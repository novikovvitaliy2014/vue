<template>
  <header class="header"  >
    <v-progress-linear
      class="header__progress"
      color="green"
      height="5"
      value="15"
      v-if="loading"
      :indeterminate="true"
    ></v-progress-linear>
    <div class="header__top">
      <!-- <v-btn @click="showMenu">
        Menu
      </v-btn> -->
      <div class="side-logo">
        <v-toolbar-side-icon class="side-icon"
          @click="showMenu"
          >
        </v-toolbar-side-icon>

        <router-link to="/">
          <logo></logo>
        </router-link>
      </div>
      <!-- <v-toolbar> -->

        <!-- <v-spacer></v-spacer> -->

      <nav>
        <ul>
          <router-link to="/project/new"
             tag="li"

             >
          Create Project
          </router-link>
          <router-link to="/private-projects"
             tag="li"

             >
          Private Projects
          </router-link>
          <router-link to="/signup"
                       tag="li"
                       v-if="!auth"
                       >
          Sign up
          </router-link>
          <router-link to="/signin"
                       tag="li"
                       v-if="!auth"
                       >
          Sign in
          </router-link>
          <!-- <router-link to="/donors"
                       tag="li"
                       v-if="auth"
                       >
          Participants
          </router-link> -->
          <li v-if="auth"
              @click="onLogout"
              >
              <span>
                <v-icon>exit_to_app</v-icon>
              Log out
              </span>
              <span>{{ userNick }}</span>
              <!-- <span >{{ user.pseudo }}</span> -->
              <!-- <span >{{ user }}</span> -->
          </li>
          <!-- <li @click="showContacts"
              >
          Contacts
          </li> -->
        </ul>
      </nav>
      <v-select
        class="header__lang"
        v-model="selected"
        :items="languages"
        @change="setLocale"
        label="Language">
      </v-select>
    </div>
    <div :class="{overlay__show: isActive}"
          class="overlay"
          @click="showMenu"></div>
    <side :class="{side__show: isOpen}"
      @emitShowMenu="showMenu"
      >
    </side>
  </header>
</template>

<script>
import Logo from './Logo.vue'
import Contacts from './Contacts.vue'
import SideMenu from './SideMenu.vue'


export default {
  components: {
    Logo,
    Contacts,
    "side": SideMenu
  },
  data () {
    return {
      isActive: false,
      isOpen: false,
      selected: 'Russian',
      languages: ['English','Russian'],
      locale: "ru",
      userIsCreator: false
      // userPseudo: 'R'
    }
  },
  computed: {
    auth() {
      if (this.$store.getters.userId !== null && this.$store.getters.userId !== undefined){
        return true
      }
    },
    userNick() {
      if(this.$store.getters.user.pseudo){
        return this.$store.getters.user.pseudo
      } else {
        return localStorage.getItem('pseudo')
      }
    },
    loading(){
      return this.$store.getters.loading
    },
    // user(){
    //   return this.$store.getters.user
    // },
    // userIsCreator(){
    //   return this.$store.getters.projects.find((project) =>{
    //     return project.creatorId == this.$store.getters.userId
    //   })
    // },
    // user(){
    //   let users = this.$store.getters.users
    //   return users.find((user) => {
    //     return user.email === this.email
    //   })
    // },
    // users(){
    //   return this.$store.getters.users
    //   console.log(this.$store.getters.users)
    // }
  },
  methods: {
    setLocale(){
      if (this.selected === 'English'){
        import('../../langs/en.json').then(msgs =>{
          this.$i18n.setLocaleMessage('en', msgs)
          this.$i18n.locale = 'en'
        })
        this.locale = 'en'
      } else if (this.selected === 'Russian') {
        import('../../langs/ru.json').then(msgs =>{
          this.$i18n.setLocaleMessage('ru', msgs)
          this.$i18n.locale = 'ru'
        })
        this.locale = 'ru'
      }
      this.$store.dispatch('initSmeta', this.locale)
    },
    showMenu() {
      console.log(this.$store.getters.projects)
      this.userIsCreator = this.$store.getters.projects.find((project) =>{
        return project.creatorId == this.$store.getters.userId
      })
      this.isOpen = !this.isOpen
      this.isActive = !this.isActive
    },
    onLogout() {
      this.$store.dispatch('logout')
    }
  },
  // mounted(){
  //   if(!this.$store.getters.userId){
  //     this.$router.push({ path: '/'})
  //   }
  // },
  created () {
  }
};
</script>

