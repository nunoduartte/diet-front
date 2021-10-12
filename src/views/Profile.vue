<template>
  <div>
    <v-card>
      <v-toolbar color="green" dark >
          <v-tabs
              v-model="tab"
              align-with-title
          >
            <v-tabs-slider color="white"></v-tabs-slider>

            <v-tab
                v-for="item in headerItens"
                :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar color="grey" v-bind="attrs" v-on="on">
              <v-icon dark>
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </template>
          <v-list>
            <v-list-item
                v-for="(item, index) in menuItens"
                :key="index"
            >
                <v-list-item-title style="cursor:pointer">{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-toolbar>
    </v-card>
    <v-col class="mt-4" align="center">
      <v-row class="mt-4" justify="center">
      <v-form align="center" @submit.prevent="">
        <h1 style="color:black; font-family: cursive;">Dados</h1>
          <v-row class="mt-4" justify="center">
            <v-text-field
                v-model="age"
                :counter="3"
                label="Idade"
                required
                type="number"
            ></v-text-field>
          </v-row>
        <v-row class="mt-4" justify="center">
          <v-radio-group v-model="genre">
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
                v-for="b in 3"
                :key="b-1"
                :label="`${biotypeLabelValues[b-1]}`"
                :value="b-1"
            ></v-radio>
          </v-radio-group>
        </v-row>
        <v-row class="mt-4" justify="center">
          <v-radio-group v-model="goal">
            <v-radio
                v-for="goal in 3"
                :key="goal-1"
                :label="`${goalLabelValues[goal-1]}`"
                :value="goal-1"
            ></v-radio>
          </v-radio-group>
        </v-row>
      </v-form>
      </v-row>
    </v-col>
  </div>
</template>

<script>

export default {
  name: "Profile",
  data:() => {
      return {
        tab:0,
        age:0,
        genreValues : ['F' ,'M'],
        genre: "F",
        biotypeLabelValues : ['ECTOMORFO' ,'MESOMORFO', 'ENDOMORFO'],
        biotype: 0,
        goalLabelValues : ['PERDER' ,'MANTER', 'GANHAR'],
        goal: 0,
        headerItens:['Home', 'Profile'],
        menuItens: ['Logout']
      }
  },
  methods: {
    createProfile(){

    }
  }
}

</script>

<style scoped>

</style>
