<template>
  <div :class="sizeContainer" class="roles-container">
    <!-- Header Principal -->
    <div class="roles-header">
      <div class="header-content">
        <div class="header-title">
          <div class="title-icon">
            <i class="fa fa-user-tag"></i>
          </div>
          <div class="title-text">
            <h1>Gestión de Roles</h1>
            <p>Administra los roles y permisos del sistema</p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-create-role" v-on:click="crearRolModal" v-show="permisoStore">
            <i class="fa fa-plus"></i>
            <span>Registrar Rol</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Estadísticas Rápidas -->
    <div class="roles-stats">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fa fa-users"></i>
        </div>
        <div class="stat-content">
          <h3>{{ pagination.total || 0 }}</h3>
          <p>Total de Roles</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fa fa-shield-alt"></i>
        </div>
        <div class="stat-content">
          <h3>{{ pagination.data ? pagination.data.length : 0 }}</h3>
          <p>Roles Activos</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fa fa-clock"></i>
        </div>
        <div class="stat-content">
          <h3>{{ pagination.current_page || 1 }}</h3>
          <p>Página Actual</p>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="roles-content">
      <div class="content-card">
        <!-- Loading State -->
        <div v-if="!dataRoles" class="loading-container">
          <div class="loading-spinner">
            <i class="fa fa-spinner fa-spin"></i>
          </div>
          <p>Cargando roles...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="!hayRoles" class="empty-state">
          <div class="empty-icon">
            <i class="fa fa-user-tag"></i>
          </div>
          <h3>No hay roles registrados</h3>
          <p>Comienza creando tu primer rol para el sistema</p>
          <button class="btn-create-first" v-on:click="crearRolModal" v-show="permisoStore">
            <i class="fa fa-plus"></i>
            Crear Primer Rol
          </button>
        </div>

        <!-- Roles List -->
        <div v-else class="roles-list">
          <div class="list-header">
            <h3>Lista de Roles</h3>
            <div class="list-actions">
              <div class="search-box">
                <i class="fa fa-search"></i>
                <input type="text" placeholder="Buscar roles..." v-model="searchTerm">
              </div>
            </div>
          </div>

          <div class="roles-grid">
            <div v-for="rol in pagination.data" :key="rol.id" class="role-card">
              <div class="role-header">
                <div class="role-icon">
                  <i class="fa fa-user-tag"></i>
                </div>
                <div class="role-info">
                  <h4 class="role-name">{{ rol.name }}</h4>
                  <p class="role-id">ID: {{ rol.id }}</p>
                </div>
              </div>
              
              <div class="role-actions">
                <button class="action-btn view-btn" v-on:click="btnVerRol(rol)"
                        :id="'buttonShow'+rol.id" v-show="permisoShow"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"
                        title="Ver detalles">
                  <i class="fa fa-search"></i>
                </button>
                <button class="action-btn edit-btn" v-on:click="btnEditarRol(rol)"
                        :id="'buttonUpdate'+rol.id" v-show="permisoUpdate"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"
                        title="Editar rol">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="action-btn delete-btn" v-on:click="btnBorrarRol(rol)"
                        :id="'buttonDestroy'+rol.id" v-show="permisoDestroy"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"
                        title="Eliminar rol">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div class="pagination-container" v-if="hayRoles">
      <div class="pagination-info">
        <span>Mostrando {{ pagination.data.length }} de {{ pagination.total }} roles</span>
      </div>
      <div class="pagination-controls">
        <button class="pagination-btn" 
                :disabled="pagination.current_page <= 1"
                @click="cambiarPagina(1)"
                title="Primera página">
          <i class="fa fa-angle-double-left"></i>
        </button>
        <button class="pagination-btn" 
                :disabled="pagination.current_page <= 1"
                @click="cambiarPagina(pagination.current_page - 1)"
                title="Página anterior">
          <i class="fa fa-angle-left"></i>
        </button>
        
        <div class="pagination-numbers">
          <button v-for="pagina in pagesNumber" 
                  :key="pagina"
                  :class="['pagination-number', { 'active': pagina == isActived }]"
                  @click="cambiarPagina(pagina)">
            {{ pagina }}
          </button>
        </div>
        
        <button class="pagination-btn" 
                :disabled="pagination.current_page >= pagination.last_page"
                @click="cambiarPagina(pagination.current_page + 1)"
                title="Página siguiente">
          <i class="fa fa-angle-right"></i>
        </button>
        <button class="pagination-btn" 
                :disabled="pagination.current_page >= pagination.last_page"
                @click="cambiarPagina(pagination.last_page)"
                title="Última página">
          <i class="fa fa-angle-double-right"></i>
        </button>
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
            <store v-if="mostrarModal=='registro'" v-on:registro="cambiarPagina(1)"
                   v-on:cerrar_modal="limpiarModal"></store>
            <show v-if="mostrarModal=='ver'" :rol="rolShow" v-on:cerrar_modal="limpiarModal"></show>
            <update v-else-if="mostrarModal=='editar'" :updateRol="rolUpdate"
                    v-on:cerrar_modal="limpiarModal" v-on:actualizar="cambiarPagina(1)"></update>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modalDestroy" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content delete-modal-content">
          <div class="modal-header delete-modal-header">
            <div class="delete-icon">
              <i class="fa fa-exclamation-triangle"></i>
            </div>
            <h4 class="modal-title delete-title">Confirmar Eliminación</h4>
            <button type="button" class="close delete-close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body delete-modal-body">
            <div class="delete-message">
              <p class="delete-text">
                <strong>¿Estás seguro de que deseas eliminar este rol?</strong>
              </p>
              <p class="delete-warning">
                Esta acción no se puede deshacer. El rol será eliminado permanentemente del sistema.
              </p>
            </div>
            
            <div class="delete-info">
              <div class="info-item">
                <i class="fa fa-info-circle"></i>
                <span>Se eliminarán todas las referencias asociadas</span>
              </div>
              <div class="info-item">
                <i class="fa fa-users"></i>
                <span>Los usuarios con este rol perderán sus permisos</span>
              </div>
            </div>
          </div>
          <div class="modal-footer delete-modal-footer">
            <button type="button" class="btn btn-cancel-delete" data-dismiss="modal">
              <i class="fa fa-times"></i> Cancelar
            </button>
            <button type="button" class="btn btn-confirm-delete" id="btnEliminar" v-on:click="eliminarRol"
                    data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Eliminando...">
              <i class="fa fa-trash"></i> Eliminar Rol
            </button>
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
        searchTerm: '',
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

<style scoped>
/* Estilos para la página principal de roles */
.roles-container {
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
}

.roles-header {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(255,102,51,0.3);
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
  margin: 5px 0 0 0;
  opacity: 0.9;
}

.btn-create-role {
  background: rgba(255,255,255,0.2);
  border: 2px solid rgba(255,255,255,0.3);
  color: white;
  padding: 15px 25px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-create-role:hover {
  background: rgba(255,255,255,0.3);
  border-color: rgba(255,255,255,0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.roles-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s ease;
  border-left: 4px solid #ff6633;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 25px rgba(255,102,51,0.2);
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
  font-weight: bold;
}

.stat-content p {
  margin: 5px 0 0 0;
  color: #666;
  font-size: 1rem;
}

.roles-content {
  margin-bottom: 30px;
}

.content-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  overflow: hidden;
}

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
  font-size: 1.2rem;
  color: #666;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.8rem;
  color: #333;
  margin: 0 0 10px 0;
}

.empty-state p {
  font-size: 1.1rem;
  color: #666;
  margin: 0 0 30px 0;
}

.btn-create-first {
  background: linear-gradient(135deg, #ff6633 0%, #F77300 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn-create-first:hover {
  background: linear-gradient(135deg, #F77300 0%, #ff6633 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255,102,51,0.4);
}

.roles-list {
  padding: 30px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
}

.list-header h3 {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box i {
  position: absolute;
  left: 15px;
  color: #666;
  z-index: 1;
}

.search-box input {
  padding: 12px 15px 12px 45px;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  font-size: 1rem;
  width: 300px;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #ff6633;
  box-shadow: 0 0 0 3px rgba(255,102,51,0.1);
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.role-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.role-card:hover {
  border-color: #ff6633;
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(255,102,51,0.15);
}

.role-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #ff6633 0%, #F77300 100%);
}

.role-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.role-icon {
  font-size: 2rem;
  color: #ff6633;
  opacity: 0.8;
}

.role-info {
  flex: 1;
}

.role-name {
  font-size: 1.3rem;
  color: #333;
  margin: 0 0 5px 0;
  font-weight: 600;
}

.role-id {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.role-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.action-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.view-btn {
  background: #17a2b8;
  color: white;
}

.view-btn:hover {
  background: #138496;
  transform: scale(1.1);
}

.edit-btn {
  background: #ff6633;
  color: white;
}

.edit-btn:hover {
  background: #F77300;
  transform: scale(1.1);
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.delete-btn:hover {
  background: #c82333;
  transform: scale(1.1);
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  flex-wrap: wrap;
  gap: 15px;
}

.pagination-info {
  color: #666;
  font-size: 1rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #e9ecef;
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
  border-color: #ff6633;
  color: #ff6633;
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 5px;
}

.pagination-number {
  width: 40px;
  height: 40px;
  border: 2px solid #e9ecef;
  background: white;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.pagination-number:hover {
  border-color: #ff6633;
  color: #ff6633;
  transform: translateY(-2px);
}

.pagination-number.active {
  background: #ff6633;
  border-color: #ff6633;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .roles-container {
    padding: 15px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .title-text h1 {
    font-size: 2rem;
  }
  
  .roles-stats {
    grid-template-columns: 1fr;
  }
  
  .roles-grid {
    grid-template-columns: 1fr;
  }
  
  .list-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box input {
    width: 100%;
  }
  
  .pagination-container {
    flex-direction: column;
    text-align: center;
  }
  
  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
}

/* Estilos para el modal de eliminar */
.delete-modal-content {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  border: none;
  overflow: hidden;
}

.delete-modal-header {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  border: none;
  padding: 25px 30px 20px 30px;
  position: relative;
}

.delete-icon {
  text-align: center;
  margin-bottom: 15px;
}

.delete-icon i {
  font-size: 3rem;
  color: #fff;
  opacity: 0.9;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.delete-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.delete-close {
  position: absolute;
  top: 15px;
  right: 20px;
  color: white;
  opacity: 0.8;
  font-size: 1.5rem;
  background: none;
  border: none;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.delete-close:hover {
  opacity: 1;
  background: rgba(255,255,255,0.2);
  transform: rotate(90deg);
}

.delete-modal-body {
  padding: 30px;
  background: #f8f9fa;
}

.delete-message {
  text-align: center;
  margin-bottom: 25px;
}

.delete-text {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.5;
}

.delete-warning {
  color: #dc3545;
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
  background: #fff5f5;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #dc3545;
}

.delete-info {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.info-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  color: #666;
  font-size: 0.95rem;
}

.info-item:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.info-item i {
  margin-right: 12px;
  color: #dc3545;
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

.delete-modal-footer {
  background: white;
  border: none;
  padding: 20px 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn {
  padding: 12px 25px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 140px;
  justify-content: center;
}

.btn-cancel-delete {
  background: #6c757d;
  color: white;
}

.btn-cancel-delete:hover {
  background: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn-confirm-delete {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
}

.btn-confirm-delete:hover:not(:disabled) {
  background: linear-gradient(135deg, #c82333 0%, #dc3545 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(220,53,69,0.4);
}

.btn-confirm-delete:disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Animación de entrada del modal */
.modal.fade .modal-dialog {
  transform: scale(0.8) translateY(-50px);
  transition: all 0.3s ease;
}

.modal.show .modal-dialog {
  transform: scale(1) translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .delete-modal-header {
    padding: 20px 20px 15px 20px;
  }
  
  .delete-title {
    font-size: 1.3rem;
  }
  
  .delete-modal-body {
    padding: 20px;
  }
  
  .delete-modal-footer {
    flex-direction: column;
    padding: 20px;
  }
  
  .btn {
    width: 100%;
    min-width: auto;
  }
  
  .delete-icon i {
    font-size: 2.5rem;
  }
}

/* Efecto de shake para el botón de eliminar */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.btn-confirm-delete:active {
  animation: shake 0.5s ease-in-out;
}
</style>
