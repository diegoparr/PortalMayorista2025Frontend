<template>
  <div class="col-xs-12">
    <div class="box box-hipertienda">
      <div class="box-header">
        <div class="row">
          <div class="col-xs-2 col-md-6">
            <h3 class="box-title">
              <v-btn color="info" :disabled="!shopSelect" v-on:click="storeProduct">
                <i class="fa fa-archive  pull-left"></i>
                <span id="textButtonSelectShop">{{(shopSelect) ? shop.text : 'Selecciona una tienda'}}</span>
              </v-btn>
            </h3>
          </div>
          <div class="col-xs-10 col-md-6">
            <model-select :options="shops" id="v_ciudad" v-model="shop" class="form-control"
                           v-on:input="seleccionarTienda"
                          data-placement="left" title="Selecciona la tienda"
                          required>
            </model-select>
          </div>
        </div>
      </div>
      <div class="box-body table-responsive">
        <table class="table table-hover">
          <tbody>
            <tr>
              <th class="text-center">Portada</th>
              <th class="text-center">Nombre</th>
              <th class="text-center">Precio</th>
              <th class="text-center">Opciones</th>
            </tr>
            <tr v-if="!shopSelect">
              <td colspan="4" class="text-center">Selecciona primero la tienda</td>
            </tr>
            <tr v-else-if="!dataProducts && shopSelect">
              <td colspan="4">
                <loader></loader>
              </td>
            </tr>
            <template v-else-if="ifProducts && shopSelect">
              <tr v-for="product in pagination.data">
                <td>
                  <img :src="getImageUrl(product.v_portada)" class="img-responsive" width="100" height="50" style="margin: auto;">
                </td>
                <td class="text-center">{{product.v_nombre}}</td>
                <td class="text-center">{{getHelpers().formatInvoice(product.n_precio)}}</td>
                <td>
                  <v-btn color="info" type="button" v-on:click="showProduct(product)"
                          :id="'buttonShow'+product.id_m_productos" v-if="permisoShow"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"><i
                    class="fa fa-search"></i></v-btn>
                  <v-btn color="primary" type="button" v-if="permisoUpdate"
                          :id="'buttonUpdate'+product.id_m_productos" v-on:click="updateProduct(product)"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                    <i class="fa fa-pencil"></i>
                  </v-btn>
                  <v-btn color="error" type="button" v-if="permisoDestroy"
                          v-on:click="confirmDestroyProduct(product)"
                          :id="'buttonDestroy'+product.id_m_productos"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                    <i class="fa fa-trash"></i>
                  </v-btn>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="4" class="text-center">No hay productos registrados en {{shop.text}}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="box-footer clearfix" v-if="ifProducts">
        <ul class="pagination pagination-sm no-margin pull-left">
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Primera"
               @click.prevent="getData(1,shop.value)">
              <i class="fa fa-angle-double-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="getData(pagination.current_page - 1,shop.value)">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-for="pagina in pagesNumber" :class="[ pagina == isActived ? 'active' : '']">
            <a href="#"
               @click.prevent="getData(pagina,shop.value)">{{ pagina }}</a>
          </li>
          <li v-if="pagination.current_page < pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="getData(pagination.current_page + 1,shop.value)">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page != pagination.last_page">
            <a href="#" aria-label="Ultima"
               @click.prevent="getData(pagination.last_page ,shop.value)">
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
            <store v-if="modalActive=='store'" :tienda="shop" v-on:modal_close="cleanModal"
                   v-on:store="getData(1,shop.value)"></store>
            <update v-if="modalActive=='update'" :tienda="shop" :producto="product" v-on:modal_close="cleanModal"
                    v-on:update="getData(1,shop.value)"></update>
            <show v-if="modalActive=='show'" :product="product" v-on:modal_close="cleanModal"></show>
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
  import Store from './parts/store.vue';
  import Update from './parts/update.vue';
  import Show from './parts/show.vue';
  import ImageHandler from '../../mixin/ImageHandler';

  export default {
    mixins: [ImageHandler],
    data() {
      return {
        modalActive: '',
        ifProducts: false,
        dataProducts: false,
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
        offset: 4,
        product: null
      }
    },
    components: {ModelSelect, Loader, Store, Update, Show},
    created() {
      let yo = this;
      this.sizeContainer = this.$route.meta.sizeContainer;
      this.$emit("load_data", {
        show: false
      });
      let permiso = 'index.productos.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        this.setValorBusquedaStore('store.productos.' + this.getUsuario.rol);
        this.setValorBusquedaShow('show.productos.' + this.getUsuario.rol);
        this.setValorBusquedaUpdate('update.productos.' + this.getUsuario.rol);
        this.setValorBusquedaDestroy('destroy.productos.' + this.getUsuario.rol);
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
      getData(page, shop) {
        this.dataProducts = false;
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().getMethodsWithBearer("api/ecommerce/productos", token, 'paginate', page, "'categoria','categoriaPrincipal','caracteristicas','imagenes'", "['id_m_tiendas_fk','=','" + shop + "']")
          .then(response => {
            this.pagination = response.body;
            this.dataProducts = true;
            this.ifProducts = (this.pagination.data.length > 0)
          }, errors => {
            console.log(errors);
          });
      },
      cleanModal() {
        this.modalActive = 'none';
      },
      storeProduct() {
        this.modalActive = 'store';
        $('#modal').modal('show');
        $('#modalTitle').html("REGISTRAR PRODUCTO EN LA TIENDA " + this.shop.text);
      },
      updateProduct(product) {
        console.log("producto enviado", product);
        this.product = product;
        this.modalActive = 'update';
        $('#modal').modal('show');
        $('#modalTitle').html("ACTUALIZAR PRODUCTO EN LA TIENDA " + this.shop.text);
      },
      showProduct(product) {
        this.product = product;
        this.modalActive = 'show';
        $('#modal').modal('show');
        $('#modalTitle').html(this.product.v_nombre);
      },
      confirmDestroyProduct(product) {
        let boton_loading = $('#buttonDestroy' + product.id_m_productos);
        boton_loading.button('loading');
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().confirmDestroySweet(yo).then(() => {
          this.getAppServices().destroyMethodWithBearer('api/ecommerce/productos/' + product.id_m_productos, token)
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
