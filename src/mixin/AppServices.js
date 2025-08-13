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
      console.log('🔍 SETPERMISSIONS - Iniciando procesamiento de permisos');
      console.log('🔍 Respuesta completa:', response);
      console.log('🔍 Permisos recibidos:', response.body.permisos);
      
      vue_instance.setIndexReiniciar();
      vue_instance.setStoreReiniciar();
      vue_instance.setShowReiniciar();
      vue_instance.setUpdateReiniciar();
      vue_instance.setDestroyReiniciar();
      vue_instance.setMenuReiniciar();
      
      // Procesar permisos de la API
      response.body.permisos.forEach(permiso => {
        console.log('🔍 Procesando permiso:', permiso.name);
        let split = permiso.name.split(".");
        console.log('🔍 Split del permiso:', split);
        
        switch (split[0]) {
          case 'index':
            console.log('🔍 Agregando permiso INDEX:', permiso);
            vue_instance.setIndex(permiso);
            break;
          case 'store':
            console.log('🔍 Agregando permiso STORE:', permiso);
            vue_instance.setStore(permiso);
            break;
          case 'show':
            console.log('🔍 Agregando permiso SHOW:', permiso);
            vue_instance.setShow(permiso);
            break;
          case 'update':
            console.log('🔍 Agregando permiso UPDATE:', permiso);
            vue_instance.setUpdate(permiso);
            break;
          case 'destroy':
            console.log('🔍 Agregando permiso DESTROY:', permiso);
            vue_instance.setDestroy(permiso);
            break;
          case 'menu':
            console.log('🔍 Procesando permiso MENU:', permiso);
            // NO agregar aquí, se procesará después para evitar duplicados
            break;
        }
      });
      
      // Generar elementos de menú basados en permisos si no hay permisos de menú
      const permisosMenu = response.body.permisos.filter(p => p.name.startsWith('menu.'));
      console.log('🔍 Permisos de menú encontrados:', permisosMenu);
      
      if (permisosMenu.length === 0) {
        console.log('🔍 No hay permisos de menú, generando automáticamente...');
        this.generateMenuFromPermissions(vue_instance, response.body.permisos);
      } else {
        console.log('🔍 Hay permisos de menú, procesándolos una sola vez...');
        // Procesar permisos de menú solo una vez para evitar duplicados
        permisosMenu.forEach(permiso => {
          const menuCompleto = this.completarPermisoMenu(permiso);
          console.log('🔍 Agregando menú completado:', menuCompleto);
          vue_instance.setMenu(menuCompleto);
        });
        console.log('🔍 NO se generan menús automáticos porque ya hay permisos de menú válidos');
      }
      
      // Log final del estado del menú
      console.log('🔍 Estado final del menú en el store:', vue_instance.getMenu);
      console.log('🔍 SETPERMISSIONS - Finalizado');
    },
    
    // Método para generar menú basado en permisos existentes
    generateMenuFromPermissions(vue_instance, permisos) {
      const menuItems = [];
      
      // Menú de Pedidos
      if (permisos.some(p => p.name.includes('pedidos'))) {
        menuItems.push({
          name: 'menu.pedidos.rol_usuario',
          title: 'Mis Pedidos',
          route_name: 'pedidos',
          icon: 'fa fa-shopping-bag'
        });
      }
      
      // Menú de Tiendas
      if (permisos.some(p => p.name.includes('tiendas'))) {
        menuItems.push({
          name: 'menu.tiendas.rol_usuario',
          title: 'Tiendas',
          route_name: 'shops',
          icon: 'fa fa-store'
        });
      }
      
      // Menú de Chats
      if (permisos.some(p => p.name.includes('chats'))) {
        menuItems.push({
          name: 'menu.chats.rol_usuario',
          title: 'Chats',
          route_name: 'chats',
          icon: 'fa fa-comments'
        });
      }
      
      // Menú de Productos
      if (permisos.some(p => p.name.includes('producto'))) {
        menuItems.push({
          name: 'menu.productos.rol_usuario',
          title: 'Productos',
          route_name: 'products',
          icon: 'fa fa-cube'
        });
      }
      
      // Menú de Posts
      if (permisos.some(p => p.name.includes('post'))) {
        menuItems.push({
          name: 'menu.posts.rol_usuario',
          title: 'Mis Posts',
          route_name: 'posts',
          icon: 'fa fa-file-text'
        });
      }
      
      // Agregar elementos de menú al store
      menuItems.forEach(item => {
        vue_instance.setMenu(item);
      });
    },
    
    // Método para completar permisos de menú vacíos
    completarPermisoMenu(permiso) {
      // Si ya tiene título y ruta, devolverlo tal como está
      if (permiso.title && permiso.route_name) {
        return permiso;
      }
      
      // Completar según el tipo de permiso
      const menuCompleto = { ...permiso };
      
      if (permiso.name.includes('pedidos')) {
        menuCompleto.title = 'Mis Pedidos';
        menuCompleto.route_name = 'pedidos';
        menuCompleto.icon = 'fa fa-shopping-bag';
      } else if (permiso.name.includes('tiendas')) {
        menuCompleto.title = 'Tiendas';
        menuCompleto.route_name = 'shops';
        menuCompleto.icon = 'fa fa-store';
      } else if (permiso.name.includes('chats')) {
        menuCompleto.title = 'Chats';
        menuCompleto.route_name = 'chats';
        menuCompleto.icon = 'fa fa-comments';
      } else if (permiso.name.includes('producto')) {
        menuCompleto.title = 'Productos';
        menuCompleto.route_name = 'products';
        menuCompleto.icon = 'fa fa-cube';
      } else if (permiso.name.includes('post')) {
        menuCompleto.title = 'Mis Posts';
        menuCompleto.route_name = 'posts';
        menuCompleto.icon = 'fa fa-file-text';
      } else {
        // Para otros tipos, generar título genérico
        const tipo = permiso.name.split('.')[1];
        menuCompleto.title = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        menuCompleto.route_name = tipo;
        menuCompleto.icon = 'fa fa-cog';
      }
      
      return menuCompleto;
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
