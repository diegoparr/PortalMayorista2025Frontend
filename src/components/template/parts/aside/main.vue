<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <user-panel></user-panel>
      <sidebar-menu></sidebar-menu>
    </section>
  </aside>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import UserPanel from './parts/user-panel.vue';
  import SidebarMenu from './parts/siderbar-menu.vue';

  export default {
    computed: mapGetters([
      'getAutenticadoFull',
      'getUsuario'
    ]),
    components: {UserPanel, SidebarMenu}
  }
</script>
