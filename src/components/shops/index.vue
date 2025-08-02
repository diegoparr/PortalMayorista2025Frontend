<template>
  <div class="col-xs-12">
    <div class="box box-hipertienda">
      <div class="box-header">
        <h3 class="box-title">
          <v-btn color="info" v-on:click="storeShop" v-if="permisoStore">
            <i class="fa fa-shopping-cart pull-left"></i> Registrar Tienda
          </v-btn>
        </h3>
      </div>
      <div class="box-body table-responsive">
        <table class="table table-hover">
          <tbody>
            <tr>
              <th class="text-center">Nombre</th>
              <th class="text-center">Asesor</th>
              <th class="text-center">Cliente</th>
              <th class="text-center">Pais</th>
              <th class="text-center">Ciudad</th>
              <th class="text-center">Opciones</th>
            </tr>
            <tr v-if="!dataShops">
              <td colspan="6">
                <loader></loader>
              </td>
            </tr>
            <template v-else-if="ifShops">
              <tr v-for="shop in pagination.data">
                <td class="text-center">{{shop.v_nombre}}</td>
                <td class="text-center">{{shop.asesor.v_primer_nombre + ' ' + shop.asesor.v_primer_apellido}}</td>
                <td class="text-center">{{shop.cliente.v_primer_nombre + ' ' + shop.cliente.v_primer_apellido}}</td>
                <td class="text-center">{{shop.v_nombre_pais}}</td>
                <td class="text-center">{{shop.v_nombre_ciudad}}</td>
                <td class="text-center">
                  <v-btn color="info" type="button" v-on:click="showShop(shop)"
                          :id="'buttonShow'+shop.id_m_tiendas" v-show="permisoShow"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"><i
                    class="fa fa-search"></i></v-btn>
                  <v-btn color="primary" type="button" v-show="permisoUpdate"
                          :id="'buttonUpdate'+shop.id_m_tiendas" v-on:click="updateShop(shop)"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                    <i class="fa fa-pencil"></i>
                  </v-btn>
                  <v-btn color="error" type="button" v-show="permisoDestroy"
                          :id="'buttonDestroy'+shop.id_m_tiendas" v-on:click="confirmDestroyShop(shop)"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                    <i class="fa fa-trash"></i>
                  </v-btn>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td class="text-center" colspan="4">No hay tiendas registradas</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box-footer clearfix" v-if="pagination.last_page>1">
        <ul class="pagination pagination-sm no-margin pull-right">
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(1)">
              <i class="fa fa-angle-double-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(pagination.current_page - 1)">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-for="pagina in pagesNumber" :class="[ pagina == isActived ? 'active' : '']">
            <a href="#"
               @click.prevent="cambiarPagina(pagina)">{{ pagina }}</a>
          </li>
          <li v-if="pagination.current_page < pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.current_page + 1)">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page != pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.last_page)">
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
            <show v-if="modalActive=='show'" :shop="shop" v-on:modal_close="cleanModal"></show>
            <store v-if="modalActive=='store'" v-on:modal_close="cleanModal" v-on:store="getData(1)"></store>
            <update v-if="modalActive=='update'" :shop="shop" v-on:actualizar="getData(1)"></update>
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
  import Loader from '../parts/loader.vue';
  import Show from './parts/show.vue';
  import Store from './parts/store.vue';
  import Update from './parts/update.vue';
  import RippleHandler from '../../mixin/RippleHandler';

  export default {
    mixins: [RippleHandler],
    data() {
      return {
        shop: null,
        modalActive: '',
        ifShops: false,
        dataShops: false,
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
        offset: 4,
        sizeContainer: '',
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        permisoIndexProductos: false,
      }
    },
    methods: Object.assign({}, mapMutations([
      'setValorBusquedaIndex', 'setValorBusquedaShow', 'setValorBusquedaStore', 'setValorBusquedaUpdate',
      'setValorBusquedaDestroy'
    ]), {
      getAppServices() {
        return AppServices;
      },
      getData(page) {
        this.dataShops = false;
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().getMethodsWithBearer("api/ecommerce/tiendas", token, 'paginate', page, "'asesor','cliente'")
          .then(response => {
            this.pagination = response.body;
            this.dataShops = true;
            if (this.pagination.data.length > 0)
              this.ifShops = true;
          }, errors => yo.getAppServices().mapErrorsResponses(yo, errors));
      },
      showShop(shop) {
        this.safeButtonClick(() => {
          let boton_loading = $('#buttonShow' + shop.id_m_tiendas);
          boton_loading.button('loading');
          let token = this.getUsuario.token;
          let yo = this;
          this.getAppServices().getMethodsWithBearer('api/ecommerce/tiendas/' + shop.id_m_tiendas, token, 'paginate', 1, "'asesor','cliente','telefonos','direcciones','tipoDocumentos'").then(response => {
            yo.shop = response.body;
            this.modalActive = 'show';
            $('#modal').modal('show');
            $('#modalTitle').html(response.body.v_nombre);
            boton_loading.button('reset');
          }, errors => yo.getAppServices().mapErrorsResponses(yo, errors));
        });
      },
      storeShop() {
        this.modalActive = 'store';
        $('#modal').modal('show');
        $('#modalTitle').html("REGISTRAR TIENDA");
      },
      updateShop(shop) {
        // Usar el método seguro para manejar clics en botones
        this.safeButtonClick(() => {
          let boton_loading = $('#buttonUpdate' + shop.id_m_tiendas);
          boton_loading.button('loading');
          let token = this.getUsuario.token;
          let yo = this;
          this.getAppServices().getMethodsWithBearer('api/ecommerce/tiendas/' + shop.id_m_tiendas, token, 'paginate', 1, "'asesor','cliente','telefonos','direcciones','tipoDocumentos'").then(response => {
            yo.shop = response.body;
            this.modalActive = 'update';
            $('#modal').modal('show');
            $('#modalTitle').html(response.body.v_nombre);
            boton_loading.button('reset');
            
            // Limpiar efectos ripple usando el mixin
            this.clearRippleEffectsDelayed(100);
          }, errors => {
            yo.getAppServices().mapErrorsResponses(yo, errors);
            boton_loading.button('reset');
          });
        });
      },
      confirmDestroyShop(shop) {
        this.safeButtonClick(() => {
          let boton_loading = $('#buttonDestroy' + shop.id_m_tiendas);
          boton_loading.button('loading');
          let yo = this;
          let token = this.getUsuario.token;
          this.getAppServices().confirmDestroySweet(yo).then(() => {
            this.getAppServices().destroyMethodWithBearer('api/ecommerce/tiendas/' + shop.id_m_tiendas, token)
              .then(response => {
                yo.$swal(
                  'Eliminado!',
                  'Se ha eliminado el recurso con éxito!',
                  'success'
                );
                boton_loading.button('reset');
                yo.getData(1);
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
        });
      },
      cleanModal() {
        // Usar el método seguro del mixin para cerrar el modal
        this.safeModalClose();
        
        // Limpiar el estado del modal
        this.modalActive = 'none';
        this.shop = null;
      },
      cambiarPagina(pagina) {
        this.pagination.current_page = pagina;
        this.getData(pagina);
      },
    }),
    components: {Loader, Show, Store, Update},
    mounted() {
      // Escuchar el evento de cierre del modal de Bootstrap
      $('#modal').on('hidden.bs.modal', () => {
        this.cleanModal();
      });
      
      // Aplicar estilos para deshabilitar ripple
      this.applyRippleDisableStyles();
      
      // Deshabilitar ripple en botones específicos después de un delay
      setTimeout(() => {
        this.disableRippleOnSpecificButtons();
      }, 500);
    },
    created() {
      this.sizeContainer = this.$route.meta.sizeContainer;
      this.$emit("load_data", {
        show: false
      });
      let permiso = 'index.tiendas.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        this.setValorBusquedaStore('store.tiendas.' + this.getUsuario.rol);
        this.setValorBusquedaShow('show.tiendas.' + this.getUsuario.rol);
        this.setValorBusquedaUpdate('update.tiendas.' + this.getUsuario.rol);
        this.setValorBusquedaDestroy('destroy.tiendas.' + this.getUsuario.rol);
        this.permisoStore = !!(this.obtenerPermisoStore);
        this.permisoShow = !!(this.obtenerPermisoShow);
        this.permisoUpdate = !!(this.obtenerPermisoUpdate);
        this.permisoDestroy = !!(this.obtenerPermisoDestroy);
        this.getData(this.pagination.current_page);
      } else {
        this.$router.push({name: 'dashboard'});
        this.$toastr('error', 'No posee permisos para acceder a esta acción', 'Acceso denegado');
      }
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
    })
  }
</script>
