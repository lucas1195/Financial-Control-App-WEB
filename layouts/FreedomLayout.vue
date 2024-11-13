<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" elevation="4">
      <v-img height="65" cover color="#27ae60">
        <v-list>
          <v-list-item
            title="Finances Control"
            subtitle="Lucas Laurindo"
            color="primary"
          >
          </v-list-item>
        </v-list>
      </v-img>
      <v-divider></v-divider>

      <router-link v-for="(item, i) in menuItems" :to="item.to" :key="i">
        <v-list :lines="false" nav>
          <v-list-item :value="item" color="primary">
            <template v-slot:prepend>
              <v-icon
                :icon="item.icon"
                style="font-size: 30px; color: #27ae63"
              ></v-icon>
            </template>

            <v-list-item-title
              v-text="item.text"
              style="
                font-size: 16px;
                font-style: normal;
                color: black;
                font-family: 'Vorkurs', sans-serif;
              "
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </router-link>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center v-main-custom">
      <v-container>
        <h1 class="mb-2 h2-custom">Hello, Lucas!</h1>

        <v-col cols="12">
          <v-container class="pa-6" elevation="8">
            <slot></slot>
          </v-container>
        </v-col>

        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
//******IMPORTS*******"
import moment from "moment";
//******IMPORTS*******"

//******COMPOSABLES*******"

//******COMPOSABLES*******"

//******PROPS*******"

//******PROPS*******"

//******EMITS*******"

//******EMITS*******"

//******VARIAVEIS*******"
const drawer = ref(true);
const menuItems = computed(() => {
  return [
    { text: "DashBoard", icon: "mdi-finance", to: "/DashBoard" },
    { text: "Transactions", icon: "mdi-credit-card", to: "/Transactions" },
    { text: "Accounts", icon: "mdi-bank", to: "/Accounts" },
    {
      text: "Financial Plans",
      icon: "mdi-file-document",
      to: "/FinancialPlans",
    },
  ];
});
const currentDate = ref(moment().format("DD/MM/YYYY HH:mm"));
//******VARIAVEIS*******"

//******WATCHS*******"

//******WATCHS*******"

//******COMPUTEDS*******"

//******COMPUTEDS*******"

//******LIFECYCLE HOOKS*******"

//******LIFECYCLE HOOKS*******"

//******METHODS*******"

//******METHODS*******"

//******OUTROS*******"

//******OUTROS*******"

//******EXPOSE*******"

//******EXPOSE*******"
</script>

<style scoped>
a {
  text-decoration: none;
  color: #505050;
}

.fill-height {
  height: 100%;
}

.v-main-custom {
  height: 100%;
  background-color: #27ae60;
  background-size: cover;
  background-position: center;
}

.v-sheet {
  border-radius: 20px;
  max-height: 100%;
  overflow-y: auto;
}

.h2-custom {
  font-family: "Vorkurs", sans-serif;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.app-bar-background {
  background-color: #27ae60;
  background-size: cover;
  background-position: center;
}
</style>
