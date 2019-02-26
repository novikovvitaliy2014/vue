<template>
  <section id="pro" class="project">
    <v-select
      class="project__select"
      v-model="selected"
      :items="adresses"
      label="Select the project"
      required>
    </v-select>
    <transition name="slide-fade">
      <baker v-if='selected==="Baker Street"'></baker>
      <school  v-else-if='selected==="School №53"'></school>
    </transition>
    <div class="project__button">
      <router-link to="/signup">
        <button class="city__btn">Book Donation</button>
      </router-link>
    </div>
  </section>
</template>

<script>
import Baker from './BakerStreet.vue'
import School from './School.vue'

export default {
  components: {
    Baker,
    School
  },
  data () {
    return {
      selected: 'Baker Street',
      adresses: ['Baker Street','School №53']
    }
  }
};
</script>
