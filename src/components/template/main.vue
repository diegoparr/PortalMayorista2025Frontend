<template>
  <div class="wrapper">
    <header-template v-on:search_update="changeSearch"></header-template>
    <aside-template></aside-template>
    <content-template></content-template>
  </div>
</template>
<script>
  import HeaderTemplate from './parts/header/main.vue';
  import AsideTemplate from './parts/aside/main.vue';
  import ContentTemplate from './parts/content/main.vue';
  import FooterTemplate from './parts/footer/main.vue';
  import ControlTemplate from './parts/control/main.vue';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        search: null
      }
    },
    components: {HeaderTemplate, AsideTemplate, ContentTemplate, FooterTemplate, ControlTemplate},
    methods: Object.assign({}, mapMutations([
      'setSearch'
    ]), {
      changeSearch() {
        console.log("Template - Cambio el valor de la busqueda");
      }
    }),
    computed: Object.assign({}, mapGetters([
      'getSearch'
    ]), {}),
  }
</script>
