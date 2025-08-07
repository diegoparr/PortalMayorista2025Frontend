<template>
  <div class="order-details-container">
    <!-- Header del pedido - más compacto -->
    <div class="order-header">
      <div class="order-number">
        <i class="fa fa-shopping-cart"></i>
        <span>Pedido # {{ pedido.id_m_pedido_tiendas}}</span>
      </div>
      <div class="order-status">
        <span class="status-badge" :class="getStatusClass(pedido.v_status)">
          {{ pedido.v_status }}
        </span>
      </div>
    </div>

    <!-- Información del cliente - más compacta -->
    <div class="customer-info-section">
      <h5><i class="fa fa-user"></i> Información del Cliente</h5>
      <div class="customer-details">
        <div class="detail-row">
          <span class="label">Comprador:</span>
          <span class="value">{{pedido.usuario.name}}</span>
        </div>
        
        <div class="detail-row">
          <span class="label">Dirección:</span>
          <span class="value" v-if="pedido.usuario.direccion">
            <i class="fa fa-map-marker"></i>
            {{ pedido.usuario.direccion.v_direccion+ ' '+pedido.usuario.direccion.v_nombre_provincia+' '+pedido.usuario.direccion.v_nombre_ciudad+' '+pedido.usuario.direccion.v_nombre_pais}}
          </span>
          <span class="value no-data" v-else>
            <i class="fa fa-exclamation-triangle"></i>
            No disponible
          </span>
        </div>
        
        <div class="detail-row">
          <span class="label">Teléfonos:</span>
          <span class="value" v-if="pedido.usuario.telefonos && pedido.usuario.telefonos.length > 1">
            <i class="fa fa-phone"></i>
            {{ pedido.usuario.telefonos[0].v_telefono+' / '+pedido.usuario.telefonos[1].v_telefono}}
          </span>
          <span class="value" v-else-if="pedido.usuario.telefonos && pedido.usuario.telefonos.length === 1">
            <i class="fa fa-phone"></i>
            {{ pedido.usuario.telefonos[0].v_telefono }}
          </span>
          <span class="value no-data" v-else>
            <i class="fa fa-exclamation-triangle"></i>
            No disponible
          </span>
        </div>
      </div>
    </div>

    <!-- Tabla de productos - más compacta -->
    <div class="products-section">
      <h5><i class="fa fa-box"></i> Detalle del Pedido</h5>
      <div class="table-container">
        <table class="products-table">
          <thead>
            <tr>
              <th class="product-name">Producto</th>
              <th class="product-price">Precio</th>
              <th class="product-quantity">Cant.</th>
              <th class="product-total">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detalle, index) in pedido.detalle" :key="index" class="product-row">
              <td class="product-name">
                <div class="product-info">
                  <span class="product-title">{{ detalle.v_nombre_producto }}</span>
                  <span class="product-code" v-if="detalle.producto && detalle.producto.v_codigo">
                    Código: {{ detalle.producto.v_codigo }}
                  </span>
                </div>
              </td>
              <td class="product-price">
                ${{ formatInvoice(detalle.n_precio) }}
              </td>
              <td class="product-quantity">
                <span class="quantity-badge">{{ detalle.n_cantidad }}</span>
              </td>
              <td class="product-total">
                ${{ formatInvoice(detalle.n_precio * detalle.n_cantidad) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="total-row">
              <td colspan="3" class="total-label">
                <strong>Total a pagar</strong>
              </td>
              <td class="total-amount">
                <strong>${{ formatInvoice(pedido.n_total) }}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- Botón de acción - más compacto -->
    <div class="action-section" v-if="pedido.v_status !== 'Enviado'">
      <button class="btn-send-order" v-on:click="enviarPedido(pedido)">
        <i class="fa fa-paper-plane"></i>
        Enviar Pedido
      </button>
    </div>
    
    <!-- Mensaje cuando ya está enviado - más compacto -->
    <div class="action-section" v-else>
      <div class="order-sent-message">
        <i class="fa fa-check-circle"></i>
        <span>Pedido ya enviado</span>
      </div>
    </div>

    <!-- Modal de confirmación -->
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
      formatInvoice(value) {
        return value.toLocaleString('es-ES');
      },
      getStatusClass(status) {
        switch(status) {
          case 'Solicitado':
            return 'status-pending';
          case 'Enviado':
            return 'status-sent';
          case 'Entregado':
            return 'status-delivered';
          case 'Cancelado':
            return 'status-cancelled';
          default:
            return 'status-default';
        }
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
            $('#modalEnviar').modal('hide');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
            boton_enviar.button('reset');
            
            // Actualizar el estado del pedido en el componente padre
            yo.pedido.v_status = "Enviado";
            
            // Emitir evento para actualizar la lista de pedidos
            yo.$emit('actualizar');
            
            // Cerrar todos los modales
            $('.modal').modal('hide');
            
            // Mostrar mensaje de confirmación
            setTimeout(() => {
              yo.$toastr('info', 'El pedido ha sido enviado exitosamente', "Pedido Enviado");
            }, 1000);
          }, errors => {
            yo.$toastr('error', errors.body.mensaje, "Error desconocido");
            boton_enviar.button('reset');
            $('.modal').modal('hide');
          });
      },
    }

  }
</script>

<style scoped>
.order-details-container {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  max-height: 80vh;
  overflow-y: auto;
}

/* Header del pedido - más compacto */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 15px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.order-number {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.order-number i {
  margin-right: 8px;
  font-size: 1.4rem;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 15px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.status-pending {
  background: #ffc107;
  color: #212529;
}

.status-sent {
  background: #17a2b8;
  color: white;
}

.status-delivered {
  background: #28a745;
  color: white;
}

.status-cancelled {
  background: #dc3545;
  color: white;
}

.status-default {
  background: #6c757d;
  color: white;
}

/* Sección de información del cliente - más compacta */
.customer-info-section {
  background: white;
  border-radius: 6px;
  padding: 12px 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.customer-info-section h5 {
  color: #495057;
  margin-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 8px;
  font-size: 1rem;
}

.customer-info-section h5 i {
  margin-right: 8px;
  color: #667eea;
}

.customer-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f1f3f4;
}

.detail-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: #495057;
  min-width: 80px;
  margin-right: 10px;
  font-size: 0.9rem;
}

.value {
  color: #6c757d;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.value i {
  margin-right: 6px;
  color: #667eea;
}

.value.no-data {
  color: #dc3545;
}

.value.no-data i {
  color: #dc3545;
}

/* Sección de productos - más compacta */
.products-section {
  background: white;
  border-radius: 6px;
  padding: 12px 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.products-section h5 {
  color: #495057;
  margin-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 8px;
  font-size: 1rem;
}

.products-section h5 i {
  margin-right: 8px;
  color: #667eea;
}

.table-container {
  overflow-x: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  font-size: 0.85rem;
}

.products-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.products-table th {
  padding: 8px 10px;
  text-align: left;
  font-weight: bold;
  border: none;
  font-size: 0.8rem;
}

.products-table td {
  padding: 8px 10px;
  border-bottom: 1px solid #f1f3f4;
  vertical-align: middle;
}

.product-row:hover {
  background: #f8f9fa;
  transition: background 0.3s ease;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-title {
  font-weight: bold;
  color: #495057;
  margin-bottom: 2px;
  font-size: 0.85rem;
}

.product-code {
  font-size: 0.75rem;
  color: #6c757d;
}

.product-price, .product-total {
  font-weight: bold;
  color: #28a745;
  text-align: right;
  font-size: 0.85rem;
}

.product-quantity {
  text-align: center;
}

.quantity-badge {
  background: #667eea;
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.75rem;
}

.total-row {
  background: #f8f9fa;
  border-top: 2px solid #dee2e6;
}

.total-label {
  text-align: right;
  font-size: 0.9rem;
  color: #495057;
}

.total-amount {
  text-align: right;
  font-size: 1rem;
  color: #28a745;
}

/* Botón de acción - más compacto */
.action-section {
  text-align: center;
  padding: 10px 0;
}

.btn-send-order {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

.btn-send-order:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}

.btn-send-order i {
  margin-right: 6px;
}

/* Mensaje de pedido enviado - más compacto */
.order-sent-message {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

.order-sent-message i {
  margin-right: 6px;
  font-size: 1rem;
}

/* Responsive mejorado */
@media (max-width: 768px) {
  .order-header {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  
  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
  }
  
  .label {
    min-width: auto;
    margin-right: 0;
  }
  
  .products-table {
    font-size: 0.8rem;
  }
  
  .products-table th,
  .products-table td {
    padding: 6px 8px;
  }
  
  .order-details-container {
    padding: 10px;
  }
}
</style>
