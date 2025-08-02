<template>
  <div class="row">
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_nombre_ciudad">Nombre de la ciudad</label>
        <input name="v_nombre_ciudad" type="text" class="form-control"
                data-placement="left" required id="v_nombre_ciudad"
               :title="'El nombre de la ciudad es '+ciudad.v_nombre_ciudad"
               v-model="ciudad.v_nombre_ciudad" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_hasc">Hasc</label>
        <input name="v_hasc" type="text" class="form-control"
                data-placement="left" required id="v_hasc"
               :title="'El hasc es '+ciudad.v_hasc"
               v-model="ciudad.v_hasc" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="n_latitud">Latitud</label>
        <input name="n_latitud" type="text" class="form-control"
                data-placement="left" required id="n_latitud"
               :title="'La latitud es '+ciudad.n_latitud"
               v-model="ciudad.n_latitud" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="n_longitud">Longitud</label>
        <input name="n_longitud" type="text" class="form-control"
                data-placement="left" required id="n_longitud"
               :title="'La longitud es '+ciudad.n_longitud"
               v-model="ciudad.n_longitud" readonly>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['ciudad'],
    created() {
      console.log(this.ciudad);
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('cerrar_modal');
      })
    },
  }
</script>
