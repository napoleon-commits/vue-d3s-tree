import Vue from 'vue'
import Vuex from 'vuex'
import recognizedServiceBranches from '@/static/ServiceBranches'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recognizedServiceBranches,
    checkedServices: recognizedServiceBranches,
    displayDepth: 2,
    maxTreeDepth: null,
    treeAnimationDuration: 10,
    timeOutMultiplier: 10
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
