<template>
  <div class="row">
    <div class="col-xs-12 col-md-6">

      <v-carousel hide-delimiters light v-if="catalogo.imagenes.length > 0" style="height: auto">
        <v-carousel-item
          v-for="(catalogo,i) in catalogo.imagenes"
          :key="i">
          <img :src="catalogo.v_url" style="height: 100%; width: 100%">
        </v-carousel-item>
      </v-carousel>

      <img v-else :src="catalogo.v_imagen_portada" style="height: 100%; width: 100%">

    </div>
    <div class="col-xs-12 col-md-6 container-detail-catalogos-margin">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#tab_1-1" data-toggle="tab">Descripción</a></li>
          <li><a href="#tab_1-2" data-toggle="tab">Caracteristicas</a></li>
        </ul>
        <div class="tab-content">
          <div v-html="catalogo.v_descripcion" class="tab-pane active" id="tab_1-1"></div>
          <div class="tab-pane" id="tab_1-2">
            <div class="table-responsive no-padding">
              <table class="table table-hover">
                <tbody>
                <tr>
                  <th class="text-center">Nombre</th>
                </tr>
                <tr v-for="carac in catalogo.caracteristicas">
                  <td class="text-center">{{carac.v_nombre}}</td>
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
    props: ['catalogo'],
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('modal_close');
      });
    },
  }
</script>
