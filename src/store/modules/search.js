const state = {
  search: null,
};
const getters = {
  getSearch: (state) => {
    return state.search;
  }
};
const mutations = {
  setSearch: (state, data) => {
    state.search = data;
  }
};
export default {state, getters, mutations}
