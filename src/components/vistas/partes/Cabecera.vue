<template>
  <div>
    <v-toolbar dense flat color="white" style="z-index: 10">
      <v-responsive>
        <router-link class="link-negro-naranja" :to="{name:'index'}">
          <img class="logo hidden-sm-and-down" :src="require('@/assets/img/img_logo.png')" alt="hipertienda">
          <img style="width: 25px;height: 25px" class="logo hidden-md-and-up" src="../../../../dist/img/logo_small.png"
               alt="hipertienda">
        </router-link>
      </v-responsive>
      <v-spacer></v-spacer>
      <v-menu
        :close-on-content-click="true"
        offset-y
        style="padding-top: 20px">
        <v-text-field
          append-icon="search"
          class="mx-3"
          flat
          label="Search"
          solo-inverted
        ></v-text-field>
        <v-text-field
          ref="busqueda"
          v-model="busqueda"
          append-icon="search"
          autocomplete
          label="Buscar"
          single-line
          color="primary"
          @keyup="buscarResultados"
          class="mx-3"
          style="width: 140px"
          slot="activator">
        </v-text-field>
        <div>
          <v-app v-if="cargandoData && this.busqueda.length > 3">
            <loader></loader>
          </v-app>
          <v-app expand v-else-if="!cargandoData">
            <v-list-tile
              v-for="(coincidencia,i) in coincidencias"
              :key="i" v-on:id="coincidencia.id_m_productos"
              v-on:click="buscar(coincidencia.id_m_productos)">
              <v-list-tile-avatar>
                <img :src="getImageUrl(coincidencia.v_portada)" @error="handleImageError">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="coincidencia.v_nombre" class="link-negro-naranja"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-app>
        </div>
      </v-menu>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu
          offset-y
          origin="center center"
          transition="scale-transition">
<!--          <v-btn
            flat
            slot="activator"
            @click="getCategorias()">
            Categorias
          </v-btn>-->
          <v-list>
            <v-list-tile
              v-for="(item, i) in categorias"
              :key="i"
              :id="item.id_m_categorias"
              :categoria="item">
              <v-list-tile-title @click="seleccionCategoria(item.id_m_categorias)">
                <a class="link-negro-naranja">{{ item.v_nombre }}</a>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <template v-if="getUsuario.estaAutenticadoFull">
        <!--<v-btn icon>-->
          <!--<v-icon>notifications</v-icon>-->
        <!--</v-btn>-->
        <shopping-cart></shopping-cart>
        <v-menu :close-on-content-click="true"
                :nudge-width="200"
                v-model="menu"
                offset-y>
          <v-btn slot="activator" flat icon color="accent" @click.stop="menu = !menu">
            <v-icon>menu</v-icon>
          </v-btn>
          <v-list>
            <template v-if="getUsuario.estaAutenticadoFull">
              <v-list-tile v-if='getUsuario.rol!=="usuario"'>
                <v-list-tile-action>
                  <v-icon color="primary">menu</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <router-link class="link-negro-naranja" :to="{name:'dashboard'}">
                      Panel administrativo
                    </router-link>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="primary">settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title :click="abrirModal">
                    <router-link class="link-negro-naranja" :to="{name:'panelUsuario'}">
                      <span>Mi cuenta</span>
                    </router-link>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="primary">remove_circle_outline</v-icon>
                </v-list-tile-action>
                <v-list-tile-content v-on:click="logOut" v-model="menu">
                  <v-list-tile-title>
                    <a class="link-negro-naranja">
                      <span>Cerrar Sesion</span>
                    </a>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-toolbar-items dark class="hidden-sm-and-down">
          <v-btn flat color="primary" class="caption" :to="{name:'access'}">Acceder</v-btn>
          <v-btn flat color="primary" class="caption" :to="{name:'register'}">Registrate</v-btn>
          <v-btn flat color="primary" class="caption" v-on:click="openModal">¿Quieres Vender?</v-btn>
        </v-toolbar-items>
        <div style="margin-right: 10px">
          <shopping-cart></shopping-cart>
        </div>
        <v-menu class="hidden-md-and-up" :close-on-content-click="true"
                :nudge-width="200"
                v-model="menu"
                offset-y>
          <v-btn slot="activator" flat icon color="accent" @click.stop="menu = !menu">
            <v-icon>menu</v-icon>
          </v-btn>
          <v-list class="hidden-md-and-up">
            <template v-if="!getUsuario.estaAutenticadoFull">
              <v-list-tile>
                <v-list-tile-action>
                  <img src="../../../../dist/new/ingresar.png" style="height: 30px"/>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <router-link class="link-negro-naranja" :to="{name:'access'}">
                      Acceder / Registrarse
                    </router-link>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="primary">settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title v-on:click="openModal">
                    <a href="#" class="link-negro-naranja">
                      <span>¿Quieres Vender?</span>
                    </a>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-menu>
      </template>
    </v-toolbar>
    <v-dialog v-model="dialog1" max-width="600">
      <v-container style="background-color: white">
        <v-card flat class="text-xs-center">
          <form class="container" v-on:submit.prevent="enviarMail">
            <img class="logo hidden-sm-and-down" :src="require('@/assets/img/img_logo.png')" alt="hipertienda">
            <img style="width: 25px;height: 25px" class="logo hidden-md-and-up"
                 src="../../../../dist/img/logo_small.png"
                 alt="hipertienda">
            <v-card-title>
              Diligencia el siguiente formulario y nos pondremos en contacto contigo
            </v-card-title>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  single-line
                  prepend-icon="fa fa-user"
                  label="Nombre"
                  name="v_nombre"
                  data-toggle="tooltip" required id="v_nombre"
                  title="Ingrese el nombre" v-validate="'required|alpha_spaces|min:2|max:100'"
                  data-vv-as="nombre" v-model="datos.v_nombre">
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  single-line
                  prepend-icon="fa fa-envelope"
                  label="Email"
                  name="v_email"
                  data-toggle="tooltip" required id="v_email"
                  title="Ingrese el email" v-validate="'required|numeric|min:7|max:10'"
                  data-vv-as="email" v-model="datos.v_email">
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  single-line
                  prepend-icon="fa fa-phone"
                  label="Teléfono"
                  name="v_telefono"
                  data-toggle="tooltip" required id="v_telefono"
                  title="Ingrese el telefono" v-validate="'required|numeric|min:7|max:10'"
                  data-vv-as="telefono" v-model="datos.v_telefono">
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-select
                  single-line
                  class="link-negro-naranja"
                  ref="datos.v_asunto"
                  prepend-icon="fa fa-at"
                  :items="asuntos"
                  v-model="datos.v_asunto"
                  label="Asunto"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex class="text-xs-center">
                <p>O comunícate al teléfono 4942755 y con gusto te atenderemos</p>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-btn type="submit" color="primary" :disabled="deshabilitar">Enviar</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click.stop="dialog1=false">Cerrar</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import Loader from '../../parts/loader.vue';
  import ShoppingCart from '../shopping-cart/ShoppingCart.vue';
  import {ModelSelect} from "vue-search-select";
  import AppServices from '../../AppServices';
  import ImageHandler from '../../../mixin/ImageHandler';

  export default {
    data() {
      return {
        dataCategorias: false,
        categorias: null,
        clipped: false,
        menu: false,
        menuMovil: false,
        tiendas: false,
        fixed: false,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Hipertienda',
        busqueda: '',
        busquedaMovil: '',
        mostrarOpcionesUsuario: false,
        botonIrPanelAdministrativo: false,
        cargandoData: false,
        hayData: false,
        coincidencias: [],
        elegido: '',
        valores: [],
        id: null,
        dialog1: false,
        asuntos: [{value: "Vender", text: "Vender"}, {value: "Pautar", text: "Pautar"}],
        datos: {
          v_nombre: '',
          v_telefono: '',
          v_email: '',
          v_asunto: '',
        }
      }
    },
    components: {Loader, ShoppingCart, ModelSelect},
    mixins: [ImageHandler],
    computed: Object.assign({}, mapGetters([
      'getAutenticadoFull',
      'getUsuario',
      'ProductsQuantity'
    ]), {
      nombreUsuario() {
        if (this.getUsuario.v_proveedor_acceso === 'LaHipertienda')
          return this.getUsuario.v_primer_nombre + ' ' + this.getUsuario.v_primer_apellido;
        else
          return this.getUsuario.v_nombre_mostrar;
      },
      deshabilitar() {
        return !(!this.errors.has('v_nombre') && !this.errors.has('v_telefono') && !this.errors.has('v_correo'));
      }
    }),
    name: "cabecera",
    methods: Object.assign({}, mapMutations([
      'setSearch', 'setUsuarioDestroy', 'setProducto'
    ]), {
      seleccionCategoria(id) {
        this.$router.push('/categorias/' + id);
        this.$router.go();
      },
      getCategorias() {
        let where = "['nueva_cat', true]";
        this.getAppServices().getMethodWithoutBearer(this.urlsApi().endpointsCategorias.categoriasPadre, 'all', null, null, null, where)
          .then(response => {
            this.categorias = response.body.orderBy;
            this.dataCategorias = true;
            if (this.categorias > 0) {
              this.hayCategorias = true;
            }
          }, errors => {
            this.$toastr('error', 'Ocurrió un error cargando los categorias', 'Cargando Categorias');
          });
      },
      getAppServices() {
        return AppServices;
      },
      openModal() {
        this.dialog1 = true;
      },
      cleanModal() {
        $('#modalpauta').modal('hide');
        $('#modalCarrito').modal('hide');
        this.v_nombre = '';
        this.v_telefono = '';
        this.v_email = '';
      },
      verCarrito() {
        $('#modalCarrito').modal('show')
      },
      logOut() {
        this.setUsuarioDestroy();
        this.$router.push({name: 'index'});
        let yo =this;
        this.getAppServices().setCleanPermissions(yo);
        this.menu = false;
        this.$router.push({name: 'index'});
      },
      pauta() {
        $('#modalpauta').modal('show')
      },
      redirigirInicio() {
        this.$router.push('/');
      },
      MostrarOcultarOpcionesUsuario() {
        let opciones = $('#opciones-usuario');
        if (this.mostrarOpcionesUsuario) {
          opciones.attr('class', 'opciones-del-usuario ocultar-opciones-usuario');
          this.mostrarOpcionesUsuario = false;
        } else {
          opciones.attr('class', 'opciones-del-usuario mostrar-opciones-usuario');
          this.mostrarOpcionesUsuario = true;
        }
      },
      buscarMovil() {
        this.$router.push('/producto/' + this.busquedaMovil);
      },
      buscar(id) {
        this.$router.push('/producto/' + id);
      },
      buscarResultadosMovil() {
        this.busqueda = this.busquedaMovil;
        this.buscarResultados();

      },
      abrirModal() {
        $('#modalPass').modal('show');
      },
      enviarMail() {
        this.$validator.validateAll().then(() => {
          let token = this.getUsuario.token;
          let boton_registrar = $('#submitButton');
          boton_registrar.button('loading');
          let formData = new FormData();
          formData.append('v_nombre', this.datos.v_nombre);
          formData.append('v_telefono', this.datos.v_telefono);
          formData.append('v_email', this.datos.v_email);
          formData.append('v_asunto', this.datos.v_asunto);
          let yo = this;
          this.getAppServices().postMethodWithoutBearer('api/contacto', formData)
            .then(response => {
              boton_registrar.button('reset');
              yo.$toastr('success', response.body.mensaje, "Contacto Enviado");
              $('#modalpauta').modal('hide');
              this.dialog1 = false;
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
      buscarResultados() {
        let button_loader = $('#buttonLoader');
        button_loader.button('loading');
        this.cargandoData = true;
        let string = this.busqueda;
        let filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890 ';//Caracteres validos
        let out = '';
        for (let i = 0; i < string.length; i++)
          if (filtro.indexOf(string.charAt(i)) !== -1)
            out += string.charAt(i);
        // this.busqueda = out.trim();
        if (this.busqueda.length > 3) {
          this.setSearch(this.busqueda);
          if (this.getUsuario.estaAutenticadoFull) {
            this.buscadorConToken(this.urlsApi().endpointsBusqueda.productos.autenticado, this.getUsuario.token, this.busqueda.trim(), 'all', 1, null, null, null)
              .then(response => {
                button_loader.button('reset');
                this.coincidencias = response.body.pagination;
                console.log(this.coincidencias);
                //this.productosOrdernados = response.body.orderBy;
                this.cargandoData = false;
              }, errors => this.mapErrorsResponses(this, errors));
          } else {
            this.buscardorSinToken(this.urlsApi().endpointsBusqueda.productos.noAutenticado, this.busqueda, 'all', 1, null, null, null)
              .then(response => {
                button_loader.button('reset');
                this.coincidencias = response.body.pagination;
                //this.productosOrdernados = response.body.orderBy;
                this.cargandoData = false;
              }, errors => this.mapErrorsResponses(this, errors));
          }
        }
      },
      entrarLaHipertienda() {
        this.$router.push('/buscar/' + this.busqueda);
      },
    }),
    created() {
      this.getCategorias();
      this.botonIrPanelAdministrativo = (this.getUsuario.rol === 'rol_usuario');
    },
  }
</script>
<style scoped>
  .logo {
    height: 40px;
    width: auto;
  }
</style>

