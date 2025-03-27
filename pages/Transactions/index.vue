<template>
  <NuxtLayout>
    <template v-slot:left-sheet>
      <Transfers />
    </template>

    <template v-slot:right-sheet>
      <TransferForm />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import TransferForm from "~/components/TransferForm.vue";
import Transfers from "~/components/Transfers.vue";
</script>
