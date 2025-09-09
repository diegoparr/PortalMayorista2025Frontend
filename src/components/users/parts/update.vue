<template>
  <div class="user-edit-modal">
    <!-- Header del Modal -->
    <div class="modal-header-custom">
      <div class="header-content">
        <div class="header-icon">
          <i class="fa fa-user-edit"></i>
        </div>
        <div class="header-text">
          <h2 class="modal-title">Editar Usuario</h2>
          <p class="modal-subtitle">Modifica la información del usuario</p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div class="loading-container" v-if="!peticionesCompletas">
      <div class="loading-spinner">
        <i class="fa fa-spinner fa-spin"></i>
      </div>
      <p>Cargando información del usuario...</p>
    </div>

    <!-- Formulario de Edición -->
    <form v-on:submit.prevent="actualizar" v-else class="edit-form">
      <!-- Sección de Avatar -->
      <div class="form-section">
        <h3 class="section-title">
          <i class="fa fa-image"></i>
          Imagen de Perfil
        </h3>
        <div class="avatar-section">
          <div v-if="!imageAvatar" class="avatar-upload">
            <div :class="{'form-group': true, 'has-error': errors.has('avatar') }">
              <label for="avatar" class="upload-label">
                <i class="fa fa-cloud-upload-alt"></i>
                Seleccionar Imagen
              </label>
              <input v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
                     name="avatar"
                     type="file"
                     v-on:change="onFileChangeAvatar"
                     data-vv-as="imagen avatar"
                     accept="image/*"
                     id="avatar"
                     class="file-input">
              <span v-show="errors.has('avatar')" class="error-message">
                {{ errors.first('avatar')}}
              </span>
            </div>
          </div>
          <div v-else class="avatar-preview">
            <div class="preview-container">
              <img :src="imageAvatar" class="preview-image" alt="Avatar preview">
              <div class="preview-overlay">
                <v-btn @click.prevent="removeImageAvatar" color="error" small>
                  <i class="fa fa-trash"></i>
                  Quitar Imagen
                </v-btn>
              </div>
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
          <div class="form-group-wrapper">
            <div :class="(!errors.first('v_primer_nombre'))?'form-group':'form-group has-error'">
              <label for="v_primer_nombre">Primer Nombre *</label>
              <input placeholder="Primer nombre del usuario" 
                     name="v_primer_nombre" 
                     type="text" 
                     class="form-control"
                     v-validate="'required|alpha_spaces|min:2|max:100'"
                     data-vv-as="Primer nombre" 
                     v-model="usuario.v_primer_nombre" 
                     required 
                     id="v_primer_nombre">
              <span v-show="errors.has('v_primer_nombre')" class="error-message">
                {{ errors.first('v_primer_nombre')}}
              </span>
            </div>
          </div>
          <div class="form-group-wrapper">
            <div :class="(!errors.first('v_segundo_nombre'))?'form-group':'form-group has-error'">
              <label for="v_segundo_nombre">Segundo Nombre</label>
              <input placeholder="Segundo nombre del usuario" 
                     name="v_segundo_nombre" 
                     type="text" 
                     class="form-control"
                     v-validate="'alpha_spaces|min:2|max:100'"
                     data-vv-as="Segundo nombre" 
                     v-model="usuario.v_segundo_nombre"  
                     id="v_segundo_nombre">
              <span v-show="errors.has('v_segundo_nombre')" class="error-message">
                {{ errors.first('v_segundo_nombre')}}
              </span>
            </div>
          </div>
          <div class="form-group-wrapper">
            <div :class="(!errors.first('v_primer_apellido'))?'form-group':'form-group has-error'">
              <label for="v_primer_apellido">Primer Apellido *</label>
              <input placeholder="Primer apellido del usuario" 
                     name="v_primer_apellido" 
                     type="text" 
                     class="form-control"
                     v-validate="'required|alpha_spaces|min:2|max:100'"
                     data-vv-as="Primer apellido" 
                     v-model="usuario.v_primer_apellido" 
                     required 
                     id="v_primer_apellido">
              <span v-show="errors.has('v_primer_apellido')" class="error-message">
                {{ errors.first('v_primer_apellido')}}
              </span>
            </div>
          </div>
          <div class="form-group-wrapper">
            <div :class="(!errors.first('v_segundo_apellido'))?'form-group':'form-group has-error'">
              <label for="v_segundo_apellido">Segundo Apellido</label>
              <input placeholder="Segundo apellido del usuario" 
                     name="v_segundo_apellido" 
                     type="text" 
                     class="form-control"
                     v-validate="'alpha_spaces|min:2|max:100'"
                     data-vv-as="Segundo apellido" 
                     v-model="usuario.v_segundo_apellido"  
                     id="v_segundo_apellido">
              <span v-show="errors.has('v_segundo_apellido')" class="error-message">
                {{ errors.first('v_segundo_apellido')}}
              </span>
            </div>
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
          <div class="form-group-wrapper">
            <div class="form-group">
              <label for="v_pais">País *</label>
              <model-select :options="paises" 
                           id="v_pais" 
                           v-model="pais" 
                           class="form-control"
                           v-on:input="seleccionarPais"
                           title="Selecciona el país"
                           required>
              </model-select>
            </div>
          </div>
          <div class="form-group-wrapper">
            <div class="form-group">
              <label for="v_provincia">Provincia *</label>
              <model-select :options="provincias" 
                           id="v_provincia" 
                           v-model="provincia" 
                           class="form-control"
                           v-on:input="seleccionarProvincia"
                           title="Selecciona la provincia"
                           required>
              </model-select>
            </div>
          </div>
          <div class="form-group-wrapper">
            <div class="form-group">
              <label for="v_ciudad">Ciudad *</label>
              <model-select :options="ciudades" 
                           id="v_ciudad" 
                           v-model="ciudad" 
                           class="form-control"
                           title="Selecciona la ciudad"
                           required>
              </model-select>
            </div>
          </div>
          <div class="form-group-wrapper full-width">
            <div :class="(!errors.first('v_direccion'))?'form-group':'form-group has-error'">
              <label for="v_direccion">Dirección Principal *</label>
              <input placeholder="Dirección completa" 
                     name="v_direccion" 
                     type="text" 
                     class="form-control"
                     required 
                     id="v_direccion" 
                     v-on:change="direccionPrincipal"
                     data-vv-as="dirección"
                     v-model="usuario.v_direccion" 
                     v-validate="'required|min:5|max:255'">
              <span v-show="errors.has('v_direccion')" class="error-message">
                {{ errors.first('v_direccion')}}
              </span>
            </div>
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
          <div class="form-group-wrapper">
            <div class="form-group">
              <label for="v_tipo_documento">Tipo de Documento *</label>
              <model-select :options="tipo_documentos" 
                           id="v_tipo_documento" 
                           v-model="tipo_documento" 
                           class="form-control"
                           title="Selecciona el tipo de documento"
                           required>
              </model-select>
            </div>
          </div>
          <div class="form-group-wrapper">
            <div :class="(!errors.first('v_documento'))?'form-group':'form-group has-error'">
              <label for="v_documento">Número de Documento *</label>
              <input placeholder="Número de documento" 
                     name="v_documento" 
                     type="text" 
                     class="form-control"
                     required 
                     id="v_documento"
                     data-vv-as="documento de identificación"
                     v-model="usuario.v_documento" 
                     v-validate="'required|min:3|max:25|numeric'">
              <span v-show="errors.has('v_documento')" class="error-message">
                {{ errors.first('v_documento')}}
              </span>
            </div>
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
          <div class="form-group-wrapper">
            <div :class="(!errors.first('v_telefono_celular'))?'form-group':'form-group has-error'">
              <label for="v_telefono_celular">Teléfono Celular</label>
              <input placeholder="Número de celular" 
                     name="v_telefono_celular" 
                     type="text" 
                     class="form-control"
                     id="v_telefono_celular"
                     data-vv-as="teléfono celular"
                     v-model="usuario.v_telefono_celular" 
                     v-validate="'min:5|max:25|numeric'">
              <span v-show="errors.has('v_telefono_celular')" class="error-message">
                {{ errors.first('v_telefono_celular')}}
              </span>
            </div>
          </div>
          <div class="form-group-wrapper">
            <div :class="(!errors.first('v_telefono_fijo'))?'form-group':'form-group has-error'">
              <label for="v_telefono_fijo">Teléfono Fijo</label>
              <input placeholder="Número de teléfono fijo" 
                     name="v_telefono_fijo" 
                     type="text" 
                     class="form-control"
                     id="v_telefono_fijo"
                     data-vv-as="teléfono fijo"
                     v-model="usuario.v_telefono_fijo" 
                     v-validate="'min:5|max:25|numeric'">
              <span v-show="errors.has('v_telefono_fijo')" class="error-message">
                {{ errors.first('v_telefono_fijo')}}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Roles del Usuario -->
      <div class="form-section">
        <h3 class="section-title">
          <i class="fa fa-shield-alt"></i>
          Roles y Permisos
        </h3>
        <div class="roles-section">
          <label class="roles-label">Roles Asignados</label>
          <div class="roles-grid">
            <label v-for="item in roles" :key="item.value" class="role-checkbox">
              <input type="checkbox" 
                     :value="item.text" 
                     v-model="usuario.v_roles"
                     class="role-input">
              <span class="role-text">{{ item.text }}</span>
            </label>
          </div>
        </div>
      </div>
      <!-- Botones de Acción -->
      <div class="form-actions">
        <div class="actions-container">
          <v-btn color="primary" 
                 type="submit" 
                 id="submitButton" 
                 :disabled="deshabilitar"
                 class="btn-save"
                 data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando">
            <i class="fa fa-save"></i>
            Guardar Cambios
          </v-btn>
          <button type="button" 
                  class="btn-cancel" 
                  @click="$emit('cerrar_modal')">
            <i class="fa fa-times"></i>
            Cancelar
          </button>
        </div>
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
        peticionesCompletas: false,
        imageAvatar: '',
        usuario: {
          v_documento: null,
          v_nombre: null,
          avatar: null,
          v_telefono_celular: null,
          v_telefono_fijo: null,
          v_direccion: null,
          v_roles:[],
        },
        rols: [],
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
        paises: [],
        provincias: [],
        ciudades: [],
        tipo_documentos: [],
        usuarios_asesores: [],
        usuarios_clientes: [],
      }
    },
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('v_documento') && !this.errors.has('v_primer_nombre') && !this.errors.has('v_primer_apellido')
          && !this.errors.has('v_telefono_principal') && !this.errors.has('v_telefono_secundario')
          && !this.errors.has('v_direccion') && !this.errors.has('avatar')
        );
      }
    }),
    props: ['updateUsuario'],
    created() {
      this.usuario = this.updateUsuario;

      let i = 0;
      for(let role in this.usuario.rols)
      {
        this.rols[i] = this.usuario.rols[i].name ;
        i++;
      }

      console.log("el rol es", this.rols);
      this.usuario.v_roles = this.rols;
      this.imageAvatar = this.usuario.v_avatar;
      let token = this.getUsuario.token;
      let yo = this;
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
      this.$http.get('api/paises')
        .then(response => {
          this.paises = [];
          this.paises = response.body;
          yo.$http.get('api/provincias/' + this.usuario.id_m_paises_fk)
            .then(response => {
              this.provincias = [];
              this.provincias = response.body.provincias;
              this.tipo_documentos = response.body.tipo_documentos;
              yo.$http.get('api/ciudades/' + this.usuario.id_m_provincias_fk)
                .then(response => {
                  this.ciudades = [];
                  this.ciudades = response.body;
                      yo.peticionesCompletas = true;
                    }, errors => {
                      this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
                    });
                  }, errors => {
                    this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
                  });
                }, errors => {
                  this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
                });

      this.pais = {
        value: this.usuario.id_m_paises_fk,
        text: this.usuario.v_nombre_pais
      };
      this.provincia = {
        value: this.usuario.id_m_provincias_fk,
        text: this.usuario.v_nombre_provincia
      };
      this.ciudad = {
        value: this.usuario.id_m_ciudades_fk,
        text: this.usuario.v_nombre_ciudad
      };
      this.tipo_documento = {
        value: this.usuario.id_m_tipos_documentos_fk,
        text: this.usuario.tipo_documentos.v_des_tipo_documento
      };

      for (let i = 0; i < this.usuario.telefonos.length; i++) {
        let telefono = this.usuario.telefonos[i];
        if (telefono.b_principal)
          yo.usuario.v_telefono_celular = telefono.v_telefono;
        else
          yo.usuario.v_telefono_fijo = telefono.v_telefono;
      }
      for (let i = 0; i < this.usuario.direcciones.length; i++) {
        let direccion = this.usuario.direcciones[i];
        if (direccion.b_principal)
          yo.usuario.v_direccion = direccion.v_direccion;
      }
      $(function () {
        $('[]').tooltip()
      });
    },
    components: {ModelSelect},
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
        this.usuario.avatar = event.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImageAvatar(files[0]);
      },
      createImageAvatar(file) {
        let reader = new FileReader();
        let vm = this;
        this.actualizarRut = true;
        reader.onload = (e) => {
          vm.imageAvatar = e.target.result;
          let token = this.getUsuario.token;
          let formData = new FormData();
          formData.append('imagen', vm.usuario.avatar);
          formData.append('ruta', 'avatars');
          formData.append('fieldname','v_avatar');
          this.$http.post('api/avanzamas/imagenes/' + this.usuario.id + '?tipo=usuario', formData, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then(response => {
            this.usuario.v_avatar = response.body;
            console.log(response.data);
          }, errors => {
            console.log(errors);
          });
        };
        reader.readAsDataURL(file);
      },
      removeImageAvatar: function (e) {
        this.usuario.avatar = '';
        this.imageAvatar = '';
      },


      direccionPrincipal() {
        this.actualizarDireccionPrincipal = true;
      },
      telefonoPrincipal() {
        this.actualizarTelefonoPrincipal = true;
      },
      telefonoSecundario() {
        this.actualizarTelefonoSecundario = true;
      },
      nombreActualizar() {
        this.actualizarNombre = true;
      },
      actualizar() {
        this.$validator.validateAll().then(() => {
          let token = this.getUsuario.token;
          let boton_editar = $('#submitButton');
          boton_editar.button('loading');
          let yo = this;
          this.usuario.v_nombre_pais = this.pais.text;
          this.usuario.v_nombre_provincia = this.provincia.text;
          this.usuario.v_nombre_ciudad = this.ciudad.text;
          this.$http.put('api/avanzamas/usuarios/' + this.usuario.id, this.usuario, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then(response => {
            boton_editar.button('reset');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
            $('#modal').modal('hide');
            yo.$emit('actualizar');
          }, errors => {
            console.log(errors);
            if (errors.status === 422) {
              for (let err in errors.body.errors) {
                errors.body.errors[err].forEach(function (value) {
                  yo.$toastr('error', value, "Validación");
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
/* Estilos para el modal de edición de usuario */
.user-edit-modal {
  background: #f8f9fa;
  border-radius: 15px;
  overflow: hidden;
  max-height: 90vh;
  overflow-y: auto;
}

/* Header del Modal */
.modal-header-custom {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
  padding: 25px 30px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.header-icon {
  font-size: 2.5rem;
  opacity: 0.9;
}

.modal-title {
  font-size: 1.8rem;
  margin: 0 0 5px 0;
  font-weight: 300;
}

.modal-subtitle {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
}

/* Loading State */
.loading-container {
  text-align: center;
  padding: 60px 20px;
  background: white;
}

.loading-spinner {
  font-size: 3rem;
  color: #ff6633;
  margin-bottom: 20px;
}

.loading-container p {
  color: #666;
  font-size: 1.1rem;
}

/* Formulario */
.edit-form {
  background: white;
  padding: 0;
}

/* Secciones del Formulario */
.form-section {
  padding: 35px;
  border-bottom: 1px solid #e9ecef;
  background: white;
  position: relative;
  transition: all 0.3s ease;
}

.form-section:hover {
  background: #fafbfc;
}

.form-section:last-child {
  border-bottom: none;
}

.form-section::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  border-radius: 0 2px 2px 0;
}

.section-title {
  font-size: 1.4rem;
  color: #333;
  margin: 0 0 30px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  border-radius: 2px;
}

.section-title i {
  color: #ff6633;
  font-size: 1.3rem;
  background: rgba(255, 102, 51, 0.1);
  padding: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Grid del Formulario */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 10px;
}

.form-group-wrapper {
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.form-group-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.form-group-wrapper:hover {
  background: white;
  border-color: #ff6633;
  box-shadow: 0 4px 20px rgba(255, 102, 51, 0.1);
  transform: translateY(-2px);
}

.form-group-wrapper:hover::before {
  transform: scaleX(1);
}

.form-group-wrapper.full-width {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px solid #e9ecef;
}

.form-group-wrapper.full-width:hover {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #ff6633;
}

/* Avatar Section */
.avatar-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  border: 2px dashed #ff6633;
  position: relative;
  overflow: hidden;
}

.avatar-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 102, 51, 0.05) 0%, rgba(124, 124, 124, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-section:hover::before {
  opacity: 1;
}

.avatar-upload {
  text-align: center;
  position: relative;
  z-index: 2;
}

.upload-label {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #ff6633 0%, #e55a2b 100%);
  color: white;
  padding: 18px 40px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  border: none;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(255, 102, 51, 0.3);
  position: relative;
  overflow: hidden;
}

.upload-label::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.upload-label:hover {
  background: linear-gradient(135deg, #e55a2b 0%, #d44a1a 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 102, 51, 0.4);
}

.upload-label:hover::before {
  left: 100%;
}

.file-input {
  display: none;
}

.avatar-preview {
  position: relative;
  z-index: 2;
}

.preview-container {
  position: relative;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(255, 102, 51, 0.3);
  transition: all 0.3s ease;
}

.preview-container:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(255, 102, 51, 0.4);
}

.preview-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #ff6633;
  display: block;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(255, 102, 51, 0.7) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(2px);
}

.preview-container:hover .preview-overlay {
  opacity: 1;
}

/* Form Groups */
.form-group {
  margin-bottom: 0;
  position: relative;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
}

.form-group label::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 30px;
  height: 2px;
  background: #ff6633;
  border-radius: 1px;
}

.form-control {
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.form-control:focus {
  border-color: #ff6633;
  box-shadow: 0 0 0 4px rgba(255, 102, 51, 0.1);
  outline: none;
  background: white;
  transform: translateY(-1px);
}

.form-control:hover:not(:focus) {
  border-color: #ff6633;
  background: white;
}

.form-group.has-error .form-control {
  border-color: #dc3545;
  background: #fff5f5;
  box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.1);
}

.form-group.has-error label::after {
  background: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 8px;
  display: block;
  font-weight: 500;
  padding-left: 5px;
  position: relative;
}

.error-message::before {
  content: '⚠';
  margin-right: 5px;
  font-size: 0.9rem;
}

/* Roles Section */
.roles-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 25px;
  border-radius: 15px;
  border: 2px solid #e9ecef;
  position: relative;
  overflow: hidden;
}

.roles-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
}

.roles-label {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  padding-left: 15px;
}

.roles-label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: #ff6633;
  border-radius: 2px;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
}

.role-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  background: white;
  border-radius: 12px;
  border: 2px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.role-checkbox::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 102, 51, 0.05) 0%, rgba(124, 124, 124, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.role-checkbox:hover {
  background: #f8f9fa;
  border-color: #ff6633;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 102, 51, 0.1);
}

.role-checkbox:hover::before {
  opacity: 1;
}

.role-checkbox:has(.role-input:checked) {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  border-color: #ff6633;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 102, 51, 0.3);
}

.role-input {
  margin: 0;
  width: 18px;
  height: 18px;
  accent-color: #ff6633;
}

.role-text {
  font-size: 0.95rem;
  color: #333;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.role-checkbox:has(.role-input:checked) .role-text {
  color: white;
}

/* Botones de Acción */
.form-actions {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 30px;
  border-top: 3px solid #ff6633;
  position: relative;
}

.form-actions::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
}

.actions-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 0 auto;
}

.btn-save {
  background: linear-gradient(135deg, #ff6633 0%, #e55a2b 100%);
  color: white;
  border: none;
  padding: 15px 35px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 180px;
  justify-content: center;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(255, 102, 51, 0.3);
}

.btn-save::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 102, 51, 0.4);
}

.btn-save:hover:not(:disabled)::before {
  left: 100%;
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-cancel {
  background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
  color: white;
  border: none;
  padding: 15px 35px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 140px;
  justify-content: center;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
}

.btn-cancel::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-cancel:hover {
  background: linear-gradient(135deg, #5a6268 0%, #495057 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
}

.btn-cancel:hover::before {
  left: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-header-custom {
    padding: 20px;
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .form-section {
    padding: 20px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .roles-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-container {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-save,
  .btn-cancel {
    width: 100%;
    max-width: 250px;
  }
}

@media (max-width: 480px) {
  .user-edit-modal {
    margin: 10px;
  }
  
  .modal-header-custom {
    padding: 15px;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .form-section {
    padding: 15px;
  }
  
  .preview-image {
    width: 120px;
    height: 120px;
  }
  
  .upload-label {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
}
</style>
