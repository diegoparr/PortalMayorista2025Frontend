<template>
  <div class="catalogue-show-modal">
    <!-- Header del Modal -->
    <div class="modal-header-custom">
      <div class="header-content">
        <div class="header-icon">
          <i class="fa fa-archive"></i>
        </div>
        <div class="header-text">
          <h2 class="catalogue-title">{{catalogo.v_nombre || 'Catálogo'}}</h2>
          <p class="catalogue-subtitle">Detalles completos del catálogo</p>
        </div>
      </div>
      <div class="header-status">
        <span class="status-badge active">
          <i class="fa fa-check-circle"></i>
          Activo
        </span>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="catalogue-content">
      <!-- Galería de Imágenes -->
      <div class="images-section">
        <h3 class="section-title">
          <i class="fa fa-images"></i>
          Galería de Imágenes
        </h3>
        <div class="images-container">
          <v-carousel v-if="catalogo.imagenes && catalogo.imagenes.length > 0" 
                      hide-delimiters 
                      light 
                      class="catalogue-carousel">
        <v-carousel-item
              v-for="(imagen, i) in catalogo.imagenes"
          :key="i">
              <div class="carousel-image-container">
                <img :src="getImageUrl(imagen.v_url)" 
                     :alt="`Imagen ${i + 1}`"
                     class="carousel-image"
                     @error="handleImageError">
              </div>
        </v-carousel-item>
      </v-carousel>
          <div v-else class="single-image-container">
            <img :src="getImageUrl(catalogo.v_imagen_portada)" 
                 alt="Imagen del catálogo"
                 class="single-image"
                 @error="handleImageError">
          </div>
        </div>
      </div>

      <!-- Información del Catálogo -->
      <div class="info-section">
        <h3 class="section-title">
          <i class="fa fa-info-circle"></i>
          Información del Catálogo
        </h3>
        <div class="info-grid">
          <div class="info-card">
            <div class="info-icon">
              <i class="fa fa-tag"></i>
            </div>
            <div class="info-content">
              <label>Nombre</label>
              <p>{{catalogo.v_nombre || 'N/A'}}</p>
            </div>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <i class="fa fa-calendar"></i>
            </div>
            <div class="info-content">
              <label>Fecha de Creación</label>
              <p>{{formatDate(catalogo.created_at)}}</p>
            </div>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <i class="fa fa-images"></i>
            </div>
            <div class="info-content">
              <label>Total de Imágenes</label>
              <p>{{catalogo.imagenes ? catalogo.imagenes.length : 0}}</p>
            </div>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <i class="fa fa-list"></i>
            </div>
            <div class="info-content">
              <label>Características</label>
              <p>{{catalogo.caracteristicas ? catalogo.caracteristicas.length : 0}}</p>
            </div>
          </div>
        </div>
    </div>

      <!-- Tabs de Información -->
      <div class="tabs-section">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
            <li class="active">
              <a href="#tab_descripcion" data-toggle="tab">
                <i class="fa fa-file-text"></i>
                Descripción
              </a>
            </li>
            <li>
              <a href="#tab_caracteristicas" data-toggle="tab">
                <i class="fa fa-list"></i>
                Características
              </a>
            </li>
        </ul>
        <div class="tab-content">
            <!-- Tab Descripción -->
            <div class="tab-pane active" id="tab_descripcion">
              <div class="tab-content-wrapper">
                <div v-if="catalogo.v_descripcion" 
                     v-html="catalogo.v_descripcion" 
                     class="description-content">
                </div>
                <div v-else class="empty-content">
                  <i class="fa fa-file-text"></i>
                  <p>No hay descripción disponible</p>
                </div>
              </div>
            </div>
            
            <!-- Tab Características -->
            <div class="tab-pane" id="tab_caracteristicas">
              <div class="tab-content-wrapper">
                <div v-if="catalogo.caracteristicas && catalogo.caracteristicas.length > 0" 
                     class="characteristics-grid">
                  <div v-for="(carac, index) in catalogo.caracteristicas" 
                       :key="index" 
                       class="characteristic-item">
                    <div class="characteristic-icon">
                      <i class="fa fa-check"></i>
                    </div>
                    <div class="characteristic-content">
                      <span class="characteristic-name">{{carac.v_nombre}}</span>
                    </div>
                  </div>
                </div>
                <div v-else class="empty-content">
                  <i class="fa fa-list"></i>
                  <p>No hay características registradas</p>
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
    props: ['catalogo'],
    methods: {
      formatDate(date) {
        if (!date) return 'N/A';
        const d = new Date(date);
        return d.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('modal_close');
      });
    },
  }
</script>

<style scoped>
/* Modal Principal */
.catalogue-show-modal {
  background: white;
  border-radius: 15px;
  overflow: hidden;
}

/* Header del Modal */
.modal-header-custom {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.modal-header-custom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff6633, #ff8c42, #ff6633);
}

.header-content {
  display: flex;
  align-items: center;
}

.header-icon {
  background: rgba(255, 255, 255, 0.2);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  backdrop-filter: blur(10px);
}

.header-icon i {
  font-size: 20px;
  color: white;
}

.catalogue-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.catalogue-subtitle {
  margin: 5px 0 0 0;
  font-size: 14px;
  opacity: 0.9;
}

.header-status {
  display: flex;
  align-items: center;
}

.status-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.status-badge i {
  margin-right: 5px;
}

/* Contenido Principal */
.catalogue-content {
  padding: 30px;
}

/* Secciones */
.images-section,
.info-section,
.tabs-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title i {
  color: #ff6633;
  font-size: 16px;
}

/* Galería de Imágenes */
.images-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.catalogue-carousel {
  height: 400px;
}

.carousel-image-container {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

.carousel-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.single-image-container {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

.single-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

/* Grid de Información */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.info-card:hover {
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.info-icon {
  background: linear-gradient(135deg, #ff6633, #ff8c42);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon i {
  font-size: 16px;
}

.info-content label {
  display: block;
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 5px;
}

.info-content p {
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

/* Tabs */
.nav-tabs-custom {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.nav-tabs {
  background: #f8f9fa;
  margin: 0;
  border-bottom: 1px solid #e9ecef;
  display: flex;
}

.nav-tabs li {
  flex: 1;
}

.nav-tabs li a {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 20px;
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  border-radius: 0;
}

.nav-tabs li.active a,
.nav-tabs li a:hover {
  background: #ff6633;
  color: white;
}

.nav-tabs li a i {
  font-size: 14px;
}

.tab-content {
  padding: 0;
}

.tab-content-wrapper {
  padding: 25px;
  min-height: 200px;
}

/* Contenido de Tabs */
.description-content {
  line-height: 1.6;
  color: #333;
}

.characteristics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.characteristic-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.characteristic-item:hover {
  background: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.characteristic-icon {
  background: #28a745;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.characteristic-icon i {
  font-size: 12px;
}

.characteristic-name {
  font-weight: 500;
  color: #333;
}

/* Empty States */
.empty-content {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.empty-content i {
  font-size: 48px;
  color: #ddd;
  margin-bottom: 15px;
  display: block;
}

.empty-content p {
  margin: 0;
  font-size: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-header-custom {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .header-icon {
    margin-right: 0;
    margin-bottom: 10px;
  }
  
  .catalogue-content {
    padding: 20px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .characteristics-grid {
    grid-template-columns: 1fr;
  }
  
  .nav-tabs {
    flex-direction: column;
  }
  
  .catalogue-carousel,
  .carousel-image-container,
  .single-image-container {
    height: 250px;
  }
}
</style>
