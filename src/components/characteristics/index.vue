<template>
  <div :class="sizeContainer">
    <div class="box">
      <div class="box-header">
        <div class="col-xs-12 col-md-6">
          <h3 class="box-title">
            <v-btn color="info" type="button" v-show="permisoStore" v-on:click="btnCrearCaracteristica(categoria)"
                    :disabled="hayCategorias">
              <i class="fa fa-upload  pull-left"></i>
              {{(!hayCategorias) ? 'Registrar Caracteristica en ' + categoria.text : 'Selecciona la categoria'}}
            </v-btn>
          </h3>
        </div>
        <div class="col-xs-12 col-md-6" >
          <div class="row">
            <div class="col-xs-12">
              <ol class="breadcrumb">
                <li v-for="(categoriaSeleccionada,i) in categoriasSeleccionadas">
                  <a v-on:click="cambiar(i)" class="categories-links">{{categoriaSeleccionada.texto}}</a>
                </li>
              </ol>
            </div>
            <div class="col-xs-12 col-md-7">
              <loader v-if="cargandoData" class="cargando"></loader>
              <model-select v-else-if="hayCategorias" :options="categorias" id="categorias" v-model="categoria"
                            class="form-control" v-on:input="seleccionarCategoria"

                            data-placement="left" title="Selecciona la tienda"
                            required>
              </model-select>
              <h5 v-else class="text-center">No hay mas categorias</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="box-body table-responsive no-padding">
        <table class="table table-hover">
          <tbody>
          <tr>
            <th class="text-center">NombreCaracteristica</th>
            <th class="text-center">Opciones</th>
          </tr>
          <tr v-if="hayCategorias">
            <td colspan="2">Selecciona primero la categoria</td>
          </tr>
          <tr v-else-if="!dataCaracteristicas && !hayCategorias">
            <td colspan="2">
              <div class="loader">
                <hr>
              </div>
            </td>
          </tr>
          <template v-else-if="dataCaracteristicas && !hayCategorias">
            <tr v-for="caracteristica in pagination.data">
              <td class="text-center">{{caracteristica.v_nombre}}</td>
              <td class="text-center">
                <v-btn color="info" type="button" v-on:click="btnVerCaracteristica(caracteristica)"
                        :id="'buttonShow'+caracteristica.id_m_caracteristicas" v-show="permisoShow"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"><i
                  class="fa fa-search"></i></v-btn>
                <v-btn color="primary" type="button" v-show="permisoUpdate"
                        :id="'buttonUpdate'+caracteristica.id_m_caracteristicas" v-on:click="btnEditarCaracteristica(caracteristica)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-pencil"></i>
                </v-btn>
                <v-btn color="error" type="button" v-show="permisoDestroy"
                        :id="'buttonDestroy'+caracteristica.id_m_caracteristicas" v-on:click="btnBorrarCaracteristica(caracteristica)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-trash"></i>
                </v-btn>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="2">No hay caracteristicas registradas en {{categoria.text}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div class="box-footer clearfix">
        <ul class="pagination pagination-sm no-margin pull-right" v-show="!hayCategorias">
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(1,categoria.value)">
              <i class="fa fa-angle-double-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(pagination.current_page - 1,categoria.value)">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-for="pagina in pagesNumber" :class="[ pagina == isActived ? 'active' : '']">
            <a href="#"
               @click.prevent="cambiarPagina(pagina,categoria.value)">{{ pagina }}</a>
          </li>
          <li v-if="pagination.current_page < pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.current_page + 1,categoria.value)">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page != pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.last_page ,categoria.value)">
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
            <store v-if="mostrarModal=='registro'" v-on:registro="cambiarPagina(1,categoria.value) "
                   v-on:cerrar_modal="limpiarModal" :categoria="categoria"></store>
            <show v-else-if="mostrarModal=='ver'" :caracteristica="caracteristicaShow" v-on:cerrar_modal="limpiarModal"></show>
            <update v-else-if="mostrarModal=='editar'" :updateCaracteristica="caracteristicaUpdate"
                    v-on:cerrar_modal="limpiarModal" v-on:actualizar="cambiarPagina(1,categoria.value)"></update>
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
                <v-btn color="error" type="button" id="btnEliminar" v-on:click="eliminarCaracteristica"
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
</template>
<script>
  import AppServices from '../AppServices';
  import Loader from '../parts/loader.vue';
  import {mapGetters, mapMutations} from 'vuex';
  import {ModelSelect} from 'vue-search-select';
  import Store from './parts/store.vue';
  import Show from './parts/show.vue';
  import Update from './parts/update.vue';
  import helpers from '../../helpers';

  export default {
    data() {
      return {
        mostrarModal: null,
        dataCaracteristicas: false,
        hayCaracteristicas: false,
        paisSeleccionado: false,
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        permisoIndexCaracteristicas: false,
        id_m_categoria: null,
        categorias: [],
        categoriasSeleccionadas: [],
        categoriasIds: [],
        cargandoData: false,
        hayCategorias: true,
        categoria: {
          value: '',
          text: ''
        },

        caracteristicaShow: null,
        caracteristicaUpdate: null,
        caracteristicaCreate: null,
        idCaracteristicaEliminar: null,
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
      cargarCategorias(id) {
        this.cargandoData = true;
        let yo = this;
        let token = this.getUsuario.token;
        let where = '';
        if (id)
          where = "['id_m_categorias_fk','=','" + id + "']";
        else
          where = "['id_m_categorias_fk','=',null]";
        this.getAppServices().getMethodsWithBearer("api/ecommerce/categorias", token, 'pluck', 1, null, where)
          .then(response => {
            yo.cargandoData = false;
            yo.categorias = response.body;
            if (yo.categorias.length >= 1)
              yo.hayCategorias = true;
            else {
              yo.seleccionoCategoria = true;
              yo.hayCategorias = false;
              yo.categoriaPadre = yo.categoriasSeleccionadas[0];
              yo.siguienteTab = true;
              yo.obtenerData(1, id)
            }
          }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      },
      seleccionarCategoria(event) {
        this.categoriasIds.push(this.categoria.value !== '' ? this.categoria.value : null);
        this.categoriasSeleccionadas.push({
          texto: event.text,
          id: event.value
        });
        this.cargarCategorias(event.value);
      },
      cambiar(indice) {
        this.categoriasSeleccionadas = this.categoriasSeleccionadas.splice(0, indice);
        this.cargarCategorias(this.categoriasIds[indice - 1]);
        this.siguienteTab = false;
      },

      btnCrearCaracteristica(categoria) {
        let yo = this;
        this.mostrarModal = 'registro';
        yo.caracteristicaCreate = categoria;
        $('#modal').modal('show');
        $('#modalTitle').html(this.categoria.text);
      },

      obtenerData(pagina, categoria) {
        this.dataProvincias = false;
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().getMethodsWithBearer("api/ecommerce/caracteristicas", token, "paginate", pagina, null, "['id_m_categorias_fk','=','" + categoria + "']", "'v_nombre','asc'")
          .then(response => {
            this.pagination = response.body;
            this.dataCaracteristicas = true;
            if (this.pagination.data.length > 0)
              this.hayCaracteristicas = true;
            else
              this.hayCaracteristicas = false;
          }, errors => {
            yo.$router.push({name: 'panel'});
            yo.$toastr('error', 'Ocurrió un error cargando las características', 'Cargando Características');
          });
      },
      btnVerCaracteristica(caracteristica) {
        let boton_loading = $('#buttonShow' + caracteristica.id_m_caracteristicas);
        boton_loading.button('loading');
        let token = this.getUsuario.token;
        let yo = this;
        this.getAppServices().getMethodsWithBearer("api/ecommerce/caracteristicas/" + caracteristica.id_m_caracteristicas, token, 'paginate', 1, "'valores_caracteristicas'")
          .then(response => {
            yo.caracteristicaShow = response.body;
            this.mostrarModal = 'ver';
            $('#modal').modal('show');
            $('#modalTitle').html(response.body.v_nombre);
            boton_loading.button('reset');
          }, errors => {
            $('#modal').modal('hide');
            this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
          });
      },
      btnEditarCaracteristica(caracteristica) {
        let boton_loading = $('#buttonUpdate' + caracteristica.id_m_caracteristicas);
        boton_loading.button('loading');
        let token = this.getUsuario.token;
        let yo = this;
        this.getAppServices().getMethodsWithBearer("api/ecommerce/caracteristicas/" + caracteristica.id_m_caracteristicas, token, "paginate", 1, "'valores_caracteristicas'"  )
          .then(response => {
            yo.caracteristicaUpdate = response.body;
            console.log(yo.caracteristicaUpdate);
            this.mostrarModal = 'editar';
            $('#modal').modal('show');
            $('#modalTitle').html(response.body.v_nombre);
            boton_loading.button('reset');
          }, errors => {
            $('#modal').modal('hide');
            this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
          });
      },
      btnBorrarCaracteristica(caracteristica) {
        $('#modalDestroy').modal('show');
        this.idCaracteristicaEliminar = caracteristica.id_m_caracteristicas;
        this.id_m_categoria = caracteristica.id_m_categorias_fk;
      },
      eliminarCaracteristica() {
        let yo = this;
        let token = this.getUsuario.token;
        let boton_eliminar = $('#btnEliminar');
        boton_eliminar.button('loading');
        this.getAppServices().destroyMethodWithBearer('api/ecommerce/caracteristicas/' + this.idCaracteristicaEliminar, token)
          .then(response => {
            $('#modalDestroy').modal('hide');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
            boton_eliminar.button('reset');
            yo.cambiarPagina(1, this.id_m_categoria);
          }, errors => {
            yo.$toastr('error', errors.body.mensaje, "Error desconocido");
            boton_eliminar.button('reset');
          });
      },
      cambiarPagina(pagina, categoria) {
        this.pagination.current_page = pagina;
        this.obtenerData(pagina, categoria);
      },
      limpiarModal() {
        this.mostrarModal = 'ninguno';
      }
    }),
    components: {ModelSelect, Store, Show, Update, Loader},
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
      this.cargarCategorias(null);
      this.$emit("load_data", {
        show: false
      });

      let permiso = 'index.caracteristicas.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        yo.setValorBusquedaStore('store.caracteristicas.' + yo.getUsuario.rol);
        yo.setValorBusquedaShow('show.caracteristicas.' + yo.getUsuario.rol);
        yo.setValorBusquedaUpdate('update.caracteristicas.' + yo.getUsuario.rol);
        yo.setValorBusquedaDestroy('destroy.caracteristicas.' + yo.getUsuario.rol);
        yo.permisoStore = !!(yo.obtenerPermisoStore);
        yo.permisoShow = !!(yo.obtenerPermisoShow);
        yo.permisoUpdate = !!(yo.obtenerPermisoUpdate);
        yo.permisoDestroy = !!(yo.obtenerPermisoDestroy);
//        this.obtenerData(this.pagination.current_page);
      } else {
        yo.$router.push({name: 'panel'});
        yo.$toastr('error', 'No posee permisos para acceder a esta acción', 'Acceso denegado');
      }
    },
  }
</script>

