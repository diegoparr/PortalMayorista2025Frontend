<template>
<div>
  <div class="col-xs-12 col-sm-6  col-md-3" v-for="(producto,j) in productos">
    <div class="contenedor-producto-vista-explorar">
            <div class="contenedor-imagen-slide"
                 :style="{'background-image': 'url(' + getImageUrl(producto.v_portada) + ')'}"
                 v-on:click="redirigirProducto(producto.id_m_productos)">
            </div>
            <div class="contenedor-detalle-producto">
              <div class="contenedor-nombre-producto">
                <span>{{producto.v_nombre | truncate(80)}}</span>
              </div>
              <div class="contenedor-iconos-slider">
                <img src="/dist/img/u14.png">
                <span >{{producto.categoria.v_nombre | truncate(45)}}</span>
              </div>
              <div class="contenedor-iconos-slider">
                <img src="/dist/img/u11.png">
                <span class="contenedor-precio-producto"><strong>${{formatInvoice(producto.n_precio)}}</strong></span>
              </div>
              <div class="contenedor-iconos-slider">
                <img src="/dist/img/u25.png"> {{tienda.v_nombre_provincia}}
              </div>
              <!--<div class="contenedor-iconos-slider">
                <img src="/dist/img/u11.png"> Aplica Código de Canje
              </div>
              <div class="contenedor-iconos-slider">
                <img src="/dist/img/u304.png"> Envío Gratis en Bogotá
              </div>-->
            </div>
          </div>
        </div>
</div>
</template>

<script>
  import ImageHandler from '../../../mixin/ImageHandler';

  export default {
    data(){
      return {
        name: "productos",

      }
    },
    props: ['productos', 'tienda','perPage'],
    mixins: [ImageHandler],
    created(){
//      console.log("productos",this.productos)
    },
    methods: {
      redirigirProducto(id) {
        console.log("id_producto", id);
        this.idProducto = id;
        this.$emit('id', id);
      },
    }
  }
</script>
