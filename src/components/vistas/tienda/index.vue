<template>
  <v-app>
    <loader v-if="cargandoData"></loader>
    <div v-else>
      <v-card dark>
        <div style="position: relative; height: 300px; overflow: hidden;">
          <img 
            :src="getImageUrl(tienda.v_portada)" 
            alt="Portada_tienda" 
            @error="handleImageError"
            style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; bottom: 20px; left: 20px;">
            <img 
              class="avatar shadow-box-products" 
              :src="getImageUrl(tienda.v_logo)" 
              style="height: 150px;width: 150px; border-radius: 50%;" 
              @error="handleImageError">
          </div>
        </div>
        <v-toolbar color="primary" flat dense style="z-index: 10">
          <v-spacer></v-spacer>
          <v-toolbar-items dark>
            <v-btn flat v-on:click="cambiarOpcion('productos')">Productos</v-btn>
          </v-toolbar-items>
          <v-toolbar-items dark>
            <v-btn flat v-on:click="cambiarOpcion('informacion')">Información</v-btn>
          </v-toolbar-items>
          <v-toolbar-items dark >
            <v-btn flat v-on:click="cambiarOpcion('preguntas')">Preguntas</v-btn>
          </v-toolbar-items>
          <v-btn icon>
            <seguir :modelo="tienda" tipo="tiendas" :siguiendo="seguidor"></seguir>
          </v-btn>
          <v-tooltip bottom>
            <span>Compartir en Facebook</span>
            <v-btn icon slot="activator" @click="compartirFacebook">
              <v-icon>share</v-icon>
            </v-btn>
          </v-tooltip>

        </v-toolbar>
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
