<template>
  <div class="dashboard-container">
    <!-- Header del Dashboard -->
    <div class="dashboard-header">
      <h1 class="dashboard-title">
        <i class="fa fa-tachometer-alt"></i>
        Panel de Administración
      </h1>
      <p class="dashboard-subtitle">Bienvenido al centro de control de LaHipertienda</p>
    </div>

    <!-- Estadísticas Principales -->
    <div class="row stats-row">
      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="stat-card stat-card-primary">
          <div class="stat-icon">
            <i class="fa fa-users"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.totalUsuarios || '1,234' }}</h3>
            <p>Usuarios Registrados</p>
          </div>
        </div>
      </div>
      
      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="stat-card stat-card-success">
          <div class="stat-icon">
            <i class="fa fa-store"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.totalTiendas || '89' }}</h3>
            <p>Tiendas Activas</p>
          </div>
        </div>
      </div>
      
      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="stat-card stat-card-warning">
          <div class="stat-icon">
            <i class="fa fa-shopping-cart"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.totalProductos || '5,678' }}</h3>
            <p>Productos en Venta</p>
          </div>
        </div>
      </div>
      
      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="stat-card stat-card-info">
          <div class="stat-icon">
            <i class="fa fa-chart-line"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.ventasHoy || '$12,345' }}</h3>
            <p>Ventas Hoy</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Widgets de Información -->
    <div class="row widgets-row">
      <!-- Actividad Reciente -->
      <div class="col-lg-8 col-md-12">
        <div class="widget-card">
          <div class="widget-header">
            <h4><i class="fa fa-clock"></i> Actividad Reciente</h4>
          </div>
          <div class="widget-content">
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-icon success">
                  <i class="fa fa-plus"></i>
                </div>
                <div class="activity-content">
                  <p><strong>Nueva tienda registrada:</strong> "Moda Express"</p>
                  <span class="activity-time">Hace 2 horas</span>
                </div>
              </div>
              
              <div class="activity-item">
                <div class="activity-icon info">
                  <i class="fa fa-shopping-cart"></i>
                </div>
                <div class="activity-content">
                  <p><strong>Nueva venta:</strong> $45,000 en "ElectroHogar"</p>
                  <span class="activity-time">Hace 4 horas</span>
                </div>
              </div>
              
              <div class="activity-item">
                <div class="activity-icon warning">
                  <i class="fa fa-exclamation-triangle"></i>
                </div>
                <div class="activity-content">
                  <p><strong>Producto reportado:</strong> "Zapatos Deportivos"</p>
                  <span class="activity-time">Hace 6 horas</span>
                </div>
              </div>
              
              <div class="activity-item">
                <div class="activity-icon primary">
                  <i class="fa fa-user-plus"></i>
                </div>
                <div class="activity-content">
                  <p><strong>Nuevo usuario:</strong> María González</p>
                  <span class="activity-time">Hace 8 horas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones Rápidas -->
      <div class="col-lg-4 col-md-12">
        <div class="widget-card">
          <div class="widget-header">
            <h4><i class="fa fa-bolt"></i> Acciones Rápidas</h4>
          </div>
          <div class="widget-content">
            <div class="quick-actions">
              <button class="quick-action-btn" @click="goToModule('vendedores')">
                <i class="fa fa-users"></i>
                <span>Gestionar Vendedores</span>
              </button>
              
              <button class="quick-action-btn" @click="goToModule('productos')">
                <i class="fa fa-box"></i>
                <span>Gestionar Productos</span>
              </button>
              
              <button class="quick-action-btn" @click="goToModule('categorias')">
                <i class="fa fa-tags"></i>
                <span>Gestionar Categorías</span>
              </button>
              
              <button class="quick-action-btn" @click="goToModule('ordenes')">
                <i class="fa fa-shopping-bag"></i>
                <span>Ver Órdenes</span>
              </button>
              
              <button class="quick-action-btn" @click="goToModule('reportes')">
                <i class="fa fa-chart-bar"></i>
                <span>Ver Reportes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Información del Sistema -->
    <div class="row system-info-row">
      <div class="col-lg-6 col-md-12">
        <div class="widget-card">
          <div class="widget-header">
            <h4><i class="fa fa-info-circle"></i> Estado del Sistema</h4>
          </div>
          <div class="widget-content">
            <div class="system-status">
              <div class="status-item">
                <span class="status-label">Servidor:</span>
                <span class="status-value online">En Línea</span>
              </div>
              <div class="status-item">
                <span class="status-label">Base de Datos:</span>
                <span class="status-value online">Conectada</span>
              </div>
              <div class="status-item">
                <span class="status-label">Última Actualización:</span>
                <span class="status-value">{{ lastUpdate }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-lg-6 col-md-12">
        <div class="widget-card">
          <div class="widget-header">
            <h4><i class="fa fa-calendar"></i> Próximas Tareas</h4>
          </div>
          <div class="widget-content">
            <div class="tasks-list">
              <div class="task-item">
                <i class="fa fa-check-circle text-success"></i>
                <span>Revisar productos pendientes de aprobación</span>
              </div>
              <div class="task-item">
                <i class="fa fa-clock text-warning"></i>
                <span>Actualizar políticas de la plataforma</span>
              </div>
              <div class="task-item">
                <i class="fa fa-bell text-info"></i>
                <span>Enviar newsletter semanal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  data() {
    return {
      stats: {
        totalUsuarios: 0,
        totalTiendas: 0,
        totalProductos: 0,
        ventasHoy: 0
      },
      lastUpdate: ''
    }
  },
    created() {
      this.$emit("load_data", {
        show: false
      });
    this.loadDashboardData();
    this.updateLastUpdateTime();
  },
  methods: {
    loadDashboardData() {
      // Aquí se cargarían los datos reales del dashboard
      // Por ahora usamos datos de ejemplo
      this.stats = {
        totalUsuarios: 1234,
        totalTiendas: 89,
        totalProductos: 5678,
        ventasHoy: '$12,345'
      };
    },
    updateLastUpdateTime() {
      const now = new Date();
      this.lastUpdate = now.toLocaleString('es-CO');
    },
    goToModule(module) {
      this.$router.push(`/admin/${module}`);
    }
    }
  }
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(255,102,51,0.3);
}

.dashboard-title {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 300;
}

.dashboard-subtitle {
  font-size: 1.1rem;
  margin: 10px 0 0 0;
  opacity: 0.9;
}

.stats-row {
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(255,102,51,0.2);
}

.stat-card-primary { border-left: 4px solid #ff6633; }
.stat-card-success { border-left: 4px solid #28a745; }
.stat-card-warning { border-left: 4px solid #F77300; }
.stat-card-info { border-left: 4px solid #7c7c7c; }

.stat-icon {
  font-size: 3rem;
  margin-right: 20px;
  opacity: 0.8;
}

.stat-card-primary .stat-icon { color: #ff6633; }
.stat-card-success .stat-icon { color: #28a745; }
.stat-card-warning .stat-icon { color: #F77300; }
.stat-card-info .stat-icon { color: #7c7c7c; }

.stat-content h3 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: bold;
  color: #333;
}

.stat-content p {
  margin: 5px 0 0 0;
  color: #666;
  font-size: 1rem;
}

.widgets-row, .system-info-row {
  margin-bottom: 30px;
}

.widget-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.widget-card:hover {
  box-shadow: 0 4px 15px rgba(255,102,51,0.15);
}

.widget-header {
  background: #f8f9fa;
  padding: 15px 20px;
  border-bottom: 1px solid #dee2e6;
}

.widget-header h4 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.widget-content {
  padding: 20px;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: white;
  font-size: 1.2rem;
}

.activity-icon.success { background: #28a745; }
.activity-icon.info { background: #7c7c7c; }
.activity-icon.warning { background: #F77300; }
.activity-icon.primary { background: #ff6633; }

.activity-content p {
  margin: 0;
  color: #333;
}

.activity-time {
  color: #666;
  font-size: 0.9rem;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.quick-action-btn:hover {
  background: #e9ecef;
  transform: translateX(5px);
  border-color: #ff6633;
}

.quick-action-btn i {
  margin-right: 10px;
  color: #ff6633;
  width: 20px;
}

.system-status {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.status-label {
  font-weight: 500;
  color: #333;
}

.status-value {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-value.online {
  background: #d4edda;
  color: #155724;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.task-item i {
  margin-right: 10px;
  font-size: 1.1rem;
}

.task-item span {
  color: #333;
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 10px;
  }
  
  .dashboard-title {
    font-size: 2rem;
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
  }
  
  .stat-icon {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
