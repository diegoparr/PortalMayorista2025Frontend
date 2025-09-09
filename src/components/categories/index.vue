<template>
  <div>
    <div :class="sizeContainer" class="categories-container">
      <!-- Header Principal -->
      <div class="categories-header">
        <div class="header-content">
          <div class="header-title">
            <div class="title-icon">
              <i class="fa fa-tags"></i>
            </div>
            <div class="title-text">
              <h1>Gestión de Categorías</h1>
              <p>Administra las categorías y subcategorías del sistema</p>
            </div>
          </div>
          <div class="header-actions">
            <button class="btn-create-category" v-on:click="crearCategoriaModal" v-show="permisoStore">
              <i class="fa fa-plus"></i>
              <span>Registrar Categoría</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Barra de Búsqueda -->
      <div class="search-section">
        <div class="search-card">
          <div class="search-content">
            <div class="search-icon">
              <i class="fa fa-search"></i>
            </div>
            <input type="text" 
                   placeholder="Buscar categorías..." 
                   class="search-input" 
                   v-model="busqueda" 
                   @keyup="obtenerData(1)">
          </div>
        </div>
      </div>

      <!-- Estadísticas -->
      <div class="categories-stats">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fa fa-tags"></i>
          </div>
          <div class="stat-content">
            <h3>{{ pagination.total || 0 }}</h3>
            <p>Total de Categorías</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fa fa-folder"></i>
          </div>
          <div class="stat-content">
            <h3>{{ categoriasPrincipales || 0 }}</h3>
            <p>Categorías Principales</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fa fa-folder-open"></i>
          </div>
          <div class="stat-content">
            <h3>{{ subcategorias || 0 }}</h3>
            <p>Subcategorías</p>
          </div>
        </div>
      </div>

      <!-- Contenido Principal -->
      <div class="categories-content">
        <div class="content-card">
          <!-- Loading State -->
          <div v-if="!dataCategorias" class="loading-container">
            <div class="loading-spinner">
              <i class="fa fa-spinner fa-spin"></i>
            </div>
            <p>Cargando categorías...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="!hayCategorias" class="empty-state">
            <div class="empty-icon">
              <i class="fa fa-tags"></i>
            </div>
            <h3>No hay categorías registradas</h3>
            <p>Comienza creando la primera categoría del sistema.</p>
            <button class="btn-create-first" v-on:click="crearCategoriaModal" v-show="permisoStore">
              <i class="fa fa-plus"></i>
              Crear Primera Categoría
            </button>
          </div>

          <!-- Categorías List -->
          <div v-else class="categories-grid">
            <div v-for="categoria in pagination.data" :key="categoria.id_m_categorias" class="category-card">
              <div class="category-header">
                <div class="category-icon">
                  <i class="fa fa-tag"></i>
                </div>
                <div class="category-info">
                  <h3 class="category-name">{{ categoria.v_nombre }}</h3>
                  <p class="category-parent">
                    <i class="fa fa-folder"></i>
                    {{ categoria.padre ? categoria.padre.v_nombre : 'Categoría Principal' }}
                  </p>
                </div>
              </div>
              
              <div class="category-actions">
                <button class="action-btn view-btn" v-on:click="btnVerCategoria(categoria)"
                        :id="'buttonShow'+categoria.id_m_categorias" v-show="permisoShow"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;" title="Ver detalles">
                  <i class="fa fa-search"></i>
                </button>
                <button class="action-btn edit-btn" v-on:click="btnEditarCategoria(categoria)"
                        :id="'buttonUpdate'+categoria.id_m_categorias" v-show="permisoUpdate"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;" title="Editar categoría">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="action-btn delete-btn" v-on:click="btnBorrarCategoria(categoria)"
                        :id="'buttonDestroy'+categoria.id_m_categorias" v-show="permisoDestroy"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;" title="Eliminar categoría">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div class="pagination-container" v-if="hayCategorias">
        <div class="pagination-info">
          <span>Mostrando {{ pagination.data.length }} de {{ pagination.total }} categorías</span>
        </div>
        <div class="pagination-controls">
          <button class="pagination-btn" :disabled="pagination.current_page <= 1" @click="cambiarPagina(1)" title="Primera página">
            <i class="fa fa-angle-double-left"></i>
          </button>
          <button class="pagination-btn" :disabled="pagination.current_page <= 1" @click="cambiarPagina(pagination.current_page - 1)" title="Página anterior">
            <i class="fa fa-angle-left"></i>
          </button>
          <div class="pagination-numbers">
            <button v-for="pagina in pagesNumber" :key="pagina" :class="['pagination-number', { 'active': pagina == isActived }]" @click="cambiarPagina(pagina)">
              {{ pagina }}
            </button>
          </div>
          <button class="pagination-btn" :disabled="pagination.current_page >= pagination.last_page" @click="cambiarPagina(pagination.current_page + 1)" title="Página siguiente">
            <i class="fa fa-angle-right"></i>
          </button>
          <button class="pagination-btn" :disabled="pagination.current_page >= pagination.last_page" @click="cambiarPagina(pagination.last_page)" title="Última página">
            <i class="fa fa-angle-double-right"></i>
          </button>
        </div>
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
          $('#modalTitle').html("REGISTRAR CATEGORIA");
        },
        obtenerData(pagina) {
          this.dataCategorias = false;
          let yo = this;
          let token = this.getUsuario.token;
          let busqueda = '';

            busqueda = this.busqueda;
            console.log('busqueda ', busqueda);
          if(busqueda === '') {
            this.getAppServices().getMethodsWithBearer("api/ecommerce/categorias", token, 'paginate', pagina, "'padre'", null, "'id_m_categorias_fk','asc'")
              .then(response => {
                this.pagination = response.body;
                this.data = response.body.orderBy;
                this.dataCategorias = true;
                if (this.pagination.data.length > 0)
                  this.hayCategorias = true
              }, errors => {
                yo.$router.push({name: 'panel'});
                yo.$toastr('error', 'Ocurrió un error cargando los categorias', 'Cargando Categorias');
              });
          }
          else {
            this.buscadorConToken("api/busqueda/categoria",token, busqueda, 'paginate', pagina, "'padre'", null,  "'v_nombre','asc'")
              .then(response => {
                this.pagination = response.body.pagination;
                this.data = response.body.orderBy;
                this.dataCategorias = true;
                if (response.body.pagination.data.length > 0)
                  this.hayCategorias = true
              }, errors => this.mapErrorsResponses(this, errors));
          }
        },
        btnVerCategoria(categoria) {
          let boton_loading = $('#buttonShow' + categoria.id_m_categorias);
          boton_loading.button('loading');
          let token = this.getUsuario.token;
          let yo = this;
          console.log('🔍 Abriendo categoría:', categoria);
          this.getAppServices().getMethodsWithBearer("api/ecommerce/categorias/" + categoria.id_m_categorias, token, 'paginate', 1)
            .then(response => {
              console.log('📊 Respuesta del servidor:', response.body);
              yo.categoriaShow = response.body;
              this.mostrarModal = 'ver';
              console.log('🎯 Mostrar modal:', this.mostrarModal);
              console.log('📋 Categoría show:', this.categoriaShow);
              $('#modal').modal('show');
              $('#modalTitle').html(response.body.v_nombre);
              boton_loading.button('reset');
            }, errors => {
              console.error('❌ Error cargando categoría:', errors);
              $('#modal').modal('hide');
              this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
            });
        },
        btnEditarCategoria(categoria) {
          let boton_loading = $('#buttonUpdate' + categoria.id_m_categorias);
          boton_loading.button('loading');
          let token = this.getUsuario.token;
          let yo = this;
          this.getAppServices().getMethodsWithBearer("api/ecommerce/categorias/" + categoria.id_m_categorias, token, 'paginate', 1)
            .then(response => {
              yo.categoriaUpdate = response.body;
              this.mostrarModal = 'editar';
              $('#modal').modal('show');
              $('#modalTitle').html(response.body.v_nombre);
              boton_loading.button('reset');
            }, errors => {
              $('#modal').modal('hide');
              this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
            });
        },
        btnBorrarCategoria(categoria) {
          $('#modalDestroy').modal('show');
          this.idCategoriaEliminar = categoria.id_m_categorias;
        },
        eliminarCategoria() {
          let yo = this;
          let token = this.getUsuario.token;
          let boton_eliminar = $('#btnEliminar');
          boton_eliminar.button('loading');
          this.getAppServices().destroyMethodWithBearer('api/ecommerce/categorias/' + this.idCategoriaEliminar, token)
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
      },
      categoriasPrincipales() {
        if (!this.pagination.data) return 0;
        return this.pagination.data.filter(categoria => categoria.padre === null).length;
      },
      subcategorias() {
        if (!this.pagination.data) return 0;
        return this.pagination.data.filter(categoria => categoria.padre !== null).length;
      }
    }),
  }
</script>

<style scoped>
/* Contenedor Principal */
.categories-container {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

/* Header Principal */
.categories-header {
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

.btn-create-category {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  backdrop-filter: blur(10px);
}

.btn-create-category:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Barra de Búsqueda */
.search-section {
  margin-bottom: 30px;
}

.search-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.search-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-icon {
  color: #ff6633;
  font-size: 1.2rem;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.1rem;
  color: #333;
  background: transparent;
}

.search-input::placeholder {
  color: #999;
}

/* Estadísticas */
.categories-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-content h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.stat-content p {
  color: #666;
  margin: 5px 0 0 0;
  font-weight: 500;
}

/* Contenido Principal */
.categories-content {
  margin-bottom: 30px;
}

.content-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Estados de Carga y Vacío */
.loading-container, .empty-state {
  text-align: center;
  padding: 60px 20px;
}

.loading-spinner {
  font-size: 3rem;
  color: #ff6633;
  margin-bottom: 20px;
}

.empty-icon {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #666;
  margin-bottom: 10px;
}

.empty-state p {
  color: #999;
  margin-bottom: 30px;
}

.btn-create-first {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
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
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 102, 51, 0.3);
}

/* Grid de Categorías */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  padding: 30px;
}

.category-card {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: #ff6633;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.category-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.category-info {
  flex: 1;
}

.category-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 5px 0;
}

.category-parent {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.category-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
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
  background: #007bff;
  color: white;
}

.edit-btn:hover {
  background: #0056b3;
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

/* Paginación */
.pagination-container {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.pagination-info {
  color: #666;
  font-weight: 500;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #e1e8ed;
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
  border-color: #ff6633;
  color: white;
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
  border: 2px solid #e1e8ed;
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
  background: #ff6633;
  border-color: #ff6633;
  color: white;
  transform: translateY(-2px);
}

.pagination-number.active {
  background: #ff6633;
  border-color: #ff6633;
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .categories-container {
    padding: 15px;
  }
  
  .categories-header {
    padding: 20px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .title-text h1 {
    font-size: 2rem;
  }
  
  .categories-stats {
    grid-template-columns: 1fr;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  
  .pagination-container {
    flex-direction: column;
    text-align: center;
  }
  
  .pagination-controls {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .category-card {
    padding: 20px;
  }
  
  .category-header {
    flex-direction: column;
    text-align: center;
  }
  
  .category-actions {
    justify-content: center;
  }
}
</style>
