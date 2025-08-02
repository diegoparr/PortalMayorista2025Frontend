<template>
  <div class="user-panel" v-if="getAutenticadoFull">
    <img :src="getImageUrl(getUsuario.v_avatar)" class="img-circle img-responsive img-sidebar" alt="User Image" style="margin: auto">
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    computed: mapGetters([
      'getAutenticadoFull',
      'getUsuario'
    ]),
  }
</script>
