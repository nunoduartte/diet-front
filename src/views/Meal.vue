<template>
  <div>
    <v-col class="mt-1" align="center">
      <p>{{meal.name}}</p>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Alimento
            </th>
            <th class="text-left">
              Carboidratos
            </th>
            <th class="text-left">
              Proteínas
            </th>
            <th class="text-left">
              Gordura
            </th>
            <th class="text-left">
              Calorias
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="food in meal.foods"
              :key="food.name"
          >
            <td>{{ food.name }}</td>
            <td>{{ food.carbohydrate }}</td>
            <td>{{ food.protein }}</td>
            <td>{{ food.fat }}</td>
            <td>{{ food.calories }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn>Adicionar Alimento</v-btn>
    </v-col>
    <v-dialog max-width="600" v-model="dialogNewFood">
      <v-card>
        <v-card-title class="text-h5 green">
          Alimento
        </v-card-title>
        <v-form class="pa-8">
          <v-text-field label="Nome" v-model="email"/>
          <v-text-field label="Usuário" v-model="usuario"/>
          <v-text-field label="Senha" v-model="senha"/>
          <v-row justify="center" class="mt-6">
            <v-btn class="mr-4 white--text" color="red" style="width: 180px" @click="dialogCadastro=false">Cancelar</v-btn>
            <v-btn class="white--text" color="green" style="width: 180px" @click="signup">Cadastrar</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Meal",
  food: {},
  dialogNewFood: false,
  props: ["meal"]
}
</script>

<style scoped>

</style>