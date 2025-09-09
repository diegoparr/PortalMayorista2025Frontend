<template>
  <div>
    <div :class="sizeContainer" class="users-container">
      <!-- Header Principal -->
      <div class="users-header">
        <div class="header-content">
          <div class="header-title">
            <div class="title-icon">
              <i class="fa fa-users"></i>
            </div>
            <div class="title-text">
              <h1>Gestión de Usuarios</h1>
              <p>Administra los usuarios y accesos del sistema</p>
            </div>
          </div>
          <div class="header-actions">
            <button class="btn-create-user" v-on:click="btnCrearUsuario" v-show="permisoStore" :disabled="!rolSeleccionado">
              <i class="fa fa-user-plus"></i>
              <span>{{(rolSeleccionado) ? 'Registrar Usuario' : 'Selecciona un Rol'}}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Selector de Rol -->
      <div class="role-selector-section">
        <div class="selector-card">
          <div class="selector-header">
            <h3>
              <i class="fa fa-user-tag"></i>
              Seleccionar Rol
            </h3>
            <p>Elige el rol para gestionar sus usuarios</p>
          </div>
          <div class="selector-content">
            <div class="role-select-wrapper">
              <i class="fa fa-chevron-down selector-icon"></i>
              <model-select :options="roles" id="rol" v-model="rol" class="role-select"
                             v-on:input="seleccionarRol"
                            data-placement="left" title="Selecciona el rol"
                            required>
              </model-select>
            </div>
          </div>
        </div>
      </div>

      <!-- Estadísticas del Rol Seleccionado -->
      <div class="users-stats" v-if="rolSeleccionado">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fa fa-users"></i>
          </div>
          <div class="stat-content">
            <h3>{{ pagination.total || 0 }}</h3>
            <p>Total de Usuarios</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fa fa-user-check"></i>
          </div>
          <div class="stat-content">
            <h3>{{ pagination.data ? pagination.data.length : 0 }}</h3>
            <p>Usuarios Activos</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fa fa-user-tag"></i>
          </div>
          <div class="stat-content">
            <h3>{{ rol.text || 'N/A' }}</h3>
            <p>Rol Seleccionado</p>
          </div>
        </div>
      </div>

      <!-- Contenido Principal -->
      <div class="users-content" v-if="rolSeleccionado">
        <div class="content-card">
          <!-- Loading State -->
          <div v-if="!dataUsuarios" class="loading-container">
            <div class="loading-spinner">
              <i class="fa fa-spinner fa-spin"></i>
            </div>
            <p>Cargando usuarios...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="!hayUsuarios" class="empty-state">
            <div class="empty-icon">
              <i class="fa fa-users"></i>
            </div>
            <h3>No hay usuarios registrados</h3>
            <p>Este rol no tiene usuarios asignados. Comienza agregando el primer usuario.</p>
            <button class="btn-create-first" v-on:click="btnCrearUsuario" v-show="permisoStore">
              <i class="fa fa-user-plus"></i>
              Agregar Primer Usuario
            </button>
          </div>

          <!-- Usuarios List -->
          <div v-else class="users-list">
            <div class="list-header">
              <h3>Usuarios de {{ rol.text }}</h3>
            </div>
            <div class="users-grid">
              <div v-for="usuario in pagination.data" :key="usuario.id" class="user-card">
                <div class="user-header">
                  <div class="user-avatar">
                    <i class="fa fa-user"></i>
                  </div>
                  <div class="user-info">
                    <h4 class="user-name">
                      {{usuario.v_primer_nombre}} {{usuario.v_segundo_nombre}} {{usuario.v_primer_apellido}} {{usuario.v_segundo_apellido}}
                    </h4>
                    <p class="user-username">{{usuario.name}}</p>
                  </div>
                </div>
                <div class="user-details">
                  <div class="detail-item">
                    <i class="fa fa-envelope"></i>
                    <span>{{usuario.email}}</span>
                  </div>
                </div>
                <div class="user-actions">
                  <button class="action-btn view-btn" v-on:click="btnVerUsuario(usuario)"
                          :id="'buttonShow'+usuario.id" v-show="permisoShow"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;" title="Ver detalles">
                    <i class="fa fa-search"></i>
                  </button>
                  <button class="action-btn edit-btn" v-on:click="btnEditarUsuario(usuario)"
                          :id="'buttonUpdate'+usuario.id" v-show="permisoUpdate"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;" title="Editar usuario">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button class="action-btn delete-btn" v-on:click="btnBorrarUsuario(usuario)"
                          :id="'buttonDestroy'+usuario.id" v-show="permisoDestroy"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;" title="Eliminar usuario">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado sin rol seleccionado -->
      <div class="no-role-selected" v-if="!rolSeleccionado">
        <div class="no-role-card">
          <div class="no-role-icon">
            <i class="fa fa-user-tag"></i>
          </div>
          <h3>Selecciona un Rol</h3>
          <p>Para gestionar usuarios, primero debes seleccionar un rol del sistema</p>
          <div class="role-hint">
            <i class="fa fa-info-circle"></i>
            <span>Usa el selector de arriba para elegir el rol que deseas administrar</span>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div class="pagination-container" v-if="hayUsuarios && rolSeleccionado">
        <div class="pagination-info">
          <span>Mostrando {{ pagination.data.length }} de {{ pagination.total }} usuarios</span>
        </div>
        <div class="pagination-controls">
          <button class="pagination-btn" :disabled="pagination.current_page <= 1" @click="cambiarPagina(1,rol.value)" title="Primera página">
            <i class="fa fa-angle-double-left"></i>
          </button>
          <button class="pagination-btn" :disabled="pagination.current_page <= 1" @click="cambiarPagina(pagination.current_page - 1,rol.value)" title="Página anterior">
            <i class="fa fa-angle-left"></i>
          </button>
          <div class="pagination-numbers">
            <button v-for="pagina in pagesNumber" :key="pagina" :class="['pagination-number', { 'active': pagina == isActived }]" @click="cambiarPagina(pagina,rol.value)">
              {{ pagina }}
            </button>
          </div>
          <button class="pagination-btn" :disabled="pagination.current_page >= pagination.last_page" @click="cambiarPagina(pagination.current_page + 1,rol.value)" title="Página siguiente">
            <i class="fa fa-angle-right"></i>
          </button>
          <button class="pagination-btn" :disabled="pagination.current_page >= pagination.last_page" @click="cambiarPagina(pagination.last_page,rol.value)" title="Última página">
            <i class="fa fa-angle-double-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Modales -->
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
    <div class="modal fade" id="modalDestroy" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content modal-destroy">
          <div class="modal-header-custom">
            <div class="delete-icon">
              <i class="fa fa-exclamation-triangle"></i>
            </div>
            <h4 class="modal-title">Confirmar Eliminación</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body-custom">
            <p class="delete-message">
              ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
            </p>
            <div class="delete-actions">
              <button type="button" class="btn-cancel" data-dismiss="modal">
                <i class="fa fa-times"></i>
                Cancelar
              </button>
              <button type="button" class="btn-delete" id="btnEliminar" v-on:click="eliminarUsuario"
                      data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Eliminando...">
                <i class="fa fa-trash"></i>
                Eliminar Usuario
              </button>
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

<style scoped>
/* Contenedor Principal */
.users-container {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

/* Header Principal */
.users-header {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(255, 102, 51, 0.3);
  color: white;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 20px;
}

.title-icon {
  font-size: 3rem;
  opacity: 0.9;
}

.title-text h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 300;
}

.title-text p {
  font-size: 1.1rem;
  margin: 10px 0 0 0;
  opacity: 0.9;
}

.header-actions {
  display: flex;
  gap: 15px;
}

.btn-create-user {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  backdrop-filter: blur(10px);
}

.btn-create-user:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-create-user:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Selector de Rol */
.role-selector-section {
  margin-bottom: 30px;
}

.selector-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 102, 51, 0.1);
}

.selector-header {
  text-align: center;
  margin-bottom: 20px;
}

.selector-header h3 {
  color: #333;
  font-size: 1.5rem;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.selector-header p {
  color: #666;
  margin: 0;
}

.selector-content {
  max-width: 400px;
  margin: 0 auto;
}

.role-select-wrapper {
  position: relative;
}

.selector-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #ff6633;
  pointer-events: none;
  z-index: 2;
}

.role-select {
  width: 100%;
  padding: 15px 45px 15px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 50px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
}

.role-select:focus {
  border-color: #ff6633;
  box-shadow: 0 0 0 3px rgba(255, 102, 51, 0.1);
  outline: none;
}

/* Estadísticas */
.users-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s ease;
  border-left: 4px solid #ff6633;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(255, 102, 51, 0.2);
}

.stat-icon {
  font-size: 2.5rem;
  color: #ff6633;
  opacity: 0.8;
}

.stat-content h3 {
  font-size: 2rem;
  margin: 0;
  color: #333;
  font-weight: 600;
}

.stat-content p {
  margin: 5px 0 0 0;
  color: #666;
  font-size: 0.9rem;
}

/* Contenido Principal */
.users-content {
  margin-bottom: 30px;
}

.content-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Loading State */
.loading-container {
  text-align: center;
  padding: 60px 20px;
}

.loading-spinner {
  font-size: 3rem;
  color: #ff6633;
  margin-bottom: 20px;
}

.loading-container p {
  color: #666;
  font-size: 1.1rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 4rem;
  color: #ccc;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #333;
  margin: 0 0 10px 0;
  font-size: 1.5rem;
}

.empty-state p {
  color: #666;
  margin: 0 0 30px 0;
  font-size: 1rem;
}

.btn-create-first {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn-create-first:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 102, 51, 0.4);
}

/* Lista de Usuarios */
.users-list {
  padding: 30px;
}

.list-header {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.list-header h3 {
  color: #333;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.user-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.user-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #ff6633;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.user-info {
  flex: 1;
}

.user-name {
  color: #333;
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
}

.user-username {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.user-details {
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 0.9rem;
}

.detail-item i {
  color: #ff6633;
  width: 16px;
}

.user-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.action-btn {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.view-btn {
  background: #e3f2fd;
  color: #1976d2;
}

.view-btn:hover {
  background: #1976d2;
  color: white;
  transform: scale(1.1);
}

.edit-btn {
  background: #f3e5f5;
  color: #7b1fa2;
}

.edit-btn:hover {
  background: #7b1fa2;
  color: white;
  transform: scale(1.1);
}

.delete-btn {
  background: #ffebee;
  color: #d32f2f;
}

.delete-btn:hover {
  background: #d32f2f;
  color: white;
  transform: scale(1.1);
}

/* Estado sin rol seleccionado */
.no-role-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.no-role-card {
  text-align: center;
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.no-role-icon {
  font-size: 4rem;
  color: #ccc;
  margin-bottom: 20px;
}

.no-role-card h3 {
  color: #333;
  margin: 0 0 15px 0;
  font-size: 1.5rem;
}

.no-role-card p {
  color: #666;
  margin: 0 0 20px 0;
  font-size: 1rem;
}

.role-hint {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
  font-size: 0.9rem;
}

.role-hint i {
  color: #ff6633;
}

/* Paginación */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 15px;
  padding: 20px 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.pagination-info {
  color: #666;
  font-size: 0.9rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 5px;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #e1e5e9;
  background: white;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background: #ff6633;
  color: white;
  border-color: #ff6633;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 5px;
  margin: 0 10px;
}

.pagination-number {
  width: 40px;
  height: 40px;
  border: 1px solid #e1e5e9;
  background: white;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.pagination-number:hover {
  background: #f8f9fa;
  border-color: #ff6633;
}

.pagination-number.active {
  background: #ff6633;
  color: white;
  border-color: #ff6633;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .users-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination-container {
    flex-direction: column;
    gap: 15px;
  }
  
  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .users-container {
    padding: 10px;
  }
  
  .users-header {
    padding: 20px;
  }
  
  .title-text h1 {
    font-size: 2rem;
  }
  
  .users-stats {
    grid-template-columns: 1fr;
  }
}

/* Modal de Eliminación */
.modal-destroy {
  border-radius: 15px;
  border: none;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header-custom {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  padding: 25px 30px 20px;
  text-align: center;
  position: relative;
}

.delete-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.9;
}

.modal-header-custom .modal-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.modal-header-custom .close {
  position: absolute;
  top: 15px;
  right: 20px;
  color: white;
  opacity: 0.8;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.modal-header-custom .close:hover {
  opacity: 1;
}

.modal-body-custom {
  padding: 30px;
  text-align: center;
}

.delete-message {
  color: #666;
  font-size: 1rem;
  margin: 0 0 25px 0;
  line-height: 1.5;
}

.delete-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-cancel {
  background: #f8f9fa;
  color: #666;
  border: 2px solid #e9ecef;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-cancel:hover {
  background: #e9ecef;
  border-color: #dee2e6;
  transform: translateY(-1px);
}

.btn-delete {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-delete:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.btn-delete:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Responsive para modales */
@media (max-width: 480px) {
  .delete-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-cancel,
  .btn-delete {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }
}
</style>
