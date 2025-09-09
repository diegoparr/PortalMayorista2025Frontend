<template>
  <div>
    <div :class="sizeContainer" class="products-container">
      <!-- Header Principal -->
      <div class="products-header">
        <div class="header-content">
          <div class="header-title">
            <div class="title-icon">
              <i class="fa fa-box"></i>
            </div>
            <div class="title-text">
              <h1>Gestión de Productos</h1>
              <p>Administra los productos y catálogos del sistema</p>
            </div>
          </div>
          <div class="header-actions">
            <button class="btn-create-product" v-on:click="storeProduct" v-show="permisoStore" :disabled="!shopSelect">
              <i class="fa fa-plus"></i>
              <span>{{(shopSelect) ? 'Registrar Producto' : 'Selecciona una Tienda'}}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Selector de Tienda -->
      <div class="shop-selector-section">
        <div class="selector-card">
          <div class="selector-header">
            <h3>
              <i class="fa fa-store"></i>
              Seleccionar Tienda
            </h3>
            <p>Elige la tienda para gestionar sus productos</p>
          </div>
          <div class="selector-content">
            <div class="shop-select-wrapper">
              <i class="fa fa-chevron-down selector-icon"></i>
              <model-select :options="shops" id="v_ciudad" v-model="shop" class="shop-select"
                             v-on:input="seleccionarTienda"
                            data-placement="left" title="Selecciona la tienda"
                            required>
              </model-select>
            </div>
          </div>
        </div>
      </div>

      <!-- Estadísticas de la Tienda Seleccionada -->
      <div class="products-stats" v-if="shopSelect">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fa fa-box"></i>
          </div>
          <div class="stat-content">
            <h3>{{ pagination.total || 0 }}</h3>
            <p>Total de Productos</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fa fa-check-circle"></i>
          </div>
          <div class="stat-content">
            <h3>{{ pagination.data ? pagination.data.length : 0 }}</h3>
            <p>Productos Activos</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
          <i class="fa fa-store"></i>
          </div>
          <div class="stat-content">
            <h3>{{ shop.text || 'N/A' }}</h3>
            <p>Tienda Seleccionada</p>
          </div>
        </div>
      </div>

      <!-- Contenido Principal -->
      <div class="products-content" v-if="shopSelect">
        <div class="content-card">
          <!-- Loading State -->
          <div v-if="!dataProducts" class="loading-container">
            <div class="loading-spinner">
              <i class="fa fa-spinner fa-spin"></i>
            </div>
            <p>Cargando productos...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="!ifProducts" class="empty-state">
            <div class="empty-icon">
              <i class="fa fa-box"></i>
            </div>
            <h3>No hay productos registrados</h3>
            <p>Esta tienda no tiene productos. Comienza agregando el primer producto.</p>
            <button class="btn-create-first" v-on:click="storeProduct" v-show="permisoStore">
              <i class="fa fa-plus"></i>
              Agregar Primer Producto
            </button>
          </div>

          <!-- Productos List -->
          <div v-else class="products-list">
            <div class="list-header">
              <h3>Productos de {{ shop.text }}</h3>
            </div>
            <div class="products-grid">
              <div v-for="product in pagination.data" :key="product.id_m_productos" class="product-card">
                <div class="product-header">
                  <div class="product-image">
                    <img :src="getImageUrl(product.v_portada)" :alt="product.v_nombre" class="product-img">
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">{{ product.v_nombre }}</h4>
                    <p class="product-price">{{ getHelpers().formatInvoice(product.n_precio) }}</p>
                  </div>
                </div>
                
                <div class="product-actions">
                  <button class="action-btn view-btn" v-on:click="showProduct(product)"
                          :id="'buttonShow'+product.id_m_productos" v-show="permisoShow"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;" title="Ver detalles">
                    <i class="fa fa-search"></i>
                  </button>
                  <button class="action-btn edit-btn" v-on:click="updateProduct(product)"
                          :id="'buttonUpdate'+product.id_m_productos" v-show="permisoUpdate"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;" title="Editar producto">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button class="action-btn delete-btn" v-on:click="confirmDestroyProduct(product)"
                          :id="'buttonDestroy'+product.id_m_productos" v-show="permisoDestroy"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;" title="Eliminar producto">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado sin tienda seleccionada -->
      <div class="no-shop-selected" v-if="!shopSelect">
        <div class="no-shop-card">
          <div class="no-shop-icon">
            <i class="fa fa-store"></i>
          </div>
          <h3>Selecciona una Tienda</h3>
          <p>Para gestionar productos, primero debes seleccionar una tienda del sistema</p>
          <div class="shop-hint">
            <i class="fa fa-info-circle"></i>
            <span>Usa el selector de arriba para elegir la tienda que deseas administrar</span>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div class="pagination-container" v-if="ifProducts && shopSelect">
        <div class="pagination-info">
          <span>Mostrando {{ pagination.data.length }} de {{ pagination.total }} productos</span>
        </div>
        <div class="pagination-controls">
          <button class="pagination-btn" :disabled="pagination.current_page <= 1" @click="getData(1,shop.value)" title="Primera página">
            <i class="fa fa-angle-double-left"></i>
          </button>
          <button class="pagination-btn" :disabled="pagination.current_page <= 1" @click="getData(pagination.current_page - 1,shop.value)" title="Página anterior">
            <i class="fa fa-angle-left"></i>
          </button>
          <div class="pagination-numbers">
            <button v-for="pagina in pagesNumber" :key="pagina" :class="['pagination-number', { 'active': pagina == isActived }]" @click="getData(pagina,shop.value)">
              {{ pagina }}
            </button>
          </div>
          <button class="pagination-btn" :disabled="pagination.current_page >= pagination.last_page" @click="getData(pagination.current_page + 1,shop.value)" title="Página siguiente">
            <i class="fa fa-angle-right"></i>
          </button>
          <button class="pagination-btn" :disabled="pagination.current_page >= pagination.last_page" @click="getData(pagination.last_page,shop.value)" title="Última página">
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
            <store v-if="modalActive=='store'" :tienda="shop" v-on:modal_close="cleanModal"
                   v-on:store="getData(1,shop.value)"></store>
            <update v-if="modalActive=='update'" :tienda="shop" :producto="product" v-on:modal_close="cleanModal"
                    v-on:update="getData(1,shop.value)"></update>
            <show v-if="modalActive=='show'" :product="product" v-on:modal_close="cleanModal"></show>
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
  import Store from './parts/store.vue';
  import Update from './parts/update.vue';
  import Show from './parts/show.vue';
  import ImageHandler from '../../mixin/ImageHandler';

  export default {
    mixins: [ImageHandler],
    data() {
      return {
        modalActive: '',
        ifProducts: false,
        dataProducts: false,
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
        offset: 4,
        product: null
      }
    },
    components: {ModelSelect, Loader, Store, Update, Show},
    created() {
      let yo = this;
      this.sizeContainer = this.$route.meta.sizeContainer;
      this.$emit("load_data", {
        show: false
      });
      let permiso = 'index.productos.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        this.setValorBusquedaStore('store.productos.' + this.getUsuario.rol);
        this.setValorBusquedaShow('show.productos.' + this.getUsuario.rol);
        this.setValorBusquedaUpdate('update.productos.' + this.getUsuario.rol);
        this.setValorBusquedaDestroy('destroy.productos.' + this.getUsuario.rol);
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
      getData(page, shop) {
        this.dataProducts = false;
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().getMethodsWithBearer("api/ecommerce/productos", token, 'paginate', page, "'categoria','categoriaPrincipal','caracteristicas','imagenes'", "['id_m_tiendas_fk','=','" + shop + "']")
          .then(response => {
            this.pagination = response.body;
            this.dataProducts = true;
            this.ifProducts = (this.pagination.data.length > 0)
          }, errors => {
            console.log(errors);
          });
      },
      cleanModal() {
        this.modalActive = 'none';
      },
      storeProduct() {
        this.modalActive = 'store';
        $('#modal').modal('show');
        $('#modalTitle').html("REGISTRAR PRODUCTO EN LA TIENDA " + this.shop.text);
      },
      updateProduct(product) {
        console.log("producto enviado", product);
        this.product = product;
        this.modalActive = 'update';
        $('#modal').modal('show');
        $('#modalTitle').html("ACTUALIZAR PRODUCTO EN LA TIENDA " + this.shop.text);
      },
      showProduct(product) {
        this.product = product;
        this.modalActive = 'show';
        $('#modal').modal('show');
        $('#modalTitle').html(this.product.v_nombre);
      },
      confirmDestroyProduct(product) {
        let boton_loading = $('#buttonDestroy' + product.id_m_productos);
        boton_loading.button('loading');
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().confirmDestroySweet(yo).then(() => {
          this.getAppServices().destroyMethodWithBearer('api/ecommerce/productos/' + product.id_m_productos, token)
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
/* Contenedor Principal */
.products-container {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

/* Header Principal */
.products-header {
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

.btn-create-product {
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

.btn-create-product:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-create-product:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Selector de Tienda */
.shop-selector-section {
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

.shop-select-wrapper {
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

.shop-select {
  width: 100%;
  padding: 15px 45px 15px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 50px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
}

.shop-select:focus {
  border-color: #ff6633;
  box-shadow: 0 0 0 3px rgba(255, 102, 51, 0.1);
  outline: none;
}

/* Estadísticas */
.products-stats {
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
.products-content {
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

/* Lista de Productos */
.products-list {
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.product-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #ff6633;
}

.product-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  flex: 1;
}

.product-name {
  color: #333;
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
}

.product-price {
  color: #ff6633;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.product-actions {
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

/* Estado sin tienda seleccionada */
.no-shop-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.no-shop-card {
  text-align: center;
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.no-shop-icon {
  font-size: 4rem;
  color: #ccc;
  margin-bottom: 20px;
}

.no-shop-card h3 {
  color: #333;
  margin: 0 0 15px 0;
  font-size: 1.5rem;
}

.no-shop-card p {
  color: #666;
  margin: 0 0 20px 0;
  font-size: 1rem;
}

.shop-hint {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
  font-size: 0.9rem;
}

.shop-hint i {
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
  
  .products-grid {
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
  .products-container {
    padding: 10px;
  }
  
  .products-header {
    padding: 20px;
  }
  
  .title-text h1 {
    font-size: 2rem;
  }
  
  .products-stats {
    grid-template-columns: 1fr;
  }
}
</style>
