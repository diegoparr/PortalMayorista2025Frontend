<template>
  <div class="user-register-modal">
    <!-- Header del Modal -->
    <div class="modal-header-custom">
      <div class="header-icon">
        <i class="fa fa-user-plus"></i>
      </div>
      <div class="header-content">
        <h2 class="modal-title">Registro de Usuario</h2>
        <p class="modal-subtitle">Completa la información para crear un nuevo usuario</p>
      </div>
    </div>

    <!-- Formulario -->
    <form v-on:submit.prevent="registrar" class="register-form">
      <!-- Avatar Section -->
      <div class="form-section">
        <h3 class="section-title">
          <i class="fa fa-camera"></i>
          Avatar del Usuario
        </h3>
        <div class="avatar-upload-section">
          <div v-if="!imageAvatar" class="avatar-upload">
            <div class="upload-area" :class="{'has-error': errors.has('avatar')}">
              <input v-validate="'image|mimes:image/jpeg,image/png,image/jpg'"
                     name="avatar"
                     type="file"
                     v-on:change="onFileChangeAvatar"
                     data-vv-as="Avatar"
                     accept="image/*"
                     id="avatar"
                     class="file-input">
              <div class="upload-content">
                <i class="fa fa-cloud-upload-alt"></i>
                <p>Haz clic para seleccionar una imagen</p>
                <span class="upload-hint">JPG, PNG (máx. 2MB)</span>
              </div>
            </div>
            <span v-show="errors.has('avatar')" class="error-message">{{ errors.first('avatar')}}</span>
          </div>
          <div v-else class="avatar-preview">
            <div class="preview-container">
              <img :src="imageAvatar" class="preview-image" alt="Avatar preview">
              <button type="button" @click="removeImageAvatar" class="remove-btn">
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Información Personal -->
      <div class="form-section">
        <h3 class="section-title">
          <i class="fa fa-user-circle"></i>
          Información Personal
        </h3>
        <div class="form-grid">
          <div class="form-group" :class="{'has-error': errors.has('v_primer_nombre')}">
            <label for="v_primer_nombre" class="form-label">
              <i class="fa fa-id-card"></i>
              Primer Nombre *
            </label>
            <input name="v_primer_nombre" 
                   type="text" 
                   class="form-input"
                   id="v_primer_nombre"
                   placeholder="Ingrese el primer nombre"
                   v-validate="'required|alpha_spaces|min:2|max:100'"
                   data-vv-as="primer nombre del usuario" 
                   v-model="usuario.v_primer_nombre">
            <span v-show="errors.has('v_primer_nombre')" class="error-message">{{ errors.first('v_primer_nombre')}}</span>
          </div>

          <div class="form-group" :class="{'has-error': errors.has('v_segundo_nombre')}">
            <label for="v_segundo_nombre" class="form-label">
              <i class="fa fa-id-card"></i>
              Segundo Nombre
            </label>
            <input name="v_segundo_nombre" 
                   type="text" 
                   class="form-input"
                   id="v_segundo_nombre"
                   placeholder="Ingrese el segundo nombre"
                   v-validate="'alpha_spaces|min:2|max:100'"
                   data-vv-as="segundo nombre del usuario" 
                   v-model="usuario.v_segundo_nombre">
            <span v-show="errors.has('v_segundo_nombre')" class="error-message">{{ errors.first('v_segundo_nombre')}}</span>
          </div>

          <div class="form-group" :class="{'has-error': errors.has('v_primer_apellido')}">
            <label for="v_primer_apellido" class="form-label">
              <i class="fa fa-id-card"></i>
              Primer Apellido *
            </label>
            <input name="v_primer_apellido" 
                   type="text" 
                   class="form-input"
                   id="v_primer_apellido"
                   placeholder="Ingrese el primer apellido"
                   v-validate="'required|alpha_spaces|min:2|max:100'"
                   data-vv-as="primer apellido del usuario" 
                   v-model="usuario.v_primer_apellido">
            <span v-show="errors.has('v_primer_apellido')" class="error-message">{{ errors.first('v_primer_apellido')}}</span>
          </div>

          <div class="form-group" :class="{'has-error': errors.has('v_segundo_apellido')}">
            <label for="v_segundo_apellido" class="form-label">
              <i class="fa fa-id-card"></i>
              Segundo Apellido
            </label>
            <input name="v_segundo_apellido" 
                   type="text" 
                   class="form-input"
                   id="v_segundo_apellido"
                   placeholder="Ingrese el segundo apellido"
                   v-validate="'alpha_spaces|min:2|max:100'"
                   data-vv-as="segundo apellido del usuario" 
                   v-model="usuario.v_segundo_apellido">
            <span v-show="errors.has('v_segundo_apellido')" class="error-message">{{ errors.first('v_segundo_apellido')}}</span>
          </div>

          <div class="form-group" :class="{'has-error': errors.has('d_fechanacimiento')}">
            <label for="d_fechanacimiento" class="form-label">
              <i class="fa fa-birthday-cake"></i>
              Fecha de Nacimiento *
            </label>
            <input name="d_fechanacimiento" 
                   type="date" 
                   class="form-input"
                   id="d_fechanacimiento"
                   v-validate="'required'"
                   data-vv-as="fecha de nacimiento"
                   v-model="usuario.d_fechanacimiento">
            <span v-show="errors.has('d_fechanacimiento')" class="error-message">{{ errors.first('d_fechanacimiento')}}</span>
          </div>

          <div class="form-group" :class="{'has-error': errors.has('v_sexo')}">
            <label for="v_sexo" class="form-label">
              <i class="fa fa-venus-mars"></i>
              Sexo *
            </label>
            <select name="v_sexo" 
                    class="form-select" 
                    id="v_sexo"
                    v-model="usuario.v_sexo" 
                    v-validate="'required'">
              <option value="">Seleccione el sexo</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            <span v-show="errors.has('v_sexo')" class="error-message">{{ errors.first('v_sexo')}}</span>
          </div>
        </div>
      </div>

      <!-- Información de Ubicación -->
      <div class="form-section">
        <h3 class="section-title">
          <i class="fa fa-map-marker-alt"></i>
          Información de Ubicación
        </h3>
        <div class="form-grid">
          <div class="form-group" :class="{'has-error': errors.has('v_pais')}">
            <label for="v_pais" class="form-label">
              <i class="fa fa-globe"></i>
              País *
            </label>
            <model-select :options="paises" 
                          id="v_pais" 
                          v-model="pais" 
                          class="form-select"
                          v-on:input="seleccionarPais"
                          v-validate="'required'"
                          placeholder="Seleccione el país">
            </model-select>
            <span v-show="errors.has('v_pais')" class="error-message">{{ errors.first('v_pais')}}</span>
          </div>

          <div class="form-group">
            <label for="v_provincia" class="form-label">
              <i class="fa fa-map"></i>
              Provincia *
            </label>
            <model-select :options="provincias" 
                          id="v_provincia" 
                          v-model="provincia" 
                          class="form-select"
                          v-on:input="seleccionarProvincia"
                          placeholder="Seleccione la provincia">
            </model-select>
          </div>

          <div class="form-group">
            <label for="v_ciudad" class="form-label">
              <i class="fa fa-city"></i>
              Ciudad *
            </label>
            <model-select :options="ciudades" 
                          id="v_ciudad" 
                          v-model="ciudad" 
                          class="form-select"
                          placeholder="Seleccione la ciudad">
            </model-select>
          </div>

          <div class="form-group full-width" :class="{'has-error': errors.has('v_direccion')}">
            <label for="v_direccion" class="form-label">
              <i class="fa fa-home"></i>
              Dirección *
            </label>
            <input name="v_direccion" 
                   type="text" 
                   class="form-input"
                   id="v_direccion"
                   placeholder="Ingrese la dirección completa"
                   v-validate="'required|min:5|max:255'"
                   data-vv-as="dirección"
                   v-model="usuario.v_direccion">
            <span v-show="errors.has('v_direccion')" class="error-message">{{ errors.first('v_direccion')}}</span>
          </div>
        </div>
      </div>

      <!-- Información de Documento -->
      <div class="form-section">
        <h3 class="section-title">
          <i class="fa fa-id-card"></i>
          Información de Documento
        </h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="v_tipo_documento" class="form-label">
              <i class="fa fa-file-alt"></i>
              Tipo de Documento *
            </label>
            <model-select :options="tipo_documentos" 
                          id="v_tipo_documento" 
                          v-model="tipo_documento" 
                          class="form-select"
                          placeholder="Seleccione el tipo de documento">
            </model-select>
          </div>

          <div class="form-group" :class="{'has-error': errors.has('v_documento')}">
            <label for="v_documento" class="form-label">
              <i class="fa fa-hashtag"></i>
              Número de Documento *
            </label>
            <input name="v_documento" 
                   type="text" 
                   class="form-input"
                   id="v_documento"
                   placeholder="Ingrese el número de documento"
                   v-validate="'required|min:3|max:25|numeric'"
                   data-vv-as="documento de identificación"
                   v-model="usuario.v_documento">
            <span v-show="errors.has('v_documento')" class="error-message">{{ errors.first('v_documento')}}</span>
          </div>
        </div>
      </div>

      <!-- Información de Contacto -->
      <div class="form-section">
        <h3 class="section-title">
          <i class="fa fa-phone"></i>
          Información de Contacto
        </h3>
        <div class="form-grid">
          <div class="form-group" :class="{'has-error': errors.has('email')}">
            <label for="email" class="form-label">
              <i class="fa fa-envelope"></i>
              Correo Electrónico *
            </label>
            <input name="email" 
                   type="email" 
                   class="form-input"
                   id="email"
                   placeholder="ejemplo@correo.com"
                   v-validate="'required|email|min:5|max:255'"
                   data-vv-as="correo electrónico" 
                   v-model="usuario.email">
            <span v-show="errors.has('email')" class="error-message">{{ errors.first('email')}}</span>
          </div>

          <div class="form-group" :class="{'has-error': errors.has('v_telefono_celular')}">
            <label for="v_telefono_celular" class="form-label">
              <i class="fa fa-mobile-alt"></i>
              Teléfono Celular
            </label>
            <input name="v_telefono_celular" 
                   type="text" 
                   class="form-input"
                   id="v_telefono_celular"
                   placeholder="Número de celular"
                   v-validate="'min:5|max:25|numeric'"
                   data-vv-as="teléfono celular"
                   v-model="usuario.v_telefono_celular">
            <span v-show="errors.has('v_telefono_celular')" class="error-message">{{ errors.first('v_telefono_celular')}}</span>
          </div>

          <div class="form-group" :class="{'has-error': errors.has('v_telefono_fijo')}">
            <label for="v_telefono_fijo" class="form-label">
              <i class="fa fa-phone"></i>
              Teléfono Fijo
            </label>
            <input name="v_telefono_fijo" 
                   type="text" 
                   class="form-input"
                   id="v_telefono_fijo"
                   placeholder="Número de teléfono fijo"
                   v-validate="'min:5|max:25|numeric'"
                   data-vv-as="teléfono fijo"
                   v-model="usuario.v_telefono_fijo">
            <span v-show="errors.has('v_telefono_fijo')" class="error-message">{{ errors.first('v_telefono_fijo')}}</span>
          </div>
        </div>
      </div>

      <!-- Roles -->
      <div class="form-section">
        <h3 class="section-title">
          <i class="fa fa-shield-alt"></i>
          Asignación de Roles
        </h3>
        <div class="roles-section">
          <div class="roles-grid">
            <label v-for="item in roles" :key="item.value" class="role-checkbox">
              <input type="checkbox" 
                     :value="item.text" 
                     v-model="usuario.v_roles"
                     class="checkbox-input">
              <span class="checkbox-custom">
                <i class="fa fa-check"></i>
              </span>
              <span class="checkbox-label">{{ item.text }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Botones de Acción -->
      <div class="form-actions">
        <button type="button" class="btn-cancel" data-dismiss="modal">
          <i class="fa fa-times"></i>
          Cancelar
        </button>
        <button type="submit" 
                class="btn-submit" 
                :disabled="deshabilitar"
                data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Registrando">
          <i class="fa fa-user-plus"></i>
          Registrar Usuario
        </button>
      </div>
    </form>
  </div>
</template>
<script>
  import {ModelSelect} from 'vue-search-select';
  import {mapGetters, mapMutations} from 'vuex';
  import helpers from '../../../helpers';

  export default {
    data() {
      return {
        usuario: {
          v_primer_nombre: null,
          v_segundo_nombre: null,
          v_primer_apellido: null,
          v_segundo_apellido: null,
          v_documento: null,
          v_direccion: null,
          email: null,
          v_telefono_celular: null,
          v_telefono_fijo: null,
          imageAvatar: '',
          avatar: null,
          v_sexo: null,
          d_fechanacimento: null,
          id_m_paises_fk: null,
          id_m_provincias_fk: null,
          id_m_ciudades_fk: null,
          v_nombre_pais: null,
          v_nombre_provincia: null,
          v_nombre_ciudad: null,
          id_m_tipos_documentos_fk: null,
          v_roles:[]
        },
        pais: {
          value: '',
          text: ''
        },
        provincia: {
          value: '',
          text: ''
        },
        ciudad: {
          value: '',
          text: ''
        },
        tipo_documento: {
          value: '',
          text: ''
        },
        usuario_asesor: {
          value: '',
          text: ''
        },
        usuario_cliente: {
          value: '',
          text: ''
        },
        imageAvatar:'',
        paises: [],
        provincias: [],
        ciudades: [],
        tipo_documentos: [],
        roles:[]
      }
    },
    props: [],
    created() {
      this.dataPais = this.pais;

      this.$http.get('api/paises')
        .then(response => {
          this.paises = response.body;
        }, () => {
          this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
        });
      let token = this.getUsuario.token;
      this.$http.get('api/avanzamas/roles?tipo=pluck', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(response => {
          this.roles = response.body;
        }, () => {
          this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
        });
    },
    components: {ModelSelect},
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !( !this.errors.has('v_primer_nombre') && !this.errors.has('v_primer_apellido') && !this.errors.has('v_direccion')
          && !this.errors.has('v_pais') && !this.errors.has('v_documento') && !this.errors.has('v_telefono_celular') && !this.errors.has('v_telefono_fijo')
        );
      }
    }),
    methods: {
      seleccionarPais(event) {
        this.provincias = [];
        this.$http.get('api/provincias/' + event.value)
          .then(response => {
            this.provincias = response.body.provincias;
            this.tipo_documentos = response.body.tipo_documentos;
          }, errors => {
            this.$toastr('error', "Disculpa pero en estos momentos no estamos operando en ese país.", "Error");
          });
      },
      seleccionarProvincia(event) {
        this.ciudades = [];
        this.$http.get('api/ciudades/' + event.value)
          .then(response => {
            this.ciudades = response.body;
          }, errors => {
            this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
          });
      },
      onFileChangeAvatar(e) {
        this.usuario.avatar = e.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createAvatar(files[0]);
      },
      createAvatar(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.imageAvatar = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImageAvatar: function (e) {
        this.usuario.avatar = '';
        this.imageAvatar = '';
        // Limpiar el input file
        const fileInput = document.getElementById('avatar');
        if (fileInput) {
          fileInput.value = '';
        }
      },
      registrar() {
        this.$validator.validateAll().then(() => {
          let token = this.getUsuario.token;
          let boton_registrar = $('#submitButton');
          boton_registrar.button('loading');
          let formData = new FormData();
          formData.append('v_primer_nombre', this.usuario.v_primer_nombre);
          formData.append('v_segundo_nombre', this.usuario.v_segundo_nombre);
          formData.append('v_primer_apellido', this.usuario.v_primer_apellido);
          formData.append('v_segundo_apellido', this.usuario.v_segundo_apellido);
          formData.append('id_m_paises_fk', this.pais.value);
          formData.append('id_m_provincias_fk', this.provincia.value);
          formData.append('id_m_ciudades_fk', this.ciudad.value);
          formData.append('v_nombre_pais', this.pais.text);
          formData.append('v_nombre_provincia', this.provincia.text);
          formData.append('v_nombre_ciudad', this.ciudad.text);
          formData.append('id_m_tipos_documentos_fk', this.tipo_documento.value);
          formData.append('v_documento', this.usuario.v_documento);
          formData.append('v_telefono_celular', this.usuario.v_telefono_celular);
          formData.append('email', this.usuario.email);
          formData.append('d_fechanacimiento', this.usuario.d_fechanacimiento);
          formData.append('v_sexo', this.usuario.v_sexo);
          formData.append('v_roles', JSON.stringify(this.usuario.v_roles));
          if (this.usuario.v_telefono_fijo)
            formData.append('v_telefono_fijo', this.usuario.v_telefono_fijo);
          formData.append('v_direccion', this.usuario.v_direccion);
          formData.append('avatar', this.usuario.avatar);
          formData.append('v_password', '12345678');
          formData.append('v_password_confirmation', '12345678');
          console.log(formData);
          let yo = this;
          this.$http.post('api/avanzamas/usuarios',formData, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
            .then(response => {
              boton_registrar.button('reset');
              yo.$toastr('success', response.body.mensaje, "Acción exitosa");
              $('#modal').modal('hide');
              yo.v_nombre = '';
              yo.v_iso2 = '';
              yo.v_iso3 = '';
              yo.v_prefijo_telefonico = '';
              yo.n_latitud = '';
              yo.n_longitud = '';
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
/* Estilos para el modal de registro de usuarios */
.user-register-modal {
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

.modal-title {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  font-weight: 300;
}

.modal-subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

/* Formulario */
.register-form {
  padding: 30px;
  background: white;
}

.form-section {
  margin-bottom: 40px;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #ff6633;
}

.section-title {
  font-size: 1.4rem;
  color: #333;
  margin: 0 0 25px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.section-title i {
  color: #ff6633;
  font-size: 1.2rem;
}

/* Avatar Section */
.avatar-upload-section {
  text-align: center;
}

.avatar-upload {
  max-width: 300px;
  margin: 0 auto;
}

.upload-area {
  border: 3px dashed #e1e5e9;
  border-radius: 12px;
  padding: 40px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  position: relative;
}

.upload-area:hover {
  border-color: #ff6633;
  background: #fff5f2;
}

.upload-area.has-error {
  border-color: #e74c3c;
  background: #fdf2f2;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-content {
  text-align: center;
}

.upload-content i {
  font-size: 3rem;
  color: #ff6633;
  margin-bottom: 15px;
  display: block;
}

.upload-content p {
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 10px 0;
  font-weight: 500;
}

.upload-hint {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.avatar-preview {
  max-width: 200px;
  margin: 0 auto;
}

.preview-container {
  position: relative;
  display: inline-block;
}

.preview-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ff6633;
  box-shadow: 0 4px 20px rgba(255, 102, 51, 0.3);
}

.remove-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 30px;
  height: 30px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #c0392b;
  transform: scale(1.1);
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.form-group {
  position: relative;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-label i {
  color: #ff6633;
  font-size: 0.9rem;
}

.form-input,
.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #333;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #ff6633;
  box-shadow: 0 0 0 3px rgba(255, 102, 51, 0.1);
  transform: translateY(-1px);
}

.form-input::placeholder {
  color: #95a5a6;
  font-style: italic;
}

.form-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 40px;
}

.form-group.has-error .form-input,
.form-group.has-error .form-select {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.error-message {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 5px;
  display: block;
  font-weight: 500;
}

/* Roles Section */
.roles-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e1e5e9;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.role-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 2px solid #e1e5e9;
  background: white;
}

.role-checkbox:hover {
  border-color: #ff6633;
  background: #fff5f2;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #e1e5e9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: white;
}

.checkbox-input:checked + .checkbox-custom {
  background: #ff6633;
  border-color: #ff6633;
  color: white;
}

.checkbox-input:checked + .checkbox-custom i {
  display: block;
}

.checkbox-custom i {
  display: none;
  font-size: 0.8rem;
}

.checkbox-label {
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  padding-top: 30px;
  border-top: 1px solid #e1e5e9;
  margin-top: 30px;
}

.btn-cancel,
.btn-submit {
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  min-width: 150px;
  justify-content: center;
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
}

.btn-submit {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 102, 51, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-header-custom {
    padding: 20px;
  }
  
  .modal-title {
    font-size: 2rem;
  }
  
  .register-form {
    padding: 20px;
  }
  
  .form-section {
    padding: 20px;
    margin-bottom: 30px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .roles-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-cancel,
  .btn-submit {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .user-register-modal {
    margin: 10px;
  }
  
  .modal-header-custom {
    padding: 15px;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .register-form {
    padding: 15px;
  }
  
  .form-section {
    padding: 15px;
  }
  
  .upload-area {
    padding: 30px 15px;
  }
  
  .preview-image {
    width: 120px;
    height: 120px;
  }
}
</style>
