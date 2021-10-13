import Vue from "vue";

export default {
  createFoodRegistry(foodRegistry){
    return Vue.axios.post("/foodRegistry",foodRegistry);
  },
  updateFoodRegistry(foodRegistry){
    return Vue.axios.put("/foodRegistry",foodRegistry);
  },
  getFoodRegistry(userId){
    return Vue.axios.get(`/foodRegistry/${userId}`);
  },
  removeFoodRegistry(userId){
    return Vue.axios.delete(`/foodRegistry/${userId}`)
  }
}