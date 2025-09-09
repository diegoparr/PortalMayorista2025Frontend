<template>
  <div class="role-create-container">
    <!-- Header del Modal -->
    <div class="create-header">
      <div class="create-icon">
        <i class="fa fa-plus-circle"></i>
      </div>
      <h3 class="create-title">Registrar Nuevo Rol</h3>
      <p class="create-subtitle">Crea un nuevo rol para el sistema</p>
    </div>

    <!-- Formulario de Registro -->
    <form v-on:submit.prevent="store" class="create-form">
      <div class="form-section">
        <div class="form-group" :class="{'has-error': errors.has('name')}">
          <label for="name" class="form-label">
            <i class="fa fa-tag"></i>
            Nombre del Rol
          </label>
          <input 
            name="name" 
            type="text" 
            class="form-control input-modern"
            data-placement="left" 
            required 
            id="name"
            title="Ingrese el nombre del rol" 
            v-validate="'required|min:2|max:100'"
            data-vv-as="nombre del rol" 
            v-model="rol.name"
            placeholder="Ej: rol_administrador, rol_vendedor, rol_cliente"
          >
          <div class="input-focus-line"></div>
          <span v-show="errors.has('name')" class="error-message">
            <i class="fa fa-exclamation-circle"></i>
            {{ errors.first('name')}}
          </span>
          <div class="input-hint">
            <i class="fa fa-info-circle"></i>
            El nombre debe tener entre 2 y 100 caracteres
          </div>
        </div>

        <!-- Información del Guard -->
        <div class="info-section">
          <div class="info-item">
            <span class="info-label">Guard Name:</span>
            <span class="info-value">{{ rol.guard_name || 'web' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Estado:</span>
            <span class="info-value status-new">Nuevo</span>
          </div>
        </div>
      </div>

      <!-- Botones de Acción -->
      <div class="form-actions">
        <button type="button" class="btn btn-cancel" data-dismiss="modal">
          <i class="fa fa-times"></i> Cancelar
        </button>
        <button type="submit" class="btn btn-create" id="submitButton" :disabled="deshabilitar"
                data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Registrando...">
          <i class="fa fa-plus"></i> Registrar Rol
        </button>
      </div>
    </form>
  </div>
</template>
<script>
  import AppServices from '../../AppServices';
  import {mapGetters, mapMutations} from 'vuex';
  import helpers from '../../../helpers';
  export default {
    data() {
      return {
        rol: {
          name: null,
          guard_name: 'web',

        },
      }
    },
    created() {

    },
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('name'));
      }
    }),
    methods:{
      getAppServices() {
        return AppServices;
      },
      store() {
        this.$validator.validateAll().then(() => {
          let token = this.getUsuario.token;
          let boton_registrar = $('#submitButton');
          boton_registrar.button('loading');
          //let formData = new FormData();
          let yo = this;
          this.getAppServices().postMethodWithBearer('api/avanzamas/roles', this.rol, token)
            .then(response => {
              boton_registrar.button('reset');
              yo.$toastr('success', response.body.mensaje, "Acción exitosa");
              $('#modal').modal('hide');
              yo.name = '';
              yo.$emit('registro');
            }, errors => {
              if (errors.status === 422) {
                for (let err in errors.body.errors) {
                  errors.body.errors[err].forEach(function (value) {
                    yo.$toastr('error', value, err.charAt(0).toUpperCase() + err.slice(1));
                  });
                }
              } else
                yo.$toastr('error', errors.body.mensaje, "Error desconocido");
              boton_registrar.button('reset');
            });
        });
      },

    }
  }
</script>

<style scoped>
.role-create-container {
  padding: 20px;
}

.create-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(40,167,69,0.3);
}

.create-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.9;
}

.create-title {
  font-size: 1.8rem;
  margin: 0 0 10px 0;
  font-weight: 300;
}

.create-subtitle {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
}

.create-form {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.form-section {
  padding: 30px;
}

.form-group {
  margin-bottom: 25px;
  position: relative;
}

.form-label {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 1rem;
}

.form-label i {
  margin-right: 8px;
  color: #28a745;
  font-size: 1.1rem;
}

.input-modern {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.input-modern:focus {
  outline: none;
  border-color: #28a745;
  background: white;
  box-shadow: 0 0 0 3px rgba(40,167,69,0.1);
}

.input-focus-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #28a745;
  transition: width 0.3s ease;
}

.input-modern:focus + .input-focus-line {
  width: 100%;
}

.form-group.has-error .input-modern {
  border-color: #dc3545;
  background: #fff5f5;
}

.form-group.has-error .input-focus-line {
  background: #dc3545;
}

.error-message {
  display: flex;
  align-items: center;
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
  font-weight: 500;
}

.error-message i {
  margin-right: 5px;
  font-size: 0.8rem;
}

.input-hint {
  display: flex;
  align-items: center;
  color: #6c757d;
  font-size: 0.8rem;
  margin-top: 5px;
  font-style: italic;
}

.input-hint i {
  margin-right: 5px;
  font-size: 0.7rem;
}

.info-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  border-left: 4px solid #28a745;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 500;
  color: #666;
}

.info-value {
  color: #333;
  font-weight: 600;
}

.status-new {
  background: #d4edda;
  color: #155724;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 25px 30px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.btn {
  padding: 12px 25px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn-create {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
}

.btn-create:hover:not(:disabled) {
  background: linear-gradient(135deg, #20c997 0%, #28a745 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(40,167,69,0.4);
}

.btn-create:disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .role-create-container {
    padding: 15px;
  }
  
  .create-title {
    font-size: 1.5rem;
  }
  
  .form-section {
    padding: 20px;
  }
  
  .form-actions {
    flex-direction: column;
    padding: 20px;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
