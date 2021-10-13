<template>
  <v-card>
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
          Realizar Login
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
import router from "../router";
import LoginService from "@/services/LoginService";
import { mapActions, mapState } from "vuex";

export default {
  name: "HomePage",
  computed: {
    ...mapState(["loggedUser"]),
  },
  data:() => {
      return {
        email:'',
        usuario:'',
        senha:'',
        dialogCadastro:false,
        dialogLogin:false,
      }
  },
  methods: {
    ...mapActions(["login"]),
    signup(){
      LoginService.signup(this.usuario,this.senha, this.email).then(user => {
        this.dialogCadastro = false;
        console.log(user);
      })
    },
    async signin() {
      await this.login({username:this.usuario,password:this.senha});
      this.dialogLogin = false;
      router.push(`/profile/${this.loggedUser.id}`);
    }
  }
}

</script>

<style scoped>

</style>
