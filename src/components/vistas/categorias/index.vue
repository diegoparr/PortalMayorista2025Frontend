<template>
  <v-app>
    <div v-if="cargandoData">
      <loader></loader>
    </div>
    <div v-else>
      <v-container>
        <h1>Productos</h1>
        <div v-for="(producto,i) in productos " :key="i">
          {{producto.v_nombre}}
        </div>
        <h1>Tiendas</h1>
        <div v-for="(tienda,i) in tiendas">
          {{tienda.v_nombre }}
        </div>
      </v-container>
    </div>
  </v-app>
</template>
<script>
  import AppServices from '../../AppServices';
  import Loader from '../../parts/loader';

  export default {
    data() {
      return {
        cargandoData: false,
        productos: null,
        tiendas: null,
        categoriaId: null,
        categoria: null
      }
    },
    components: {Loader},
    beforeMount() {
      this.cargandoData = true;
    },
    created() {
      this.categoriaId = this.$route.params.id;
      this.getCategoria(this.categoriaId);
    },
    methods: {
      getAppServices() {
        return AppServices;
      },
      getCategoria(catID) {
        this.getProductos(catID);
      },
      getProductos(catID) {
        this.getAppServices().getMethodWithoutBearer(this.urlsApi().endpointsIndex.productos.noAutenticado, 'all', null, "'tienda'", null, "['id_m_categorias_principal_fk', " + catID + "]")
          .then(response => {
            this.cargandoData = false;
            this.productos = response.body.orderBy;
            this.getTiendas(this.productos);

          }, errors => this.mapErrorsResponses(this, errors));
      },
      getTiendas(catID) {
        catID.forEach(function(element) {
          console.log(element);
        });
        // this.getMethodWithoutBearer(this.urlsApi().endpointsTiendas.noAutenticado, 'all', null, null, null)
        //   .then(response => {
        //     this.cargandoData = false;
        //     this.tiendas = response.body;
        //     console.log('Tienda');
        //     console.log(this.tiendas)
        //   }, errors => this.getAppServices().mapErrorsResponses(this, errors));

      }
    }
  }

</script>
