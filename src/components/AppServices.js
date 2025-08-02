import Vue from 'vue';
import Helpers from '../helpers';

export default {
  mapErrorsResponses(vue_instance, errors) {
    console.log(vue_instance, errors);
    $('#submitButton').button('reset');
    $('#submitButtonCategoria').button('reset');
    $('#submitButtonDetalle').button('reset');
    $('#submitButtonCaracteristicas').button('reset');
    // $('#modal').modal('hide'); // Comentado para evitar que se cierre el modal con errores
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
  setUserDataperfil(vue_instance, response) {
    let usuario = response.body.usuario;
    console.log("usuario_Actualziado",usuario);
  },
  setCleanPermissions(vue_instance) {
    console.log("instanciasw22");
    vue_instance.setIndexReiniciar();
    vue_instance.setStoreReiniciar();
    vue_instance.setShowReiniciar();
    vue_instance.setUpdateReiniciar();
    vue_instance.setDestroyReiniciar();
    vue_instance.setMenuReiniciar();
  },
  postMethodWithoutBearer(endpoint, form) {
    return Vue.http.post(endpoint, form);
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
  getMethodWithoutBearer(endpoint, type = 'paginate', page = 1, with_param = null, where = null, otro = null) {
    if (type !== 'paginate')
      endpoint += '?tipo=' + type;
    else
      endpoint += '?tipo=' + type;

    endpoint += '&page=' + page;
    if (with_param)
      endpoint += "&width=[" + with_param + "]";
    if (where)
      endpoint += "&where=[" + where + "]";
    if (otro)
      endpoint += "&otro=" + otro;
    return Vue.http.get(endpoint);
  },
  getMethodsWithBearer(endpoint, token, type = 'paginate', page = 1, with_param = null, where = null, order = null) {
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
  }
}
