<template>
  <div class="contenedor-explorar-productos">
    <panel-opciones></panel-opciones>
    <div class="contenedor-productos-explorar">
      <!--<div class="contenedor-opciones-filtrado-productos">
        <div class="contenedor-filtro-opcion">
          <a v-on:click="generarFiltrado('[\'v_tipo\',\'nuevo\']')"
             class="link-negro-naranja centrar-filtro-producto-explorar cursor-click">
            <span>Nuevos <i class="fa fa-cube" aria-hidden="true"></i></span>
          </a>
        </div>
        <div class="contenedor-filtro-opcion">
          <a v-on:click="generarFiltrado('[\'v_tipo\',\'usado\']')"
             class="link-negro-naranja centrar-filtro-producto-explorar cursor-click">
            <span>Usados <i class="fa fa-cubes" aria-hidden="true"></i></span>
          </a>
        </div>
        <div class="contenedor-filtro-opcion-ordenar">
          <div class="input-ordenar">
            <select name="ordenar" class="form-control" v-model="order" v-on:change="generarOrder">
              <option disabled value="">Ordenar Por</option>
              <option value="mayor">Mayor precio</option>
              <option value="menor">Menor precio</option>
              <option value="todo">Todos</option>
            </select>
          </div>
        </div>
      </div>-->
      <div class="contenedor-menu-mobile" id="contenedor_menu_mobile">
        <div class="items-menu-mobile"><img src="/dist/img/Miscompras.png" class="iconos-menu"/></div>
        <div class="items-menu-mobile"><img src="/dist/img/miscanjes.png" class="iconos-menu"/></div>
        <div class="items-menu-mobile"><img src="/dist/img/siguiendo.png" class="iconos-menu"/></div>
        <div class="items-menu-mobile"><img src="/dist/img/Categorias.png" class="iconos-menu"/></div>
        <div class="items-menu-mobile"><img src="/dist/img/tiendascerca.png" class="iconos-menu"/></div>
      </div>
      <template v-if="!cargandoData && ifData">
        <div class="productos-explorar">
          <div class="row">
            <div class="col-xs-12 col-md-6" v-for="producto in productosOrdernados">
              <div class="contenedor-producto-vista-explorar">
                <div class="contenedor-cabecera-producto-explorar">
                  <div class="contenedor-nombre-producto-explorar">
                    <span>{{producto.v_nombre}}</span>
                  </div>
                  <div class="contenedor-tipo-producto-explorar">
                    <div class="label-producto-explorar">
                      <span>{{ufirst(producto.v_tipo)}}</span>
                    </div>
                  </div>
                  <div class="contenedor-producto-descuento-explorar" v-if="producto.b_descuento">
                    <span>Des.{{producto.n_porcentaje_descuento}}%</span>
                  </div>
                  <div class="contenedor-boton-seguir-producto text-center">
                    <!--<button class="btn btn-flat btn-primary btn-seguir-producto-explorar">
                      <i class="fa fa-star" aria-hidden="true"></i>
                      Seguir
                    </button>-->
                   <!-- <seguir :tienda="producto.tienda" :tipo="tipo" :boton="boton" :siguiendo="seguidor"></seguir>-->
                    <div class="favorito">
                      <img src="/dist/img/favorito_no_u32.png">
                    </div>
                  </div>
                </div>
                <div class="contenedor-central">
                  <div class="contendor-img-producto" :style="getUrlImage(producto.v_portada)"
                       v-on:click="redirigirProducto(producto.id_m_productos)">
                  </div>
                  <div class="contenedor-img-derecha">
                    <div class="contenedor-precio-derecha">
                      <span>${{formatInvoice(producto.n_precio)}}</span>
                    </div>
                    <div class="items"><img src="/dist/img/u25.png" alt="" class="iconos">{{producto.tienda.v_nombre_provincia}}
                    </div>
                    <div class="items" v-if="producto.n_porcentaje_descuento > 0">
                      <img src="/dist/img/u27.png" alt="" class="iconos">{{producto.n_porcentaje_descuento}}
                    </div>
                    <div class="items"><img src="/dist/img/u29.png" alt="" class="iconos">{{producto.tienda.v_nombre}}
                    </div>
                  </div>
                </div>
                <div class="detalle-producto-vista-explorar">
                  <div class="contenedor-ver-tienda-producto-vista">

                    <button class="btn btn-hipertienda-oscuro btn-flat btn-ver-producto"
                            v-on:click="redirigirTienda(producto)">Ver Tienda
                    </button>
                  </div>
                  <div class="contenedor-precio-producto-explorar">
                    <div class="contenedor-interno-precio-producto-explorar">
                      <span>${{formatInvoice(producto.n_precio)}}</span>
                    </div>
                    <div class="contenedor-ubicacion-interno-precio-producto-explorar">
                      <span>{{producto.n_ventas_realizadas}} Vendidos - {{producto.tienda.v_nombre_ciudad}}</span>
                    </div>
                  </div>
                  <div class="contenedor-btn-ver-producto-explorar text-center">
                    <button class="btn btn-hipertienda-oscuro btn-flat btn-ver-producto"
                            v-on:click="redirigirProducto(producto.id_m_productos)">Ver producto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="pagination.last_page>1">
            <div class="col-xs-12 text-center">
              <ul class="pagination pagination-sm no-margin">
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
                <li v-for="pagina in pagesNumber" :class="[ pagina == isActived ? 'active-hipertienda' : '']">
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
        </div>
      </template>
      <template v-else-if="!cargandoData && !ifData">
        <div class="ctd-expl-no-data">
          <div class="cja-img-expl-no-data">
            <img src="/dist/img/404.png" alt="No encontramos resultados" class="img-expl-no-data">
          </div>
          <div class="cja-txt-expl-no-data">
            <div class="cja-tlt-expl-no-data">
              <span>Aparentemente el producto que buscan no se encuentra registrado</span>
            </div>
            <div class="txt-cja-expl-no-data">
              <span>No te preocupes nosotros lo buscaremos por ti</span>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <loader></loader>
      </template>
    </div>
   <!-- <div class="contenedor-publicidad-explorar">
      <div class="titulo-contenedor-publicidad-explorar">
        <span>Tiendas Recomendadas</span>
      </div>
      <div class="contenedor-tiendas-recomendadas">
        <div class="tienda-recomendada">
          <div class="primer-segmento-tienda">
            <div class="contenedor-img-logotipo-tienda-recomendad">
              <img src="https://eltesoro.com.co/wp-content/uploads/2016/10/puma-logo-el-tesoro.png"
                   class="img-logotipo-tienda-recomendad">
            </div>
            <div class="contenedor-nombre-tienda-recomendada">
              <span>
                <strong>Puma</strong>
              </span>
            </div>
          </div>
          <div class="segundo-segmento-tienda">
            <div class="contenedor-boton-ver-tienda">
              <a href="#" class="link-negro-naranja">Ver Tienda</a>
            </div>
            <div class="contenedor-boton-seguir-tienda-publicidad text-center">
              <button class="btn btn-flat btn-primary btn-seguir-producto-explorar">
                <i class="fa fa-star" aria-hidden="true"></i>
                Seguir
              </button>
            </div>
          </div>
        </div>
        <hr>
        <div class="tienda-recomendada">
          <div class="primer-segmento-tienda">
            <div class="contenedor-img-logotipo-tienda-recomendad">
              <img
                src="https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAA3nAAAAJGEzNTZiM2ZjLTI1OTEtNDExMi1iNzc5LTI1MDU1YzgxM2I3Yw.png"
                class="img-logotipo-tienda-recomendad">
            </div>
            <div class="contenedor-nombre-tienda-recomendada">
              <span>
                <strong>Adidas</strong>
              </span>
            </div>
          </div>
          <div class="segundo-segmento-tienda">
            <div class="contenedor-boton-ver-tienda">
              <a href="#" class="link-negro-naranja">Ver Tienda</a>
            </div>
            <div class="contenedor-boton-seguir-tienda-publicidad text-center">
              <button class="btn btn-flat btn-primary btn-seguir-producto-explorar">
                <i class="fa fa-star" aria-hidden="true"></i>
                Seguir
              </button>
            </div>
          </div>
        </div>
        <hr>
        <div class="tienda-recomendada">
          <div class="primer-segmento-tienda">
            <div class="contenedor-img-logotipo-tienda-recomendad">
              <img
                src="http://events.ethicalcorp.com/logo-library/200x200/timberland.png"
                class="img-logotipo-tienda-recomendad">
            </div>
            <div class="contenedor-nombre-tienda-recomendada">
              <span>
                <strong>Timberland</strong>
              </span>
            </div>
          </div>
          <div class="segundo-segmento-tienda">
            <div class="contenedor-boton-ver-tienda">
              <a href="#" class="link-negro-naranja">Ver Tienda</a>
            </div>
            <div class="contenedor-boton-seguir-tienda-publicidad text-center">
              <button class="btn btn-flat btn-primary btn-seguir-producto-explorar">
                <i class="fa fa-star" aria-hidden="true"></i>
                Seguir
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr>
      &lt;!&ndash;<div class="contenedor-publicidades-banners">
        <div class="contendedor-titulo-banners">
          <span>Publicidad</span>
        </div>
        <div class="banners-publicidad">
          <img src="https://www.decohunter.com/images/skycraper-magazine.jpg" class="img-banner-publicidad">
        </div>
      </div>&ndash;&gt;
    </div>-->
    <recomendadas></recomendadas>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import Loader from '../../parts/loader';
  import PanelOpciones from '../partes/PanelOpciones';
  import TiendasRecomendadas from '../partes/TiendasRecomendadas';
  import ImageHandler from '../../../mixin/ImageHandler';

  export default {
    mixins: [ImageHandler],
    components: {Loader, PanelOpciones, 'recomendadas':TiendasRecomendadas},
    name: "explorar",
    data() {
      return {
        ifData: false,
        filtrado: null,
        order: '',
        orderEndpoint: null,
        cargandoData: false,
        productosOrdernados: [],
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
        offset: 4,
        busqueda: (this.$route.params.busqueda) ? this.$route.params.busqueda : '',
      }
    },
    methods: Object.assign({}, mapMutations(['setSearch']), {
      obtenerData(pagina) {
        let busqueda = '';
        if (this.getSearch)
          busqueda = this.getSearch;
        this.cargandoData = true;
        if (this.getUsuario.estaAutenticadoFull) {
          this.buscadorConToken(this.urlsApi().endpointsBusqueda.productos.autenticado, this.getUsuario.token, busqueda, 'paginate', pagina, "'tienda'", this.filtrado, this.orderEndpoint)
            .then(response => {
              this.pagination = response.body.pagination;
              console.log("resp", response.body);
              this.productosOrdernados = response.body.orderBy;
              this.cargandoData = false;
              if (response.body.pagination.data.length > 0)
                this.ifData = true;
              else
                this.ifData = false;
            }, errors => this.mapErrorsResponses(this, errors));
        } else {
          this.buscardorSinToken(this.urlsApi().endpointsBusqueda.productos.noAutenticado, busqueda, 'paginate', pagina, 'tienda', this.filtrado, this.orderEndpoint)
            .then(response => {
              this.pagination = response.body.pagination;
              this.productosOrdernados = response.body.orderBy;
              this.cargandoData = false;
              if (response.body.pagination.data.length > 0)
                this.ifData = true;
              else
                this.ifData = false;
            }, errors => this.mapErrorsResponses(this, errors));
        }
      },
      getUrlImage: function (ruta) {
        let url = this.getImageUrl(ruta);
        return {
          'background-image': 'url(' + url + ')'
        }
      },
      cambiarPagina(pagina) {
        this.pagination.current_page = pagina;
        this.obtenerData(pagina);
      },
      redirigirTienda(producto) {
        let reg = new RegExp(producto.tienda.v_slug);
        let parts = window.location.hostname.split('.');
        if(reg.test(parts[0]))
        {
          this.$router.push('/');
        }
        else {
          console.log("son diferentes");
          let ruta = '';
          if (parts[1] !== undefined)
            ruta = location.protocol+'//'+producto.tienda.v_slug+'.'+parts[0]+'.'+parts[1] + ':'+window.location.port;
          else
            ruta = location.protocol+'//'+producto.tienda.v_slug+'.'+parts[0]+':'+window.location.port;
          console.log(ruta);
          window.location.href = ruta;
        }
      },
      redirigirProducto(id) {
        this.$router.push('/producto/' + id);
      },
      generarFiltrado(filtrado) {
        this.filtrado = filtrado;
        this.obtenerData(this.pagination.current_page);
      },
      generarOrder() {
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
        this.obtenerData(this.pagination.current_page);
      },
    }),
    computed: Object.assign({}, mapGetters(['getSearch', 'getUsuario']), {
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
      },
      nombreUsuario() {
        if (this.getUsuario.v_proveedor_acceso == 'LaHipertienda')
          return this.getUsuario.v_primer_nombre + ' ' + this.getUsuario.v_primer_apellido;
        else
          return this.getUsuario.v_nombre_mostrar;
      }
    }),
    created() {
      this.setSearch(this.$route.params.busqueda);
      this.obtenerData(this.pagination.current_page);
    },
    watch: {
      'getSearch': function (data) {
        this.obtenerData(data);
      }
    },
    destroyed() {
      this.productosOrdernados = [];
      this.pagination = {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
        data: []
      };
    }
  }
</script>
