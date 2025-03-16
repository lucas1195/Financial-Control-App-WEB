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
          class="mt-12 position-relative d-flex flex-column align-center justify-center text-center"
        >
          <v-row>
            <div
              v-if="showBalance"
              class="text-h3"
              style="font-family: 'Vorkurs', sans-serif"
            >
              {{ formatCurrency(account.balance) }}
            </div>
            <div v-else>
              <p class="text-h3">******</p>
            </div>
            <v-icon
              v-if="!showBalance"
              icon="mdi mdi-eye-outline"
              @click="showBalance = !showBalance"
              size="x-small"
              class="ml-2"
            ></v-icon>
            <v-icon
              v-else
              icon="mdi-eye-off-outline"
              @click="showBalance = !showBalance"
              size="x-small"
              class="ml-2"
            ></v-icon>
          </v-row>
        </v-card-text>
        <v-row>
          <p class="account-number">{{ account.accountNumber }}</p>
          <v-img
            :src="SelectAccountFlagImg(account.accountFlagId)"
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
import visaLogo from "~/assets/img/AccountFlagLogos/visaLogo.jpg";
import masterCardLogo from "~/assets/img/AccountFlagLogos/masterCardLogo.png";
import americanExpressLogo from "~/assets/img/AccountFlagLogos/americanExpressLogo.png";
import { useDashBoardStore } from "~/store/DashBoardStore";
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
const accountsReturn = ref<GetAccountsByUserReturn[]>([]);
const loading = ref(false);
const showBalance = ref(false);
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

    const firstAccount = accountsReturn?.value[0];

    if (firstAccount == null) {
      return;
    }

    dashBoardStore.SetCurrentAccountId(Number(firstAccount.accountId));
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

  if (!currentAccount) {
    return;
  }

  dashBoardStore.SetCurrentAccountId(Number(currentAccount.accountId));
};

const SelectAccountFlagImg = (accountFlagId?: number) => {
  switch (accountFlagId) {
    case 2:
      return visaLogo;
    case 3:
      return masterCardLogo;
    case 4:
      return americanExpressLogo;
    default:
      return "";
  }
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
