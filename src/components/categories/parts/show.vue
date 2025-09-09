<template>
  <div class="category-show-container">
    <!-- Debug Info -->
    <div style="padding: 10px; background: #e3f2fd; color: #1976d2; border-radius: 8px; margin: 10px; font-size: 12px;">
    </div>
    
    <div v-if="!categoria" style="padding: 20px; background: #ffebee; color: #c62828; border-radius: 8px; margin: 20px;">
      <strong>⚠️ Error:</strong> No se recibió la categoría para mostrar
    </div>
    
    <!-- Header de la Categoría -->
    <div class="category-show-header" v-if="categoria">
      <div class="header-content">
        <div class="category-icon">
          <i class="fa fa-tag"></i>
        </div>
        <div class="category-info">
          <h1 class="category-title">{{ categoria.v_nombre }}</h1>
          <p class="category-subtitle">Detalles de la categoría</p>
        </div>
        <div class="header-actions">
          <button class="btn-close" @click="cerrarModal">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="category-show-content">
      <!-- Información Básica -->
      <div class="info-section">
        <div class="section-header">
          <h3><i class="fa fa-info-circle"></i> Información Básica</h3>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <label>Nombre de la Categoría</label>
            <div class="info-value">{{ categoria.v_nombre }}</div>
          </div>
          <div class="info-item">
            <label>Categoría Padre</label>
            <div class="info-value">
              <span v-if="categoria.padre" class="parent-category">
                <i class="fa fa-folder"></i>
                {{ categoria.padre.v_nombre }}
              </span>
              <span v-else class="main-category">
                <i class="fa fa-star"></i>
                Categoría Principal
              </span>
            </div>
          </div>
          <div class="info-item">
            <label>Fecha de Creación</label>
            <div class="info-value">{{ formatearFecha(categoria.created_at) }}</div>
          </div>
          <div class="info-item">
            <label>Última Actualización</label>
            <div class="info-value">{{ formatearFecha(categoria.updated_at) }}</div>
          </div>
        </div>
      </div>

      <!-- Jerarquía de Categorías -->
      <div class="hierarchy-section" v-if="categoria.padre">
        <div class="section-header">
          <h3><i class="fa fa-sitemap"></i> Jerarquía de Categorías</h3>
        </div>
        <div class="hierarchy-tree">
          <div class="hierarchy-item parent">
            <div class="hierarchy-icon">
              <i class="fa fa-folder"></i>
            </div>
            <div class="hierarchy-content">
              <span class="hierarchy-name">{{ categoria.padre.v_nombre }}</span>
              <span class="hierarchy-label">Categoría Padre</span>
            </div>
          </div>
          <div class="hierarchy-arrow">
            <i class="fa fa-arrow-down"></i>
          </div>
          <div class="hierarchy-item current">
            <div class="hierarchy-icon">
              <i class="fa fa-tag"></i>
            </div>
            <div class="hierarchy-content">
              <span class="hierarchy-name">{{ categoria.v_nombre }}</span>
              <span class="hierarchy-label">Categoría Actual</span>
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
              <i class="fa fa-calendar"></i>
            </div>
            <div class="stat-content">
              <h4>Antigüedad</h4>
              <p>{{ calcularAntiguedad(categoria.created_at) }}</p>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <i class="fa fa-clock"></i>
            </div>
            <div class="stat-content">
              <h4>Última Actividad</h4>
              <p>{{ calcularTiempoTranscurrido(categoria.updated_at) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryShow',
  props: {
    categoria: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log('🎯 Componente Show montado con categoría:', this.categoria);
  },
  methods: {
    cerrarModal() {
      this.$emit('cerrar_modal');
    },
    editarCategoria() {
      this.$emit('editar_categoria', this.categoria);
    },
    eliminarCategoria() {
      this.$emit('eliminar_categoria', this.categoria);
    },
    formatearFecha(fecha) {
      if (!fecha) return 'No disponible';
      const date = new Date(fecha);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    calcularAntiguedad(fechaCreacion) {
      if (!fechaCreacion) return 'No disponible';
      const ahora = new Date();
      const creacion = new Date(fechaCreacion);
      const diffTime = Math.abs(ahora - creacion);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) {
        return `${diffDays} días`;
      } else if (diffDays < 365) {
        const meses = Math.floor(diffDays / 30);
        return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
      } else {
        const años = Math.floor(diffDays / 365);
        return `${años} ${años === 1 ? 'año' : 'años'}`;
      }
    },
    calcularTiempoTranscurrido(fecha) {
      if (!fecha) return 'No disponible';
      const ahora = new Date();
      const actualizacion = new Date(fecha);
      const diffTime = Math.abs(ahora - actualizacion);
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      
      if (diffMinutes < 60) {
        return `Hace ${diffMinutes} minutos`;
      } else if (diffMinutes < 1440) {
        const horas = Math.floor(diffMinutes / 60);
        return `Hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
      } else {
        const dias = Math.floor(diffMinutes / 1440);
        return `Hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
      }
    }
  }
}
</script>

<style scoped>
/* Contenedor Principal */
.category-show-container {
  background: #f8f9fa;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

/* Header de la Categoría */
.category-show-header {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
  padding: 30px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.category-icon {
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

.category-info {
  flex: 1;
}

.category-title {
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0 0 10px 0;
}

.category-subtitle {
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
.category-show-content {
  padding: 30px;
}

/* Secciones */
.info-section, .hierarchy-section, .stats-section, .actions-section {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.info-section:hover, .hierarchy-section:hover, .stats-section:hover, .actions-section:hover {
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

.parent-category, .main-category {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.parent-category {
  color: #007bff;
}

.main-category {
  color: #28a745;
}

/* Jerarquía */
.hierarchy-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.hierarchy-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border-radius: 12px;
  min-width: 300px;
  transition: all 0.3s ease;
}

.hierarchy-item.parent {
  background: #e3f2fd;
  border: 2px solid #2196f3;
}

.hierarchy-item.current {
  background: #fff3e0;
  border: 2px solid #ff6633;
}

.hierarchy-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.hierarchy-item.parent .hierarchy-icon {
  background: #2196f3;
}

.hierarchy-item.current .hierarchy-icon {
  background: #ff6633;
}

.hierarchy-content {
  flex: 1;
}

.hierarchy-name {
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.hierarchy-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.hierarchy-arrow {
  color: #ff6633;
  font-size: 1.5rem;
}

/* Estadísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  font-size: 1.1rem;
}

.stat-content p {
  margin: 0;
  color: #666;
  font-weight: 500;
}

/* Acciones */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.edit-button {
  background: #007bff;
  color: white;
}

.edit-button:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.delete-button {
  background: #dc3545;
  color: white;
}

.delete-button:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
}

.close-button {
  background: #6c757d;
  color: white;
}

.close-button:hover {
  background: #545b62;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(108, 117, 125, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .category-show-header {
    padding: 20px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .category-title {
    font-size: 2rem;
  }
  
  .category-show-content {
    padding: 20px;
  }
  
  .info-grid, .stats-grid, .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .hierarchy-item {
    min-width: auto;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .category-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .category-title {
    font-size: 1.5rem;
  }
  
  .info-section, .hierarchy-section, .stats-section, .actions-section {
    padding: 20px;
  }
}
</style>
