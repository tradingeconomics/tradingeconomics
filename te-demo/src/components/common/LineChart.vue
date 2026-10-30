<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
);
defineProps<{
  chartData: { labels: string[]; datasets: any[] };
  reRenderKey?: number;
  chartOptions: {
    responsive: boolean;
    plugins: {
      legend?: { display?: boolean };
      tooltip?: { enabled?: boolean };
    };
    interaction?: { intersect?: boolean };
    scales: {
      x: { title: { display: boolean; text: string } };
      y: { title: { display: boolean; text: string } };
    };
  };
}>();
</script>

<template>
  <Line :key="reRenderKey" :options="chartOptions" :data="chartData" />
</template>
