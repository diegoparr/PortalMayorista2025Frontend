<template>
  <form v-on:submit.prevent="registrar" class="modern-form">
    <div class="row">
      <div class="col-xs-12" align="center">
        <div v-if="!usuario.v_avatar">
          <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('avatar') }">
            <label for="avatar" class="modern-label">Avatar</label>
            <input v-validate="'image|mimes:image/jpeg,image/png,image/jpg'"
                   name="avatar"
                   type="file"
                   v-on:change="onFileChangeAvatar"
                   data-vv-as="Avatar"
                   accept="image/*"
                   id="avatar">
            <span v-show="errors.has('avatar')"
                  class="help-block modern-error">{{ errors.first('avatar')}}
            </span>
          </div>
        </div>
        <div align="center" class="container-imgs" v-else>
         <div class="col-md-12">
          <img :src="imageAvatar"
               class="centrar-imagen imagen-previsualizar">
         </div>
          <div class="col-md-12">
          <v-btn  @click="removeImageAvatar" color="error">
            <i class="fa fa-trash pull-left" aria-hidden="true"></i>
            Quitar Avatar
          </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_primer_nombre'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_primer_nombre" class="modern-label">Primer Nombre</label>
          <input name="v_primer_nombre" type="text" class="form-control modern-input"
                  data-placement="left"  id="v_primer_nombre"
                 title="Ingrese el primer nombre del usuario" v-validate="'required|alpha_spaces|min:2|max:100'"
                 data-vv-as="primer nombre del usuario" v-model="usuario.v_primer_nombre">
          <span v-show="errors.has('v_primer_nombre')" class="help-block modern-error">{{ errors.first('v_primer_nombre')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_segundo_nombre'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_segundo_nombre" class="modern-label">Segundo Nombre</label>
          <input name="v_segundo_nombre" type="text" class="form-control modern-input"
                  data-placement="left"  id="v_segundo_nombre"
                 title="Ingrese el segundo nombre del usuario" v-validate="'alpha_spaces|min:2|max:100'"
                 data-vv-as="segundo nombre del usuario" v-model="usuario.v_segundo_nombre">
          <span v-show="errors.has('v_segundo_nombre')" class="help-block modern-error">{{ errors.first('v_segundo_nombre')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_primer_apellido'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_primer_apellido" class="modern-label">Primer Apellido</label>
          <input name="v_primer_apellido" type="text" class="form-control modern-input"
                  data-placement="left"  id="v_primer_apellido"
                 title="Ingrese el primer apellido del usuario" v-validate="'required|alpha_spaces|min:2|max:100'"
                 data-vv-as="primer apellido del usuario" v-model="usuario.v_primer_apellido">
          <span v-show="errors.has('v_primer_apellido')"
                class="help-block modern-error">{{ errors.first('v_primer_apellido')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_segundo_apellido'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_segundo_apellido" class="modern-label">Segundo Apellido</label>
          <input name="v_segundo_apellido" type="text" class="form-control modern-input"
                  data-placement="left"  id="v_segundo_apellido"
                 title="Ingrese el segundo apellido del usuario" v-validate="'alpha_spaces|min:2|max:100'"
                 data-vv-as="segundo apellido del usuario" v-model="usuario.v_segundo_apellido">
          <span v-show="errors.has('v_segundo_apellido')"
                class="help-block modern-error">{{ errors.first('v_segundo_apellido')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div class="form-group modern-form-group">
          <label for="v_pais" class="modern-label">País</label>
          <model-select :options="paises" id="v_pais" v-model="pais" class="form-control modern-select"
                         v-on:input="seleccionarPais"
                        data-placement="left" title="Selecciona el país en que se encuentra la tienda"
                        v-validate="'required'">
          </model-select>
          <span v-show="errors.has('v_pais')"
                class="help-block modern-error">{{ errors.first('v_pais')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div class="form-group modern-form-group">
          <label for="v_provincia" class="modern-label">Provincia</label>
          <model-select :options="provincias" id="v_provincia" v-model="provincia" class="form-control modern-select"
                         v-on:input="seleccionarProvincia"
                        data-placement="left" title="Selecciona la provincia"
                        required>
          </model-select>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div class="form-group modern-form-group">
          <label for="v_ciudad" class="modern-label">Ciudad</label>
          <model-select :options="ciudades" id="v_ciudad" v-model="ciudad" class="form-control modern-select"

                        data-placement="left" title="Selecciona la ciudad"
                        required>
          </model-select>
        </div>
      </div>
      <div class="col-xs-12 col-md-12">
        <div :class="(!errors.first('v_direccion'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_direccion" class="modern-label">Dirección</label>
          <input placeholder="Dirección" name="v_direccion" type="text" class="form-control modern-input"
                  data-placement="left"  id="v_direccion"
                 title="Ingresa la dirección principal de la tienda" data-vv-as="dirección"
                 v-model="usuario.v_direccion" v-validate="'required|min:5|max:255'">
          <span v-show="errors.has('v_direccion')"
                class="help-block modern-error">{{ errors.first('v_direccion')}}</span>
        </div>
      </div>
      <div class="col-xs-6 col-md-6">
        <div class="form-group modern-form-group">
          <label for="v_tipo_documento" class="modern-label">Tipo de Documento</label>
          <model-select :options="tipo_documentos" id="v_tipo_documento" v-model="tipo_documento" class="form-control modern-select"

                        data-placement="left"
                        title="Selecciona el tipo de documento de identificación que posee la tienda"
                        required>
          </model-select>
        </div>
      </div>
      <div class="col-xs-6 col-md-6">
        <div :class="(!errors.first('v_documento'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_documento" class="modern-label">Documento</label>
          <input placeholder="Documento" name="v_documento" type="text" class="form-control modern-input"
                  data-placement="left"  id="v_documento"
                 title="Ingresa el número de documento de identificación"
                 data-vv-as="documento de identificación"
                 v-model="usuario.v_documento" v-validate="'required|min:3|max:25|numeric'">
          <span v-show="errors.has('v_documento')"
                class="help-block modern-error">{{ errors.first('v_documento')}}</span>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('d_fechanacimiento'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_documento" class="modern-label">Fecha de Nacimiento</label>
          <input placeholder="Fecha de Nacimiento" name="d_fechanacimiento" type="date" class="form-control modern-input"
                  data-placement="left"  id="d_fechanacimiento"
                 title="Ingresa la Fecha de Nacimiento"
                 data-vv-as="fecha de Nacimiento"
                 v-model="usuario.d_fechanacimiento" v-validate="'required'">
          <span v-show="errors.has('d_fechanacimiento')"
                class="help-block modern-error">{{ errors.first('d_fechanacimiento')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_sexo'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_documento" class="modern-label">Sexo</label>
          <select class="form-control modern-select" name="v_sexo"  data-placement="left"
                  title="Selecciona tu sexo" data-vv-as="sexo"
                  v-model="usuario.v_sexo" v-validate="'required'" >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          <span v-show="errors.has('v_sexo')"
                class="help-block modern-error">{{ errors.first('v_sexo')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('email'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="email" class="modern-label">Correo electrónico</label>
          <input placeholder="Correo electrónico" name="email" type="email" class="form-control modern-input"
                  data-placement="left" v-validate="'required|email|min:5|max:255'"
                 data-vv-as="correo electrónico" v-model="usuario.email"
                 title="Ingresa tu correo electrónico, por ejemplo example@example.com">
          <span v-show="errors.has('email')"
                class="help-block modern-error">{{ errors.first('email')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('v_telefono_celular'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_telefono_celular" class="modern-label">Teléfono Celular</label>
          <input placeholder="Teléfono Celular" name="v_telefono_celular" type="text" class="form-control modern-input"
                  data-placement="left" id="v_telefono_celular"
                 title="Ingresa el teléfono" data-vv-as="teléfono"
                 v-model="usuario.v_telefono_celular" v-validate="'min:5|max:25|numeric'">
          <span v-show="errors.has('v_telefono_celular')"
                class="help-block modern-error">{{ errors.first('v_telefono_celular')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('v_telefono_fijo'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_telefono_fijo" class="modern-label">Teléfono Fijo</label>
          <input placeholder="Teléfono Fijo" name="v_telefono_fijo" type="text" class="form-control modern-input"
                  data-placement="left" id="v_telefono_fijo"
                 title="Ingresa el teléfono" data-vv-as="teléfono"
                 v-model="usuario.v_telefono_fijo" v-validate="'min:5|max:25|numeric'">
          <span v-show="errors.has('v_telefono_fijo')"
                class="help-block modern-error">{{ errors.first('v_telefono_fijo')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-12">
          <label for="v_roles" class="modern-label">Roles</label>
            <label v-for="item in roles" class="checkbox-inline">
              <input type="checkbox" v-bind:value="item.text" id="v_roles"  v-model="usuario.v_roles">{{ item.text }}</label>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" align="center">
        <div class="form-group">
          <v-btn color="primary" type="submit" id="submitButton" :disabled="deshabilitar"
                  data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Registrando">
            <i class="fa fa-user pull-left"></i> Registrar
          </v-btn>
        </div>
      </div>
    </div>
  </form>
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
        this.usuario.avatar = event.target.files[0];
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
/* Estilos modernos para el formulario de registro de usuarios */

.modern-form {
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.modern-form-group {
  margin-bottom: 25px;
  position: relative;
}

.modern-label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modern-input,
.modern-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #ffffff;
  color: #2c3e50;
}

.modern-input:focus,
.modern-select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  transform: translateY(-1px);
}

.modern-input::placeholder {
  color: #95a5a6;
  font-style: italic;
}

.modern-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 40px;
}

.modern-error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  display: block;
  font-weight: 500;
}

/* ===== ESTILOS ESPECÍFICOS PARA CENTRADO PERFECTO ===== */

/* Asegurar centrado absoluto del texto en model-select */
.modern-form .model-select .ui.fluid.search.selection.dropdown {
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 48px !important;
  padding: 12px 16px !important;
  box-sizing: border-box !important;
}

/* Centrar texto de manera absoluta */
.modern-form .model-select .ui.fluid.search.selection.dropdown .text {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: calc(100% - 60px) !important;
  text-align: center !important;
  color: #2c3e50 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.2 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  pointer-events: none !important;
  z-index: 2 !important;
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  height: auto !important;
  min-height: auto !important;
}

/* Estilos para texto por defecto */
.modern-form .model-select .ui.fluid.search.selection.dropdown .default.text {
  color: #95a5a6 !important;
  font-style: italic !important;
  font-weight: normal !important;
}

/* Estilos para texto seleccionado */
.modern-form .model-select .ui.fluid.search.selection.dropdown .text:not(.default) {
  color: #2c3e50 !important;
  font-weight: 500 !important;
}

/* Asegurar que el icono no interfiera */
.modern-form .model-select .ui.fluid.search.selection.dropdown .dropdown.icon {
  position: absolute !important;
  right: 12px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  color: #95a5a6 !important;
  font-size: 16px !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

/* Override final para garantizar centrado */
.modern-form .model-select .ui.fluid.search.selection.dropdown .text,
.modern-form .model-select .ui.fluid.search.selection.dropdown .default.text,
.modern-form .model-select .ui.fluid.search.selection.dropdown .text:not(.default) {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  text-align: center !important;
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  pointer-events: none !important;
  z-index: 2 !important;
  width: calc(100% - 60px) !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  line-height: 1.2 !important;
  font-size: 14px !important;
}

/* ===== SOLUCIÓN AGRESIVA PARA VUE-SEARCH-SELECT ===== */

/* Estilos para cualquier estructura HTML que genere vue-search-select */
.modern-form .model-select .ui.fluid.search.selection.dropdown *,
.modern-form .model-select .v-select .dropdown-toggle * {
  text-align: center !important;
}

/* Estilos específicos para el texto dentro del dropdown */
.modern-form .model-select .ui.fluid.search.selection.dropdown .text,
.modern-form .model-select .v-select .dropdown-toggle .form-control {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: calc(100% - 60px) !important;
  text-align: center !important;
  color: #2c3e50 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.2 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  pointer-events: none !important;
  z-index: 2 !important;
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  height: auto !important;
  min-height: auto !important;
}

/* Estilos para el texto por defecto */
.modern-form .model-select .ui.fluid.search.selection.dropdown .default.text,
.modern-form .model-select .v-select .dropdown-toggle .form-control::placeholder {
  color: #95a5a6 !important;
  font-style: italic !important;
  font-weight: normal !important;
}

/* Estilos para el texto seleccionado */
.modern-form .model-select .ui.fluid.search.selection.dropdown .text:not(.default),
.modern-form .model-select .v-select .dropdown-toggle .form-control:not([placeholder]) {
  color: #2c3e50 !important;
  font-weight: 500 !important;
}

/* Asegurar que el icono no interfiera */
.modern-form .model-select .ui.fluid.search.selection.dropdown .dropdown.icon,
.modern-form .model-select .v-select .dropdown-toggle .dropdown-toggle-button {
  position: absolute !important;
  right: 12px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  color: #95a5a6 !important;
  font-size: 16px !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

/* Override final para cualquier estructura HTML */
.modern-form .model-select .ui.fluid.search.selection.dropdown .text,
.modern-form .model-select .ui.fluid.search.selection.dropdown .default.text,
.modern-form .model-select .ui.fluid.search.selection.dropdown .text:not(.default),
.modern-form .model-select .v-select .dropdown-toggle .form-control,
.modern-form .model-select .v-select .dropdown-toggle .form-control::placeholder,
.modern-form .model-select .v-select .dropdown-toggle .form-control:not([placeholder]) {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  text-align: center !important;
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  pointer-events: none !important;
  z-index: 2 !important;
  width: calc(100% - 60px) !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  line-height: 1.2 !important;
  font-size: 14px !important;
}

/* Estilos específicos para el input interno */
.modern-form .model-select .ui.fluid.search.selection.dropdown input,
.modern-form .model-select .v-select .dropdown-toggle input {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  background: transparent !important;
  color: #2c3e50 !important;
  font-size: 14px !important;
  text-align: center !important;
  outline: none !important;
  box-sizing: border-box !important;
}
</style>
