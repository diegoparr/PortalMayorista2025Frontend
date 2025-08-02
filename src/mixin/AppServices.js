import Vue from 'vue';
import Helpers from '../helpers';

export default {
  methods: {
    mapErrorsResponses(vue_instance, errors) {
      console.log(vue_instance, errors);
      $('#submitButton').button('reset');
      $('#submitButtonCategoria').button('reset');
      $('#submitButtonDetalle').button('reset');
      $('#submitButtonCaracteristicas').button('reset');
      $('#modal').modal('hide');
      if (errors.status === 422) {
        for (let err in errors.body.errors) {
          errors.body.errors[err].forEach(function (value) {
            vue_instance.$toastr('error', value, Helpers.ufirst(err));
          });
        }
      } else if (errors.status === 401) {
        vue_instance.$toastr('error', "Las credenciales ingresadas no son correctas verifica y vuelve a intentarlo", "Credenciales Invalidas");
      } else {
        let message = errors.body.mensaje;
        if (!message)
          message = errors.body.message;
        vue_instance.$toastr('error', message, "Error desconocido");
      }
    },
    setUserData(vue_instance, response, login = false, token = null) {
      let usuario = response.body.usuario;
      usuario.expiracionToken = response.body.expira;
      usuario.rol = response.body.rol;
      usuario.estaAutenticadoFull = true;
      if (login) {
        vue_instance.setUsuarioTokenStore(response.body.token);
        vue_instance.setUsuarioIdStore(usuario.id);
        vue_instance.setUsuarioExpiracionTokenStore(response.body.expira);
      }
      if (token)
        usuario.token = token;
      else
        usuario.token = response.body.token;
        console.log("user_user",usuario );
      vue_instance.setUsuario(usuario);
    },
    setUserDataperfil(vue_instance, response,data_actual) {
      let usuario = response.body.usuario;
      let user = data_actual;
      usuario.expiracionToken = user.expiracionToken;
      usuario.rol = user.rol;
      usuario.estaAutenticadoFull = true;
      usuario.token = user.token;
      usuario.id_m_provincias_fk = parseInt(usuario.id_m_provincias_fk);
      usuario.id_m_ciudades_fk= parseInt(usuario.id_m_ciudades_fk);
      usuario.id_m_paises_fk= parseInt(usuario.id_m_paises_fk);
      console.log("usuario_Actualziado",usuario);
      vue_instance.setUsuario(usuario);
    },
    setPermissions(vue_instance, response) {
      vue_instance.setIndexReiniciar();
      vue_instance.setStoreReiniciar();
      vue_instance.setShowReiniciar();
      vue_instance.setUpdateReiniciar();
      vue_instance.setDestroyReiniciar();
      vue_instance.setMenuReiniciar();
      response.body.permisos.forEach(permiso => {
        let split = permiso.name.split(".");
        switch (split[0]) {
          case 'index':
            vue_instance.setIndex(permiso);
            break;
          case 'store':
            vue_instance.setStore(permiso);
            break;
          case 'show':
            vue_instance.setShow(permiso);
            break;
          case 'update':
            vue_instance.setUpdate(permiso);
            break;
          case 'destroy':
            vue_instance.setDestroy(permiso);
            break;
          case 'menu':
            vue_instance.setMenu(permiso);
            break;
        }
      });
    },
    setCleanPermissions(vue_instance) {
      vue_instance.setIndexReiniciar();
      vue_instance.setStoreReiniciar();
      vue_instance.setShowReiniciar();
      vue_instance.setUpdateReiniciar();
      vue_instance.setDestroyReiniciar();
      vue_instance.setMenuReiniciar();
    },
    postMethodWithoutBearer(endpoint, form) {
      return Vue.http.post(endpoint, form, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    },
    postMethodWithBearer(endpoint, form, token) {
      return Vue.http.post(endpoint, form, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    },
    putMethodWithBearer(endpoint, form, token) {
      return Vue.http.put(endpoint, form, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    },
    destroyMethodWithBearer(endpoint, token) {
      return Vue.http.delete(endpoint, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    },
    getMethodWithoutBearer(endpoint, type = 'paginate', page = 1, with_param = null, where = null, order = null, paginate = null, id=null) {
      if (type !== 'paginate')
        endpoint += '?tipo=' + type;
      else
        endpoint += '?tipo=' + type;

      endpoint += '&page=' + page;
      if (with_param)
        endpoint += "&width=[" + with_param + "]";
      if (where)
        endpoint += "&where=[" + where + "]";
      if (order)
        endpoint += "&order=[" + order + "]";
      if (paginate)
        endpoint += "&paginate=" + paginate;
      if (id)
        endpoint += "&id=" + id;
      return Vue.http.get(endpoint);
    },
    getMethodsWithBearer(endpoint, token, type = 'paginate', page = 1, with_param = null, where = null, order = null, paginate = null) {
      if (type !== 'paginate')
        endpoint += '?tipo=' + type;
      else
        endpoint += '?tipo=' + type;

      endpoint += '&page=' + page;
      if (with_param)
        endpoint += "&width=[" + with_param + "]";
      if (where)
        endpoint += "&where=[" + where + "]";
      if (order)
        endpoint += "&order=[" + order + "]";
      if (paginate)
        endpoint += "&paginate=" + paginate;
      return Vue.http.get(endpoint, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    },
    confirmDestroySweet(vue_instance) {
      return vue_instance.$swal({
        title: 'Confirmar acción',
        text: "¿Estás seguro de que deseas eliminar el registro?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminalo!',
        cancelButtonText: 'No, cancelalo!',
        confirmButtonClass: 'btn btn-success btn-flat btn-sweet',
        cancelButtonClass: 'btn btn-danger btn-flat btn-sweet',
        buttonsStyling: false
      });
    },

    buscadorConToken(endpoint, token, busqueda, tipo, pagina = 1, width = null, where = null, order = null) {
      endpoint += "?text=" + busqueda;
      if (tipo !== 'paginate')
        endpoint += '&tipo=' + tipo;
      else
        endpoint += '&tipo=' + tipo;
      endpoint += '&page=' + pagina;
      if (width)
        endpoint += "&width=[" + width + "]";
      if (where)
        endpoint += "&where=" + where;
      if (order)
        endpoint += "&order=[" + order + "]";

      return Vue.http.get(endpoint, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    },
    buscardorSinToken(endpoint, busqueda, tipo, pagina = 1, width = null, where = null, order = null, otro = null) {
      endpoint += "?text=" + busqueda;
      if (tipo !== 'paginate')
        endpoint += '&tipo=' + tipo;
      else
        endpoint += '&tipo=' + tipo;
      endpoint += '&page=' + pagina;
      if (width)
        endpoint += "&width=[" + width + "]";
      if (where)
        endpoint += "&where=" + where;
      if (order)
        endpoint += "&order=" + order;
      if (otro)
        endpoint += "&otro=" + otro;
      // return Vue.http.get(endpoint);
      return Vue.http.get(endpoint);
    }
  }
}
