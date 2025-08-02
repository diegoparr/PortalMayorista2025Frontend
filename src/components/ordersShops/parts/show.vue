<template>
  <div class="row">
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label>Pedido # {{ pedido.id_m_pedido_tiendas}}</label>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label >Comprador: {{pedido.usuario.name}}</label>

      </div>
    </div>

    <div class="col-xs-12 col-md-12">
      <div class="form-group">
        <label>Dirección: {{ pedido.usuario.direccion.v_direccion+ ' '+pedido.usuario.direccion.v_nombre_provincia+' '+pedido.usuario.direccion.v_nombre_ciudad+' '+pedido.usuario.direccion.v_nombre_pais}}</label>
        <br>
        <label v-if="pedido.usuario.telefonos.length > 1">Telefonos: {{ pedido.usuario.telefonos[0].v_telefono+' / '+pedido.usuario.telefonos[1].v_telefono}}</label>
        <label v-else>Telefonos: {{ pedido.usuario.telefonos[0].v_telefono }}
        </label>
      </div>
    </div>

    <div class="col-xs-12 col-md-12" >
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
        <tr v-for="detalle in pedido.detalle">
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
            ${{ formatInvoice(pedido.n_total) }}
          </td>
        </tr>
        </tfoot>
      </table>
      <div class="col-xs-12 col-md-12 text-center"><button class="btn btn-success" v-on:click="enviarPedido(pedido)">Enviar Pedido</button> </div>
    </div>
    <div class="modal fade bs-example-modal-sm" id="modalEnviar" tabindex="-1" role="dialog"
         aria-labelledby="mySmallModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title text-center">¿Seguro que deseas Enviar este pedido?</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-12" align="center">
                <button class="btn btn-success" type="button" id="btnProcesar" v-on:click="procesar()"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Enviando">
                  Enviar Pedido <i class="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>
<script>
  import {mapGetters} from 'vuex';
  import AppServices from '../../AppServices';

  export default {
    data(){
      return{
      idPedido: null
      }
    },
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
    computed: Object.assign({}, mapGetters([
        'getUsuario'
      ])),
    methods:{
      getAppServices() {
        return AppServices;
      },
      enviarPedido(pedido){
        $('#modalEnviar').modal('show');
        this.idPedido = pedido.id_m_pedido_tiendas;
      },
      procesar() {
        let yo = this;
        let token = this.getUsuario.token;
        let boton_enviar = $('#btnProcesar');
        boton_enviar.button('loading');
        this.pedido.v_status = "Enviado";
        this.getAppServices().putMethodWithBearer('api/ecommerce/pedidosTiendas/' + this.idPedido,this.pedido, token)
          .then(response => {
            $('#modalDestroy').modal('hide');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
            boton_enviar.button('reset');
            yo.$emit('actualizar');
            $('.modal').modal('hide');
          }, errors => {
            yo.$toastr('error', errors.body.mensaje, "Error desconocido");
            boton_enviar.button('reset');
            $('.modal').modal('hide');
          });
      },
    }

  }
</script>
