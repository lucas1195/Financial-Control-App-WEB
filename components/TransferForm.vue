<template>
  <v-card class="rounded-lg pa-5" elevation="8">
    <v-card-title class="mb-4"> Register new Tranfers </v-card-title>
    <v-btn @click="showPorcessingResultsDialog = true">Import PDF</v-btn>
  </v-card>
  <TransfersPorcessingDialog
    :showDialog="showPorcessingResultsDialog"
    @close="showPorcessingResultsDialog = false"
  />
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
const showPorcessingResultsDialog = ref(false);
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
