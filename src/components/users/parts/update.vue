<template>
  <div class="loader" v-if="!peticionesCompletas">
    <hr>
  </div>
  <form v-on:submit.prevent="actualizar" v-else>
    <div class="row">
      <div class="row">
        <div class="col-xs-12" align="center">
          <div v-if="!imageAvatar">
            <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('avatar') }">
              <label for="avatar">Imagen avatar</label>
              <input v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
                     name="avatar"
                     type="file"
                     v-on:change="onFileChangeAvatar"
                     data-vv-as="imagen avatar"
                     accept="image/*"
                     id="avatar">
              <span v-show="errors.has('avatar')"
                    class="help-block">{{ errors.first('avatar')}}
            </span>
            </div>
          </div>
          <div align="center"  v-else>
            <div class="col-md-12">
              <img :src="imageAvatar"
                 class="centrar-imagen imagen-previsualizar">
            </div>
            <div class="col-md-12">
            <v-btn @click.prevent="removeImageAvatar" color="error">
              <i class="fa fa-trash pull-left" aria-hidden="true"></i>
              Quitar Imagen Avatar
            </v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-6 col-md-6">
        <div :class="(!errors.first('v_primer_nombre'))?'form-group':'form-group has-error'">
          <label for="v_nombre">Primer Nombre</label>
          <input placeholder="Primer nombre del usuario" name="v_primer_nombre" type="text" class="form-control"
                  data-placement="left" v-validate="'required|alpha_spaces|min:2|max:100'"
                 data-vv-as="Primer nombre" v-model="usuario.v_primer_nombre" required id="v_primer_nombre"
                 title="Ingresa el nombre de la usuario" >
          <span v-show="errors.has('v_primer_nombre')"
                class="help-block">{{ errors.first('v_primer_nombre')}}</span>
        </div>
      </div>
      <div class="col-xs-6 col-md-6">
        <div :class="(!errors.first('v_segundo_nombre'))?'form-group':'form-group has-error'">
          <label for="v_nombre">Segundo Nombre</label>
          <input placeholder="Primer nombre del usuario" name="v_segundo_nombre" type="text" class="form-control"
                  data-placement="left" v-validate="'alpha_spaces|min:2|max:100'"
                 data-vv-as="Segundo nombre" v-model="usuario.v_segundo_nombre"  id="v_segundo_nombre"
                 title="Ingresa el nombre de la usuario" >
          <span v-show="errors.has('v_segundo_nombre')"
                class="help-block">{{ errors.first('v_segundo_nombre')}}</span>
        </div>
      </div>
      <div class="col-xs-6 col-md-6">
        <div :class="(!errors.first('v_primer_apellido'))?'form-group':'form-group has-error'">
          <label for="v_primer_apellido">Primer Apellido</label>
          <input placeholder="Primer apellido del usuario" name="v_primer_apellido" type="text" class="form-control"
                  data-placement="left" v-validate="'required|alpha_spaces|min:2|max:100'"
                 data-vv-as="Primer apellido" v-model="usuario.v_primer_apellido" required id="v_primer_apellido"
                 title="Ingresa el apellido de la usuario" >
          <span v-show="errors.has('v_primer_apellido')"
                class="help-block">{{ errors.first('v_primer_apellido')}}</span>
        </div>
      </div>
      <div class="col-xs-6 col-md-6">
        <div :class="(!errors.first('v_segundo_apellido'))?'form-group':'form-group has-error'">
          <label for="v_segundo_apellido">Segundo Apellido</label>
          <input placeholder="Segundo apellido del usuario" name="v_segundo_apellido" type="text" class="form-control"
                  data-placement="left" v-validate="'alpha_spaces|min:2|max:100'"
                 data-vv-as="Segundo apellido" v-model="usuario.v_segundo_apellido"  id="v_segundo_apellido"
                 title="Ingresa el apellido de la usuario" >
          <span v-show="errors.has('v_segundo_apellido')"
                class="help-block">{{ errors.first('v_segundo_apellido')}}</span>
        </div>
      </div>
      <div class="col-xs-4 col-md-4">
        <div class="form-group">
          <label for="v_pais">País</label>
          <model-select :options="paises" id="v_pais" v-model="pais" class="form-control"
                         v-on:input="seleccionarPais"
                        data-placement="left" title="Selecciona el país en que se encuentra la usuario"
                        required>
          </model-select>
        </div>
      </div>
      <div class="col-xs-4 col-md-4">
        <div class="form-group">
          <div class="form-group">
            <label for="v_provincia">Provincia</label>
            <model-select :options="provincias" id="v_provincia" v-model="provincia" class="form-control"
                           v-on:input="seleccionarProvincia"
                          data-placement="left" title="Selecciona la provincia"
                          required>
            </model-select>
          </div>
        </div>
      </div>
      <div class="col-xs-4 col-md-4">
        <div class="form-group">
          <label for="v_ciudad">Ciudad</label>
          <model-select :options="ciudades" id="v_ciudad" v-model="ciudad" class="form-control"

                        data-placement="left" title="Selecciona la ciudad"
                        required>
          </model-select>
        </div>
      </div>
      <div class="col-xs-12">
        <div :class="(!errors.first('v_direccion'))?'form-group':'form-group has-error'">
          <label for="v_direccion">Dirección</label>
          <input placeholder="Dirección" name="v_direccion" type="text" class="form-control"
                  data-placement="left" required id="v_direccion" v-on:change="direccionPrincipal"
                 title="Ingresa la dirección principal de la usuario" data-vv-as="dirección"
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
                        title="Selecciona el tipo de documento de identificación que posee la usuario"
                        required>
          </model-select>
        </div>
      </div>
      <div class="col-xs-6 col-md-6">
          <label for="v_documento">Documento</label>
          <div :class="(!errors.first('v_documento'))?'form-group':'form-group has-error'">
            <input placeholder="Documento" name="v_documento" type="text" class="form-control"
                    data-placement="left" required id="v_documento"
                   title="Ingresa el número de documento de identificación"
                   data-vv-as="documento de identificación"
                   v-model="usuario.v_documento" v-validate="'required|min:3|max:25|numeric'">
            <span v-show="errors.has('v_documento')"
                  class="help-block">{{ errors.first('v_documento')}}</span>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col-xs-6 col-md-6">
        <div :class="(!errors.first('v_telefono_celular'))?'form-group':'form-group has-error'">
          <label for="v_telefono_celular">Teléfono Celular</label>
          <input placeholder="Teléfono celular" name="v_telefono_celular" type="text" class="form-control"
                  data-placement="left" id="v_telefono_celular"
                 title="Ingresa el teléfono" data-vv-as="teléfono"
                 v-model="usuario.v_telefono_celular" v-validate="'min:5|max:25|numeric'">
          <span v-show="errors.has('v_telefono_celular')"
                class="help-block">{{ errors.first('v_telefono_celular')}}</span>
        </div>
      </div>
      <div class="col-xs-6 col-md-6">
        <div :class="(!errors.first('v_telefono_fijo'))?'form-group':'form-group has-error'">
          <label for="v_telefono_fijo">Teléfono Fijo</label>
          <input placeholder="Teléfono Secundario" name="v_telefono_fijo" type="text" class="form-control"
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
                  data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando">
            <i class="fa fa-pencil pull-left"></i> Editar
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
