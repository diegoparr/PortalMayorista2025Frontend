
<template>
  <nav class="navbar navbar-default navbar-transparent">
    <div class="loader-container" v-if="mostarLoader">
      <loader></loader>
    </div>
    <div class="container-fluid" v-else>
      <div class="row">
        <div class="header-buttons-container">
          <div class="col-xs-6 col-md-2 col-md-offset-1" v-if="!autenticado">
            <router-link :to="{name:'access'}" class="btn btn-block btn-hipertienda btn-flat">Ingresar</router-link>
          </div>
          <div class="col-xs-6 col-md-2" v-if="!autenticado">
            <router-link :to="{name:'register'}" class="btn btn-block btn-hipertienda-oscuro btn-flat">Registrarse
            </router-link>
          </div>
          <div class="col-xs-6 col-md-2" v-if="autenticado">
            <router-link :to="{name:'access'}" class="btn btn-block btn-hipertienda btn-flat">Salir</router-link>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import Loader from '../../parts/loader.vue';
  export default {
    data() {
      return {
        user: null,
        autenticado: false,
        mostrarLoader: true
      }
    },

    computed: Object.assign({}, mapGetters([
      'getSearch','getAutenticadoFull','getUsuario',
    ]), {

      datosUsuarios() {
        this.user = this.getUsuario;
        this.autenticado = this.getUsuario.estaAutenticadoFull;
        this.mostrarLoader = false
        console.log(this.autenticado);
        return true;
      },

    }),

    components: { Loader},
  }
</script>
