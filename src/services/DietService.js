import Vue from "vue";

export default {
  createFood(food) {
    return Vue.axios.post("/diet/food", food);
  }
}