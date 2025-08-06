<template>
  <div class="content-wrapper">
    <loader v-if="loader"></loader>
    <section class="content-header">
      <h1>
        Dashboard
        <small>Version 2.0</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Dashboard</li>
      </ol>
    </section>
    <section class="content">
      <div class="row">
        <router-view v-on:load_data="showLoader" v-show="!loader"></router-view>
      </div>
    </section>
  </div>
</template>
<script>
  import Loader from '../../../parts/loader.vue'

  export default {
    data() {
      return {
        loader: true,
      }
    },
    methods: {
      showLoader(event) {
        this.loader = event.show;
      }
    },
    components: {Loader},
    watch: {
      '$route': function (to) {
        console.log(to)
      }
    },
    created() {
      console.log(this.$route.meta);
    }
  }
</script>

<style scoped>
/* Eliminar espacios en blanco */
.content-wrapper {
  margin: 0 !important;
  padding: 0 !important;
}

.content-header {
  margin: 0 !important;
  padding: 0 !important;
}

.content {
  margin: 0 !important;
  padding: 0 !important;
}

.row {
  margin: 0 !important;
  padding: 0 !important;
}

/* Asegurar que el contenido comience desde arriba */
section {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

/* Eliminar cualquier espacio del breadcrumb */
.breadcrumb {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
