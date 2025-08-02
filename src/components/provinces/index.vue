<template>
  <div :class="sizeContainer">
    <div class="box">
      <div class="box-header">
        <div class="col-xs-12 col-md-6">
          <h3 class="box-title">
            <v-btn color="info" type="button" v-show="permisoStore" v-on:click="btnCrearProvincia"
                   :disabled="!paisSeleccionado">
              <i class="fa fa-upload  pull-left"></i>
              {{(paisSeleccionado) ? 'Registrar Provincia en ' + pais.text : 'Selecciona un pais'}}
            </v-btn>
          </h3>
        </div>
        <div class="col-xs-12 col-md-6">
          <model-select :options="paises" id="v_ciudad" v-model="pais" class="form-control"
                        v-on:input="seleccionarPais"
                        data-placement="left" title="Selecciona el pais"
                        required>
          </model-select>
        </div>
      </div>
      <div class="box-body table-responsive no-padding">
        <table class="table table-hover">
          <tbody>
          <tr>
            <th class="text-center">Nombre Provincia</th>
            <th class="text-center">Opciones</th>
          </tr>
          <tr v-if="!paisSeleccionado">
            <td colspan="2">Selecciona primero el pais</td>
          </tr>
          <tr v-else-if="!dataProvincias && paisSeleccionado">
            <td colspan="2">
              <div class="loader">
              </div>
            </td>
          </tr>
          <template v-else-if="hayProvincias && paisSeleccionado">
            <tr v-for="provincia in pagination.data">
              <td class="text-center">{{provincia.v_nombre_provincia}}</td>
              <td class="text-center">
                <v-btn class="info" type="button" v-on:click="btnVerProvincia(provincia)"
                       :id="'buttonShow'+provincia.id_m_provincias" v-show="permisoShow"
                       data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"><i
                  class="fa fa-search"></i></v-btn>
                <v-btn color="primary" type="button" v-show="permisoUpdate"
                       :id="'buttonUpdate'+provincia.id_m_provincias" v-on:click="btnEditarProvincia(provincia)"
                       data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-pencil"></i>
                </v-btn>
                <v-btn color="error" type="button" v-show="permisoDestroy"
                       :id="'buttonDestroy'+provincia.id_m_provincias" v-on:click="btnBorrarProvincia(provincia)"
                       data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-trash"></i>
                </v-btn>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="2">No hay provincias registradas en {{pais.text}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div class="box-footer clearfix">
        <ul class="pagination pagination-sm no-margin pull-right" v-show="paisSeleccionado">
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(1,pais.value)">
              <i class="fa fa-angle-double-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(pagination.current_page - 1,pais.value)">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-for="pagina in pagesNumber" :class="[ pagina === isActived ? 'active' : '']">
            <a href="#"
               @click.prevent="cambiarPagina(pagina,pais.value)">{{ pagina }}</a>
          </li>
          <li v-if="pagination.current_page < pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.current_page + 1,pais.value)">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page !== pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.last_page ,pais.value)">
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
            <store v-if="mostrarModal==='registro'" v-on:registro="cambiarPagina(1,pais.value)"
                   v-on:cerrar_modal="limpiarModal" :pais="pais"></store>
            <show v-else-if="mostrarModal==='ver'" :provincia="provinciaShow" v-on:cerrar_modal="limpiarModal"></show>
            <update v-else-if="mostrarModal==='editar'" :updateProvincia="provinciaUpdate"
                    v-on:cerrar_modal="limpiarModal" v-on:actualizar="cambiarPagina(1,pais.value)"></update>
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
                <v-btn color="error" type="button" id="btnEliminar" v-on:click="eliminarProvincia"
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
  import {mapGetters, mapMutations} from 'vuex';
  import {ModelSelect} from 'vue-search-select';
  import Store from './parts/store.vue';
  import Show from './parts/show.vue';
  import Update from './parts/update.vue';

  export default {
    data() {
      return {
        mostrarModal: null,
        dataProvincias: false,
        hayProvincias: false,
        paisSeleccionado: false,
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        permisoIndexProvincias: false,
        id_pais: null,
        paises: [],
        pais: {
          value: '',
          text: ''
        },
        provinciaShow: null,
        provinciaUpdate: null,
        provinciaCreate: null,
        idProvinciaEliminar: null,
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
      btnCrearProvincia() {
        // let yo = this;
        this.mostrarModal = 'registro';
        //console.log('pais afuera',pais);
        //yo.provinciaCreate = pais;
        $('#modal').modal('show');
        $('#modalTitle').html(this.pais.text);
      },
      seleccionarPais() {
        this.paisSeleccionado = true;
        this.obtenerData(1, this.pais.value)
      },
      obtenerData(pagina, pais) {
        this.dataProvincias = false;
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().getMethodsWithBearer("api/avanzamas/provincias", token, "paginate", pagina, null, "['id_m_paises_fk','=','" + pais + "']", "'v_nombre_provincia','asc'")
          .then(response => {
            this.pagination = response.body;
            this.dataProvincias = true;
            this.hayProvincias = this.pagination.data.length > 0;
          }, errors => {
            yo.$router.push({name: 'dashboard'});
            yo.$toastr('error', 'Ocurrió un error cargando los provincias', 'Cargando Provincias');
          });
      },
      btnVerProvincia(provincia) {
        let boton_loading = $('#buttonShow' + provincia.id_m_provincias);
        boton_loading.button('loading');
        let token = this.getUsuario.token;
        let yo = this;
        this.getAppServices().getMethodsWithBearer("api/avanzamas/provincias/" + provincia.id_m_provincias, token, 'paginate', 1)
          .then(response => {
            yo.provinciaShow = response.body;
            this.mostrarModal = 'ver';
            $('#modal').modal('show');
            $('#modalTitle').html(response.body.v_nombre_pais);
            boton_loading.button('reset');
          }, errors => {
            $('#modal').modal('hide');
            this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
          });
      },
      btnEditarProvincia(provincia) {
        let boton_loading = $('#buttonUpdate' + provincia.id_m_provincias);
        boton_loading.button('loading');
        let token = this.getUsuario.token;
        let yo = this;
        this.getAppServices().getMethodsWithBearer("api/avanzamas/provincias/" + provincia.id_m_provincias, token, "paginate", 1)
          .then(response => {
            yo.provinciaUpdate = response.body;
            console.log(yo.provinciaUpdate);
            this.mostrarModal = 'editar';
            $('#modal').modal('show');
            $('#modalTitle').html(response.body.v_nombre_pais);
            boton_loading.button('reset');
          }, errors => {
            $('#modal').modal('hide');
            this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
          });
      },
      btnBorrarProvincia(provincia) {
        $('#modalDestroy').modal('show');
        this.idProvinciaEliminar = provincia.id_m_provincias;
        this.id_pais = provincia.id_m_paises_fk;
      },
      eliminarProvincia() {
        let yo = this;
        let token = this.getUsuario.token;
        let boton_eliminar = $('#btnEliminar');
        boton_eliminar.button('loading');
        this.getAppServices().destroyMethodWithBearer('api/avanzamas/provincias/' + this.idProvinciaEliminar, token)
          .then(response => {
            $('#modalDestroy').modal('hide');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
            boton_eliminar.button('reset');
            yo.cambiarPagina(1, this.id_pais);
          }, errors => {
            yo.$toastr('error', errors.body.mensaje, "Error desconocido");
            boton_eliminar.button('reset');
          });
      },
      cambiarPagina(pagina, pais) {
        this.pagination.current_page = pagina;
        this.obtenerData(pagina, pais);
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
      this.$emit("load_data", {
        show: false
      });
      this.getAppServices().getMethodWithoutBearer('api/paises')
        .then(response => {
          yo.paises = response.body;
        }, errors => {
          yo.$router.push({name: 'dashboard'});
          yo.$toastr('error', 'Ocurrió un error cargando los paises', 'Cargando Pais');
        });
      let permiso = 'index.provincias.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        yo.setValorBusquedaStore('store.provincias.' + yo.getUsuario.rol);
        yo.setValorBusquedaShow('show.provincias.' + yo.getUsuario.rol);
        yo.setValorBusquedaUpdate('update.provincias.' + yo.getUsuario.rol);
        yo.setValorBusquedaDestroy('destroy.provincias.' + yo.getUsuario.rol);
        yo.permisoStore = !!(yo.obtenerPermisoStore);
        yo.permisoShow = !!(yo.obtenerPermisoShow);
        yo.permisoUpdate = !!(yo.obtenerPermisoUpdate);
        yo.permisoDestroy = !!(yo.obtenerPermisoDestroy);
//        this.obtenerData(this.pagination.current_page);
      } else {
        yo.$router.push({name: 'dashboard'});
        yo.$toastr('error', 'No posee permisos para acceder a esta acción', 'Acceso denegado');
      }
    },
  }
</script>
