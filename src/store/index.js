import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../apis/axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false,
    addressAdd: ''
  },
  mutations: {
    SET_ISLOGIN(state, payload) {
      state.isLogin = payload
    },
    SET_ADDRESS(state, payload) {
      state.addressAdd = payload
    }
  },
  actions: {
    axiosLogin(context, payload) {
      return axios({
        method: "POST",
        url: `cust/login`,
        data: payload
      })
    }
  },
  modules: {
  }
})
