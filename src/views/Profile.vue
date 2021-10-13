<template>
  <div>
    <v-col class="mt-4" align="center">
      <v-row class="mt-4" justify="center">
        <v-col cols="4">
          <v-card outlined >
            <v-form align="center" @submit.prevent="salvar">
              <h2 style="color:black; font-family: cursive;">Perfil</h2>
                <v-row class="mt-4" justify="center">
                  <v-col cols="4" >
                    <v-text-field
                        v-model="age"
                        :counter="3"
                        label="Idade"
                        type="number"
                        outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              <v-row class="mt-4" justify="center">
                <v-radio-group v-model="genre" >
                  <v-radio
                      v-for="g in genreValues"
                      :key="g"
                      :label="`${g}`"
                      :value="g"
                  ></v-radio>
                </v-radio-group>
              </v-row>
              <v-row class="mt-4" justify="center">
                <v-radio-group v-model="biotype">
                  <v-radio
                      v-for="b in biotypeLabelValues"
                      :key="b"
                      :label="`${b}`"
                      :value="b"
                  ></v-radio>
                </v-radio-group>
              </v-row>
              <v-row class="mt-4" justify="center">
                <v-radio-group v-model="goal">
                  <v-radio
                      v-for="goal in goalLabelValues"
                      :key="goal"
                      :label="`${goal}`"
                      :value="goal"
                  ></v-radio>
                </v-radio-group>
              </v-row>
              <h2 style="color:black; font-family: cursive;">Medidas</h2>
              <v-row class="mt-4" justify="center">
                <v-col cols="4" >
                  <v-text-field
                      v-model="weight"
                      :counter="3"
                      label="Peso (kg)"
                      type="number"
                      outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-4" justify="center">
                <v-col cols="4" >
                  <v-text-field
                      v-model="height"
                      :counter="3"
                      label="Altura (cm)"
                      type="number"
                      outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-4" justify="center">
                <v-col cols="4" >
                  <v-text-field
                      v-model="neck"
                      :counter="3"
                      label="Pescoço (cm)"
                      type="number"
                      outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-4" justify="center">
                <v-col cols="4" >
                  <v-text-field
                      v-model="waist"
                      :counter="3"
                      label="Cintura (cm)"
                      type="number"
                      outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-4" justify="center">
                <v-col cols="4" >
                  <v-text-field
                      v-model="hip"
                      :counter="3"
                      label="Quadril (cm)"
                      type="number"
                      outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-4" justify="center">
                <v-col cols="4" >
                  <v-text-field
                      v-model="bodyFat"
                      :counter="3"
                      label="Gordura corporal (%)"
                      type="number"
                      outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <h2 style="color:black; font-family: cursive;">Macros</h2>
              <v-row class="mt-4" justify="center">
                <v-col cols="4" >
                  <v-text-field
                      v-model="basalMetabolicRate"
                      :counter="5"
                      label="Taxa metabólica basal (kcal)"
                      type="number"
                      outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-4" justify="center">
                <v-col cols="4" >
                  <v-text-field
                      v-model="caloriesGoal"
                      :counter="5"
                      label="Calorias diárias (kcal)"
                      type="number"
                      outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-4" justify="center">
                <v-col cols="4" >
                  <v-text-field
                      v-model="protein"
                      :counter="5"
                      label="Proteína (g)"
                      type="number"
                      outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-4" justify="center">
                <v-col cols="4" >
                  <v-text-field
                      v-model="carbohydrate"
                      :counter="5"
                      label="Carboidrato (g)"
                      type="number"
                      outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-4" justify="center">
                <v-col cols="4" >
                  <v-text-field
                      v-model="fat"
                      :counter="5"
                      label="Gordura (g)"
                      type="number"
                      outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn
                  class="mr-4"
                  type="submit"
              >
                Salvar
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
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
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Profile",

  data(){
      return {
        tab:1,
        dialogOk:false,
        age:0,
        userDataID:0,
        measuresID:0,
        dietID:0,
        genreValues : ['F' ,'M'],
        genre: "",
        biotypeLabelValues : ['ECTOMORPH' ,'MESOMORPH', 'ENDOMORPH'],
        biotype: "",
        goalLabelValues : ['LOSE' ,'MAINTAIN', 'GAIN'],
        goal: "",
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
        menuItens: ['Logout']
      };
  },

  created(){
    console.log("ola")
    axios.get(`http://localhost:8081/user/${this.$route.params.id}`)
        .then((user) => {
          this.userDataID = user.data.userData.id;
          this.measuresID = user.data.userData.measures.id;
          this.dietID = user.data.userData.diet.id;
          this.age = user.data.userData.age;
          this.genre = user.data.userData.genre;
          this.biotype = user.data.userData.biotype;
          this.goal = user.data.userData.goal;
          this.weight = user.data.userData.measures.weight;
          this.height = user.data.userData.measures.height;
          this.neck = user.data.userData.measures.neck;
          this.waist = user.data.userData.measures.waist;
          this.hip = user.data.userData.measures.hip;
          this.bodyFat = user.data.userData.measures.bodyFat;
          this.basalMetabolicRate = user.data.userData.diet.basalMetabolicRate;
          this.caloriesGoal = user.data.userData.diet.caloriesGoal;
          this.protein = user.data.userData.diet.protein;
          this.carbohydrate = user.data.userData.diet.carbohydrate;
          this.fat = user.data.userData.diet.fat;
          console.log(user.data);
        });
  },

  methods: {
    salvar(){
      axios.post("http://localhost:8081/userData",
          { id:this.userDataID, age: this.age, genre: this.genre,
            biotype: this.biotype, goal: this.goal,
            measures: {id: this.measuresID, weight: this.weight, height: this.height, neck: this.neck, waist: this.waist, hip: this.hip, bodyFat: this.bodyFat},
            diet: {id: this.dietID, basalMetabolicRate: this.basalMetabolicRate, caloriesGoal: this.caloriesGoal, protein: this.protein,
              carbohydrate: this.carbohydrate, fat: this.fat}})
          .then(userData => {
                this.dialogOk = true;
                console.log(userData);
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
