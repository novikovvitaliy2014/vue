<template>
  <section>
    <features></features>
    <about></about>
    <baker></baker>
  </section>
</template>

<script>
import Features from '../../components/forMainPage/Features.vue'
import About from '../../components/forMainPage/About.vue'
import Baker from '../../components/projects/BakerStreet.vue'
// import Pro from '../../components/projects/Pro.vue'

export default {
  components: {
    Features,
    About,
    Baker
  }
};
</script>
