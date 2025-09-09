<template>
  <div v-if="!shop" class="shop-details-modal">
    <div class="modal-header-custom">
      <div class="header-icon">
        <i class="fa fa-exclamation-triangle"></i>
      </div>
      <div class="header-content">
        <h2 class="shop-title">Error</h2>
        <p class="shop-subtitle">No se pudieron cargar los datos de la tienda</p>
        </div>
      </div>
    <div class="info-section">
      <div class="error-message">
        <i class="fa fa-info-circle"></i>
        <p>Los datos de la tienda no están disponibles en este momento.</p>
        </div>
      </div>
        </div>
  <div class="shop-details-modal" v-else>
    <!-- Header del Modal -->
    <div class="modal-header-custom">
      <div class="header-icon">
        <i class="fa fa-store"></i>
      </div>
      <div class="header-content">
        <h2 class="shop-title">{{ shop.v_nombre || 'Tienda' }}</h2>
        <p class="shop-subtitle">Detalles completos de la tienda</p>
        </div>
      </div>

    <!-- Información Principal -->
    <div class="info-section">
      <h3 class="section-title">
        <i class="fa fa-info-circle"></i>
        Información General
      </h3>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-globe"></i>
    </div>
          <div class="info-content">
            <label>País</label>
            <span>{{ shop.v_nombre_pais }}</span>
        </div>
      </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-map-marker-alt"></i>
          </div>
          <div class="info-content">
            <label>Provincia</label>
            <span>{{ shop.v_nombre_provincia }}</span>
        </div>
      </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-city"></i>
          </div>
          <div class="info-content">
            <label>Ciudad</label>
            <span>{{ shop.v_nombre_ciudad }}</span>
        </div>
      </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-id-card"></i>
          </div>
          <div class="info-content">
            <label>Tipo de Documento</label>
            <span>{{ shop.tipo_documentos ? shop.tipo_documentos.v_des_tipo_documento : (shop.id_m_tipos_documentos_fk ? 'ID: ' + shop.id_m_tipos_documentos_fk : 'No disponible') }}</span>
        </div>
      </div>
    </div>
    </div>

    <!-- Información de la Tienda -->
    <div class="info-section">
      <h3 class="section-title">
        <i class="fa fa-store"></i>
        Datos de la Tienda
      </h3>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-hashtag"></i>
          </div>
          <div class="info-content">
            <label>Documento</label>
            <span>{{ shop.v_documento }}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-phone"></i>
          </div>
          <div class="info-content">
            <label>Teléfono Principal</label>
            <span>{{ principalPhone || 'No disponible' }}</span>
        </div>
      </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-phone-alt"></i>
          </div>
          <div class="info-content">
            <label>Teléfono Secundario</label>
            <span>{{ secondaryPhone || 'No disponible' }}</span>
        </div>
      </div>
        <div class="info-card full-width">
          <div class="info-icon">
            <i class="fa fa-map"></i>
          </div>
          <div class="info-content">
            <label>Dirección</label>
            <span>{{ principalAddress || 'No disponible' }}</span>
    </div>
        </div>
      </div>
    </div>

    <!-- Personal Asignado -->
    <div class="info-section">
      <h3 class="section-title">
        <i class="fa fa-users"></i>
        Personal Asignado
      </h3>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-user-tie"></i>
          </div>
          <div class="info-content">
            <label>Asesor</label>
            <span>{{ shop.asesor ? (shop.asesor.v_primer_nombre + ' ' + shop.asesor.v_primer_apellido) : 'No asignado' }}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-user"></i>
          </div>
          <div class="info-content">
            <label>Cliente</label>
            <span>{{ shop.cliente ? (shop.cliente.v_primer_nombre + ' ' + shop.cliente.v_primer_apellido) : 'No asignado' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Horarios de Atención -->
    <div class="info-section">
      <h3 class="section-title">
        <i class="fa fa-clock"></i>
        Horarios de Atención
      </h3>
      <div class="schedule-container">
        <div class="schedule-grid">
          <div class="schedule-day">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <span>Lunes</span>
            </div>
            <div class="day-content" v-if="!shop.b_horario_lunes_tienda_no_laborable">
              <div class="time-range">
                <span class="time-label">Desde:</span>
                <span class="time-value">{{ shop.v_horario_lunes_tienda_desde || 'No definido' }}</span>
              </div>
              <div class="time-range">
                <span class="time-label">Hasta:</span>
                <span class="time-value">{{ shop.v_horario_lunes_tienda_hasta || 'No definido' }}</span>
              </div>
            </div>
            <div class="day-content closed" v-else>
              <i class="fa fa-times-circle"></i>
              <span>No laborable</span>
            </div>
          </div>
          <div class="schedule-day">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <span>Martes</span>
            </div>
            <div class="day-content" v-if="!shop.b_horario_martes_tienda_no_laborable">
              <div class="time-range">
                <span class="time-label">Desde:</span>
                <span class="time-value">{{ shop.v_horario_martes_tienda_desde || 'No definido' }}</span>
              </div>
              <div class="time-range">
                <span class="time-label">Hasta:</span>
                <span class="time-value">{{ shop.v_horario_martes_tienda_hasta || 'No definido' }}</span>
              </div>
            </div>
            <div class="day-content closed" v-else>
              <i class="fa fa-times-circle"></i>
              <span>No laborable</span>
            </div>
          </div>
          <div class="schedule-day">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <span>Miércoles</span>
            </div>
            <div class="day-content" v-if="!shop.b_horario_miercoles_tienda_no_laborable">
              <div class="time-range">
                <span class="time-label">Desde:</span>
                <span class="time-value">{{ shop.v_horario_miercoles_tienda_desde || 'No definido' }}</span>
              </div>
              <div class="time-range">
                <span class="time-label">Hasta:</span>
                <span class="time-value">{{ shop.v_horario_miercoles_tienda_hasta || 'No definido' }}</span>
              </div>
            </div>
            <div class="day-content closed" v-else>
              <i class="fa fa-times-circle"></i>
              <span>No laborable</span>
            </div>
          </div>
          <div class="schedule-day">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <span>Jueves</span>
            </div>
            <div class="day-content" v-if="!shop.b_horario_jueves_tienda_no_laborable">
              <div class="time-range">
                <span class="time-label">Desde:</span>
                <span class="time-value">{{ shop.v_horario_jueves_tienda_desde || 'No definido' }}</span>
              </div>
              <div class="time-range">
                <span class="time-label">Hasta:</span>
                <span class="time-value">{{ shop.v_horario_jueves_tienda_hasta || 'No definido' }}</span>
              </div>
            </div>
            <div class="day-content closed" v-else>
              <i class="fa fa-times-circle"></i>
              <span>No laborable</span>
            </div>
          </div>
          <div class="schedule-day">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <span>Viernes</span>
            </div>
            <div class="day-content" v-if="!shop.b_horario_viernes_tienda_no_laborable">
              <div class="time-range">
                <span class="time-label">Desde:</span>
                <span class="time-value">{{ shop.v_horario_viernes_tienda_desde || 'No definido' }}</span>
              </div>
              <div class="time-range">
                <span class="time-label">Hasta:</span>
                <span class="time-value">{{ shop.v_horario_viernes_tienda_hasta || 'No definido' }}</span>
              </div>
            </div>
            <div class="day-content closed" v-else>
              <i class="fa fa-times-circle"></i>
              <span>No laborable</span>
            </div>
          </div>
          <div class="schedule-day">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <span>Sábado</span>
            </div>
            <div class="day-content" v-if="!shop.b_horario_sabado_tienda_no_laborable">
              <div class="time-range">
                <span class="time-label">Desde:</span>
                <span class="time-value">{{ shop.v_horario_sabado_tienda_desde || 'No definido' }}</span>
              </div>
              <div class="time-range">
                <span class="time-label">Hasta:</span>
                <span class="time-value">{{ shop.v_horario_sabado_tienda_hasta || 'No definido' }}</span>
              </div>
      </div>
            <div class="day-content closed" v-else>
              <i class="fa fa-times-circle"></i>
              <span>No laborable</span>
        </div>
      </div>
          <div class="schedule-day">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <span>Domingo</span>
            </div>
            <div class="day-content" v-if="!shop.b_horario_domingo_tienda_no_laborable">
              <div class="time-range">
                <span class="time-label">Desde:</span>
                <span class="time-value">{{ shop.v_horario_domingo_tienda_desde || 'No definido' }}</span>
              </div>
              <div class="time-range">
                <span class="time-label">Hasta:</span>
                <span class="time-value">{{ shop.v_horario_domingo_tienda_hasta || 'No definido' }}</span>
        </div>
      </div>
            <div class="day-content closed" v-else>
              <i class="fa fa-times-circle"></i>
              <span>No laborable</span>
        </div>
      </div>
        </div>
      </div>
    </div>
    <!-- Descripción y Reseña -->
    <div class="info-section">
      <h3 class="section-title">
        <i class="fa fa-info-circle"></i>
        Información Adicional
      </h3>
      <div class="content-grid">
        <div class="content-card">
          <div class="content-header">
            <div class="content-icon">
              <i class="fa fa-align-left"></i>
            </div>
            <h4>Descripción</h4>
          </div>
          <div class="content-body">
            <p class="content-text">{{ shop.v_descripcion || 'No disponible' }}</p>
          </div>
        </div>
        <div class="content-card">
          <div class="content-header">
            <div class="content-icon">
              <i class="fa fa-star"></i>
            </div>
            <h4>Reseña</h4>
          </div>
          <div class="content-body">
            <p class="content-text">{{ shop.v_resena || 'No disponible' }}</p>
        </div>
      </div>
        </div>
      </div>

    <!-- Documentos e Imágenes -->
    <div class="info-section">
      <h3 class="section-title">
        <i class="fa fa-file-image"></i>
        Documentos e Imágenes
      </h3>
      <div class="documents-grid">
        <div class="document-card">
          <div class="document-header">
            <div class="document-icon">
              <i class="fa fa-id-card"></i>
            </div>
            <h4>RUT</h4>
          </div>
          <div class="document-body">
            <div class="image-container">
              <img :src="getImageUrl(shop.v_rut)" 
                   class="document-image" 
                   @error="handleImageError"
                   alt="RUT de la tienda">
            </div>
            <div class="document-status">
              <i class="fa fa-check-circle"></i>
              <span>Documento verificado</span>
        </div>
      </div>
    </div>
        
        <div class="document-card">
          <div class="document-header">
            <div class="document-icon">
              <i class="fa fa-building"></i>
            </div>
            <h4>Cámara de Comercio</h4>
          </div>
          <div class="document-body">
            <div class="image-container">
              <img :src="getImageUrl(shop.v_camara_comercio)" 
                   class="document-image" 
                   @error="handleImageError"
                   alt="Cámara de Comercio">
            </div>
            <div class="document-status">
              <i class="fa fa-check-circle"></i>
              <span>Documento verificado</span>
            </div>
        </div>
      </div>
        
        <div class="document-card">
          <div class="document-header">
            <div class="document-icon">
              <i class="fa fa-file-contract"></i>
            </div>
            <h4>Contrato</h4>
          </div>
          <div class="document-body">
            <div class="image-container">
              <img :src="getImageUrl(shop.v_contrato)" 
                   class="document-image" 
                   @error="handleImageError"
                   alt="Contrato de la tienda">
            </div>
            <div class="document-status">
              <i class="fa fa-check-circle"></i>
              <span>Documento verificado</span>
        </div>
      </div>
    </div>

        <div class="document-card">
          <div class="document-header">
            <div class="document-icon">
              <i class="fa fa-image"></i>
            </div>
            <h4>Imagen de Portada</h4>
          </div>
          <div class="document-body">
            <div class="image-container">
              <img :src="getImageUrl(shop.v_portada)" 
                   class="document-image" 
                   @error="handleImageError"
                   alt="Portada de la tienda">
            </div>
            <div class="document-status">
              <i class="fa fa-check-circle"></i>
              <span>Imagen principal</span>
      </div>
      </div>
    </div>
        
        <div class="document-card">
          <div class="document-header">
            <div class="document-icon">
              <i class="fa fa-tag"></i>
            </div>
            <h4>Logo de la Tienda</h4>
          </div>
          <div class="document-body">
            <div class="image-container">
              <img :src="getImageUrl(shop.v_logo)" 
                   class="document-image" 
                   @error="handleImageError"
                   alt="Logo de la tienda">
            </div>
            <div class="document-status">
              <i class="fa fa-check-circle"></i>
              <span>Logo oficial</span>
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
    data() {
      return {
        principalPhone: '',
        secondaryPhone: '',
        principalAddress: ''
      }
    },
    props: ['shop'],
    created() {
      $(function () {
        $('[data-placement]').tooltip()
      });
      let yo = this;
      
      // Verificar que shop existe y tiene las propiedades necesarias
      if (this.shop && this.shop.telefonos && Array.isArray(this.shop.telefonos)) {
      for (let i = 0; i < this.shop.telefonos.length; i++) {
        let telefono = this.shop.telefonos[i];
        if (telefono.b_principal)
          yo.principalPhone = telefono.v_telefono;
        else
          yo.secondaryPhone = telefono.v_telefono;
      }
      }
      
      if (this.shop && this.shop.direcciones && Array.isArray(this.shop.direcciones)) {
      for (let i = 0; i < this.shop.direcciones.length; i++) {
        let direccion = this.shop.direcciones[i];
        if (direccion.b_principal)
          yo.principalAddress = direccion.v_direccion;
        }
      }
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('modal_close');
      });
    },
    methods: {
      handleImageError(event) {
        event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTUwIDEwMEgxMzBWMTUwSDcwVjEwMEg1MEwxMDAgNTBaIiBmaWxsPSIjQ0NDQ0NDIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LXNpemU9IjE0Ij5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+';
      }
    }
  }
</script>

<style scoped>
/* Estilos para el modal de detalles de tienda */
.shop-details-modal {
  padding: 0;
  background: #f8f9fa;
  border-radius: 15px;
  overflow: hidden;
}

.modal-header-custom {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
  padding: 30px;
  text-align: center;
  position: relative;
}

.header-icon {
  font-size: 4rem;
  margin-bottom: 15px;
  opacity: 0.9;
}

.shop-title {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  font-weight: 300;
}

.shop-subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

.info-section {
  padding: 30px;
  border-bottom: 1px solid #e9ecef;
}

.info-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 25px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.section-title i {
  color: #ff6633;
  font-size: 1.3rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.3s ease;
  border-left: 4px solid #ff6633;
}

.info-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(255,102,51,0.15);
}

.info-card.full-width {
  grid-column: 1 / -1;
}

.info-icon {
  font-size: 2rem;
  color: #ff6633;
  opacity: 0.8;
  min-width: 40px;
  text-align: center;
}

.info-content {
  flex: 1;
}

.info-content label {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 5px 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-content span {
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
  word-break: break-word;
}

.schedule-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.schedule-day {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
}

.schedule-day:hover {
  border-color: #ff6633;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255,102,51,0.1);
}

.day-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 15px;
  font-weight: 600;
  color: #333;
}

.day-header i {
  color: #ff6633;
  font-size: 1.1rem;
}

.day-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.day-content.closed {
  color: #dc3545;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.day-content.closed i {
  font-size: 1.2rem;
}

.time-range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #e9ecef;
}

.time-range:last-child {
  border-bottom: none;
}

.time-label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.time-value {
  font-size: 0.9rem;
  color: #333;
  font-weight: 600;
  background: #ff6633;
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  min-width: 80px;
  text-align: center;
}

/* Estilos para mensaje de error */
.error-message {
  text-align: center;
  padding: 40px 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px dashed #dc3545;
}

.error-message i {
  font-size: 3rem;
  color: #dc3545;
  margin-bottom: 20px;
  display: block;
}

.error-message p {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

/* Estilos para contenido adicional */
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.content-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-left: 4px solid #ff6633;
  transition: transform 0.3s ease;
}

.content-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(255,102,51,0.15);
}

.content-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.content-icon {
  font-size: 2rem;
  color: #ff6633;
  opacity: 0.8;
}

.content-header h4 {
  font-size: 1.3rem;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.content-body {
  padding: 0;
}

.content-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin: 0;
  text-align: justify;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #ff6633;
  max-height: 120px;
  overflow-y: auto;
  word-wrap: break-word;
  white-space: pre-wrap;
  scrollbar-width: thin;
  scrollbar-color: #ff6633 #e9ecef;
}

/* Estilos personalizados para el scrollbar */
.content-text::-webkit-scrollbar {
  width: 6px;
}

.content-text::-webkit-scrollbar-track {
  background: #e9ecef;
  border-radius: 3px;
}

.content-text::-webkit-scrollbar-thumb {
  background: #ff6633;
  border-radius: 3px;
}

.content-text::-webkit-scrollbar-thumb:hover {
  background: #e55a2b;
}

/* Estilos para documentos e imágenes */
.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.document-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  text-align: center;
}

.document-card:hover {
  border-color: #ff6633;
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(255,102,51,0.15);
}

.document-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.document-icon {
  font-size: 2.5rem;
  color: #ff6633;
  opacity: 0.8;
}

.document-header h4 {
  font-size: 1.1rem;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.document-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.image-container {
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.document-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.document-image:hover {
  transform: scale(1.05);
}

.document-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #28a745;
  font-size: 0.9rem;
  font-weight: 500;
}

.document-status i {
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-header-custom {
    padding: 20px;
  }
  
  .shop-title {
    font-size: 2rem;
  }
  
  .info-section {
    padding: 20px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .schedule-grid {
    grid-template-columns: 1fr;
  }
  
  .info-card {
    padding: 15px;
  }
  
  .info-icon {
    font-size: 1.5rem;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .documents-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  .content-card {
    padding: 20px;
  }
  
  .document-card {
    padding: 15px;
  }
  
  .image-container {
    height: 120px;
  }
}
</style>
