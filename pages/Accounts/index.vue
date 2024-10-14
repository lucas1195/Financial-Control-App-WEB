<template>
  <NuxtLayout>
    <template v-slot:left-sheet>
      <AccountList />
    </template>

    <template v-slot:right-sheet>
      <AccountForm />
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup></script>
