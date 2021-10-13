import Vue from "vue";

export default {
  createFood(food) {
    return Vue.axios.post("/diet/food", food);
  },
  updateFood(food) {
    return Vue.axios.put("/diet/food", food);
  },
  deleteFood(foodId){
    return Vue.axios.delete(`/diet/food/${foodId}`)
  }
}