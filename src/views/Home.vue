<template>
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
    <div class="mt-3">
      <v-row justify="center">
        <v-img src="@/assets/diet.jpg" max-height="1000" width="1080"/>
      </v-row>
      <v-card flat style="position: absolute; top:45vh; left: 55vw; background-color: transparent">
        <v-col>
          <h1 style="color:black; font-family: cursive;">Não é uma dieta. Não é uma fase.<br/> É uma mudança permanente no estilo de vida</h1>
          <v-row class="mt-4" justify="center">
            <v-btn class="mr-4 white--text" color="green" style="width: 180px">Cadastro</v-btn>
            <v-btn color="white" class="green--text" style="width: 180px">Login</v-btn>
          </v-row>
        </v-col>
      </v-card>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "HomePage",
  data:() => {
      return {
        tab:0,
        headerItens:['Home', 'criar dieta', 'ver receitas', 'ver consumo', 'ver calorias'],
        menuItens: ['Fazer Login', 'Fazer Cadastro']
      }
  }
}

</script>

<style scoped>

</style>