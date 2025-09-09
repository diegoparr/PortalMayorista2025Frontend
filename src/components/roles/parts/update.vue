<template>
  <div class="role-edit-container">
    <!-- Header del Modal -->
    <div class="edit-header">
      <div class="edit-icon">
        <i class="fa fa-edit"></i>
      </div>
      <h3 class="edit-title">Editar Rol</h3>
      <p class="edit-subtitle">Modifica la información del rol seleccionado</p>
    </div>

    <!-- Formulario de Edición -->
    <form v-on:submit.prevent="actualizar" class="edit-form">
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
            placeholder="Ej: rol_administrador"
          >
          <div class="input-focus-line"></div>
          <span v-show="errors.has('name')" class="error-message">
            <i class="fa fa-exclamation-circle"></i>
            {{ errors.first('name')}}
          </span>
        </div>

        <!-- Información adicional -->
        <div class="info-section">
          <div class="info-item">
            <span class="info-label">ID del Rol:</span>
            <span class="info-value">{{ rol.id }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Guard Name:</span>
            <span class="info-value">{{ rol.guard_name || 'web' }}</span>
          </div>
        </div>
      </div>

      <!-- Botones de Acción -->
      <div class="form-actions">
        <button type="button" class="btn btn-cancel" data-dismiss="modal">
          <i class="fa fa-times"></i> Cancelar
        </button>
        <button type="submit" class="btn btn-save" id="submitButton" :disabled="deshabilitar"
                data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Guardando...">
          <i class="fa fa-save"></i> Guardar Cambios
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
        rol:[]
      }
    },
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('name'));
      }
    }),
    props: ['updateRol'],
    created() {
      this.rol = this.updateRol;
      $(function () {
        $('[]').tooltip()
      });
    },
    components: {},
    methods: {
      getAppServices() {
        return AppServices;
      },
      actualizar() {
        let yo = this;
        let token = this.getUsuario.token;
        this.$validator.validateAll().then(() => {

          let boton_editar = $('#submitButton');
          boton_editar.button('loading');

          yo.getAppServices().putMethodWithBearer("api/avanzamas/roles/" + this.rol.id,this.rol, token)
            .then(response => {
              boton_editar.button('reset');
              yo.$toastr('success', response.body.mensaje, "Acción exitosa");
              $('#modal').modal('hide');
              yo.$emit('actualizar');
            }, errors => {
              console.log(errors);
              if (errors.status === 422) {
                for (let err in errors.body.errors) {
                  errors.body.errors[err].forEach(function (value) {
                    yo.$toastr('error', value, helpers.ufirst("validación"));
                  });
                }
              } else
                yo.$toastr('error', errors.body.mensaje, "Error desconocido");
              boton_editar.button('reset');
            });
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
.role-edit-container {
  padding: 20px;
}

.edit-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #F77300 0%, #ff6633 100%);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(247,115,0,0.3);
}

.edit-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.9;
}

.edit-title {
  font-size: 1.8rem;
  margin: 0 0 10px 0;
  font-weight: 300;
}

.edit-subtitle {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
}

.edit-form {
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
  color: #ff6633;
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
  border-color: #ff6633;
  background: white;
  box-shadow: 0 0 0 3px rgba(255,102,51,0.1);
}

.input-focus-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #ff6633;
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

.info-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  border-left: 4px solid #ff6633;
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

.btn-save {
  background: linear-gradient(135deg, #ff6633 0%, #F77300 100%);
  color: white;
}

.btn-save:hover:not(:disabled) {
  background: linear-gradient(135deg, #F77300 0%, #ff6633 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255,102,51,0.4);
}

.btn-save:disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .role-edit-container {
    padding: 15px;
  }
  
  .edit-title {
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
