<template>
  <AccountCard />
  <v-divider class="ma-4" />
  <v-card flat>
    <v-card-title>Latest Spending</v-card-title>
    <v-card-item>
      <v-list
        lines="three"
        select-strategy="classic"
        style="max-height: 200px; overflow-y: auto"
      >
        <v-list-subheader>General Spendings</v-list-subheader>
        <v-list-item
          v-for="(task, index) in data.transferencias"
          :key="index"
          :value="index"
        >
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn
                :name="`btn_${index}`"
                :model-value="isActive"
              ></v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title :name="index">{{ task.nome }} </v-list-item-title>
          <v-list-item-subtitle :name="index"
            >{{ task.descricao }}
          </v-list-item-subtitle>

          <template v-slot:append>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-dots-vertical"
                  color="surface-variant"
                  v-bind="props"
                />
              </template>
              <v-list>
                <v-list-item value="1">
                  <v-list-item-title>Editar</v-list-item-title>
                </v-list-item>
                <v-list-item value="2">
                  <v-list-item-title>Deletar</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-list-item>
      </v-list>
    </v-card-item>
  </v-card>
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
const data = {
  transferencias: [
    {
      nome: "Pagamento Aluguel",
      valor: 1200.0,
      descricao: "Transferência para o aluguel mensal",
    },
    {
      nome: "Pagamento Cartão",
      valor: 500.0,
      descricao: "Pagamento da fatura do cartão de crédito",
    },
    {
      nome: "Depósito Conta Poupança",
      valor: 300.0,
      descricao: "Transferência para a conta poupança",
    },
    {
      nome: "Compra Supermercado",
      valor: 250.75,
      descricao: "Pagamento de compras no supermercado",
    },
    {
      nome: "Transferência para Amigo",
      valor: 150.0,
      descricao: "Transferência para amigo por PIX",
    },
    {
      nome: "Transferência para Amigo",
      valor: 150.0,
      descricao: "Transferência para amigo por PIX",
    },
    {
      nome: "Transferência para Amigo",
      valor: 150.0,
      descricao: "Transferência para amigo por PIX",
    },
    {
      nome: "Transferência para Amigo",
      valor: 150.0,
      descricao: "Transferência para amigo por PIX",
    },
  ],
};

const page = ref(1);
const perPage = ref(4);
const pages = ref(data.transferencias);

const visiblePages = () => {
  return pages.value.slice(
    (page.value - 1) * perPage.value,
    page.value * perPage.value
  );
};
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
