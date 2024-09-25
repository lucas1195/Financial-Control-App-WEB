<template>
  <NuxtLayout>
    <template v-slot:left-sheet>
      <Transactions />
    </template>

    <template v-slot:right-sheet>
      <Analytics />
    </template>
  </NuxtLayout>
</template>
