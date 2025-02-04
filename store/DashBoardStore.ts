export const useDashBoardStore = defineStore("dashBoardStore", () => {
  const currentAccountId = ref<Number>();

  const SetCurrentAccountId = (accountId: Number) => {
    currentAccountId.value = accountId;
  };

  const $currentAccountId = computed(() => {
    return currentAccountId.value;
  });

  return {
    $currentAccountId,
    SetCurrentAccountId,
  };
});
