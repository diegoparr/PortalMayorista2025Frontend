<template>
  <div :class="sizeContainer">
    <div :class="sizeContainer">
      <div class="box">
        <div class="box-header">
          <div class="col-xs-12 col-md-6">
            <h3 class="box-title">
              <v-btn color="info" type="button" v-show="permisoStore" v-on:click="btnCrearPublicidad">
                <i class="fa fa-upload  pull-left"></i>
                Registrar Publicidad
              </v-btn>
            </h3>
          </div>
        </div>
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover">
            <tbody>
            <tr>
              <th class="text-center">Imagen</th>
              <th class="text-center">Fecha Inicio</th>
              <th class="text-center">Fecha Fin</th>
              <th class="text-center">Posicion</th>
              <th class="text-center">Descripcion</th>
              <th class="text-center">Opciones</th>
            </tr>
            <tr v-if="!dataPublicidad">
              <td colspan="2">
                <div class="loader">
                </div>
              </td>
            </tr>
            <template v-else>
              <tr v-for="(publicidad,i) in publicidades" :key="i">
                <td class="text-center"><img style="height: 60px" :src="getImageUrl(publicidad.v_imagen)" alt=""></td>
                <td class="text-center">{{publicidad.d_fecha_inicio}}</td>
                <td class="text-center">{{publicidad.d_fecha_fin}}</td>
                <td class="text-center">{{publicidad.v_posicion_pantalla}}</td>
                <td class="text-center">{{publicidad.v_descripcion}}</td>
                <td class="text-center">
                  <v-btn color="primary" type="button" v-show="permisoUpdate"
                         :id="'buttonUpdate'+publicidad" v-on:click="btnEditarPublicidad(publicidad)"
                         data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                    <i class="fa fa-pencil"></i>
                  </v-btn>
                  <v-btn color="error" type="button" v-show="permisoDestroy"
                         :id="'buttonDestroy'+publicidad" v-on:click="btnBorrarPublicidad(publicidad)"
                         data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                    <i class="fa fa-trash"></i>
                  </v-btn>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
        <div class="box-footer clearfix">
          <ul class="pagination pagination-sm no-margin pull-right" v-show="tiendaSeleccionado">
            <li v-if="pagination.current_page > 1">
              <a href="" aria-label="Anterior"
                 @click.prevent="cambiarPagina(1,tienda.id)">
                <i class="fa fa-angle-double-left" aria-hidden="true"></i>
              </a>
            </li>
            <li v-if="pagination.current_page > 1">
              <a href="" aria-label="Anterior"
                 @click.prevent="cambiarPagina(pagination.current_page - 1,tienda.id)">
                <i class="fa fa-angle-left" aria-hidden="true"></i>
              </a>
            </li>
            <li v-for="pagina in pagesNumber" :class="[ pagina === isActived ? 'active' : '']">
              <a href="#"
                 @click.prevent="cambiarPagina(pagina,tienda.id)">{{ pagina }}</a>
            </li>
            <li v-if="pagination.current_page < pagination.last_page">
              <a href="#" aria-label="Siguiente"
                 @click.prevent="cambiarPagina(pagination.current_page + 1,tienda.id)">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </a>
            </li>
            <li v-if="pagination.current_page !== pagination.last_page">
              <a href="#" aria-label="Siguiente"
                 @click.prevent="cambiarPagina(pagination.last_page ,tienda.id)">
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
              <h4 class="modal-title text-center" id="modalTitle"></h4>
            </div>
            <div class="modal-body">
              <store v-if="mostrarModal==='registro'" v-on:registro="cambiarPagina(1,tienda.id)"
                     v-on:cerrar_modal="limpiarModal" :tienda="tienda"></store>
              <show v-else-if="mostrarModal==='ver'" :publicidad="publicidadShow"
                    v-on:cerrar_modal="limpiarModal"></show>
              <update v-else-if="mostrarModal==='editar'" :updatePublicidad="publicidadUpdate"
                      v-on:cerrar_modal="limpiarModal" v-on:actualizar="cambiarPagina(1,tienda.id)"></update>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade bs-example-modal-sm" id="modalDestroy" tabindex="-1" role="dialog"
           aria-labelledby="mySmallModalLabel">
        <div class="modal-dialog modal-sm" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
              <h4 class="modal-title text-center">¿Seguro que deseas eliminar el recurso?</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-xs-12" align="center">
                  <v-btn color="error" type="button" id="btnEliminar" v-on:click="eliminarPublicidad"
                         data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Eliminando"><i
                    class="fa fa-trash pull-left"></i>
                    Eliminar Recurso
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AppServices from '../AppServices';
  import {mapGetters, mapMutations} from 'vuex';
  import {ModelSelect} from 'vue-search-select';
  import Store from './parts/store.vue';
  import Show from './parts/show.vue';
  import Update from './parts/update.vue';
  import ImageHandler from '../../mixin/ImageHandler';

  export default {
    mixins: [ImageHandler],
    data() {
      return {
        cargando: false,
        mostrarModal: null,
        dataPublicidad: false,
        hayPublicidad: false,
        tiendaSeleccionado: false,
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        permisoIndexPublicidades: false,
        id_tienda: null,
        tiendas: [],
        productos: [],
        provincias: [],
        publicidades: [],
        tienda: {
          id: '',
          nombre: ''
        },
        publicidadShow: null,
        publicidadUpdate: null,
        publicidadCreate: null,
        idPublicidadEliminar: null,
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
        offset: 4
      }
    },
    methods: Object.assign({}, mapMutations([
      'setValorBusquedaIndex', 'setValorBusquedaShow', 'setValorBusquedaStore', 'setValorBusquedaUpdate',
      'setValorBusquedaDestroy'
    ]), {
      getAppServices() {
        return AppServices;
      },
      btnCrearPublicidad() {
        // let yo = this;
        this.mostrarModal = 'registro';
        $('#modal').modal('show');
        $('#modalTitle').html(this.tienda.nombre);
      },
      seleccionarTienda() {
        this.tiendaSeleccionado = true;
        this.obtenerData(1, this.tienda.id)
      },
      obtenerData(pagina) {
        let yo = this;
        let token = this.getUsuario.token;
        this.dataPublicidad = false;
        this.getAppServices().getMethodsWithBearer('api/ecommerce/publicidades', token, "paginate", pagina, "", null, "")
          .then(response => {
            yo.publicidades = response.body.data;

            this.dataPublicidad = true;
          }, errors => {
            yo.$router.push({name: 'dashboard'});
            yo.$toastr('error', 'Ocurrió un error cargando las tiendas', 'Cargando Tienda');
            this.dataPublicidad = true;
            this.hayPublicidad = this.pagination.data.length > 0;
          });
        if (this.obtenerPermisoIndex) {
          yo.setValorBusquedaStore('store.publicidades.' + yo.getUsuario.rol);
          yo.setValorBusquedaShow('show.publicidades.' + yo.getUsuario.rol);
          yo.setValorBusquedaUpdate('update.publicidades.' + yo.getUsuario.rol);
          yo.setValorBusquedaDestroy('destroy.publicidades.' + yo.getUsuario.rol);
          yo.permisoStore = !!(yo.obtenerPermisoStore);
          yo.permisoShow = !!(yo.obtenerPermisoShow);
          yo.permisoUpdate = !!(yo.obtenerPermisoUpdate);
          yo.permisoDestroy = !!(yo.obtenerPermisoDestroy);
        } else {
          yo.$router.push({name: 'dashboard'});
          yo.$toastr('error', 'No posee permisos para acceder a esta acción', 'Acceso denegado');
        }
      },
      btnEditarPublicidad(publicidad) {
        let boton_loading = $('#buttonUpdate' + publicidad.id_m_publicidades);
        boton_loading.button('loading');
        let token = this.getUsuario.token;
        let yo = this;
        this.getAppServices().getMethodsWithBearer("api/ecommerce/publicidades/" + publicidad.id_m_publicidades, token, "paginate", 1)
          .then(response => {
            this.cargando = true;
            yo.publicidadUpdate = response.body;
            console.log(yo.publicidadUpdate);
            this.mostrarModal = 'editar';
            $('#modal').modal('show');
            $('#modalTitle').html(response.body);
            this.cargando = false;
            boton_loading.button('reset');
          }, errors => {
            $('#modal').modal('hide');
            this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
          });

      },
      btnBorrarPublicidad(publicidad) {
        $('#modalDestroy').modal('show');
        this.idPublicidadEliminar = publicidad.id_m_publicidades;
        this.id_tienda = publicidad.id_m_tiendas_fk;
      },
      eliminarPublicidad() {
        let yo = this;
        let token = this.getUsuario.token;
        let boton_eliminar = $('#btnEliminar');
        boton_eliminar.button('loading');
        this.getAppServices().destroyMethodWithBearer('api/ecommerce/publicidades/' + this.idPublicidadEliminar, token)
          .then(response => {
            $('#modalDestroy').modal('hide');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
            boton_eliminar.button('reset');
            yo.cambiarPagina(1);
          }, errors => {
            yo.$toastr('error', errors.body.mensaje, "Error desconocido");
            boton_eliminar.button('reset');
          });
      },
      cambiarPagina(pagina) {
        this.pagination.current_page = pagina;
        this.obtenerData(pagina);
      },
      limpiarModal() {
        this.mostrarModal = 'ninguno';
      }
    }),
    components: {ModelSelect, Store, Show, Update},
    computed: Object.assign({}, mapGetters([
      'getIndex', 'obtenerPermisoIndex', 'obtenerPermisoStore', 'obtenerPermisoShow',
      'obtenerPermisoUpdate', 'obtenerPermisoDestroy', 'getUsuario'
    ]), {
      isActived: function () {
        return this.pagination.current_page;
      },
      pagesNumber: function () {
        if (!this.pagination.to) {
          return [];
        }
        let from = this.pagination.current_page - this.offset;
        if (from < 1) {
          from = 1;
        }
        let to = from + (this.offset * 2);
        if (to >= this.pagination.last_page) {
          to = this.pagination.last_page;
        }
        let pagesArray = [];
        while (from <= to) {
          pagesArray.push(from);
          from++;
        }
        return pagesArray;
      }
    }),
    created() {
      let yo = this;
      this.sizeContainer = this.$route.meta.sizeContainer;
      let token = this.getUsuario.token;
      let permiso = 'index.publicidades.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      this.$emit("load_data", {
        show: false
      });
      this.obtenerData(1);
      this.getAppServices().getMethodsWithBearer('api/ecommerce/publicidades', token, "paginate", "paginate", 1, "", null, "")
        .then(response => {
          yo.publicidades = response.body.data;
          console.log(yo.publicidades)
        }, errors => {
          yo.$router.push({name: 'dashboard'});
          yo.$toastr('error', 'Ocurrió un error cargando las tiendas', 'Cargando Tienda');
        });
      if (this.obtenerPermisoIndex) {
        yo.setValorBusquedaStore('store.publicidades.' + yo.getUsuario.rol);
        yo.setValorBusquedaShow('show.publicidades.' + yo.getUsuario.rol);
        yo.setValorBusquedaUpdate('update.publicidades.' + yo.getUsuario.rol);
        yo.setValorBusquedaDestroy('destroy.publicidades.' + yo.getUsuario.rol);
        yo.permisoStore = !!(yo.obtenerPermisoStore);
        yo.permisoShow = !!(yo.obtenerPermisoShow);
        yo.permisoUpdate = !!(yo.obtenerPermisoUpdate);
        yo.permisoDestroy = !!(yo.obtenerPermisoDestroy);
      } else {
        yo.$router.push({name: 'dashboard'});
        yo.$toastr('error', 'No posee permisos para acceder a esta acción', 'Acceso denegado');
      }
    },
  }
</script>
