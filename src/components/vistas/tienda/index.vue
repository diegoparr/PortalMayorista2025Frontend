<template>
  <v-app>
    <loader v-if="cargandoData"></loader>
    <div v-else>
      <v-card class="store-header-card" elevation="8">
        <!-- Header con imagen de portada -->
        <div class="store-header-container">
          <div class="store-cover-image">
            <img 
              :src="getImageUrl(tienda.v_portada)" 
              alt="Portada_tienda" 
              @error="handleImageError"
              class="cover-img">
            <div class="cover-overlay"></div>
          </div>
          
          <!-- Información de la tienda -->
          <div class="store-info-section">
            <div class="store-logo-container">
              <img 
                class="store-logo" 
                :src="getImageUrl(tienda.v_logo)" 
                @error="handleImageError">
            </div>
            <div class="store-details">
              <h1 class="store-name">{{tienda.v_nombre}}</h1>
              <p class="store-description">{{tienda.v_resena}}</p>
              <div class="store-stats">
                <div class="stat-item">
                  <v-icon color="orange" class="stat-icon">favorite</v-icon>
                  <span class="stat-text">{{tienda.n_seguidores || 0}} Seguidores</span>
                </div>
                <div class="stat-item">
                  <v-icon color="green" class="stat-icon">location_on</v-icon>
                  <span class="stat-text">{{tienda.v_nombre_ciudad}}, {{tienda.v_nombre_pais}}</span>
                </div>
                <div class="stat-item" v-if="tienda.n_tiempo_respuesta_promedio">
                  <v-icon color="blue" class="stat-icon">schedule</v-icon>
                  <span class="stat-text">Respuesta en {{tienda.n_tiempo_respuesta_promedio}} min</span>
                </div>
              </div>
            </div>
            <div class="store-actions">
              <seguir :modelo="tienda" tipo="tiendas" :siguiendo="seguidor"></seguir>
              <v-tooltip bottom>
                <span>Compartir en Facebook</span>
                <v-btn 
                  icon 
                  large 
                  color="white" 
                  class="share-btn"
                  slot="activator" 
                  @click="compartirFacebook">
                  <v-icon>share</v-icon>
                </v-btn>
              </v-tooltip>
            </div>
          </div>
        </div>

        <!-- Navegación mejorada -->
        <v-tabs 
          v-model="activeTab" 
          class="store-tabs" 
          color="orange" 
          slider-color="orange"
          centered>
          <v-tab 
            v-for="tab in tabs" 
            :key="tab.value"
            @click="cambiarOpcion(tab.value)"
            class="tab-item">
            <v-icon class="tab-icon">{{tab.icon}}</v-icon>
            <span class="tab-text">{{tab.label}}</span>
          </v-tab>
        </v-tabs>
      </v-card>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <template v-if="hayOfertas">
              <ofertas :ofertas="ofertas" v-on:id="redirigirProducto" v-bind:productoId="productoId"></ofertas>
            </template>
            <template v-if="opcion.productos">
              <template>
                <productos
                  :productos="productos"
                  :vista="true"
                  :tienda="tienda"
                  v-on:id="redirigirProducto"
                  v-bind:productoId="productoId">
                </productos>
              </template>
            </template>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <template v-if="opcion.informacion">
      <informacion :tienda="tienda"></informacion>
    </template>
    <template v-if="opcion.preguntas">
      <preguntas :tienda="tienda"></preguntas>
    </template>
    <template v-if="opcion.calificaciones">
      <calificaciones :tienda="tienda"></calificaciones>
    </template>
    <template v-if="opcion.promociones">
      <promociones :tienda="tienda"></promociones>
    </template>
  </v-app>

</template>

<script>
  import {mapGetters} from 'vuex';
  import Loader from '../../parts/loader';
  import Productos from '../partes/Productos';
  import Informacion from './partes/Informacion';
  import Preguntas from './partes/Preguntas';
  import Calificaciones from './partes/Calificaciones';
  import Promociones from './partes/Promociones';
  import Ofertas from './partes/Ofertas';
  import Seguir from '../partes/Seguir';
  import ImageHandler from '../../../mixin/ImageHandler';

  export default {
    data() {
      return {
        cargandoData: false,
        hayOfertas: false,
        tienda: null,
        productos: [],
        ofertas: [],
        opcion: {
          productos: true,
          informacion: false,
          preguntas: false,
          calificaciones: false,
          promociones: false,
        },
        activeTab: 0,
        tabs: [
          { value: 'productos', label: 'Productos', icon: 'store' },
          { value: 'informacion', label: 'Información', icon: 'info' },
          { value: 'preguntas', label: 'Preguntas', icon: 'help' },
          { value: 'calificaciones', label: 'Calificaciones', icon: 'star' }
        ],
        rastreos_id: null,
        seguidor: false,
        id_seguidor: null,
        url: '',
        productoId: false,
        title: null,
        textSeguidor: null,
        isLoading: false,
        status: '',
        botonClass: 'btn btn-hipertienda btn-flat',
        tipo: 'tiendas',
        boton: 'boton',
      }
    },

    components: {Loader, Productos, Informacion, Preguntas, Calificaciones, Promociones, Ofertas, Seguir},
    mixins: [ImageHandler],
    created() {
      let title_meta = $("#title_meta_content");
      let url_meta = $("#url_meta_content");
      let description_meta = $("#description_meta_content");
      let img_content = $("#img_content");

      //url_meta[0].content = this.url;
      let yo = this;
      this.cargandoData = true;
      if (this.getUsuario.estaAutenticadoFull)
        this.getMethodsWithBearer(this.urlsApi().endpointsBuscarTienda.autenticado + this.$route.params.slug, this.getUsuario.token, 'all', 1, "'telefonos','direcciones'").then(response => {
          this.seguidor = response.body.seguidor;
          if (this.seguidor)
            this.textSeguidor = 'No Seguir';
          else
            this.textSeguidor = 'Seguir';
          this.id_seguidor = response.body.id_seguidor;
          this.cargandoData = false;
          this.tienda = response.body.tienda;
      this.url = window.location.origin + '/tienda/'+this.tienda.v_slug;
          this.productos = response.body.productos;
          title_meta[0].content = this.tienda.v_nombre;
          description_meta[0].content = this.tienda.v_resena;
          img_content[0].content = this.getImageUrl(this.tienda.v_logo);
            response.body.productos.forEach(function (producto) {
              if (producto.b_descuento) {
                yo.hayOfertas = true;
                yo.ofertas.push(producto);

              }
            });
          this.rastreos_id = response.body.rastreo_id;

        }, errors => {
          this.$toastr('error', errors.body.mensaje, 'Tienda no encontrada');
          let reg = new RegExp("www|lahipertienda|localhost");
          let parts = window.location.hostname.split('.');
          if (reg.test(parts[0])) {
            this.$router.push('/buscar');
          }
          else {
            this.$router.push('/buscar');
          }
        });
      else
        this.getMethodWithoutBearer(this.urlsApi().endpointsBuscarTienda.noAutenticado + this.$route.params.slug, 'all', 1, "'telefonos','direcciones'")
          .then(response => {
            this.cargandoData = false;
            this.tienda = response.body.tienda;
            this.productos = response.body.productos;
            response.body.productos.forEach( producto => {
              if (producto.b_descuento) {
                this.hayOfertas = true;
                this.ofertas.push(producto);
            }
            })
          }, errors => {
            this.$toastr('error', errors.body.mensaje, 'Tienda no encontrada');
            this.$router.push('/buscar');
          });

    },
    methods: {
      redirigirProducto: function (id) {
        this.$router.push('/producto/' + id);
      },
      existenEnArray(categoria) {
        for (let i = 0; i < this.productos.length; i++) {
          if (this.productos[i].categoria === categoria)
            return true;
        }
        return false;
      },
      buscarArrayObjetos(categoria) {
        for (let i = 0; i < this.productos.length; i++) {
          if (this.productos[i].categoria === categoria) {
            return this.productos[i];
          }
        }
      },
      cambiarOpcion(opcion) {
        this.opcion.productos = false;
        this.opcion.informacion = false;
        this.opcion.preguntas = false;
        this.opcion.calificaciones = false;
        this.opcion.promociones = false;
        this.opcion[opcion] = true;
        
        // Actualizar el tab activo
        const tabIndex = this.tabs.findIndex(tab => tab.value === opcion);
        if (tabIndex !== -1) {
          this.activeTab = tabIndex;
        }
      },
      compartirFacebook() {
        try {
          const url = this.url;
          const title = this.tienda.v_nombre;
          const description = this.tienda.v_resena;
          const image = this.tienda.v_logo;

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
          const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;
          window.open(shareUrl, '_blank');
        }
      }

    },
    computed: Object.assign({}, mapGetters([
      'getUsuario',
    ]), {

      deshabilitarBotonSeguir() {
        return !this.getUsuario.estaAutenticadoFull
      },

    }),
    destroyed() {
      let yo = this;
      if (this.rastreos_id && this.getUsuario.estaAutenticadoFull)
        this.getMethodsWithBearer(this.urlsApi().endpointsRastreo.cerrar + this.rastreos_id, this.getUsuario.token)
          .then(response => {
          }, errors => this.mapErrorsResponses(this, errors));
    }
  }
</script>

<style scoped>
/* Estilos para el header de la tienda */
.store-header-card {
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.store-header-container {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.store-cover-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
}

.store-info-section {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  display: flex;
  align-items: flex-end;
  gap: 20px;
}

.store-logo-container {
  flex-shrink: 0;
}

.store-logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  object-fit: cover;
  transition: transform 0.3s ease;
}

.store-logo:hover {
  transform: scale(1.05);
}

.store-details {
  flex: 1;
  min-width: 0;
}

.store-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
}

.store-description {
  font-size: 1.1rem;
  margin: 0 0 20px 0;
  opacity: 0.9;
  line-height: 1.4;
  max-height: 3.2rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.store-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-icon {
  font-size: 18px;
}

.stat-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.store-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.share-btn {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.share-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: translateY(-2px);
}

/* Estilos para las pestañas */
.store-tabs {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-icon {
  font-size: 20px;
}

.tab-text {
  font-size: 14px;
}

/* Responsive design */
@media (max-width: 768px) {
  .store-header-container {
    height: 300px;
  }
  
  .store-info-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }
  
  .store-logo {
    width: 80px;
    height: 80px;
  }
  
  .store-name {
    font-size: 1.8rem;
  }
  
  .store-description {
    font-size: 1rem;
  }
  
  .store-stats {
    justify-content: center;
    gap: 10px;
  }
  
  .stat-item {
    padding: 6px 12px;
  }
  
  .stat-text {
    font-size: 0.8rem;
  }
  
  .tab-item {
    padding: 0 10px;
  }
  
  .tab-text {
    display: none;
  }
}

@media (max-width: 480px) {
  .store-header-container {
    height: 250px;
  }
  
  .store-info-section {
    padding: 15px;
  }
  
  .store-logo {
    width: 60px;
    height: 60px;
  }
  
  .store-name {
    font-size: 1.5rem;
  }
  
  .store-stats {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
}
</style>
