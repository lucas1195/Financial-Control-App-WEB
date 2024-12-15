<template>
  <v-card class="pa-8">
    <v-card-title> Life Saving Plan </v-card-title>
    <Line :data="data" :options="options" ref="barChart" />
    <v-divider class="ma-10" />
    <h4>Week Stats</h4>
    <div class="ma-6">
      <v-row
        class="d-flex justify-center align-center"
        align="center"
        justify="center"
      >
        <v-col class="text-center">
          <div class="d-flex justify-start align-start mb-2">Priority:</div>
          <v-progress-linear
            color="light-blue"
            height="10"
            model-value="10"
            striped
            style="max-width: 250px; margin-right: 20px; height: 25px"
            rounded
            class="d-flex justify-center align-center"
          ></v-progress-linear>
        </v-col>

        <v-col class="text-center">
          <div class="d-flex justify-start align-start mb-2">Personal:</div>
          <v-progress-linear
            color="light-green-darken-4"
            height="10"
            model-value="20"
            striped
            style="max-width: 250px; margin-right: 20px; height: 25px"
            rounded
          ></v-progress-linear>
        </v-col>

        <v-col class="text-center">
          <div class="d-flex justify-start align-start mb-2">Savings:</div>
          <v-progress-linear
            color="lime"
            height="10"
            model-value="45"
            striped
            style="max-width: 250px; margin-right: 20px; height: 25px"
            rounded
          ></v-progress-linear>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import moment from "moment";
import { Bar, Doughnut, Pie, Line } from "vue-chartjs";
import { useAxios } from "~/composables/useAxios";
import type { Transfer } from "~/types/Transfer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const { $axios } = useAxios();

const options = {
  responsive: true,
};
const transfersValues = ref();
const transfersLabels = ref();

onMounted(async () => {
  await getTransfersByPeriod();
});

const getTransfersByPeriod = async () => {
  const filter = {
    accountId: 2,
    FilterType: "Last12Months",
  };

  try {
    let result = await $axios.get("/DashBoard/GetByPeriod", {
      params: filter,
    });

    transfersValues.value = result.data.map(
      (transfer: Transfer) => transfer.transferAmount
    );

    transfersLabels.value = result.data.map((transfer: Transfer) =>
      moment(transfer.transferDate).format("DD/MM/YYYY HH:mm")
    );

    return transfersValues.value;
  } catch (error) {
    console.error(error);
  }
};

const data = computed(() => {
  return {
    labels: transfersLabels.value,
    datasets: [
      {
        data: transfersValues.value,
        label: "Spending Total",
        backgroundColor: "surface-variant",
        borderColor: "#7F8C8D",
        borderWidth: 2,
      },
    ],
  };
});
</script>
