<template>
  <div class="app">
    <div class="register-box">
      <div class="register-box-body">
        <div class="register-logo">
          <router-link class="links-hipertienda" :to="{name:'explore'}">
            <img src="/dist/img/img_logo.png" class="img-responsive img-responsive-center" alt="Cinque Terre">
          </router-link>
        </div>
        <form v-on:submit.prevent="registerUser">
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <p class="text-center">
                En LaHipertienda te hacemos la vida más fácil, regístrate gratis y accede a todos los beneficios que
                tenemos preparados para ti.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <div :class="(!errors.first('email'))?'form-group':'form-group has-error'">
                <v-text-field
                  required
                  prepend-icon="fa fa-at"
                  single-line
                  label="Correo Electronico"
                  v-model="usuario.email"
                  v-validate="'required|email|min:5|max:255'"
                ></v-text-field>
                <span v-show="errors.has('email')"
                      class="help-block text-center">{{ errors.first('email')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-md-6">
              <div :class="(!errors.first('v_sexo'))?'form-group':'form-group has-error'">
                <v-select
                  required
                  prepend-icon="fa fa-transgender"
                  :items="sexo"
                  v-model="usuario.v_sexo"
                  label="Genero"
                  persistent-hint
                ></v-select>
                <span v-show="errors.has('v_sexo')"
                      class="help-block text-center">{{ errors.first('v_sexo')}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <div :class="(!errors.first('v_primer_nombre'))?'form-group':'form-group has-error'">
                <v-text-field
                  single-line
                  prepend-icon="fa fa-user-circle"
                  ref="usuario.v_primer_nombre"
                  v-model="usuario.v_primer_nombre"
                  label="Primer Nombre"
                  v-validate="'required|alpha|min:2|max:100'"
                  required
                ></v-text-field>
                <span v-show="errors.has('v_primer_nombre')"
                      class="help-block text-center">{{ errors.first('v_primer_nombre')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-md-6">
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
            <div class="col-xs-12 col-md-6">
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
            <div class="col-xs-12 col-md-6">
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
            <div class="col-xs-12 col-md-6">
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
            <div class="col-xs-12 col-md-6">
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
            <div class="col-xs-12 col-md-6">
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
            <div class="col-xs-12 col-md-6">
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
                  v-model="usuario.v_direccion"
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
            <div class="col-xs-12 col-md-6">
              <div :class="(!errors.first('v_telefono_fijo'))?'form-group':'form-group has-error'">
                <v-text-field
                  required
                  single-line
                  prepend-icon="fa fa-mobile"
                  v-model="usuario.v_telefono_movil"
                  label="Telefono Movil"
                  v-validate="'required|min:5|max:25|numeric'"
                ></v-text-field>
                <span v-show="errors.has('v_telefono_fijo')"
                      class="help-block text-center">{{ errors.first('v_telefono_fijo')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-md-6">
              <div :class="(!errors.first('v_telefono_movil'))?'form-group':'form-group has-error'">
                <v-text-field
                  single-line
                  prepend-icon="fa fa-phone"
                  v-model="usuario.v_telefono_fijo"
                  label="Telefono Fijo"
                  v-validate="'min:5|max:25|numeric'"
                ></v-text-field>
                <span v-show="errors.has('v_telefono_movil')"
                      class="help-block text-center">{{ errors.first('v_telefono_movil')}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <div class="form-group">
                <v-select
                  required
                  prepend-icon="fa fa-address-card"
                  :items="tipo_documentos"
                  v-model="usuario.tipo_documento"
                  label="Selecciona el tipo de documento"
                  persistent-hint
                ></v-select>
              </div>
            </div>
            <div class="col-xs-12 col-md-6">
              <div :class="(!errors.first('v_documento'))?'form-group':'form-group has-error'">
                <v-text-field
                  single-line
                  prepend-icon="fa fa-address-card"
                  v-model="usuario.v_documento"
                  label="Documento"
                  v-validate="'required|min:3|max:25|numeric'"
                  required
                ></v-text-field>
                <span v-show="errors.has('v_documento')"
                      class="help-block text-center">{{ errors.first('v_documento')}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <div :class="(!errors.first('password'))?'form-group':'form-group has-error'">
                <v-text-field
                  single-line
                  prepend-icon="fa fa-key"
                  v-model="usuario.password"
                  type="password"
                  label="Contraseña"
                  data-vv-name="password"
                  v-validate="'required|min:8|max:25|alpha_num|confirmed:confirm_password'"
                  required
                ></v-text-field>
                <span v-show="errors.has('password')"
                      class="help-block text-center">{{ errors.first('password')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-md-6">
              <div :class="(!errors.first('confirm_password'))?'form-group':'form-group has-error'">
                <v-text-field
                  single-line
                  prepend-icon="fa fa-key"
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  label="Confirmar Contraseña"
                  data-vv-name="confirm_password"
                  v-validate="'required|min:8|max:25|alpha_num'"
                  required
                ></v-text-field>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-8 col-md-offset-2">
              <div class="checkbox text-center">
                <label>
                  <a data-toggle="modal" data-target="#terminosCondiciones">Términos y Condiciones</a>
                  <v-checkbox
                    label="Aceptar Terminos y Condiciones"
                    color="orange darken-3"
                    v-model="terminos_condiciones"
                    style="padding:0px;"
                  ></v-checkbox>
                  
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 text-xs-center">
              <v-btn type="submit" :click="registerUser" color="primary" id="submitButton"
                     :disabled="deshabilitar || terminosCondiciones">
                <v-icon>fa-user</v-icon>
                &nbsp;&nbsp;Registrate!
              </v-btn>
            </div>
            <div class="col-xs-12 text-center">
              <a href="#" v-on:click="acceder" class="links-hipertienda">¿Ya tienes una cuenta?¡Ingresa!</a>
            </div>
          </div>
        </form>

        <terminos-condiciones v-on:terminos_condiciones="terminosYcondiciones"></terminos-condiciones>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import { ModelSelect } from "vue-search-select";
import AppServices from "../AppServices";
import TerminosCondiciones from "../TerminosCondiciones/TerminosCondiciones";

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
        to: new Date(1950, 0, 1),
        from: new Date()
      },
      terminos_condiciones: false,
      usuario: {
        email: null,
        password: null,
        v_primer_nombre: null,
        v_segundo_nombre: null,
        v_primer_apellido: null,
        v_segundo_apellido: null,
        v_sexo: null,
        v_telefono_fijo: null,
        v_telefono_movil: null,
        d_fechanacimiento: null,
        v_direccion: null,
        tipo_documento: [],
        pais: [],
        provincia: [],
        ciudad: []
      },
      paises: [],
      provincias: [],
      ciudades: [],
      tipo_documentos: []
    };
  },
  props: ["modal", "cambiar"],
  methods: {
    buscarArrayObjetos(nameKey, myArray) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i] === nameKey) {
          return myArray[i];
        }
      }
    },
    acceder() {
      if (this.modal) {
        this.$emit("cambiar");
      } else {
        this.$router.push({ name: "access" });
      }
    },
    registerUser() {
      console.log("object", this.pais);
      this.$validator.validateAll().then(() => {
        console.log(this.usuario);
        let moment = require("moment");
        let boton_registrar = $("#submitButton");
        boton_registrar.button("Registrando tus datos...");
        let formData = new FormData();
        formData.append("email", this.usuario.email);
        formData.append("v_sexo", this.usuario.v_sexo);
        formData.append("v_primer_nombre", this.usuario.v_primer_nombre);
        if (this.usuario.v_segundo_nombre) {
          formData.append("v_segundo_nombre", this.usuario.v_segundo_nombre);
        }
        else{
          formData.append("v_segundo_nombre", '');
        }
        formData.append("v_primer_apellido", this.usuario.v_primer_apellido);
        if (this.usuario.v_segundo_apellido) {
          formData.append(
            "v_segundo_apellido",
            this.usuario.v_segundo_apellido
          );
        }
        else{
          formData.append("v_segundo_apellido", '');
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
        if (this.usuario.v_telefono_fijo) {
          formData.append("v_telefono_fijo", this.usuario.v_telefono_fijo);
        }
        formData.append("v_telefono_movil", this.usuario.v_telefono_movil);
        formData.append(
          "id_m_tipos_documentos_fk",
          this.usuario.tipo_documento
        );
        formData.append("v_documento", this.usuario.v_documento);
        formData.append("password", this.usuario.password);
        formData.append("v_direccion", this.usuario.v_direccion);
        let yo = this;
        this.getAppServices()
          .postMethodWithoutBearer("api/registro", formData)
          .then(
            response => {
              yo.$toastr("success", response.body.mensaje, "Registro exitoso");
              boton_registrar.button("reset");
              yo.$router.push("/acceso");
              yo.$emit("cleanModal");
            },
            errors => {
              yo.getAppServices().mapErrorsResponses(yo, errors);
              yo.$emit("cleanModal");
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
    },
    terminosYcondiciones(evento) {
      this.terminos_condiciones = evento.terminos_condiciones;
    }
  },
  components: { Datepicker, ModelSelect, TerminosCondiciones },
  mounted() {},
  created() {
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
  },
  computed: {
    deshabilitar: function() {
      return !(
        !this.errors.has("email") &&
        !this.errors.has("v_sexo") &&
        !this.errors.has("v_primer_nombre") &&
        !this.errors.has("v_segundo_nombre") &&
        !this.errors.has("v_primer_apellido") &&
        !this.errors.has("v_segundo_apellido") &&
        !this.errors.has("id_m_paises_fk") &&
        !this.errors.has("id_m_provincias_fk") &&
        !this.errors.has("id_m_ciudades_fk") &&
        !this.errors.has("d_fechanacimiento") &&
        !this.errors.has("v_telefono_fijo") &&
        !this.errors.has("v_telefono_movil") &&
        !this.errors.has("id_m_tipos_documentos_fk") &&
        !this.errors.has("v_documento") &&
        !this.errors.has("password")
      );
    },
    terminosCondiciones() {
      return !this.terminos_condiciones;
    }
  }
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
.v-input .v-label {
    padding: 0px;
}

</style>
