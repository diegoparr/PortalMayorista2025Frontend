<template>
  <div :class="sizeContainer">
    <div class="box">
      <div class="box-header">
        <div class="row">
          <div class="col-xs-4">
            <v-btn color="info" type="button"
                   v-show="permisoStore" v-on:click="btnCrearUsuario">
              <i class="fa fa-user pull-left"></i>
             Registrar Usuario
            </v-btn>

          </div>
          <div class="col-xs-5 col-xs-offset-3">
            <model-select :options="roles" id="rol" v-model="rol" class="form-control"
                           v-on:input="seleccionarRol"
                          data-placement="left" title="Selecciona el rol"
                          required>
            </model-select>
          </div>
        </div>
      </div>
      <div class="box-body table-responsive no-padding">
        <table class="table table-hover">
          <thead>
          <tr>
            <th>Nombres y Apellidos</th>
            <th>Nombre Usuario</th>
            <th>Email</th>
            <th>Opciones</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="!rolSeleccionado">
            <td colspan="2">Selecciona primero el rol</td>
          </tr>
          <tr v-else-if="!dataUsuarios && rolSeleccionado">
            <td colspan="2">
              <div class="loader">
                <hr>
              </div>
            </td>
          </tr>
          <template v-else-if="hayUsuarios && rolSeleccionado">
            <tr v-for="usuario in pagination.data">
              <td>
                {{usuario.v_primer_nombre}} {{usuario.v_segundo_nombre}} {{usuario.v_primer_apellido}} {{usuario.v_segundo_apellido}}
              </td>
              <td>{{usuario.name}}</td>
              <td>{{usuario.email}}</td>
              <td>
                <v-btn color="info" type="button" v-on:click="btnVerUsuario(usuario)"
                        :id="'buttonShow'+usuario.id" v-show="permisoShow"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"><i
                  class="fa fa-search"></i></v-btn>
                <v-btn color="primary" type="button" v-show="permisoUpdate"
                        :id="'buttonUpdate'+usuario.id" v-on:click="btnEditarUsuario(usuario)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-pencil"></i>
                </v-btn>
                <v-btn color="error" type="button" v-show="permisoDestroy"
                        :id="'buttonDestroy'+usuario.id" v-on:click="btnBorrarUsuario(usuario)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-trash"></i>
                </v-btn>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="2">No hay usuarios registrados en {{rol.text}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div class="col-xs-12">
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
            <show v-else-if="mostrarModal=='ver'" :usuario="usuarioShow" v-on:cerrar_modal="limpiarModal"></show>
            <update v-else-if="mostrarModal=='editar'" :updateUsuario="usuarioUpdate"
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
                <v-btn color="error" type="button" id="btnEliminar" v-on:click="eliminarUsuario"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Eliminando">
                  <i class="fa fa-trash pull-left"></i>
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
        dataUsuarios: false,
        hayUsuarios: false,
        rolSeleccionado: false,
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        permisoIndexUsuarios: false,
        id_rol: null,
        roles: [],
        rol: {
          value: '',
          text: ''
        },
        usuarioShow: null,
        usuarioUpdate: null,
        usuarioCreate: null,
        idUsuarioEliminar: null,
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
      btnCrearUsuario() {
        // let yo = this;
        this.mostrarModal = 'registro';
        //console.log('rol afuera',rol);
        //yo.usuarioCreate = rol;
        $('#modal').modal('show');
        $('#modalTitle').html("Registro de usuario");
      },
      seleccionarRol() {
        this.rolSeleccionado = true;
        this.obtenerData(1, this.rol.value)
      },
      obtenerData(pagina, rol) {
        this.dataUsuarios = false;
        let yo = this;
        let token = this.getUsuario.token;
        this.$http.get("api/avanzamas/usuarios?order=['v_primer_nombre','asc']&rol=" + rol + "&page=" + pagina, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(response => {
          this.pagination = response.body;
          this.dataUsuarios = true;
          if (this.pagination.data.length > 0)
            this.hayUsuarios = true;
          else
            this.hayUsuarios = false;
        }, errors => {
          yo.$router.push({name: 'panel'});
          yo.$toastr('error', 'Ocurrió un error cargando los usuarios', 'Cargando Usuarios');
        });
      },
      btnVerUsuario(usuario) {
        let boton_loading = $('#buttonShow' + usuario.id);
        boton_loading.button('loading');
        let token = this.getUsuario.token;
        let yo = this;
        this.$http.get('api/avanzamas/usuarios/' + usuario.id + "?width=['direcciones','telefonos','tipoDocumentos']", {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(response => {
          yo.usuarioShow = response.body;
          this.mostrarModal = 'ver';
          $('#modal').modal('show');
          $('#modalTitle').html("Datos del usuario");
          boton_loading.button('reset');
        }, errors => {
          $('#modal').modal('hide');
          this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
        });
      },
      btnEditarUsuario(usuario) {
        let boton_loading = $('#buttonUpdate' + usuario.id);
        boton_loading.button('loading');
        let token = this.getUsuario.token;
        let yo = this;
        this.$http.get('api/avanzamas/usuarios/' + usuario.id + "?width=['direcciones','telefonos','tipoDocumentos','rols']", {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(response => {
          yo.usuarioUpdate = response.body;
          this.mostrarModal = 'editar';
          $('#modal').modal('show');
          $('#modalTitle').html(response.body.v_nombre_rol);
          boton_loading.button('reset');
        }, errors => {
          $('#modal').modal('hide');
          this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
        });
      },
      btnBorrarUsuario(usuario) {
        $('#modalDestroy').modal('show');
        this.idUsuarioEliminar = usuario.id;
        this.id_rol = this.rol.value;
      },
      eliminarUsuario() {
        let yo = this;
        let token = this.getUsuario.token;
        let boton_eliminar = $('#btnEliminar');
        boton_eliminar.button('loading');
        this.$http.delete('api/avanzamas/usuarios/' + this.idUsuarioEliminar, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(response => {
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
      'getUsuario.token', 'getIndex', 'obtenerPermisoIndex', 'obtenerPermisoStore', 'obtenerPermisoShow',
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
      let token = this.getUsuario.token;
      this.$http.get("api/avanzamas/roles?tipo=pluck", {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(response => {
        yo.roles = response.body;
      }, errors => {
        yo.$router.push({name: 'panel'});
        yo.$toastr('error', 'Ocurrió un error cargando las roles', 'Cargando Rols');
      });
      let permiso = 'index.usuarios.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        yo.setValorBusquedaStore('store.usuarios.' + yo.getUsuario.rol);
        yo.setValorBusquedaShow('show.usuarios.' + yo.getUsuario.rol);
        yo.setValorBusquedaUpdate('update.usuarios.' + yo.getUsuario.rol);
        yo.setValorBusquedaDestroy('destroy.usuarios.' + yo.getUsuario.rol);
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
