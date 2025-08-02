<template>
  <div class="ctd-prmc-inf-tienda">
    <div class="ctd-cj-prmc-inf-tienda">
      <div class="cbz-cj-prmc-inf-tienda">
        <span>Promociones</span>
      </div>
      <hr>
      <div class="crp-cj-prmc-inf-tienda">
        <carousel :perPage="0" :perPageCustom="[[300, 1],[480, 1], [768, 1], [1024, 1]]"
                  :paginationEnabled="false" :scrollPerPage="true"
                  :navigationEnabled="true">
          <slide>
            <div class="contenedor-imagen-slide"
                 :style="{'background-image': 'url( https://lorempixel.com/1280/400/ )'}">
            </div>
          </slide>
          <slide>
            <div class="contenedor-imagen-slide oferta"
                 :style="{'background-image': 'url( https://lorempixel.com/1280/400/ )'}">
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "promociones",
    props: ['tienda']
  }
</script>

<style scoped>

</style>
