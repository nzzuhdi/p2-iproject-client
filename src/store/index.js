import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../apis/axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false,
    addressAdd: '',
    latlng: []
  },
  mutations: {
    SET_ISLOGIN(state, payload) {
      state.isLogin = payload
    },
    SET_ADDRESS(state, payload) {
      state.addressAdd = payload
    },
    SET_LATLNG(state, payload) {
      state.latlng = payload
    }
  },
  actions: {
    axiosLogin(context, payload) {
      return axios({
        method: "POST",
        url: `login`,
        data: payload
      })
    },
    axiosFetchEvent(context){
      console.log(context);
      return axios({
        method: "GET",
        url: `events`,
      })
    },
    axiosPostEvents(context, payload){
      console.log(context);
      return axios({
        method: "GET",
        url: `events`,
        headers:{

        }
      })
    }
  },
  modules: {
  }
})
