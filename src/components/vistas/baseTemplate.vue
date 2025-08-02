<template>
  <v-app>
    <cabecera></cabecera>
    <router-view></router-view>
    <div-footer></div-footer>
  </v-app>
</template>

<script>
  import divFooter from './partes/divFooter.vue';
  import Cabecera from './partes/Cabecera';
  import {mapMutations} from 'vuex';

  export default {
    name: "template-vista-tienda",
    components: {Cabecera, divFooter},
    methods: Object.assign({}, mapMutations([]), {
      cleanModal() {
        $('#modalCarrito').modal('hide');
      },

    })
  }
</script>
