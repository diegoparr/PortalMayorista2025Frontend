<template>
  <div class="row">
    <div class="col-xs-12 col-md-6">
      <v-carousel hide-delimiters light style="height: auto" v-if="product.imagenes.length > 0">
        <v-carousel-item
          v-for="(product,i) in product.imagenes"
          :key="i">
          <img :src="product.v_url" style="height: 100%; width: 100%">
        </v-carousel-item>
      </v-carousel>
      <img v-else :src="product.v_portada" style="height: 100%; width: 100%">
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
                <tr v-for="carac in unicas">
                    <td class="text-center">{{carac.nombre}}</td>
                    <td class="text-center">{{carac.valor}}</td>

                </tr>
                <tr v-for="carac in multiples">
                  <td class="text-center">{{carac.nombre}}</td>
                  <td class="text-center" >[ <span v-for="item in carac.valor">{{item}} </span> ]</td>

                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        unicas:[],
        multiples:[],
      }
    },
    props: ['product'],
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('modal_close');
      });
      let nombAnte = '';
      let flag = false;
      let valMult = [];
      this.product.caracteristicas.forEach(item =>{
        if(item.v_tipo === 'unica')
          this.unicas.push({nombre:item.v_nombre, valor: item.pivot.v_valor})
        else
        {
          if(item.v_nombre !== nombAnte && !flag){
            console.log('entre');
            nombAnte = item.v_nombre;
            flag = true;
          }

          if(item.v_nombre !== nombAnte)
          {
            this.multiples.push({nombre:nombAnte,valor:valMult})
            nombAnte = item.v_nombre;
            valMult = [];
          }
          console.log('antes', nombAnte);
          console.log('nombre', item.v_nombre);
          valMult.push(item.pivot.v_valor);
        }

      });
      this.multiples.push({nombre:nombAnte,valor:valMult})
      console.log('unicas',this.unicas);
      console.log('multiples', this.multiples);
    },
  }
</script>
