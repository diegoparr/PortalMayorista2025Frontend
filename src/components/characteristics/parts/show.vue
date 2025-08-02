<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <div class="form-group">
        <label for="v_nombre">Nombre de la característica</label>
        <input name="v_nombre" type="text" class="form-control"
                data-placement="left" required id="v_nombre"
               :title="'El nombre de la característica es '+caracteristica.v_nombre"
               v-model="caracteristica.v_nombre" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-12">
      <div class="form-group">
        <label for="v_tipo">Tipo</label>
        <input name="v_tipo" type="text" class="form-control"
                data-placement="left" required id="v_tipo"
               :title="'El tipo es '+caracteristica.v_tipo"
               v-model="caracteristica.v_tipo" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-12 ">
      <div class="form-group">

      </div>
      <!--<table class="table table-hover table-bordered text-left">
        <thead>
        <tr><th class="text-center">Valor</th></tr>
        </thead>
        <tbody>

        <tr v-for="item in caracteristica.valores_caracteristicas">
          <td class="text-center">{{item.v_valor}}</td>
        </tr>
        </tbody>
      </table>-->
    </div>
  </div>
</template>
<script>
  export default {
    props: ['caracteristica'],
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
