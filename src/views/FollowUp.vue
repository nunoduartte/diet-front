<template>
  <v-col align="center">
    <v-col cols="8">
      <v-card class="pa-8">
        <v-autocomplete label="Descrição" v-model="foodDescription" :items="foods" :loading="loading" :search-input.sync="search" cache-items>
          <template v-slot:selection="data">
            <v-sheet class="mx-1 my-1 pa-1" color="secondary" rounded>
              <span class="mx-2 d-flex">{{ data.descricao}}</span>
            </v-sheet>
          </template>
          <template v-slot:item="data">
            <v-sheet class="mx-1 my-1 pa-1" color="secondary" rounded>
              <span class="mx-2 d-flex">{{ data.descricao}}</span>
            </v-sheet>
          </template>
        </v-autocomplete>
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
      this.loading=true;
      if(value.length > 2) {
        FoodQueryService.query(value).then((res) => {
          this.foods = res.data;
        })
      }
      this.loading=false;
    },
  },
}
</script>

<style scoped>

</style>