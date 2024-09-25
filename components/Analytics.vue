<template>
  <v-card flat d-flex class="flex-column align-center">
    <v-card-text class="text-h5"> Expenses Statistics </v-card-text>
    <Bar :data="data" :options="options" />
  </v-card>
  <v-divider class="ma-2" />
  <v-card
    flat
    d-flex
    class="flex-column align-center text-center doughnut-card"
  >
    <Doughnut
      :data="doughnutData"
      :options="doughnutOptions"
      style="height: 20rem; margin-left: 6rem"
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
import { Bar, Doughnut } from "vue-chartjs";
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
//******COMPOSABLES*******"

//******PROPS*******"

//******PROPS*******"

//******EMITS*******"

//******EMITS*******"

//******VARIAVEIS*******"
const tooltipVisible = ref(false);
const tooltipPosition = ref({ x: 0, y: 0 });

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
      label: "Data One",
      backgroundColor: "surface-variant",
    },
  ],
};

const options = {
  responsive: true,
};

const doughnutData = {
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 10],
    },
  ],
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

//******COMPUTEDS*******"

//******LIFECYCLE HOOKS*******"

//******LIFECYCLE HOOKS*******"

//******METHODS*******"
const showTooltip = (event: any) => {
  tooltipPosition.value = { x: event.clientX, y: event.clientY };
  tooltipVisible.value = true;
};

const hideTooltip = () => {
  tooltipVisible.value = false;
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
