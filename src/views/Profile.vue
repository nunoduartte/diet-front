<template>
  <v-container class="grey lighten-4">
    <v-row no-gutters>
      <v-col order="first">
        <v-form @submit.prevent="salvar">
          <v-card-title>Perfil</v-card-title>
          <v-card>
            <v-text-field
                v-model="age"
                label="Idade"
                type="number"
                outlined
                hide-details
            ></v-text-field>
          </v-card>
          <v-card>
            <v-radio-group v-model="genre" label="Gênero">
              <v-radio
                  v-for="g in genreValues"
                  :key="g"
                  :label="`${g}`"
                  :value="g"
                  hide-details
              ></v-radio>
            </v-radio-group>
          </v-card>
          <v-card>
            <v-radio-group v-model="biotype" label="Biotipo">
              <v-radio
                  v-for="b in biotypeValues"
                  :key="b"
                  :label="`${biotypeLabelValues[b]}`"
                  :value="b"
                  hide-details
              ></v-radio>
            </v-radio-group>
          </v-card>
          <v-card>
            <v-radio-group v-model="goal" label="Objetivo de peso">
              <v-radio
                  v-for="g in goalValues"
                  :key="g"
                  :label="`${goalLabelValues[g]}`"
                  :value="g"
                  hide-details
              ></v-radio>
            </v-radio-group>
          </v-card>
        </v-form>
      </v-col>
      <v-col style="padding-left: 15px">
        <v-form @submit.prevent="salvar">
          <v-card-title>Medidas</v-card-title>
          <v-card style="margin-bottom: 15px">
            <v-text-field
                v-model="weight"
                label="Peso (kg)"
                type="number"
                outlined
                hide-details
            ></v-text-field>
          </v-card>
          <v-card style="margin-bottom: 15px">
            <v-text-field
                v-model="height"
                label="Altura (cm)"
                type="number"
                outlined
                hide-details
            ></v-text-field>
          </v-card>
          <v-card style="margin-bottom: 15px">
            <v-text-field
                v-model="neck"
                label="Pescoço (cm)"
                type="number"
                outlined
                hide-details
            ></v-text-field>
          </v-card>
          <v-card style="margin-bottom: 15px">
            <v-text-field
                v-model="waist"
                label="Cintura (cm)"
                type="number"
                outlined
                hide-details
            ></v-text-field>
          </v-card>
          <v-card style="margin-bottom: 15px">
            <v-text-field
                v-model="hip"
                label="Quadril (cm)"
                type="number"
                outlined
                hide-details
            ></v-text-field>
          </v-card>
          <v-card>
            <v-text-field
                v-model="bodyFat"
                label="Gordura corporal (%)"
                type="number"
                outlined
                hide-details
            ></v-text-field>
          </v-card>
        </v-form>
      </v-col>
      <v-col order="last" style="padding-left: 15px">
        <v-form @submit.prevent="salvar">
          <v-card-title>Macros</v-card-title>
          <v-card style="margin-bottom: 15px">
            <v-text-field
                v-model="basalMetabolicRate"
                label="Taxa metabólica basal (kcal)"
                type="number"
                outlined
                hide-details
            ></v-text-field>
          </v-card>
          <v-card style="margin-bottom: 15px">
            <v-text-field
                v-model="caloriesGoal"
                label="Calorias diárias (kcal)"
                type="number"
                outlined
                hide-details
            ></v-text-field>
          </v-card>
          <v-card style="margin-bottom: 15px">
            <v-text-field
                v-model="protein"
                label="Proteína (g)"
                type="number"
                outlined
                hide-details
            ></v-text-field>
          </v-card>
          <v-card style="margin-bottom: 15px">
            <v-text-field
                v-model="carbohydrate"
                label="Carboidrato (g)"
                type="number"
                outlined
                hide-details
            ></v-text-field>
          </v-card>
          <v-card>
            <v-text-field
                v-model="fat"
                label="Gordura (g)"
                type="number"
                outlined
                hide-details
            ></v-text-field>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn
            color="success"
            @click="salvar"
        >
          Salvar dados
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog max-width="600" v-model="dialogOk">
      <v-card>
        <v-card-title class="text-h5 green">
          Confirmação
        </v-card-title>
        <v-form class="pa-8">
          <h2 style="color:black; font-family: cursive;">Dados salvos com sucesso!</h2>
          <v-row justify="center" class="mt-6">
            <v-btn class="white--text" color="green" style="width: 180px" @click="fechar">Ok</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import axios from "axios";
import {mapState} from "vuex";

export default {
  name: "Profile",

  data(){
      return {
        dialogOk:false,
        age:0,
        userDataID:0,
        measuresID:0,
        dietID:0,
        genreValues : ['F' ,'M'],
        weight:0,
        height:0,
        neck:0,
        waist:0,
        hip:0,
        bodyFat:0,
        basalMetabolicRate:0,
        caloriesGoal:0,
        protein:0,
        carbohydrate:0,
        fat:0,
        headerItens:['Home', 'Profile'],
        genre: "F",
        biotype: 0,
        biotypeValues : ['ECTOMORPH' ,'MESOMORPH', 'ENDOMORPH'],
        biotypeLabelValues : {'ECTOMORPH':'Ectomorfo', 'MESOMORPH':'Mesomorfo', 'ENDOMORPH':'Endomorfo'},
        goal: "",
        goalValues : ['LOSE', 'MAINTAIN', 'GAIN'],
        goalLabelValues : {'LOSE' : 'Perder', 'MAINTAIN': 'Manter', 'GAIN': 'Ganhar'},
        menuItens: ['Logout']
      };
  },

  created(){
    this.userDataID = this.loggedUser.userData.id;
    this.measuresID = this.loggedUser.userData.measures.id;
    this.dietID = this.loggedUser.userData.diet.id;
    this.age = this.loggedUser.userData.age;
    this.genre = this.loggedUser.userData.genre;
    this.biotype = this.loggedUser.userData.biotype;
    this.goal = this.loggedUser.userData.goal;
    this.weight = this.loggedUser.userData.measures.weight;
    this.height = this.loggedUser.userData.measures.height;
    this.neck = this.loggedUser.userData.measures.neck;
    this.waist = this.loggedUser.userData.measures.waist;
    this.hip = this.loggedUser.userData.measures.hip;
    this.bodyFat = this.loggedUser.userData.measures.bodyFat;
    this.basalMetabolicRate = this.loggedUser.userData.diet.basalMetabolicRate;
    this.caloriesGoal = this.loggedUser.userData.diet.caloriesGoal;
    this.protein = this.loggedUser.userData.diet.protein;
    this.carbohydrate = this.loggedUser.userData.diet.carbohydrate;
    this.fat = this.loggedUser.userData.diet.fat;
  },
  computed:{
    ...mapState(["loggedUser"]),
  },
  methods: {
    salvar(){
      axios.post("http://localhost:8081/userData",
          { id:this.userDataID, age: this.age, genre: this.genre,
            biotype: this.biotype, goal: this.goal,
            measures: {id: this.measuresID, weight: this.weight, height: this.height, neck: this.neck, waist: this.waist, hip: this.hip, bodyFat: this.bodyFat},
            diet: {id: this.dietID, basalMetabolicRate: this.basalMetabolicRate, caloriesGoal: this.caloriesGoal, protein: this.protein,
              carbohydrate: this.carbohydrate, fat: this.fat}})
          .then(() => {
                this.dialogOk = true;
              }
          );
    },
    fechar(){
      this.dialogOk = false;
    }
  }
}

</script>

<style scoped>

</style>
