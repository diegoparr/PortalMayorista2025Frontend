import Vue from "vue";
import Vuex from "vuex";
import User from './modules/user';
import Permissions from './modules/permissions';
import Search from './modules/search';
import ShoppingCart from './modules/shopping-cart';
import * as getters from './getters';
//import * as actions from '../js/shop/actions'
Vue.use(Vuex);

export const store = new Vuex.Store({
  getters,
  modules: { User, Permissions, Search, ShoppingCart}
});
