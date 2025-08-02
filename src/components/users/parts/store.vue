<template>
  <form v-on:submit.prevent="registrar">
    <div class="row">
      <div class="col-xs-12" align="center">
        <div v-if="!usuario.v_avatar">
          <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('avatar') }">
            <label for="avatar">Avatar</label>
            <input v-validate="'image|mimes:image/jpeg,image/png,image/jpg'"
                   name="avatar"
                   type="file"
                   v-on:change="onFileChangeAvatar"
                   data-vv-as="Avatar"
                   accept="image/*"
                   id="avatar">
            <span v-show="errors.has('avatar')"
                  class="help-block">{{ errors.first('avatar')}}
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
        <div :class="(!errors.first('v_primer_nombre'))?'form-group':'form-group has-error'">
          <label for="v_primer_nombre">Primer Nombre</label>
          <input name="v_primer_nombre" type="text" class="form-control"
                  data-placement="left"  id="v_primer_nombre"
                 title="Ingrese el primer nombre del usuario" v-validate="'required|alpha_spaces|min:2|max:100'"
                 data-vv-as="primer nombre del usuario" v-model="usuario.v_primer_nombre">
          <span v-show="errors.has('v_primer_nombre')" class="help-block">{{ errors.first('v_primer_nombre')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_segundo_nombre'))?'form-group':'form-group has-error'">
          <label for="v_segundo_nombre">Segundo Nombre</label>
          <input name="v_segundo_nombre" type="text" class="form-control"
                  data-placement="left"  id="v_segundo_nombre"
                 title="Ingrese el segundo nombre del usuario" v-validate="'alpha_spaces|min:2|max:100'"
                 data-vv-as="segundo nombre del usuario" v-model="usuario.v_segundo_nombre">
          <span v-show="errors.has('v_segundo_nombre')" class="help-block">{{ errors.first('v_segundo_nombre')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_primer_apellido'))?'form-group':'form-group has-error'">
          <label for="v_primer_apellido">Primer Apellido</label>
          <input name="v_primer_apellido" type="text" class="form-control"
                  data-placement="left"  id="v_primer_apellido"
                 title="Ingrese el primer apellido del usuario" v-validate="'required|alpha_spaces|min:2|max:100'"
                 data-vv-as="primer apellido del usuario" v-model="usuario.v_primer_apellido">
          <span v-show="errors.has('v_primer_apellido')"
                class="help-block">{{ errors.first('v_primer_apellido')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_segundo_apellido'))?'form-group':'form-group has-error'">
          <label for="v_segundo_apellido">Segundo Apellido</label>
          <input name="v_segundo_apellido" type="text" class="form-control"
                  data-placement="left"  id="v_segundo_apellido"
                 title="Ingrese el segundo apellido del usuario" v-validate="'alpha_spaces|min:2|max:100'"
                 data-vv-as="segundo apellido del usuario" v-model="usuario.v_segundo_apellido">
          <span v-show="errors.has('v_segundo_apellido')"
                class="help-block">{{ errors.first('v_segundo_apellido')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div class="form-group">
          <label for="v_pais">País</label>
          <model-select :options="paises" id="v_pais" v-model="pais" class="form-control"
                         v-on:input="seleccionarPais"
                        data-placement="left" title="Selecciona el país en que se encuentra la tienda"
                        v-validate="'required'">
          </model-select>
          <span v-show="errors.has('v_pais')"
                class="help-block">{{ errors.first('v_pais')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div class="form-group">
          <label for="v_provincia">Provincia</label>
          <model-select :options="provincias" id="v_provincia" v-model="provincia" class="form-control"
                         v-on:input="seleccionarProvincia"
                        data-placement="left" title="Selecciona la provincia"
                        required>
          </model-select>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div class="form-group">
          <label for="v_ciudad">Ciudad</label>
          <model-select :options="ciudades" id="v_ciudad" v-model="ciudad" class="form-control"

                        data-placement="left" title="Selecciona la ciudad"
                        required>
          </model-select>
        </div>
      </div>
      <div class="col-xs-12 col-md-12">
        <div :class="(!errors.first('v_direccion'))?'form-group':'form-group has-error'">
          <label for="v_direccion">Dirección</label>
          <input placeholder="Dirección" name="v_direccion" type="text" class="form-control"
                  data-placement="left"  id="v_direccion"
                 title="Ingresa la dirección principal de la tienda" data-vv-as="dirección"
                 v-model="usuario.v_direccion" v-validate="'required|min:5|max:255'">
          <span v-show="errors.has('v_direccion')"
                class="help-block">{{ errors.first('v_direccion')}}</span>
        </div>
      </div>
      <div class="col-xs-6 col-md-6">
        <div class="form-group">
          <label for="v_tipo_documento">Tipo de Documento</label>
          <model-select :options="tipo_documentos" id="v_tipo_documento" v-model="tipo_documento" class="form-control"

                        data-placement="left"
                        title="Selecciona el tipo de documento de identificación que posee la tienda"
                        required>
          </model-select>
        </div>
      </div>
      <div class="col-xs-6 col-md-6">
        <div :class="(!errors.first('v_documento'))?'form-group':'form-group has-error'">
          <label for="v_documento">Documento</label>
          <input placeholder="Documento" name="v_documento" type="text" class="form-control"
                  data-placement="left"  id="v_documento"
                 title="Ingresa el número de documento de identificación"
                 data-vv-as="documento de identificación"
                 v-model="usuario.v_documento" v-validate="'required|min:3|max:25|numeric'">
          <span v-show="errors.has('v_documento')"
                class="help-block">{{ errors.first('v_documento')}}</span>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('d_fechanacimiento'))?'form-group':'form-group has-error'">
          <label for="v_documento">Fecha de Nacimiento</label>
          <input placeholder="Fecha de Nacimiento" name="d_fechanacimiento" type="date" class="form-control"
                  data-placement="left"  id="d_fechanacimiento"
                 title="Ingresa la Fecha de Nacimiento"
                 data-vv-as="fecha de Nacimiento"
                 v-model="usuario.d_fechanacimiento" v-validate="'required'">
          <span v-show="errors.has('d_fechanacimiento')"
                class="help-block">{{ errors.first('d_fechanacimiento')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_sexo'))?'form-group':'form-group has-error'">
          <label for="v_documento">Sexo</label>
          <select class="form-control" name="v_sexo"  data-placement="left"
                  title="Selecciona tu sexo" data-vv-as="sexo"
                  v-model="usuario.v_sexo" v-validate="'required'" >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          <span v-show="errors.has('v_sexo')"
                class="help-block">{{ errors.first('v_sexo')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('email'))?'form-group':'form-group has-error'">
          <label for="email">Correo electrónico</label>
          <input placeholder="Correo electrónico" name="email" type="email" class="form-control"
                  data-placement="left" v-validate="'required|email|min:5|max:255'"
                 data-vv-as="correo electrónico" v-model="usuario.email"
                 title="Ingresa tu correo electrónico, por ejemplo example@example.com">
          <span v-show="errors.has('email')"
                class="help-block">{{ errors.first('email')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('v_telefono_celular'))?'form-group':'form-group has-error'">
          <label for="v_telefono_celular">Teléfono Celular</label>
          <input placeholder="Teléfono Celular" name="v_telefono_celular" type="text" class="form-control"
                  data-placement="left" id="v_telefono_celular"
                 title="Ingresa el teléfono" data-vv-as="teléfono"
                 v-model="usuario.v_telefono_celular" v-validate="'min:5|max:25|numeric'">
          <span v-show="errors.has('v_telefono_celular')"
                class="help-block">{{ errors.first('v_telefono_celular')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('v_telefono_fijo'))?'form-group':'form-group has-error'">
          <label for="v_telefono_fijo">Teléfono Fijo</label>
          <input placeholder="Teléfono Fijo" name="v_telefono_fijo" type="text" class="form-control"
                  data-placement="left" id="v_telefono_fijo"
                 title="Ingresa el teléfono" data-vv-as="teléfono"
                 v-model="usuario.v_telefono_fijo" v-validate="'min:5|max:25|numeric'">
          <span v-show="errors.has('v_telefono_fijo')"
                class="help-block">{{ errors.first('v_telefono_fijo')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-12">
          <label for="v_roles">Roles</label>
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
