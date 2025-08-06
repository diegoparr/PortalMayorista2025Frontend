try {
  window.$ = window.jQuery = require('jquery');
  require('admin-lte');
  require('bootstrap-sass');
} catch (e) {
  console.log(e);
}

// Importar estilos globales para selects antes que cualquier componente
import './assets/css/global-selects.css';
// Importar estilos específicos para el panel de usuario
import './assets/css/panel-usuario-styles.css';
// Importar fix para el responsive del panel administrativo
import './assets/css/admin-responsive-fix.css';

import Vue from 'vue';
import App from './components/App.vue';
import Router from './router';
import VueResource from 'vue-resource';
import VueToastr from '@deveodk/vue-toastr';
import VeeValidate, {Validator} from "vee-validate";
import messagesES from "vee-validate/dist/locale/es";
import {store} from "./store/store";
import helpers from './helpers';
import VueSweetAlert from 'vue-sweetalert';
import VueFormWizard from 'vue-form-wizard';
import SocialSharing from 'vue-social-sharing';
import Tabs from 'vue-tabs-component';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueAnalytics from 'vue-analytics'
import * as VueGoogleMaps from "vue2-google-maps";
//MIXINS
import EndpointsApi from './mixin/EndpointsApi';
import AppServices from './mixin/AppServices';
import Helpers from './mixin/Helpers';
import ImageHandler from './mixin/ImageHandler';
import HttpInterceptor from './mixin/HttpInterceptor';
import ApiConfig from './config/apiConfig';
import imageConfig from './config/imageConfig';

//COMPONENTS
import ImageWithFallback from './components/parts/ImageWithFallback.vue';

let VueTruncate = require('vue-truncate-filter');
Vue.use (VueAnalytics, {
  id: 'UA-120079707-1',
  autoTracking: {
    screenview: true,
    pageviewOnLoad: true
  },
  checkDuplicatedScript: true
});
Vue.use(Vuetify,{
  theme: {
    primary: '#ec6920',
    secondary: '#f08219',
    banner: '#ffa300',
    accent: '#4b4a4b',
    error: '#cf0000',
    info: '#0093ff',
    success: '#35af36',
    warning: '#ffd900'
  }
});
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCj6xRbCqUtY1Q67mtO4pxg2P5WNEZqRGs",
    libraries: "places" // necessary for places input
  }
});

Vue.use(VueTruncate);
Vue.mixin(EndpointsApi);
Vue.mixin(AppServices);
Vue.mixin(Helpers);
Vue.mixin(ImageHandler);
Vue.mixin(HttpInterceptor);

// Registrar componente global
Vue.component('image-with-fallback', ImageWithFallback);

Vue.use(Tabs);
Vue.use(VueFormWizard);
Vue.use(VueSweetAlert);
Vue.use(SocialSharing);
Validator.localize('es', messagesES);


Vue.use(VeeValidate, {
  locale: 'es',
  dictionary: {
    es: { messages: messagesES }
  }
});

Vue.use(VueResource);
Vue.use(VueToastr, {
  defaultPosition: 'toast-top-right',
  defaultType: 'info',
  defaultTimeout: 6000
});

Router.beforeEach(
  (to, from, next) => {
    let authenticated = helpers.ifTokenExists();
    if (to.matched.some(record => record.meta.protectRoute)) {
      if (!authenticated) {
        next({
          name: 'access',
        })
      } else next()
    }
    else
      next()
  }
);

// Configuración de API según el entorno
Vue.http.options.root = ApiConfig.getApiBaseUrl();

//Desarrollo
// Vue.http.options.root = 'http://192.168.0.51';
// Vue.http.options.root = 'http://LaHipertiendaApi/';

// Configurar headers de API
Object.assign(Vue.http.headers, ApiConfig.getApiHeaders());

// Función global para procesar URLs de imágenes
Vue.prototype.$processImageUrl = function(url) {
  if (!url) return imageConfig.defaultImage;
  
  // Si es una URL absoluta del backend, convertirla a relativa en producción
  if (url.startsWith('http://82.25.91.192:8082/') || url.startsWith('https://82.25.91.192:8082/') || 
      url.startsWith('http://127.0.0.1:8000/') || url.startsWith('https://127.0.0.1:8000/')) {
    if (process.env.NODE_ENV === 'production') {
      // Extraer solo la ruta para usar el proxy de Vercel
      const urlObj = new URL(url);
      return urlObj.pathname;
    }
  }
  
  // Usar la función de limpieza existente
  return imageConfig.cleanUrl(url);
};

// Filtro global para procesar URLs de imágenes
Vue.filter('processImage', function(url) {
  if (!url) return imageConfig.defaultImage;
  
  // Si es una URL absoluta del backend, convertirla a relativa en producción
  if (url.startsWith('http://82.25.91.192:8082/') || url.startsWith('https://82.25.91.192:8082/') || 
      url.startsWith('http://127.0.0.1:8000/') || url.startsWith('https://127.0.0.1:8000/')) {
    if (process.env.NODE_ENV === 'production') {
      // Extraer solo la ruta para usar el proxy de Vercel
      const urlObj = new URL(url);
      return urlObj.pathname;
    }
  }
  
  // Usar la función de limpieza existente
  return imageConfig.cleanUrl(url);
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: Router,
  store
});
