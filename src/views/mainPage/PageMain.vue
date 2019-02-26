<template>
  <section>
    <features></features>
    <about></about>
    <pro></pro>
  </section>
</template>

<script>
import Features from '../../components/forMainPage/Features.vue'
import About from '../../components/forMainPage/About.vue'
import Pro from '../../components/projects/Pro.vue'
// import Contacts from './Contacts.vue'

export default {
  components: {
    Features,
    About,
    Pro
  }
};
</script>
