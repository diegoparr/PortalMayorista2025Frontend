<template>
  <div class="login-box">
    <div class="login-box-body">
      <div class="login-logo">
        <img  :src="require('@/assets/img/img_logo.png')" class="img-responsive img-responsive-center" alt="Cinque Terre">
      </div>
      <p class="login-box-msg">¡Ya casi completa tus registro!</p>
      <form v-on:submit.prevent="completarRegistroUsuarioRedesSociales">
        <div class="row">
          <div class="col-xs-12 col-md-6">
            <div class="form-group">

              <v-autocomplete
                ref="pais"
                prepend-icon="fa fa-globe"
                :items="paises"
                v-model="usuario.pais"
                v-on:input="seleccionarPais"
                label="Selecciona tu Pais"
                required
                item-value="valor"
                  item-text="valor.text"
              ></v-autocomplete>
            </div>
          </div>
          <div class="col-xs-12 col-md-6">
            <div class="form-group">
              <v-autocomplete
                ref="provincia"
                prepend-icon="fa fa-globe"
                :items="provincias"
                v-model="usuario.provincia"
                v-on:input="seleccionarProvincia"
                label="Selecciona tu Provincia"
                required
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
                ref="ciudad"
                prepend-icon="fa fa-globe"
                :items="ciudades"
                v-model="usuario.ciudad"
                label="Selecciona tu Ciudad"
                required
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
                :min="'1950-01-01'"
                :max="new Date().toISOString().substr(0, 10)"
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
                name="v_direccion"
                required
              ></v-text-field>
              <span v-show="errors.has('v_direccion')"
                    class="help-block text-center">{{ errors.first('v_direccion')}}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-6">
            <div :class="(!errors.first('v_sexo'))?'form-group':'form-group has-error'">
              <v-select
                required
                prepend-icon="fa fa-transgender"
                :items="sexo"
                v-model="usuario.v_sexo"
                label="Selecciona tu sexo"
                persistent-hint
              ></v-select>
              <span v-show="errors.has('v_sexo')"
                    class="help-block text-center">{{ errors.first('v_sexo')}}</span>
            </div>
          </div>
          <div class="col-xs-12 col-md-6">
            <div class="form-group">
              <v-text-field
                single-line
                prepend-icon="fa fa-mobile"
                v-model="usuario.v_telefono_movil"
                label="Telefono Movil"
                v-validate="'required|min:5|max:25|numeric'"
                name="v_telefono_movil"
                required
              ></v-text-field>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-6">
            <div :class="(!errors.first('v_documento'))?'form-group':'form-group has-error'">
              <v-text-field
                single-line
                prepend-icon="fa fa-address-card"
                v-model="usuario.v_documento"
                label="Documento"
                v-validate="'required|min:3|max:25|numeric'"
                name="v_documento"
                required
              ></v-text-field>
              <span v-show="errors.has('v_documento')"
                    class="help-block text-center">{{ errors.first('v_documento')}}</span>
            </div>
          </div>
          <div class="col-xs-12 col-md-6">
            <div :class="(!errors.first('v_telefono_movil'))?'form-group':'form-group has-error'">
              <v-select
                required
                prepend-icon="fa fa-address-card"
                :items="tipo_documentos"
                v-model="tipo_documento"
                label="Selecciona el tipo de documento"
                persistent-hint
              ></v-select>
              <span v-show="errors.has('v_telefono_movil')"
                    class="help-block text-center">{{ errors.first('v_telefono_movil')}}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-8 ">
            <div class="checkbox text-center">
              <label>
                <a data-toggle="modal" data-target="#terminosCondiciones">Términos y Condiciones</a>
                <v-checkbox
                  label="Aceptar"
                  color="orange darken-3"
                  v-model="terminos_condiciones"
                ></v-checkbox>
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 text-xs-center">
            <v-btn color="primary" id="submitButton" :disabled="deshabilitar || terminosCondiciones"
             v-on:click="completarRegistroUsuarioRedesSociales">
              <v-icon>fa-user</v-icon>
              &nbsp;&nbsp;Completa tu registro!
            </v-btn>
          </div>
          <div class="col-xs-12 text-center">
            <a class="links-hipertienda cursor-click" v-on:click="cancelarProceso">¿Ya estas registrado?</a>
          </div>
        </div>
      </form>
      <terminos-condiciones v-on:terminos_condiciones="terminosYcondiciones"></terminos-condiciones>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { ModelSelect } from "vue-search-select";
import TerminosCondiciones from "../../TerminosCondiciones/TerminosCondiciones";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      validacionDatePicker: {
        to: new Date(1950, 0, 1),
        from: new Date()
      },
      terminos_condiciones: false,
      paises: [],
      provincias: [],
      ciudades: [],
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
      tipo_documentos: [],
      tipo_documento: null,
      menu: false,
      usuario: {
        email: null,
        v_sexo: null,
        pais: null,
        provincia: null,
        ciudad: null,
        d_fechanacimiento: null,
        v_telefono_movil: null,
        tipo_documento: null,
        v_documento: null,
        v_direccion: null
      }
    };
  },
  name: "completar-registro",
  props: ["usuarioRedesSociales"],
  components: { Datepicker, ModelSelect, TerminosCondiciones },
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
  methods: Object.assign(
    {},
    mapMutations([
      "setUsuario",
      "setUsuarioTokenStore",
      "setUsuarioIdStore",
      "setUsuarioExpiracionTokenStore",
      "setUsuarioAutenticadoFull",
      "setIndex",
      "setStore",
      "setShow",
      "setUpdate",
      "setDestroy",
      "setMenu",
      "setIndexReiniciar",
      "setStoreReiniciar",
      "setShowReiniciar",
      "setUpdateReiniciar",
      "setDestroyReiniciar",
      "setMenuReiniciar"
    ]),
    {
      seleccionarPais(event) {
        if (!event || !event.value) {
          console.log("Evento de país inválido:", event);
          return;
        }
        
        this.getMethodWithoutBearer(
          this.urlsApi().endpointsPublicos.provincias + event.value
        ).then(
          response => {
            this.provincias = response.body.provincias || [];
            this.provincias.forEach(item => {
              item.valor = {
                value: item.value,
                text: item.text
              };
            });
            this.tipo_documentos = response.body.tipo_documentos || [];
            console.log("Provincias cargadas:", this.provincias);
            console.log("Tipos de documento cargados:", this.tipo_documentos);
          },
          errors => {
            console.log("Error cargando provincias:", errors);
            this.mapErrorsResponses(this, errors);
            this.provincias = [];
            this.tipo_documentos = [];
          }
        );
      },
      seleccionarProvincia(event) {
        if (!event || !event.value) {
          console.log("Evento de provincia inválido:", event);
          return;
        }
        
        this.ciudades = [];
        this.getMethodWithoutBearer(
          this.urlsApi().endpointsPublicos.ciudades + event.value
        ).then(
          response => {
            this.ciudades = response.body || [];
            this.ciudades.forEach(item => {
              item.valor = {
                value: item.value,
                text: item.text
              };
            });
            console.log("Ciudades cargadas:", this.ciudades);
          },
          errors => {
            console.log("Error cargando ciudades:", errors);
            this.mapErrorsResponses(this, errors);
            this.ciudades = [];
          }
        );
      },
      completarRegistroUsuarioRedesSociales() {
        console.log("user", this.usuario);
        
        // Validar que los campos requeridos estén presentes
        if (!this.usuario.pais || !this.usuario.provincia || !this.usuario.ciudad) {
          this.$toastr('error', 'Por favor completa todos los campos de ubicación', 'Campos requeridos');
          return;
        }
        
        if (!this.usuario.d_fechanacimiento) {
          this.$toastr('error', 'Por favor selecciona tu fecha de nacimiento', 'Campo requerido');
          return;
        }
        
        if (!this.tipo_documento) {
          this.$toastr('error', 'Por favor selecciona el tipo de documento', 'Campo requerido');
          return;
        }
        
        this.$validator.validateAll().then(() => {
          let moment = require("moment");
          let boton_registrar = $("#submitButton");
          boton_registrar.button("Registrando tus datos...");
          let formData = new FormData();
          formData.append("v_sexo", this.usuario.v_sexo);
          formData.append("v_primer_nombre", this.usuarioRedesSociales.v_primer_nombre);
          if (this.usuarioRedesSociales.v_segundo_nombre) {
            formData.append("v_segundo_nombre", this.usuarioRedesSociales.v_segundo_nombre);
          }
          else{
            formData.append("v_segundo_nombre", "");
          }
          formData.append("v_primer_apellido", this.usuarioRedesSociales.v_primer_apellido);
          if (this.usuarioRedesSociales.v_segundo_apellido) {
            formData.append("v_segundo_apellido", this.usuarioRedesSociales.v_segundo_apellido);
          }
          else{
            formData.append("v_segundo_apellido", "");
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
          formData.append("v_telefono_movil", this.usuario.v_telefono_movil);
          formData.append("id_m_tipos_documentos_fk", this.tipo_documento);
          formData.append("v_documento", this.usuario.v_documento);
          formData.append("v_direccion", this.usuario.v_direccion);
          formData.append("email", this.usuarioRedesSociales.email);
          formData.append("v_api_key", this.usuarioRedesSociales.v_api_key);
          formData.append(
            "v_nombre_mostrar",
            this.usuarioRedesSociales.v_nombre_mostrar
          );
          formData.append("v_avatar", this.usuarioRedesSociales.v_avatar);
          formData.append(
            "v_proveedor_acceso",
            this.usuarioRedesSociales.v_proveedor_acceso
          );
          formData.append(
            "v_origen_registro",
            this.usuarioRedesSociales.v_origen_registro
          );
          formData.append("v_uid", this.usuarioRedesSociales.v_uid);
          formData.append(
            "v_token_acceso",
            this.usuarioRedesSociales.v_token_acceso
          );
          let yo = this;
          this.postMethodWithoutBearer(
            this.urlsApi().endpointsRedesSociales.registrar,
            formData
          ).then(
            response => {
              yo.setPermissions(yo, response);
              yo.setUserData(yo, response, true);
              boton_registrar.button("reset");
              if (response.body.rol === "rol_usuario")
                yo.$router.push({ name: "explore" });
              else yo.$router.push({ name: "dashboard" });
            },
            errors => yo.mapErrorsResponses(yo, errors)
          );
        });
      },
      terminosYcondiciones(evento) {
        this.terminos_condiciones = evento.terminos_condiciones;
      },
      cancelarProceso() {
        // Reinicializar el formulario
        this.usuario = {
          email: null,
          v_sexo: null,
          pais: null,
          provincia: null,
          ciudad: null,
          d_fechanacimiento: null,
          v_telefono_movil: null,
          tipo_documento: null,
          v_documento: null,
          v_direccion: null
        };
        this.tipo_documento = null;
        this.terminos_condiciones = false;
        this.provincias = [];
        this.ciudades = [];
        this.tipo_documentos = [];
        this.$emit("cancelar_proceso");
      }
    }
  ),
  mounted() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
  computed: {
    deshabilitar: function() {
      return !(
        !this.errors.has("email") &&
        !this.errors.has("v_sexo") &&
        !this.errors.has("id_m_paises_fk") &&
        !this.errors.has("id_m_provincias_fk") &&
        !this.errors.has("id_m_ciudades_fk") &&
        !this.errors.has("d_fechanacimiento") &&
        !this.errors.has("v_telefono_movil") &&
        !this.errors.has("v_direccion") &&
        !this.errors.has("id_m_tipos_documentos_fk") &&
        !this.errors.has("v_documento")
      );
    },
    terminosCondiciones() {
      return !this.terminos_condiciones;
    }
  }
};
</script>
