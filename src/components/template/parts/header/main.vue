<template>
  <header class="main-header">
    <!-- Botón hamburguesa para móviles -->
    <mobile-menu-toggle></mobile-menu-toggle>
    
    <router-link class="logo" :to="{name:'explore'}">
      <img src="/dist/favicon.png" class="logo-mini" alt="LaHipertienda" width="40" height="40">
      <img src="/dist/img/img_logo.png" class="logo-lg logo-lg-img" alt="LaHipertienda">
    </router-link>
    <nav class="navbar navbar-static-top">
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <user-menu></user-menu>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
  import UserMenu from './parts/user-menu.vue';
  import MobileMenuToggle from './parts/mobile-menu-toggle.vue';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        busqueda: null
      }
    },
    components: {UserMenu, MobileMenuToggle},
    methods: Object.assign({}, mapMutations([
    ]), {

    }),
    computed: Object.assign({}, mapGetters([
    ]), {}),
  }
</script>
