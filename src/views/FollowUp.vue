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
      selectedFood: null,
      amount: 100,
      loading:false,
      search:null,
      foods:[]
    }
  },
  computed: {
    ...mapState(["loggedUser"]),
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
        console.log(res);
      })
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
}
</script>

<style scoped>

</style>