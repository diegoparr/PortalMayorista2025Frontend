import User from './user';

const state = {
  added: [],
  productDiscount: false,
  totalDiscount: false,
  freeShipping: false,
  charged: false
}

const getters = {}

const mutations = {
  setEmptyCart: (state) => {
    state.added = [];
    state.productDiscount = false;
    state.totalDiscount = false;
    state.freeShipping = false;
    state.charged = false;
    console.log("vaciando el carro");
    localStorage.setItem('mi_carrito'+User.state.id, JSON.stringify(state));
  },
  setCarrito : (state) => {

  },
  addToCart(state, producto){
    const record = state.added.find(product => product.id_m_productos === producto.id_m_productos && producto.idVariacion === product.idVariacion)

    console.log('adentro', producto);
    console.log('record', record);

    let precio = 0;
    let descuento = 0;
    let precio_ante = 0;
    let idVariacion = 0;
    console.log('producto',producto);
    if (producto.b_descuento)
    {
      precio = parseInt(producto.n_precio_descuento) + parseInt(producto.n_precio_descuento * producto.iva.n_porcentaje);
      precio_ante = parseInt(producto.n_precio) + parseInt(producto.n_precio * producto.iva.n_porcentaje);
      descuento = parseInt(producto.n_precio_descuento) - parseInt(producto.n_precio);
    }
    else
    {
      precio = parseInt(producto.n_precio) + parseInt(producto.n_precio * producto.iva.n_porcentaje);
      precio_ante = parseInt(producto.n_precio) + parseInt(producto.n_precio * producto.iva.n_porcentaje);
      descuento = 0;
    }
    if (!record) {
      state.added.push({
        id_m_productos: producto.id_m_productos,
        name: producto.v_nombre,
        foto: producto.v_portada,
        price_ant: precio_ante,
        price: precio,
        descuento: descuento,
        shipping: 0,
        quantity: 1,
        stock: producto.n_existencia,
        subtotal: precio ,
        iva: { n_porcentaje: producto.iva.n_porcentaje},
        tienda: { id_m_tiendas: producto.tienda.id_m_tiendas, nombre: producto.tienda.v_nombre},
        idVariacion : producto.idVariacion,
        variacion: producto.variacion
      })
    }
    else {
      console.log('encontrado', record);
      if(producto.quantity === undefined){
        record.quantity++;
      }
      else
      {
        record.quantity =parseInt(producto.quantity);
      }
      record.subtotal = record.price * record.quantity;
    }
    console.log("usuario = ", User.state);
    localStorage.setItem('mi_carrito'+User.state.id, JSON.stringify(state));
    return 'hola';
  },


  removeFromCart(state, item) {
    const index = state.added.findIndex(added => added.id_m_productos === item.id_m_productos)
    state.added.splice(index, 1);
    localStorage.setItem('mi_carrito'+User.state.id, JSON.stringify(state));
  },

  //Manejo de cupones y limites de compra no borrar
  /*TOGGLE_COUPON (state, coupon) {
    const coupons = {
      '1': 'productDiscount',
      '2': 'totalDiscount',
      '3': 'freeShipping'
    }

    if (coupons[coupon.id]) {
      state[coupons[coupon.id]] = !state[coupons[coupon.id]]
    }*/
}

export default {
  state,
  getters,
  mutations
}
