import Vue from 'vue'
import Vuex from 'vuex'

import aModule from "./modules/aModule";
import bModule from "./modules/bModule";

Vue.use(Vuex);

const stores = {
  aModule,
  bModule,
}

export default new Vuex.Store({
  modules: {
    ...stores,
  },
});