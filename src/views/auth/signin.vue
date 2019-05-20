<template>
  <section class="signin">
    <h1>Sign in</h1>
    <v-form @submit.prevent = "onSubmitSignin"
      v-model="valid"
      method="post"
      action="/submit"
      lazy-validation
      v-if="!success"
     >
      <v-text-field
        type="email"
        :rules="emailRules"
        label="Email"
        id="email"
        v-model='email'
        required
        >
      </v-text-field>
      <v-text-field
        :type="passwordType"
        :rules="passwordRules"
        label="Password"
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
             Sign in
      </button>

      <v-alert
        dismissible
        error
        @input='onDismissed'
        :value="true"
        class="alert__error"
        v-if="error"
        >
        Enter a valid email address and password
      </v-alert>
    </v-form>
    <span @click="forgotPass"
          class="forgot__question"
          v-if="!success">
        Forgot your password?
    </span>
    <p v-if="forgot">Enter the email address associated with your account, we will send to you recovery link</p>
    <v-text-field
        type="email"
        :rules="emailRules"
        label="Email"
        v-if="forgot"
        v-model='email'
        required
        >
    </v-text-field>
    <button v-if="forgot"
            @click="resetPass"
            class="btn"
            >
          Send
    </button>

    <v-alert
      dismissible
      error
      :value="true"
      v-if="resetError"
      >
      We're sorry. We weren't able to identify you given the information provided.
    </v-alert>
    <v-alert
      dismissible
      type="success"
      :value="true"
      v-if="resetSuccess"
      >
      Recovery link is sent to your email adress
    </v-alert>
    <!-- <p v-if="error">
      Check again, something is wrong!
    </p> -->
    <v-alert
      dismissible
      type="success"
      :value="true"
      v-if="success"
      >
      You signed in. Now you can create own project or visit Private Projects page!
    </v-alert>
    <div class="signin__next">
      <router-link to="/project/new"
         tag="a"
         v-if="success"
         class="create__link-to-projects"
         >
      Create Project
      </router-link>
      <router-link to="/private-projects"
         tag="a"
         v-if="success"
         class="create__link-to-projects"
         >
      Private Projects
      </router-link>

    </div>
    <!-- <p>Users{{users}}</p>
    <p>User{{user}}</p> -->
    <!-- <p>Projects{{projects}}</p> -->


  </section>
</template>

<script>
export default {
  data() {
    return {
      // user: {},
      forgot: false,
      password: '',
      hidePassword: true,
      valid: true,
      donation: null,
      passwordRules: [
        v => !!v || 'Enter your password',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters'
      ],
      emailRules: [
        v => !!v || 'Enter your email',
        v => /.+@.+/.test(v) || 'Enter a valid email address',
        v => (v && v.length >= 8) || 'Enter a valid email address'
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
      }, 1000)
    },
    getUserData(){
      setTimeout(() => {
        this.$store.dispatch('getUser', {email: this.email})
        localStorage.setItem('pseudo', this.$store.getters.user.pseudo)
      }, 2000)

    },
    loadProjects(){
      setTimeout(() => {
        this.$store.dispatch('loadProjects')
      }, 1000)

    },
    async onSubmitSignin() {
      try {
        await this.authUser()
        console.log("auth")
        await this.fetchUsers()
        console.log("fetch")
        await this.getUserData()
        console.log("getUser")
        await this.loadProjects()
        console.log("loadPros")
      } catch (e) {
          console.log(e)
      }
    }
  },
  computed: {
    // projects(){
    //   return this.$store.getters.projects
    // },
    // fetch(){
    //   if(this.success){
    //     this.$store.dispatch('fetchUsers')
    //   }
    //   console.log("fetched")
    // },
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
    // auth() {
    //   return this.$store.getters.userId !== null && this.$store.getters.userId !== undefined
    // },
    // user(){
    //   return this.$store.getters.user
    // },
    // users(){
    //   return this.$store.getters.users
    // }
  },
  created () {
    // this.$store.dispatch('tryAutoSignin')

    // this.email === localStorage.getItem('email')
    // console.log(this.$store.getters.users)
  }
};
</script>
