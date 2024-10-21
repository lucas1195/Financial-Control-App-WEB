<template>
  <v-card flat>
    <v-card-title> Create a New Account </v-card-title>
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="name.value.value"
        :counter="10"
        :error-messages="name.errorMessage.value"
        label="Name"
        :rounded="20"
        variant="solo-filled"
      ></v-text-field>

      <v-text-field
        v-model="phone.value.value"
        :counter="7"
        :error-messages="phone.errorMessage.value"
        label="Phone Number"
        variant="solo-filled"
      ></v-text-field>

      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
        variant="solo-filled"
      ></v-text-field>

      <v-select
        v-model="select.value.value"
        :error-messages="select.errorMessage.value"
        :items="items"
        label="Select"
        variant="solo-filled"
      ></v-select>

      <v-checkbox
        v-model="checkbox.value.value"
        :error-messages="checkbox.errorMessage.value"
        label="Option"
        type="checkbox"
        value="1"
      ></v-checkbox>

      <v-btn class="ma-4" type="submit" color="#198754"> submit </v-btn>

      <v-btn @click="handleReset" color="primary"> clear </v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts" setup>
//******IMPORTS*******"
import { useField, useForm } from "vee-validate";
//******IMPORTS*******"

//******COMPOSABLES*******"

//******COMPOSABLES*******"

//******PROPS*******"

//******PROPS*******"

//******EMITS*******"

//******EMITS*******"

//******VARIAVEIS*******"
const accountModel = ref<Conta>();
const name = useField("name");
const phone = useField("phone");
const email = useField("email");
const select = useField("select");
const checkbox = useField("checkbox");

const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);
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
const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value: string | any[]) {
      if (value?.length >= 2) return true;

      return "Name needs to be at least 2 characters.";
    },
    phone(value: string) {
      if (/^[0-9-]{7,}$/.test(value)) return true;

      return "Phone number needs to be at least 7 digits.";
    },
    email(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },
    select(value: boolean) {
      if (value) return true;

      return "Select an item.";
    },
    checkbox(value: string) {
      if (value === "1") return true;

      return "Must be checked.";
    },
  },
});

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
//******OUTROS*******"

//******EXPOSE*******"

//******EXPOSE*******"
</script>
