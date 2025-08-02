<template>
  <v-app>
    <div v-if="config" class="container">
      <span style="color: #ec6920;"><h4>Tiendas Recomendadas</h4></span>
      <v-layout wrap flat id="scroll-target"
                style="max-height: 400px"
                class="scroll-y text-capitalize text-justify">
        <v-flex xs12 v-for="(tienda,i) in tiendas" :key="i">
          <v-container white class="bordeHover" v-on:click="redirigirVistaTienda(tienda)">
            <v-card sm6 md3 hover @mouseover="entreTarjeta(i)" @mouseleave="saliTarjeta()">
              <v-responsive style="max-height: 150px" height="150px" 
                            :src="getImageUrl(tienda.v_logo)"
                            @error="handleImageError"
                            v-on:click="redirigirVistaTienda(tienda)">
                <v-btn color="primary" absolute small flat fab right>
                  <seguir :modelo="tienda" tipo="tiendas" color="primary" :siguiendo="tienda.seguidor"
                          :texto="false"></seguir>
                </v-btn>
              </v-responsive>
              <v-fade-transition>
                <div v-show="tarjeta===i" style="padding-bottom: 5px">
                  <h5>{{ tienda.v_nombre }}</h5>
                </div>
              </v-fade-transition>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </div>
    <div v-else>
      <div class="hidden-xs-only">
        <span style="color: #ec6920;"><h4>Tiendas Recomendadas</h4></span>
        <carousel xs12 sm6 md4 navigationEnabled :perPageCustom="[[360, 1],[480, 3], [1280, 6]]"
                  :paginationEnabled="false"
                  style="height: 200px">
          <slide class="align-center" v-for="(tienda,i) in tiendas" :key="i">
            <v-container>
              <v-card sm6 md3 hover @mouseover="entreTarjeta(i)" @mouseleave="saliTarjeta()">
                <v-responsive height="150px" 
                              :src="getImageUrl(tienda.v_logo)"
                              @error="handleImageError"
                              v-on:click="redirigirVistaTienda(tienda)">
                  <v-btn color="primary" absolute small flat fab right>
                    <seguir :modelo="tienda" tipo="tiendas" color="primary" :siguiendo="tienda.seguidor"
                            :texto="false"></seguir>
                  </v-btn>
                </v-responsive>
                <v-fade-transition>
                  <div v-show="tarjeta===i" style="padding-bottom: 5px">
                    <h5>{{ tienda.v_nombre }}</h5>
                  </div>
                </v-fade-transition>
              </v-card>
            </v-container>
          </slide>
        </carousel>
      </div>
      <div class="hidden-sm-and-up">
        <span class="text-xs-center" style="color: #ec6920;"><h4>Tiendas Recomendadas</h4></span>
        <div v-for="(tienda,i) in tiendas" :key="i">
          <v-container>
            <v-card sm6 md4>
              <v-responsive style="height: 200px; cursor: pointer" 
                            :src="getImageUrl(tienda.v_logo)"
                            @error="handleImageError"
                            v-on:click="redirigirVistaTienda(tienda)">
              </v-responsive>
              <v-card-title primary-title>
                <div>
                  <h5>{{tienda.v_nombre}}</h5>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <seguir :modelo="tienda" tipo="tiendas" color="primary" :siguiendo="tienda.seguidor"
                        :texto="false"></seguir>
              </v-card-actions>
            </v-card>
          </v-container>
        </div>
      </div>
    </div>

  </v-app>
</template>
<script>
  import {mapGetters} from 'vuex';
  import {Carousel, Slide} from 'vue-carousel';
  import Seguir from './Seguir';
  import AppServices from '../../AppServices';
  import ImageHandler from '../../../mixin/ImageHandler';

  export default {
    data() {
      return {
        tarjeta: null,
        show: false,
        tiendas: null,
        cargandoData: true,
        tiendasOrdenadas: [],
        boton: true,
        seguidor: true,
        tipo: "tiendas",
        url: ''
      }
    },
    components: {Carousel, Slide, Seguir},
    props: ['config'],
    mixins: [ImageHandler],
    created() {
      this.url = window.location.origin;
      if (!this.getUsuario.estaAutenticadoFull) {
        this.getMethodWithoutBearer(this.urlsApi().endpointsTiendas.noAutenticado, 'all')
          .then(response => {
            this.cargandoData = false;
            this.tiendas = response.body;
            console.log('relacionados', this.tiendas);
            console.log(this.tarjeta);
            let listado = this.tiendas;
            let Total = 0;
            if (listado.length <= 4)
              Total = listado.length;
            else
              Total = 4;
            let i = 0;
            let aleatorio = 0;
            let seleccion = null;
            for (i; i < Total; i++) {
              aleatorio = Math.floor(Math.random() * (listado.length));
              seleccion = listado[aleatorio];
              listado.splice(aleatorio, 1);
            }
          }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      }
      else {
        this.getMethodWithoutBearer(this.urlsApi().endpointsTiendas.noAutenticado, 'all')
          .then(response => {
            this.cargandoData = false;
            this.tiendas = response.body;
            console.log('relacionados', this.tiendas);
            let listado = this.tiendas;
            let Total = 0;
            if (listado.length <= 4)
              Total = listado.length;
            else
              Total = 4;
            let i = 0;
            let aleatorio = 0;
            let seleccion = null;
            for (i; i < Total; i++) {
              aleatorio = Math.floor(Math.random() * (listado.length));
              seleccion = listado[aleatorio];
              this.tiendasOrdenadas.push(seleccion);
              listado.splice(aleatorio, 1);
            }

          }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      }
    },
    methods: {
      entreTarjeta(i) {
        if (this.tarjeta > 0) {
          this.tarjeta = null
        }
        this.tarjeta = i
      },
      saliTarjeta() {
        this.tarjeta = null
      },
      getAppServices() {
        return AppServices;
      },
      redirigirVistaTienda(tienda) {
        this.$router.push('/' + tienda.v_slug);
      },
      urls(tienda) {
        return this.url + '/' + tienda.v_slug;
      }
    },
    computed: Object.assign({}, mapGetters([
      'getUsuario',
    ]))
  }

</script>

