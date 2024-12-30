<template>
  <div class="pa-4 text-center">
    <v-dialog max-width="1200" v-model="props.showDialog">
      <v-card>
        <template v-slot:text>
          <v-card class="pa-2" flat>
            <v-card-text>
              <div v-for="(data, index) in formattedData">
                <p
                  style="
                    font-weight: 600;
                    font-style: unset;
                    font-size: 1.3rem;
                    font-family: 'Vorkurs', sans-serif;
                  "
                >
                  Week Start: {{ moment(data.weekStart).format("DD/MM/YYYY") }}
                </p>

                <Line :key="index" :data="data.data" :options="options" />
                <p
                  class="d-flex justify-center align-center mt-6"
                  align="center"
                  justify="center"
                  :style="{
                    color: Number(data.weekBalance) < 0 ? '#ff3333' : '#33cc33',
                    fontWeight: '900',
                    fontStyle: 'unset',
                    fontSize: '1.8rem',
                    fontFamily: 'Vorkurs, sans-serif',
                  }"
                >
                  {{ formatCurrency(data.weekBalance) }}
                </p>
                <v-divider class="ma-8" />
              </div>
            </v-card-text>
          </v-card>
        </template>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red-darken-2"
            text="Fechar"
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
import moment from "moment";
import { useAxios } from "~/composables/useAxios";
import type { WeeklyFinancialPlanLogs } from "~/types/FinancesControl/WeeklyFinancialPlanLogs";

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
//******IMPORTS*******"

//******COMPOSABLES*******"
const { $axios } = useAxios();
//******COMPOSABLES*******"

//******PROPS*******"
const props = defineProps({
  showDialog: {
    type: Boolean,
  },
  task: {
    type: Object,
  },
  currentIndex: {
    type: Object,
  },
});
//******PROPS*******"

//******EMITS*******"
const emit = defineEmits(["close", "confirm", "reload"]);
//******EMITS*******"

//******VARIAVEIS*******"
const weeklyLogsResponse = ref<WeeklyFinancialPlanLogs[]>([]);
const options = {
  responsive: true,
};
//******VARIAVEIS*******"

//******WATCHS*******"

//******WATCHS*******"

//******COMPUTEDS*******"
const formattedData = computed(() => {
  return weeklyLogsResponse.value.map((item) => {
    const prioritySpent = item.dailyData?.map((day) => day.prioritySpent);
    const personalSpent = item.dailyData?.map((day) => day.personalSpent);

    return {
      weekStart: item.weekStartDate,
      weekBalance: item.weekBalance,
      data: {
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
            data: prioritySpent,
            label: "Priority Total",
            backgroundColor: "#FFA07A",
            borderColor: "#FF5733",
            borderWidth: 2,
          },
          {
            data: personalSpent,
            label: "Personal Total",
            backgroundColor: "#87CEFA",
            borderColor: "#4A90E2",
            borderWidth: 2,
          },
        ],
      },
    };
  });
});
//******COMPUTEDS*******"

//******LIFECYCLE HOOKS*******"
onMounted(async () => {
  await GetFullLogs();
});
//******LIFECYCLE HOOKS*******"

//******METHODS*******"
const GetFullLogs = async () => {
  try {
    let result = await $axios.get<WeeklyFinancialPlanLogs[]>(
      "/FinancialPlan/GetWeeklyFinancialPlanLogs?financialPlanId=1"
    );

    weeklyLogsResponse.value = result.data;
  } catch (error) {
    console.error(error);
  }
};

const formatCurrency = (value: Number | undefined) => {
  if (!value) {
    return "";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
};
//******METHODS*******"

//******OUTROS*******"

//******OUTROS*******"

//******EXPOSE*******"

//******EXPOSE*******"
</script>
