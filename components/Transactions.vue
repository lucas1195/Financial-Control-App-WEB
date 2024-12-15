<template>
  <v-card flat>
    <v-card-title>All Spendings</v-card-title>
    <v-card-item>
      <v-list lines="three" select-strategy="classic">
        <v-list-item
          v-for="(transfer, index) in visiblePages"
          :key="index"
          :value="index"
        >
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-btn
                x-small
                rounded
                :icon="getIcon(transfer)"
                :color="getColor(transfer)"
              >
              </v-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title :name="index"
            >{{ transfer.transferAmount }}
          </v-list-item-title>
          <v-list-item-subtitle :name="index"
            >{{ transfer.transferDescription }}
          </v-list-item-subtitle>

          <template v-slot:append>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props" flat />
              </template>
              <v-list>
                <v-list-item value="1">
                  <v-list-item-title>Editar</v-list-item-title>
                </v-list-item>
                <v-list-item value="2">
                  <v-list-item-title>Deletar</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-list-item>
        <v-pagination
          v-if="data.length > 1"
          v-model="page"
          :length="Math.ceil(data.length / perPage)"
          variant="tonal"
        ></v-pagination>
      </v-list>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
//******IMPORTS*******"
import { useAxios } from "~/composables/useAxios";
import { GetAllTransfersReturn } from "~/types/FinancesControl/GetAllTransfersReturn";
//******IMPORTS*******"

//******COMPOSABLES*******"
const { $axios } = useAxios();
//******COMPOSABLES*******"

//******PROPS*******"

//******PROPS*******"

//******EMITS*******"

//******EMITS*******"

//******VARIAVEIS*******"
const data = ref<GetAllTransfersReturn[]>([]);
const page = ref(1);
const perPage = ref(6);
//******VARIAVEIS*******"

//******WATCHS*******"

//******WATCHS*******"

//******COMPUTEDS*******"
const visiblePages = computed(() => {
  const start = (page.value - 1) * perPage.value;
  const end = page.value * perPage.value;
  return data.value.slice(start, end);
});
//******COMPUTEDS*******"

//******LIFECYCLE HOOKS*******"
onMounted(async () => {
  await GetAllTransfers();
});
//******LIFECYCLE HOOKS*******"

//******METHODS*******"
const GetAllTransfers = async () => {
  const filter = {
    AccountId: 2,
  };

  try {
    let result = await $axios.get("Transfer/GetAllTranfersByUser", {
      params: filter,
    });

    data.value = result.data;
  } catch (error) {
    console.error(error);
  }
};

const getIcon = (transaction: any): string => {
  switch (transaction.categoryId) {
    case 1:
      return "mdi-home-currency-usd";
    case 2:
      return "mdi-food";
    case 3:
      return "mdi-account";
    case 4:
      return "mdi-movie-open";
    case 5:
      return "mdi-television";
    case 6:
      return "mdi-chart-line";
    case 7:
      return "mdi-alert-circle";
    case 8:
      return "mdi-paw";
    case 9:
      return "mdi-bank";
    default:
      return "mdi-help-circle";
  }
};

const getColor = (transaction: any): string => {
  switch (transaction.categoryId) {
    case 1:
      return "#E46651";
    case 2:
      return "#41B883";
    case 3:
      return "#2196F3";
    case 4:
      return "#F4A261";
    case 5:
      return "#A3D5D3";
    case 6:
      return "#B2A4FF";
    case 7:
      return "#F7C5C5";
    case 8:
      return "#C1D9A7";
    case 9:
      return "#D3C4F3";
    default:
      return "#CCCCCC";
  }
};
//******METHODS*******"

//******OUTROS*******"

//******OUTROS*******"

//******EXPOSE*******"

//******EXPOSE*******"
</script>
