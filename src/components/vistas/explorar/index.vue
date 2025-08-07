<template>
  <v-app>
    <loader v-if="cargandoData"></loader>
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <div class="hero-badge">
            <v-icon color="white" size="20">mdi-star</v-icon>
            <span>Plataforma #1 en ventas online</span>
          </div>
          <h1 class="hero-title">Bienvenido a LaHipertienda</h1>
          <p class="hero-subtitle">Descubre productos increíbles de vendedores certificados. Compra con confianza y recibe envíos rápidos.</p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">10K+</span>
              <span class="stat-label">Productos</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">500+</span>
              <span class="stat-label">Vendedores</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50K+</span>
              <span class="stat-label">Clientes</span>
            </div>
          </div>
          <div class="hero-buttons">
            <v-btn 
              color="orange" 
              large 
              class="hero-btn primary-btn"
              @click="$router.push('/registro')">
              <v-icon left>mdi-account-plus</v-icon>
              Registrarse
            </v-btn>
            <v-btn 
              outline 
              color="white" 
              large 
              class="hero-btn secondary-btn"
              @click="$router.push('/acceso')">
              <v-icon left>mdi-login</v-icon>
              Iniciar Sesión
            </v-btn>
          </div>
        </div>
        <div class="hero-image">
          <div class="hero-products-carousel">
            <div class="hero-gif-container">
              <img 
                :src="gifUrl" 
                alt="Ecommerce Performance" 
                class="hero-gif" 
                @load="onGifLoad"
                @error="onGifError">
              <div class="hero-gif-fallback" v-if="!gifLoaded">
                <v-icon size="120" color="#ff6b35">mdi-shopping</v-icon>
                <h3 style="color: #ff6b35; margin-top: 20px; font-size: 24px;">¡Descubre Productos Increíbles!</h3>
                <p style="color: #666; margin-top: 10px; font-size: 16px;">Compra con confianza y recibe envíos rápidos</p>
                <div style="margin-top: 20px;">
                  <v-icon size="40" color="#ff6b35" style="margin: 0 10px;">mdi-truck-fast</v-icon>
                  <v-icon size="40" color="#ff6b35" style="margin: 0 10px;">mdi-shield-check</v-icon>
                  <v-icon size="40" color="#ff6b35" style="margin: 0 10px;">mdi-credit-card</v-icon>
                </div>
              </div>
              <div class="hero-gif-overlay">
                <v-btn 
                  color="orange" 
                  large 
                  class="hero-gif-btn"
                  @click="scrollToProducts">
                  <v-icon left>mdi-shopping</v-icon>
                  Ver Productos
                </v-btn>
              </div>
            </div>
          </div>
          <div class="hero-floating-card">
            <v-icon color="orange" size="24">mdi-truck-fast</v-icon>
            <span>Envío gratis</span>
          </div>
        </div>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </section>

    <!-- Features Banner -->
    <section class="features-banner">
      <v-container>
        <div class="features-header">
          <h2 class="features-title">¿Por qué elegir LaHipertienda?</h2>
          <p class="features-subtitle">Descubre las ventajas que nos hacen únicos</p>
        </div>
        <v-layout row wrap>
          <v-flex xs12 sm6 md3 v-for="(feature, index) in features" :key="index">
            <div class="feature-item">
              <div class="feature-icon-wrapper">
                <i :class="feature.icon"></i>
              </div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
              <div class="feature-hover-effect"></div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <!-- Carousel Section -->
    <v-carousel hide-controls style="height: auto" class="hidden-sm-and-down">
      <v-carousel-item
        class="text-center"
        v-for="(imagen,i) in imagenes"
        :key="i">
        <v-responsive>
          <img class="text-center" :src="getImageUrl(imagen.src)" style="height: 100%; width: 100%" @error="handleImageError">
        </v-responsive>
      </v-carousel-item>
    </v-carousel>
    <v-carousel hide-delimiters="" style="height: auto" class="hidden-sm-and-up">
      <v-carousel-item
        v-for="(imagen,i) in imagenesM"
        :key="i">
        <v-responsive>
          <img :src="getImageUrl(imagen.src)" style="height: 250px; width: 100%" @error="handleImageError">
        </v-responsive>
      </v-carousel-item>
    </v-carousel>

    <!-- Products Section -->
    <section class="products-section">
      <v-container>
        <h2 class="section-title">Productos Relacionados Con Tus Búsquedas</h2>
        <productos
          :productos="pagination.data"
          :vista="true"
          v-on:id="redirigirProducto"
          v-bind:productoId="productoId">
        </productos>
      </v-container>
    </section>

    <!-- Recommended Stores Section -->
    <section class="stores-section">
      <v-layout>
        <v-flex>
          <v-container>
            <h2 class="section-title">Tiendas Recomendadas</h2>
            <tiendas-recomendadas></tiendas-recomendadas>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </v-app>
</template>
<script>
  import 'vuetify/dist/vuetify.min.css'
  import {mapGetters, mapMutations} from 'vuex';
  import Loader from '../../parts/loader';
  import PanelOpciones from '../partes/PanelOpciones';
  import TiendasRecomendadas from '../partes/TiendasRecomendadas';
  import Seguir from '../partes/Seguir';
  import Vuetify from 'vuetify';
  import ImageHandler from '../../../mixin/ImageHandler';

  import Productos from '../partes/Productos';

  export default {
    components: {Loader, PanelOpciones, TiendasRecomendadas, Seguir, Vuetify, Productos},
    mixins: [ImageHandler],
    name: "explorar",
    data() {
      return {
        imagenes: [
          {
            src: ''
          }
        ],
        imagenesM: [
          {
            src: ''
          }
        ],
        features: [
          {
            icon: 'fa fa-user',
            title: 'Vendedores Certificados',
            description: 'Todos nuestros vendedores están verificados y certificados para tu seguridad'
          },
          {
            icon: 'fa fa-truck',
            title: 'Envío Rápido',
            description: 'Recibe tus productos en tiempo récord con nuestro servicio de envío express'
          },
          {
            icon: 'fa fa-lock',
            title: 'Pagos Seguros',
            description: 'Múltiples opciones de pago con total seguridad y garantía'
          },
          {
            icon: 'fa fa-phone',
            title: 'Soporte 24/7',
            description: 'Atención al cliente disponible las 24 horas del día'
          }
        ],
        productoId: false,
        ifData: false,
        filtrado: null,
        order: '',
        orderEndpoint: null,
        cargandoData: false,
        tipo: "productos",
        boton: 'etiqueta',
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
        slider: '',
        gifLoaded: false, // Added gifLoaded state
        gifUrl: '/assets/images/ecommerce-performance.gif', // URL del GIF
      }
    },
    methods: Object.assign({}, mapMutations(['setSearch']), {
      obtenerData(pagina) {
        try {
          let busqueda = '';
          if (this.getSearch)
            busqueda = this.getSearch;
          this.cargandoData = true;
          if (this.getUsuario.estaAutenticadoFull) {
            this.buscadorConToken(this.urlsApi().endpointsIndex.productos.autenticado, this.getUsuario.token, busqueda, 'all', pagina, "'tienda','iva'", this.filtrado, this.orderEndpoint, this.otro)
            //this.buscadorConToken(this.urlsApi().endpointsBusqueda.productos.autenticado, this.getUsuario.token, busqueda, 'paginate', pagina, "'tienda','iva'", this.filtrado, this.orderEndpoint)
              .then(response => {
                try {
                  console.log("Respuesta completa:", response.body);
                  console.log("Pagination:", response.body.pagination);
                  console.log("Data length:", response.body.pagination ? response.body.pagination.data.length : 'No pagination');
                  
                  // Manejar la nueva estructura de respuesta
                  if (response.body.pagination && response.body.pagination.data) {
                    this.pagination = response.body.pagination;
                    console.log("Usando pagination.data, productos:", this.pagination.data.length);
                  } else if (response.body.data) {
                    this.pagination = {
                      data: response.body.data,
                      current_page: 1,
                      last_page: 1,
                      per_page: 10,
                      total: response.body.data.length
                    };
                    console.log("Usando response.body.data, productos:", this.pagination.data.length);
                  } else {
                    // Si la respuesta tiene la estructura que me mostraste
                    const productos = response.body.pagination || response.body.orderBy || [];
                    this.pagination = {
                      data: productos,
                      current_page: 1,
                      last_page: 1,
                      per_page: 10,
                      total: productos.length
                    };
                    console.log("Usando fallback, productos:", this.pagination.data.length);
                  }
                  console.log("Pagination final:", this.pagination);
                  console.log("Productos disponibles:", this.pagination.data.map(p => ({
                    id: p.id_m_productos,
                    nombre: p.v_nombre,
                    precio: p.n_precio,
                    imagen: p.v_portada
                  })));
                  this.cargandoData = false;
                } catch (error) {
                  console.error("Error procesando respuesta:", error);
                  this.cargandoData = false;
                }
              }, errors => {
                console.error("Error en la petición:", errors);
                this.mapErrorsResponses(this, errors);
                this.cargandoData = false;
              });
          } else {
            //this.buscardorSinToken(this.urlsApi().endpointsBusqueda.productos.noAutenticado, busqueda, 'paginate', pagina, "'tienda','iva'", this.filtrado, this.orderEndpoint)
            this.buscardorSinToken(this.urlsApi().endpointsIndex.productos.noAutenticado, busqueda, 'all', pagina, "'tienda','iva'", this.filtrado, this.orderEndpoint, this.otro)
              .then(response => {
                try {
                  console.log("Respuesta no autenticada:", response.body);
                  // Manejar la nueva estructura de respuesta
                  if (response.body.pagination && response.body.pagination.data) {
                    this.pagination = response.body.pagination;
                  } else if (response.body.data) {
                    this.pagination = {
                      data: response.body.data,
                      current_page: 1,
                      last_page: 1,
                      per_page: 10,
                      total: response.body.data.length
                    };
                  } else {
                    // Si la respuesta tiene la estructura que me mostraste
                    const productos = response.body.pagination || response.body.orderBy || [];
                    this.pagination = {
                      data: productos,
                      current_page: 1,
                      last_page: 1,
                      per_page: 10,
                      total: productos.length
                    };
                  }
                  console.log("Productos no autenticados:", this.pagination.data.map(p => ({
                    id: p.id_m_productos,
                    nombre: p.v_nombre,
                    precio: p.n_precio,
                    imagen: p.v_portada
                  })));
                  this.cargandoData = false;
                } catch (error) {
                  console.error("Error procesando respuesta no autenticada:", error);
                  this.cargandoData = false;
                }
              }, errors => {
                console.error("Error en la petición no autenticada:", errors);
                this.mapErrorsResponses(this, errors);
                this.cargandoData = false;
              });
          }
          this.getMethodWithoutBearer(this.urlsApi().endpointsPublicidad.index, 'all', null, null, "['v_posicion_pantalla','principal']", null, null, null)
            .then(response => {
              this.slider = response.body.data;
              this.imagenes = [];
              this.imagenesM = [];
              this.slider.forEach(item =>{
                this.imagenes.push({src: item.v_imagen});
                this.imagenesM.push({src: item.v_imagen_movil});
              });
            }, errors => this.mapErrorsResponses(this, errors))
        } catch (error) {
          console.error("Error general en obtenerData:", error);
          this.cargandoData = false;
        }
      },
      redirigirProducto(id) {
        if (id) {
          console.log("id_producto", id);
          this.$router.push('/producto/' + id);
        }
        // this.informacionProducto(id);
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
        this.$router.push('/' + producto.tienda.v_slug);
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
      filtrarPorCategoria(idCategoria) {
        this.filtrado = "['id_m_categorias_fk', " + idCategoria + "]";
        this.obtenerData(this.pagination.current_page);
      },
      formatInvoice(value) {
        if (!value) return '0';
        return new Intl.NumberFormat('es-CO').format(value);
      },
      scrollToProducts() {
        const productsSection = document.querySelector('.products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      },
      // Método para intentar cargar el GIF desde diferentes rutas
      tryLoadGif() {
        const possiblePaths = [
          '/assets/images/ecommerce-performance.gif',
          'assets/images/ecommerce-performance.gif',
          './assets/images/ecommerce-performance.gif',
          '../assets/images/ecommerce-performance.gif'
        ];
        
        let currentIndex = 0;
        
        const tryNextPath = () => {
          if (currentIndex >= possiblePaths.length) {
            this.gifLoaded = false;
            return;
          }
          
          const path = possiblePaths[currentIndex];
          
          const img = new Image();
          img.onload = () => {
            this.gifUrl = path;
            this.gifLoaded = true;
          };
          img.onerror = () => {
            currentIndex++;
            tryNextPath();
          };
          img.src = path;
        };
        
        tryNextPath();
      },
      
      onGifLoad() {
        this.gifLoaded = true;
      },
      
      onGifError() {
        this.gifLoaded = false;
      }
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
        if (this.getUsuario.v_proveedor_acceso === 'LaHipertienda')
          return this.getUsuario.v_primer_nombre + ' ' + this.getUsuario.v_primer_apellido;
        else
          return this.getUsuario.v_nombre_mostrar;
      }
    }),
    created() {
      if (localStorage.getItem('filtro') !== null)
        this.otro = "['id_m_categorias_fk', " + localStorage.getItem('filtro') + "]";
      this.setSearch(this.$route.params.busqueda);
      this.obtenerData(this.pagination.current_page);
      this.tryLoadGif();
    },
    destroyed() {
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

<style scoped>
/* Hero Section Styles */
.hero-section {
  position: relative;
  height: 80vh;
  min-height: 600px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff6b35 100%);
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: -1px; /* Eliminar gap entre header y hero */
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(to bottom, rgba(255,107,53,0.1) 0%, transparent 100%);
  z-index: 2;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  height: 100%;
}

.hero-text {
  flex: 1;
  color: white;
  max-width: 50%;
  padding-right: 2rem;
  position: relative;
  z-index: 3;
}

.hero-badge {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
}

.hero-badge span {
  margin-left: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.stat-item {
  text-align: center;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-btn {
  border-radius: 50px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  padding: 0 2rem !important;
  height: 50px !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
  transition: all 0.3s ease !important;
}

.hero-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important;
}

.primary-btn {
  background: white !important;
  color: #ff6b35 !important;
}

.secondary-btn {
  border: 2px solid white !important;
  color: white !important;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  z-index: 3;
  margin-top: 20px; /* Separar del header */
  margin-bottom: 20px; /* Agregar margen inferior igual al superior */
}

/* Hero Products Carousel */
.hero-products-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.4);
  max-width: 100%;
  max-height: calc(100% - 40px); /* Reducir altura para respetar márgenes */
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  transform: scale(1.05);
  transition: all 0.3s ease;
  border: 2px solid rgba(255,107,53,0.1);
}

.hero-products-carousel:hover {
  transform: scale(1.08);
  box-shadow: 0 30px 60px rgba(0,0,0,0.5);
}

.hero-gif-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  overflow: hidden;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  padding: 10px;
}

.hero-gif-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: linear-gradient(to bottom, rgba(255,107,53,0.1) 0%, transparent 100%);
  z-index: 1;
  pointer-events: none;
  border-radius: 25px 25px 0 0;
}

.hero-gif {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 25px;
  transition: transform 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 20px;
  filter: drop-shadow(0 5px 15px rgba(0,0,0,0.1));
}

.hero-gif:hover {
  transform: scale(1.02);
  filter: drop-shadow(0 8px 25px rgba(0,0,0,0.15));
}

.hero-gif-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,107,53,0.95) 0%, rgba(247,147,30,0.95) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 25px;
}

.hero-gif-container:hover .hero-gif-overlay {
  opacity: 1;
}

.hero-gif-btn {
  border-radius: 50px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  padding: 0 2.5rem !important;
  height: 55px !important;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3) !important;
  transition: all 0.3s ease !important;
  background: white !important;
  color: #ff6b35 !important;
  border: 2px solid white !important;
  font-size: 1.1rem !important;
}

.hero-gif-btn:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 12px 35px rgba(0,0,0,0.4) !important;
  background: #fff !important;
  color: #ff6b35 !important;
  border: 2px solid #ff6b35 !important;
}

.hero-gif-fallback {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 25px;
  padding: 30px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
  border: 3px solid #ff6b35;
}

.hero-gif-fallback h3 {
  color: #ff6b35;
  margin-top: 25px;
  font-size: 28px;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.hero-gif-fallback p {
  color: #666;
  margin-top: 15px;
  font-size: 18px;
  line-height: 1.6;
}

.hero-gif-fallback .v-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Estilos para las flechas del carousel */
.hero-carousel .v-carousel__controls {
  background: transparent !important;
  position: absolute !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 100% !important;
  z-index: 10 !important;
}

.hero-carousel .v-carousel__controls__item {
  color: #ff6b35 !important;
  background: rgba(255, 255, 255, 0.95) !important;
  border-radius: 50% !important;
  width: 45px !important;
  height: 45px !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important;
  transition: all 0.3s ease !important;
  border: 2px solid #ff6b35 !important;
  position: absolute !important;
}

.hero-carousel .v-carousel__controls__item:first-child {
  left: -60px !important;
}

.hero-carousel .v-carousel__controls__item:last-child {
  right: -60px !important;
}

.hero-carousel .v-carousel__controls__item:hover {
  background: #ff6b35 !important;
  transform: scale(1.1) !important;
  box-shadow: 0 6px 20px rgba(255,107,53,0.4) !important;
}

.hero-carousel .v-carousel__controls__item:hover i {
  color: white !important;
}

.hero-carousel .v-carousel__controls__item i {
  font-size: 24px !important;
  color: #ff6b35 !important;
  transition: color 0.3s ease !important;
}

.hero-carousel-item {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  background: white !important; /* Forzar fondo blanco */
}

.hero-product-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  background: white;
  padding: 15px;
  min-height: 200px; /* Asegurar altura mínima */
}

.hero-product-card:hover {
  transform: scale(1.02);
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
}

.hero-product-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.hero-product-img {
  width: 100%;
  height: 70%;
  object-fit: contain;
  border-radius: 8px;
  transition: transform 0.3s ease;
  margin-bottom: 10px;
  max-height: 150px; /* Limitar altura máxima */
}

.hero-product-placeholder {
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;
  border: 2px dashed #ddd;
  max-height: 150px; /* Limitar altura máxima */
}

.placeholder-text {
  color: #999;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  text-align: center;
}

.hero-product-info {
  width: 100%;
  text-align: center;
}

.hero-product-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: #333;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hero-product-price {
  font-size: 1.2rem;
  font-weight: 800;
  color: #ff6b35;
}

.hero-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  overflow: hidden;
}

.hero-fallback img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-floating-card {
  position: absolute;
  top: 20%;
  right: 10%;
  background-color: white;
  border-radius: 15px;
  padding: 0.8rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  z-index: 10;
  transform: rotate(-5deg);
  opacity: 0.9;
}

.hero-floating-card span {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ff6b35;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(247,147,30,0.05) 50%, rgba(255,107,53,0.05) 100%);
  z-index: 1;
}

.hero-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  filter: blur(60px);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -50px;
  left: -100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 400px;
  height: 400px;
  bottom: 100px;
  right: -150px;
  animation-delay: 2s;
}

.shape-3 {
  width: 200px;
  height: 200px;
  top: 300px;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Section Styles */
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border-radius: 2px;
}

/* Products Section */
.products-section {
  padding: 4rem 0;
  background: white;
}

/* Stores Section */
.stores-section {
  padding: 4rem 0;
  background: #f8f9fa;
}

/* Features Banner */
.features-banner {
  padding: 6rem 0;
  background: #f8f9fa;
  text-align: center;
  margin-top: 4rem;
}

.features-header {
  margin-bottom: 4rem;
}

.features-title {
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
}

.features-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border-radius: 2px;
}

.features-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
}

.feature-item {
  position: relative;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  border-radius: 15px;
  background: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.feature-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.feature-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.feature-icon-wrapper i {
  font-size: 36px;
  color: white;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.8rem;
}

.feature-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background: rgba(255,107,53,0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.feature-item:hover .feature-hover-effect {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    height: auto;
    min-height: 500px;
    padding: 3rem 0;
  }
  
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    height: auto;
  }
  
  .hero-text {
    max-width: 100%;
    padding-right: 0;
    padding-bottom: 2rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-image {
    order: -1;
    height: 300px;
    width: 100%;
    margin-top: 15px; /* Separación en móviles */
    margin-bottom: 15px; /* Margen inferior en móviles */
  }
  
  .hero-products-carousel {
    max-width: 90%;
    height: 300px;
    max-width: 320px;
    max-height: calc(380px - 30px);
    transform: scale(1);
  }
  
  .hero-products-carousel:hover {
    transform: scale(1.02);
  }
  
  .hero-gif {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
  
  .hero-gif-container {
    height: 100%;
    min-height: 250px;
  }
  
  .hero-gif-btn {
    padding: 0 2rem !important;
    font-size: 1rem !important;
    height: 50px !important;
  }
  
  .hero-stats {
    justify-content: center;
    gap: 2rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .hero-floating-card {
    position: relative;
    top: auto;
    right: auto;
    margin-top: 1rem;
    transform: none;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .products-section,
  .stores-section {
    padding: 2rem 0;
  }

  .features-banner {
    padding: 4rem 0;
  }

  .features-title {
    font-size: 2.5rem;
  }

  .features-subtitle {
    font-size: 1rem;
  }

  .feature-item {
    padding: 1.5rem;
  }

  .feature-icon-wrapper {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }

  .feature-icon-wrapper i {
    font-size: 28px;
  }

  .feature-title {
    font-size: 1.2rem;
  }

  .feature-description {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-btn {
    width: 100%;
    max-width: 250px;
  }
  
  .hero-image {
    height: 250px;
    margin-top: 10px; /* Margen superior en móviles pequeños */
    margin-bottom: 10px; /* Margen inferior en móviles pequeños */
  }
  
  .hero-products-carousel {
    max-width: 90%;
    height: 250px;
    max-width: 280px;
    max-height: 320px;
    transform: scale(1);
  }
  
  .hero-products-carousel:hover {
    transform: scale(1.01);
  }
  
  .hero-gif {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
  
  .hero-gif-container {
    height: 100%;
    min-height: 220px;
  }
  
  .hero-gif-btn {
    padding: 0 1.5rem !important;
    font-size: 0.9rem !important;
    height: 45px !important;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
  
  .hero-badge {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}

/* Animaciones adicionales */
.hero-section,
.products-section,
.stores-section {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mejoras en el carousel */
.v-carousel {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

/* Estilos para los botones de acción */
.v-btn {
  text-transform: none !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
}

/* Mejoras en las tarjetas */
.v-card {
  border-radius: 15px !important;
  overflow: hidden !important;
}

/* Efectos de sombra mejorados */
.v-card,
.hero-btn {
  box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
  transition: all 0.3s ease !important;
}

.v-card:hover,
.hero-btn:hover {
  box-shadow: 0 10px 25px rgba(0,0,0,0.2) !important;
}
</style>

