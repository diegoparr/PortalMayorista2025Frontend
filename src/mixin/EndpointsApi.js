export default {
  methods: {
    urlsApi() {
      return {
        endpointProductosRegistrar: 'api/ecommerce/productos',
        endpointProductosEditar: 'api/ecommerce/productos/',
        endpointsCategorias: {
          index: "api/ecommerce/categorias",
          categoriasPadre: 'api/ecommerce/categoriasPadre',
        },
        endpointsCaracteristicas: {
          index: "api/ecommerce/caracteristicas"
        },
        endpointsProductos: {
          actualizar: "api/ecommerce/productos/",
        },
        endpointsManejoImagenes: {
          actualizar: "api/avanzamas/actualizar"
        },
        endpointsPost: {
          index: 'api/ecommerce/post',
          crear: 'api/ecommerce/post',
        },
        endpointsPublicos: {
          informacionProducto: "api/producto/",
          post: {
            index: 'api/post'
          },
          paises: 'api/paises',
          provincias: 'api/provincias/',
          ciudades: 'api/ciudades/',
        },
        endpointsBusqueda: {
          productos: {
            noAutenticado: "api/busqueda/producto",
            autenticado: "api/avanzamas/busqueda/producto"
          }
        },
        endpointsIndex: {
          productos: {
            noAutenticado: "api/index/producto",
            autenticado: "api/avanzamas/index/producto"
          }
        },
        endpointsPosts: {
          index: 'api/ecommerce/post'
        },
        endpointsRedesSociales: {
          verificar: 'api/redesociales/verificar',
          registrar: 'api/redesociales/registrar_redesociales'
        },
        endpointRegistro: 'api/registro',
        endpointAcceso: 'api/autenticar',
        endpointMailPassword: 'api/password/email',
        endpointResetPassword: 'api/password/reset',

        endpointsTiendas: {
            noAutenticado: "api/tiendas-recomendadas",
            autenticado: "api/ecommerce/tiendas"
        },

        endpointsBuscarTienda: {
          autenticado: 'api/ecommerce/tienda/',
          noAutenticado: 'api/tienda/'
        },
        endpointsBuscarProducto: {
          autenticado: 'api/ecommerce/producto/',
          noAutenticado: 'api/producto/'
        },
        endpointsRastreo: {
          cerrar: 'api/avanzamas/rastreo/'
        },
        endpointActualizarTokenAcceso: 'api/avanzamas/token_acceso',
        endpointsSeguidor: {
          seguir: 'api/avanzamas/seguir'
        },
        endpointsPedidos: {
          guardar: 'api/ecommerce/pedidos'
        },
        endpointsPublicidad: {
          index: 'api/publicidad'
        }
      }
    }
  }
}
