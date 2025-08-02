import Vue from "vue";
import VueRouter from "vue-router";
import Index from './components/index/index.vue';
import Access from './components/access/index.vue';
import Register from './components/register/index.vue';
import NewPassword from './components/newPassword/newPassword.vue';
import Explore from './components/vistas/explorar/index';
import Dashboard from './components/dashboard/index.vue';
import Roles from './components/roles/index.vue';
import Permissions from './components/permissions/index.vue';
import Shops from './components/shops/index.vue';
import Users from './components/users/index.vue';
import Catalogue from './components/catalogue/index.vue';
import Products from './components/products/index.vue';
import Categories from './components/categories/index.vue';
import RelacionesCategorias from './components/categoriesRelation/index.vue';
import Characteristics from './components/characteristics/index.vue';
import Countries from './components/countries/index.vue';
import Provinces from './components/provinces/index.vue';
import Cities from './components/cities/index.vue';
import Orders from './components/orders/index.vue';
import Publicidades from './components/publicity/index.vue';
import OrdersShops from './components/ordersShops/index.vue';
import noAdmin from './components/vistas/tienda/index';
import VistaProducto from './components/vistas/producto/index';
import PanelUsuario from './components/vistas/usuario/index';
import productosCategorias from './components/vistas/categorias/index'
import vendedores from './components/vendedores/index.vue'
import Meta from 'vue-meta'

Vue.use(VueRouter);
Vue.use(Meta, {
  keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
});
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    //Enlace para usar el buscador
    /*
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        showPanel: false,
        noAdmin: false,
        vistaIndex: true,
        protectRoute: false,
        pagesTitle: "Bienvenido a LaHipertienda",
        bodyClass: "body-bg-image-home",
        showPublicity: false,
      }
    },*/

    {
      path: '/',
      name: 'index',
      component: Explore,
      meta: {
        showPanel: false,
        noAdmin: true,
        vistaIndex: false,
        protectRoute: false,
        // bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: true,
        sizeContainer: 'col-xs-10'
      }
    },
    {
      path: '/acceso',
      name: 'access',
      component: Access,
      meta: {
        showPanel: false,
        noAdmin: false,
        vistaIndex: true,
        protectRoute: false,
        pagesTitle: "Ingresa a LaHipertienda",
        bodyClass: "body-bg-image-home",
        showPublicity: false
      }
    },
    {
      path: '/registro',
      name: 'register',
      component: Register,
      meta: {
        showPanel: false,
        noAdmin: false,
        vistaIndex: true,
        protectRoute: false,
        pagesTitle: "Ingresa a LaHipertienda",
        bodyClass: "body-bg-image-home",
        showPublicity: false
      }
    },
    {
      path: '/usuario/panel',
      name: 'panelUsuario',
      component: PanelUsuario,
      meta: {
        showPanel: false,
        noAdmin: false,
        vistaIndex: true,
        protectRoute: true,
        pagesTitle: "Panel Usuario",
        showPublicity: false
      }
    },
    {
      path: '/password/reset/:id',
      name: 'newPassword',
      component: NewPassword,
      meta: {
        showPanel: false,
        noAdmin: false,
        vistaIndex: true,
        protectRoute: false,
        pagesTitle: "Ingresa a LaHipertienda",
        // bodyClass: "body-bg-image-home",
        showPublicity: false
      }
    },
    {
      path: '/buscar/:busqueda?',
      name: 'explore',
      component: Explore,
      meta: {
        showPanel: false,
        noAdmin: true,
        vistaIndex: false,
        protectRoute: false,
        pagesTitle: "LaHipertienda - ¡De Todo para Todos!",
        // bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: true,
        sizeContainer: 'col-xs-10'
      }
    },
    {
      path: '/categorias/:id',
      name: 'productosCategorias',
      component: productosCategorias,
      meta: {
        showPanel: false,
        noAdmin: true,
        vistaIndex: false,
        protectRoute: false,
        pagesTitle: "LaHipertienda - ¡De Todo para Todos!",
      }
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "LaHipertienda - Panel Administrativo",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/roles',
      name: 'roles',
      component: Roles,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Roles",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/vendedores',
      name: 'vendedores',
      component: vendedores,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - vendedores",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/permisos',
      name: 'permisos',
      component: Permissions,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Permisos",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/tiendas',
      name: 'tiendas',
      component: Shops,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Tiendas",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/usuarios',
      name: 'usuarios',
      component: Users,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Usuarios",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/catalogos',
      name: 'catalogos',
      component: Catalogue,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Catalogo",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/productos',
      name: 'productos',
      component: Products,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Productos",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/publicidades',
      name: 'publicidades',
      component: Publicidades,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Publicidades",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/categorias',
      name: 'categorias',
      component: Categories,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Categorias",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/relaciones-categorias',
      name: 'relaciones-categorias',
      component: RelacionesCategorias,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Relacion Categorias",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/caracteristicas',
      name: 'caracteristicas',
      component: Characteristics,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Caracteristicas",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/pedidos',
      name: 'pedidos',
      component: Orders,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "LaHipertienda - Pedidos",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/pedido-tiendas',
      name: 'pedido-tiendas',
      component: OrdersShops,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "LaHipertienda - Pedidos",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/paises',
      name: 'paises',
      component: Countries,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Paises",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/provincias',
      name: 'provincias',
      component: Provinces,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Provincias",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/admin/ciudades',
      name: 'ciudades',
      component: Cities,
      meta: {
        showPanel: true,
        noAdmin: false,
        vistaIndex: false,
        protectRoute: true,
        pagesTitle: "Panel Administrativo - Ciudades",
        bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-12'
      }
    },
    {
      path: '/:slug',
      name: 'show_shop',
      component: noAdmin,
      meta: {
        showPanel: false,
        noAdmin: true,
        vistaIndex: false,
        protectRoute: false,
        pagesTitle: "LaHipertienda - ¡De Todo para Todos!",
        // bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: false,
        sizeContainer: 'col-xs-10'
      }
    },
    {
      path: '/:slug/:id',
      name: 'show_product',
      component: VistaProducto,
      meta: {
        showPanel: false,
        noAdmin: true,
        vistaIndex: false,
        protectRoute: false,
        pagesTitle: "LaHipertienda - ¡De Todo para Todos!",
        // bodyClass: "sidebar-mini skin-black-light fixed sidebar-collapse",
        showPublicity: true,
        sizeContainer: 'col-xs-10'
      }
    },
  ]
});
export default router;
