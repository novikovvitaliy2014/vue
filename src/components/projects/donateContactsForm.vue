<template>
  <div class="project__participation">
    <!-- <button class="btn" @click="showContact">Book Donation</button> -->
    <p>{{$t('enter-contacts')}}</p>
    <div  >
      <v-form v-model="valid" @submit.prevent = "sendContact">
        <v-text-field
          type="text"
          label="Enter your contacts"
          :rules="contactRules"
          placeholder="Email or Phone number or Skype or social link, etc."
          id="contact"
          class="donor__contact"
          v-model="contact"
          lazy-validation
          color="green"
          title="Project author will contact you to negotiate forms of cooperation"
          required>
        </v-text-field>
        <p>{{ userNick }}</p>
        <span>{{$t('author')}}</span>
        <button class="btn"
                type="submit"

                :disabled="!valid">
              {{$t('send')}}
        </button>

      </v-form>

      <v-alert
        dismissible
        type="success"
        :value="true"
        v-if="success"
        >
        Thank you! Your contact is sent.
      </v-alert>
      <v-alert
        dismissible
        error
        :value="true"
        v-if="error"
        >
        Check again, something is wrong!
      </v-alert>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      id: String
    },
    data() {
      return {
        // pseudo: '',
        valid: false,
        contact: '',
        contactActive: '',
        contactRules: [
          v => !!v || 'Enter your contact',
          v => (v && v.length >= 8) || 'Contact must be at least 8 characters'
        ],
      }
    },
    computed: {
      userNick() {
        if(this.$store.getters.user.pseudo){
          return this.$store.getters.user.pseudo
        } else {
          return localStorage.getItem('pseudo')
        }
      },
      success(){
        return this.$store.getters.success
      },
      error(){
        return this.$store.getters.error
      }
    },
    methods: {
      // showContact(){
      //   this.contactActive = !this.contactActive
      // },
      sendContact(){
        const contactsData = {
          contact: this.contact,
          nickname: this.user.pseudo,
          id: this.id
        }
        this.$store.dispatch('editProject',
          contactsData
          // selected: this.selected
        )
      }
    },
    created(){
      // this.$store.dispatch('fetchUsers')

      this.$store.state.success = false,
      this.$store.state.error = false
      console.log(this.user)
      // this.pseudo = this.$store.getters.user.pseudo
    }
  };
</script>

