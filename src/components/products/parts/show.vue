<template>
  <div class="product-show-container">
    <!-- Header del Producto -->
    <div class="product-show-header">
      <div class="header-content">
        <div class="product-icon">
          <i class="fa fa-box"></i>
        </div>
        <div class="product-info">
          <h1 class="product-title">{{ product.v_nombre }}</h1>
          <p class="product-subtitle">Detalles del producto</p>
        </div>
        <div class="header-actions">
          <button class="btn-close" @click="cerrarModal">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="product-show-content">
      <div class="product-main-info">
        <!-- Galería de Imágenes -->
        <div class="product-gallery">
          <div class="gallery-main">
            <div v-if="product.imagenes && product.imagenes.length > 0" class="main-image-container">
              <img :src="getImageUrl(currentImage)" :alt="product.v_nombre" class="main-image">
              <div class="image-overlay">
                <button class="gallery-btn prev-btn" @click="previousImage" :disabled="currentImageIndex === 0">
                  <i class="fa fa-chevron-left"></i>
                </button>
                <button class="gallery-btn next-btn" @click="nextImage" :disabled="currentImageIndex === product.imagenes.length - 1">
                  <i class="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <div v-else class="no-image-container">
              <img :src="getImageUrl(product.v_portada)" :alt="product.v_nombre" class="main-image">
            </div>
          </div>
          
          <!-- Thumbnails -->
          <div v-if="product.imagenes && product.imagenes.length > 1" class="gallery-thumbnails">
            <div v-for="(imagen, index) in product.imagenes" :key="index" 
                 :class="['thumbnail', { 'active': index === currentImageIndex }]"
                 @click="setCurrentImage(index)">
              <img :src="getImageUrl(imagen.v_url)" :alt="`Imagen ${index + 1}`">
            </div>
          </div>
        </div>

        <!-- Información del Producto -->
        <div class="product-details">
          <!-- Información Básica -->
          <div class="info-section">
            <div class="section-header">
              <h3><i class="fa fa-info-circle"></i> Información Básica</h3>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <label>Nombre del Producto</label>
                <div class="info-value">{{ product.v_nombre }}</div>
              </div>
              <div class="info-item">
                <label>Código del Producto</label>
                <div class="info-value">{{ product.v_codigo || 'No especificado' }}</div>
              </div>
              <div class="info-item">
                <label>Precio</label>
                <div class="info-value price-value">
                  <span class="currency">$</span>
                  <span class="amount">{{ formatearPrecio(product.n_precio) }}</span>
                </div>
              </div>
              <div class="info-item">
                <label>Stock Disponible</label>
                <div class="info-value stock-value">
                  <span class="stock-number">{{ product.n_existencia }}</span>
                  <span class="stock-label">unidades</span>
                </div>
              </div>
              <div class="info-item">
                <label>Tienda</label>
                <div class="info-value">
                  <span class="store-name">
                    <i class="fa fa-store"></i>
                    {{ product.tienda ? product.tienda.v_nombre : 'No especificada' }}
                  </span>
                </div>
              </div>
              <div class="info-item">
                <label>Categoría</label>
                <div class="info-value">
                  <span class="category-name">
                    <i class="fa fa-tag"></i>
                    {{ product.categoria_principal ? product.categoria_principal.v_nombre : 'No especificada' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Descripción -->
          <div class="description-section">
            <div class="section-header">
              <h3><i class="fa fa-file-text"></i> Descripción</h3>
            </div>
            <div class="description-content">
              <div v-if="product.v_descripcion" v-html="product.v_descripcion" class="description-text"></div>
              <div v-else class="no-description">
                <i class="fa fa-info-circle"></i>
                No hay descripción disponible para este producto
              </div>
            </div>
          </div>

          <!-- Características -->
          <div v-if="unicas.length > 0 || multiples.length > 0" class="characteristics-section">
            <div class="section-header">
              <h3><i class="fa fa-list"></i> Características</h3>
            </div>
            <div class="characteristics-content">
              <!-- Características Únicas -->
              <div v-if="unicas.length > 0" class="characteristics-group">
                <h4>Especificaciones</h4>
                <div class="characteristics-list">
                  <div v-for="carac in unicas" :key="carac.nombre" class="characteristic-item">
                    <span class="characteristic-name">{{ carac.nombre }}</span>
                    <span class="characteristic-value">{{ carac.valor }}</span>
                  </div>
                </div>
              </div>

              <!-- Características Múltiples -->
              <div v-if="multiples.length > 0" class="characteristics-group">
                <h4>Opciones Disponibles</h4>
                <div class="characteristics-list">
                  <div v-for="carac in multiples" :key="carac.nombre" class="characteristic-item multiple">
                    <span class="characteristic-name">{{ carac.nombre }}</span>
                    <div class="characteristic-values">
                      <span v-for="(item, index) in carac.valor" :key="index" class="value-tag">
                        {{ item }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Estadísticas -->
          <div class="stats-section">
            <div class="section-header">
              <h3><i class="fa fa-chart-bar"></i> Estadísticas</h3>
            </div>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fa fa-eye"></i>
                </div>
                <div class="stat-content">
                  <h4>Visitas</h4>
                  <p>{{ product.n_visitas || 0 }}</p>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fa fa-shopping-cart"></i>
                </div>
                <div class="stat-content">
                  <h4>Ventas</h4>
                  <p>{{ product.n_ventas_realizadas || 0 }}</p>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fa fa-heart"></i>
                </div>
                <div class="stat-content">
                  <h4>Seguidores</h4>
                  <p>{{ product.n_seguidores || 0 }}</p>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fa fa-calendar"></i>
                </div>
                <div class="stat-content">
                  <h4>Fecha de Creación</h4>
                  <p>{{ formatearFecha(product.created_at) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ImageHandler from '../../../mixin/ImageHandler';

  export default {
    mixins: [ImageHandler],
    data(){
      return{
        unicas:[],
        multiples:[],
        currentImageIndex: 0,
      }
    },
    props: ['product'],
    computed: {
      currentImage() {
        if (this.product.imagenes && this.product.imagenes.length > 0) {
          return this.product.imagenes[this.currentImageIndex].v_url;
        }
        return this.product.v_portada;
      }
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('modal_close');
      });
      
      this.procesarCaracteristicas();
    },
    methods: {
      cerrarModal() {
        this.$emit('modal_close');
      },
      setCurrentImage(index) {
        this.currentImageIndex = index;
      },
      nextImage() {
        if (this.currentImageIndex < this.product.imagenes.length - 1) {
          this.currentImageIndex++;
        }
      },
      previousImage() {
        if (this.currentImageIndex > 0) {
          this.currentImageIndex--;
        }
      },
      formatearPrecio(precio) {
        if (!precio) return '0';
        return new Intl.NumberFormat('es-CO').format(precio);
      },
      formatearFecha(fecha) {
        if (!fecha) return 'No disponible';
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      },
      procesarCaracteristicas() {
        this.unicas = [];
        this.multiples = [];
        
        if (!this.product.caracteristicas) return;
        
        let nombAnte = '';
        let flag = false;
        let valMult = [];
        
        this.product.caracteristicas.forEach(item => {
          if (item.v_tipo === 'unica') {
            this.unicas.push({nombre: item.v_nombre, valor: item.pivot.v_valor});
          } else {
            if (item.v_nombre !== nombAnte && !flag) {
              nombAnte = item.v_nombre;
              flag = true;
            }

            if (item.v_nombre !== nombAnte) {
              this.multiples.push({nombre: nombAnte, valor: valMult});
              nombAnte = item.v_nombre;
              valMult = [];
            }
            valMult.push(item.pivot.v_valor);
          }
        });
        
        if (nombAnte && valMult.length > 0) {
          this.multiples.push({nombre: nombAnte, valor: valMult});
        }
      }
    },
  }
</script>

<style scoped>
/* Contenedor Principal */
.product-show-container {
  background: #f8f9fa;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

/* Header del Producto */
.product-show-header {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
  padding: 30px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.product-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  backdrop-filter: blur(10px);
}

.product-info {
  flex: 1;
}

.product-title {
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0 0 10px 0;
}

.product-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.btn-close {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Contenido Principal */
.product-show-content {
  padding: 30px;
}

.product-main-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

/* Galería de Imágenes */
.product-gallery {
  position: sticky;
  top: 20px;
}

.gallery-main {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.main-image-container, .no-image-container {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.main-image-container:hover .image-overlay {
  opacity: 1;
}

.gallery-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.gallery-btn:hover:not(:disabled) {
  background: white;
  transform: scale(1.1);
}

.gallery-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Thumbnails */
.gallery-thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid transparent;
  flex-shrink: 0;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail.active {
  border-color: #ff6633;
  transform: scale(1.05);
}

.thumbnail:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Detalles del Producto */
.product-details {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Secciones */
.info-section, .description-section, .characteristics-section, .stats-section {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.info-section:hover, .description-section:hover, .characteristics-section:hover, .stats-section:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.section-header {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f1f3f4;
}

.section-header h3 {
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-header i {
  color: #ff6633;
}

/* Grid de Información */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item label {
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 1.1rem;
  color: #333;
  padding: 12px 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ff6633;
}

.price-value {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.currency {
  font-size: 1.2rem;
  color: #28a745;
  font-weight: 600;
}

.amount {
  font-size: 1.5rem;
  color: #28a745;
  font-weight: 700;
}

.stock-value {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stock-number {
  font-size: 1.3rem;
  font-weight: 700;
  color: #007bff;
}

.stock-label {
  color: #666;
  font-size: 0.9rem;
}

.store-name, .category-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.store-name {
  color: #007bff;
}

.category-name {
  color: #28a745;
}

/* Descripción */
.description-content {
  line-height: 1.6;
}

.description-text {
  color: #333;
  font-size: 1rem;
}

.no-description {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 40px 20px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

/* Características */
.characteristics-group {
  margin-bottom: 25px;
}

.characteristics-group h4 {
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 15px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e9ecef;
}

.characteristics-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.characteristic-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.characteristic-item:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.characteristic-item.multiple {
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.characteristic-name {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.characteristic-value {
  color: #666;
  font-weight: 500;
}

.characteristic-values {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.value-tag {
  background: #ff6633;
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Estadísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.stat-icon {
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

.stat-content h4 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 1rem;
}

.stat-content p {
  margin: 0;
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .product-main-info {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .product-gallery {
    position: static;
  }
}

@media (max-width: 768px) {
  .product-show-header {
    padding: 20px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .product-title {
    font-size: 2rem;
  }
  
  .product-show-content {
    padding: 20px;
  }
  
  .info-grid, .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .main-image-container, .no-image-container {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .product-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .product-title {
    font-size: 1.5rem;
  }
  
  .info-section, .description-section, .characteristics-section, .stats-section {
    padding: 20px;
  }
  
  .thumbnail {
    width: 60px;
    height: 60px;
  }
}
</style>
