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
            <v-btn class="mr-4 white--text" color="green" style="width: 180px" @click="dialogCadastro=true">Cadastro</v-btn>
            <v-btn color="white" class="green--text" style="width: 180px" @click="dialogLogin=true">Login</v-btn>
          </v-row>
        </v-col>
      </v-card>
    </div>
    <v-dialog max-width="600" v-model="dialogCadastro">
      <v-card>
        <v-card-title class="text-h5 green">
          Realizar Cadastro
        </v-card-title>
        <v-form class="pa-8">
          <v-text-field label="Email" v-model="email"/>
          <v-text-field label="Usuário" v-model="usuario"/>
          <v-text-field label="Senha" v-model="senha"/>
          <v-row justify="center" class="mt-6">
            <v-btn class="mr-4 white--text" color="red" style="width: 180px" @click="dialogCadastro=false">Cancelar</v-btn>
            <v-btn class="white--text" color="green" style="width: 180px" @click="signup">Cadastrar</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog max-width="600" v-model="dialogLogin">
      <v-card>
        <v-card-title class="text-h5 green">
          Realizar Cadastro
        </v-card-title>
        <v-form class="pa-8">
          <v-text-field label="Usuário" v-model="usuario"/>
          <v-text-field label="Senha" v-model="senha"/>
          <v-row justify="center" class="mt-6">
            <v-btn class="mr-4 white--text" color="red" style="width: 180px" @click="dialogLogin=false">Cancelar</v-btn>
            <v-btn class="white--text" color="green" style="width: 180px" @click="signin">Logar</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "HomePage",
  data:() => {
      return {
        email:'',
        usuario:'',
        senha:'',
        tab:0,
        dialogCadastro:false,
        dialogLogin:false,
        headerItens:['Home', 'criar dieta', 'ver receitas', 'ver consumo', 'ver calorias'],
        menuItens: ['Fazer Login', 'Fazer Cadastro']
      }
  },
  methods: {
    signup(){
      axios.post("http://localhost:8081/user", {username: this.usuario, email: this.email, password: this.senha});
      this.dialogCadastro = false;
    },
    signin(){
      this.dialogCadastro = false;
    }
  }
}

</script>

<style scoped>

</style>
