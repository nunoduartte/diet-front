<template>
  <v-col align="center">
    <v-col cols="8">
      <v-card>
        <v-data-table :headers="headers" :items="foodRegistries" disable-pagination :hide-default-footer="true">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="modalEdicao = true; itemSelecionado = item; amount = item.amount;">mdi-pencil</v-icon>
            <v-icon small @click="modalRemocao = true; itemSelecionado = item">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-col align="end">
            <v-btn color="success" @click="modalCriacao=true">
              Adicionar Alimento
            </v-btn>
          </v-col>
        </v-card-actions>
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
                :labels="carbohydrateLabels"
                :value="carbohydrateValues"
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
                :labels="carbohydrateLabels"
                :value="carbohydrateValues"
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
                :labels="carbohydrateLabels"
                :value="carbohydrateValues"
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
    <v-dialog max-width="600" v-model="modalCriacao">
      <v-card class="pa-8">
        <v-autocomplete label="Descrição"
                        v-model="selectedFood"
                        :items="foods"
                        :value-comparator="(firstValue,secondValue)=> firstValue.id === secondValue.id"
                        :loading="loading"
                        item-text="descricao"
                        return-object
                        :search-input.sync="search"
                        cache-items/>
        <v-text-field type="number" label="Quantidade" v-model="amount" suffix="g"/>

        <v-row justify="center" class="mt-6">
          <v-btn class="mr-4 white--text" color="red" style="width: 180px" @click="modalEdicao=false">Cancelar</v-btn>
          <v-btn @click="addFood" color="success">Salvar Alimento</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog max-width="600" v-model="modalEdicao">
      <v-card class="pa-8">
        <v-text-field disabled :value="itemSelecionado.description"/>
        <v-text-field type="number" label="Quantidade" v-model="amount" suffix="g"/>

        <v-row justify="center" class="mt-6">
          <v-btn class="mr-4 white--text" color="red" style="width: 180px" @click="modalEdicao=false">Cancelar</v-btn>
          <v-btn @click="editFood" color="success">Salvar Alimento</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog max-width="600" v-model="modalRemocao">
      <v-card>
        <v-card-title class="text-h5 green">
          Remover Alimento
        </v-card-title>
        <v-form class="pa-8">
          <v-col align="center">
            <h2>
              Deseja remover o alimento selecionado?({{this.itemSelecionado.description}})
            </h2>
          </v-col>
          <v-row justify="center" class="mt-6">
            <v-btn class="mr-4 white--text" color="red" style="width: 180px" @click="modalRemocao=false">Cancelar</v-btn>
            <v-btn class="white--text" color="green" style="width: 180px" @click="removeFood">Remover</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
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
      headers: [
        { text: 'Descrição', value: 'description' },
        { text: 'Carboidratos(g)', value: 'carbohydrate' },
        { text: 'Proteínas(g)', value: 'protein' },
        { text: 'Gordura(g)', value: 'fat' },
        { text: "Quantidade(g)", value: "amount"},
        { text: "Actions", value: "actions", sortable: false }
      ],
      itemSelecionado:{},
      carbohydrateLabels:[],
      carbohydrateValues:[],
      proteinLabels:[],
      proteinValues:[],
      fatLabels:[],
      fatValues:[],
      selectedFood: {},
      amount: 100,
      loading:false,
      search:null,
      proteinConsumed:0,
      fatConsumed:0,
      carbohydrateConsumed:0,
      modalEdicao:false,
      modalRemocao:false,
      modalCriacao:false,
      foods:[],
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
      this.modalCriacao = false;
    },
    editFood(){
      const foodRegistry = {
        id: this.itemSelecionado.id,
        user:this.loggedUser,
        description: this.itemSelecionado.description,
        amount: this.amount,
        code: this.itemSelecionado.code,
        carbohydrate:(this.itemSelecionado.carbohydrate/100)*this.amount,
        protein:(this.itemSelecionado.protein/100)*this.amount,
        fat:(this.itemSelecionado.fat/100)*this.amount,
      }
      FollowUpService.updateFoodRegistry(foodRegistry).then(()=>{
        FollowUpService.getFoodRegistry(this.loggedUser.id).then((res)=>{
          this.foodRegistries = res.data;
          this.modalEdicao = false;
        })
      })
    },
    removeFood(){
      FollowUpService.removeFoodRegistry(this.itemSelecionado.id);
      this.foodRegistries = this.foodRegistries.filter((food)=>{
        return food.id !== this.itemSelecionado.id;
      })
      this.modalRemocao = false;
    }
  },
  watch: {
    foodRegistries(foods){
      this.carbohydrateLabels = [];
      this.carbohydrateValues = [];
      this.proteinLabels = [];
      this.proteinValues = [];
      this.fatLabels = [];
      this.fatValues = [];
      foods.forEach((food)=>{
        this.carbohydrateLabels.push(new Date(food.registryDate).getHours() + "h");
        this.proteinLabels.push(new Date(food.registryDate).getHours() + "h");
        this.fatLabels.push(new Date(food.registryDate).getHours() + "h");
        this.carbohydrateConsumed += food.carbohydrate;
        this.proteinConsumed += food.protein;
        this.fatConsumed += food.fat;
        this.carbohydrateValues.push(this.carbohydrateConsumed);
        this.proteinValues.push(this.proteinConsumed);
        this.fatValues.push(this.fatConsumed);
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