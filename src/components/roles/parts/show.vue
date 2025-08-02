<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input name="name" type="text" class="form-control"
                data-placement="left" required id="name"
               :title="'El nombre del rol es '+rol.name"
               v-model="rol.name" readonly>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    props: ['rol'],
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
