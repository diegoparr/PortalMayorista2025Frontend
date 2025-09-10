<template>
  <div class="modern-store-info">
    <!-- Características destacadas -->
    <v-card class="features-card" elevation="4">
      <v-card-title class="features-title">
        <v-icon color="orange" class="mr-2">star</v-icon>
        Características de la Tienda
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" v-for="feature in features" :key="feature.icon">
            <div class="feature-item">
              <v-icon :color="feature.color" size="32" class="feature-icon">{{feature.icon}}</v-icon>
              <h4 class="feature-title">{{feature.title}}</h4>
              <p class="feature-description">{{feature.description}}</p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Descripción de la tienda -->
    <v-card class="description-card" elevation="4" v-if="tienda.v_descripcion">
      <v-card-title class="description-title">
        <v-icon color="blue" class="mr-2">info</v-icon>
        Sobre la Tienda
      </v-card-title>
      <v-card-text>
        <p class="description-text">{{tienda.v_descripcion}}</p>
      </v-card-text>
    </v-card>

    <!-- Información de contacto -->
    <v-card class="contact-card" elevation="4">
      <v-card-title class="contact-title">
        <v-icon color="green" class="mr-2">contact_phone</v-icon>
        Información de Contacto
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <div class="contact-item">
              <v-icon color="blue" class="contact-icon">location_on</v-icon>
              <div class="contact-details">
                <h4>Ubicación</h4>
                <p>{{tienda.v_nombre_ciudad}}, {{tienda.v_nombre_pais}}</p>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6" v-if="tienda.direcciones && tienda.direcciones.length > 0">
            <div class="contact-item">
              <v-icon color="orange" class="contact-icon">place</v-icon>
              <div class="contact-details">
                <h4>Dirección</h4>
                <p>{{tienda.direcciones[0].v_direccion}}</p>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6" v-if="tienda.telefonos && tienda.telefonos.length > 0">
            <div class="contact-item">
              <v-icon color="green" class="contact-icon">phone</v-icon>
              <div class="contact-details">
                <h4>Teléfono</h4>
                <p>+({{tienda.telefonos[0].v_prefijo_telefonico}}) {{tienda.telefonos[0].v_telefono}}</p>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="contact-item">
              <v-icon color="purple" class="contact-icon">schedule</v-icon>
              <div class="contact-details">
                <h4>Tiempo de Respuesta</h4>
                <p>{{tienda.n_tiempo_respuesta_promedio || 'No disponible'}} minutos promedio</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Horarios de atención -->
    <v-card class="schedule-card" elevation="4">
      <v-card-title class="schedule-title">
        <v-icon color="purple" class="mr-2">schedule</v-icon>
        Horarios de Atención
      </v-card-title>
      <v-card-text>
        <div class="schedule-table">
          <div class="schedule-header">
            <div class="schedule-day-header">Día</div>
            <div class="schedule-time-header">Horario</div>
          </div>
          <div 
            v-for="(day, index) in scheduleDays" 
            :key="day.name"
            class="schedule-row"
            :class="{ 'schedule-row-even': index % 2 === 0 }">
            <div class="schedule-day">
              <v-icon class="day-icon">{{day.icon}}</v-icon>
              <span>{{day.name}}</span>
            </div>
            <div class="schedule-time">
              <v-chip 
                :color="day.isClosed ? 'red' : 'green'" 
                :outline="day.isClosed"
                small>
                {{day.isClosed ? 'Cerrado' : day.schedule}}
              </v-chip>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "informacion",
    props: ['tienda'],
    computed: {
      features() {
        return [
          {
            icon: 'refresh',
            title: 'Código de Canje',
            description: 'Aplica códigos de descuento especiales',
            color: 'blue'
          },
          {
            icon: 'local_offer',
            title: 'Promociones',
            description: 'Ofertas y descuentos exclusivos',
            color: 'orange'
          },
          {
            icon: 'local_shipping',
            title: 'Envíos Nacionales',
            description: 'Entregas a todo el país',
            color: 'green'
          }
        ];
      },
      scheduleDays() {
        const days = [
          { name: 'Lunes', icon: 'mdi-calendar-week-begin', field: 'lunes' },
          { name: 'Martes', icon: 'mdi-calendar-week-begin', field: 'martes' },
          { name: 'Miércoles', icon: 'mdi-calendar-week-begin', field: 'miercoles' },
          { name: 'Jueves', icon: 'mdi-calendar-week-begin', field: 'jueves' },
          { name: 'Viernes', icon: 'mdi-calendar-week-begin', field: 'viernes' },
          { name: 'Sábado', icon: 'mdi-calendar-weekend', field: 'sabado' },
          { name: 'Domingo', icon: 'mdi-calendar-weekend', field: 'domingo' }
        ];

        return days.map(day => {
          const isClosed = this.tienda[`b_horario_${day.field}_tienda_no_laborable`];
          const startTime = this.tienda[`v_horario_${day.field}_tienda_desde`];
          const endTime = this.tienda[`v_horario_${day.field}_tienda_hasta`];
          
          let schedule = 'Cerrado';
          if (!isClosed && startTime && endTime) {
            schedule = `${this.retornarHora12(startTime)} - ${this.retornarHora12(endTime)}`;
          }

          return {
            ...day,
            isClosed,
            schedule
          };
        });
      }
    },
    methods: {
      retornarHora12(hora) {
        if (!hora) return '';
        const [hours, minutes] = hora.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
      }
    }
  }
</script>

<style scoped>
.modern-store-info {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.features-card,
.description-card,
.contact-card,
.schedule-card {
  margin-bottom: 24px;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.features-card:hover,
.description-card:hover,
.contact-card:hover,
.schedule-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.features-title,
.description-title,
.contact-title,
.schedule-title {
  background: linear-gradient(135deg, #ff6633, #ff8533);
  color: white;
  font-weight: 600;
  border-radius: 12px 12px 0 0;
}

.feature-item {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background: #f8f9fa;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.feature-icon {
  margin-bottom: 12px;
}

.feature-title {
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.feature-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

.description-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  text-align: justify;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-radius: 8px;
  background: #f8f9fa;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.contact-icon {
  margin-right: 16px;
  margin-top: 4px;
}

.contact-details h4 {
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.contact-details p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.schedule-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.schedule-header {
  display: flex;
  background: linear-gradient(135deg, #ff6633, #ff8533);
  color: white;
  font-weight: 600;
}

.schedule-day-header,
.schedule-time-header {
  flex: 1;
  padding: 16px;
  text-align: center;
}

.schedule-row {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s ease;
}

.schedule-row:hover {
  background-color: #f8f9fa;
}

.schedule-row-even {
  background-color: #fafafa;
}

.schedule-day {
  flex: 1;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.day-icon {
  margin-right: 8px;
  color: #ff6633;
}

.schedule-time {
  flex: 1;
  text-align: center;
}

/* Responsive design */
@media (max-width: 768px) {
  .modern-store-info {
    padding: 10px;
  }
  
  .feature-item {
    padding: 16px;
  }
  
  .contact-item {
    padding: 12px;
  }
  
  .schedule-header {
    font-size: 0.9rem;
  }
  
  .schedule-day-header,
  .schedule-time-header {
    padding: 12px 8px;
  }
  
  .schedule-row {
    padding: 10px 8px;
  }
}
</style>
