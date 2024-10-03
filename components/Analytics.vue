<template>
  <v-card flat d-flex class="flex-column align-center">
    <v-card-text class="text-h5"> Expenses Statistics </v-card-text>
    <Bar :data="data" :options="options" ref="barChart" />
  </v-card>
  <v-divider class="ma-2" />
  <v-card
    flat
    d-flex
    class="flex-column align-center text-center doughnut-card"
  >
    <Pie
      :data="doughnutData"
      :options="doughnutOptions"
      style="margin-left: 3rem"
    />
  </v-card>
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
} from "chart.js";
import moment from "moment";
import { Bar, Doughnut, Pie } from "vue-chartjs";
import { useAxios } from "~/composables/useAxios";
import { FilterType } from "~/types/enums/FilterType";
import { Transferencia } from "~/types/Transferencia";
//******IMPORTS*******"

//******COMPOSABLES*******"
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const { $axios } = useAxios();
//******COMPOSABLES*******"

//******PROPS*******"

//******PROPS*******"

//******EMITS*******"

//******EMITS*******"

//******VARIAVEIS*******"
const filterType = ref(FilterType.Last6Months);
const valoresTransferencias = ref();
const labelTransferencias = ref();
const categoriesAnalyticsReturn = ref();
const barChart = ref(null);
const options = {
  responsive: true,
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    tooltip: {
      enabled: false,
      // @ts-ignore
      external: function (context) {
        const tooltipModel = context.tooltip;
        let tooltipEl = document.getElementById("chartjs-tooltip");

        if (!tooltipEl) {
          tooltipEl = document.createElement("div");
          tooltipEl.id = "chartjs-tooltip";
          tooltipEl.innerHTML = `
            <div id="tooltip-container">
              <v-card class="tooltip-card">
                <v-card-text id="tooltip-content"></v-card-text>
              </v-card>
            </div>`;
          document.body.appendChild(tooltipEl);
        }

        if (tooltipModel.opacity === 0) {
          // @ts-ignore
          tooltipEl.style.opacity = 0;
          return;
        }

        const content = document.getElementById("tooltip-content");
        if (tooltipModel.body) {
          // @ts-ignore
          const bodyLines = tooltipModel.body.map((b) => b.lines);
          // @ts-ignore
          content.innerHTML = `
            <div style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; background-color: white;">
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f2f2f2;">
                    <th style="padding: 8px; text-align: left;">Description</th>
                    <th style="padding: 8px; text-align: left;">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="padding: 8px; border: 1px solid #ccc;">Data 1</td>
                    <td style="padding: 8px; border: 1px solid #ccc; color: green;">${
                      bodyLines[0]
                    }</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border: 1px solid #ccc;">Data 2</td>
                    <td style="padding: 8px; border: 1px solid #ccc; color: blue;">${
                      bodyLines[1] || "N/A"
                    }</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `;
        }

        const canvas = context.chart.canvas;
        const canvasRect = canvas.getBoundingClientRect();

        // @ts-ignore
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = "absolute";
        tooltipEl.style.left =
          canvasRect.left + window.scrollX + tooltipModel.caretX + "px";
        tooltipEl.style.top =
          canvasRect.top + window.scrollY + tooltipModel.caretY + "px";
        tooltipEl.style.pointerEvents = "none";
      },
    },
  },
};
//******VARIAVEIS*******"

//******WATCHS*******"

//******WATCHS*******"

//******COMPUTEDS*******"
const data = computed(() => {
  return {
    labels: labelTransferencias.value,
    datasets: [
      {
        data: valoresTransferencias.value,
        label: "Spending Total",
        backgroundColor: "surface-variant",
      },
    ],
  };
});

const doughnutData = computed(() => {
  return {
    labels: [
      "Contas da Casa",
      "Alimentação",
      "Pessoal",
      "Lazer",
      "Assinaturas e Serviços",
      "Investimentos",
      "Emergências",
      "Pets",
      "Dívidas e Empréstimos",
    ],
    datasets: [
      {
        backgroundColor: [
          "#E46651",
          "#41B883",
          "#2196F3",
          "#F4A261",
          "#A3D5D3",
          "#B2A4FF",
          "#F7C5C5",
          "#C1D9A7",
          "#D3C4F3",
        ],
        data: categoriesAnalyticsReturn.value,
      },
    ],
  };
});
//******COMPUTEDS*******"

//******LIFECYCLE HOOKS*******"
onMounted(async () => {
  await getTransfersByPeriod();
  await GetCategoriesAnalytics();
  await nextTick();

  if (barChart.value) {
    // @ts-ignore
    const chartInstance = barChart.value.chart;

    if (chartInstance) {
      chartInstance.update();
    } else {
      console.error("A instância do gráfico não está disponível");
    }
  }
});
//******LIFECYCLE HOOKS*******"

//******METHODS*******"
const getTransfersByPeriod = async () => {
  const filter = {
    IdUsuario: 1,
    IdConta: 2,
    FilterType: "Last12Months",
  };

  try {
    let result = await $axios.get("/DashBoard/GetByPeriod", {
      params: filter,
    });

    valoresTransferencias.value = result.data.map(
      (transferencia: Transferencia) => transferencia.vlTransferencia
    );

    labelTransferencias.value = result.data.map(
      (transferencia: Transferencia) =>
        moment(transferencia.dtTransferencia).format("DD/MM/YYYY HH:mm")
    );

    return valoresTransferencias.value;
  } catch (error) {
    console.error(error);
  }
};

const GetCategoriesAnalytics = async () => {
  const filter = {
    IdUsuario: 1,
    IdConta: 2,
  };

  try {
    let result = await $axios.get(`/DashBoard/GetCategoriesAnalytics`, {
      params: filter,
    });

    categoriesAnalyticsReturn.value = result.data.map(
      (x: any) => x.totalTransferencias
    );
  } catch (error) {
    console.error(error);
  }
};
//******METHODS*******"

//******OUTROS*******"

//******OUTROS*******"

//******EXPOSE*******"

//******EXPOSE*******"
</script>

<style scoped>
#chartjs-tooltip {
  position: absolute;
  background-color: transparent;
  pointer-events: none;
}

.tooltip-card {
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  z-index: 9999;
}
</style>
