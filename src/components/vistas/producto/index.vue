<template>
  <v-app>
    <loader v-if="cargandoData"></loader>
    <v-container grid-list-md text-xs-center v-else fluid white class="product-page-container">
      <v-layout row wrap>
        <v-flex xs12 md2>
          <v-layout>
            <v-flex>
              <v-card class="store-card" dark>
                <a v-on:click="redirigirVistaTienda()" class="store-logo-link">
                  <img 
                    :src="getImageUrl(producto.tienda.v_logo)" 
                    height="150" 
                    @error="handleImageError"
                    style="width: 100%; height: 150px; object-fit: cover; cursor: pointer; border-radius: 8px 8px 0 0;">
                </a>
                <v-card-actions class="store-actions">
                  <v-layout>
                    <v-flex xs12>
                      <seguir :modelo="producto.tienda" tipo="tiendas" :siguiendo="siguiendo_tienda"></seguir>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-card class="followers-card">
                <v-layout>
                  <v-flex xs2>
                    <v-icon color="orange" class="followers-icon">favorite</v-icon>
                  </v-flex>
                  <v-flex xs8 class="text-xs-left followers-text">Seguidores
                  </v-flex>
                  <v-flex xs2 class="followers-count">
                    {{producto.n_seguidores}}
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex class="text-xs-center">
                    <v-btn small color="orange" class="visit-store-btn" v-on:click="redirigirVistaTienda()">Visitar tienda</v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout class="hidden-sm-and-down">
            <v-flex>
              <v-card flat>
                <div v-if="defecto" style="height: 200px; width: 100%">
                  <a href="http://www.avanzamas.com.co/" target="_blank">
                    <img src="../../../../dist/new/promo2.jpg"/>
                  </a>
                </div>
                <div v-else>
                  <v-carousel hide-delimiters hide-controls style="height: 200px; width: 100%">
                    <v-carousel-item v-for="(publicidad, i) in publicidades" :key="i">
                      <a :href="getUrlPublicidad(publicidad)">
                        <img style="height: 200px; width: 150px" :src="getImageUrl(publicidad.src)" alt="" @error="handleImageError">
                      </a>
                    </v-carousel-item>
                  </v-carousel>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex sm12 md8>
          <v-layout xs12 class="hidden-md-and-up">
            <v-flex>
              <v-container>
                <v-card flat class="text-xs-center product-mobile-card">
                  <v-responsive class="text-xs-center">
                    <v-layout>
                      <v-flex>
                        <v-card class="product-image-card">
                          <img @click.stop="zoom = !zoom" :src="getImageUrl(carouselItem)" height="200" class="mobile-product-image" @error="handleImageError">
                        </v-card>
                        <v-dialog v-model="zoom">
                          <v-card>
                            <v-btn icon dark @click.native="zoom = false">
                              <v-icon color="accent">close</v-icon>
                            </v-btn>
                            <v-carousel light>
                              <v-carousel-item v-for="(imagen,i) in producto.imagenes" :key="i">
                                <v-card>
                                  <img :src="getImageUrl(imagen.v_url)" height="450" style="width: 100%; object-fit: contain;" @error="handleImageError">
                                </v-card>
                              </v-carousel-item>
                            </v-carousel>
                          </v-card>
                        </v-dialog>
                      </v-flex>
                    </v-layout>
                  </v-responsive>
                </v-card>
              </v-container>
            </v-flex>
          </v-layout>
          <v-layout class="hidden-sm-and-down">
            <v-flex xs9>
              <v-card class="product-main-card">
                <v-container>
                  <v-card flat class="text-xs-center product-image-container">
                    <v-responsive class="text-xs-center">
                      <v-layout>
                        <v-flex>
                          <a @click.stop="zoom2 = !zoom2" class="product-image-link">
                            <img :src="carouselItem" alt="" class="main-product-image">
                          </a>
                        </v-flex>
                        <v-dialog class="text-xs-center" v-model="zoom2" fullscreen hide-overlay
                                  transition="dialog-bottom-transition">
                          <v-toolbar dense>
                            <v-btn icon dark @click.native="zoom2 = false">
                              <v-icon color="accent">close</v-icon>
                            </v-btn>
                          </v-toolbar>
                          <v-card class="text-xs-center">
                            <v-container>
                              <img style="height: 700px; width: auto" :src="imagen2" alt="">
                            </v-container>
                          </v-card>
                        </v-dialog>
                      </v-layout>
                    </v-responsive>
                  </v-card>
                </v-container>
                <v-layout>
                  <v-flex>
                    <v-card flat class="product-thumbnails">
                      <v-card-title>
                        <v-container>
                          <carousel color="primary" :perPage="4" navigationEnabled
                                    :paginationEnabled="false">
                            <slide v-for="(imagen,i) in producto.imagenes" :key="i">
                              <a class="thumbnail-link">
                                <img class="product-thumbnail" @click="cambiarCarousel(imagen.v_url)"
                                     :src="getImageUrl(imagen.v_url)" alt="img" @error="handleImageError">
                              </a>
                            </slide>
                          </carousel>
                        </v-container>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                </v-layout>
                <v-tabs dark color="orange" flat class="product-tabs"
                        slider-color="white">
                  <v-tab><h6>Caracteristicas</h6></v-tab>
                  <v-tab-item>
                    <v-container>
                      <v-card flat class="characteristics-card">
                        <v-card-text>
                          <div v-for="(caracteristica,i) in producto.caracteristicas" :key="i" class="characteristic-item">
                            <v-layout>
                              <v-flex class="text-xs-left characteristic-name">
                                <b>{{ caracteristica.v_nombre }}</b>
                              </v-flex>
                              <v-flex class="text-xs-right characteristic-value">
                                {{ caracteristica.pivot.v_valor }}
                              </v-flex>
                            </v-layout>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-container>
                  </v-tab-item>
                  <v-tab><h6>Especificacion</h6></v-tab>
                  <v-tab-item>
                    <v-container>
                      <v-card flat id="scroll-target" class="specification-card scroll-y text-capitalize text-justify"
                              style="max-height: 400px">
                        <v-card-text v-html="producto.v_descripcion"></v-card-text>
                      </v-card>
                    </v-container>
                  </v-tab-item>
                </v-tabs>
              </v-card>
            </v-flex>
            <v-flex xs3>
              <v-card flat>
                <div style="color: #ec6920" class="text-xs-center"><h5>Productos Relacionados</h5></div>
                <v-layout flat id="scroll-target2"
                          style="max-height: 800px"
                          class="scroll-y text-capitalize text-justify">
                  <v-container>
                    <productos
                      :productos="productos_relacionados"
                      v-on:id="redirigirProducto"
                      v-bind:productoId="productoId">
                    </productos>
                  </v-container>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md2>
          <v-layout>
            <v-flex>
              <v-card class="product-info-card">
                <div class="product-title">{{producto.v_nombre}}</div>
                <div class="product-sales">{{producto.n_ventas_realizadas}} Vendidos</div>
                <div class="product-price">$ {{formatInvoice(producto.n_precio)}}</div>
                
                <div class="product-features">
                  <div class="feature-item">
                    <v-icon color="orange" class="feature-icon">credit_card</v-icon>
                    <span class="feature-text">Próximamente lo podrás pagar en cuotas con tu tarjeta de crédito</span>
                  </div>
                  <div class="feature-item">
                    <v-icon color="orange" class="feature-icon">security</v-icon>
                    <span class="feature-text">Todos tus datos de compra están protegidos</span>
                  </div>
                  <div class="feature-item">
                    <v-icon color="orange" class="feature-icon">local_shipping</v-icon>
                    <span class="feature-text">Todos los envíos deben ser coordinados directamente con la tienda que vende el producto</span>
                  </div>
                </div>
                
                <div class="product-actions">
                  <v-tooltip bottom>
                    <span>Compartir en Facebook</span>
                    <v-btn icon slot="activator" @click="compartirFacebook" class="share-btn">
                      <v-icon color="orange">share</v-icon>
                    </v-btn>
                  </v-tooltip>
                  <seguir :modelo="producto" tipo="productos" color="orange" :siguiendo="siguiendo_producto"
                          :texto="false" class="follow-btn"></seguir>
                </div>
                
                <div class="product-variations">
                  <div v-if="nombres.length > 0" class="variations-container">
                    <span class="variations-title">Elija las características del producto</span>
                    <div v-for="(item,key) in nombres" class="variation-select">
                      <v-select :items="combos[item] || []"
                                :id="key" v-model="v_tipo[key]" :placeholder=item
                                v-on:input="onSelect(item, v_tipo[key], key)"
                                :title="item" class="variation-dropdown">
                      </v-select>
                    </div>
                    <br>
                  </div>
                  <div v-if="variacionesVerificar(variaciones)" class="variation-info">
                    <div v-if="variacionSeleccionada !== null" class="selected-variation">
                      <span class="variation-price">Precio para esta variante del producto: {{ variacionSeleccionada.n_precio}}</span><br>
                      <span class="variation-stock">Existencia para esta variante del producto: {{ variacionSeleccionada.n_stock}}</span>
                    </div>
                    <div v-if="variacionSeleccionada == null" class="variation-select-prompt">
                      <span>Seleccione un color y una talla</span>
                    </div>
                  </div>
                </div>
                
                <v-btn large color="orange" class="add-to-cart-btn" 
                       :disabled="variacionSeleccionada === null && nombres.length > 0"
                       v-on:click="agregar(producto,1)">
                  <v-icon>add_shopping_cart</v-icon>
                  &nbsp;Añadir al carrito
                </v-btn>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout class="hidden-md-and-up">
            <v-flex xs12>
              <v-card flat>
                <div style="color: #ec6920" class="text-xs-center"><h5>Productos Relacionados</h5></div>
                <v-layout flat
                          class="text-capitalize text-justify">
                  <v-container>
                    <productos
                      :productos="productos_relacionados"
                      v-on:id="redirigirProducto"
                      v-bind:productoId="productoId">
                    </productos>
                  </v-container>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout class="hidden-md-and-up">
            <v-flex xs12>

              <v-card flat>
                <div v-if="defecto" style="height: 200px; width: 100%">
                  <a href="http://www.avanzamas.com.co/" target="_blank">
                    <img src="../../../../dist/new/promo2.jpg"/>
                  </a>
                </div>
                <div v-else>
                  <v-carousel hide-delimiters hide-controls style="height: 200px; width: 100%">
                    <a href="">
                      <v-carousel-item v-for="(publicidad, i) in publicidades" :key="i">
                        <img style="height: 200px; width: 150px" :src="getImageUrl(publicidad.src)" alt="">
                      </v-carousel-item>
                    </a>
                  </v-carousel>
                </div>
              </v-card>

            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex x12>
              <v-card flat>
                <div v-if="defecto" style=" width: 100%;">
                  <a v-on:click="redirigirOrigilash()" >
                    <img src="../../../dist/new/promo_origilash.png" style="padding: 10px; max-width: 180px; width: 100%;"/>
                  </a>
                </div>
                <div v-else>
                  <v-carousel hide-delimiters hide-controls style="height: 200px; width: 100%">
                    <v-carousel-item v-for="(publicidad, i) in publicidades" :key="i">
                      <a :href="getUrlPublicidad(publicidad)">
                        <img style="height: 200px; width: 150px" :src="getImageUrl(publicidad.src)" alt="">
                      </a>
                    </v-carousel-item>
                  </v-carousel>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import Loader from '../../parts/loader';
  import Preguntas from './partes/Preguntas';
  import VueGallery from 'vue-gallery';
  import Seguir from '../partes/Seguir';
  import Productos from '../partes/Productos';
  import ShoppingCart from '../shopping-cart/ShoppingCart';
  import {Carousel, Slide} from 'vue-carousel';
  import ImageHandler from '../../../mixin/ImageHandler';
  import AppServices from '../../AppServices';

  export default {
    beforeMount() {
      this.cargandoData = true;
      this.arreglo = [];
      this.items = [];
      this.nombres = [];
      this.combos = [];
      this.caracteristicas = [];
      this.caracteristicasMultiples = [];
      this.caracteristicasUnicas = [];
      this.informacionProducto(this.$route.params.id);
      this.url = window.location.origin + '/producto/' + this.$route.params.id;
    },
    metaInfo() {
      return {
        title: (this.producto.v_nombre === undefined || this.producto.v_nombre === null || this.producto.v_nombre === "") ? "localhost" : this.producto.v_nombre + '| localhost',
      }
    },
    name: "VistaProducto",
    mixins: [ImageHandler, AppServices],
    data() {
      return {
        carouselItem: null,
        imagen2: false,
        zoom: false,
        zoom2: false,
        tabs: null,
        index: null,
        img: [],
        cargandoData: false,
        cargandoDataPosts: false,
        rastreos_id: null,
        producto: [],
        enlace: "enlace",
        productos_relacionados: [],
        productoId: false,
        tipo_producto: "productos",
        boton: 'boton',
        opcion: {
          ficha_tecnica: true,
          descripcion: false,
          multimedia: false,
          preguntas: false,
        },
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
        url: '',
        tipo: 'tiendas',
        siguiendo_tienda: false,
        siguiendo_producto: false,
        caracteristicas: [],
        caracteristicasMultiples: [],
        caracteristicasUnicas: [],
        combos: [],
        nombres: [],
        v_tipo: [],
        items: [],
        lastSelectItem: [],
        arreglo: [],
        variaciones: [],
        idVariacion: null,
        variacionSeleccionada: null,
        laterales: [],
        publicidades: [],
        defecto: true,
      }
    },

    methods: Object.assign({}, mapMutations(['addToCart']),
      {
        inicio() {
          this.cargandoData = true;
          this.arreglo = [];
          this.items = [];
          this.nombres = [];
          this.combos = [];
          this.caracteristicas = [];
          this.caracteristicasMultiples = [];
          this.caracteristicasUnicas = [];
          this.informacionProducto(this.$route.params.id);
          this.url = window.location.href;

        },
        onSelect(item, valor, key) {
          this.items[item] = valor;
          this.arreglo[key] = item;

          if (this.arreglo.length === this.nombres.length) {
            this.buscarInventario();
          }
        },
        variacionesVerificar(variacionesPr) {
          return Object.keys(variacionesPr).length !== 0;
        },
        cambiarCarousel(img) {
          this.carouselItem = img;
          this.imagen2 = img;
        },
        buscarInventario() {
          this.idVariacion = null;
          this.variacionSeleccionada = null;
          let yo = this;
          this.variaciones.every(function (variacion) {
            let counter = 0;
            variacion.valores.every(function (value, key) {
              if (value.v_valor === yo.items[yo.arreglo[key]])
                counter++;
              if (counter === yo.arreglo.length) {
                yo.idVariacion = value.id_m_variacion_productos_fk;
                return false;
              }
              else return true
            });
            if (yo.idVariacion !== null && variacion.id_m_variacion_productos === yo.idVariacion) {
              yo.variacionSeleccionada = variacion;
              return false
            }
            else
              return true
          })
        },
        agregar(item, cantidad) {
          if (this.variacionSeleccionada !== null) {
            item.idVariacion = this.variacionSeleccionada.valores[0].id_m_variacion_productos_fk;
            item.variacion = this.variacionSeleccionada.valores;
            item.n_precio = this.variacionSeleccionada.n_precio;
            item.n_existencia = this.variacionSeleccionada.n_stock;
            if (item.b_descuento)
              item.n_descuento = item.n_precio - (item.n_precio * item.n_porcentaje_descuento);
          }
          else
            item.idVariacion = null;

          let record = false;
          if (item.idVariacion !== null)
            record = this.cartProducts.find(product => product.id_m_productos === item.id_m_productos && product.idVariacion === item.idVariacion);
          else
            record = this.cartProducts.find(product => product.id_m_productos === item.id_m_productos);

          if (record) {
            this.$toastr('info', '', 'El producto ' + item.v_nombre + ' ya existe en el Carrito');
          }
          else {
            item.quantity = item.quantity + cantidad;
            this.addToCart(item);
            this.$toastr('success', item.v_nombre, 'Producto Agregado al Carrito');
          }
        },
        formatInvoice(value) {
          if (!value) return '0';
          return new Intl.NumberFormat('es-CO').format(value);
        },
        mapErrorsResponses(component, errors) {
          if (errors.status === 422) {
            for (let err in errors.body.errors) {
              errors.body.errors[err].forEach(function (value) {
                component.$toastr('error', value, err);
              });
            }
          } else {
            component.$toastr('error', errors.body.mensaje || 'Error desconocido', 'Error');
          }
        },
        informacionProducto(id_producto) {
          let yo = this;
          if (this.getUsuario.estaAutenticadoFull)
            this.getMethodsWithBearer(this.urlsApi().endpointsBuscarProducto.autenticado + id_producto, this.getUsuario.token, 'all', 1, "'catalogo','categoriaPrincipal','tienda','imagenes','caracteristicas','iva' ").then(response => {
              this.cargandoData = false;
              this.producto = response.body.producto;
              this.url = window.location.origin + '/producto/' + this.$route.params.id;
              this.carouselItem = this.producto.v_portada;
              this.imagen2 = this.producto.v_portada;
              localStorage.setItem('filtro', this.producto.id_m_categorias_fk);
              this.siguiendo_tienda = response.body.seguidor_tienda;
              this.siguiendo_producto = response.body.seguidor_producto;
              this.getImages(this.producto.imagenes);
              this.rastreos_id = response.body.rastreo_id;
              this.productos_relacionados = response.body.productos_relacionados;
              this.caracteristicasMultiples = [];
              this.caracteristicasUnicas = [];
              this.caracteristicas = response.body.producto.caracteristicas;
              this.variaciones = response.body.variaciones;
              this.caracteristicas.forEach(item => {
                if (item.v_tipo === 'multiple')
                  this.caracteristicasMultiples.push(item);
                else
                  this.caracteristicasUnicas.push(item);
              });
              let anterior = '';
              let a = 0;
              let flag = false;
              this.caracteristicasMultiples.forEach(multiple => {
                if (anterior !== multiple.v_nombre) {
                  this.combos[multiple.v_nombre] = [];
                  anterior = multiple.v_nombre;
                  if (flag === true)
                    a++;
                  if (flag === false)
                    flag = true;
                }
                this.nombres[a] = multiple.v_nombre;
                this.combos[multiple.v_nombre].push({text: multiple.pivot.v_valor, value: multiple.pivot.v_valor});
              });
              yo.obtenerPosts(this.pagination.current_page);
              let title_meta = $("#title_meta_content");
              let description_meta = $("#description_meta_content");
              this.getMethodWithoutBearer(this.urlsApi().endpointsPublicidad.index, 'all', null, null, "['v_posicion_pantalla','lateral']", null, null, this.producto.id_m_categorias_fk)
                .then(response => {
                  this.laterales = response.body.data;
                  this.publicidades = [];
                  this.laterales.forEach(item => {
                    this.publicidades.push({src: item.v_imagen, id: item.id_m_productos_fk});
                  });
                  this.defecto = response.body.data === 0;
                }, errors => this.mapErrorsResponses(this, errors))

            }, errors => this.mapErrorsResponses(this, errors));
          else
            this.getMethodWithoutBearer(this.urlsApi().endpointsBuscarProducto.noAutenticado + id_producto, 'all', 1, "'catalogo','categoriaPrincipal','tienda','imagenes','caracteristicas','iva'")
              .then(response => {
                this.cargandoData = false;
                this.producto = response.body.producto;
                this.carouselItem = this.producto.v_portada;
                this.imagen2 = this.producto.v_portada;
                localStorage.setItem('filtro', this.producto.id_m_categorias_fk);
                this.getImages(this.producto.imagenes);
                this.productos_relacionados = response.body.productos_relacionados;
                this.caracteristicas = response.body.producto.caracteristicas;
                this.variaciones = response.body.variaciones;
                this.caracteristicasMultiples = [];
                this.caracteristicasUnicas = [];
                this.caracteristicas.forEach(item => {
                  if (item.v_tipo === 'multiple')
                    this.caracteristicasMultiples.push(item);
                  else
                    this.caracteristicasUnicas.push(item);
                });
                let anterior = '';
                let a = 0;
                let flag = false;
                this.caracteristicasMultiples.forEach(multiple => {
                  if (anterior !== multiple.v_nombre) {
                    this.combos[multiple.v_nombre] = [];
                    anterior = multiple.v_nombre;
                    if (flag === true)
                      a++;
                    if (flag === false)
                      flag = true;
                  }
                  this.nombres[a] = multiple.v_nombre;
                  this.combos[multiple.v_nombre].push({text: multiple.pivot.v_valor, value: multiple.pivot.v_valor});
                });
                this.getMethodWithoutBearer(this.urlsApi().endpointsPublicidad.index, 'all', null, null, "['v_posicion_pantalla','lateral']", null, null, this.producto.id_m_categorias_fk)
                  .then(response => {
                    console.log(response.body.data);
                    this.defecto = response.body.data === 0;
                    console.log(this.defecto);
                    this.laterales = response.body.data;
                    this.publicidades = [];
                    this.laterales.forEach(item => {
                      this.publicidades.push({src: item.v_imagen, id: item.id_m_productos_fk});
                    });

                  }, errors => this.mapErrorsResponses(this, errors));
                yo.obtenerPosts(this.pagination.current_page);
              }, errors => this.mapErrorsResponses(this, errors));
        },
        getUrlPublicidad(pub) {
          let url;
          this.defecto = false;
          if (pub.v_url) {
            return pub.v_url
          } else {
            return url = window.location.origin + '/producto/' + pub.id
          }
        },
        getImages: function (imagenes) {
          let a = imagenes;
          let yo = this;
          a.forEach(function (entry) {
            yo.img.push(entry.v_url);
          });

        },
        getUrlImage: function (ruta) {
          return {
            'background-image': 'url(' + ruta + ')'
          }
        },
        obtenerPosts(pagina) {
          this.cargandoDataPosts = true;
          this.getMethodWithoutBearer(this.urlsApi().endpointsPublicos.post.index, 'paginate', pagina, "'usuario'", "['id_m_productos_fk','=','" + this.producto.id_m_productos + "'],['v_tipo','=','comentario']", null, 5)
            .then(response => {
              this.cargandoDataPosts = false;
              this.pagination = response.body;
            }, errors => this.mapErrorsResponses(this, errors))
        },
        redirigirVistaTienda() {
          this.$router.push('/' + this.producto.tienda.v_slug);
        },
        redirigirOrigilash() {
          this.$router.push('/origilash');
        },
        redirigirProducto(id) {
          this.$router.push('/producto/' + id);
          this.informacionProducto(id);

        },
        detalleProducto() {
          $('#modalDetalleProducto').modal('show')
        },
        cambiarOpcion(opcion) {
          switch (opcion) {
            case 'ficha_tecnica':
              this.opcion = {
                ficha_tecnica: true,
                descripcion: false,
                multimedia: false,
                preguntas: false,
              };
              break;
            case 'descripcion':
              this.opcion = {
                ficha_tecnica: false,
                descripcion: true,
                multimedia: false,
                preguntas: false,
              };
              break;
            case 'multimedia':
              this.opcion = {
                ficha_tecnica: false,
                descripcion: false,
                multimedia: true,
                preguntas: false,
              };
              break;
            case 'preguntas':
              this.opcion = {
                ficha_tecnica: false,
                descripcion: false,
                multimedia: false,
                preguntas: true,
              };
              break;
          }
        },
        irTienda(slug) {
          $('#modalDetalleProducto').modal('hide');
          this.$router.push('/tienda/' + slug);
        },
        handleImageError(event) {
          event.target.src = '../../../dist/new/promo2.jpg';
        },
        compartirFacebook() {
          try {
            const url = this.url;
            const title = this.producto.v_nombre;
            const description = this.producto.v_descripcion;
            const image = this.producto.v_portada;

            // URL básica de Facebook que funciona mejor
            const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            
            // Abrir en una nueva ventana con dimensiones específicas
            const width = 600;
            const height = 400;
            const left = (screen.width - width) / 2;
            const top = (screen.height - height) / 2;
            
            const popup = window.open(
              shareUrl,
              'facebook-share-dialog',
              `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
            );
            
            if (popup) {
              popup.focus();
            } else {
              // Fallback si el popup está bloqueado
              window.open(shareUrl, '_blank');
            }
          } catch (error) {
            console.error('Error al compartir en Facebook:', error);
            // Fallback simple
            const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;
            window.open(shareUrl, '_blank');
          }
        }
      }),
    components: {
      Loader,
      Preguntas,
      'gallery': VueGallery,
      Seguir,
      Productos,
      ShoppingCart,
      Carousel,
      Slide,
    },

    computed: Object.assign({}, mapGetters([
      'getUsuario', 'Seguir', 'cartProducts'
    ]), {}),

    destroyed() {
      let yo = this;
      if (this.rastreos_id && this.getUsuario.estaAutenticadoFull)
        this.getMethodsWithBearer(this.urlsApi().endpointsRastreo.cerrar + this.rastreos_id, this.getUsuario.token)
          .then(response => {
          }, errors => this.mapErrorsResponses(this, errors));
    },
    watch: {
      '$route': 'inicio'
    },
  }
</script>

<style scoped>
/* Contenedor principal de la página */
.product-page-container {
  padding: 2rem 0;
  background: #f8f9fa;
}

/* Tarjeta de la tienda */
.store-card {
  border-radius: 15px !important;
  overflow: hidden !important;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
  transition: all 0.3s ease !important;
  margin-bottom: 1rem;
  margin-left: 0.5rem !important;
}

.store-card:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2) !important;
}

.store-logo-link {
  display: block;
  transition: all 0.3s ease;
}

.store-logo-link:hover {
  opacity: 0.9;
}

.store-actions {
  height: 40px !important;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%) !important;
  border-radius: 0 0 15px 15px !important;
}

/* Tarjeta de seguidores */
.followers-card {
  border-radius: 15px !important;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1) !important;
  transition: all 0.3s ease !important;
  margin-bottom: 1rem;
  margin-left: 0.5rem !important;
  padding: 1rem;
}

.followers-card:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15) !important;
}

.followers-icon {
  color: #ff6b35 !important;
}

.followers-text {
  font-weight: 600;
  color: #333;
}

.followers-count {
  font-weight: 700;
  color: #ff6b35;
  font-size: 1.1rem;
}

.visit-store-btn {
  border-radius: 25px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  box-shadow: 0 3px 10px rgba(255,107,53,0.3) !important;
  transition: all 0.3s ease !important;
}

.visit-store-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 5px 15px rgba(255,107,53,0.4) !important;
}

/* Tarjeta principal del producto */
.product-main-card {
  border-radius: 15px !important;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
  overflow: hidden !important;
  background: white !important;
}

/* Tarjeta móvil del producto */
.product-mobile-card {
  border-radius: 15px !important;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
  overflow: hidden !important;
  background: white !important;
  margin-bottom: 1rem;
}

.product-image-card {
  border-radius: 15px !important;
  overflow: hidden !important;
  transition: all 0.3s ease !important;
}

.product-image-card:hover {
  transform: scale(1.02) !important;
}

.mobile-product-image {
  width: 100% !important;
  height: 180px !important;
  object-fit: contain !important;
  border-radius: 12px !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  max-width: 100% !important;
  max-height: 220px !important;
}

.mobile-product-image:hover {
  transform: scale(1.03) !important;
}

.product-image-container {
  padding: 2rem;
}

.product-image-link {
  display: block;
  transition: all 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
}

.product-image-link:hover {
  transform: scale(1.02);
}

.main-product-image {
  height: 350px !important;
  width: auto !important;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

/* Miniaturas del producto */
.product-thumbnails {
  border-top: 1px solid #f0f0f0;
  padding: 1rem;
}

.thumbnail-link {
  display: block;
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
}

.thumbnail-link:hover {
  transform: scale(1.1);
}

.product-thumbnail {
  height: 60px !important;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail-link:hover .product-thumbnail {
  border-color: #ff6b35;
}

/* Pestañas del producto */
.product-tabs {
  border-radius: 0 0 15px 15px !important;
}

.product-tabs .v-tabs__bar {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%) !important;
}

.product-tabs .v-tabs__slider {
  background: white !important;
}

/* Características del producto */
.characteristics-card {
  padding: 1rem;
}

.characteristic-item {
  padding: 0.8rem 0;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.characteristic-item:hover {
  background: #f8f9fa;
  padding-left: 0.5rem;
}

.characteristic-item:last-child {
  border-bottom: none;
}

.characteristic-name {
  font-weight: 600;
  color: #333;
}

.characteristic-value {
  color: #666;
  font-weight: 500;
}

/* Especificación del producto */
.specification-card {
  padding: 1rem;
  border-radius: 10px;
  background: #f8f9fa;
}

/* Tarjeta de información del producto */
.product-info-card {
  border-radius: 15px !important;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
  padding: 2rem !important;
  background: white !important;
  transition: all 0.3s ease !important;
}

.product-info-card:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
}

.product-title {
  color: #ff6b35 !important;
  font-size: 1.5rem !important;
  font-weight: 700 !important;
  text-align: center !important;
  margin-bottom: 0.5rem !important;
}

.product-sales {
  color: #666 !important;
  text-align: center !important;
  font-size: 0.9rem !important;
  margin-bottom: 1rem !important;
}

.product-price {
  color: #ff6b35 !important;
  font-size: 2rem !important;
  font-weight: 800 !important;
  text-align: center !important;
  margin-bottom: 2rem !important;
}

/* Características del producto */
.product-features {
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 0.8rem;
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: #ffece6;
  transform: translateX(5px);
}

.feature-icon {
  margin-right: 0.8rem !important;
  margin-top: 0.2rem !important;
  flex-shrink: 0;
}

.feature-text {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
}

/* Acciones del producto */
.product-actions {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.share-btn, .follow-btn {
  transition: all 0.3s ease !important;
}

.share-btn:hover, .follow-btn:hover {
  transform: scale(1.1) !important;
}

/* Variaciones del producto */
.product-variations {
  margin-bottom: 2rem;
}

.variations-container {
  margin-bottom: 1rem;
}

.variations-title {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.variation-select {
  margin-bottom: 1rem;
}

.variation-dropdown {
  border-radius: 8px !important;
}

.variation-info {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.selected-variation {
  text-align: center;
}

.variation-price {
  color: #ff6b35;
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.variation-stock {
  color: #666;
  font-size: 0.9rem;
}

.variation-select-prompt {
  text-align: center;
  color: #999;
  font-style: italic;
}

/* Botón de añadir al carrito */
.add-to-cart-btn {
  width: 100% !important;
  border-radius: 25px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  font-size: 1.1rem !important;
  height: 50px !important;
  box-shadow: 0 5px 15px rgba(255,107,53,0.3) !important;
  transition: all 0.3s ease !important;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(255,107,53,0.4) !important;
}

.add-to-cart-btn:disabled {
  opacity: 0.6;
  transform: none !important;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1) !important;
}

/* Responsive design */
@media (max-width: 768px) {
  .product-page-container {
    padding: 1rem 0;
  }
  
  .product-info-card {
    padding: 1.5rem !important;
  }
  
  .product-title {
    font-size: 1.3rem !important;
  }
  
  .product-price {
    font-size: 1.8rem !important;
  }
  
  .main-product-image {
    height: 250px !important;
  }
  
  /* Estilos móviles específicos */
  .product-info-card-mobile {
    border-radius: 15px !important;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
    padding: 1.5rem !important;
    background: white !important;
    margin-bottom: 1rem;
  }
  
  .product-title-mobile {
    color: #ff6b35 !important;
    font-size: 1.3rem !important;
    font-weight: 700 !important;
    text-align: center !important;
    margin-bottom: 0.5rem !important;
  }
  
  .product-sales-mobile {
    color: #666 !important;
    text-align: center !important;
    font-size: 0.9rem !important;
    margin-bottom: 1rem !important;
  }
  
  .product-price-mobile {
    color: #ff6b35 !important;
    font-size: 1.8rem !important;
    font-weight: 800 !important;
    text-align: center !important;
    margin-bottom: 1.5rem !important;
  }
  
  .product-features-mobile {
    margin-bottom: 1.5rem;
  }
  
  .feature-item-mobile {
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.8rem;
    padding: 0.6rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .feature-item-mobile:hover {
    background: #ffece6;
    transform: translateX(3px);
  }
  
  .feature-icon-mobile {
    margin-right: 0.6rem !important;
    margin-top: 0.1rem !important;
    flex-shrink: 0;
  }
  
  .feature-text-mobile {
    font-size: 0.85rem;
    color: #555;
    line-height: 1.3;
  }
  
  .product-actions-mobile {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1.5rem;
    padding: 0.8rem;
    background: #f8f9fa;
    border-radius: 8px;
  }
  
  .share-btn-mobile, .follow-btn-mobile {
    transition: all 0.3s ease !important;
  }
  
  .share-btn-mobile:hover, .follow-btn-mobile:hover {
    transform: scale(1.1) !important;
  }
  
  .product-variations-mobile {
    margin-bottom: 1.5rem;
  }
  
  .variations-container-mobile {
    margin-bottom: 1rem;
  }
  
  .variations-title-mobile {
    display: block;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.8rem;
    text-align: center;
    font-size: 0.9rem;
  }
  
  .variation-select-mobile {
    margin-bottom: 0.8rem;
  }
  
  .variation-dropdown-mobile {
    border-radius: 8px !important;
  }
  
  .variation-info-mobile {
    padding: 0.8rem;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  .selected-variation-mobile {
    text-align: center;
  }
  
  .variation-price-mobile {
    color: #ff6b35;
    font-weight: 600;
    display: block;
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
  }
  
  .variation-stock-mobile {
    color: #666;
    font-size: 0.8rem;
  }
  
  .variation-select-prompt-mobile {
    text-align: center;
    color: #999;
    font-style: italic;
    font-size: 0.8rem;
  }
  
  .add-to-cart-btn-mobile {
    width: 100% !important;
    border-radius: 25px !important;
    text-transform: none !important;
    font-weight: 600 !important;
    font-size: 1rem !important;
    height: 45px !important;
    box-shadow: 0 5px 15px rgba(255,107,53,0.3) !important;
    transition: all 0.3s ease !important;
  }
  
  .add-to-cart-btn-mobile:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 20px rgba(255,107,53,0.4) !important;
  }
  
  .add-to-cart-btn-mobile:disabled {
    opacity: 0.6;
    transform: none !important;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1) !important;
  }
}

@media (max-width: 480px) {
  .product-info-card {
    padding: 1rem !important;
  }
  
  .product-title {
    font-size: 1.2rem !important;
  }
  
  .product-price {
    font-size: 1.6rem !important;
  }
  
  .feature-item {
    padding: 0.6rem;
  }
  
  .feature-text {
    font-size: 0.8rem;
  }
  
  .product-info-card-mobile {
    padding: 1rem !important;
  }
  
  .product-title-mobile {
    font-size: 1.2rem !important;
  }
  
  .product-price-mobile {
    font-size: 1.6rem !important;
  }
  
  .feature-item-mobile {
    padding: 0.5rem;
  }
  
  .feature-text-mobile {
    font-size: 0.8rem;
  }
  
  .add-to-cart-btn-mobile {
    font-size: 0.9rem !important;
    height: 40px !important;
  }
  
  .store-card {
    margin-left: 0.3rem !important;
  }
  
  .followers-card {
    margin-left: 0.3rem !important;
  }
  
  .mobile-product-image {
    height: 160px !important;
    max-height: 200px !important;
  }
}

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.v-card {
  animation: fadeInUp 0.6s ease-out;
}
</style>
