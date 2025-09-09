<template>
  <div class="col-xs-12 shops-container">
    <!-- Header Principal -->
    <div class="shops-header">
      <div class="header-content">
        <div class="header-title">
          <div class="title-icon">
            <i class="fa fa-store"></i>
          </div>
          <div class="title-text">
            <h1>Gestión de Tiendas</h1>
            <p>Administra las tiendas y comercios del sistema</p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-create-shop" v-on:click="storeShop" v-if="permisoStore">
            <i class="fa fa-plus"></i>
            <span>Registrar Tienda</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Estadísticas Rápidas -->
    <div class="shops-stats">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fa fa-store"></i>
        </div>
        <div class="stat-content">
          <h3>{{ pagination.total || 0 }}</h3>
          <p>Total de Tiendas</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fa fa-check-circle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ pagination.data ? pagination.data.length : 0 }}</h3>
          <p>Tiendas Activas</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fa fa-globe"></i>
        </div>
        <div class="stat-content">
          <h3>{{ uniqueCountries || 0 }}</h3>
          <p>Países</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fa fa-map-marker-alt"></i>
        </div>
        <div class="stat-content">
          <h3>{{ uniqueCities || 0 }}</h3>
          <p>Ciudades</p>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="shops-content">
      <div class="content-card">
        <!-- Loading State -->
        <div v-if="!dataShops" class="loading-container">
          <div class="loading-spinner">
            <i class="fa fa-spinner fa-spin"></i>
          </div>
          <p>Cargando tiendas...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="!ifShops" class="empty-state">
          <div class="empty-icon">
            <i class="fa fa-store"></i>
          </div>
          <h3>No hay tiendas registradas</h3>
          <p>Comienza creando la primera tienda del sistema</p>
          <button class="btn-create-first" v-on:click="storeShop" v-if="permisoStore">
            <i class="fa fa-plus"></i>
            Crear Primera Tienda
          </button>
        </div>

        <!-- Tiendas List -->
        <div v-else class="shops-list">
          <div class="list-header">
            <h3>Lista de Tiendas</h3>
            <div class="list-actions">
              <div class="search-box">
                <i class="fa fa-search"></i>
                <input type="text" placeholder="Buscar tiendas..." v-model="searchTerm">
              </div>
            </div>
          </div>

          <div class="shops-grid">
            <div v-for="shop in pagination.data" :key="shop.id_m_tiendas" class="shop-card">
              <div class="shop-header">
                <div class="shop-icon">
                  <i class="fa fa-store"></i>
                </div>
                <div class="shop-info">
                  <h4 class="shop-name">{{ shop.v_nombre }}</h4>
                  <p class="shop-location">
                    <i class="fa fa-map-marker-alt"></i>
                    {{ shop.v_nombre_ciudad }}, {{ shop.v_nombre_pais }}
                  </p>
                </div>
              </div>
              
              <div class="shop-details">
                <div class="detail-item">
                  <div class="detail-label">
                    <i class="fa fa-user-tie"></i>
                    Asesor
                  </div>
                  <div class="detail-value">
                    {{ shop.asesor.v_primer_nombre + ' ' + shop.asesor.v_primer_apellido }}
                  </div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">
                    <i class="fa fa-user"></i>
                    Cliente
                  </div>
                  <div class="detail-value">
                    {{ shop.cliente.v_primer_nombre + ' ' + shop.cliente.v_primer_apellido }}
                  </div>
                </div>
              </div>
              
              <div class="shop-actions">
                <button class="action-btn view-btn" v-on:click="showShop(shop)"
                        :id="'buttonShow'+shop.id_m_tiendas" v-show="permisoShow"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"
                        title="Ver detalles">
                  <i class="fa fa-search"></i>
                </button>
                <button class="action-btn edit-btn" v-on:click="updateShop(shop)"
                        :id="'buttonUpdate'+shop.id_m_tiendas" v-show="permisoUpdate"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"
                        title="Editar tienda">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="action-btn delete-btn" v-on:click="confirmDestroyShop(shop)"
                        :id="'buttonDestroy'+shop.id_m_tiendas" v-show="permisoDestroy"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"
                        title="Eliminar tienda">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div class="pagination-container" v-if="ifShops && pagination.last_page > 1">
      <div class="pagination-info">
        <span>Mostrando {{ pagination.data.length }} de {{ pagination.total }} tiendas</span>
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
            <show v-if="modalActive=='show'" :shop="shop" v-on:modal_close="cleanModal"></show>
            <store v-if="modalActive=='store'" v-on:modal_close="cleanModal" v-on:store="getData(1)"></store>
            <update v-if="modalActive=='update'" :shop="shop" v-on:actualizar="getData(1)"></update>
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
  import Loader from '../parts/loader.vue';
  import Show from './parts/show.vue';
  import Store from './parts/store.vue';
  import Update from './parts/update.vue';
  import RippleHandler from '../../mixin/RippleHandler';

  export default {
    mixins: [RippleHandler],
    data() {
      return {
        shop: null,
        modalActive: '',
        ifShops: false,
        dataShops: false,
        searchTerm: '',
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
        offset: 4,
        sizeContainer: '',
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        permisoIndexProductos: false,
      }
    },
    methods: Object.assign({}, mapMutations([
      'setValorBusquedaIndex', 'setValorBusquedaShow', 'setValorBusquedaStore', 'setValorBusquedaUpdate',
      'setValorBusquedaDestroy'
    ]), {
      getAppServices() {
        return AppServices;
      },
      getData(page) {
        this.dataShops = false;
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().getMethodsWithBearer("api/ecommerce/tiendas", token, 'paginate', page, "'asesor','cliente'")
          .then(response => {
            this.pagination = response.body;
            this.dataShops = true;
            if (this.pagination.data.length > 0)
              this.ifShops = true;
          }, errors => yo.getAppServices().mapErrorsResponses(yo, errors));
      },
      showShop(shop) {
        this.safeButtonClick(() => {
          let boton_loading = $('#buttonShow' + shop.id_m_tiendas);
          boton_loading.button('loading');
          let token = this.getUsuario.token;
          let yo = this;
          this.getAppServices().getMethodsWithBearer('api/ecommerce/tiendas/' + shop.id_m_tiendas, token, 'show', 1, 'asesor,cliente,telefonos,direcciones,tipoDocumentos').then(response => {
            yo.shop = response.body;
            this.modalActive = 'show';
            $('#modal').modal('show');
            $('#modalTitle').html(response.body.v_nombre);
            boton_loading.button('reset');
          }, errors => yo.getAppServices().mapErrorsResponses(yo, errors));
        });
      },
      storeShop() {
        this.modalActive = 'store';
        $('#modal').modal('show');
        $('#modalTitle').html("REGISTRAR TIENDA");
      },
      updateShop(shop) {
        // Usar el método seguro para manejar clics en botones
        this.safeButtonClick(() => {
          let boton_loading = $('#buttonUpdate' + shop.id_m_tiendas);
          boton_loading.button('loading');
          let token = this.getUsuario.token;
          let yo = this;
          this.getAppServices().getMethodsWithBearer('api/ecommerce/tiendas/' + shop.id_m_tiendas, token, 'paginate', 1, "'asesor','cliente','telefonos','direcciones','tipoDocumentos'").then(response => {
            yo.shop = response.body;
            this.modalActive = 'update';
            $('#modal').modal('show');
            $('#modalTitle').html(response.body.v_nombre);
            boton_loading.button('reset');
            
            // Limpiar efectos ripple usando el mixin
            this.clearRippleEffectsDelayed(100);
          }, errors => {
            yo.getAppServices().mapErrorsResponses(yo, errors);
            boton_loading.button('reset');
          });
        });
      },
      confirmDestroyShop(shop) {
        this.safeButtonClick(() => {
          let boton_loading = $('#buttonDestroy' + shop.id_m_tiendas);
          boton_loading.button('loading');
          let yo = this;
          let token = this.getUsuario.token;
          this.getAppServices().confirmDestroySweet(yo).then(() => {
            this.getAppServices().destroyMethodWithBearer('api/ecommerce/tiendas/' + shop.id_m_tiendas, token)
              .then(response => {
                yo.$swal(
                  'Eliminado!',
                  'Se ha eliminado el recurso con éxito!',
                  'success'
                );
                boton_loading.button('reset');
                yo.getData(1);
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
        });
      },
      cleanModal() {
        // Solo cerrar el modal si no hay errores de validación activos
        if (this.modalActive === 'store') {
          // Verificar si hay errores en el formulario antes de cerrar
          const modalElement = document.getElementById('modal');
          if (modalElement && modalElement.classList.contains('has-validation-errors')) {
            // No cerrar el modal si hay errores de validación
            return;
          }
        }
        
        // Usar el método seguro del mixin para cerrar el modal
        this.safeModalClose();
        
        // Limpiar el estado del modal
        this.modalActive = 'none';
        this.shop = null;
      },
      cambiarPagina(pagina) {
        this.pagination.current_page = pagina;
        this.getData(pagina);
      },
    }),
    components: {Loader, Show, Store, Update},
    mounted() {
      // Escuchar el evento de cierre del modal de Bootstrap
      $('#modal').on('hidden.bs.modal', () => {
        this.cleanModal();
      });
      
      // Aplicar estilos para deshabilitar ripple
      this.applyRippleDisableStyles();
      
      // Deshabilitar ripple en botones específicos después de un delay
      setTimeout(() => {
        this.disableRippleOnSpecificButtons();
      }, 500);
    },
    created() {
      this.sizeContainer = this.$route.meta.sizeContainer;
      this.$emit("load_data", {
        show: false
      });
      let permiso = 'index.tiendas.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        this.setValorBusquedaStore('store.tiendas.' + this.getUsuario.rol);
        this.setValorBusquedaShow('show.tiendas.' + this.getUsuario.rol);
        this.setValorBusquedaUpdate('update.tiendas.' + this.getUsuario.rol);
        this.setValorBusquedaDestroy('destroy.tiendas.' + this.getUsuario.rol);
        this.permisoStore = !!(this.obtenerPermisoStore);
        this.permisoShow = !!(this.obtenerPermisoShow);
        this.permisoUpdate = !!(this.obtenerPermisoUpdate);
        this.permisoDestroy = !!(this.obtenerPermisoDestroy);
        this.getData(this.pagination.current_page);
      } else {
        this.$router.push({name: 'dashboard'});
        this.$toastr('error', 'No posee permisos para acceder a esta acción', 'Acceso denegado');
      }
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
      },
      uniqueCountries: function () {
        if (!this.pagination.data || this.pagination.data.length === 0) {
          return 0;
        }
        const countries = this.pagination.data.map(shop => shop.v_nombre_pais);
        return [...new Set(countries)].length;
      },
      uniqueCities: function () {
        if (!this.pagination.data || this.pagination.data.length === 0) {
          return 0;
        }
        const cities = this.pagination.data.map(shop => shop.v_nombre_ciudad);
        return [...new Set(cities)].length;
      }
    })
  }
</script>

<style scoped>
/* Estilos para la página principal de tiendas */
.shops-container {
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
}

.shops-header {
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

.btn-create-shop {
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

.btn-create-shop:hover {
  background: rgba(255,255,255,0.3);
  border-color: rgba(255,255,255,0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.shops-stats {
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

.shops-content {
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

.shops-list {
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

.shops-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.shop-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.shop-card:hover {
  border-color: #ff6633;
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(255,102,51,0.15);
}

.shop-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #ff6633 0%, #F77300 100%);
}

.shop-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.shop-icon {
  font-size: 2rem;
  color: #ff6633;
  opacity: 0.8;
}

.shop-info {
  flex: 1;
}

.shop-name {
  font-size: 1.3rem;
  color: #333;
  margin: 0 0 5px 0;
  font-weight: 600;
}

.shop-location {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.shop-location i {
  color: #ff6633;
}

.shop-details {
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.detail-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.detail-label i {
  color: #ff6633;
  font-size: 0.8rem;
}

.detail-value {
  font-size: 0.9rem;
  color: #333;
  font-weight: 600;
}

.shop-actions {
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
  .shops-container {
    padding: 15px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .title-text h1 {
    font-size: 2rem;
  }
  
  .shops-stats {
    grid-template-columns: 1fr;
  }
  
  .shops-grid {
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
</style>
