<template>
  <div :class="sizeContainer" class="permissions-container">
    <!-- Header Principal -->
    <div class="permissions-header">
      <div class="header-content">
        <div class="header-title">
          <div class="title-icon">
            <i class="fa fa-shield-alt"></i>
          </div>
          <div class="title-text">
            <h1>Gestión de Permisos</h1>
            <p>Administra los permisos y accesos del sistema</p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-create-permission" v-on:click="btnCrearPermiso" v-show="permisoStore"
                  :disabled="!rolSeleccionado">
            <i class="fa fa-plus"></i>
            <span>{{(rolSeleccionado) ? 'Registrar Permiso' : 'Selecciona un Rol'}}</span>
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
          <p>Elige el rol para gestionar sus permisos</p>
        </div>
        <div class="selector-content">
          <div class="role-select-wrapper">
            <i class="fa fa-chevron-down selector-icon"></i>
            <model-select 
              :options="roles" 
              id="v_ciudad" 
              v-model="rol" 
              class="role-select"
              v-on:input="seleccionarRol"
              data-placement="left" 
              title="Selecciona el rol"
              required>
            </model-select>
          </div>
        </div>
      </div>
    </div>

    <!-- Estadísticas del Rol Seleccionado -->
    <div class="permissions-stats" v-if="rolSeleccionado">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fa fa-shield-alt"></i>
        </div>
        <div class="stat-content">
          <h3>{{ pagination.total || 0 }}</h3>
          <p>Total de Permisos</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fa fa-check-circle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ pagination.data ? pagination.data.length : 0 }}</h3>
          <p>Permisos Activos</p>
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
    <div class="permissions-content" v-if="rolSeleccionado">
      <div class="content-card">
        <!-- Loading State -->
        <div v-if="!dataPermisos" class="loading-container">
          <div class="loading-spinner">
            <i class="fa fa-spinner fa-spin"></i>
          </div>
          <p>Cargando permisos...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="!hayPermisos" class="empty-state">
          <div class="empty-icon">
            <i class="fa fa-shield-alt"></i>
          </div>
          <h3>No hay permisos registrados</h3>
          <p>Este rol no tiene permisos asignados. Comienza agregando el primer permiso.</p>
          <button class="btn-create-first" v-on:click="btnCrearPermiso" v-show="permisoStore">
            <i class="fa fa-plus"></i>
            Agregar Primer Permiso
          </button>
        </div>

        <!-- Permisos List -->
        <div v-else class="permissions-list">
          <div class="list-header">
            <h3>Permisos de {{ rol.text }}</h3>
            <div class="list-actions">
              <div class="search-box">
                <i class="fa fa-search"></i>
                <input type="text" placeholder="Buscar permisos..." v-model="searchTerm">
              </div>
            </div>
          </div>

          <div class="permissions-grid">
            <div v-for="permiso in pagination.data" :key="permiso.id" class="permission-card">
              <div class="permission-header">
                <div class="permission-icon">
                  <i class="fa fa-shield-alt"></i>
                </div>
                <div class="permission-info">
                  <h4 class="permission-name">{{ permiso.name }}</h4>
                  <p class="permission-id">ID: {{ permiso.id }}</p>
                </div>
              </div>
              
              <div class="permission-actions">
                <button class="action-btn view-btn" v-on:click="btnVerPermiso(permiso)"
                        :id="'buttonShow'+permiso.id" v-show="permisoShow"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"
                        title="Ver detalles">
                  <i class="fa fa-search"></i>
                </button>
                <button class="action-btn edit-btn" v-on:click="btnEditarPermiso(permiso)"
                        :id="'buttonUpdate'+permiso.id" v-show="permisoUpdate"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"
                        title="Editar permiso">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="action-btn delete-btn" v-on:click="btnBorrarPermiso(permiso)"
                        :id="'buttonDestroy'+permiso.id" v-show="permisoDestroy"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"
                        title="Eliminar permiso">
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
        <p>Para gestionar permisos, primero debes seleccionar un rol del sistema</p>
        <div class="role-hint">
          <i class="fa fa-info-circle"></i>
          <span>Usa el selector de arriba para elegir el rol que deseas administrar</span>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div class="pagination-container" v-if="hayPermisos && rolSeleccionado">
      <div class="pagination-info">
        <span>Mostrando {{ pagination.data.length }} de {{ pagination.total }} permisos</span>
      </div>
      <div class="pagination-controls">
        <button class="pagination-btn" 
                :disabled="pagination.current_page <= 1"
                @click="cambiarPagina(1,rol.value)"
                title="Primera página">
          <i class="fa fa-angle-double-left"></i>
        </button>
        <button class="pagination-btn" 
                :disabled="pagination.current_page <= 1"
                @click="cambiarPagina(pagination.current_page - 1,rol.value)"
                title="Página anterior">
          <i class="fa fa-angle-left"></i>
        </button>
        
        <div class="pagination-numbers">
          <button v-for="pagina in pagesNumber" 
                  :key="pagina"
                  :class="['pagination-number', { 'active': pagina == isActived }]"
                  @click="cambiarPagina(pagina,rol.value)">
            {{ pagina }}
          </button>
        </div>
        
        <button class="pagination-btn" 
                :disabled="pagination.current_page >= pagination.last_page"
                @click="cambiarPagina(pagination.current_page + 1,rol.value)"
                title="Página siguiente">
          <i class="fa fa-angle-right"></i>
        </button>
        <button class="pagination-btn" 
                :disabled="pagination.current_page >= pagination.last_page"
                @click="cambiarPagina(pagination.last_page,rol.value)"
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
            <store v-if="mostrarModal=='registro'" v-on:registro="cambiarPagina(1,rol.value)"
                   v-on:cerrar_modal="limpiarModal" :rol="rol"></store>
            <show v-else-if="mostrarModal=='ver'" :permiso="permisoShow" v-on:cerrar_modal="limpiarModal"></show>
            <update v-else-if="mostrarModal=='editar'" :updatePermiso="permisoUpdate" :rol="rol"
                    v-on:cerrar_modal="limpiarModal" v-on:actualizar="cambiarPagina(1,rol.value)"></update>
          </div>

        </div>
      </div>
    </div>
    <!-- Modal de Eliminación -->
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
                <strong>¿Estás seguro de que deseas eliminar este permiso?</strong>
              </p>
              <p class="delete-warning">
                Esta acción no se puede deshacer. El permiso será eliminado permanentemente del sistema.
              </p>
            </div>
            
            <div class="delete-info">
              <div class="info-item">
                <i class="fa fa-info-circle"></i>
                <span>Se eliminará la referencia del rol seleccionado</span>
              </div>
              <div class="info-item">
                <i class="fa fa-shield-alt"></i>
                <span>El rol perderá este permiso específico</span>
              </div>
            </div>
          </div>
          <div class="modal-footer delete-modal-footer">
            <button type="button" class="btn btn-cancel-delete" data-dismiss="modal">
              <i class="fa fa-times"></i> Cancelar
            </button>
            <button type="button" class="btn btn-confirm-delete" id="btnEliminar" v-on:click="eliminarPermiso"
                    data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Eliminando...">
              <i class="fa fa-trash"></i> Eliminar Permiso
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
        searchTerm: '',
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

<style scoped>
/* Estilos para la página principal de permisos */
.permissions-container {
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
}

.permissions-header {
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

.btn-create-permission {
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

.btn-create-permission:hover:not(:disabled) {
  background: rgba(255,255,255,0.3);
  border-color: rgba(255,255,255,0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.btn-create-permission:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.role-selector-section {
  margin-bottom: 30px;
}

.selector-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  border-left: 4px solid #ff6633;
}

.selector-header {
  margin-bottom: 20px;
}

.selector-header h3 {
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.selector-header h3 i {
  color: #ff6633;
}

.selector-header p {
  color: #666;
  margin: 0;
  font-size: 1rem;
}

.selector-content {
  display: flex;
  justify-content: center;
}

.role-select-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.selector-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
  z-index: 1;
}

.role-select {
  width: 100%;
  padding: 15px 45px 15px 15px;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  font-size: 1.1rem;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.role-select:focus {
  outline: none;
  border-color: #ff6633;
  background: white;
  box-shadow: 0 0 0 3px rgba(255,102,51,0.1);
}

.permissions-stats {
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

.permissions-content {
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

.no-role-selected {
  margin-bottom: 30px;
}

.no-role-card {
  background: white;
  border-radius: 15px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  border: 2px dashed #e9ecef;
}

.no-role-icon {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 20px;
}

.no-role-card h3 {
  font-size: 1.8rem;
  color: #333;
  margin: 0 0 15px 0;
}

.no-role-card p {
  font-size: 1.1rem;
  color: #666;
  margin: 0 0 20px 0;
}

.role-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #ff6633;
  font-size: 1rem;
  font-weight: 500;
}

.permissions-list {
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

.permissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.permission-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.permission-card:hover {
  border-color: #ff6633;
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(255,102,51,0.15);
}

.permission-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #ff6633 0%, #F77300 100%);
}

.permission-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.permission-icon {
  font-size: 2rem;
  color: #ff6633;
  opacity: 0.8;
}

.permission-info {
  flex: 1;
}

.permission-name {
  font-size: 1.3rem;
  color: #333;
  margin: 0 0 5px 0;
  font-weight: 600;
}

.permission-id {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.permission-actions {
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
  .permissions-container {
    padding: 15px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .title-text h1 {
    font-size: 2rem;
  }
  
  .permissions-stats {
    grid-template-columns: 1fr;
  }
  
  .permissions-grid {
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
  
  .role-select-wrapper {
    max-width: 100%;
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

.delete-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  color: white;
}

.delete-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.delete-close:hover {
  opacity: 1;
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
  margin: 0 0 15px 0;
}

.delete-warning {
  font-size: 1rem;
  color: #666;
  margin: 0;
  font-style: italic;
}

.delete-info {
  background: white;
  border-radius: 10px;
  padding: 20px;
  border-left: 4px solid #dc3545;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #666;
  font-size: 0.95rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item i {
  color: #dc3545;
  font-size: 1.1rem;
}

.delete-modal-footer {
  background: white;
  border: none;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.btn-cancel-delete {
  background: #6c757d;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-cancel-delete:hover {
  background: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(108,117,125,0.3);
}

.btn-confirm-delete {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-confirm-delete:hover:not(:disabled) {
  background: linear-gradient(135deg, #c82333 0%, #dc3545 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(220,53,69,0.4);
}

.btn-confirm-delete:active {
  animation: shake 0.5s ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Responsive para el modal */
@media (max-width: 768px) {
  .delete-modal-footer {
    flex-direction: column;
  }
  
  .btn-cancel-delete,
  .btn-confirm-delete {
    width: 100%;
    justify-content: center;
  }
}
</style>
