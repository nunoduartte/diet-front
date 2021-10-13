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
              Calorias(Kcal)
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
          <v-autocomplete label="Descrição"
                          v-model="selectedFood"
                          :items="foods"
                          :loading="loading"
                          item-text="descricao"
                          return-object
                          :search-input.sync="search"
                          cache-items
                          @change="onchangeFood"/>
          <v-text-field type="number" label="Quantidade" v-model="food.grams" suffix="g" @change="onchangeGrams" :disabled="this.selectedFood.id === undefined"/>
          <v-text-field type="number" label="Carboidratos" v-model="food.carbohydrate" suffix="g" readonly/>
          <v-text-field type="number" label="Proteínas" v-model="food.protein" suffix="g" readonly/>
          <v-text-field type="number" label="Gorduras" v-model="food.fat" suffix="g" readonly/>
          <v-text-field type="number" label="Calorias" v-model="food.calories" suffix="Kcal" readonly/>
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
import FoodQueryService from "../services/FoodQueryService";

export default {
  name: "Meal",
  props: ["meal"],
  methods: {
    addFood(){
      this.food.meal_id = this.meal.id
      DietService.createFood(this.food).then((res)=>{
        this.meal.foods.push(res.data)
        this.dialogNewFood = false
      })
    },
    onchangeFood(){
      this.food.grams = 100
      this.food.name = this.selectedFood.descricao
      this.food.carbohydrate = this.selectedFood.carboidratos
      this.food.protein = this.selectedFood.proteina
      this.food.fat = this.selectedFood.lipidios
      this.food.calories = this.selectedFood.energia
    },
    onchangeGrams(){
      this.food.calories = this.selectedFood.energia * this.food.grams * 0.01
    }
  },
  watch: {
    search (value) {
      if(value.length > 2) {
        this.loading=true;
        FoodQueryService.query(value).then((res) => {
          this.foods = res.data;
          this.loading=false;
        })
      } else {
        this.foods=[];
      }
    },
  },
  data: () => {
    return {
      food:{calories:0},
      selectedFood: {},
      loading:false,
      search:null,
      foods:[],
      dialogNewFood: false,
    }
  }

}
</script>

<style scoped>

</style>