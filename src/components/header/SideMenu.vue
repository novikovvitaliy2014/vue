<template>
  <div class="side">
    <nav>
      <ul @click="emitShowMenu">
        <router-link to="/signin"
                       tag="li"
                       v-if="!auth"
                       >
        Sign in
        </router-link>
        <router-link to="/signup"
                     tag="li"
                     v-if="!auth"
                     >
        Sign up
        </router-link>
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
        <!-- <li @click="emitShowContacts"
            >
        Contacts
        </li> -->
        <router-link to="#"
           tag="li"
           >
        Contacts
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
              <v-icon>exit_to_app</v-icon>Log out
            </span>
            <!-- <span>{{ userPseudo }}</span> -->
        </li>
        <router-link to="/user-page"
           tag="li"
           v-if="userIsCreator"
           >
           User Page
        </router-link>
      </ul>
    </nav>
    <!-- <contacts :class="{contacts__show: isActive}"></contacts> -->
  </div>
</template>

<script>
import Contacts from './Contacts.vue'

export default {
  components: {
    Contacts
  },
  data () {
    return {
      isActive: false,
    }
  },
  computed: {
    userIsCreator(){
      return this.$store.getters.projects.find((project) =>{
        return project.creatorId == this.$store.getters.userId
      })
    },
    auth() {
      return this.$store.getters.isAuthenticated !== null && this.$store.getters.isAuthenticated !== undefined
    },
    // userPseudo() {
    //   return this.$store.getters.userPseudo
    // }
  },
  methods: {
    emitShowMenu(){
      this.$emit("emitShowMenu")
    },
    // emitShowContacts() {
    //   this.$emit("emitShowContacts")
    // },
    onLogout() {
      this.$store.dispatch('logout')
    }
  },
  created () {
    this.$store.dispatch('loadProjects')
    // this.$store.dispatch('fetchUsers')
    // this.userPseudo = this.$store.getters.userPseudo
  }

};
</script>
