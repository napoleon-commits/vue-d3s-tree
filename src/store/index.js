import Vue from 'vue'
import Vuex from 'vuex'
import recognizedServiceBranches from '@/static/ServiceBranches';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recognizedServiceBranches,
    checkedServices: recognizedServiceBranches,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
