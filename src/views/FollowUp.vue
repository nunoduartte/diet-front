<template>
  <v-col align="center">
    <v-col cols="8">
      <v-card class="pa-8">
        <v-autocomplete label="Descrição"
                        v-model="foodDescription"
                        :items="foods"
                        :loading="loading"
                        item-text="descricao"
                        :search-input.sync="search"
                        cache-items/>
        <v-text-field type="number" label="Quantidade" v-model="amount" suffix="g"/>
        <v-btn color="success">Adicionar alimento</v-btn>
      </v-card>
    </v-col>
  </v-col>
</template>

<script>
import FoodQueryService from "@/services/FoodQueryService";

export default {
  name: "FollowUp",
  data(){
    return {
      foodDescription: null,
      amount: 100,
      loading:false,
      search:null,
      foods:[]
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