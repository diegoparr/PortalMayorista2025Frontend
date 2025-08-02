<template>
  <div :class="sizeContainer">
    <div class="box">
      <div class="box-header">
        <div class="row">
          <div class="col-xs-12 col-md-12">
            <h3 class="box-title">
              <v-btn color="info"  v-on:click="storeCatalogo">
                <i class="fa fa-archive pull-left"></i>
                Registrar Plantilla
              </v-btn>
            </h3>
          </div>

        </div>
      </div>
      <div class="box-body table-responsive no-padding">
        <table class="table table-hover">
          <tbody>
          <tr>
            <th class="text-center">Portada</th>
            <th class="text-center">Nombre</th>
            <th class="text-center">Opciones</th>
          </tr>
          <tr v-if="!dataCatalogos ">
            <td colspan="4">
              <loader></loader>
            </td>
          </tr>
          <template v-else-if="ifCatalogos">
            <tr v-for="catalogo in pagination.data">
              <td>
                <img :src="getImageUrl(catalogo.v_imagen_portada)" class="img-responsive" width="100" height="50" style="margin: auto;" @error="handleImageError">
              </td>
              <td class="text-center">{{catalogo.v_nombre}}</td>
              <td  class="text-center">
                <v-btn color="info" type="button"
                        :id="'buttonShow'+catalogo.id_m_catalogos" v-show="permisoShow" v-on:click="showCatalogo(catalogo)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"><i
                  class="fa fa-search"></i></v-btn>
                <v-btn color="primary" type="button" v-show="permisoUpdate"
                        :id="'buttonUpdate'+catalogo.id_m_catalogos" v-on:click="updateCatalogo(catalogo)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-pencil"></i>
                </v-btn>
                <v-btn color="error" type="button" v-show="permisoDestroy"
                        :id="'buttonDestroy'+catalogo.id_m_catalogos"
                        v-on:click="confirmDestroyCatalogo(catalogo)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-trash"></i>
                </v-btn>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="4" class="text-center">No hay Plantillas registradas en {{shop.text}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div class="box-footer clearfix" v-if="ifCatalogos">
        <ul  class="pagination pagination-sm no-margin pull-left" >
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Primera"
               @click.prevent="cambiarPagina(1,shop.value)">
              <i class="fa fa-angle-double-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(pagination.current_page - 1,shop.value)">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-for="pagina in pagesNumber" :class="[ pagina === isActived ? 'active' : '']">
            <a href="#"
               @click.prevent="cambiarPagina(pagina,shop.value)">{{ pagina }}</a>
          </li>
          <li v-if="pagination.current_page < pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.current_page + 1,shop.value)">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page !== pagination.last_page">
            <a href="#" aria-label="Ultima"
               @click.prevent="cambiarPagina(pagination.last_page ,shop.value)">
              <i class="fa fa-angle-double-right" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title text-center" id="modalTitle"></h4>
          </div>
          <div class="modal-body">
            <store v-if="modalActive==='store'"  v-on:modal_close="cleanModal"
                   v-on:store="getData(1)"></store>
            <update v-if="modalActive==='update'"  :catalogo="catalogo" v-on:modal_close="cleanModal"
                    v-on:update="getData(1)"></update>
            <show v-if="modalActive==='show'" :catalogo="catalogo" v-on:modal_close="cleanModal"></show>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AppServices from '../AppServices';
  import Helpers from '../../helpers';
  import {mapGetters, mapMutations} from 'vuex';
  import {ModelSelect} from 'vue-search-select';
  import Loader from '../parts/loader.vue';
  import Show from './parts/show.vue';
  import Store from './parts/store.vue';
  import Update from './parts/update.vue';
  import ImageHandler from '../../mixin/ImageHandler';

  export default {
    data() {
      return {
        modalActive: '',
        ifCatalogos: false,
        dataCatalogos: false,
        shopSelect: false,
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        sizeContainer: '',
        shops: [],
        shop: {
          value: '',
          text: ''
        },
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
      }
    },
    components: {ModelSelect, Loader, Store, Update, Show},
    mixins: [ImageHandler],
    created() {
      let yo = this;
      this.sizeContainer = this.$route.meta.sizeContainer;
      this.$emit("load_data", {
        show: false
      });
      this.getData(1);
      let permiso = 'index.catalogos.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        this.setValorBusquedaStore('store.catalogos.' + this.getUsuario.rol);
        this.setValorBusquedaShow('show.catalogos.' + this.getUsuario.rol);
        this.setValorBusquedaUpdate('update.catalogos.' + this.getUsuario.rol);
        this.setValorBusquedaDestroy('destroy.catalogos.' + this.getUsuario.rol);
        this.permisoStore = !!(this.obtenerPermisoStore);
        this.permisoShow = !!(this.obtenerPermisoShow);
        this.permisoUpdate = !!(this.obtenerPermisoUpdate);
        this.permisoDestroy = !!(this.obtenerPermisoDestroy);
      } else {
        this.$router.push({name: 'dashboard'});
        this.$toastr('error', 'No posee permisos para acceder a esta acción', 'Acceso denegado');
      }
      let token = this.getUsuario.token;
      this.getAppServices().getMethodsWithBearer("api/ecommerce/tiendas", token, 'pluck')
        .then(response => {
          yo.shops = response.body;
        }, errors => yo.getAppServices().mapErrorsResponses(yo, errors));
    },
    computed: Object.assign({}, mapGetters([
      'getIndex', 'obtenerPermisoIndex', 'obtenerPermisoStore', 'obtenerPermisoShow',
      'obtenerPermisoUpdate', 'obtenerPermisoDestroy', 'getUsuario'
    ]), {
      isActived: function () {
        return this.pagination.current_page;
      },
      pagesNumber: function () {
        if (!this.pagination.to) {
          return [];
        }
        let from = this.pagination.current_page - this.offset;
        if (from < 1)
          from = 1;
        let to = from + (this.offset * 2);
        if (to >= this.pagination.last_page)
          to = this.pagination.last_page;
        let pagesArray = [];
        while (from <= to) {
          pagesArray.push(from);
          from++;
        }
        return pagesArray;
      }
    }),
    methods: Object.assign({}, mapMutations([
      'setValorBusquedaIndex', 'setValorBusquedaShow', 'setValorBusquedaStore', 'setValorBusquedaUpdate',
      'setValorBusquedaDestroy'
    ]), {
      getAppServices() {
        return AppServices;
      },
      seleccionarTienda() {
        this.shopSelect = true;
        this.getData(1, this.shop.value);
      },
      getHelpers() {
        return Helpers;
      },
      getData(page) {
        this.dataCatalogos = false;
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().getMethodsWithBearer("api/ecommerce/catalogos", token, 'paginate', page, "'categoria','categoriaPrincipal','caracteristicas','imagenes'")
          .then(response => {
            this.pagination = response.body;
            this.dataCatalogos = true;
            this.ifCatalogos = (this.pagination.data.length > 0)
          }, errors => yo.getAppServices().mapErrorsResponses(yo, errors));
      },
      cleanModal() {
        this.modalActive = 'none';
      },
      storeCatalogo() {
        this.modalActive = 'store';
        $('#modal').modal('show');
        $('#modalTitle').html("REGISTRAR PLANTILLA");
      },
      updateCatalogo(catalogo) {
        this.catalogo = catalogo;
        this.modalActive = 'update';
        $('#modal').modal('show');
        $('#modalTitle').html("ACTUALIZAR LA PLANTILLA");
      },
      showCatalogo(catalogo) {
        this.catalogo = catalogo;
        this.modalActive = 'show';
        $('#modal').modal('show');
        $('#modalTitle').html(this.catalogo.v_nombre);
      },
      confirmDestroyCatalogo(catalogo) {
        let boton_loading = $('#buttonDestroy' + catalogo.id_m_catalogos);
        boton_loading.button('loading');
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().confirmDestroySweet(yo).then(() => {
          this.getAppServices().destroyMethodWithBearer('api/ecommerce/catalogos/' + catalogo.id_m_catalogos, token)
            .then(response => {
              yo.$swal(
                'Eliminado!',
                'Se ha eliminado el recurso con éxito!',
                'success'
              );
              boton_loading.button('reset');
              yo.getData(1, this.shop.value);
            }, errors => {
              yo.$swal(
                'Ups!',
                'Ocurrió un error eliminando el recurso',
                'error'
              );
              boton_loading.button('reset');
            });
        }, () => {
          yo.$swal(
            'Cancelado',
            'Se ha cancelado el proceso!',
            'error'
          );
          boton_loading.button('reset');
        });
      }
    })
  }
</script>
