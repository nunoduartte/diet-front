<template>
  <v-col align="center">
    <v-col cols="8">
      <v-card class="pa-8">
        <v-autocomplete label="Descrição"
                        v-model="selectedFood"
                        :items="foods"
                        :loading="loading"
                        item-text="descricao"
                        return-object
                        :search-input.sync="search"
                        cache-items/>
        <v-text-field type="number" label="Quantidade" v-model="amount" suffix="g"/>
        <v-btn @click="addFood" color="success">Adicionar alimento</v-btn>
      </v-card>
      <v-card
          class="mx-auto text-center mt-10"
          color="green"
          dark
      >
        <h1>carboidratos</h1>
        <v-card-text>
          <v-sheet
              color="rgba(0, 0, 0, .12)">
            <v-sparkline
                :labels="labels"
                :value="values"
                color="white"
                line-width="4"
                padding="16"
            ></v-sparkline>
          </v-sheet>
        </v-card-text>
        <v-card-text>
          <span>{{`${carbohydrateConsumed}g de carboidratos de ${loggedUser.userData.diet.carbohydrate}g necessárias`}}</span>
        </v-card-text>
      </v-card>
      <v-card
          class="mx-auto text-center mt-10"
          color="green"
          dark
      >
        <h1>Proteínas</h1>
        <v-card-text>
          <v-sheet
              color="rgba(0, 0, 0, .12)">
            <v-sparkline
                :labels="labels"
                :value="values"
                color="white"
                line-width="4"
                padding="16"
            ></v-sparkline>
          </v-sheet>
        </v-card-text>
        <v-card-text>
          <span>{{`${proteinConsumed}g de proteína de ${loggedUser.userData.diet.protein}g necessárias`}}</span>
        </v-card-text>
      </v-card>
      <v-card
          class="mx-auto text-center mt-10"
          color="green"
          dark
      >
        <h1>Gordura</h1>
        <v-card-text>
          <v-sheet
              color="rgba(0, 0, 0, .12)">
            <v-sparkline
                :labels="labels"
                :value="values"
                color="white"
                line-width="4"
                padding="16"
            ></v-sparkline>
          </v-sheet>
        </v-card-text>
        <v-card-text>
          <span>{{`${fatConsumed}g de gordura de ${loggedUser.userData.diet.fat}g necessárias`}}</span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-col>
</template>

<script>
import FoodQueryService from "@/services/FoodQueryService";
import FollowUpService from "@/services/FollowUpService";
import {mapState} from "vuex";

export default {
  name: "FollowUp",
  data(){
    return {
      foodRegistries:[],
      labels:[],
      values:[],
      selectedFood: null,
      amount: 100,
      loading:false,
      search:null,
      proteinConsumed:0,
      fatConsumed:0,
      carbohydrateConsumed:0,
      foods:[]
    }
  },
  computed: {
    ...mapState(["loggedUser"]),
  },
  created(){
    FollowUpService.getFoodRegistry(this.loggedUser.id).then((res)=>{
      this.foodRegistries = res.data;
    })
  },
  methods:{
    addFood(){
      FollowUpService.createFoodRegistry({
        user:this.loggedUser,
        description: this.selectedFood.descricao,
        amount: this.amount,
        code: this.selectedFood.codigo,
        carbohydrate:(this.selectedFood.carboidratos/100)*this.amount,
        protein:(this.selectedFood.proteina/100)*this.amount,
        fat:(this.selectedFood.lipidios/100)*this.amount,
      }).then((res)=>{
        this.foodRegistries.push(res.data);
      })
    }
  },
  watch: {
    foodRegistries(foods){
      this.labels = [];
      this.values = [];
      foods.forEach((food)=>{
        this.labels.push(new Date(food.registryDate).getHours() + "h");
        this.carbohydrateConsumed += food.carbohydrate;
        this.proteinConsumed += food.protein;
        this.fatConsumed += food.fat;
        this.values.push(this.carbohydrateConsumed);
      })
    },
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
}
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>