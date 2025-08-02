<template>
  <v-app>
    <!-- <v-card>
      <v-layout>
        <v-flex xs12 sm6 class="text-xs-center">
          <v-avatar size="140">
            <img :src="getUsuario.v_avatar">
          </v-avatar>
        </v-flex>
        <v-flex xs12 sm6>
          <div>
            <div style="color: #ec6920">Documento:</div>
            <p>{{ getUsuario.v_documento }}</p>
          </div>
          <div>
            <div style="color: #ec6920">Nombre:</div>
            <p>{{ getUsuario.v_primer_nombre }}</p>
          </div>
          <div>
            <div style="color: #ec6920">Apellido:</div>
            <p>{{ getUsuario.v_primer_apellido }}</p>
          </div>
          <div>
            <div style="color: #ec6920">Provincia:</div>
            <p>{{ getUsuario.v_nombre_provincia }}</p>
          </div>
          <div>
            <cambiar-password :config="true"></cambiar-password>
          </div>
        </v-flex>
      </v-layout>
    </v-card> -->
    <div class="register-box-body">
        <form v-on:submit.prevent="actualizardatosperfil">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 text-center" >
              <h3 style="margin-top:0px;">Mi perfil</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <div align="center" class="container-imgs">
                <div class="col-md-4 col-md-offset-4">
                  <div v-if="!usuario.avatar">
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
                    
                    <div class="col-md-12 col-sm-4 col-xs-4 text-center">
                    </div>
                    <div class="col-md-12 col-sm-4 col-xs-4 text-center">
                      <img :src="imageAvatar"
                          class="centrar-imagen imagen-previsualizar" style="width:100%;">
                    </div>
                    <div class="col-md-12 col-sm-4 col-xs-4 text-center">
                    </div>
                      <div class="col-md-12 col-sm-12 col-xs-12">
                      <v-btn  @click="removeImageAvatar" color="error">
                        <i class="fa fa-trash pull-left" aria-hidden="true"></i>
                        Quitar Avatar
                      </v-btn>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div :class="(!errors.first('v_primer_nombre'))?'form-group':'form-group has-error'">
                <v-text-field
                  single-line
                  label="Primer Nombre"
                  prepend-icon="fa fa-user-circle"
                  v-model="usuario.v_primer_nombre"
                  v-validate="'required|alpha|min:2|max:100'"
                  required
                ></v-text-field>
                <span v-show="errors.has('v_primer_nombre')"
                      class="help-block text-center">{{ errors.first('v_primer_nombre')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div :class="(!errors.first('v_segundo_nombre'))?'form-group':'form-group has-error'">
                <v-text-field
                  single-line
                  prepend-icon="fa fa-user-circle"
                  ref="usuario.v_segundo_nombre"
                  v-model="usuario.v_segundo_nombre"
                  label="Segundo Nombre"
                  v-validate="'alpha|min:2|max:100'"
                ></v-text-field>
                <span v-show="errors.has('v_segundo_nombre')"
                      class="help-block text-center">{{ errors.first('v_segundo_nombre')}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div :class="(!errors.first('v_primer_apellido'))?'form-group':'form-group has-error'">
                <v-text-field
                  single-line
                  prepend-icon="fa fa-user-circle"
                  ref="usuario.v_primer_apellido"
                  v-model="usuario.v_primer_apellido"
                  label="Primer Apellido"
                  v-validate="'required|alpha|min:2|max:100'"
                  required
                ></v-text-field>
                <span v-show="errors.has('v_primer_apellido')"
                      class="help-block text-center">{{ errors.first('v_primer_apellido')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div :class="(!errors.first('v_segundo_apellido'))?'form-group':'form-group has-error'">
                <v-text-field
                  single-line
                  prepend-icon="fa fa-user-circle"
                  ref="usuario.v_segundo_apellido"
                  v-model="usuario.v_segundo_apellido"
                  label="Segundo Apellido"
                  v-validate="'alpha|min:2|max:100'"
                ></v-text-field>
                <span v-show="errors.has('v_segundo_apellido')"
                      class="help-block text-center">{{ errors.first('v_segundo_apellido')}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div class="form-group">
                <v-autocomplete
                  ref="paises"
                  prepend-icon="fa fa-globe"
                  :items="paises"
                  v-model="usuario.pais"
                  v-on:input="seleccionarPais"
                  label="Pais"
                  item-value="valor"
                  item-text="valor.text"
                ></v-autocomplete>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div class="form-group">
                <v-autocomplete
                  ref="provincias"
                  prepend-icon="fa fa-globe"
                  :items="provincias"
                  v-model="usuario.provincia"
                  v-on:input="seleccionarProvincia"
                  label="Provincia"
                   item-value="valor"
                  item-text="valor.text"
                ></v-autocomplete>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div class="form-group">
                <v-autocomplete
                  ref="ciudades"
                  prepend-icon="fa fa-globe"
                  :items="ciudades"
                  v-model="usuario.ciudad"
                  label="Ciudad"
                   item-value="valor"
                  item-text="valor.text"
                ></v-autocomplete>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div :class="(!errors.first('d_fechanacimiento'))?'form-group':'form-group has-error'">
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  v-model="menu"
                  :return-value.sync="usuario.d_fechanacimiento"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="usuario.d_fechanacimiento"
                    label="Fecha de Nacimiento"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    format="dd MMMM yyyy"
                    v-model="usuario.d_fechanacimiento"
                    :disabled="validacionDatePicker"
                    locale="es"
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancelar</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(usuario.d_fechanacimiento)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <span v-show="errors.has('d_fechanacimiento')"
                      class="help-block text-center">{{ errors.first('d_fechanacimiento')}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div :class="(!errors.first('v_direccion'))?'form-group':'form-group has-error'">
                <v-text-field
                  single-line
                  prepend-icon="fa fa-home"
                  v-model="usuario.v_direccion.v_direccion"
                  label="Direccion"
                  v-validate="'required|min:5|max:255'"
                  required
                ></v-text-field>
                <span v-show="errors.has('v_direccion')"
                      class="help-block text-center">{{ errors.first('v_direccion')}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div :class="(!errors.first('v_telefono_fijo'))?'form-group':'form-group has-error'">
                <v-text-field
                  required
                  single-line
                  prepend-icon="fa fa-mobile"
                  v-model="usuario.v_telefono_movil.v_telefono"
                  label="Telefono Movil"
                  v-validate="'required|min:5|max:25|numeric'"
                ></v-text-field>
                <span v-show="errors.has('v_telefono_fijo')"
                      class="help-block text-center">{{ errors.first('v_telefono_fijo')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div :class="(!errors.first('v_telefono_movil'))?'form-group':'form-group has-error'">
                <v-text-field
                  single-line
                  prepend-icon="fa fa-phone"
                  v-model="usuario.v_telefono_fijo.v_telefono"
                  label="Telefono Fijo"
                  v-validate="'min:5|max:25|numeric'"
                ></v-text-field>
                <span v-show="errors.has('v_telefono_movil')"
                      class="help-block text-center">{{ errors.first('v_telefono_movil')}}</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 text-xs-center">
              <v-btn type="submit" :click="actualizardatosperfil" color="primary" id="submitButton"
                     :disabled="deshabilitar">
                <v-icon>fa-user</v-icon>
                &nbsp;&nbsp;Actualizar Perfil
              </v-btn>
            </div>
          </div>
        </form>
      </div>
      <div>
        <cambiar-password :config="true" v-if="usuario.active_pass = true"></cambiar-password>
        <crear-password :config="true" v-if="usuario.active_pass = false"></crear-password>         
      </div>
  </v-app>
</template>
<script>

//   import {mapGetters} from 'vuex';
//   import CambiarPassword from '../../partes/CambiarPassword';
// import AppServices from '../../../AppServices';

//   export default {
//     data() {
//       return {}
//     },
//     components: {CambiarPassword},
//     created() {
//       console.log("el usuario",this.getUsuario);
//     },
//     computed: Object.assign({}, mapGetters(['getUsuario',]), {}),
//   }
</script>
<script>
import {mapGetters, mapMutations} from 'vuex';
import CambiarPassword from '../../partes/CambiarPassword';
import CrearPassword from '../../partes/CrearPassword';
import Datepicker from "vuejs-datepicker";
import { ModelSelect } from "vue-search-select";
import AppServices from "../../../AppServices";
import TerminosCondiciones from "../../../TerminosCondiciones/TerminosCondiciones";

export default {
  data() {
    return {
      menu: null,
      sexo: [
        {
          value: "masculino",
          text: "Masculino"
        },
        {
          value: "femenino",
          text: "Femenino"
        }
      ],
      validacionDatePicker: {
        to: new Date(),
        from: new Date()
      },
      usuario: {
        v_primer_nombre: null,
        v_segundo_nombre: null,
        v_primer_apellido: null,
        v_segundo_apellido: null,
        v_telefono_fijo: [],
        v_telefono_movil: [],
        d_fechanacimiento: null,
        avatar: null,
        v_direccion: [],
        pais: [],
        provincia: [],
        ciudad: []
      },
      imageAvatar:'',
      paises: [],
      provincias: [],
      ciudades: [],
      tipo_documentos: []
    };
  },
  props: ["modal", "cambiar"],
  methods: Object.assign(
    {},
    mapMutations([
      "setUsuario"]),
  {
    buscarArrayObjetos(nameKey, myArray) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i] === nameKey) {
          return myArray[i];
        }
      }
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
    acceder() {
      if (this.modal) {
        this.$emit("cambiar");
      } else {
        this.$router.push({ name: "access" });
      }
    },
    actualizardatosperfil() {
      console.log("object", this.pais);
      this.$validator.validateAll().then(() => {
        console.log(this.usuario);
        let moment = require("moment");
        let boton_registrar = $("#submitButton");
        boton_registrar.button("Actualizando tu perfil...");
        let formData = new FormData();
        formData.append("v_primer_nombre", this.usuario.v_primer_nombre);
        if (this.usuario.v_segundo_nombre) {
          formData.append("v_segundo_nombre", this.usuario.v_segundo_nombre);
        }
        else{
        }
        formData.append("v_primer_apellido", this.usuario.v_primer_apellido);
        if (this.usuario.v_segundo_apellido) {
          formData.append(
            "v_segundo_apellido",
            this.usuario.v_segundo_apellido
          );
        }
        else{
        }
        formData.append("id_m_paises_fk", this.usuario.pais.value);
        formData.append("id_m_provincias_fk", this.usuario.provincia.value);
        formData.append("id_m_ciudades_fk", this.usuario.ciudad.value);
        formData.append("v_nombre_pais", this.usuario.pais.text);
        formData.append("v_nombre_provincia", this.usuario.provincia.text);
        formData.append("v_nombre_ciudad", this.usuario.ciudad.text);
        formData.append(
          "d_fechanacimiento",
          moment(this.usuario.d_fechanacimiento).format()
        );
        formData.append("id_telefono_fijo", this.usuario.v_telefono_fijo.id_m_telefonos);
        formData.append("id_telefono_movil", this.usuario.v_telefono_movil.id_m_telefonos);
        formData.append("v_telefono_fijo", this.usuario.v_telefono_fijo.v_telefono);
        formData.append("v_telefono_movil", this.usuario.v_telefono_movil.v_telefono);
        formData.append("id_direccion", this.usuario.v_direccion.id_m_direcciones);
        formData.append("v_direccion", this.usuario.v_direccion.v_direccion);
         formData.append('avatar', this.usuario.avatar);
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices()
          .postMethodWithBearer("api/avanzamas/actualizarperfil", formData,token)
          .then(
            response => {
              yo.$toastr("success", response.body.mensaje, "Registro exitoso");
              boton_registrar.button("reset");
              console.log(response);
              yo.setUserDataperfil(yo,response,yo.getUsuario);  
              yo.$router.push("/");
             },
            errors => {
              yo.getAppServices().mapErrorsResponses(yo, errors);
             }
          );
      });
    },
    seleccionarPais(event) {
      console.log("event_value", event);
      console.log("object", this.usuario.pais);
      this.getAppServices()
        .getMethodWithoutBearer("api/provincias/" + event.value)
        .then(
          response => {
            this.provincias = response.body.provincias;
            this.provincias.forEach(item => {
              item.valor = {
                value: item.value,
                text: item.text
              };
            });
            this.tipo_documentos = response.body.tipo_documentos;
          },
          errors => this.getAppServices().mapErrorsResponses(this, errors)
        );
    },
    seleccionarProvincia(event) {
      this.getAppServices()
        .getMethodWithoutBearer("api/ciudades/" + event.value)
        .then(
          response => {
            this.ciudades = response.body;
            this.ciudades.forEach(item => {
              item.valor = {
                value: item.value,
                text: item.text
              };
            });
          },
          errors => this.getAppServices().mapErrorsResponses(this, errors)
        );
    },
    getAppServices() {
      return AppServices;
    }
  }),
  components: { Datepicker, ModelSelect,CambiarPassword, TerminosCondiciones,CrearPassword },
  mounted() {},
  created() {
      console.log("usuario_get",this.getUsuario);
      this.usuario.v_primer_nombre = this.getUsuario.v_primer_nombre;
      this.usuario.v_segundo_nombre = this.getUsuario.v_segundo_nombre;
      this.usuario.v_primer_apellido = this.getUsuario.v_primer_apellido;
      this.usuario.v_segundo_apellido = this.getUsuario.v_segundo_apellido;
      this.getUsuario.telefonos.forEach(tel => {
        if (tel.v_tipo =="Celular"){
          this.usuario.v_telefono_movil = tel;
        }
        else if (tel.v_tipo =="Fijo"){
          this.usuario.v_telefono_fijo = tel;
        } 
      });
      this.usuario.d_fechanacimiento = this.getUsuario.d_fechanacimiento;
      this.getUsuario.direccion.forEach(dire => {
        if (dire.b_principal == true){
          this.usuario.v_direccion = dire;
        }
      });
      this.usuario.pais.value = this.getUsuario.id_m_paises_fk;
      this.usuario.provincia.value = this.getUsuario.id_m_provincias_fk;
      this.usuario.ciudad.value = this.getUsuario.id_m_ciudades_fk;
      this.usuario.pais.text = this.getUsuario.v_nombre_pais;
      this.usuario.provincia.text = this.getUsuario.v_nombre_provincia;
      this.usuario.ciudad.text = this.getUsuario.v_nombre_ciudad;
      this.usuario.avatar= this.getUsuario.v_avatar;
      this.imageAvatar = this.getUsuario.v_avatar;
      console.log("usuario_render",this.usuario);
      this.getMethodWithoutBearer(this.urlsApi().endpointsPublicos.paises).then(
      response => {
        this.paises = response.body;
        this.paises.forEach(item => {
          item.valor = {
            value: item.value,
            text: item.text
          };
        });
      },
      errors => this.mapErrorsResponses(this, errors)
    );
     this
        .getMethodWithoutBearer("api/provincias/" + this.usuario.pais.value)
        .then(
          response => {
            this.provincias = response.body.provincias;
            this.provincias.forEach(item => {
              item.valor = {
                value: item.value,
                text: item.text
              };
            });
            this.tipo_documentos = response.body.tipo_documentos;
          },
          errors => this.mapErrorsResponses(this, errors)
        );
        this
        .getMethodWithoutBearer("api/ciudades/" + this.usuario.provincia.value)
        .then(
          response => {
            this.ciudades = response.body;
            this.ciudades.forEach(item => {
              item.valor = {
                value: item.value,
                text: item.text
              };
            });
          },
          errors => this.mapErrorsResponses(this, errors)
        );
     
  },
  computed: Object.assign({}, mapGetters(['getUsuario']), {
      deshabilitar: function() {
        return !(
          !this.errors.has("v_primer_nombre") 
      );
    }
  }
  ),
};
</script>
<style scoped>
.app {
  background: url("/dist/img/people-big.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>


