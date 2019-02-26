<template>
  <footer class="footer">
    <div class="footer__content">
      <router-link to="/">
        <logo></logo>
      </router-link>
      <p>Yards improvement</p>
    </div>
  </footer>
</template>

<script>
import Logo from '../header/Logo.vue'


export default {
  components: {
    Logo
  }
};
</script>
