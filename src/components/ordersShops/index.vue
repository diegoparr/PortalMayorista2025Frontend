<template>
  <div :class="sizeContainer">
    <div class="box">
      <div class="box-header">
        <div class="col-md-4 offset-md-4" >
          <model-select :options="tiendas" id="tienda" v-model="tienda" class="form-control"
                         v-on:input="seleccionarTienda"
                        data-placement="left" title="Selecciona el pais"
                        required>
          </model-select>
        </div>
      </div>
        <div class="box-body table-responsive padding">
          <table class="table table-hover">

            <tbody>
            <tr>
              <th class="text-center">Id</th>
              <th class="text-center">Comprador</th>
              <th class="text-center">Estatus</th>
              <th class="text-center">Total Pedido</th>
              <th class="text-center">Opciones</th>
            </tr>
            <tr v-if="!dataPedidos && tiendaSeleccionada">
              <td colspan="5" >
                <div class="loader">
                  <hr>
                </div>
              </td>
            </tr>
            <template v-else-if="hayPedidos && tiendaSeleccionada">
              <tr v-for="order in pagination.data">
                <td class="text-center">{{order.id_m_pedido_tiendas}}</td>
                <td class="text-center">{{order.usuario.name}}</td>
                <td class="text-center">{{order.v_status}}</td>
                <td class="text-center">{{order.n_total}}</td>
                <td class="text-center">
                  <v-btn color="info" type="button" v-on:click="btnVerPedido(order)"
                          :id="'buttonShow'+order.id_m_pedido_tiendas"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"><i
                    class="fa fa-search"></i></v-btn>
                  <v-btn color="error" type="button"
                          :id="'buttonDestroy'+order.id_m_pedidos" v-on:click="btnBorrarPedido(order)"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                    <i class="fa fa-trash"></i>
                  </v-btn>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="4"><h6>No hay pedidos registrados</h6></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="box-footer clearfix">
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
              <show v-if="mostrarModal=='ver'" :pedido="pedido" v-on:cerrar_modal="limpiarModal" v-on:actualizar="obtenerData(this.paginaActual,tienda.value)"></show>
              <!--<store v-if="mostrarModal=='registro'" v-on:registro="cambiarPagina(1)"
                     v-on:cerrar_modal="limpiarModal"></store>
              <show v-if="mostrarModal=='ver'" :pais="paisShow" v-on:cerrar_modal="limpiarModal"></show>
              <update v-else-if="mostrarModal=='editar'" :updatePais="paisUpdate"
                      v-on:cerrar_modal="limpiarModal" v-on:actualizar="cambiarPagina(1)"></update>-->
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade bs-example-modal-sm" id="modalDestroy" tabindex="-1" role="dialog"
           aria-labelledby="mySmallModalLabel">
        <div class="modal-dialog modal-sm" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
              <h4 class="modal-title text-center">¿Seguro que deseas eliminar el recurso?</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-xs-12" align="center">
                  <v-btn color="error" type="button" id="btnEliminar" v-on:click="eliminarPais"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Eliminando"><i
                    class="fa fa-trash pull-left"></i>
                    Eliminar Recurso
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import AppServices from '../AppServices';
  import {mapGetters, mapMutations} from 'vuex';
  import Show from './parts/show.vue';
  import {ModelSelect} from 'vue-search-select';
  /*  import Store from './parts/store.vue';
    import Show from './parts/show.vue';
    import Update from './parts/update.vue';*/

  export default {
    data() {
      return {
        tienda: {
          value: '',
          text: ''
        },
        paginaActual: 1,
        tiendas: [],
        tiendaSeleccionada: false,
        paises: [],
        dataPedidos: false,
        hayPedidos: false,
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        permisoIndexUsuarios: false,
        mostrarModal: null,
        pedido: null,
        paisUpdate: null,
        idPaisEliminar: null,
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
        offset: 4
      }
    },
    methods: Object.assign({}, mapMutations([
        'setValorBusquedaIndex', 'setValorBusquedaShow', 'setValorBusquedaStore', 'setValorBusquedaUpdate',
        'setValorBusquedaDestroy'
      ]), {
        getAppServices() {
          return AppServices;
        },
        limpiarModal() {
          this.mostrarModal = 'ninguno';
        },
        seleccionarTienda() {
          this.tiendaSeleccionada = true;
          console.log('tienda seleccionda', this.tienda.value);
          this.obtenerData(1, this.tienda.value)
        },
        obtenerData(pagina, id) {
          this.paginaActual = pagina;
          this.dataPedidos = false;
          let yo = this;
          let token = this.getUsuario.token;
          this.getAppServices().getMethodsWithBearer("api/ecommerce/pedidosTiendas", token, 'paginate', pagina, "'usuario','tienda'", "['id_m_tiendas_fk','=','" + id + "']")
            .then(response => {
              this.pagination = response.body;
              this.dataPedidos = true;
              if (this.pagination.data.length > 0)
                this.hayPedidos = true
            }, errors => {
              console.log("error", errors);
              //yo.$router.push({name: 'dashboard'});
              yo.$toastr('error', 'Ocurrió un error cargando los pedidos', 'Cargando Pedidos');
            });
        },
        btnVerPedido(pedido) {
          let boton_loading = $('#buttonShow' + pedido.id_m_pedidos);
          boton_loading.button('loading');
          let token = this.getUsuario.token;
          let yo = this;
          this.getAppServices().getMethodsWithBearer("api/ecommerce/pedidosTiendas/" + pedido.id_m_pedido_tiendas, token, 'paginate', 1, "'usuario'")
            .then(response => {
              yo.pedido = response.body;
              console.log('pedido fuera', yo.pedido);
              this.mostrarModal = 'ver';
              $('#modal').modal('show');
              $('#modalTitle').html("Pedido # " + response.body.id_m_pedido_tiendas);
              boton_loading.button('reset');
            }, errors => {
              $('#modal').modal('hide');
              this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
            });
        },
        btnEditarPais(pais) {
          let boton_loading = $('#buttonUpdate' + pais.id_m_paises);
          boton_loading.button('loading');
          let token = this.getUsuario.token;
          let yo = this;
          this.getAppServices().getMethodsWithBearer("api/avanzamas/paises/" + pais.id_m_paises, token, 'paginate', 1)
            .then(response => {
              yo.paisUpdate = response.body;
              this.mostrarModal = 'editar';
              $('#modal').modal('show');
              $('#modalTitle').html(response.body.v_nombre);
              boton_loading.button('reset');
            }, errors => {
              $('#modal').modal('hide');
              this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
            });
        },
        btnBorrarPedido(pais) {
          $('#modalDestroy').modal('show');
          this.idPaisEliminar = pais.id_m_paises;
        },
        eliminarPais() {
          let yo = this;
          let token = this.getUsuario.token;
          let boton_eliminar = $('#btnEliminar');
          boton_eliminar.button('loading');
          this.getAppServices().destroyMethodWithBearer('api/avanzamas/paises/' + this.idPaisEliminar, token)
            .then(response => {
              $('#modalDestroy').modal('hide');
              yo.$toastr('success', response.body.mensaje, "Acción exitosa");
              boton_eliminar.button('reset');
              yo.cambiarPagina(1);
            }, errors => {
              yo.$toastr('error', errors.body.mensaje, "Error desconocido");
              boton_eliminar.button('reset');
            });
        },
        cambiarPagina(pagina) {
          this.pagination.current_page = pagina;
          this.obtenerData(pagina,  this.tienda.value);
        },
      }
    ),
    created() {
      let yo = this;
      this.sizeContainer = this.$route.meta.sizeContainer;
      this.$emit("load_data", {
        show: false
      });
      let token = this.getUsuario.token;
      this.getAppServices().getMethodsWithBearer("api/ecommerce/tiendas", token, 'pluck', 1, null)
        .then(response => {
          yo.tiendas = response.body;
        }, errors => {
          yo.$router.push({name: 'panel'});
          yo.$toastr('error', 'Ocurrió un error cargando los paises', 'Cargando Pais');
        });
      let permiso = 'index.pedidosTiendas.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
      if (this.obtenerPermisoIndex) {
        yo.setValorBusquedaStore('store.pedidosTiendas.' + yo.getUsuario.rol);
        yo.setValorBusquedaShow('show.pedidosTiendas.' + yo.getUsuario.rol);
        yo.setValorBusquedaUpdate('update.pedidosTiendas.' + yo.getUsuario.rol);
        yo.setValorBusquedaDestroy('destroy.pedidosTiendas.' + yo.getUsuario.rol);
        yo.permisoStore = !!(yo.obtenerPermisoStore);
        yo.permisoShow = !!(yo.obtenerPermisoShow);
        yo.permisoUpdate = !!(yo.obtenerPermisoUpdate);
        yo.permisoDestroy = !!(yo.obtenerPermisoDestroy);
        //this.obtenerData(this.pagination.current_page);
      } else {
        yo.$router.push({name: 'panel'});
        yo.$toastr('error', 'No posee permisos para acceder a esta acción', 'Acceso denegado');
      }
    },
    //components: {Show, Update, Store},
    components: {Show, ModelSelect},
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
        if (from < 1) {
          from = 1;
        }
        let to = from + (this.offset * 2);
        if (to >= this.pagination.last_page) {
          to = this.pagination.last_page;
        }
        let pagesArray = [];
        while (from <= to) {
          pagesArray.push(from);
          from++;
        }
        return pagesArray;
      }
    }),
  }
</script>
