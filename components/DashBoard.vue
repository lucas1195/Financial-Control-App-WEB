<template>
  <AccountCard />
  <v-divider class="ma-4" />
  <LatestSpendings />
</template>

<script setup lang="ts">
//******IMPORTS*******"
import { useDashBoardStore } from "~/store/DashBoardStore";
import type { Transfer } from "~/types/Transfer";
import LatestSpendings from "./LatestSpendings.vue";
//******IMPORTS*******"

//******COMPOSABLES*******"
const { $axios } = useAxios();
const dashBoardStore = useDashBoardStore();
//******COMPOSABLES*******"

//******PROPS*******"

//******PROPS*******"

//******EMITS*******"

//******EMITS*******"

//******VARIAVEIS*******"
const data = ref<Transfer[]>([]);
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
