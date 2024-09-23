<template>
  <NuxtLayout>
    <template v-slot:left-sheet>
      <!-- Componente específico para o sheet da esquerda -->
      <DashBoard />
    </template>

    <template v-slot:right-sheet>
      <!-- Componente específico para o sheet da direita -->
      <Analytics />
    </template>
  </NuxtLayout>
</template>
