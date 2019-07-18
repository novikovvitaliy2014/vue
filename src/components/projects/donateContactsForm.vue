<template>
  <div class="project__participation">
    <h4>{{$t('donate-contacts')}}</h4>
    <p>{{$t('example-contacts')}}</p>
    <div  >
      <v-form v-model="valid" @submit.prevent = "sendContact">
        <v-text-field
          type="text"
          :label="$t('contacts-label')"
          :rules="contactRules"
          placeholder="WhatsApp: +447 356 78 90"
          @focus="cleanStatus"
          id="contact"
          class="donor__contact"
          v-model="contact"
          lazy-validation
          color="green"
          required>
        </v-text-field>
        <p class="donor__usernick">{{ userNick }}</p>
        <button class="btn"
                type="submit"
                :disabled="!valid && !empty"
                >
              {{$t('send')}}
        </button>
      </v-form>

      <v-alert
        dismissible
        v-model="successSent"
        type="success"
        :value="true"
        >
        {{$t('contacts-sent')}}
      </v-alert>
      <v-alert
        dismissible
        v-model="filling"
        type="error"
        :value="true"
        >
        {{$t('create-valid')}}
      </v-alert>
      <v-alert
        dismissible
        v-if="error"
        error
        :value="true"
        >
        {{ error }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import VForm from 'vuetify/es5/components/VForm/VForm'
import VAlert from 'vuetify/es5/components/VAlert/VAlert'
import VTextField from 'vuetify/es5/components/VTextField/VTextField'

  export default {
    components: {
      VForm,
      VTextField,
      VAlert
    },
    props: {
      id: String
    },
    data() {
      return {
        successSent: false,
        filling: false,
        valid: true,
        contact: '',
        contactActive: '',
        contactRules: [
          v => !!v || this.$i18n.t("enter-data"),
          v => (v && v.length >= 6) || this.$i18n.t("min-6")
        ],
      }
    },
    computed: {
      empty(){
        return this.contact.trim() === ''
      },
      userNick() {
        if(this.$store.getters.user){
          return this.$store.getters.user.pseudo
        } else {
          return localStorage.getItem('pseudo')
        }
      },
      error(){
        return this.$store.getters.error
      }
    },
    methods: {
      cleanStatus(){
        this.$store.commit('setError',{status: false})
        this.$store.commit('setSuccess',{status: false})
      },
      sendContact(){
        const contactsData = {
          contact: this.contact,
          nickname: this.userNick,
          id: this.id
        }
        if(!this.userNick) {
          this.$store.dispatch('logout')
        } else if(!this.valid){
          this.filling = true
          return
        } else {
          this.$store.dispatch('editProject', contactsData)
          this.successSent = true
        }
        this.cleanStatus()
      }
    },
    created(){
      setTimeout(()=>{
        if(!this.userNick) {
          this.$store.dispatch('logout')
        }
      },2500)
      this.$store.commit('setError',{status: false})
      this.$store.commit('setSuccess',{status: false})
    }
  };
</script>

