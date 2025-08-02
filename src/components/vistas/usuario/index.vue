<template>
  <v-app>
    <cabecera></cabecera>
    <v-layout>
      <v-carousel
        hide-controls
        hide-delimiters style="height: auto">
        <v-carousel-item
          min-height="200px">
          <v-responsive
            :src="getImageUrl(usuario.v_avatar)"
            height="200px"
            @error="handleImageError">
          </v-responsive>
        </v-carousel-item>
      </v-carousel>
    </v-layout>
    <div><p></p></div>
    <v-layout>
      <!-- <v-flex xs12 sm2 class="hidden-md-and-down">
        <v-card flat class="link-negro-naranja">
          <v-card-text>
            <a class="link-negro-naranja" @click="cargar(1)">
              <v-icon color="primary">fa fa-user</v-icon>
              Mis Datos
              </a>
          </v-card-text>
          <!--<v-card-text>-->
          <!--<a class="link-negro-naranja" @click="cargar(2)"><v-icon color="primary">fa fa-list</v-icon> Facturacion</a>-->
          <!--</v-card-text>-->
          <!--<v-card-text>-->
          <!--<a class="link-negro-naranja" @click="cargar(3)"><v-icon color="primary">fa fa-shopping-cart</v-icon> Compras</a>-->
          <!--</v-card-text>-->
          <!--<v-card-text>-->
          <!--<a class="link-negro-naranja" @click="cargar(4)"><v-icon color="primary">fa fa-gear</v-icon> Configuracion</a>-->
          <!--</v-card-text>-->
        <!--</v-card>
      </v-flex> -->
      <v-flex sm1 md1 lg1></v-flex>
      <v-flex xs12 sm10 md10 lg10>
        <loader v-if="cargandoData"></loader>
        <div v-else>
          <div v-if="datos" class="text-center">
            <datos></datos>
          </div>
          <div v-if="facturacion">
            <facturacion></facturacion>
          </div>
          <div v-if="compras">
            <compras></compras>
          </div>
          <div v-if="configuracion">
            <configuracion></configuracion>
          </div>
        </div>
      </v-flex>
      <v-flex sm1 md1 lg1></v-flex>
      <!-- <v-flex xs12 sm3>
        <tiendas-recomendadas :config="true"></tiendas-recomendadas>
      </v-flex> -->
    </v-layout>
    <div><p></p></div>
  </v-app>
</template>


<!---->
<!--<div v-else>-->
<!--<v-list-tile>-->
<!--<v-list-tile-action>-->
<!--<v-icon>fa-shopping-basket</v-icon>-->
<!--</v-list-tile-action>-->
<!--<v-list-tile-content>-->
<!--<v-list-tile-title :click="abrirModal">-->
<!--<a href="#" class="link-negro-naranja">-->
<!--<span>Mis Compras</span>-->
<!--</a>-->
<!--</v-list-tile-title>-->
<!--</v-list-tile-content>-->
<!--</v-list-tile>-->
<!--<v-list-tile>-->
<!--<v-list-tile-action>-->
<!--<v-icon>fa-money</v-icon>-->
<!--</v-list-tile-action>-->
<!--<v-list-tile-content>-->
<!--<v-list-tile-title :click="abrirModal">-->
<!--<a href="#" class="link-negro-naranja">-->
<!--<span>Mis Canjes</span>-->
<!--</a>-->
<!--</v-list-tile-title>-->
<!--</v-list-tile-content>-->
<!--</v-list-tile>-->
<!--<v-list-tile>-->
<!--<v-list-tile-action>-->
<!--<v-icon>star</v-icon>-->
<!--</v-list-tile-action>-->
<!--<v-list-tile-content>-->
<!--<v-list-tile-title :click="abrirModal">-->
<!--<a href="#" class="link-negro-naranja">-->
<!--<span>Siguiendo</span>-->
<!--</a>-->
<!--</v-list-tile-title>-->
<!--</v-list-tile-content>-->
<!--</v-list-tile>-->
<!--<v-list-tile>-->
<!--<v-list-tile-action>-->
<!--<v-icon>location_on-->
<!--</v-icon>-->
<!--</v-list-tile-action>-->
<!--<v-list-tile-content>-->
<!--<v-list-tile-title :click="abrirModal">-->
<!--<a href="#" class="link-negro-naranja">-->
<!--<span>Tiendas Cerca</span>-->
<!--</a>-->
<!--</v-list-tile-title>-->
<!--</v-list-tile-content>-->
<!--</v-list-tile>-->
<!--<cambiar-password></cambiar-password>-->
<!--</div>-->
<!--</v-app>-->

<script>
import { mapGetters } from "vuex";
import Loader from "../../parts/loader.vue";
import Cabecera from "../partes/Cabecera";
import CambiarPassword from "../partes/CambiarPassword";
import Datos from "./partes/datos";
import Configuracion from "./partes/configuracion";
import Compras from "./partes/compras";
import Facturacion from "./partes/facturacion";
import TiendasRecomendadas from "../partes/TiendasRecomendadas";
import ImageHandler from '../../../mixin/ImageHandler';

export default {
  data() {
    return {
      banner: "../../../../dist/new/people-small.jpg",
      cargandoData: false,
      datos: true,
      facturacion: false,
      configuracion: false,
      compras: false
    };
  },
  components: {
    Loader,
    CambiarPassword,
    TiendasRecomendadas,
    Cabecera,
    Datos,
    Configuracion,
    Compras,
    Facturacion
  },
  mixins: [ImageHandler],
  methods: {
    cargar(i) {
      this.datos = false;
      this.facturacion = false;
      this.configuracion = false;
      this.compras = false;
      if (i === 1) {
        this.datos = true;
      }
      if (i === 2) {
        this.facturacion = true;
      }
      if (i === 3) {
        this.configuracion = true;
      }
      if (i === 4) {
        this.compras = true;
      }
    },
    getImageUrl(avatar) {
      return avatar ? avatar : this.banner;
    },
    handleImageError() {
      console.error("Error al cargar la imagen");
    }
  },
  computed: Object.assign({}, mapGetters(["getUsuario"]), {})
};
</script>
