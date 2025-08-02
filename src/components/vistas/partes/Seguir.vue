<template>
  <div>
    <v-dialog v-model="dialog3" max-width="500px">
      <v-card>
        <acceso v-on:cleanModal="cleanModal" v-if="modalActive==='acceso'" :modal="true"
                v-on:cambiar="cambiar('registro')">
        </acceso>
        <registro v-if="modalActive==='registro'" :modal="true"
                  v-on:cambiar="cambiar('acceso')">
        </registro>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog3=false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-tooltip bottom>
      <span v-if="tipo === 'tiendas'">Seguir a {{ modelo.v_nombre}}</span>
      <span v-else>Agregar a Favoritos</span>
      <v-btn v-if="tipo === 'tiendas'" slot="activator"   icon v-on:click="seguir"  v-show="!isLoading">
        <v-icon :color=color >{{sigo?'star':'star_border'}}</v-icon>
      </v-btn>
      <v-btn v-else slot="activator" icon v-on:click="seguir"  v-show="!isLoading">
        <v-icon :color=color >{{sigo?'favorite':'favorite_border'}}</v-icon>
      </v-btn>
    </v-tooltip>
    <v-btn fab small icon v-show="isLoading" :color=color flat ><i class="fa fa-spinner fa-pulse"  ></i></v-btn>
  </div>

</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import Acceso from '../../access/index';
  import Registro from '../../register/index';

  export default {
    components: {Acceso, Registro},
    data() {
      return {
        isLoading: false,
        sigo: this.siguiendo,
        star: "fa fa-star",
        mensaje: '',
        mensaje2: '',
        titulo: '',
        titulo2: '',
        modalActive: 'acceso',
        dialog3: false,
      }
    },

    props: ['modelo', 'tipo', 'color', 'siguiendo', 'texto'],
    //mounted
    /* mounted(){
       console.log("siguiendo",this.siguiendo);
       console.log("tienda",this.tienda);
     },*/
    watch: {
      modelo(data) {
        console.log('watch', data);
        console.log('watch siguiendo', this.siguiendo);
        this.sigo = this.siguiendo;
      }
      /* 'siguiendo_producto': function (data) {
         console.log('watch',data);
       }*/
    },
    methods: Object.assign({}, mapMutations([]),
      {
        cambiar(resp){
          this.modalActive = resp
        },
        cleanModal() {
          $('#modal-acceso').modal('hide');
        },
        seguir() {
          if (!this.getUsuario.estaAutenticadoFull) {
            console.log("no autenticado");

            this.dialog3 = true;

          }
          else {

            this.isLoading = true;
            let id_tienda = 0;
            let id_producto = 0;
            let data = {};
            if (this.tipo === 'tiendas') {
              id_tienda = this.modelo.id_m_tiendas;
              id_producto = null;
              this.mensaje = '¡Genial ahora recibirás una notificación cuando la tienda haga ofertas o promociones!';
              this.mensaje2 = '¡Ya no estas siguiendo esta Tienda!';
              this.titulo = "Siguiendo";
              this.titulo2 = "Información";

              data = {
                v_tipo: this.tipo,
                id_m_tiendas_fk: id_tienda,
                id_m_usuarios_fk: this.getUsuario.id
              };
            }
            else {
              id_producto = this.modelo.id_m_productos;
              id_tienda = null;
              this.mensaje = '¡Genial haz agregado este producto a tus favoritos!';
              this.mensaje2 = '¡Haz quitado este producto de tus favoritos!';
              this.titulo = "Favorito";
              this.titulo2 = "Información";
              data = {
                v_tipo: this.tipo,
                id_m_productos_fk: id_producto,
                id_m_usuarios_fk: this.getUsuario.id
              };
            }
            this.postMethodWithBearer(this.urlsApi().endpointsSeguidor.seguir, data, this.getUsuario.token)
              .then(response => {
                this.sigo = response.body.seguidor;
                let mensaje = '';
                let titulo = ''
                if (this.sigo) {
                  mensaje = this.mensaje;
                  titulo = this.titulo;
                  this.star = "fa fa-star"
                }
                else {
                  mensaje = this.mensaje2;
                  titulo = this.titulo2;
                  this.star = "fa fa-star-o"
                }
                this.$toastr('info', mensaje, titulo);
                this.isLoading = false;
              }, errors => this.mapErrorsResponses("errores", errors));
          }
        }
      }),
    computed: Object.assign({}, mapGetters([
      'getUsuario',
    ]), {

      deshabilitarBotonSeguir() {
        console.log(!this.getUsuario.estaAutenticadoFull);
        return !this.getUsuario.estaAutenticadoFull;
      },

    }),
  }
</script>
