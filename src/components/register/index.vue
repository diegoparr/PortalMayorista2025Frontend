<template>
  <div class="app">
    <div class="register-box">
      <div class="register-box-body">
        <div class="register-logo">
          <router-link class="links-hipertienda" :to="{name:'explore'}">
            <img :src="require('@/assets/img/img_logo.png')" class="img-responsive img-responsive-center" alt="Cinque Terre">
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
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    :value="fechaFormateada"
                    label="Fecha de Nacimiento"
                    prepend-icon="event"
                    readonly
                    required
                    v-validate="'required'"
                    placeholder="Selecciona tu fecha de nacimiento"
                    hint="Debes tener al menos 13 años"
                    persistent-hint
                  ></v-text-field>
                  <v-date-picker
                    v-model="pickerDate"
                    :max="maxDate"
                    :min="minDate"
                    locale="es"
                    scrollable
                    @input="onDateSelected"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cancelDate">Cancelar</v-btn>
                    <v-btn flat color="primary" @click="confirmDate">OK</v-btn>
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
                  :type="showPassword ? 'text' : 'password'"
                  label="Contraseña"
                  name="password"
                  data-vv-name="password"
                  v-validate="'required|min:8|max:25|alpha_num'"
                  required
                  :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                  @click:append="showPassword = !showPassword"
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
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirm_password"
                  name="confirm_password"
                  label="Confirmar Contraseña"
                  data-vv-name="confirm_password"
                  v-model="usuario.confirm_password"
                  v-validate="'required|min:8|max:25|alpha_num'"
                  required
                  :append-icon="showConfirmPassword ? 'visibility_off' : 'visibility'"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                  @blur="validarPassword"
                ></v-text-field>
                <span v-show="errors.has('confirm_password')"
                      class="help-block text-center">{{ errors.first('confirm_password')}}</span>
                <span v-show="!errors.has('confirm_password') && usuario.password && usuario.confirm_password && usuario.password === usuario.confirm_password"
                      class="help-block text-center" style="color: green;">
                  <i class="fa fa-check"></i> Las contraseñas coinciden
                </span>
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
        confirm_password: null,
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
      tipo_documentos: [],
      pickerDate: null,
      minDate: new Date(1900, 0, 1).toISOString().substr(0, 10),
      maxDate: new Date().toISOString().substr(0, 10),
      showPassword: false,
      showConfirmPassword: false
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
    },
    onDateSelected(date) {
      console.log('Fecha seleccionada:', date);
      
      // Validar que la persona tenga al menos 13 años
      const selectedDate = new Date(date + 'T00:00:00'); // Agregar hora para evitar problemas de zona horaria
      const today = new Date();
      let age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
      }
      
      if (age < 13) {
        this.$toastr('error', 'Debes tener al menos 13 años para registrarte', 'Edad mínima');
        this.pickerDate = null;
        return;
      }
      
      console.log('Fecha válida seleccionada:', date);
    },
    confirmDate() {
      // Confirmar la fecha seleccionada
      if (this.pickerDate) {
        console.log('Confirmando fecha:', this.pickerDate);
        
        // Usar Vue.set para asegurar la reactividad
        this.$set(this.usuario, 'd_fechanacimiento', this.pickerDate);
        
        console.log('Fecha guardada:', this.usuario.d_fechanacimiento);
      } else {
        console.log('No hay fecha para confirmar');
      }
      
      // Cerrar el menú
      this.menu = false;
    },
    // Método para cancelar la selección de fecha
    cancelDate() {
      console.log('Cancelando selección de fecha');
      // Limpiar pickerDate pero mantener usuario.d_fechanacimiento si ya existía
      this.pickerDate = null;
      this.menu = false;
    },
    // Método para formatear la fecha para mostrar
    formatDate(date) {
      if (!date) return '';
      
      // Crear la fecha con hora específica para evitar problemas de zona horaria
      const dateStr = date + 'T00:00:00';
      const d = new Date(dateStr);
      
      // Verificar que la fecha sea válida
      if (isNaN(d.getTime())) return '';
      
      return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    // Método para limpiar errores de contraseña cuando cambien
    limpiarErroresPassword() {
      if (this.errors.has('password')) {
        this.errors.remove('password');
      }
      if (this.errors.has('confirm_password')) {
        this.errors.remove('confirm_password');
      }
    },
    // Método para validar manualmente las contraseñas
    validarPassword() {
      if (this.usuario.password && this.usuario.confirm_password) {
        if (this.usuario.password === this.usuario.confirm_password) {
          // Las contraseñas coinciden
          this.limpiarErroresPassword();
          return true;
        } else {
          // Las contraseñas no coinciden
          this.errors.add('confirm_password', 'Las contraseñas no coinciden');
          return false;
        }
      }
      return true;
    }
  },
  watch: {
    // Watcher removido - estaba causando problemas
    'usuario.password': {
      handler() {
        // Limpiar errores cuando cambie la contraseña principal
        this.limpiarErroresPassword();
      }
    },
    'usuario.confirm_password': {
      handler() {
        // Limpiar errores cuando cambie la confirmación
        this.limpiarErroresPassword();
      }
    }
  },
  components: { Datepicker, ModelSelect, TerminosCondiciones },
  mounted() {
    // Inicializar el date picker con la fecha actual
    this.pickerDate = new Date().toISOString().substr(0, 10);
    
    // Configurar el locale español para el date picker
    if (this.$vuetify && this.$vuetify.lang) {
      this.$vuetify.lang.current = 'es';
    }
    
    console.log('Componente montado - pickerDate inicializado:', this.pickerDate);
  },
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
        !this.errors.has("password") &&
        !this.errors.has("confirm_password")
      );
    },
    terminosCondiciones() {
      return !this.terminos_condiciones;
    },
    // Fecha formateada para mostrar en el campo
    fechaFormateada() {
      if (!this.usuario.d_fechanacimiento) return '';
      return this.formatDate(this.usuario.d_fechanacimiento);
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

/* Estilos para el date picker */
.v-date-picker {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.v-date-picker .v-date-picker-table {
  border-radius: 8px;
}

.v-date-picker .v-date-picker-table__events {
  border-radius: 8px;
}

/* Mejorar la navegación del calendario */
.v-date-picker .v-date-picker-header {
  background: #ff6b35;
  color: white;
  border-radius: 8px 8px 0 0;
}

.v-date-picker .v-date-picker-header .v-btn {
  color: white !important;
}

.v-date-picker .v-date-picker-header .v-btn:hover {
  background: rgba(255,255,255,0.1);
}

/* Estilo para el campo de fecha */
.v-text-field--readonly .v-input__slot {
  background: #f5f5f5;
  cursor: pointer;
}

.v-text-field--readonly .v-input__slot:hover {
  background: #eeeeee;
}

/* Botones del date picker */
.v-date-picker .v-card__actions .v-btn {
  margin: 0 8px;
  border-radius: 4px;
}

.v-date-picker .v-card__actions .v-btn--flat {
  color: #666;
}

.v-date-picker .v-card__actions .v-btn--flat:hover {
  background: #f0f0f0;
}

/* Estilos para los campos de contraseña */
.v-text-field .v-input__append-outer {
  cursor: pointer;
  color: #666;
}

.v-text-field .v-input__append-outer:hover {
  color: #ff6b35;
}

/* Mejorar la apariencia de los campos de contraseña */
.v-text-field--password .v-input__slot {
  border-radius: 4px;
}

.v-text-field--password .v-input__slot:hover {
  border-color: #ff6b35;
}
</style>
