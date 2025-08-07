<template>
  <div :class="sizeContainer" id="products">
    <div class="col-xs-12">
      <div class="container-elements">
        <div class="row">
          <div class="col-xs-2 col-md-3 size-icon-elements">
            <a class="categories-links" v-on:click="generarFiltrado('[\'v_tipo\',\'nuevo\']')">
              <i class="fa fa-cubes" aria-hidden="true"></i>
              <span class="name-element">Nuevos</span>
            </a>
          </div>
          <div class="col-xs-2 col-md-3 size-icon-elements">
            <a class="categories-links" v-on:click="generarFiltrado('[\'v_tipo\',\'usado\']')">
              <i class="fa fa-cube" aria-hidden="true"></i>
              <span class="name-element">Usados</span>
            </a>
          </div>
          <div class="col-xs-2 col-md-3 size-icon-elements">
            <a class="categories-links" v-on:click="generarFiltrado(null)">
              <i class="fa fa-bars" aria-hidden="true"></i>
              <span class="name-element">Todos</span>
            </a>
          </div>
          <div class="col-xs-6 col-md-3">
            <select class="form-control" v-model="order" v-on:change="generarOrder">
              <option value="menor">Menor precio</option>
              <option value="mayor">Mayor precio</option>
              <option value="todos">Todos</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <loader v-if="loadingData"></loader>
    <div v-else>
      <div class="col-xs-12 col-sm-6 col-md-6" v-for="product in productosOrdernados">
        <div class="box box-hipertienda shadow-box-products">
          <div class="box-header with-border">
            <h3 class="box-title">
              <div class="col-xs-10">
                {{product.v_nombre}}
              </div>
              <div class="col-xs-2">
                <template v-if="product.v_tipo=='nuevo'">
                  <small class="label pull-right bg-green"> Nuevo</small>
                </template>
                <template v-else>
                  <small class="label pull-right bg-blue"> Usado</small>
                </template>
              </div>
            </h3>
          </div>
          <div class="box-body">
            <img :src="getImageUrl(product.v_portada)" class="img-responsive img-product" alt="">
          </div>
          <div class="box-footer footer-container-product">
            <div class="col-xs-6 text-center text-price-product">
              <span>${{getHelpers().formatInvoice(product.n_precio)}}</span>
            </div>
            <div class="col-xs-6">
              <button type="button" class="btn btn-hipertienda-oscuro btn-flat btn-website"
                      v-on:click="detalleProducto(product)">
                Ver Producto
              </button>
              <button type="button" class="btn btn-hipertienda-oscuro btn-flat btn-responsive"
                      v-on:click="showProduct(product)">
                Ver Producto
              </button>
            </div>
            <div class="col-xs-12 text-center margin-container-ciudad-tienda">
              <span class="location-product">
                <i class="fa fa-map-marker"
                   aria-hidden="true"></i> {{getHelpers().locationShop(product.tienda.v_nombre_ciudad)}}
              </span>
              <a v-on:click="showShop(product.tienda)" class="categories-links">
                Ver Tienda
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-7 col-xs-offset-4">
      <ul class="pagination pagination-sm no-margin pull-left">
        <li v-if="pagination.current_page > 1">
          <a href="" aria-label="Anterior"
             @click.prevent="getData(pagination.current_page - 1)">«</a>
        </li>
        <li v-for="pagina in pagesNumber[0]" :class="[ pagina == isActived ? 'active' : '']">
          <a href="#"
             @click.prevent="getData(pagina)">{{ pagina }}</a>
        </li>
        <li v-if="pagination.current_page < pagination.last_page">
          <a href="#" aria-label="Siguiente"
             @click.prevent="getData(pagination.current_page + 1)">
            <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
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
            <loader v-if="loadDataProducto"></loader>
            <div class="row" v-else>
              <div class="col-xs-12 col-md-6">
                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                  <ol class="carousel-indicators">
                    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                    <li v-for="(img,i) in product.imagenes" data-target="#carousel-example-generic" :data-slide-to="i+1"
                        class=""></li>
                  </ol>
                  <div class="carousel-inner">
                    <div class="item active">
                      <img width="300" height="200" class="img-responsive img-responsive-center"
                           :src="getImageUrl(product.v_portada)">
                    </div>
                    <div class="item" v-for="product in product.imagenes">
                      <img width="300" height="200" class="img-responsive img-responsive-center" :src="getImageUrl(product.v_url)">
                    </div>
                  </div>
                  <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                    <span class="fa fa-angle-left"></span>
                  </a>
                  <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                    <span class="fa fa-angle-right"></span>
                  </a>
                </div>
              </div>
              <div class="col-xs-12 col-md-6 container-detail-products-margin">
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab_1-1" data-toggle="tab">Descripción</a></li>
                    <li><a href="#tab_1-2" data-toggle="tab">Caracteristicas</a></li>
                  </ul>
                  <div class="tab-content">
                    <div v-html="product.v_descripcion" class="tab-pane active" id="tab_1-1"></div>
                    <div class="tab-pane" id="tab_1-2">
                      <div class="table-responsive no-padding">
                        <table class="table table-hover">
                          <tbody>
                            <tr>
                              <th class="text-center">Nombre</th>
                              <th class="text-center">Valor</th>
                            </tr>
                            <tr v-for="carac in product.caracteristicas">
                              <td class="text-center">{{carac.v_nombre}}</td>
                              <td class="text-center">{{carac.pivot.v_valor}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import AppServices from '../AppServices';
  import Helpers from '../Helpers';
  import Loader from '../parts/loader';
  import ImageHandler from '../../mixin/ImageHandler';

  export default {
    mixins: [ImageHandler],
    data() {
      return {
        sizeContainer: '',
        loadingData: false,
        loadDataProducto: false,
        ifData: false,
        productosOrdernados: [],
        product: [],
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
        offset: 4,
        filtrado: null,
        order: 'todos',
        orderEndpoint: null,
        imagenes: [],
        imagenesM: []
      }
    },
    methods: Object.assign({}, mapMutations([
      'setSearch'
    ]), {
      getAppServices() {
        return AppServices;
      },
      getHelpers() {
        return Helpers;
      },
      getData(page) {
        let busqueda = '';
        if (this.getSearch)
          busqueda = this.getSearch;
        this.loadingData = true;
        let endpoint = "api/busqueda?text=" + busqueda + '&tipo=paginate&width=[\'tienda\']&page=' + page;
        if (this.filtrado)
          endpoint += "&where=" + this.filtrado;
        if (this.orderEndpoint)
          endpoint += "&order=" + this.orderEndpoint;
        this.$http.get(endpoint)
          .then(response => {
            this.pagination = response.body.pagination;
            this.productosOrdernados = response.body.orderBy;
            this.loadingData = false;
            if (response.body.pagination.data.length > 0)
              this.ifData = true
          }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      },
      showProduct(product) {
        $('#modal').modal('show');
        $('#modalTitle').html(product.v_nombre);
        this.loadDataProducto = true;
        this.getAppServices().getMethodWithoutBearer("api/productos/" + product.id_m_productos, 'paginate', 1, "'tienda','imagenes','caracteristicas'")
          .then(response => {
            console.log(response);
            this.product = response.body;
            this.loadDataProducto = false;
          }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      },
      showShop(shop) {
        this.$router.push('/tienda/' + shop.v_slug);
      },
      generarFiltrado(filtrado) {
        this.filtrado = filtrado;
        this.getData(1);
      },
      generarOrder(event) {
        switch (this.order) {
          case 'menor':
            this.orderEndpoint = "['n_precio','asc']";
            break;
          case 'mayor':
            this.orderEndpoint = "['n_precio','desc']";
            break;
          case 'todos':
            this.orderEndpoint = null;
            break;
        }
        this.getData(1);
      },
      detalleProducto(product) {
        this.$router.push('/producto/' + product.id_m_productos);
      }
    }),
    watch: {
      'getSearch': function (data) {
        this.getData(1);
      }
    },
    created() {
      this.setSearch(this.$route.params.busqueda);
      this.sizeContainer = this.$route.meta.sizeContainer;
      this.$emit("load_data", {
        show: false
      });
      this.getData(1);
    },
    components: {Loader},
    computed: Object.assign({}, mapGetters([
      'getSearch'
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
  }
</script>
