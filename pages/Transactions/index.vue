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
