<template>
  <div class="usuario-panel">
    <cabecera></cabecera>
    <v-layout v-if="usuario">
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
    </v-layout>
  </div>
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
      if (!avatar || avatar === null || avatar === undefined || avatar === '') {
        return this.banner;
      }
      return avatar;
    },
    handleImageError() {
      console.error("Error al cargar la imagen");
    }
  },
  computed: Object.assign({}, mapGetters(["getUsuario"]), {
    usuario() {
      return this.getUsuario;
    }
  })
};
</script>

<style scoped>
/* Mejorar la visual del formulario */
.text-center {
  margin-top: 1rem !important;
  padding: 0 !important;
}

/* Estilos específicos para el componente de datos - solo en usuario-panel */
.usuario-panel :deep(.register-box-body) {
  background: #f8f9fa !important;
  border-radius: 12px !important;
  padding: 2rem !important;
  margin: 1rem 0 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.usuario-panel :deep(.v-text-field) {
  margin-bottom: 1rem !important;
}

.usuario-panel :deep(.v-select), .usuario-panel :deep(.v-autocomplete) {
  margin-bottom: 1rem !important;
}

.usuario-panel :deep(.v-btn) {
  border-radius: 8px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;
}

.usuario-panel :deep(.v-btn:hover) {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
}

.usuario-panel :deep(.v-btn.error) {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%) !important;
  color: white !important;
}

/* Mejorar estilos de los campos de entrada */
.usuario-panel :deep(.v-input__slot) {
  border-radius: 8px !important;
  background: white !important;
  border: 2px solid #e9ecef !important;
  transition: all 0.3s ease !important;
}

.usuario-panel :deep(.v-input__slot:hover) {
  border-color: #667eea !important;
}

.usuario-panel :deep(.v-input__slot:focus-within) {
  border-color: #667eea !important;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
}

/* Mejorar estilos de las etiquetas */
.usuario-panel :deep(.v-label) {
  color: #6c757d !important;
  font-weight: 500 !important;
}

.usuario-panel :deep(.v-label--active) {
  color: #667eea !important;
}

/* Mejorar estilos de los iconos */
.usuario-panel :deep(.v-input__prepend-outer .v-icon) {
  color: #667eea !important;
}

/* Mejorar estilos del avatar en el formulario */
.usuario-panel :deep(.centrar-imagen) {
  border-radius: 50% !important;
  object-fit: cover !important;
  border: 4px solid #fff !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;
}

.usuario-panel :deep(.centrar-imagen:hover) {
  transform: scale(1.05) !important;
}

/* Mejorar estilos del título */
.usuario-panel :deep(h3) {
  color: #2c3e50 !important;
  font-weight: 600 !important;
  margin-bottom: 2rem !important;
}

/* Responsive para el formulario */
@media (max-width: 768px) {
  .usuario-panel :deep(.register-box-body) {
    padding: 1rem !important;
    margin: 0.5rem 0 !important;
  }
  
  .usuario-panel :deep(.v-btn) {
    width: 100% !important;
  }
}

/* Eliminar espacios innecesarios solo en este componente */
.usuario-panel .v-layout {
  margin: 0 !important;
  padding: 0 !important;
}

.usuario-panel .v-flex {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
