

export const cartProducts = state => {
  let carrito = state.ShoppingCart;
  if(state.ShoppingCart.charged === false)
  {
    if(localStorage.getItem('mi_carrito'+state.User.id) === null )
    {
      localStorage.setItem('mi_carrito'+state.User.id,JSON.stringify(state.ShoppingCart));
    }
    else {
      state.ShoppingCart = JSON.parse(localStorage.getItem('mi_carrito'+state.User.id));
    }
    state.ShoppingCart.charged = true;
  }
  return state.ShoppingCart.added.map(({ id_m_productos, quantity, idVariacion, variacion, price, subTotal }) => {
    const product = state.ShoppingCart.added.find(product => product.id_m_productos === id_m_productos && product.idVariacion === idVariacion);
    return {
      ...product,
      quantity,
      idVariacion,
      variacion,
      price,
      subTotal
    }
  })
}

export const itemsQuantity = state => {
  return cartProducts(state).reduce((quantity, item) => {
    return quantity + item.quantity;
  }, 0)
}

export const ProductsQuantity = state => {
  return state.ShoppingCart.added.length;
}

export const subtotal = state => {
  const sum = cartProducts(state).reduce((subtotal, item) => {
    return subtotal + item.price * item.quantity
  }, 0)

  return  sum;
}

/*export const taxes = state => subtotal(state) * 19/100;*/

export const shipping = state => {
  const shippings = cartProducts(state).map(item => item.shipping);
  if (state.ShoppingCart.freeShipping || !shippings.length) {
    return 0
  } else {
    return Math.max(...shippings)
  }
}

export const discount = state => {
  let sum = cartProducts(state).reduce((discount, item) => {
    return discount + (item.descuento * item.quantity )
  }, 0)
  if (sum > 0)
    state.ShoppingCart.totalDiscount = true;
  return sum;
}

export const total = state => {
  const discount = state.ShoppingCart.totalDiscount ? -100 : 0
  return subtotal(state) /*+ taxes(state)*/ + shipping(state) + discount
}


//export const orderOnLimit = state => state.profile.data.limit <= total(state)
