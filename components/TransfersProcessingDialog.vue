<template>
  <div class="pa-4 text-center">
    <v-dialog max-width="1200" v-model="props.showDialog">
      <v-card>
        <template v-slot:text>
          <v-card class="pa-2" flat>
            <v-card-text> You should see the Pdf extraction here </v-card-text>
            <v-btn
              @click="GetPdfReadingResults"
              v-if="processingResults.length == 0"
              >Get Your Data</v-btn
            >
            <v-container>
              <v-skeleton-loader
                v-if="loading"
                type="card"
                height="300px"
                class="mb-4"
              />
              <v-data-table
                v-else
                v-model:items="processingResults"
                :headers="headers"
                item-value="transferId"
                class="elevation-1"
                dense
              >
                <template v-slot:item.transferAmount="{ item }">
                  <v-text-field
                    v-model="item.transferAmount"
                    type="number"
                    dense
                    hide-details
                    variant="outlined"
                  />
                </template>

                <template v-slot:item.transferDescription="{ item }">
                  <v-text-field
                    v-model="item.transferDescription"
                    dense
                    hide-details
                    variant="outlined"
                  />
                </template>

                <template v-slot:item.transferDate="{ item }">
                  <v-text-field
                    v-model="item.transferDate"
                    type="datetime-local"
                    dense
                    hide-details
                    variant="outlined"
                  />
                </template>

                <template v-slot:item.categoryId="{ item }">
                  <v-select
                    v-model="item.categoryId"
                    :items="categoriesList"
                    type="number"
                    item-title="categoryName"
                    item-value="categoryId"
                    dense
                    hide-details
                    clearable
                    variant="outlined"
                  />
                </template>

                <template v-slot:item.accountId="{ item }">
                  <v-text-field
                    v-model="item.accountId"
                    type="number"
                    dense
                    hide-details
                    variant="outlined"
                  />
                </template>

                <template v-slot:item.actions="{ item }">
                  <v-btn icon color="red" @click="deleteItem(item)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-container>
          </v-card>
        </template>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text="Process"
            variant="elevated"
            @click="emit('close')"
          ></v-btn>
          <v-btn
            color="red-darken-2"
            text="Close"
            variant="elevated"
            @click="emit('close')"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
//******IMPORTS*******"
import type { Category } from "~/types/Category";
import { Transfer } from "~/types/Transfer";
//******IMPORTS*******"

//******COMPOSABLES*******"
const { $axios } = useAxios();
//******COMPOSABLES*******"

//******PROPS*******"
const props = defineProps({
  showDialog: {
    type: Boolean,
  },
});
//******PROPS*******"

//******EMITS*******"
const emit = defineEmits(["close", "confirm", "reload"]);
//******EMITS*******"

//******VARIAVEIS*******"
const loading = ref(false);
const processingResults = ref<Transfer[]>([]);
const categoriesList = ref<Category[]>([]);
const headers = [
  { title: "Amount", key: "transferAmount", width: "80px" },
  { title: "Description", key: "transferDescription", width: "200px" },
  { title: "Date", key: "transferDate", width: "150px" },
  { title: "Category ID", key: "categoryId", width: "150px" },
  { title: "Account ID", key: "accountId", width: "100px", align: "center" },
  { title: "Actions", key: "actions", width: "100px", align: "center" },
];
//******VARIAVEIS*******"

//******WATCHS*******"
watch(
  () => props.showDialog,
  (isOpen) => {
    if (!isOpen) {
      processingResults.value = [];
    }
  }
);
//******WATCHS*******"

//******COMPUTEDS*******"

//******COMPUTEDS*******"

//******LIFECYCLE HOOKS*******"
onMounted(async () => {});
//******LIFECYCLE HOOKS*******"

//******METHODS*******"
const GetPdfReadingResults = async () => {
  try {
    loading.value = true;
    await GetCategories();
    const result = await $axios.get<Transfer[]>("/PdfReader/PdfReaderItauBank");

    if (result.data !== undefined && result.data.length > 0) {
      processingResults.value = result.data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const GetCategories = async () => {
  try {
    const result = await $axios.get<Category[]>("Category/GetAllCategories");
    if (result.data !== undefined && result.data.length > 0) {
      categoriesList.value = result.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteItem = (item: Transfer) => {
  if (!item) {
    return;
  }

  const index = processingResults.value.findIndex(
    (t: Transfer) => t.transferId === item.transferId
  );

  if (index !== -1) {
    processingResults.value.splice(index, 1);
  }
};
//******METHODS*******"

//******OUTROS*******"

//******OUTROS*******"

//******EXPOSE*******"

//******EXPOSE*******"
</script>
