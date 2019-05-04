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
    data() {
      return {
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
      success(){
        return this.$store.getters.success
      },
      error(){
        return this.$store.getters.error
      }
    },
    methods: {
      showContact(){
        this.contactActive = !this.contactActive
      },
      sendContact(){
        this.$store.dispatch('sendContact', {
          contact: this.contact,
          selected: this.selected
        })
      }
    }
  };
</script>

<style lang="sass" scoped>
</style>
