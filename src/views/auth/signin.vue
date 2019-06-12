<template>
  <section class="signin">
    <h1>{{$t('nav-signin')}}</h1>
    <h4>{{$t('signin-explain')}}</h4>
    <v-form @submit.prevent = "onSubmitSignin"
      v-model="valid"
      method="post"
      action="/submit"
      lazy-validation
      v-if="!auth"
     >
      <v-text-field
        type="email"
        :rules="emailRules"
        :label="$t('email')"
        id="email"
        v-model='email'
        required
        >
      </v-text-field>
      <v-text-field
        :type="passwordType"
        :rules="passwordRules"
        :label="$t('password')"
        id="password"
        v-model='password'
        :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
        @click:append="hidePassword = !hidePassword"
        required>
      </v-text-field>

      <button :disabled="!valid"
               type="submit"
               class="btn"
               tag="button">
             {{$t('nav-signin')}}
      </button>

      <v-alert
        dismissible
        error
        @input='onDismissed'
        :value="true"
        class="alert__error"
        v-if="error"
        >
        {{$t('valid-email')}}
      </v-alert>
    </v-form>
    <span @click="forgotPass"
          class="forgot__question"
          v-if="!auth">
          {{$t('forgot-password')}}
    </span>
    <p v-if="forgot">
    {{$t('email-for-reset')}}</p>
    <v-text-field
        type="email"
        :rules="emailRules"
        :label="$t('email')"
        v-if="forgot"
        v-model='email'
        required
        >
    </v-text-field>
    <button v-if="forgot"
            @click="resetPass"
            class="btn"
            >
          {{$t('send')}}
    </button>

    <v-alert
      dismissible
      error
      :value="true"
      v-if="resetError"
      >
      {{$t('email-error')}}
    </v-alert>
    <v-alert
      dismissible
      type="success"
      :value="true"
      v-if="resetSuccess"
      >
      {{$t('reset-sent')}}
    </v-alert>
    <v-alert
      dismissible
      type="success"
      :value="true"
      v-if="auth"
      >
      {{$t('signed-in')}}
    </v-alert>
    <div class="signin__next">
      <router-link to="/project/new"
         tag="a"
         v-if="auth"
         class="create__link-to-projects"
         >
      {{$t('nav-create')}}
      </router-link>
      <router-link to="/private-projects"
         tag="a"
         v-if="auth"
         class="create__link-to-projects"
         >
      {{$t('nav-projects')}}
      </router-link>
    </div>
  </section>
</template>

<script>
import VForm from 'vuetify/es5/components/VForm/VForm'
import VAlert from 'vuetify/es5/components/VAlert/VAlert'
import VTextField from 'vuetify/es5/components/VTextField/VTextField'

export default {
  components: {
    VForm,
    VAlert,
    VTextField
  },
  data() {
    return {
      forgot: false,
      password: '',
      hidePassword: true,
      valid: true,
      donation: null,
      passwordRules: [
        v => !!v || this.$i18n.t('enter-data'),
        v => (v && v.length >= 6) || this.$i18n.t('min-6')
      ],
      emailRules: [
        v => !!v || this.$i18n.t('enter-data'),
        v => /.+@.+/.test(v) || this.$i18n.t('valid-email'),
        v => (v && v.length >= 8) || this.$i18n.t('valid-email')
      ],
      errors: [],
      email: ''
    }
  },
  methods: {
    forgotPass() {
      this.forgot = !this.forgot
    },
    resetPass() {
      const email = this.email
      this.$store.dispatch('resetPassword', email)
    },
    onDismissed() {
      this.$store.dispatch('clearError')
    },
    authUser() {
      const signinData = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signin', signinData)
    },
    fetchUsers(){
      setTimeout(() => {
        this.$store.dispatch('fetchUsers')
      }, 2000)
    },
    loadProjects(){
      setTimeout(() => {
        this.$store.dispatch('loadProjects')
      }, 1000)
    },
    getUserData(){
      setTimeout(() => {
        this.$store.dispatch('getUser', {email: this.email})
        localStorage.setItem('pseudo', this.$store.getters.user.pseudo)
      }, 3000)
    },
    async onSubmitSignin() {
      try {
        await this.authUser()
        await this.fetchUsers()
        await this.loadProjects()
        await this.getUserData()
      } catch (e) {
          // console.log(e)
      }
    }
  },
  computed: {
    userNick() {
      if(this.$store.getters.user){
        return this.$store.getters.user.pseudo
      } else if (localStorage.getItem('pseudo')){
        return localStorage.getItem('pseudo')
      }
    },
    error() {
      return this.$store.getters.error
    },
    success() {
      return this.$store.getters.success
    },
    resetSuccess() {
      return this.$store.getters.resetSuccess
    },
    passwordType() {
      return this.hidePassword ? 'password' : 'text'
    },
    resetError() {
      return this.$store.getters.resetError
    },
    auth() {
      return this.$store.getters.userId !== null && this.$store.getters.userId !== undefined
    }
  },
  created () {
    this.$store.commit('setError',{status: false})
    this.$store.commit('setSuccess',{status: false})
  }
};
</script>

<style lang="sass">
  @import "./../../sass/_auth.sass"
</style>
