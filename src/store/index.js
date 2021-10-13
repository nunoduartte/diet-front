import Vue from 'vue'
import Vuex from 'vuex'
import LoginService from "@/services/LoginService";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedUser: null,
  },
  mutations: {
    setUsuarioLogado(state, data) {
      if (data === null) {
        state.loggedUser = null;
      } else {
        state.loggedUser = data;
      }
    },

  },
  actions: {
    login({commit}, credenciais) {
      return new Promise((resolve, reject) => {
        LoginService.signin(credenciais.username, credenciais.password)
          .then(response => {
            let data = response.data;
            commit('setUsuarioLogado', data);
            resolve(response)
          })
          .catch(error => {
            reject(error)
          });
      })
    },

  },
  modules: {
  }
})
