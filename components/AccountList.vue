<template>
  <v-container class="table-container">
    <v-data-table
      :items="accountsReturn"
      :headers="headers"
      class="rounded-lg pa-5 custom-elevation"
      elevation="8"
    >
      <template v-slot:item.transactionType="{ item }">
        {{ item.transactionType == 0 ? "Debit" : "Credit" }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts" setup>
//******IMPORTS*******"
import { useAxios } from "~/composables/useAxios";
import type { GetAccountsByUserReturn } from "~/types/FinancesControl/GetAccountsByUserReturn";
//******IMPORTS*******"

//******COMPOSABLES*******"
const { $axios } = useAxios();
//******COMPOSABLES*******"

//******PROPS*******"

//******PROPS*******"

//******EMITS*******"

//******EMITS*******"

//******VARIAVEIS*******"
const accountsReturn = ref<GetAccountsByUserReturn[]>([]);
const headers = ref([
  {
    title: "Account ID",
    align: "center",
    key: "accountId",
    sortable: true,
  },
  {
    title: "User ID",
    align: "center",
    key: "userId",
    sortable: true,
  },
  {
    title: "User Name",
    align: "start",
    key: "userName",
    sortable: true,
  },
  {
    title: "Institution Name",
    align: "start",
    key: "institutionName",
    sortable: true,
  },
  {
    title: "Agency Number",
    align: "center",
    key: "agencyNumber",
    sortable: true,
  },
  {
    title: "Account Number",
    align: "center",
    key: "accountNumber",
    sortable: true,
  },
  {
    title: "Balance",
    align: "end",
    key: "balance",
    sortable: true,
  },
  {
    title: "Account Flag ID",
    align: "center",
    key: "accountFlagId",
    sortable: true,
  },
  {
    title: "Account Flag Name",
    align: "start",
    key: "accountFlagName",
    sortable: true,
  },
  {
    title: "Transaction Type",
    align: "center",
    key: "transactionType",
    sortable: true,
  },
]);
//******VARIAVEIS*******"

//******WATCHS*******"

//******WATCHS*******"

//******COMPUTEDS*******"

//******COMPUTEDS*******"

//******LIFECYCLE HOOKS*******"
onMounted(async () => {
  await GetAllAccountsByUser();
});
//******LIFECYCLE HOOKS*******"

//******METHODS*******"
const GetAllAccountsByUser = async () => {
  try {
    let result = await $axios.get("Account/GetAccountsByUser");
    accountsReturn.value = result.data;
  } catch (error) {
    console.error(error);
  }
};
//******METHODS*******"

//******OUTROS*******"

//******OUTROS*******"

//******EXPOSE*******"

//******EXPOSE*******"
</script>

<style scoped>
.custom-elevation {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2), 0px 8px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
}

.table-container {
  padding: 0;
}
</style>
