<template>
  <!--<button class="btn btn-hipertienda btn-flat" @click="agregar(product)">Comprar</button>-->
  <v-btn fab small icon @click="agregar(product)">
    <v-icon color="primary">add_shopping_cart</v-icon>
  </v-btn>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    data: function () {
      return {
        name: 'addToCart'
      }
    },
    props: {
      product: Object
    },
    methods: Object.assign({}, mapMutations(['addToCart']),
      {
        agregar(producto) {
          console.log("el producto", producto);
          this.addToCart(producto);
          this.$toastr('success', producto.v_nombre, 'Producto Agregado al Carrito');
        }
      })
  }
</script>
