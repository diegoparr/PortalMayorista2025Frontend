<template>
  <div :class="sizeContainer">
    <div class="box">
      <div class="box-header">
        <div class="col-xs-12 col-md-6">
          <h3 class="box-title">
            <v-btn color="info" type="button" v-show="permisoStore" v-on:click="btnCrearPermiso"
                    :disabled="!rolSeleccionado">
              <i class="fa fa-upload pull-left"></i>
              {{(rolSeleccionado) ? 'Registrar Permiso en ' + rol.text : 'Selecciona un rol'}}
            </v-btn>
          </h3>
        </div>
        <div class="col-xs-12 col-md-6" >
          <model-select :options="roles" id="v_ciudad" v-model="rol" class="form-control"
                         v-on:input="seleccionarRol"
                        data-placement="left" title="Selecciona el rol"
                        required>
          </model-select>
        </div>
      </div>
      <div class="box-body table-responsive no-padding">
        <table class="table table-hover">

          <tbody>
          <tr>
            <th class="text-center">Nombre Permiso</th>
            <th class="text-center">Opciones</th>
          </tr>
          <tr v-if="!rolSeleccionado">
            <td colspan="2">Selecciona primero el rol</td>
          </tr>
          <tr v-else-if="!dataPermisos && rolSeleccionado">
            <td colspan="2">
              <div class="loader">
                <hr>
              </div>
            </td>
          </tr>
          <template v-else-if="hayPermisos && rolSeleccionado">
            <tr v-for="permiso in pagination.data">
              <td class="text-center">{{permiso.name}}</td>
              <td class="text-center">
                <v-btn color="info" type="button" v-on:click="btnVerPermiso(permiso)"
                        :id="'buttonShow'+permiso.id" v-show="permisoShow"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"><i
                  class="fa fa-search"></i></v-btn>
                <v-btn color="primary" type="button" v-show="permisoUpdate"
                        :id="'buttonUpdate'+permiso.id" v-on:click="btnEditarPermiso(permiso)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-pencil"></i>
                </v-btn>
                <v-btn color="error" type="button" v-show="permisoDestroy"
                        :id="'buttonDestroy'+permiso.id" v-on:click="btnBorrarPermiso(permiso)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-trash"></i>
                </v-btn>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="2">No hay permisos registradas en {{rol.text}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div class="box-footer clearfix">
        <ul class="pagination pagination-sm no-margin pull-right" v-show="rolSeleccionado">
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(1,rol.value)">
              <i class="fa fa-angle-double-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(pagination.current_page - 1,rol.value)">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-for="pagina in pagesNumber" :class="[ pagina == isActived ? 'active' : '']">
            <a href="#"
               @click.prevent="cambiarPagina(pagina,rol.value)">{{ pagina }}</a>
          </li>
          <li v-if="pagination.current_page < pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.current_page + 1,rol.value)">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page != pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.last_page ,rol.value)">
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
            <store v-if="mostrarModal=='registro'" v-on:registro="cambiarPagina(1,rol.value)"
                   v-on:cerrar_modal="limpiarModal" :rol="rol"></store>
            <show v-else-if="mostrarModal=='ver'" :permiso="permisoShow" v-on:cerrar_modal="limpiarModal"></show>
            <update v-else-if="mostrarModal=='editar'" :updatePermiso="permisoUpdate" :rol="rol"
                    v-on:cerrar_modal="limpiarModal" v-on:actualizar="cambiarPagina(1,rol.value)"></update>
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
                <v-btn color="error" type="button" id="btnEliminar" v-on:click="eliminarPermiso"
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
  import helpers from '../../helpers';

  export default {
    data() {
      return {
        mostrarModal: null,
        dataPermisos: false,
        hayPermisos: false,
        rolSeleccionado: false,
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        permisoIndexPermisos: false,
        id_rol: null,
        roles: [],
        rol: {
          value: '',
          text: ''
        },
        permisoShow: null,
        permisoUpdate: null,
        permisoCreate: null,
        idPermisoEliminar: null,
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
      btnCrearPermiso() {
        // let yo = this;
        this.mostrarModal = 'registro';
        //console.log('rol afuera',rol);
        //yo.permisoCreate = rol;
        $('#modal').modal('show');
        $('#modalTitle').html(this.rol.text);
      },
      seleccionarRol() {
        this.rolSeleccionado = true;
        this.obtenerData(1, this.rol.value)
      },
      obtenerData(pagina, rol) {
        this.dataPermisos = false;
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().getMethodsWithBearer("api/avanzamas/permisos", token, "paginate", pagina, null, "['name','=','" + rol + "']", "'name','asc'")
          .then(response => {
            this.pagination = response.body;
            this.dataPermisos = true;
            if (this.pagination.data.length > 0)
              this.hayPermisos = true;
            else
              this.hayPermisos = false;
          }, errors => {
            yo.$router.push({name: 'panel'});
            yo.$toastr('error', 'Ocurrió un error cargando los permisos', 'Cargando Permisos');
          });
      },
      btnVerPermiso(permiso) {
        let boton_loading = $('#buttonShow' + permiso.id);
        boton_loading.button('loading');
        let token = this.getUsuario.token;
        let yo = this;
        this.getAppServices().getMethodsWithBearer("api/avanzamas/permisos/" + permiso.id, token, 'paginate', 1)
          .then(response => {
            yo.permisoShow = response.body;
            this.mostrarModal = 'ver';
            $('#modal').modal('show');
            $('#modalTitle').html(response.body.name);
            boton_loading.button('reset');
          }, errors => {
            $('#modal').modal('hide');
            this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
          });
      },
      btnEditarPermiso(permiso) {
        let boton_loading = $('#buttonUpdate' + permiso.id);
        boton_loading.button('loading');
        let token = this.getUsuario.token;
        let yo = this;
        this.getAppServices().getMethodsWithBearer("api/avanzamas/permisos/" + permiso.id, token, "paginate", 1)
          .then(response => {
            yo.permisoUpdate = response.body;
            console.log(yo.permisoUpdate);
            this.mostrarModal = 'editar';
            $('#modal').modal('show');
            $('#modalTitle').html("Editar Rol");
            boton_loading.button('reset');
          }, errors => {
            $('#modal').modal('hide');
            this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
          });
      },
      btnBorrarPermiso(permiso) {
        $('#modalDestroy').modal('show');
        this.idPermisoEliminar = permiso.id;
        this.id_rol = this.rol.text;
      },
      eliminarPermiso() {
        let yo = this;
        let token = this.getUsuario.token;
        let boton_eliminar = $('#btnEliminar');
        boton_eliminar.button('loading');
        this.getAppServices().destroyMethodWithBearer('api/avanzamas/permisos/' + this.idPermisoEliminar, token)
          .then(response => {
            $('#modalDestroy').modal('hide');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
            boton_eliminar.button('reset');
            yo.cambiarPagina(1, this.id_rol);
          }, errors => {
            yo.$toastr('error', errors.body.mensaje, "Error desconocido");
            boton_eliminar.button('reset');
          });
      },
      cambiarPagina(pagina, rol) {
        this.pagination.current_page = pagina;
        this.obtenerData(pagina, rol);
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
      let token = this.getUsuario.token;
      this.sizeContainer = this.$route.meta.sizeContainer;
      this.$emit("load_data", {
        show: false
      });
      this.getAppServices().getMethodsWithBearer('api/avanzamas/roles',token,'pluck')
        .then(response => {
          yo.roles = response.body;
        }, errors => {
          yo.$router.push({name: 'panel'});
          yo.$toastr('error', 'Ocurrió un error cargando los roles', 'Cargando Rol');
        });
      let permiso = 'index.permisos.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        yo.setValorBusquedaStore('store.permisos.' + yo.getUsuario.rol);
        yo.setValorBusquedaShow('show.permisos.' + yo.getUsuario.rol);
        yo.setValorBusquedaUpdate('update.permisos.' + yo.getUsuario.rol);
        yo.setValorBusquedaDestroy('destroy.permisos.' + yo.getUsuario.rol);
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
