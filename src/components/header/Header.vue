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
      <div class="side-logo">
        <v-toolbar-side-icon class="side-icon"
          @click="showMenu"
          >
        </v-toolbar-side-icon>

        <router-link to="/">
          <logo></logo>
        </router-link>
      </div>
      <nav>
        <ul>
          <router-link to="/project/new"
             tag="li"
             >
          {{ $t('nav-create') }}
          </router-link>
          <router-link to="/private-projects"
             tag="li"
             >
          {{ $t('nav-projects') }}
          </router-link>
          <router-link to="/signup"
                       tag="li"
                       v-if="!auth"
                       >
          {{ $t('nav-signup') }}
          </router-link>
          <router-link to="/signin"
                       tag="li"
                       v-if="!auth"
                       >
          {{ $t('nav-signin') }}
          </router-link>
          <li v-if="auth"
              @click="onLogout"
              >
              <span>
                <v-icon>exit_to_app</v-icon>
                {{ $t('nav-logout') }}
              </span>
          </li>
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
import SideMenu from './SideMenu.vue'


export default {
  components: {
    Logo,
    "side": SideMenu
  },
  data () {
    return {
      isActive: false,
      isOpen: false,
      selected: 'English',
      languages: ['English','Russian'],
      locale: "en",
      userIsCreator: false
    }
  },
  computed: {
    auth() {
      return this.$store.getters.userId !== null && this.$store.getters.userId !== undefined
    },
    loading(){
      return this.$store.getters.loading
    }
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
      this.$store.dispatch('initOutlay', this.locale)
    },
    showMenu() {
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
  created () {
    if(!this.$store.getters.user){
      this.$store.dispatch('logout')
    }
  }
};
</script>

