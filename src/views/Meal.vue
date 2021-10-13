<template>
  <div>
    <v-col class="mt-1" align="center">
      <div class="d-flex">
        <h2 class="text-left green--text">{{meal.name}}</h2>
        <v-btn class="mx-2 " style="margin-top: -10px;" fab icon dark color="red" @click="dialogDeleteMeal=true">
          <v-icon dark> mdi-minus </v-icon>
        </v-btn>
      </div>
      <v-data-table
          :headers="headers"
          :items="meal.foods"
          :items-per-page="10"
          class="elevation-1"
          @click:row="editFood"
      ></v-data-table>
      <br/>
      <v-btn @click="dialogNewFood=true" color="success" style="width: 180px">
        Adicionar Alimento
      </v-btn>
    </v-col>
    <v-row justify="center">
      <v-dialog
          v-model="dialogDeleteMeal"
          persistent
          max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="gray--text text-h5">Deletar Refeição</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <p>Tem certeza de que deseja deletar a refeição?</p>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red darken-1"
                text
                @click="dialogDeleteMeal = false"
            >
              Cancelar
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="deleteMeal"
            >
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
    <v-dialog max-width="600" v-model="dialogEditFood">
      <v-card>
        <v-card-title class="text-h5 green">
          Alimento
        </v-card-title>
        <v-form class="pa-8">
          <v-text-field label="Nome" v-model="food.name" readonly/>
          <v-text-field type="number" label="Quantidade" v-model="food.grams" suffix="g" @change="onchangeGrams"/>
          <v-text-field type="number" label="Carboidratos" v-model="food.carbohydrate" suffix="g" readonly/>
          <v-text-field type="number" label="Proteínas" v-model="food.protein" suffix="g" readonly/>
          <v-text-field type="number" label="Gorduras" v-model="food.fat" suffix="g" readonly/>
          <v-text-field type="number" label="Calorias" v-model="food.calories" suffix="Kcal" readonly/>
          <v-row justify="center" class="mt-6">
            <v-btn class="mr-4 white--text" color="red" style="width: 180px"  @click="deleteFood">Remover</v-btn>
            <v-btn class="white--text" color="green" style="width: 180px" @click="updateFood">Salvar</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DietService from "../services/DietService";
import FoodQueryService from "../services/FoodQueryService";
import {mapState} from "vuex";

export default {
  name: "Meal",
  props: ["meal"],
  computed: {...mapState(["loggedUser"])},
  methods: {
    deleteMeal(){
      const mealId = this.meal.id
      DietService.deleteMeal(mealId).then(()=>{
        this.loggedUser.userData.diet.meals = this.loggedUser.userData.diet.meals.filter(
            (meal)=>{
              return meal.id !== mealId
            }
        )
        this.dialogDeleteMeal = false
      })
    },
    addFood(){
      this.food.meal_id = this.meal.id
      DietService.createFood(this.food).then((res)=>{
        this.meal.foods.push(res.data)
        this.dialogNewFood = false
        this.food = {calories:0}
        this.selectedFood = {}
      })
    },
    deleteFood(){
      const foodId = this.food.id
      DietService.deleteFood(foodId).then(()=>{
        this.meal.foods = this.meal.foods.filter((food) =>{
          return food.id !== foodId
        })
        this.dialogEditFood = false
        this.food = {calories:0}
      })
    },
    updateFood(){
      const foodId = this.food.id
      DietService.updateFood(this.food).then((res)=>{
        this.meal.foods = this.meal.foods.filter((food) =>{
          return food.id !== foodId
        })
        this.meal.foods.push(res.data)
        this.dialogEditFood = false
        this.food = {calories:0}
        this.selectedFood = {}
      })
    },
    editFood(rowData){
      this.gramsRef = rowData.grams
      this.caloriesRef = rowData.calories
      this.food = {...rowData}
      this.dialogEditFood = true
    },
    onchangeFood(){
      this.gramsRef = 100
      this.caloriesRef = this.selectedFood.energia
      this.food.grams = 100
      this.food.name = this.selectedFood.descricao
      this.food.carbohydrate = this.selectedFood.carboidratos
      this.food.protein = this.selectedFood.proteina
      this.food.fat = this.selectedFood.lipidios
      this.food.calories = this.selectedFood.energia
    },
    onchangeGrams(){
      this.food.calories = this.caloriesRef * this.food.grams / this.gramsRef
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
      gramsRef:0,
      caloriesRef:0,
      food:{calories:0},
      selectedFood: {},
      loading:false,
      search:null,
      foods:[],
      dialogNewFood: false,
      dialogEditFood: false,
      dialogDeleteMeal: false,
      headers: [
        { text: 'Alimento', align: 'start', class: 'green--text', sortable: false, value: 'name'},
        { text: 'Quantidade(g)', class: 'green--text', sortable: false, value: 'grams'},
        { text: 'Carboidratos(g)', class: 'green--text', sortable: false, value: 'carbohydrate'},
        { text: 'Proteínas(g)', class: 'green--text', sortable: false, value: 'protein'},
        { text: 'Gordura(g)', class: 'green--text', sortable: false, value: 'fat'},
        { text: 'Calorias(Kcal)', class: 'green--text', sortable: false, value: 'calories'},
      ],
    }
  }

}
</script>

<style scoped>

</style>