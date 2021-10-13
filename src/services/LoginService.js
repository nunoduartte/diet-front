import Vue from "vue";

export default {
  signup(username, password, email) {
    return Vue.axios.post("/user", {username, email, password});
  },
  signin(username, password) {
    return Vue.axios.post("/user/login", {username, password});
  }
}