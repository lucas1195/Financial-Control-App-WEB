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
        <h1 class="mb-2 title-custom">Hello, Lucas!</h1>

        <v-row class="fill-height">
          <v-col cols="12" md="6" class="d-flex flex-column">
            <v-text-field
              append-inner-icon="mdi-magnify"
              density="compact"
              label="Search templates"
              variant="solo"
              hide-details
              single-line
              rounded="xl"
              class="mr-6"
              style="flex: 0 0 auto"
              elevation="8"
            ></v-text-field>

            <v-sheet
              class="pa-6 mt-4 align-center justify-center v-sheet-custom"
              elevation="8"
            >
              <slot name="left-sheet"></slot>
            </v-sheet>
          </v-col>

          <v-col cols="12" md="6" class="d-flex flex-column">
            <v-sheet class="pa-6 v-sheet-custom" elevation="8">
              <slot name="right-sheet"></slot>
            </v-sheet>
          </v-col>
        </v-row>

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

.v-sheet-custom {
  border-radius: 40px;
  flex-grow: 1;
  max-height: 100%;
  overflow-y: auto;
}

.title-custom {
  font-family: "Vorkurs", sans-serif;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

h3 {
  font-family: "Roboto", sans-serif;
  font-size: 1.5em;
  color: #666;
  margin-top: 0;
  margin-bottom: 20px;
}

.app-bar-background {
  background-color: #27ae60;
  background-size: cover;
  background-position: center;
}

.v-main-custom {
  height: 100%;
  background-color: #27ae60;
  background-size: cover;
  background-position: center;
}
</style>
