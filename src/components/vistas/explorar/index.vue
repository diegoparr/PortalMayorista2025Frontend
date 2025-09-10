<template>
  <v-app>
    <loader v-if="cargandoData"></loader>
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <img src="/assets/images/background.jpg" alt="Background" class="hero-bg-image">
        <div class="hero-overlay"></div>
      </div>
      <v-container>
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
            <div class="hero-visual">
              <img 
                :src="gifUrl" 
                alt="Ecommerce Performance" 
                class="hero-main-image" 
                @load="onGifLoad"
                @error="onGifError">
              <div class="hero-fallback" v-if="!gifLoaded">
                <v-icon size="80" color="#ff6b35">mdi-shopping</v-icon>
                <h3>¡Descubre Productos Increíbles!</h3>
                <p>Compra con confianza y recibe envíos rápidos</p>
              </div>
            </div>
            <div class="hero-features">
              <div class="feature-badge">
                <v-icon color="orange" size="20">mdi-truck-fast</v-icon>
                <span>Envío gratis</span>
              </div>
              <div class="feature-badge">
                <v-icon color="orange" size="20">mdi-shield-check</v-icon>
                <span>Pagos seguros</span>
              </div>
              <div class="feature-badge">
                <v-icon color="orange" size="20">mdi-headset</v-icon>
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </section>

    <!-- Products Section -->
    <section class="products-section">
      <v-container>
        <div class="section-header">
          <h2 class="section-title">Productos Destacados</h2>
          <p class="section-subtitle">Encuentra los mejores productos de nuestros vendedores certificados</p>
        </div>
        <productos
          :productos="pagination.data"
          :vista="true"
          v-on:id="redirigirProducto"
          v-bind:productoId="productoId">
        </productos>
      </v-container>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <v-container>
        <div class="features-header">
          <h2 class="features-title">¿Por qué elegir LaHipertienda?</h2>
          <p class="features-subtitle">Descubre las ventajas que nos hacen únicos</p>
        </div>
        <v-layout row wrap>
          <v-flex xs12 sm6 md3 v-for="(feature, index) in features" :key="index">
            <div class="feature-item">
              <div class="feature-icon">
                <i :class="feature.icon"></i>
              </div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <!-- Carousel Section -->
    <section class="carousel-section">
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
    </section>

    <!-- Recommended Stores Section -->
    <section class="stores-section">
      <v-container>
        <div class="section-header">
          <h2 class="section-title">Tiendas Recomendadas</h2>
          <p class="section-subtitle">Descubre las mejores tiendas de nuestra plataforma</p>
        </div>
        <tiendas-recomendadas></tiendas-recomendadas>
      </v-container>
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
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,107,53,0.85) 0%, rgba(247,147,30,0.75) 100%);
  z-index: 2;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 3rem;
  position: relative;
  z-index: 3;
}

.hero-text {
  flex: 1;
  color: white;
  max-width: 50%;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.hero-badge span {
  margin-left: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 800;
  display: block;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-btn {
  border-radius: 25px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  padding: 0 1.5rem !important;
  height: 50px !important;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important;
  transition: all 0.3s ease !important;
}

.hero-btn:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 25px rgba(0,0,0,0.4) !important;
}

.primary-btn {
  background: white !important;
  color: #ff6b35 !important;
}

.secondary-btn {
  border: 2px solid white !important;
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px) !important;
}

.hero-image {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.hero-visual {
  position: relative;
  width: 100%;
  max-width: 450px;
  height: 350px;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0,0,0,0.3);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
  transition: all 0.3s ease;
}

.hero-visual:hover {
  transform: perspective(1000px) rotateY(-2deg) rotateX(2deg) scale(1.02);
  box-shadow: 0 30px 60px rgba(0,0,0,0.4);
}

.hero-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.hero-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  color: #ff6b35;
  height: 100%;
}

.hero-fallback h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
}

.hero-fallback p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

.hero-features {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-badge {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 0.6rem 1.2rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  gap: 0.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.feature-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.feature-badge span {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
}


/* Section Styles */
.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Products Section */
.products-section {
  padding: 2rem 0;
  background: #f8f9fa;
}

/* Features Section */
.features-section {
  padding: 2rem 0;
  background: white;
}

.features-header {
  text-align: center;
  margin-bottom: 2rem;
}

.features-title {
  font-size: 2.5rem;
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
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border-radius: 2px;
}

.features-subtitle {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.feature-item {
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border-radius: 15px;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #f0f0f0;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

.feature-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(255,107,53,0.3);
}

.feature-icon i {
  font-size: 32px;
  color: white;
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.8rem;
}

.feature-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
}

/* Carousel Section */
.carousel-section {
  padding: 1rem 0;
  background: white;
}

/* Stores Section */
.stores-section {
  padding: 2rem 0;
  background: #f8f9fa;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 0;
    min-height: 60vh;
  }
  
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-text {
    max-width: 100%;
    order: 2;
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
    order: 1;
    width: 100%;
  }
  
  .hero-visual {
    max-width: 100%;
    height: 280px;
    transform: none;
  }
  
  .hero-visual:hover {
    transform: scale(1.02);
  }
  
  .hero-features {
    justify-content: center;
    gap: 0.8rem;
  }
  
  .feature-badge {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
  
  .hero-stats {
    justify-content: center;
    gap: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .products-section,
  .features-section,
  .stores-section {
    padding: 1.5rem 0;
  }

  .features-title {
    font-size: 2rem;
  }

  .features-subtitle {
    font-size: 1rem;
  }

  .feature-item {
    padding: 1.5rem;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }

  .feature-icon i {
    font-size: 28px;
  }

  .feature-title {
    font-size: 1.1rem;
  }

  .feature-description {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    min-height: 50vh;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }
  
  .hero-btn {
    width: 100%;
    max-width: 250px;
    height: 45px !important;
    font-size: 0.9rem !important;
  }
  
  .hero-visual {
    height: 220px;
  }
  
  .hero-features {
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
  }
  
  .feature-badge {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
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
    gap: 0.3rem;
    padding: 0.4rem 0.8rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .features-title {
    font-size: 1.8rem;
  }
}

/* Animaciones suaves */
.hero-section,
.products-section,
.features-section,
.stores-section {
  animation: fadeInUp 0.6s ease-out;
}

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

/* Mejoras en el carousel */
.v-carousel {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
}

/* Estilos globales para botones */
.v-btn {
  text-transform: none !important;
  font-weight: 600 !important;
  letter-spacing: 0.3px !important;
}

/* Mejoras en las tarjetas */
.v-card {
  border-radius: 15px !important;
  overflow: hidden !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08) !important;
  transition: all 0.3s ease !important;
}

.v-card:hover {
  box-shadow: 0 8px 25px rgba(0,0,0,0.12) !important;
}
</style>

