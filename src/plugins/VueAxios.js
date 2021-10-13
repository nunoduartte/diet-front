import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
// import router from "@/router";
// import store from "@/store"
const instance = axios.create({
  baseURL: "http://localhost:8081"
});

// instance.defaults.withCredentials = true
//
// instance.interceptors.request.use(
//   () => {
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
//
// instance.interceptors.response.use(
//   response => {
//     if (response.status === 204) {
//       response.data = null;
//     }
//     return response;
//   },
//   async () => {
//   }
// );

Vue.use(VueAxios, instance)
