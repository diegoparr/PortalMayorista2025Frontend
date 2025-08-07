<template>
  <v-app>
    <carousel  xs12 sm6 md4 navigationEnabled :perPageCustom="[[300, 1],[480, 1], [768, 1]]" :paginationEnabled="false">
      <slide class="align-center" v-for="(oferta,i) in ofertas" :key="i">

       <!-- <v-container fluid grid-list-lg>
          <v-card>
            <v-card-media style="height: 100px; cursor: pointer" v-on:click="redirigirProducto(oferta.id_m_productos)" :src="getImageUrl(oferta.v_portada)">
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <span class="body-1"><strong>{{oferta.v_nombre | truncate(letras2)}} con el {{oferta.n_porcentaje_descuento}}% Dto </strong></span><br/>
                <span class="caption">{{ oferta.v_resena | truncate(letras) }}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>

              <strong>
                <span>${{formatInvoice(oferta.n_precio)}}</span>
              </strong>

              <strong>
                <span >${{formatInvoice(oferta.n_precio_descuento)}}</span>
              </strong>

            </v-card-actions>
          </v-card>
        </v-container>-->
        <div class="ctd-oft-inf-tienda">
          <div class="ctd-img-oft-inf-tienda">
            <div class="contenedor-imagen-slide oferta"
                 :style="{'background-image': 'url(' + getImageUrl(oferta.v_portada) + ')'}"
                 v-on:click="redirigirProducto(oferta.id_m_productos)">
            </div>
          </div>
          <div class="ctd-dtl-oft-inf-tienda">

            <div class="ctd-txt-pdto-oft-inf-tienda">
              <div class="ctd-tlt-pdto-oft-inf-tienda">
                <strong><span>{{oferta.v_nombre | truncate(letras2)}} con el {{oferta.n_porcentaje_descuento}}% Dto </span></strong>
              </div>
              <div class="ctd-txt-dscp-pdto-oft-inf-tienda">
                <span>{{ oferta.v_resena | truncate(letras) }}</span>
              </div>

            </div>
            <div class="contenedor-precios-oferta">
              <div class="ctd-prc-antes-pdto-oft-inf-tienda">
                <div class="tlt-prc-antes-pdto-oft-inf-tienda">
                  <span>Antes </span>
                  <strong>
                    <span>${{formatInvoice(oferta.n_precio)}}</span>
                  </strong>
                </div>
              </div>
              <div class="ctd-prc-ahora-pdto-oft-inf-tienda">
                <div class="tlt-prc-ahora-pdto-oft-inf-tienda">
                  <span> Ahora</span>
                  <strong>
                    <span>${{formatInvoice(oferta.n_precio_descuento)}}</span>
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </slide>
    </carousel>
  </v-app>
</template>
<script>
  import {Carousel, Slide} from 'vue-carousel';
  import ImageHandler from '../../../../mixin/ImageHandler';

  export default {
    mixins: [ImageHandler],
    data(){
      return {
        idProducto: false,
        cantidad: null,
        letras: 70,
        letras2: 20
      }
    },
    props: ['ofertas'],
    components: {Carousel, Slide},
    created() {
      this.calcularArray();
    },
    methods: {
      redirigirProducto(id) {
        this.idProducto = id;
        this.$emit('id', id);
      },
      calcularArray() {
        let total = this.ofertas.length;
        if(total >= 2)
          this.cantidad = 2;
        else
          this.cantidad = 1;
        if (screen.width>768){
          this.letras = 250;
          this.letras2 = 255;
        }
      }
    },
  }
</script>
