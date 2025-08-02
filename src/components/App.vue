<template>
  <v-app  white class="fuente">
      <div v-if="!showLandingPage">
        <template v-if="showPanel">
        <loader v-if="!readyData"></loader>
        <template-main v-else></template-main>
      </template>
      <template v-if="noAdmin">
        <loader v-if="!readyData"></loader>
        <template-vistas-no-admin v-else></template-vistas-no-admin>
      </template>
      <template v-if="vistaIndex">
        <router-view></router-view>
      </template>
      <template>
        <terminos-condiciones-vendedor></terminos-condiciones-vendedor>
      </template>
      </div>
      <div v-if="showLandingPage">
        <landingpage></landingpage>
      </div>
  </v-app>
</template>


<script>
import TemplateMain from "./template/main.vue";
import Landingpage from "./vistas/landingPage/Landingpage.vue";

import TemplateVistasNoAdmin from "./vistas/baseTemplate";
import AppServices from "./AppServices";
import { mapGetters, mapMutations } from "vuex";
import Loader from "./parts/loader.vue";
import TerminosCondicionesVendedor from "./TerminosCondiciones/TerminosCondicionesVendedor.vue";

export default {
  metaInfo: {
    meta: [{ charset: "utf-8" }]
  },
  data() {
    return {
      showPanel: false,
      showLandingPage: false,
      readyData: false,
      noAdmin: false,
      vistaIndex: false,
      user: {},
      mostrarTerminos: false
    };
  },
  components: {
    TemplateMain,
    Loader,
    TemplateVistasNoAdmin,
    TerminosCondicionesVendedor,
    Landingpage
  },
  watch: {
    $route: function(to) {
      $("#modal").modal("hide");
      let body = $("#body");
      let title = $("#title");
      body.removeClass();
      body.addClass(to.meta.bodyClass);
      title.html(to.meta.pagesTitle);
      this.showPanel = to.meta.showPanel;
      this.noAdmin = to.meta.noAdmin;
      this.vistaIndex = to.meta.vistaIndex;
      let rol = this.getRol;
      let terminos = this.getAceptaTerminos;
      // Esta linea muestra los terminos y condiciones
      /*if (rol === 'rol_cliente' && terminos !== true)
          $('#terminosCondiciones').modal('show');*/
    }
  },
  created() {
    let config = {
      apiKey: "AIzaSyCp80_MHaCpCOstPaYUVBu0toT-ADPO-UU",
      authDomain: "lahipertienda-c1882.firebaseapp.com",
      databaseURL: "https://lahipertienda-c1882.firebaseio.com",
      projectId: "lahipertienda-c1882",
      storageBucket: "lahipertienda-c1882.appspot.com",
      messagingSenderId: "15882489388"
    };
    firebase.initializeApp(config);
    let auth = firebase.auth();
    let yo = this;
    /*auth.onAuthStateChanged(function (user) {
        if (user) {
          yo.usuarioRedesSociales = user;
          console.log(user);
          let usuarioRS = {
            v_avatar: yo.usuarioRedesSociales.photoURL,
            email: yo.usuarioRedesSociales.email,
            v_nombre_mostrar: yo.usuarioRedesSociales.displayName,
            v_uid: yo.usuarioRedesSociales.uid,
            v_token_acceso: user.h.b,
            v_api_key: yo.usuarioRedesSociales.h.f.b,
            v_origen_registro: user.providerData[0].providerId,
            v_proveedor_acceso: 'Web',
          };
          yo.setUsuario(usuarioRS);
        } else {
          console.warn('No conectado');
        }
      });*/
    let body = $("#body");
    let title = $("#title");
    body.addClass(this.$route.meta.bodyClass);
    title.html(this.$route.meta.pagesTitle);
    this.showPanel = this.$route.meta.showPanel;
    this.noAdmin = this.$route.meta.noAdmin;
    this.vistaIndex = this.$route.meta.vistaIndex;
    let token = this.getUsuarioTokenStore;
    if (token) {
      let expirationToken = new Date(
        parseInt(this.getUsuarioExpiracionTokenStore + "000")
      );
      let now = new Date();
      if (expirationToken > now) {
        this.setCarrito();
        this.getAppServices()
          .getMethodsWithBearer("api/avanzamas/informacion", token)
          .then(
            response => {
              yo.getAppServices().setPermissions(yo, response);
              this.user = yo
                .getAppServices()
                .setUserData(yo, response, false, token);
              yo.readyData = true;

              console.log("el rol", this.getRol);
              console.log("terminos", this.getAceptaTerminos);
            },
            errors => yo.getAppServices().mapErrorsResponses(yo, errors)
          );
      } else {
        console.log("me boto");
        this.setUsuarioDestroy();
        window.location.reload(true);
        //this.route.push('access');
      }
    } else {
      this.readyData = true;
    }
  },
  methods: Object.assign(
    {},
    mapMutations([
      "setUsuario",
      "setIndex",
      "setStore",
      "setShow",
      "setUpdate",
      "setDestroy",
      "setUsuarioDestroy",
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
      }
    }
  ),
  computed: mapGetters([
    "getUsuarioTokenStore",
    "getUsuarioExpiracionTokenStore",
    "getRol",
    "getAceptaTerminos",
    "getUsuario"
  ])
};
</script>
<style>
.application--wrap {
  min-height: 0 !important;
}

.fuente {
  font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans,
    Helvetica Neue, Arial, sans-serif !important;
}
</style>
