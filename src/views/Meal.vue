<template>
  <div>
    <v-col class="mt-1" align="center">
      <p class="green--text">{{meal.name}}</p>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left green--text">
              Alimento
            </th>
            <th class="text-center green--text">
              Quantidade(g)
            </th>
            <th class="text-center green--text">
              Carboidratos(g)
            </th>
            <th class="text-center green--text">
              Proteínas(g)
            </th>
            <th class="text-center green--text">
              Gordura(g)
            </th>
            <th class="text-center green--text">
              Calorias
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="food in meal.foods"
              :key="food.name"
          >
            <td>{{ food.name }}</td>
            <td class="text-center">{{ food.grams }}</td>
            <td class="text-center">{{ food.carbohydrate }}</td>
            <td class="text-center">{{ food.protein }}</td>
            <td class="text-center">{{ food.fat }}</td>
            <td class="text-center">{{ food.calories }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn @click="dialogNewFood=true" color="success">
        Adicionar Alimento
      </v-btn>
    </v-col>
    <v-dialog max-width="600" v-model="dialogNewFood">
      <v-card>
        <v-card-title class="text-h5 green">
          Alimento
        </v-card-title>
        <v-form class="pa-8">
          <v-text-field label="Nome" v-model="food.name"/>
          <v-text-field type="number" label="Quantidade(g)" v-model="food.grams"/>
          <v-text-field type="number" label="Carboidratos" v-model="food.carbohydrate"/>
          <v-text-field type="number" label="Proteínas" v-model="food.protein"/>
          <v-text-field type="number" label="Gorduras" v-model="food.fat"/>
          <v-text-field type="number" label="Calorias" v-model="food.calories"/>
          <v-row justify="center" class="mt-6">
            <v-btn class="mr-4 white--text" color="red" style="width: 180px" @click="dialogNewFood=false">Cancelar</v-btn>
            <v-btn class="white--text" color="green" style="width: 180px" @click="addFood">Adicionar</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DietService from "../services/DietService";

export default {
  name: "Meal",
  props: ["meal"],
  methods: {
    addFood(){
      this.food.meal_id = this.meal.id
      DietService.createFood(this.food).then(()=>{
        this.meal.foods.push(this.food)
        this.dialogNewFood = false
      })
    }
  },
  data: () => {
    return {
      food: {},
      dialogNewFood: false,
    }
  }
}
</script>

<style scoped>

</style>