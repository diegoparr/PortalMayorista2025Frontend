<template>
  <div class="role-view-container">
    <!-- Header del Modal -->
    <div class="role-header">
      <div class="role-icon">
        <i class="fa fa-user-tag"></i>
      </div>
      <h3 class="role-title">Detalles del Rol</h3>
      <p class="role-subtitle">Información completa del rol seleccionado</p>
    </div>

    <!-- Información del Rol -->
    <div class="role-info-section">
      <div class="info-card">
        <div class="info-header">
          <i class="fa fa-tag"></i>
          <span>Información General</span>
        </div>
        <div class="info-content">
          <div class="info-item">
            <label class="info-label">Nombre del Rol:</label>
            <div class="info-value">
              <span class="role-badge">{{ rol.name }}</span>
            </div>
          </div>
          
          <div class="info-item">
            <label class="info-label">ID del Rol:</label>
            <div class="info-value">{{ rol.id }}</div>
          </div>
          
          <div class="info-item">
            <label class="info-label">Guard Name:</label>
            <div class="info-value">{{ rol.guard_name || 'web' }}</div>
          </div>
          
          <div class="info-item">
            <label class="info-label">Fecha de Creación:</label>
            <div class="info-value">{{ formatDate(rol.created_at) }}</div>
          </div>
          
          <div class="info-item">
            <label class="info-label">Última Actualización:</label>
            <div class="info-value">{{ formatDate(rol.updated_at) }}</div>
          </div>
        </div>
      </div>

      <!-- Permisos del Rol (si están disponibles) -->
      <div class="info-card" v-if="rol.permissions && rol.permissions.length > 0">
        <div class="info-header">
          <i class="fa fa-shield-alt"></i>
          <span>Permisos Asignados</span>
        </div>
        <div class="info-content">
          <div class="permissions-list">
            <span v-for="permission in rol.permissions" :key="permission.id" class="permission-badge">
              {{ permission.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Usuarios con este Rol (si están disponibles) -->
      <div class="info-card" v-if="rol.users && rol.users.length > 0">
        <div class="info-header">
          <i class="fa fa-users"></i>
          <span>Usuarios Asignados</span>
        </div>
        <div class="info-content">
          <div class="users-count">
            <span class="count-number">{{ rol.users.length }}</span>
            <span class="count-label">usuario(s) asignado(s)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón de Cerrar -->
    <div class="modal-actions">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">
        <i class="fa fa-times"></i> Cerrar
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['rol'],
    created() {
    },
    methods: {
      formatDate(dateString) {
        if (!dateString) return 'No disponible';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('cerrar_modal');
      })
    }
  }
</script>

<style scoped>
.role-view-container {
  padding: 20px;
}

.role-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(255,102,51,0.3);
}

.role-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.9;
}

.role-title {
  font-size: 1.8rem;
  margin: 0 0 10px 0;
  font-weight: 300;
}

.role-subtitle {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
}

.role-info-section {
  margin-bottom: 30px;
}

.info-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  overflow: hidden;
  border-left: 4px solid #ff6633;
}

.info-header {
  background: #f8f9fa;
  padding: 15px 20px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #333;
}

.info-header i {
  margin-right: 10px;
  color: #ff6633;
  font-size: 1.1rem;
}

.info-content {
  padding: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 500;
  color: #666;
  margin: 0;
  flex: 1;
}

.info-value {
  color: #333;
  font-weight: 400;
  flex: 1;
  text-align: right;
}

.role-badge {
  background: #ff6633;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.permissions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.permission-badge {
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid #dee2e6;
}

.users-count {
  text-align: center;
  padding: 20px;
}

.count-number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6633;
  margin-bottom: 5px;
}

.count-label {
  color: #666;
  font-size: 1rem;
}

.modal-actions {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #dee2e6;
}

.btn {
  padding: 10px 25px;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary {
  background: #6c757d;
  border-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
  border-color: #545b62;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  .role-view-container {
    padding: 15px;
  }
  
  .role-title {
    font-size: 1.5rem;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .info-value {
    text-align: left;
    margin-top: 5px;
  }
}
</style>
