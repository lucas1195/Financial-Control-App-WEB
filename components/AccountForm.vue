<template>
  <v-card class="rounded-lg pa-5" elevation="8">
    <v-card-title> Create a New Account </v-card-title>
    <form @submit.prevent="submit">
      <v-row>
        <v-col md="6">
          <v-text-field
            v-model="accountName.value.value"
            :counter="10"
            :error-messages="accountName.errorMessage.value"
            label="Account Name"
          ></v-text-field>
        </v-col>
        <v-col md="6">
          <v-text-field
            v-model="agencyNumber"
            label="Agency Number"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="6">
          <v-text-field
            v-model="accountNumber"
            label="Account Number"
          ></v-text-field>
        </v-col>
        <v-col md="6">
          <v-text-field
            v-model="institutionName.value.value"
            :error-messages="institutionName.errorMessage.value"
            label="Institution Name"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="">
        <v-col md="6">
          <v-text-field
            v-model="balance.value.value"
            :error-messages="balance.errorMessage.value"
            label="Account Balance"
          ></v-text-field>
        </v-col>
        <v-col md="6">
          <v-select
            v-model="accountFlag.value.value"
            :error-messages="accountFlag.errorMessage.value"
            :items="accountFlagValues"
            item-title="accountFlagName"
            item-value="accountFlagId"
            label="Account Flag"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="6">
          <v-checkbox
            v-model="transactionType.value.value"
            :error-messages="transactionType.errorMessage.value"
            label="Debit"
            type="checkbox"
            value="0"
          ></v-checkbox>
        </v-col>
        <v-col md="6">
          <v-checkbox
            v-model="transactionType.value.value"
            :error-messages="transactionType.errorMessage.value"
            label="Credit"
            type="checkbox"
            value="1"
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-btn class="me-4" type="submit" color="#198754">submit</v-btn>
      <v-btn @click="handleReset" color="primary">clear</v-btn>
    </form>
  </v-card>
</template>

<script lang="ts" setup>
//******IMPORTS*******"
import { useField, useForm } from "vee-validate";
import { Account } from "~/types/Account";
//******IMPORTS*******"

//******COMPOSABLES*******"
const { $axios } = useAxios();
//******COMPOSABLES*******"

//******PROPS*******"

//******PROPS*******"

//******EMITS*******"

//******EMITS*******"

//******VARIAVEIS*******"

const accountFlagValues = ref([
  {
    accountFlagId: 2,
    accountFlagName: "Visa",
  },
  {
    accountFlagId: 3,
    accountFlagName: "Mastercard",
  },
  {
    accountFlagId: 4,
    accountFlagName: "American Express",
  },
]);
//******VARIAVEIS*******"

//******WATCHS*******"

//******WATCHS*******"

//******COMPUTEDS*******"

//******COMPUTEDS*******"

//******LIFECYCLE HOOKS*******"

//******LIFECYCLE HOOKS*******"

//******METHODS*******"
const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    accountName(value: any) {
      if (value?.length >= 2) return true;

      return "Account Name needs to be at least 2 characters.";
    },
    institutionName(value: any) {
      if (value?.length >= 2) return true;

      return "Institution Name needs to be at least 2 characters.";
    },
    balance(value: any) {
      if (!value) {
        return "Balance is required.";
      }

      if (isNaN(Number(value))) {
        return "Balance must be a number.";
      }

      if (value < 0) {
        return "Balance cannot be negative.";
      }

      return true;
    },
    accountFlag(value: any) {
      if (value) return true;

      return "Select an Account Flag.";
    },
    transactionType(value: any) {
      if (value) return true;

      return "You must select either Debit or Credit.";
    },
  },
});

const agencyNumber = ref(null);
const accountNumber = ref(null);
const accountName = useField("accountName");
const institutionName = useField("institutionName");
const accountFlag = useField("accountFlag");
const balance = useField("balance");
const transactionType = useField("transactionType");

const submit = handleSubmit(async (values) => {
  try {
    let params = new Account();

    params.userId = 1;
    params.agencyNumber = agencyNumber.value || undefined;
    params.accountNumber = accountNumber.value || undefined;
    params.accountName = String(values.accountName);
    params.institutionName = String(values.institutionName);
    params.accountFlagId = Number(values.accountFlag);
    params.balance = Number(values.balance);
    params.transactionType = Number(values.transactionType);

    // alert(JSON.stringify(params, null, 2));

    await $axios.post("Account/InsertAccount", params);
  } catch (error) {
    console.error(error);
  } finally {
  }
});
//******METHODS*******"

//******OUTROS*******"

//******OUTROS*******"

//******EXPOSE*******"

//******EXPOSE*******"
</script>

<style scoped>
.v-col {
  padding-bottom: 0;
  padding-top: 0;
}
</style>
