<template>
  <div class="side">
    <nav>
      <ul @click="emitShowMenu">
        <router-link to="/signin"
                       tag="li"
                       v-if="!auth"
                       >
        {{ $t('nav-signin') }}
        </router-link>
        <router-link to="/signup"
                     tag="li"
                     v-if="!auth"
                     >
        {{ $t('nav-signup') }}
        </router-link>
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
        <router-link to="/contacts"
           tag="li"
           >
        {{ $t('nav-contacts') }}
        </router-link>
        <li class="side__logout" v-if="auth"
            @click="onLogout"
            >
            <span>
              {{ $t('nav-logout') }}
            </span>
        </li>
        <router-link to="/user-page"
           tag="li"
           v-if="userIsCreator"
           >
           {{ $t('nav-user') }}
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    userIsCreator(){
      return this.$store.getters.projects.find((project) =>{
        return project.creatorId == this.$store.getters.userId
      })
    },
    auth() {
      return this.$store.getters.userId !== null && this.$store.getters.userId !== undefined
    }
  },
  methods: {
    emitShowMenu(){
      this.$emit("emitShowMenu")
    },
    onLogout() {
      this.$store.dispatch('logout')
    }
  }
};
</script>
