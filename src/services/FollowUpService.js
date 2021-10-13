import Vue from "vue";

export default {
  createFoodRegistry(foodRegistry){
    return Vue.axios.post("/foodRegistry",foodRegistry);
  },
  getFoodRegistry(userId){
    return Vue.axios.get(`/foodRegistry/${userId}`);
  }
}