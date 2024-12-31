<template>
  <v-skeleton-loader v-if="loading" type="card" height="300px" class="mb-4" />
  <v-carousel
    v-else
    show-arrows="hover"
    hide-delimiters
    height="300px"
    @update:modelValue="onCarouselChange"
  >
    <v-carousel-item v-for="(account, i) in accountsReturn" :key="i">
      <v-card height="275" color="surface-variant" rounded="lg" elevation="8">
        <v-card-title>{{ account.institutionName }}</v-card-title>
        <v-card-text
          class="text-h3 mt-12 position-relative d-flex flex-column align-center justify-center text-center"
          style="font-family: 'Vorkurs', sans-serif"
        >
          {{ formatCurrency(account.balance) }}
        </v-card-text>
        <v-row>
          <p class="account-number">{{ account.accountNumber }}</p>
          <v-img
            src="assets/masterCardLogo.png"
            width="50"
            class="account-card"
            rounded="lg"
          >
          </v-img>
        </v-row>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
//******IMPORTS*******"
import { GetAccountsByUserReturn } from "~/types/FinancesControl/GetAccountsByUserReturn";
import { useAxios } from "~/composables/useAxios";
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
const loading = ref(false);
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
    loading.value = true;
    let result = await $axios.get("Account/GetAccountsByUser");
    accountsReturn.value = result.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const formatCurrency = (value: Number | undefined) => {
  if (!value) {
    return "";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
};

const onCarouselChange = (newIndex: any) => {
  const currentAccount = accountsReturn.value[newIndex];
  alert(
    `Carousel OnChange is working! Account ID: ${currentAccount.accountId}`
  );
};
//******METHODS*******"

//******OUTROS*******"

//******OUTROS*******"

//******EXPOSE*******"

//******EXPOSE*******"
</script>

<style scoped>
.account-card {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.account-number {
  bottom: 20px;
  right: 20px;
  margin-top: 70px;
  margin-left: 35px;
}
</style>
