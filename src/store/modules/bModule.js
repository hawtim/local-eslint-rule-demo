const state = {
  loadNumber: 0
};

const getters = {
  loadNumber: state => state.loadNumber
}

const mutations = {
  incrementLoadNumber(state) {
    state.loadNumber++;
  }
};

const actions = {
  loadBModule({ commit }) {
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
