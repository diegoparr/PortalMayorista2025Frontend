<template>
  <div class="row">
    <div class="col-xs-12 col-md-3">
      <div class="form-group">
        <label for="id_m_pedidos">Pedido # </label>
        <input name="v_nombre" type="text" class="form-control"
                data-placement="left" required id="id_m_pedidos"
               :title="'El id del pedido es '+pedido.id_m_pedidos"
               v-model="pedido.id_m_pedidos" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-3">
      <div class="form-group">
        <label for="v_nombre_cliente">Comprador</label>
        <input name="v_nombre_cliente" type="text" class="form-control"
                data-placement="left" required id="v_nombre_cliente"
               :title="'El comprador es '+pedido.usuario.name"
               v-model="pedido.usuario.name" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-3">
      <div class="form-group">
        <label for="v_nombre_cliente">Metodo de Pago</label>
        <input name="v_metodo_pago" type="text" class="form-control"
                data-placement="left" required id="v_metodo_pago"
               :title="'metodo de pago '+pedido.metodo_pago.v_descripcion"
               v-model="pedido.metodo_pago.v_descripcion" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-3">
      <div class="form-group">
        <label for="pedido.n_total">Total</label>
        <input name="n_total" type="text" class="form-control"
                data-placement="left" required id="pedido.n_total"
               :title="'El total del pedido es '+pedido.n_total"
               v-model="pedido.n_total" readonly>
      </div>
    </div>

    <div class="col-xs-12 col-md-12" v-for="dataPedido in pedido.pedidoTiendas">
      <h4>Tienda: {{ dataPedido.tienda.v_nombre }}</h4>
      <table class="table table-responsive">
        <thead>
        <tr>
          <th class="nombreProducto">Producto</th>
          <th class="itemTabla">Precio</th>
          <th class="itemTabla">Cantidad</th>
          <th class="itemTabla">Precio X Cantidad</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="detalle in dataPedido.detalle">
          <td>
            {{ detalle.producto.v_nombre }}
          </td>
          <td>
            ${{ formatInvoice(detalle.n_precio) }}
          </td>
          <td>
            {{ detalle.n_cantidad }}
          </td>
          <td class="pull-right">
            ${{ formatInvoice(detalle.n_precio * detalle.n_cantidad) }}
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="3" style="text-align: right">
            Total a pagar
          </td>
          <td >
            ${{ formatInvoice(dataPedido.n_total) }}
          </td>
        </tr>
        </tfoot>
      </table>

    </div>
  </div>

</template>
<script>
  export default {
    props: ['pedido'],
    created() {
      console.log('pedido', this.pedido);
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
