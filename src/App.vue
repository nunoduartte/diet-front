<template>
  <v-app>
    <v-main>
      <v-toolbar color="green" dark >
        <v-tabs
            v-model="tab"
            align-with-title
        >
          <v-tabs-slider color="white"></v-tabs-slider>

          <v-tab
              v-for="item in headerItens"
              :key="item.value"
              @click="navigateToPage(item.path)"
          >
            <div v-if=" (item.isLoggedIn && loggedUser !== null) || (!item.isLoggedIn)">{{ item.value }}</div>
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
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import router from "@/router";
import {mapState} from "vuex";

export default {
  name: 'App',
  methods:{
    navigateToPage(page){
      router.push(page)
    }
  },
  computed: {
    ...mapState(["loggedUser"]),
  },
  data: () => ({
    headerItens:[{value:'Home', path: '/', isLoggedIn: false}, {value:'Profile', path: '/profile', isLoggedIn: true},{value:'Dieta', path: '/diet', isLoggedIn: true},{value:'Follow Up', path: '/followUp', isLoggedIn: true}],
    menuItens: ['Fazer Login', 'Fazer Cadastro'],
    tab:0,
  }),
};
</script>
