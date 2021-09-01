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
        <v-img src="@/assets/diet.jpg" max-height="700" max-width="1000"/>
      </v-row>
      <v-card-text>Nunca desista dos seus sonhos</v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "HomePage",
  data:() => {
      return {
        tab:0,
        headerItens:['criar dieta', 'ver receitas', 'ver consumo', 'ver calorias'],
        menuItens: ['Fazer Login', 'Fazer Cadastro']
      }
  }
}

</script>

<style scoped>

</style>