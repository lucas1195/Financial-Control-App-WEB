<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" elevation="4">
      <v-img height="65" cover color="grey darken-4">
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

      <router-link v-for="(item, i) in menuItems" :to="item.to">
        <v-list :lines="false" density="compact" nav>
          <v-list-item :key="i" :value="item" color="primary">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </router-link>
    </v-navigation-drawer>

    <v-app-bar color="grey darken-4" elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <v-img width="120" />
      </v-app-bar-title>
    </v-app-bar>

    <v-main
      class="bg-grey-lighten-3 d-flex align-center justify-center"
      style="height: 100vh"
    >
      <v-container class="pa-5 fill-height">
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
            ></v-text-field>

            <v-sheet
              class="pa-6 mt-4 align-center justify-center v-sheet-custom"
              elevation="4"
            >
              <slot name="left-sheet"></slot>
            </v-sheet>
          </v-col>

          <v-col cols="12" md="6" class="d-flex flex-column">
            <v-sheet class="pa-6 v-sheet-custom" elevation="4">
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
    { text: "DashBoard", icon: "mdi-folder", to: "/" },
    { text: "Transactions", icon: "mdi-account-multiple", to: "/Transactions" },
  ];
});
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

.app-bar {
  background-color: #2e2e2e;
}

.v-sheet-custom {
  border-radius: 40px;
  flex-grow: 1;
  max-height: 100%;
  overflow-y: auto;
}
</style>
