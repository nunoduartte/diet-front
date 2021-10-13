<template>
  <div>
    <v-col class="mt-1" align="center">
      <h1 style="color:black; font-family: cursive;">Refeições</h1>
      <div :key="meal.id" v-for="meal in this.loggedUser.userData.diet.meals">
        <Meal :meal="meal" />
      </div>
    </v-col>
  </div>
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