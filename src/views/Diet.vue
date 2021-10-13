<template>
  <div>
    <v-col align="center">
      <v-col cols="8">
        <div class="d-flex">
          <h1 class="text-left" style="color:gray; font-family: cursive;">Minhas Refeições</h1>
          <v-btn class="mx-2 " style="margin-top: 5px;" fab small dark color="green" @click="dialogNewMeal=true">
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </div>
        <div :key="meal.id" v-for="meal in this.loggedUser.userData.diet.meals">
          <Meal :meal="meal" />
        </div>
      </v-col>
    </v-col>
    <v-row justify="center">
      <v-dialog
          v-model="dialogNewMeal"
          persistent
          max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="gray--text text-h5">Nova Refeição</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                  <v-text-field
                      label="Nome*"
                      v-model="meal.name"
                      required
                  ></v-text-field>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red darken-1"
                text
                @click="dialogNewMeal = false"
            >
              Cancelar
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="addMeal"
            >
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import Meal from "./Meal";
import {mapState} from "vuex";
import DietService from "../services/DietService";

export default {
  name: "Diet",
  components: {Meal},
  computed: {...mapState(["loggedUser"])},
  methods: {
    addMeal(){
      this.meal.diet_id = this.loggedUser.userData.diet.id
      this.meal.foods = []
      DietService.createMeal(this.meal).then((res)=>{
        this.loggedUser.userData.diet.meals.push(res.data)
        this.dialogNewMeal = false
      })
    }
  },
  data:() => {
    return {
      tab:2,
      meal:{},
      menuItens: ['Logout'],
      dialogNewMeal: false,
    }
  }
}
</script>

<style scoped>

</style>