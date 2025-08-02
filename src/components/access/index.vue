<template>
  <div class="app">
    <div class="login-box">
      <template v-if="formularioMostrar==='acceso'">
        <div class="login-box-body">
          <div class="login-logo">
            <router-link class="links-hipertienda" :to="{name:'explore'}">
              <img src="/dist/img/img_logo.png"
                   class="img-responsive-center"
                   alt="Logo">
            </router-link>
          </div>
          <p class="login-box-msg">¡De Todo para Todos!</p>
          <div v-if="cargandoData">
            <loader></loader>
          </div>
          <div v-else>
            <form v-on:submit.prevent="checkForm" v-on:keyup.enter="checkForm">
              <v-layout>
                <v-flex :class="(!errors.first('email'))?'form-group':'form-group has-error'">
                  <v-text-field single-line prepend-icon="fa fa-user" v-model="user.email" name="login" label="Usuario"
                                type="text"
                                v-validate="'required|email|min:5|max:255'"></v-text-field>
                  <span v-show="errors.has('email')" class="help-block text-center">{{ errors.first('email')}}</span>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex :class="(!errors.first('password'))?'form-group':'form-group has-error'">
                  <v-text-field
                    single-line v-model="user.password"
                    prepend-icon="fa fa-lock" name="password" label="Contraseña" type="password"
                    v-validate="'required|min:8|max:25|alpha_num'"></v-text-field>
                  <span v-show="errors.has('password')"
                        class="help-block text-center">{{ errors.first('password')}}</span>
                </v-flex>
              </v-layout>
              <div class="row">
                <div class="col-xs-12 text-center">
                  <sendMail></sendMail>
                </div>
                <div class="col-xs-12 text-center" style="margin: 0 0 10px 0;">
                  <a href="#" v-on:click="registrarse" class="links-hipertienda">¡Registrate es gratis!</a>
                </div>
              </div>
              <div class="row text-xs-center">
                <div class="col-xs-6 col-xs-offset-3">
                  <v-btn v-on:click="checkForm" fab icon outline :disabled="disabledButtonSubmit" color="primary">
                    <v-icon>fa-sign-in fa-2x</v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="row text-xs-center">
                <div class="col-xs-6">
                  <v-btn fab icon outline flat style="color: #EA4335" v-on:click="iniciarGoogle">
                    <v-icon>fa-google-plus fa-2x</v-icon>
                  </v-btn>
                </div>
                <div class="col-xs-6">
                  <v-btn fab icon outline flat style="color: #4267B2" v-on:click="iniciarFacebook">
                    <v-icon>fa-facebook fa-2x</v-icon>
                  </v-btn>
                </div>
              </div>
            </form>
          </div>

        </div>
      </template>
      <template v-else>
        <completar-registro
          :usuarioRedesSociales="usuarioRedesSociales"
          v-on:cancelar_proceso="cancelarProceso">
        </completar-registro>
      </template>
    </div>
  </div>

</template>
<script>
import AppServices from "../AppServices";
import Loader from "../parts/loader";
import { mapGetters, mapMutations } from "vuex";
import CompletarRegistro from "./partes/CompletarRegistro";
import newPassword from "../newPassword/newPassword";
import sendMail from "./partes/sendMail";

export default {
  name: "access",
  data() {
    return {
      cargandoData: false,
      user: {
        email: null,
        password: null
      },
      formularioMostrar: "acceso",
      usuarioRedesSociales: null
    };
  },
  props: ["modal", "cambiar"],
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
      "setMenuReiniciar",
      "setCarrito"
    ]),
    {
      getAppServices() {
        return AppServices;
      },
      registrarse() {
        if (this.modal) {
          console.log("cambie");
          this.$emit("cambiar");
        } else {
          this.$router.push({ name: "register" });
        }
      },
      checkForm() {
        this.$validator.validateAll().then(() => {
          let boton_loading = $("#submitButton");
          boton_loading.button("loading");
          let yo = this;
          yo.cargandoData = true;
          this.postMethodWithoutBearer(
            this.urlsApi().endpointAcceso,
            this.user
          ).then(
            response => {
              console.log("me loguee", response);
              console.log("vue_instance",yo);

              yo.setPermissions(yo, response);
              yo.setUserData(yo, response, true);
              //yo.setCarrito();
              boton_loading.button("reset");
              if (response.body.rol === "rol_usuario")
                yo.$router.push({ name: "explore" });
              else yo.$router.push({ name: "dashboard" });
              yo.cargandoData = false;
            },
            errors => {
              yo.mapErrorsResponses(yo, errors);
              yo.cargandoData = false;
            }
          );
        });
        this.$emit("cleanModal");
      },
      iniciarGoogle() {
        let boton_loading = $("#botonGoogle");
        boton_loading.button("loading");
        let yo = this;
                  yo.cargandoData = true;
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("profile");
        provider.addScope("email");
        
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
            let token = result.credential.accessToken;
            let user = result.user;
            console.log("SOY UN LOG SALVAJE");
            console.log("user_result",result);
            let usuarioRedesSociales = {
              v_primer_nombre: result.additionalUserInfo.profile.given_name,
              v_primer_apellido: result.additionalUserInfo.profile.family_name,
              v_avatar: user.photoURL,
              email: result.additionalUserInfo.profile.email,
              v_nombre_mostrar: user.displayName,
              v_uid: user.uid,
              v_token_acceso: token,
              v_api_key: user.h.f.b,
              v_proveedor_acceso: user.providerData[0].providerId,
              v_origen_registro: "Web"
            };
            yo.usuarioRedesSociales = usuarioRedesSociales;
            yo
              .postMethodWithoutBearer(
                yo.urlsApi().endpointsRedesSociales.verificar,
                usuarioRedesSociales
              )
              .then(
                response => {
                  boton_loading.button("reset");
                  if (response.body.accion !== "acceder")
                    yo.formularioMostrar = response.body.accion;
                  else {
                    yo.setPermissions(yo, response);
                    yo.setUserData(yo, response, true);
                    if (response.body.rol === "rol_usuario")
                      yo.$router.push({ name: "explore" });
                    else yo.$router.push({ name: "dashboard" });
                  }
                  yo.$emit("cleanModal");
                  yo.cargandoData = false;
                },
                errors => {
                  this.mapErrorsResponses(this, errors);
                  yo.cargandoData = false;
                }
              );
          })
          .catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
            console.log("Error en autenticación de Google:", error);
            boton_loading.button("reset");
            yo.cargandoData = false;
            yo.$emit("cleanModal");
            // Mostrar mensaje de error al usuario
            if (errorCode === 'popup-closed-by-user') {
              yo.$toastr('warning', 'Se cerró la ventana de autenticación', 'Autenticación cancelada');
            } else {
              yo.$toastr('error', 'Error en la autenticación con Google', 'Error');
            }
          });
      },
      iniciarFacebook() {
        let boton_loading = $("#botonFacebook");
        boton_loading.button("loading");
        yo.cargandoData = true;
        let yo = this;
        let provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope("email");
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
            console.log("result",result);
            let token = result.credential.accessToken;
            let user = result.user;
            let usuarioRedesSociales = {
              v_primer_nombre: result.additionalUserInfo.profile.first_name,
              v_primer_apellido: result.additionalUserInfo.profile.last_name,
              v_avatar: user.photoURL,
              email: user.providerData[0].email,
              v_nombre_mostrar: user.displayName,
              v_uid: user.uid,
              v_token_acceso: token,
              v_api_key: user.h.f.b,
              v_proveedor_acceso: user.providerData[0].providerId,
              v_origen_registro: "Web"
            };
            yo.usuarioRedesSociales = usuarioRedesSociales;
            yo
              .postMethodWithoutBearer(
                yo.urlsApi().endpointsRedesSociales.verificar,
                usuarioRedesSociales
              )
              .then(
                response => {
                  boton_loading.button("reset");
                  if (response.body.accion !== "acceder")
                    yo.formularioMostrar = response.body.accion;
                  else {
                    yo.setPermissions(yo, response);
                    yo.setUserData(yo, response, true);
                    if (response.body.rol === "rol_usuario")
                      yo.$router.push({ name: "explore" });
                    else yo.$router.push({ name: "dashboard" });
                    yo.$emit("cleanModal");
                  }
                  yo.cargandoData = false;

                },
                errors =>{
                  yo.cargandoData = false;
                  yo.mapErrorsResponses(this, errors);
                } 
              );
          })
          .catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
            yo.$emit("cleanModal");
          });
      },
      cancelarProceso() {
        this.formularioMostrar = "acceso";
        this.$emit("cleanModal");
      }
    }
  ),
  computed: Object.assign({}, mapGetters(["getUsuario"]), {
    disabledButtonSubmit: function() {
      return !(!this.errors.has("email") && !this.errors.has("password"));
    }
  }),
  components: { CompletarRegistro, newPassword, sendMail, Loader }
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
