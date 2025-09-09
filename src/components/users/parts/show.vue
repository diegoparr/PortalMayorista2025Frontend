<template>
  <div class="user-details-modal">
    <!-- Header del Modal con Información Principal -->
    <div class="modal-header-custom">
      <div class="header-content">
        <div class="header-icon">
          <i class="fa fa-user"></i>
        </div>
        <div class="header-text">
          <h2 class="user-title">{{ getFullName() }}</h2>
          <p class="user-subtitle">{{ usuario.v_nombre_rol || 'Usuario del Sistema' }}</p>
          <div class="user-status">
            <span class="status-badge active">
              <i class="fa fa-check-circle"></i>
              Activo
            </span>
          </div>
        </div>
      </div>
      <div class="header-avatar">
        <div class="avatar-container">
          <img :src="getImageUrl(usuario.v_avatar)" 
               class="user-avatar-image" 
               @error="handleImageError"
               alt="Avatar del usuario">
          <div class="avatar-badge">
            <i class="fa fa-user"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Información Personal -->
    <div class="info-section">
      <h3 class="section-title">
        <i class="fa fa-user-circle"></i>
        Información Personal
      </h3>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-id-card"></i>
          </div>
          <div class="info-content">
            <label>Nombres Completos</label>
            <span>{{ getFullName() }}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-venus-mars"></i>
          </div>
          <div class="info-content">
            <label>Sexo</label>
            <span>{{ usuario.v_sexo || 'No especificado' }}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-birthday-cake"></i>
          </div>
          <div class="info-content">
            <label>Fecha de Nacimiento</label>
            <span>{{ formatDate(usuario.d_fechanacimiento) }}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-calendar-alt"></i>
          </div>
          <div class="info-content">
            <label>Edad</label>
            <span>{{ calculateAge(usuario.d_fechanacimiento) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Información de Acceso -->
    <div class="info-section">
      <h3 class="section-title">
        <i class="fa fa-key"></i>
        Información de Acceso
      </h3>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-user-tag"></i>
          </div>
          <div class="info-content">
            <label>Usuario</label>
            <span>{{ usuario.name || 'No disponible' }}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-envelope"></i>
          </div>
          <div class="info-content">
            <label>Email</label>
            <span>{{ usuario.email || 'No disponible' }}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-shield-alt"></i>
          </div>
          <div class="info-content">
            <label>Rol del Sistema</label>
            <span class="role-badge">{{ usuario.v_nombre_rol || 'No asignado' }}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-clock"></i>
          </div>
          <div class="info-content">
            <label>Último Acceso</label>
            <span>{{ formatDate(usuario.updated_at) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Información de Ubicación -->
    <div class="info-section">
      <h3 class="section-title">
        <i class="fa fa-map-marker-alt"></i>
        Información de Ubicación
      </h3>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-globe"></i>
          </div>
          <div class="info-content">
            <label>País</label>
            <span>{{ usuario.v_nombre_pais || 'No disponible' }}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-map"></i>
          </div>
          <div class="info-content">
            <label>Provincia</label>
            <span>{{ usuario.v_nombre_provincia || 'No disponible' }}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-city"></i>
          </div>
          <div class="info-content">
            <label>Ciudad</label>
            <span>{{ usuario.v_nombre_ciudad || 'No disponible' }}</span>
          </div>
        </div>
        <div class="info-card full-width">
          <div class="info-icon">
            <i class="fa fa-home"></i>
          </div>
          <div class="info-content">
            <label>Dirección Principal</label>
            <span>{{ usuario.direccion_principal || direccionPrincipal || 'No disponible' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Información de Contacto -->
    <div class="info-section">
      <h3 class="section-title">
        <i class="fa fa-phone"></i>
        Información de Contacto
      </h3>
      <div class="info-grid">
          <div class="info-card">
            <div class="info-icon">
              <i class="fa fa-phone"></i>
            </div>
            <div class="info-content">
              <label>Teléfono Fijo</label>
              <span>{{ usuario.telefono_fijo || telefonoFijo || 'No disponible' }}</span>
            </div>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <i class="fa fa-mobile-alt"></i>
            </div>
            <div class="info-content">
              <label>Teléfono Celular</label>
              <span>{{ usuario.telefono_celular || telefonoCelular || 'No disponible' }}</span>
            </div>
          </div>
      </div>
    </div>

    <!-- Información del Documento -->
    <div class="info-section" v-if="usuario.tipoDocumentos">
      <h3 class="section-title">
        <i class="fa fa-id-card"></i>
        Información del Documento
      </h3>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-file-alt"></i>
          </div>
          <div class="info-content">
            <label>Tipo de Documento</label>
            <span>{{ usuario.tipoDocumentos.v_des_tipo_documento || 'No disponible' }}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <i class="fa fa-hashtag"></i>
          </div>
          <div class="info-content">
            <label>Número de Documento</label>
            <span>{{ usuario.v_documento || 'No disponible' }}</span>
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
        telefonoFijo: '',
        telefonoCelular: '',
        direccionPrincipal: ''
      }
    },
    props: ['usuario'],
    created() {
      $(function () {
        $('[data-placement]').tooltip()
      });
      let yo = this;
      
      // Procesar direcciones
      if (this.usuario && this.usuario.direcciones && Array.isArray(this.usuario.direcciones)) {
        for (let i = 0; i < this.usuario.direcciones.length; i++) {
          let direccion = this.usuario.direcciones[i];
          if (direccion.b_principal)
            yo.direccionPrincipal = direccion.v_direccion;
        }
      }
      
      // Procesar teléfonos
      if (this.usuario && this.usuario.telefonos && Array.isArray(this.usuario.telefonos)) {
        for (let i = 0; i < this.usuario.telefonos.length; i++) {
          let telefono = this.usuario.telefonos[i];
          if (telefono.v_tipo == 'Fijo')
            yo.telefonoFijo = telefono.v_telefono;
          else
            yo.telefonoCelular = telefono.v_telefono;
        }
      }
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('cerrar_modal');
      })
    },
    methods: {
      getFullName() {
        if (!this.usuario) return 'Usuario';
        
        const nombres = [
          this.usuario.v_primer_nombre,
          this.usuario.v_segundo_nombre,
          this.usuario.v_primer_apellido,
          this.usuario.v_segundo_apellido
        ].filter(nombre => nombre && nombre.trim() !== '');
        
        return nombres.length > 0 ? nombres.join(' ') : this.usuario.name || 'Usuario';
      },
      formatDate(dateString) {
        if (!dateString) return 'No disponible';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      },
      calculateAge(birthDate) {
        if (!birthDate) return 'No disponible';
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
          age--;
        }
        
        return age > 0 ? `${age} años` : 'No disponible';
      },
      handleImageError(event) {
        event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTUwIDEwMEgxMzBWMTUwSDcwVjEwMEg1MEwxMDAgNTBaIiBmaWxsPSIjQ0NDQ0NDIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LXNpemU9IjE0Ij5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+';
      }
    }
  }
</script>

<style scoped>
/* Estilos para el modal de detalles de usuario */
.user-details-modal {
  padding: 0;
  background: #f8f9fa;
  border-radius: 15px;
  overflow: hidden;
}

.modal-header-custom {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
  padding: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.header-icon {
  font-size: 3rem;
  opacity: 0.9;
  min-width: 60px;
}

.header-text {
  flex: 1;
}

.user-title {
  font-size: 2.2rem;
  margin: 0 0 8px 0;
  font-weight: 300;
  line-height: 1.2;
}

.user-subtitle {
  font-size: 1.1rem;
  margin: 0 0 10px 0;
  opacity: 0.9;
  font-weight: 500;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.status-badge.active {
  background: rgba(76, 175, 80, 0.8);
  border-color: rgba(76, 175, 80, 0.6);
}

.header-avatar {
  flex-shrink: 0;
}

/* Avatar del Usuario */
.avatar-container {
  position: relative;
  display: inline-block;
}

.user-avatar-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.user-avatar-image:hover {
  transform: scale(1.05);
}

.avatar-badge {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff6633;
  font-size: 0.8rem;
  border: 2px solid white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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

.role-badge {
  background: #ff6633;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-header-custom {
    padding: 20px;
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .user-title {
    font-size: 1.8rem;
  }
  
  .info-section {
    padding: 20px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .info-card {
    padding: 15px;
  }
  
  .info-icon {
    font-size: 1.5rem;
  }
  
  .user-avatar-image {
    width: 80px;
    height: 80px;
  }
  
  .avatar-badge {
    width: 22px;
    height: 22px;
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .user-details-modal {
    margin: 10px;
  }
  
  .modal-header-custom {
    padding: 15px;
    gap: 15px;
  }
  
  .user-title {
    font-size: 1.4rem;
  }
  
  .user-subtitle {
    font-size: 1rem;
  }
  
  .info-section {
    padding: 15px;
  }
  
  .info-card {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .info-content {
    text-align: center;
  }
  
  .user-avatar-image {
    width: 70px;
    height: 70px;
  }
  
  .avatar-badge {
    width: 20px;
    height: 20px;
    font-size: 0.6rem;
  }
}
</style>
