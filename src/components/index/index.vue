<template>
  <div class="wrapper-full-screen-home">
    <navbar-index v-if="!datosUsuario"></navbar-index>
    <div class="container margin-top-container-index">
      <img src="/dist/img/img_logo.png" class="img-responsive img-responsive-center" alt="Cinque Terre" width="600"
           height="230">
      <div class="row">
        <div class="col-xs-12 col-md-4 col-md-offset-4">
          <div class="input-group margin-search-input">
            <input class="form-control" v-model="busqueda"
                   type="text"
                   v-validate="'required|alpha_spaces|min:2|max:100'"
                   @focus="ganoFoco"  @keyup="buscarResultados" >
            <div class="input-group-btn">
              <button type="button" class="btn btn-hipertienda" aria-label="Help" id="buttonLoader"
                      v-on:click="entrarLaHipertienda"
                      data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="coincidencias" id="coincidencias">
            <div class="box box-hipertienda scroll-container-coincidencias">
              <div class="box-header text-center with-border">
                <h3 class="box-title">Coincidencias de resultados</h3>
              </div>
              <template v-if="cargandoData">
                <div class="loader-container">
                  <loader></loader>
                </div>
              </template>
              <template v-else-if="!cargandoData">
                <div class="contenedor-coincidencias text-center" v-for="coincidencia in coincidencias" >
                  <div v-on:click="buscar(coincidencia.v_nombre)">
                  <img :src="getImageUrl(coincidencia.v_portada)"
                       class="img-responsive img-coincidencias">
                  <h5 class="text-coincidencia">{{coincidencia.v_nombre}}</h5>
                  </div>
                </div>
              </template>
              <!--<template v-else>
                <h5 class="text-center" style="margin: 25% 0 0 0;">No hay coincidencias</h5>
              </template>-->
            </div>
          </div>
        </div>
      </div>
      <!--<div class="footer-container">
        <div class="container">
          <div class="row">
            <div class="col-xs-4 col-md-2 col-md-offset-6 text-center">Publicidad</div>
            <div class="col-xs-4 col-md-2 text-center">Negocios</div>
            <div class="col-xs-4 col-md-2 text-center">Vender</div>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
  import NavbarIndex from './parts/navbar.vue';
  import Loader from '../parts/loader.vue';
  import AppServices from '../AppServices';
  import {mapGetters, mapMutations} from 'vuex';
  import ImageHandler from '../../mixin/ImageHandler';

  export default {
    mixins: [ImageHandler],
    data() {
      return {
        cargandoData: false,
        hayData: false,
        busqueda: '',
        coincidencias: [],
        user: null,
        autenticado: null
      }
    },
    computed: Object.assign({}, mapGetters([
      'getSearch','getAutenticadoFull','getUsuario',
    ]), {

      datosUsuario() {
        console.log(this.getUsuario.estaAutenticadoFull);
        return this.getUsuario.estaAutenticadoFull;
      },

    }),
    components: {NavbarIndex, Loader},
    created() {
      console.log(this.getUsuario);
      this.user = this.getUsuario;
      console.log(this.user);
      this.autenticado = this.getUsuario.estaAutenticadoFull;

    },
    methods: Object.assign({}, mapMutations([
      'setSearch',
    ]), {

      getAppServices() {
        return AppServices;
      },
      buscarResultados() {
        let button_loader = $('#buttonLoader');
        button_loader.button('loading');
        this.cargandoData = true;

        let string = this.busqueda;

        //var out = '';
        //Se añaden las letras validas
        let filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890 ';//Caracteres validos
        let out = '';
        for (var i=0; i<string.length; i++)
          if (filtro.indexOf(string.charAt(i)) !== -1)
            out += string.charAt(i);
        //return out;
        this.busqueda = out;
        this.setSearch(this.busqueda);
        this.buscardorSinToken(this.urlsApi().endpointsBusqueda.productos.noAutenticado, this.busqueda, 'all', 1, null, null, null)
          .then(response => {
            button_loader.button('reset');
            this.cargandoData = false;
            this.coincidencias = response.body.pagination;
          }, errors => this.mapErrorsResponses(this, errors));

        // Busqueda si esta logueado

      /*  if (this.getUsuario.estaAutenticadoFull) {
          this.buscadorConToken(this.urlsApi().endpointsBusqueda.productos.autenticado, this.getUsuario.token, this.busqueda, 'all', 1, null, null, null)
            .then(response => {
              button_loader.button('reset');
              this.coincidencias = response.body.pagination;
              this.productosOrdernados = response.body.orderBy;
              this.cargandoData = false;
            }, errors => this.mapErrorsResponses(this, errors));
        } else {
          this.buscardorSinToken(this.urlsApi().endpointsBusqueda.productos.noAutenticado, this.busqueda, 'all', 1, null, null, null)
            .then(response => {
              button_loader.button('reset');
              this.coincidencias = response.body.pagination;
              this.productosOrdernados = response.body.orderBy;
              this.cargandoData = false;
            }, errors => this.mapErrorsResponses(this, errors));
        }*/

      },
      perdioFoco() {
        $('#coincidencias').hide();
      },
      ganoFoco() {
        $('#coincidencias').show();
        console.log(this.getUsuario);
        this.autenticado = this.getUsuario.estaAutenticadoFull;
      },
      entrarLaHipertienda() {
        this.$router.push('/buscar/' + this.busqueda);
      },
      buscar(nombre) {
        console.log(nombre);
        this.$router.push('/buscar/' + nombre);
      }

    })
  }
</script>
