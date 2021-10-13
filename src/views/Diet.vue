<template>
  <v-col align="center">
    <v-col cols="8">
      <h1 style="color:green; font-family: cursive;">Minhas Refeições</h1>
      <div :key="meal.id" v-for="meal in this.loggedUser.userData.diet.meals">
        <Meal :meal="meal" />
      </div>
    </v-col>
  </v-col>
</template>

<script>
import Meal from "./Meal";
import {mapState} from "vuex";

export default {
  name: "Diet",
  components: {Meal},
  computed: {...mapState(["loggedUser"])},
  created() {
  },
  methods: {
  },
  data:() => {
    return {
      tab:2,
      menuItens: ['Logout'],
    }
  }
}
</script>

<style scoped>

</style>