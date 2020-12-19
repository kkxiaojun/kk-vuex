import Vue from 'vue'
import Vuex from './myVuex'

Vue.use(Vuex)

const vuexObj = new Vuex.Store({
  state: {
    num: 2
  },
  getters: {
    getNum(state) {
      return state.num + 1
    }
  },
  mutations: {
    addNum(state, arg){
      state.num += arg
    }
  },
  actions: {
    asyncAddNum({ commit }, arg) {
      setTimeout(() => {
        commit('addNum', arg)
      }, 500)
    }
  },
  modules: {}
})

export default vuexObj