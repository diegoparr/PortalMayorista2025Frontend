<template>
  <div>
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
                <div v-if="!imageAvatar">
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
                   <!-- Imagen del avatar -->
                   <div style="margin: 20px 0;">
                     <img :src="imageAvatar" 
                          alt="Avatar del usuario"
                          style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 3px solid #ddd;">
                   </div>
                   
                   <!-- Botón para quitar avatar -->
                   <div style="margin: 20px 0;">
                     <v-btn @click="removeImageAvatar" color="error">
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
                name="v_primer_nombre"
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
                name="v_segundo_nombre"
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
                name="v_primer_apellido"
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
                name="v_segundo_apellido"
              ></v-text-field>
              <span v-show="errors.has('v_segundo_apellido')"
                    class="help-block text-center">{{ errors.first('v_segundo_apellido')}}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <div :class="(!errors.first('v_documento'))?'form-group':'form-group has-error'">
              <v-text-field
                single-line
                prepend-icon="fa fa-id-card"
                v-model="usuario.v_documento"
                label="Documento"
                v-validate="'required|min:5|max:20'"
                name="v_documento"
                required
              ></v-text-field>
              <span v-show="errors.has('v_documento')"
                    class="help-block text-center">{{ errors.first('v_documento')}}</span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <div class="form-group">
              <v-select
                single-line
                prepend-icon="fa fa-id-card"
                :items="tipo_documentos || []"
                v-model="usuario.id_m_tipos_documentos_fk"
                label="Tipo de Documento"
                name="id_m_tipos_documentos_fk"
                item-value="value"
                item-text="text"
                required
              ></v-select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <div class="form-group">
              <v-select
                single-line
                prepend-icon="fa fa-venus-mars"
                :items="sexo"
                v-model="usuario.v_sexo"
                label="Sexo"
                name="v_sexo"
                required
              ></v-select>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <div class="form-group">
              <v-autocomplete
                ref="paises"
                prepend-icon="fa fa-globe"
                :items="paises || []"
                v-model="usuario.pais"
                v-on:input="seleccionarPais"
                label="Pais"
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
                ref="provincias"
                prepend-icon="fa fa-globe"
                :items="provincias || []"
                v-model="usuario.provincia"
                v-on:input="seleccionarProvincia"
                label="Provincia"
                 item-value="valor"
                item-text="valor.text"
              ></v-autocomplete>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <div class="form-group">
              <v-autocomplete
                ref="ciudades"
                prepend-icon="fa fa-globe"
                :items="ciudades || []"
                v-model="usuario.ciudad"
                label="Ciudad"
                 item-value="valor"
                item-text="valor.text"
              ></v-autocomplete>
            </div>
          </div>
        </div>
        <div class="row">
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
                  name="d_fechanacimiento"
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
                name="v_direccion"
                required
              ></v-text-field>
              <span v-show="errors.has('v_direccion')"
                    class="help-block text-center">{{ errors.first('v_direccion')}}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <div :class="(!errors.first('v_telefono_movil'))?'form-group':'form-group has-error'">
              <v-text-field
                required
                single-line
                prepend-icon="fa fa-mobile"
                v-model="usuario.v_telefono_movil.v_telefono"
                label="Telefono Movil"
                v-validate="'required|min:5|max:25|numeric'"
                name="v_telefono_movil"
              ></v-text-field>
              <span v-show="errors.has('v_telefono_movil')"
                    class="help-block text-center">{{ errors.first('v_telefono_movil')}}</span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <div :class="(!errors.first('v_telefono_fijo'))?'form-group':'form-group has-error'">
              <v-text-field
                single-line
                prepend-icon="fa fa-phone"
                v-model="usuario.v_telefono_fijo.v_telefono"
                label="Telefono Fijo"
                v-validate="'min:5|max:25|numeric'"
                name="v_telefono_fijo"
              ></v-text-field>
              <span v-show="errors.has('v_telefono_fijo')"
                    class="help-block text-center">{{ errors.first('v_telefono_fijo')}}</span>
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
  </div>
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
import Vue from 'vue';
import ImageHandler from '../../../../mixin/ImageHandler';

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
        v_documento: null,
        id_m_tipos_documentos_fk: null,
        v_sexo: null,
        v_telefono_fijo: { v_telefono: '' },
        v_telefono_movil: { v_telefono: '' },
        d_fechanacimiento: null,
        avatar: null,
        v_direccion: { v_direccion: '' },
        pais: { value: null, text: '' },
        provincia: { value: null, text: '' },
        ciudad: { value: null, text: '' }
      },
      imageAvatar:'',
      paises: [],
      provincias: [],
      ciudades: [],
      tipo_documentos: []
    };
  },
  mixins: [ImageHandler],
  props: ["modal", "cambiar"],
  methods: Object.assign(
    {},
    mapMutations([
      "setUsuario"]),
  {
    buscarArrayObjetos(nameKey, myArray) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
          return myArray[i];
        }
      }
      return null;
    },
    onFileChangeAvatar(e) {
        console.log('🔍 AVATAR - onFileChangeAvatar iniciado');
        console.log('🔍 AVATAR - Evento:', e);
        console.log('🔍 AVATAR - Files:', e.target.files);
        
        this.usuario.avatar = e.target.files[0];
        console.log('🔍 AVATAR - usuario.avatar asignado:', this.usuario.avatar);
        
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          console.log('🔍 AVATAR - No hay archivos, retornando');
          return;
        }
        
        console.log('🔍 AVATAR - Llamando createAvatar con:', files[0]);
        this.createAvatar(files[0]);
      },
      createAvatar(file) {
        console.log('🔍 AVATAR - createAvatar iniciado con archivo:', file);
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          console.log('🔍 AVATAR - FileReader onload ejecutado');
          console.log('🔍 AVATAR - Resultado:', e.target.result);
          vm.imageAvatar = e.target.result;
          console.log('🔍 AVATAR - imageAvatar asignado:', vm.imageAvatar);
          console.log('🔍 AVATAR - Estado final - usuario.avatar:', vm.usuario.avatar);
          console.log('🔍 AVATAR - Estado final - imageAvatar:', vm.imageAvatar);
          
          // Forzar actualización de la interfaz
          vm.$forceUpdate();
          console.log('🔍 AVATAR - $forceUpdate ejecutado');
          
          // Verificar el estado después de la actualización
          setTimeout(() => {
            console.log('🔍 AVATAR - Estado después de $forceUpdate:');
            console.log('🔍 AVATAR - imageAvatar:', vm.imageAvatar);
            console.log('🔍 AVATAR - !imageAvatar (condición v-if):', !vm.imageAvatar);
          }, 100);
        };
        reader.readAsDataURL(file);
      },
      removeImageAvatar: function () {
        console.log('🔍 AVATAR - removeImageAvatar iniciado');
        console.log('🔍 AVATAR - Estado antes - usuario.avatar:', this.usuario.avatar);
        console.log('🔍 AVATAR - Estado antes - imageAvatar:', this.imageAvatar);
        
        this.usuario.avatar = '';
        this.imageAvatar = '';
        
        console.log('🔍 AVATAR - Estado después - usuario.avatar:', this.usuario.avatar);
        console.log('🔍 AVATAR - Estado después - imageAvatar:', this.imageAvatar);
      },
    acceder() {
      if (this.modal) {
        this.$emit("cambiar");
      } else {
        this.$router.push({ name: "access" });
      }
    },
    actualizardatosperfil() {
      console.log("object", this.usuario.pais);
      this.$validator.validateAll().then(() => {
        console.log(this.usuario);
        let moment = require("moment");
        let boton_registrar = $("#submitButton");
        boton_registrar.button("Actualizando tu perfil...");
        
        // Crear objeto JSON en lugar de FormData
        let userData = {
          v_primer_nombre: this.usuario.v_primer_nombre,
          v_primer_apellido: this.usuario.v_primer_apellido,
          // Campos obligatorios del backend
          id_m_tipos_documentos_fk: this.usuario.id_m_tipos_documentos_fk,
          v_documento: this.usuario.v_documento,
          v_sexo: this.usuario.v_sexo
        };
        
        if (this.usuario.v_segundo_nombre) {
          userData.v_segundo_nombre = this.usuario.v_segundo_nombre;
        }
        if (this.usuario.v_segundo_apellido) {
          userData.v_segundo_apellido = this.usuario.v_segundo_apellido;
        }
        
        // Verificar que los objetos existan antes de acceder a sus propiedades
        if (this.usuario.pais && this.usuario.pais.value) {
          userData.id_m_paises_fk = this.usuario.pais.value;
        }
        if (this.usuario.provincia && this.usuario.provincia.value) {
          userData.id_m_provincias_fk = this.usuario.provincia.value;
        }
        if (this.usuario.ciudad && this.usuario.ciudad.value) {
          userData.id_m_ciudades_fk = this.usuario.ciudad.value;
        }
        if (this.usuario.pais && this.usuario.pais.text) {
          userData.v_nombre_pais = this.usuario.pais.text;
        }
        if (this.usuario.provincia && this.usuario.provincia.text) {
          userData.v_nombre_provincia = this.usuario.provincia.text;
        }
        if (this.usuario.ciudad && this.usuario.ciudad.text) {
          userData.v_nombre_ciudad = this.usuario.ciudad.text;
        }
        
        if (this.usuario.d_fechanacimiento) {
          // Corregir formato de fecha a Y-m-d
          userData.d_fechanacimiento = moment(this.usuario.d_fechanacimiento).format('YYYY-MM-DD');
        }
        
        // Verificar que los objetos de teléfono existan
        if (this.usuario.v_telefono_fijo && this.usuario.v_telefono_fijo.id_m_telefonos) {
          userData.id_telefono_fijo = this.usuario.v_telefono_fijo.id_m_telefonos;
        }
        if (this.usuario.v_telefono_movil && this.usuario.v_telefono_movil.id_m_telefonos) {
          userData.id_telefono_movil = this.usuario.v_telefono_movil.id_m_telefonos;
        }
        if (this.usuario.v_telefono_fijo && this.usuario.v_telefono_fijo.v_telefono) {
          userData.v_telefono_fijo = this.usuario.v_telefono_fijo.v_telefono;
        }
        if (this.usuario.v_telefono_movil && this.usuario.v_telefono_movil.v_telefono) {
          userData.v_telefono_movil = this.usuario.v_telefono_movil.v_telefono;
          // También enviar como v_telefono_celular (campo requerido)
          userData.v_telefono_celular = this.usuario.v_telefono_movil.v_telefono;
        } else {
          // Si no hay teléfono móvil, usar el teléfono fijo o un valor por defecto
          userData.v_telefono_celular = this.usuario.v_telefono_fijo && this.usuario.v_telefono_fijo.v_telefono 
            ? this.usuario.v_telefono_fijo.v_telefono 
            : this.getUsuario.v_telefono_movil || '';
        }
        
        // Verificar que el objeto de dirección exista
        if (this.usuario.v_direccion && this.usuario.v_direccion.id_m_direcciones) {
          userData.id_direccion = this.usuario.v_direccion.id_m_direcciones;
        }
        if (this.usuario.v_direccion && this.usuario.v_direccion.v_direccion) {
          userData.v_direccion = this.usuario.v_direccion.v_direccion;
        }
        
        let yo = this;
        let token = this.getUsuario.token;
        let userId = this.getUsuario.id;
        
        console.log("Enviando datos:", {
          userId: userId,
          token: token,
          userData: userData
        });
        
        this.getAppServices()
          .putMethodWithBearer("api/avanzamas/usuarios/" + userId, userData, token)
          .then(
            response => {
              console.log("Respuesta exitosa:", response);
              yo.$toastr("success", response.body.mensaje, "Registro exitoso");
              boton_registrar.button("reset");
              yo.setUserDataperfil(yo,response,yo.getUsuario);  
              yo.$router.push("/");
             },
            errors => {
              console.log("Error en la petición:", errors);
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
            this.provincias = response.body.provincias || [];
            if (this.provincias && Array.isArray(this.provincias)) {
              this.provincias.forEach(item => {
                item.valor = {
                  value: item.value,
                  text: item.text
                };
              });
            }
            this.tipo_documentos = response.body.tipo_documentos || [];
          },
          errors => this.getAppServices().mapErrorsResponses(this, errors)
        );
      
      // Recargar tipos de documento para el nuevo país
      this.cargarTiposDocumento();
    },
    seleccionarProvincia(event) {
      this.getAppServices()
        .getMethodWithoutBearer("api/ciudades/" + event.value)
        .then(
          response => {
            this.ciudades = response.body || [];
            if (this.ciudades && Array.isArray(this.ciudades)) {
              this.ciudades.forEach(item => {
                item.valor = {
                  value: item.value,
                  text: item.text
                };
              });
            }
          },
          errors => this.getAppServices().mapErrorsResponses(this, errors)
        );
    },
    getAppServices() {
      return AppServices;
    },
    cargarTiposDocumento() {
      // Cargar tipos de documento para persona Natural y el país seleccionado
      let idPais = this.usuario.pais && this.usuario.pais.value 
        ? this.usuario.pais.value 
        : (this.getUsuario.id_m_paises_fk || 45); // Por defecto Colombia
      
      // Usar Vue.http directamente para evitar parámetros extra
      Vue.http.get("api/documentos/Natural/" + idPais)
        .then(
          response => {
            console.log("Tipos de documento cargados:", response.body);
            this.tipo_documentos = response.body.tipo_documentos || [];
          },
          errors => {
            console.log("Error cargando tipos de documento:", errors);
            this.getAppServices().mapErrorsResponses(this, errors);
          }
        );
    },
    setUserDataperfil(yo, response, usuario) {
      if (response.body && response.body.data) {
        let updatedUser = response.body.data;
        updatedUser.token = usuario.token;
        updatedUser.estaAutenticadoFull = true;
        updatedUser.expiracionToken = usuario.expiracionToken;
        updatedUser.rol = usuario.rol;
        yo.setUsuario(updatedUser);
        console.log("Usuario actualizado en el store:", updatedUser);
      } else if (response.body && response.body.mensaje) {
        console.log("Respuesta del servidor:", response.body.mensaje);
      }
    }
  }),
  components: { Datepicker, ModelSelect,CambiarPassword, TerminosCondiciones,CrearPassword },
  mounted() {},
  created() {
      console.log("=== DEBUG DATOS COMPONENT ===");
      console.log("usuario_get",this.getUsuario);
      console.log("getUsuario existe:", !!this.getUsuario);
      console.log("getUsuario propiedades:", this.getUsuario ? Object.keys(this.getUsuario) : 'No existe');
      
      // Cargar datos del usuario en el formulario
      if (this.getUsuario) {
        console.log("Cargando datos del usuario en el formulario...");
        
        this.usuario.v_primer_nombre = this.getUsuario.v_primer_nombre;
        this.usuario.v_segundo_nombre = this.getUsuario.v_segundo_nombre;
        this.usuario.v_primer_apellido = this.getUsuario.v_primer_apellido;
        this.usuario.v_segundo_apellido = this.getUsuario.v_segundo_apellido;
        this.usuario.v_documento = this.getUsuario.v_documento;
        this.usuario.id_m_tipos_documentos_fk = this.getUsuario.id_m_tipos_documentos_fk;
        this.usuario.v_sexo = this.getUsuario.v_sexo;
        
        console.log("Datos básicos cargados:", {
          primer_nombre: this.usuario.v_primer_nombre,
          documento: this.usuario.v_documento,
          tipo_documento: this.usuario.id_m_tipos_documentos_fk,
          sexo: this.usuario.v_sexo
        });
        
        // Cargar teléfonos
        if (this.getUsuario.telefonos && Array.isArray(this.getUsuario.telefonos)) {
          console.log("🔍 TELEFONOS - Cargando teléfonos:", this.getUsuario.telefonos);
          console.log("🔍 TELEFONOS - Cantidad:", this.getUsuario.telefonos.length);
          this.getUsuario.telefonos.forEach((tel, index) => {
            console.log(`🔍 TELEFONOS - Teléfono ${index}:`, tel);
            console.log(`🔍 TELEFONOS - Tipo: ${tel.v_tipo}`);
            if (tel.v_tipo == "Celular"){
              console.log("🔍 TELEFONOS - Asignando a v_telefono_movil");
              this.usuario.v_telefono_movil = tel;
              console.log("🔍 TELEFONOS - v_telefono_movil asignado:", this.usuario.v_telefono_movil);
            }
            else if (tel.v_tipo == "Fijo"){
              console.log("🔍 TELEFONOS - Asignando a v_telefono_fijo");
              this.usuario.v_telefono_fijo = tel;
              console.log("🔍 TELEFONOS - v_telefono_fijo asignado:", this.usuario.v_telefono_fijo);
            } 
          });
        } else {
          console.log("🔍 TELEFONOS - No hay teléfonos o no es array:", this.getUsuario.telefonos);
          console.log("🔍 TELEFONOS - Tipo de telefonos:", typeof this.getUsuario.telefonos);
        }
        
        this.usuario.d_fechanacimiento = this.getUsuario.d_fechanacimiento;
        console.log("🔍 FECHA - Fecha de nacimiento:", this.usuario.d_fechanacimiento);
        
        // Cargar dirección
        if (this.getUsuario.direccion && Array.isArray(this.getUsuario.direccion)) {
          console.log("🔍 DIRECCION - Cargando direcciones:", this.getUsuario.direccion);
          console.log("🔍 DIRECCION - Cantidad:", this.getUsuario.direccion.length);
          this.getUsuario.direccion.forEach((dire, index) => {
            console.log(`🔍 DIRECCION - Dirección ${index}:`, dire);
            console.log(`🔍 DIRECCION - Es principal: ${dire.b_principal}`);
            if (dire.b_principal == true){
              console.log("🔍 DIRECCION - Asignando a v_direccion");
              this.usuario.v_direccion = dire;
              console.log("🔍 DIRECCION - v_direccion asignado:", this.usuario.v_direccion);
            }
          });
        } else {
          console.log("🔍 DIRECCION - No hay direcciones o no es array:", this.getUsuario.direccion);
          console.log("🔍 DIRECCION - Tipo de direccion:", typeof this.getUsuario.direccion);
        }
        
        // Cargar ubicación
        this.usuario.pais.value = this.getUsuario.id_m_paises_fk;
        this.usuario.provincia.value = this.getUsuario.id_m_provincias_fk;
        this.usuario.ciudad.value = this.getUsuario.id_m_ciudades_fk;
        this.usuario.pais.text = this.getUsuario.v_nombre_pais;
        this.usuario.provincia.text = this.getUsuario.v_nombre_provincia;
        this.usuario.ciudad.text = this.getUsuario.v_nombre_ciudad;
        this.usuario.avatar = this.getUsuario.v_avatar;
        this.imageAvatar = this.getImageUrl(this.getUsuario.v_avatar);
        
        console.log("🔍 AVATAR - Carga inicial:");
        console.log("🔍 AVATAR - getUsuario.v_avatar:", this.getUsuario.v_avatar);
        console.log("🔍 AVATAR - usuario.avatar asignado:", this.usuario.avatar);
        console.log("🔍 AVATAR - imageAvatar generado:", this.imageAvatar);
        console.log("🔍 AVATAR - getImageUrl resultado:", this.getImageUrl(this.getUsuario.v_avatar));
        
        console.log("Ubicación cargada:", {
          pais: this.usuario.pais,
          provincia: this.usuario.provincia,
          ciudad: this.usuario.ciudad
        });
        
        console.log("Usuario final en el formulario:", this.usuario);
      } else {
        console.log("No hay usuario en el store");
      }
      
      console.log("=== FIN DEBUG DATOS COMPONENT ===");
      
      // Cargar tipos de documento
      this.cargarTiposDocumento();
      
      // Cargar países
      this.getAppServices().getMethodWithoutBearer(this.urlsApi().endpointsPublicos.paises).then(
        response => {
          this.paises = response.body || [];
          if (this.paises && Array.isArray(this.paises)) {
            this.paises.forEach(item => {
              item.valor = {
                value: item.value,
                text: item.text
              };
            });
          }
        },
        errors => this.getAppServices().mapErrorsResponses(this, errors)
      );
      
      // Cargar provincias si hay país seleccionado
      if (this.usuario.pais.value) {
        this.getAppServices().getMethodWithoutBearer("api/provincias/" + this.usuario.pais.value).then(
          response => {
            this.provincias = response.body.provincias || [];
            if (this.provincias && Array.isArray(this.provincias)) {
              this.provincias.forEach(item => {
                item.valor = {
                  value: item.value,
                  text: item.text
                };
              });
            }
            this.tipo_documentos = response.body.tipo_documentos || [];
          },
          errors => this.getAppServices().mapErrorsResponses(this, errors)
        );
      }
      
      // Cargar ciudades si hay provincia seleccionada
      if (this.usuario.provincia.value) {
        this.getAppServices().getMethodWithoutBearer("api/ciudades/" + this.usuario.provincia.value).then(
          response => {
            this.ciudades = response.body || [];
            if (this.ciudades && Array.isArray(this.ciudades)) {
              this.ciudades.forEach(item => {
                item.valor = {
                  value: item.value,
                  text: item.text
                };
              });
            }
          },
          errors => this.getAppServices().mapErrorsResponses(this, errors)
        );
      }
  },
  computed: Object.assign({}, mapGetters(['getUsuario']), {
      deshabilitar: function() {
        return this.errors.has("v_primer_nombre") || this.errors.has("v_primer_apellido");
      }
    }
  ),
  watch: {
    imageAvatar: {
      handler(newVal, oldVal) {
        console.log('🔍 WATCHER - imageAvatar cambió:');
        console.log('🔍 WATCHER - Valor anterior:', oldVal);
        console.log('🔍 WATCHER - Valor nuevo:', newVal);
        console.log('🔍 WATCHER - !imageAvatar (condición v-if):', !newVal);
        console.log('🔍 WATCHER - Tipo de imageAvatar:', typeof newVal);
      },
      immediate: true
    }
  },
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

/* Eliminar espacios innecesarios */
.register-box-body {
  margin: 0 !important;
  padding: 0 !important;
}

.row {
  margin: 0 !important;
  padding: 0 !important;
}

.col-xs-12, .col-sm-12, .col-md-12, .col-sm-6, .col-md-6 {
  margin: 0 !important;
  padding: 0 !important;
}

.text-center {
  margin: 0 !important;
  padding: 0 !important;
}

h3 {
  margin: 0 !important;
  padding: 0 !important;
}

.container-imgs {
  margin: 0 !important;
  padding: 0 !important;
}

.form-group {
  margin: 0 !important;
  padding: 0 !important;
}

/* Asegurar que el formulario no tenga espacios */
form {
  margin: 0 !important;
  padding: 0 !important;
}

/* Eliminar espacios de los campos de texto */
.v-text-field {
  margin: 0 !important;
  padding: 0 !important;
}

.v-select, .v-autocomplete {
  margin: 0 !important;
  padding: 0 !important;
}

/* Eliminar espacios de los botones */
.v-btn {
  margin: 0 !important;
  padding: 0 !important;
}
</style>


