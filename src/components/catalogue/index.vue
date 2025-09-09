<template>
  <div :class="sizeContainer">
    <!-- Header Principal -->
    <div class="catalogue-header">
      <div class="header-content">
        <div class="header-icon">
          <i class="fa fa-archive"></i>
        </div>
        <div class="header-text">
          <h2 class="page-title">Gestión de Catálogos</h2>
          <p class="page-subtitle">Administra las plantillas de catálogos del sistema</p>
        </div>
      </div>
      <div class="header-actions">
        <div v-if="!dataCatalogos" class="loading-indicator">
          <i class="fa fa-spinner fa-spin"></i>
          <span>Cargando...</span>
        </div>
        <v-btn v-else color="primary" class="btn-create" v-on:click="storeCatalogo">
          <i class="fa fa-plus"></i>
          Nueva Plantilla
        </v-btn>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="catalogue-content">
      <!-- Loading State - Solo mostrar si realmente está cargando -->
      <div v-if="!dataCatalogos && !ifCatalogos" class="loading-container">
        <loader></loader>
        <p class="loading-text">Cargando catálogos...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!ifCatalogos" class="empty-state">
        <div class="empty-icon">
          <i class="fa fa-archive"></i>
        </div>
        <h3 class="empty-title">No hay catálogos registrados</h3>
        <p class="empty-subtitle">Comienza creando tu primera plantilla de catálogo</p>
        <v-btn color="primary" v-on:click="storeCatalogo">
          <i class="fa fa-plus"></i>
          Crear Primera Plantilla
        </v-btn>
      </div>

      <!-- Catálogos Grid -->
      <div v-else class="catalogues-grid">
        <div v-for="catalogo in pagination.data" :key="catalogo.id_m_catalogos" class="catalogue-card">
          <div class="card-image">
            <img :src="getImageUrl(catalogo.v_imagen_portada)" 
                 @error="handleImageError"
                 :alt="catalogo.v_nombre"
                 class="catalogue-image">
            <div class="card-overlay">
              <div class="overlay-actions">
                <v-btn v-if="permisoShow" 
                       color="info" 
                       small 
                       :id="'buttonShow'+catalogo.id_m_catalogos" 
                       v-on:click="showCatalogo(catalogo)"
                       data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-search"></i>
                </v-btn>
                <v-btn v-if="permisoUpdate" 
                       color="primary" 
                       small 
                       :id="'buttonUpdate'+catalogo.id_m_catalogos" 
                       v-on:click="updateCatalogo(catalogo)"
                       data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-pencil"></i>
                </v-btn>
                <v-btn v-if="permisoDestroy" 
                       color="error" 
                       small 
                       :id="'buttonDestroy'+catalogo.id_m_catalogos"
                       v-on:click="confirmDestroyCatalogo(catalogo)"
                       data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-trash"></i>
                </v-btn>
              </div>
            </div>
          </div>
          <div class="card-content">
            <h3 class="catalogue-name">{{catalogo.v_nombre}}</h3>
            <div class="catalogue-meta">
              <span class="meta-item">
                <i class="fa fa-calendar"></i>
                {{formatDate(catalogo.created_at)}}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div v-if="ifCatalogos" class="pagination-container">
        <div class="pagination-info">
          <span>Mostrando {{pagination.from}} a {{pagination.to}} de {{pagination.total}} catálogos</span>
        </div>
        <ul class="pagination">
          <li v-if="pagination.current_page > 1" class="page-item">
            <a href="" aria-label="Primera" class="page-link"
               @click.prevent="cambiarPagina(1,shop.value)">
              <i class="fa fa-angle-double-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page > 1" class="page-item">
            <a href="" aria-label="Anterior" class="page-link"
               @click.prevent="cambiarPagina(pagination.current_page - 1,shop.value)">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-for="pagina in pagesNumber" 
              :key="pagina" 
              :class="['page-item', pagina === isActived ? 'active' : '']">
            <a href="#" class="page-link"
               @click.prevent="cambiarPagina(pagina,shop.value)">{{ pagina }}</a>
          </li>
          <li v-if="pagination.current_page < pagination.last_page" class="page-item">
            <a href="#" aria-label="Siguiente" class="page-link"
               @click.prevent="cambiarPagina(pagination.current_page + 1,shop.value)">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page !== pagination.last_page" class="page-item">
            <a href="#" aria-label="Ultima" class="page-link"
               @click.prevent="cambiarPagina(pagination.last_page ,shop.value)">
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
            <store ref="storeComponent" v-if="modalActive==='store'"  v-on:modal_close="cleanModal"
                   v-on:store="getData(1)"></store>
            <update v-if="modalActive==='update'"  :catalogo="catalogo" v-on:modal_close="cleanModal"
                    v-on:update="getData(1)"></update>
            <show v-if="modalActive==='show'" :catalogo="catalogo" v-on:modal_close="cleanModal"></show>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AppServices from '../AppServices';
  import Helpers from '../../helpers';
  import {mapGetters, mapMutations} from 'vuex';
  import {ModelSelect} from 'vue-search-select';
  import Loader from '../parts/loader.vue';
  import Show from './parts/show.vue';
  import Store from './parts/store.vue';
  import Update from './parts/update.vue';
  import ImageHandler from '../../mixin/ImageHandler';

  export default {
    data() {
      return {
        modalActive: '',
        ifCatalogos: false,
        dataCatalogos: false, // Iniciar como false para mostrar loader interno
        shopSelect: false,
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        sizeContainer: '',
        shops: [],
        shop: {
          value: '',
          text: ''
        },
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
      }
    },
    components: {ModelSelect, Loader, Store, Update, Show},
    mixins: [ImageHandler],
    created() {
      let yo = this;
      this.sizeContainer = this.$route.meta.sizeContainer;
      
      // No emitir load_data para evitar loader global
      // this.$emit("load_data", { show: false });
      
      // Cargar datos inmediatamente
      this.getData(1);
      
      let permiso = 'index.catalogos.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        this.setValorBusquedaStore('store.catalogos.' + this.getUsuario.rol);
        this.setValorBusquedaShow('show.catalogos.' + this.getUsuario.rol);
        this.setValorBusquedaUpdate('update.catalogos.' + this.getUsuario.rol);
        this.setValorBusquedaDestroy('destroy.catalogos.' + this.getUsuario.rol);
        this.permisoStore = !!(this.obtenerPermisoStore);
        this.permisoShow = !!(this.obtenerPermisoShow);
        this.permisoUpdate = !!(this.obtenerPermisoUpdate);
        this.permisoDestroy = !!(this.obtenerPermisoDestroy);
      } else {
        this.$router.push({name: 'dashboard'});
        this.$toastr('error', 'No posee permisos para acceder a esta acción', 'Acceso denegado');
      }
      let token = this.getUsuario.token;
      this.getAppServices().getMethodsWithBearer("api/ecommerce/tiendas", token, 'pluck')
        .then(response => {
          yo.shops = response.body;
        }, errors => yo.getAppServices().mapErrorsResponses(yo, errors));
    },
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
        if (from < 1)
          from = 1;
        let to = from + (this.offset * 2);
        if (to >= this.pagination.last_page)
          to = this.pagination.last_page;
        let pagesArray = [];
        while (from <= to) {
          pagesArray.push(from);
          from++;
        }
        return pagesArray;
      }
    }),
    methods: Object.assign({}, mapMutations([
      'setValorBusquedaIndex', 'setValorBusquedaShow', 'setValorBusquedaStore', 'setValorBusquedaUpdate',
      'setValorBusquedaDestroy'
    ]), {
      getAppServices() {
        return AppServices;
      },
      seleccionarTienda() {
        this.shopSelect = true;
        this.getData(1, this.shop.value);
      },
      getHelpers() {
        return Helpers;
      },
      formatDate(date) {
        if (!date) return 'N/A';
        const d = new Date(date);
        return d.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      },
      getData(page) {
        this.dataCatalogos = false;
        let yo = this;
        let token = this.getUsuario.token;
        
        this.getAppServices().getMethodsWithBearer("api/ecommerce/catalogos", token, 'paginate', page, "'categoria','categoriaPrincipal','caracteristicas','imagenes'")
          .then(response => {
            this.pagination = response.body;
            this.dataCatalogos = true;
            this.ifCatalogos = (this.pagination.data.length > 0);
          }, errors => {
            yo.getAppServices().mapErrorsResponses(yo, errors);
          });
      },
      cleanModal() {
        this.modalActive = 'none';
      },
      storeCatalogo() {
        this.modalActive = 'store';
        $('#modal').modal('show');
        $('#modalTitle').html("REGISTRAR PLANTILLA");
        
        // Resetear el editor cuando se abre el modal
        this.$nextTick(() => {
          if (this.$refs.storeComponent && this.$refs.storeComponent.resetEditor) {
            this.$refs.storeComponent.resetEditor();
          }
        });
      },
      updateCatalogo(catalogo) {
        this.catalogo = catalogo;
        this.modalActive = 'update';
        $('#modal').modal('show');
        $('#modalTitle').html("ACTUALIZAR LA PLANTILLA");
      },
      showCatalogo(catalogo) {
        this.catalogo = catalogo;
        this.modalActive = 'show';
        $('#modal').modal('show');
        $('#modalTitle').html(this.catalogo.v_nombre);
      },
      confirmDestroyCatalogo(catalogo) {
        let boton_loading = $('#buttonDestroy' + catalogo.id_m_catalogos);
        boton_loading.button('loading');
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().confirmDestroySweet(yo).then(() => {
          this.getAppServices().destroyMethodWithBearer('api/ecommerce/catalogos/' + catalogo.id_m_catalogos, token)
            .then(response => {
              yo.$swal(
                'Eliminado!',
                'Se ha eliminado el recurso con éxito!',
                'success'
              );
              boton_loading.button('reset');
              yo.getData(1, this.shop.value);
            }, errors => {
              yo.$swal(
                'Ups!',
                'Ocurrió un error eliminando el recurso',
                'error'
              );
              boton_loading.button('reset');
            });
        }, () => {
          yo.$swal(
            'Cancelado',
            'Se ha cancelado el proceso!',
            'error'
          );
          boton_loading.button('reset');
        });
      }
    })
  }
</script>

<style scoped>
/* Header Principal */
.catalogue-header {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
}

.header-icon {
  background: rgba(255, 255, 255, 0.2);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  backdrop-filter: blur(10px);
}

.header-icon i {
  font-size: 24px;
  color: white;
}

.header-text h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-text p {
  margin: 5px 0 0 0;
  font-size: 16px;
  opacity: 0.9;
}

.header-actions .btn-create {
  background: rgba(255, 255, 255, 0.2) !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  color: white !important;
  padding: 12px 24px !important;
  border-radius: 25px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  transition: all 0.3s ease !important;
  backdrop-filter: blur(10px);
}

.header-actions .btn-create:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
}

/* Indicador de carga en header */
.loading-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
}

.loading-indicator i {
  font-size: 16px;
}

/* Contenido Principal */
.catalogue-content {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

/* Loading State */
.loading-container {
  text-align: center;
  padding: 60px 20px;
}

.loading-text {
  margin-top: 20px;
  color: #666;
  font-size: 16px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 80px;
  color: #ddd;
  margin-bottom: 20px;
}

.empty-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.empty-subtitle {
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
}

/* Grid de Catálogos */
.catalogues-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.catalogue-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.catalogue-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.catalogue-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.catalogue-card:hover .catalogue-image {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.catalogue-card:hover .card-overlay {
  opacity: 1;
}

.overlay-actions {
  display: flex;
  gap: 10px;
}

.overlay-actions .v-btn {
  margin: 0 !important;
  min-width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
}

.card-content {
  padding: 20px;
}

.catalogue-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
  line-height: 1.4;
}

.catalogue-meta {
  display: flex;
  align-items: center;
  gap: 15px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 14px;
}

.meta-item i {
  color: #ff6633;
}

/* Paginación */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.pagination-info {
  color: #666;
  font-size: 14px;
}

.pagination {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 5px;
}

.page-item {
  border-radius: 8px;
  overflow: hidden;
}

.page-link {
  display: block;
  padding: 10px 15px;
  color: #666;
  text-decoration: none;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  min-width: 45px;
  text-align: center;
}

.page-link:hover {
  background: #ff6633;
  color: white;
  border-color: #ff6633;
  transform: translateY(-1px);
}

.page-item.active .page-link {
  background: #ff6633;
  color: white;
  border-color: #ff6633;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .catalogue-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .header-icon {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .catalogues-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .pagination-container {
    flex-direction: column;
    gap: 20px;
  }
  
  .pagination {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
