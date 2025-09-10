<template>
  <div class="modern-questions-section">
    <!-- Formulario para hacer preguntas -->
    <v-card class="question-form-card" elevation="4">
      <v-card-title class="question-form-title">
        <v-icon color="blue" class="mr-2">help_outline</v-icon>
        ¿Tienes alguna pregunta?
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="preguntar">
          <v-textarea
            v-model="post.v_mensaje"
            :placeholder="deshabilitarBoton ? 'Inicia sesión primero para realizar una pregunta' : 'Escribe tu pregunta aquí...'"
            :disabled="deshabilitarBoton"
            rows="3"
            outlined
            class="question-textarea"
            :rules="[v => !!v || 'La pregunta es requerida']"
            required>
          </v-textarea>
          <div class="question-form-actions">
            <v-btn 
              color="primary" 
              :disabled="deshabilitarBoton || !post.v_mensaje"
              :loading="isSubmitting"
              @click="preguntar"
              class="question-submit-btn">
              <v-icon left>send</v-icon>
              Enviar Pregunta
            </v-btn>
            <div class="response-time-info">
              <v-icon color="orange" small class="mr-1">schedule</v-icon>
              <span>Tiempo de respuesta: <strong>{{tienda.n_tiempo_respuesta_promedio || 'No disponible'}} min</strong></span>
            </div>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Lista de preguntas y respuestas -->
    <div class="questions-list">
      <template v-if="cargandoData">
        <v-card class="loading-card" elevation="2">
          <v-card-text class="text-center">
            <v-progress-circular indeterminate color="primary" class="mb-3"></v-progress-circular>
            <p>Cargando preguntas...</p>
          </v-card-text>
        </v-card>
      </template>
      
      <template v-else-if="!cargandoData && pagination.data.length > 0">
        <!-- Paginación superior -->
        <div v-if="pagination.last_page > 1" class="pagination-container">
          <v-pagination
            v-model="pagination.current_page"
            :length="pagination.last_page"
            @input="obtenerPosts"
            color="primary"
            total-visible="5">
          </v-pagination>
        </div>

        <!-- Preguntas -->
        <div class="questions-container">
          <v-card 
            v-for="post in pagination.data" 
            :key="post.id"
            v-if="post.usuario != null"
            class="question-card"
            elevation="2">
            <v-card-text>
              <!-- Información del usuario -->
              <div class="question-user-info">
                <v-avatar size="40" class="user-avatar">
                  <img :src="getImageUrl(post.usuario.v_avatar)" :alt="post.usuario.v_primer_nombre">
                </v-avatar>
                <div class="user-details">
                  <h4 class="user-name">{{post.usuario.v_primer_nombre}} {{post.usuario.v_primer_apellido}}</h4>
                  <span class="question-date">{{formatearFecha(post.created_at, 'DD/MM/YYYY')}}</span>
                </div>
              </div>

              <!-- Pregunta -->
              <div class="question-content">
                <div class="question-text">
                  <v-icon color="blue" class="question-icon">help_outline</v-icon>
                  <p>{{post.v_mensaje}}</p>
                </div>
              </div>

              <!-- Respuesta -->
              <div v-if="post.v_respuesta" class="answer-content">
                <div class="answer-header">
                  <v-icon color="green" class="answer-icon">reply</v-icon>
                  <span class="answer-label">Respuesta de la tienda</span>
                </div>
                <div class="answer-text">
                  <p>{{post.v_respuesta}}</p>
                </div>
                <div class="answer-date" v-if="post.d_fecha_respuesta">
                  <v-icon color="grey" small class="mr-1">schedule</v-icon>
                  <span>{{formatearFecha(post.d_fecha_respuesta, 'DD/MM/YYYY HH:mm')}}</span>
                </div>
              </div>

              <!-- Estado pendiente -->
              <div v-else class="pending-answer">
                <v-chip color="orange" outlined small>
                  <v-icon left small>schedule</v-icon>
                  Pendiente de respuesta
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <!-- Paginación inferior -->
        <div v-if="pagination.last_page > 1" class="pagination-container">
          <v-pagination
            v-model="pagination.current_page"
            :length="pagination.last_page"
            @input="obtenerPosts"
            color="primary"
            total-visible="5">
          </v-pagination>
        </div>
      </template>

      <!-- Estado vacío -->
      <template v-else-if="!cargandoData && pagination.data.length === 0">
        <v-card class="empty-state-card" elevation="2">
          <v-card-text class="text-center">
            <v-icon color="grey" size="64" class="mb-3">help_outline</v-icon>
            <h3 class="empty-title">No hay preguntas aún</h3>
            <p class="empty-description">Sé el primero en hacer una pregunta sobre esta tienda</p>
          </v-card-text>
        </v-card>
      </template>
    </div>
  </div>
</template>
<script>
  import Loader from '../../../parts/loader';
  import {mapGetters, mapMutations} from 'vuex';
  import ImageHandler from '../../../../mixin/ImageHandler';

  export default {
    data() {
      return {
        cargandoData: false,
        isSubmitting: false,
        pagination: {
          total: 0,
          per_page: 5,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
        offset: 4,
        post: {
          v_tipo: 'pregunta',
          v_mensaje: null,
          id_m_tiendas_fk: this.tienda.id_m_tiendas,
          id_usuario_fk: null
        }
      }
    },
    components: {Loader},
    name: "preguntas",
    props: ['tienda'],
    mixins: [ImageHandler],
    methods: {
      preguntar() {
        if (!this.post.v_mensaje || this.deshabilitarBoton) return;
        
        this.isSubmitting = true;
        this.post.id_usuario_fk = this.getUsuario.id;
        
        this.postMethodWithBearer(this.urlsApi().endpointsPost.crear, this.post, this.getUsuario.token)
          .then(response => {
            this.isSubmitting = false;
            this.$toastr('success', '¡Tu pregunta ha sido realizada con éxito!', "Preguntando");
            this.post = {
              v_tipo: 'pregunta',
              v_mensaje: null,
              id_m_tiendas_fk: this.tienda.id_m_tiendas,
              id_usuario_fk: null
            };
            this.obtenerPosts(1);
          }, errors => {
            this.isSubmitting = false;
            this.mapErrorsResponses(this, errors);
          });
      },
      obtenerPosts(pagina) {
        this.cargandoData = true;
        this.getMethodWithoutBearer(this.urlsApi().endpointsPublicos.post.index, 'paginate', pagina, "'usuario'", "['id_m_tiendas_fk','=','" + this.tienda.id_m_tiendas + "'],['v_tipo','=','pregunta']")
          .then(response => {
            this.cargandoData = false;
            this.pagination = response.body;
          }, errors => this.mapErrorsResponses(this, errors))
      },
      formatearFecha(fecha, formato) {
        if (!fecha) return '';
        const moment = require('moment');
        return moment(fecha).format(formato);
      }
    },
    created() {
      this.obtenerPosts(this.pagination.current_page);
    },
    computed: Object.assign({}, mapGetters([
      'getAutenticadoFull',
      'getUsuario',
    ]), {
      deshabilitarBoton() {
        return !this.getAutenticadoFull;
      },
      nombreUsuario() {
        if (this.getUsuario.v_proveedor_acceso == 'LaHipertienda')
          return this.getUsuario.v_primer_nombre + ' ' + this.getUsuario.v_primer_apellido;
        else
          return this.getUsuario.v_nombre_mostrar;
      }
    }),
  }
</script>

<style scoped>
.modern-questions-section {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.question-form-card {
  margin-bottom: 24px;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.question-form-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.question-form-title {
  background: linear-gradient(135deg, #2196F3, #21CBF3);
  color: white;
  font-weight: 600;
  border-radius: 12px 12px 0 0;
}

.question-textarea {
  margin-bottom: 16px;
}

.question-form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.question-submit-btn {
  border-radius: 25px;
  text-transform: none;
  font-weight: 500;
  padding: 0 24px;
}

.response-time-info {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
}

.questions-list {
  margin-top: 24px;
}

.loading-card,
.empty-state-card {
  border-radius: 12px;
  margin-bottom: 16px;
}

.empty-title {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.empty-description {
  color: #666;
  font-size: 1rem;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}

.questions-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.question-card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 4px solid #2196F3;
}

.question-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.question-user-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.user-avatar {
  margin-right: 12px;
  border: 2px solid #e0e0e0;
}

.user-details {
  flex: 1;
}

.user-name {
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.question-date {
  color: #666;
  font-size: 0.85rem;
}

.question-content {
  margin-bottom: 16px;
}

.question-text {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.question-icon {
  margin-top: 2px;
  flex-shrink: 0;
}

.question-text p {
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

.answer-content {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  border-left: 4px solid #4CAF50;
}

.answer-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.answer-icon {
  margin-right: 8px;
}

.answer-label {
  color: #4CAF50;
  font-weight: 600;
  font-size: 0.9rem;
}

.answer-text p {
  color: #333;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 8px 0;
}

.answer-date {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.8rem;
}

.pending-answer {
  margin-top: 16px;
  text-align: center;
}

/* Responsive design */
@media (max-width: 768px) {
  .modern-questions-section {
    padding: 10px;
  }
  
  .question-form-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .question-submit-btn {
    width: 100%;
  }
  
  .response-time-info {
    justify-content: center;
  }
  
  .question-user-info {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .user-avatar {
    margin-right: 0;
    margin-bottom: 8px;
  }
  
  .question-text {
    flex-direction: column;
    gap: 8px;
  }
  
  .question-icon {
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .question-card {
    margin: 0 -10px;
  }
  
  .answer-content {
    padding: 12px;
  }
}
</style>
