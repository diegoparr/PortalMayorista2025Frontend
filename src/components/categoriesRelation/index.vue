<template>
  <div :class="sizeContainer">
    <div class="box">
      <div class="box-header">
        <div class="col-md-3">
          <h3 class="box-title">
            <v-btn color="info" type="button" v-on:click="crearCategoriaModal" v-show="permisoStore">
              <i class="fa fa-upload  pull-left"></i> Registrar Relaciones de Categorias
            </v-btn>
          </h3>
        </div>
        <!--<div class="col-md-3">
          <input type="text" placeholder="Ingrese datos para Buscar" class="form-control" v-model="busqueda" @keyup="obtenerData(1)">
        </div>-->
      </div>
      <div class="box-body table-responsive no-padding">
        <table class="table table-hover">
          <tbody>
          <tr>
            <th class="text-center">Descripcion</th>
            <th class="text-center">Categorias Asociadas</th>
            <th class="text-center">Opciones</th>
          </tr>
          <tr v-if="!dataCategorias">
            <td colspan="5">
              <div class="loader">
                <hr>
              </div>
            </td>
          </tr>
          <template v-else-if="hayCategorias">
            <tr v-for="data in pagination.data">
              <td class="text-center">{{data.v_descripcion}}</td>
              <td  class="text-center"><span v-for="relacion in data.detalle">{{relacion.categoria.v_nombre}}<br></span></td>
              <td class="text-center">

                <v-btn color="primary" type="button" v-show="permisoUpdate"
                       :id="'buttonUpdate'+data.id_m_relacion_categorias" v-on:click="btnEditarCategoria(data)"
                       data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-pencil"></i>
                </v-btn>
                <v-btn color="error" type="button" v-show="permisoDestroy"
                       :id="'buttonDestroy'+data.id_m_relacion_categorias" v-on:click="btnBorrarCategoria(data)"
                       data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-trash"></i>
                </v-btn>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="4">No hay categorias registrados</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="box-footer clearfix">
        <ul class="pagination pagination-sm no-margin pull-right">
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(1)">
              <i class="fa fa-angle-double-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(pagination.current_page - 1)">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-for="pagina in pagesNumber" :class="[ pagina === isActived ? 'active' : '']">
            <a href="#"
               @click.prevent="cambiarPagina(pagina)">{{ pagina }}</a>
          </li>
          <li v-if="pagination.current_page < pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.current_page + 1)">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page !== pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.last_page)">
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
            <store v-if="mostrarModal==='registro'" v-on:registro="cambiarPagina(1)"
                   v-on:cerrar_modal="limpiarModal"></store>
            <show v-if="mostrarModal==='ver'" :categoria="categoriaShow" v-on:cerrar_modal="limpiarModal"></show>
            <update v-else-if="mostrarModal==='editar'" :updateCategoria="categoriaUpdate"
                    v-on:cerrar_modal="limpiarModal" v-on:actualizar="cambiarPagina(1)"></update>
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
                <v-btn color="error" type="button" id="btnEliminar" v-on:click="eliminarCategoria"
                       data-loading-text="&lt;i class='pull-left fa fa-spinner fa-spin '&gt;&lt;/i&gt; Eliminando"><i
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
</template>
<script>
  import AppServices from '../AppServices';
  import {mapGetters, mapMutations} from 'vuex';
  import Store from './parts/store.vue';
  import Show from './parts/show.vue';
  import Update from './parts/update.vue';

  export default {
    data() {
      return {
        categorias: [],
        dataCategorias: false,
        hayCategorias: false,
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        permisoIndexUsuarios: false,
        mostrarModal: null,
        categoriaShow: null,
        categoriaUpdate: null,
        idCategoriaEliminar: null,
        busqueda: '',
        data: '',
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
        'setValorBusquedaDestroy', 'setSearch'
      ]), {

        getAppServices() {
          return AppServices;
        },
        limpiarModal() {
          this.mostrarModal = 'ninguno';
        },
        crearCategoriaModal() {
          this.mostrarModal = 'registro';
          $('#modal').modal('show');
          $('#modalTitle').html("REGISTRAR RELACIÓN");
        },
        obtenerData(pagina) {
          this.dataCategorias = false;
          let yo = this;
          let token = this.getUsuario.token;
          let busqueda = '';

          busqueda = this.busqueda;
          console.log('busqueda ', busqueda);

            this.getAppServices().getMethodsWithBearer("api/ecommerce/relacionCategorias", token, 'paginate', pagina, "", null, "")
              .then(response => {
                this.pagination = response.body;
                this.data = response.body.data;
                this.dataCategorias = true;
                if (this.pagination.data.length > 0)
                  this.hayCategorias = true
              }, errors => {
                yo.$router.push({name: 'panel'});
                yo.$toastr('error', 'Ocurrió un error cargando los categorias', 'Cargando Categorias');
              });

        },
        btnVerCategoria(categoria) {
          let boton_loading = $('#buttonShow' + categoria.id_m_relacion_categorias);
          boton_loading.button('loading');
          let token = this.getUsuario.token;
          let yo = this;
          this.getAppServices().getMethodsWithBearer("api/ecommerce/relacionCategorias/" + categoria.id_m_relacion_categorias, token, 'paginate', 1)
            .then(response => {
              yo.categoriaShow = response.body;
              this.mostrarModal = 'ver';
              $('#modal').modal('show');
              $('#modalTitle').html(response.body.v_nombre);
              boton_loading.button('reset');
            }, errors => {
              $('#modal').modal('hide');
              this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
            });
        },
        btnEditarCategoria(categoria) {
          let boton_loading = $('#buttonUpdate' + categoria.id_m_relacion_categorias);
          boton_loading.button('loading');
          let token = this.getUsuario.token;
          let yo = this;
          yo.categoriaUpdate = categoria;
          this.mostrarModal = 'editar';
          $('#modal').modal('show');
          $('#modalTitle').html("Editar Relación");
          boton_loading.button('reset');

        },
        btnBorrarCategoria(categoria) {
          $('#modalDestroy').modal('show');
          this.idCategoriaEliminar = categoria.id_m_relacion_categorias;
        },
        eliminarCategoria() {
          let yo = this;
          let token = this.getUsuario.token;
          let boton_eliminar = $('#btnEliminar');
          boton_eliminar.button('loading');
          this.getAppServices().destroyMethodWithBearer('api/ecommerce/relacionCategorias/' + this.idCategoriaEliminar, token)
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
      }
    ),
    created() {
      let yo = this;
      this.setSearch(this.$route.params.busqueda);
      this.sizeContainer = this.$route.meta.sizeContainer;
      this.$emit("load_data", {
        show: false
      });
      let permiso = 'index.categorias.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        yo.setValorBusquedaStore('store.categorias.' + yo.getUsuario.rol);
        yo.setValorBusquedaShow('show.categorias.' + yo.getUsuario.rol);
        yo.setValorBusquedaUpdate('update.categorias.' + yo.getUsuario.rol);
        yo.setValorBusquedaDestroy('destroy.categorias.' + yo.getUsuario.rol);
        yo.permisoStore = !!(yo.obtenerPermisoStore);
        yo.permisoShow = !!(yo.obtenerPermisoShow);
        yo.permisoUpdate = !!(yo.obtenerPermisoUpdate);
        yo.permisoDestroy = !!(yo.obtenerPermisoDestroy);
        this.obtenerData(this.pagination.current_page);
      } else {
        yo.$router.push({name: 'panel'});
        yo.$toastr('error', 'No posee permisos para acceder a esta acción', 'Acceso denegado');
      }
    },

    components: {Show, Update, Store},
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
  }
</script>

