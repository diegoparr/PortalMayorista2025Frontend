<template>
  <div :class="sizeContainer">
    <div class="box">
      <div class="box-header">
        <h3 class="box-title">
          <v-btn color="info" type="button" v-on:click="crearRolModal" v-show="permisoStore">
            <i class="fa fa-upload pull-left"></i> Registrar Rol
          </v-btn>
        </h3>
      </div>
      <div class="box-body table-responsive no-padding">
        <table class="table table-hover">
          <tbody>
          <tr>
            <th class="text-center">Nombre</th>
            <th class="text-center">Opciones</th>
          </tr>
          <tr v-if="!dataRoles">
            <td colspan="5">
              <div class="loader">
                <hr>
              </div>
            </td>
          </tr>
          <template v-else-if="hayRoles">
            <tr v-for="rol in pagination.data">
              <td class="text-center">{{rol.name}}</td>

              <td class="text-center">
                <v-btn color="info" type="button" v-on:click="btnVerRol(rol)"
                          :id="'buttonShow'+rol.id" v-show="permisoShow"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"><i
                  class="fa fa-search"></i>

                </v-btn>
                <!--<button class="btn btn-primary" type="button" v-on:click="btnVerRol(rol)"
                        :id="'buttonShow'+rol.id" v-show="permisoShow"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"><i
                  class="fa fa-search"></i></button>-->
                <v-btn color="primary" type="button" v-show="permisoUpdate"
                        :id="'buttonUpdate'+rol.id" v-on:click="btnEditarRol(rol)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-pencil"></i>
                </v-btn>
                <v-btn color="error" type="button" v-show="permisoDestroy"
                        :id="'buttonDestroy'+rol.id" v-on:click="btnBorrarRol(rol)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-trash"></i>
                </v-btn>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="4">No hay roles registrados</td>
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
          <li v-for="pagina in pagesNumber" :class="[ pagina == isActived ? 'active' : '']">
            <a href="#"
               @click.prevent="cambiarPagina(pagina)">{{ pagina }}</a>
          </li>
          <li v-if="pagination.current_page < pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.current_page + 1)">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page != pagination.last_page">
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
            <store v-if="mostrarModal=='registro'" v-on:registro="cambiarPagina(1)"
                   v-on:cerrar_modal="limpiarModal"></store>
            <show v-if="mostrarModal=='ver'" :rol="rolShow" v-on:cerrar_modal="limpiarModal"></show>
            <update v-else-if="mostrarModal=='editar'" :updateRol="rolUpdate"
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
                <v-btn color="error" type="button" id="btnEliminar" v-on:click="eliminarRol"
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
  import Store from './parts/store.vue';
  import Show from './parts/show.vue';
  import Update from './parts/update.vue';

  export default {
    data() {
      return {
        roles: [],
        dataRoles: false,
        hayRoles: false,
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        permisoIndexUsuarios: false,
        mostrarModal: null,
        rolShow: null,
        rolUpdate: null,
        idRolEliminar: null,
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
        limpiarModal() {
          this.mostrarModal = 'ninguno';
        },
        crearRolModal() {
          this.mostrarModal = 'registro';
          $('#modal').modal('show');
          $('#modalTitle').html("REGISTRAR ROL");
        },
        obtenerData(pagina) {
          this.dataRoles = false;
          let yo = this;
          let token = this.getUsuario.token;
          this.getAppServices().getMethodsWithBearer("api/avanzamas/roles", token, 'paginate', pagina, null, null, "'name','asc'")
              .then(response => {
              this.pagination = response.body;
              this.dataRoles = true;
              if (this.pagination.data.length > 0)
                this.hayRoles = true
            }, errors => {
              yo.$router.push({name: 'panel'});
              yo.$toastr('error', 'Ocurrió un error cargando los roles', 'Cargando Roles');
            });
        },
        btnVerRol(rol) {
          let boton_loading = $('#buttonShow' + rol.id);
          boton_loading.button('loading');
          let token = this.getUsuario.token;
          let yo = this;
          this.getAppServices().getMethodsWithBearer("api/avanzamas/roles/" + rol.id, token, 'paginate', 1)
            .then(response => {
              yo.rolShow = response.body;
              this.mostrarModal = 'ver';
              $('#modal').modal('show');
              $('#modalTitle').html(response.body.name);
              boton_loading.button('reset');
            }, errors => {
              $('#modal').modal('hide');
              this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
            });
        },
        btnEditarRol(rol) {
          let boton_loading = $('#buttonUpdate' + rol.id);
          boton_loading.button('loading');
          let token = this.getUsuario.token;
          let yo = this;
          this.getAppServices().getMethodsWithBearer("api/avanzamas/roles/" + rol.id, token, 'paginate', 1)
            .then(response => {
              yo.rolUpdate = response.body;
              this.mostrarModal = 'editar';
              $('#modal').modal('show');
              $('#modalTitle').html(response.body.name);
              boton_loading.button('reset');
            }, errors => {
              $('#modal').modal('hide');
              this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
            });
        },
        btnBorrarRol(rol) {
          $('#modalDestroy').modal('show');
          this.idRolEliminar = rol.id;
        },
        eliminarRol() {
          let yo = this;
          let token = this.getUsuario.token;
          let boton_eliminar = $('#btnEliminar');
          boton_eliminar.button('loading');
          this.getAppServices().destroyMethodWithBearer('api/avanzamas/roles/' + this.idRolEliminar, token)
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
      this.sizeContainer = this.$route.meta.sizeContainer;
      this.$emit("load_data", {
        show: false
      });
      let permiso = 'index.roles.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        yo.setValorBusquedaStore('store.roles.' + yo.getUsuario.rol);
        yo.setValorBusquedaShow('show.roles.' + yo.getUsuario.rol);
        yo.setValorBusquedaUpdate('update.roles.' + yo.getUsuario.rol);
        yo.setValorBusquedaDestroy('destroy.roles.' + yo.getUsuario.rol);
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
