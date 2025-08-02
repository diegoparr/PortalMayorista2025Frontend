const state = {
  index: [],
  store: [],
  show: [],
  update: [],
  destroy: [],
  menu: [],
  valorBusquedaIndex: null,
  valorBusquedaStore: null,
  valorBusquedaShow: null,
  valorBusquedaUpdate: null,
  valorBusquedaDestroy: null,
};
const getters = {
  getIndex: (state) => {
    return state.index;
  },
  getStore: (state) => {
    return state.store;
  },
  getShow: (state) => {
    return state.show;
  },
  getUpdate: (state) => {
    return state.update;
  },
  getDestroy: (state) => {
    return state.destroy;
  },
  getMenu: (state) => {
    return state.menu;
  },
  obtenerPermisoIndex: (state) => {
    let permiso = null;
    for (let i = 0; i < state.index.length; i++) {
      if (state.index[i].name === state.valorBusquedaIndex) {
        permiso = state.index[i];
      }
    }
    return permiso;
  },
  obtenerPermisoStore: (state) => {
    let permiso = null;
    for (let i = 0; i < state.store.length; i++) {
      if (state.store[i].name === state.valorBusquedaStore) {
        permiso = state.store[i];
      }
    }
    return permiso;
  },
  obtenerPermisoShow: (state) => {
    let permiso = null;
    for (let i = 0; i < state.show.length; i++) {
      if (state.show[i].name === state.valorBusquedaShow) {
        permiso = state.show[i];
      }
    }
    return permiso;
  },
  obtenerPermisoUpdate: (state) => {
    let permiso = null;
    for (let i = 0; i < state.update.length; i++) {
      if (state.update[i].name === state.valorBusquedaUpdate) {
        permiso = state.update[i];
      }
    }
    return permiso;
  },
  obtenerPermisoDestroy: (state) => {
    let permiso = null;
    for (let i = 0; i < state.destroy.length; i++) {
      if (state.destroy[i].name === state.valorBusquedaDestroy) {
        permiso = state.destroy[i];
      }
    }
    return permiso;
  }
};
const mutations = {
  setIndex: (state, data) => {
    state.index.push(data);
  },
  setValorBusquedaIndex: (state, data) => {
    state.valorBusquedaIndex = data;
  },
  setValorBusquedaStore: (state, data) => {
    state.valorBusquedaStore = data;
  },
  setValorBusquedaShow: (state, data) => {
    state.valorBusquedaShow = data;
  },
  setValorBusquedaUpdate: (state, data) => {
    state.valorBusquedaUpdate = data;
  },
  setValorBusquedaDestroy: (state, data) => {
    state.valorBusquedaDestroy = data;
  },
  setStore: (state, data) => {
    state.store.push(data);
  },
  setShow: (state, data) => {
    state.show.push(data);
  },
  setUpdate: (state, data) => {
    state.update.push(data);
  },
  setDestroy: (state, data) => {
    state.destroy.push(data);
  },
  setMenu: (state, data) => {
    state.menu.push(data);
  },
  setIndexReiniciar: (state, data) => {
    console.log("method");
    state.index = [];
  },
  setStoreReiniciar: (state, data) => {
    state.store = [];
  },
  setShowReiniciar: (state, data) => {
    state.show = [];
  },
  setUpdateReiniciar: (state, data) => {
    state.update = [];
  },
  setDestroyReiniciar: (state, data) => {
    state.destroy = [];
  },
  setMenuReiniciar: (state, data) => {
    state.menu = [];
  },
};
export default {state, getters, mutations}
