const state = {
  loadNumber: 0
};

const getters = {
  loadAModuleNumber: state => state.loadNumber
}

const mutations = {
  incrementLoadNumber(state) {
    state.loadNumber++;
  }
};

const actions = {
  loadAModule({ commit }) {
    // assume this is an async call
    // after the async operation, we commit the mutation
    commit('incrementLoadNumber');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
