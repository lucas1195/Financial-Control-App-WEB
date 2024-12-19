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
            color="#FF5733"
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
            color="#4A90E2"
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
            color="#66BB6A"
            height="10"
            model-value="45"
            striped
            style="max-width: 250px; margin-right: 20px; height: 25px"
            rounded
          ></v-progress-linear>
        </v-col>
      </v-row>
    </div>

    <v-row
      class="d-flex justify-center align-center mt-16"
      align="center"
      justify="center"
    >
      <v-btn class="mr-4">Go Back</v-btn>
      <v-btn @click="showDialogFullLogs = true">Full Logs</v-btn>
    </v-row>
  </v-card>
  <FinancialPlanFullLogsDialog
    :showDialog="showDialogFullLogs"
    @close="showDialogFullLogs = false"
  />
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
import { Bar, Doughnut, Pie, Line } from "vue-chartjs";
import { useAxios } from "~/composables/useAxios";
import type { FinancialPlanLogs } from "~/types/FinancesControl/FinancialPlanLogs";

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

const priorityList = ref<number[]>([]);
const personalList = ref<number[]>([]);
const showDialogFullLogs = ref(false);

onMounted(async () => {
  await GetFinancialPlanLogs();
});

const GetFinancialPlanLogs = async () => {
  try {
    let result = await $axios.get<FinancialPlanLogs[]>(
      "/FinancialPlan/GetFinancialPlanLogs?financialPlanId=1"
    );

    let response = result.data;

    priorityList.value = response.map((x) => x.prioritySpent);
    personalList.value = response.map((x) => x.personalSpent);
  } catch (error) {
    console.error(error);
  }
};

const data = computed(() => {
  return {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        data: priorityList.value,
        label: "Priority Total",
        backgroundColor: "#FFA07A",
        borderColor: "#FF5733",
        borderWidth: 2,
      },
      {
        data: personalList.value,
        label: "Personal Total",
        backgroundColor: "#87CEFA",
        borderColor: "#4A90E2",
        borderWidth: 2,
      },
    ],
  };
});
</script>
