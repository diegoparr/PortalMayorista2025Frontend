import AppServices from '../components/AppServices';

function getAppServices() {
  return AppServices;
}

export const getProducto = (producto) => {
  let token = this.getUsuario.token;
  getAppServices().getMethodsWithBearer("api/ecommerce/productos", token,  'paginate', page, "'categoria','categoriaPrincipal','caracteristicas','imagenes'")
    .then(response => {
      this.pagination = response.body;
      this.dataProducts = true;
      this.ifProducts = (this.pagination.data.length > 0)
    }, errors => {
      console.log(errors);
    });
}
