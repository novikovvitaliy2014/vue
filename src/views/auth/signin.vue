<template>
  <section class="signin">
    <h1>{{$t('nav-signin')}}</h1>
    <h4 v-if="!auth">{{$t('signin-explain')}}</h4>
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
         class="signin__link-to-projects"
         >
      {{$t('nav-create')}}
      </router-link>
      <router-link to="/private-projects"
         tag="a"
         v-if="auth"
         class="signin__link-to-projects"
         >
      {{$t('nav-projects')}}
      </router-link>
      <!-- <p>users{{users}}</p> -->
      <p>user{{user}}</p>
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
      // user: {},
      forgot: false,
      password: '',
      hidePassword: true,
      valid: true,
      donation: null,
      passwordRules: [
        value => !!value || this.$i18n.t('enter-data'),
        value => (value && value.length >= 6) || this.$i18n.t('min-6')
      ],
      emailRules: [
        value => !!value || this.$i18n.t('enter-data'),
        value => /.+@.+/.test(value) || this.$i18n.t('valid-email'),
        value => (value && value.length >= 8) || this.$i18n.t('valid-email')
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
    // authUser() {
    //   const signinData = {
    //     email: this.email,
    //     password: this.password
    //   }
    //   this.$store.dispatch('signin', signinData)
    // },

    // loadProjects(){
    //   setTimeout(() => {
    //     this.$store.dispatch('loadProjects')
    //   }, 1000)
    // },
    // fetchUsers(){
    //   setTimeout(() => {
    //     this.$store.dispatch('fetchUsers')
    //   }, 2000)
    // },
    // getUserData(){
    //   setTimeout(() => {
    //     localStorage.setItem('pseudo', this.$store.getters.user.pseudo)
    //     this.$store.dispatch('getUser', {email: this.email})
    //   }, 3000)
    // },
    onSubmitSignin() {
      const signinData = {
        email: this.email,
        password: this.password,
        pseudo: this.user.pseudo
      }
      this.$store.dispatch('signin', signinData)
    }
    // async onSubmitSignin() {
    //   try {
    //     await this.authUser()
    //     await this.loadProjects()
    //     await this.fetchUsers()
    //     await this.getUserData()
    //   } catch (e) {
    //       console.log(e)
    //   }
    // }
  },
  // async onSubmitSignin() {
  //     try {
  //       await this.authUser()
  //       await this.getUserData()
  //     } catch (e) {}
  // async authUser() {
  //   await this.$store.dispatch('signin')
  // },
  // async getUserData(){
  //   await this.$store.dispatch('getUser')
  // }
  computed: {
    // userNick() {
    //   if(this.$store.getters.user){
    //     return this.$store.getters.user.pseudo
    //   } else if (localStorage.getItem('pseudo')){
    //     return localStorage.getItem('pseudo')
    //   }
    // },
    // users(){
    //   return this.$store.getters.users
    // },
    user(){
      return this.$store.getters.user
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
    // this.user = this.$store.getters.user
    this.$store.commit('setError',{status: false})
    this.$store.commit('setSuccess',{status: false})
  }
};
</script>

<style lang="sass">
  @import "@/sass/_auth.sass"
</style>
