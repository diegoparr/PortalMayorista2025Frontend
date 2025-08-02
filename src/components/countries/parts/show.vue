<template>
  <div class="row">
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_nombre">País</label>
        <input name="v_nombre" type="text" class="form-control"
                data-placement="left" required id="v_nombre"
               :title="'El nombre del país es '+pais.v_nombre"
               v-model="pais.v_nombre" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_iso2">Iso 2</label>
        <input name="v_iso2" type="text" class="form-control"
                data-placement="left" required id="v_iso2"
               :title="'El iso 2 es '+pais.v_iso2"
               v-model="pais.v_iso2" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_iso3">Iso3</label>
        <input name="v_ciudad" type="text" class="form-control"
                data-placement="left" required id="v_iso3"
               :title="'El iso 3 es '+pais.v_iso3"
               v-model="pais.v_iso3" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_prefijo_telefonico">Prefijo Telefónico</label>
        <input name="v_prefijo_telefonico" type="text" class="form-control"
                data-placement="left" required id="v_prefijo_telefonico"
               :title="'El prefijo telefónico es '+pais.v_prefijo_telefonico"
               v-model="pais.v_prefijo_telefonico" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="n_latitud">Latitud</label>
        <input name="n_latitud" type="text" class="form-control"
                data-placement="left" required id="n_latitud"
               :title="'La latitud es '+pais.n_latitud"
               v-model="pais.n_latitud" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="n_longitud">Longitud</label>
        <input name="n_longitud" type="text" class="form-control"
                data-placement="left" required id="n_longitud"
               :title="'La longitud es '+pais.n_longitud"
               v-model="pais.n_longitud" readonly>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['pais'],
    created() {
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('cerrar_modal');
      })
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('cerrar_modal');
      })
    }
  }
</script>
