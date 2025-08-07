<template>
  <div class="">
    <v-layout>
      <v-dialog v-model="shoppingCart">
        <v-btn icon slot="activator" color="primary" dark>
          <v-badge rigth color="secondary">
            <span slot="badge">{{productsQuantity}}</span>
            <v-icon>shopping_cart</v-icon>
          </v-badge>
        </v-btn>
        <v-card>
          <v-toolbar flat color="white">
            <v-avatar color="">
              <img src="../../../../dist/img/logo_small.png"/>
            </v-avatar>
            <v-toolbar-title>Tus Productos</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <template>
            <div v-if="cargandoData">
            <loader></loader>
          </div>
            <div>
              <v-data-table
                :headers="headers"
                :items="products"
                :search="search"
                hide-actions
                class="elevation-1">
                <template slot="items" slot-scope="props" >
                  <td class="text-xs-left"><img class="hidden-sm-and-up media-object rounded small" style="height: 30px; width: auto" :src="getImageUrl(props.item.foto)" :alt="props.item.name"><img class="hidden-md-and-down media-object rounded small" style="height: 100px; width: auto" :src="getImageUrl(props.item.foto)" :alt="props.item.name"></td>
                  <td class="text-xs-left">{{props.item.name}}</td>
                  <td class="text-xs-left">{{props.item.tienda.nombre}}</td>
                  <td class="text-xs-left">${{formatInvoice(props.item.price)}}</td>
                  <td class="align-center"><br>
                    <i class="fa fa-minus-circle" @click="agregar(props.item, -1)" v-if="props.item.quantity > 1"></i>
                    <i :product="props.item" v-if="props.item.quantity === 1" class="fa fa-close"
                       @click="removeFromCart(props.item)"></i>
                    <strong class="quantity">{{props.item.quantity}}</strong>
                    <i class="fa fa-plus-circle" @click="agregar(props.item, 1)"></i>
                  </td>
                  <td class="text-xs-left">${{formatInvoice(props.item.subtotal)}}</td>
                </template>
                <template slot="no-data">
                  <v-container fluid>
                    <v-layout row justify-space-between>
                      <v-flex>
                        <v-card-text>
                          <p class="text-xs-center">El carrito esta vacio! :(</p>
                        </v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </template>
                <template slot="footer">
                  <td colspan="100%">
                    <ul class="list-group">
                      <li class="list-group-item">
                        Subtotal ({{itemsQuantity}}):${{formatInvoice(subtotal)}}
                        <em v-if="productDiscount"><b> (30% OFF applied)</b></em>
                      </li>
                      <li class="list-group-item">Descuentos : - ${{formatInvoice(discount)}}</li>
                      <li class="list-group-item">
                        <strong>Total:</strong>
                        <strong>${{formatInvoice(total)}}</strong>
                      </li>
                    </ul>
                  </td>
                </template>
              </v-data-table>
            </div>
          </template>
          <v-divider></v-divider>
          <v-toolbar flat color="white" v-if="!cargandoData">
            <v-spacer></v-spacer>
            <v-btn color="accent center" flat @click.native="shoppingCart = false">Cerrar</v-btn>
            <v-btn color="primary" @click="buy" :disabled="tot === 0">Procesar orden</v-btn>
          </v-toolbar>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>


<script>
  import Loader from '../../parts/loader';
  import {mapGetters, mapMutations, mapState} from 'vuex';
  import ImageHandler from '../../../mixin/ImageHandler';

  export default {
    mixins: [ImageHandler],
    props: {
      product: Object
    },
    data() {
      return {
        cargandoData: false,
        productDiscount: false,
        search: '',
        shoppingCart: false,
        productos: [],
        cantidad: null,
        headers: [
          {
            text: 'Foto',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {text: 'Producto', value: 'producto'},
          {text: 'Tienda', value: 'tienda'},
          {text: 'Precio', value: 'price'},
          {text: 'Cantidad', value: 'quantity'},
          {text: 'Total Producto', value: 'price'}
        ],
        enviando: false,
      }
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('modal_close');
      });
      console.log("items", this.products);
    },
    computed: mapGetters({
      itemsQuantity: 'itemsQuantity',
      productsQuantity: 'ProductsQuantity',
      subtotal: 'subtotal',
      taxes: 'taxes',
      shipping: 'shipping',
      total: 'total',
      products: 'cartProducts',
      tot: 'total',
      discount: 'discount',
      getUsuario: 'getUsuario',

    }),
    ...mapState({
      productDiscount: state => {
        return state.ShoppingCart.productDiscount;
      },
      freeShipping: state => {
        return state.ShoppingCart.freeShipping;
      },
      totalDiscount: state => {
        return state.ShoppingCart.totalDiscount;
      }
    }),
    totalWithDiscount() {
      let total = this.total;
      return total > 0 ? this.total : 0
    },
    components: {
      Loader
    },

    methods:
      Object.assign({}, mapMutations(['setEmptyCart', 'addToCart', 'removeFromCart']), {
        agregar(item, cantidad) {
          console.log("El stock es", item);
          if (item.quantity + cantidad > item.stock) {
            this.$toastr('info', '', 'Ya no hay más productos en existencia');
          } else {
            item.quantity = item.quantity + cantidad;
            this.addToCart(item);
          }
        },
        buy() {
          if (!this.getUsuario.estaAutenticadoFull)
            this.$toastr('info', 'Ingresa tus credenciales para continuar la compra', 'No te has logueado');
          else {
            let yo = this;
            this.enviando = true;
            this.cargandoData =true;
            let form = {items: this.products, n_total: this.tot, n_descuento: this.discount, id_m_metodo_pagos_fk: 1};
            this.postMethodWithBearer(this.urlsApi().endpointsPedidos.guardar, form, this.getUsuario.token)
              .then(response => {
                console.log("respuesta envio", response);
                this.cargandoData =false;
                this.setEmptyCart();
                this.$toastr('success', 'El pedido se ha enviado correctamente', 'Pedido Enviado');
                this.enviando = false;
                yo.$emit('modal_close');
                this.shoppingCart = false;
              }, errors => {
                this.enviando = false;
                this.mapErrorsResponses(this, errors);
              })
          }
        }
      })
  }
</script>
