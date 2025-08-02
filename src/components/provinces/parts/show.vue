<template>
  <div class="row">
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_nombre_provincia">Nombre de la provincia</label>
        <input name="v_nombre_provincia" type="text" class="form-control"
                data-placement="left" required id="v_nombre_provincia"
               :title="'El nombre de la provincia es '+provincia.v_nombre_provincia"
               v-model="provincia.v_nombre_provincia" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_hasc">Hasc</label>
        <input name="v_hasc" type="text" class="form-control"
                data-placement="left" required id="v_hasc"
               :title="'El hasc es '+provincia.v_hasc"
               v-model="provincia.v_hasc" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="n_latitud">Latitud</label>
        <input name="n_latitud" type="text" class="form-control"
                data-placement="left" required id="n_latitud"
               :title="'La latitud es '+provincia.n_latitud"
               v-model="provincia.n_latitud" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="n_longitud">Longitud</label>
        <input name="n_longitud" type="text" class="form-control"
                data-placement="left" required id="n_longitud"
               :title="'La longitud es '+provincia.n_longitud"
               v-model="provincia.n_longitud" readonly>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['provincia'],
    created() {
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('cerrar_modal');
      })
    },

  }
</script>
