import Vue from "vue";

export default {
  createFood(food) {
    return Vue.axios.post("/diet/food", food);
  },
  deleteFood(foodId){
    return Vue.axios.delete(`/diet/food/${foodId}`)
  }
}