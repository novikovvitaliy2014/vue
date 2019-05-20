<template>
  <section id="pro" class="project">
    <!-- <section
      v-for="project in projects"
      :key="project.id"
      @click="onLoadProject(project.id)"
      >
      <div class="title">{{ project.title }}</div>
      <div class="title">{{ project.id }}</div>
    </section> -->
    <!-- <v-select
      class="project__select"
      v-model="selected"
      :items="adresses"
      label="Select the project"
      required>
    </v-select>
    <transition name="slide-fade"> -->
      <baker v-if='selected==="Baker-Street"'></baker>
      <!-- <school  v-else-if='selected==="School-№53"'></school> -->
    <!-- </transition> -->

    <!-- <donors></donors> -->
  </section>
</template>

<script>
import Baker from './BakerStreet.vue'
import School from './School.vue'
import Donors from '../../views/donorsPage/Donors.vue'

export default {
  components: {
    Baker,
    School,
    Donors
  },
  data () {
    return {
      valid: true,
      contact: '',
      contactActive: '',
      contactRules: [
        v => !!v || 'Enter your contact',
        v => (v && v.length >= 8) || 'Contact must be at least 8 characters'
      ],
      selected: 'Baker-Street',
      // adresses: ['Baker-Street','School-№53'],
      // error: false,
      // success: false,
      // sent: false
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
      // this.error = this.$store.getters.error
      // this.success = this.$store.getters.success
      // this.contactActive = !this.contactActive
    }
    // onLoadProject(id) {
    //   this.$router.push('/private-projects/' + id)

    // }
  }
};
</script>
