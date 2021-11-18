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
    axiosRegister(context, payload) {
      return axios({
        method: "POST",
        url: `register`,
        data: payload
      })
    },
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
      console.log(payload, 'inidatapay');
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("address", payload.address);
      formData.append("category", payload.category);
      formData.append("imageUrl", payload.imageUrl);
      formData.append("lattitude", payload.lattitude);
      formData.append("longitude", payload.longitude);
      formData.append("date", payload.date);
      formData.append("time", payload.time);
      return axios({
        method: "POST",
        url: `events`,
        headers:{
          access_token : localStorage.access_token
        },
        data: formData
      })
    },
    axiosPostPlayers(context, payload){
      const EventId = payload
      
      return axios({
        method: "POST",
        url: `events/players/${EventId}`,
        headers:{
          access_token : localStorage.access_token
        }
      })
    }
  },
  modules: {
  }
})
