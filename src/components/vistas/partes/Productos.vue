<template>
  <div v-if="vista">
    <v-layout>
      <v-container class="contenedor_productos">
        <span class="text-xs-left" style="color: #ec6920;"><h4>Productos Relacionados Con Tus Busquedas</h4></span>
        <v-layout wrap>
          <v-container
            fluid
            grid-list-md>
            <v-layout row wrap height="300">
              <v-flex
                xs12 sm6 md2
                v-for="(producto,i) in productos"
                :key="i">
                <div style="height: 310px">
                  <v-card absolute flat hover @mouseover="entreTarjeta(i)" @mouseleave="saliTarjeta()">
                    <img
                      :src="getImageUrl(producto.v_portada)"
                      height="200px"
                      width="100%"
                      style="object-fit: contain; border-radius: 8px 8px 0 0; padding: 10px;"
                      @error="handleImageError"
                      @click="redirigirProducto(producto.id_m_productos)"
                      class="product-image">
                    <div v-show="tarjetaProducto===i">
                      <h5 class="text-center">{{toCamel(producto.v_nombre)|truncate(20)}}</h5>
                    </div>
                    <div class="text-xs-left">
                      <div class="hidden-md-and-up" style="padding-top: 5px">
                        <span> {{toCamel(producto.v_nombre)}} </span><br>
                      </div>
                      <div class="text-center">
                        <div v-if="producto.b_descuento" style="padding-left: 5px">
                          <span style="color: #a8a8a8;"><strike>${{formatInvoice(producto.n_precio)}}</strike></span> ->
                          <span style="color: #ec6920;">${{formatInvoice(producto.n_precio_descuento)}}</span><br>
                        </div>
                        <div v-else style="padding-left: 5px">
                          <span style="color: #ec6920;">${{formatInvoice(producto.n_precio)}}</span><br>
                        </div>
                      </div>

                    </div>
                    <v-card-actions class="center">
                      <seguir :modelo="producto" tipo="productos" color="primary"
                              :siguiendo="producto.seguidor" :texto="false">
                      </seguir>
                      <v-tooltip bottom>
                        <span>Compartir en Facebook</span>
                        <v-btn icon slot="activator" @click="compartirFacebook(producto)">
                          <v-icon color="primary">share</v-icon>
                        </v-btn>
                      </v-tooltip>
                    </v-card-actions>
                  </v-card>
                </div>
              </v-flex>
            </v-layout>
          </v-container>

        </v-layout>
      </v-container>
    </v-layout>
  </div>
  <div v-else>
    <v-layout wrap>
      <v-flex xs12 v-for="(producto,i) in productos" :key="i">
        <v-container white class="bordeHover" v-on:click="redirigirProducto(producto.id_m_productos)">
          <v-card flat class="tarjetaProducto" @mouseover="entreTarjeta(i)" @mouseleave="saliTarjeta()">
            <img
              :src="getImageUrl(producto.v_portada)"
              style="max-height: 500px; width: 100%; object-fit: contain; padding: 10px;"
              height="100px"
              @error="handleImageError"
              class="product-image">
            <v-container fluid>
              <div class="text-xs-left hid">
                <span>{{toCamel(producto.v_nombre)}}</span><br>
                <div v-if="producto.b_descuento">
                  <span style="color: #A8A8A8;"><strike>${{formatInvoice(producto.n_precio)}}</strike></span> ->
                  <span style="color: #ec6920;">${{formatInvoice(producto.n_precio_descuento)}}</span><br>
                </div>
                <div v-else>
                  <span style="color: #ec6920;">${{formatInvoice(producto.n_precio)}}</span><br>
                </div>
              </div>
            </v-container>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Seguir from "./Seguir";
import AddToCart from "./AddToCart";
import ImageHandler from '../../../mixin/ImageHandler';

export default {
  data() {
    return {
      tarjetaProducto: null,
      name: "productos",
      siguiendo_producto: false,
      url: ""
    };
  },
  props: ["productos", "tienda", "perPage", "vista"],
  components: { Seguir, AddToCart },
  mixins: [ImageHandler],
  methods: {
    toCamel(string) {
      let arrayWords;
      let returnString = "";
      let len;
      arrayWords = string.split(" ");
      len = arrayWords.length;
      for (let i = 0; i < len; i++) {
        if (i !== len - 1) {
          returnString = returnString + this.ucFirst(arrayWords[i]) + " ";
        } else {
          returnString = returnString + this.ucFirst(arrayWords[i]);
        }
      }
      return returnString;
    },
    ucFirst(string) {
      return (
        string.substr(0, 1).toUpperCase() +
        string.substr(1, string.length).toLowerCase()
      );
    },
    zindex(i) {
      return "z-index:" + i;
    },
    entreTarjeta(i) {
      if (this.tarjetaProducto > 0) {
        this.tarjetaProducto = null;
      }
      this.tarjetaProducto = i;
    },
    saliTarjeta() {
      this.tarjetaProducto = null;
    },
    redirigirProducto(id) {
      this.$emit("id", id);
    },
    formatInvoice(value) {
      return value.toLocaleString('es-ES');
    },
    compartirFacebook(producto) {
      try {
        const url = `${window.location.origin}/producto/${producto.id_m_productos}`;
        const title = producto.v_nombre;
        const description = producto.v_descripcion;

        // URL básica de Facebook que funciona mejor
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        
        // Abrir en una nueva ventana con dimensiones específicas
        const width = 600;
        const height = 400;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;
        
        const popup = window.open(
          shareUrl,
          'facebook-share-dialog',
          `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
        );
        
        if (popup) {
          popup.focus();
        } else {
          // Fallback si el popup está bloqueado
          window.open(shareUrl, '_blank');
        }
      } catch (error) {
        console.error('Error al compartir en Facebook:', error);
        // Fallback simple
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
      }
    }
  }
};
</script>

<style scoped>
/* Estilos mejorados para las tarjetas de productos */
.v-card {
  border-radius: 15px !important;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
  transition: all 0.3s ease !important;
  overflow: hidden !important;
  background: white !important;
  border: 1px solid #f0f0f0 !important;
}

.v-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important;
  border-color: #ff6b35 !important;
}

/* Imágenes de productos */
.product-image {
  background: white !important;
  transition: all 0.3s ease !important;
  border: 1px solid #f0f0f0 !important;
}

.product-image:hover {
  transform: scale(1.02) !important;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
}

/* Contenedor de imagen */
.v-card img {
  background: white !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;
}

/* Contenedor de productos */
.contenedor_productos {
  padding: 2rem 0 !important;
}

/* Título de la sección */
h4 {
  font-weight: 600 !important;
  margin-bottom: 1.5rem !important;
  position: relative !important;
}

h4::after {
  content: '' !important;
  position: absolute !important;
  bottom: -5px !important;
  left: 0 !important;
  width: 50px !important;
  height: 3px !important;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%) !important;
  border-radius: 2px !important;
}

/* Precios */
span[style*="color: #ec6920"] {
  font-weight: 700 !important;
  font-size: 1.1rem !important;
}

/* Botones de acción */
.v-card-actions {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%) !important;
  border-top: 1px solid #f0f0f0 !important;
  padding: 0.5rem !important;
}

/* Efectos hover para botones */
.v-btn {
  transition: all 0.3s ease !important;
}

.v-btn:hover {
  transform: scale(1.1) !important;
}

/* Tarjeta de producto en vista alternativa */
.tarjetaProducto {
  border-radius: 15px !important;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1) !important;
  transition: all 0.3s ease !important;
  overflow: hidden !important;
}

.tarjetaProducto:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
}

/* Contenedor con borde hover */
.bordeHover {
  border-radius: 15px !important;
  transition: all 0.3s ease !important;
  padding: 0.5rem !important;
}

.bordeHover:hover {
  background: #f8f9fa !important;
  transform: translateY(-2px) !important;
}

/* Animaciones adicionales */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.v-flex {
  animation: fadeInUp 0.6s ease-out;
}

/* Responsive design */
@media (max-width: 768px) {
  .v-card {
    margin-bottom: 1rem !important;
  }
  
  .v-card:hover {
    transform: translateY(-3px) !important;
  }
  
  h4 {
    font-size: 1.2rem !important;
  }
}

@media (max-width: 480px) {
  .v-card {
    margin-bottom: 0.5rem !important;
  }
  
  .v-card:hover {
    transform: translateY(-2px) !important;
  }
}
</style>
