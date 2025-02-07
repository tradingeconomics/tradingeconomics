<script setup lang="ts">
import { getHistoricalIndicatorTimeSeries } from "@/service/apiService";
import { onMounted, ref } from "vue";
import LineChart from "../common/LineChart.vue";
import { AVAILABLECOUNTRIES, type AvailableCountriesTypes } from "@/consts";

const availableIndicators = ["gdp", "population"];

const countries = ref<string[]>([]);
const selectedCountry = ref<AvailableCountriesTypes>("Sweden");
const selectedIndicator = ref<string>("gdp");

const chartData = ref({ labels: [] as string[], datasets: [] as any[] });
const chartOptions = ref({
  responsive: true,
  plugins: { legend: { display: true }, tooltip: { enabled: true } },
  interaction: {
    intersect: false,
    mode: "index",
  },
  scales: {
    x: { title: { display: true, text: "Year" } },
    y: { title: { display: true, text: "Default Label" } },
  },
});

const getColor = (() => {
  const colors = ["#42A5F5", "#66BB6A", "#FFA726", "#EF5350"];
  let index = 0;
  return () => colors[index++ % colors.length];
})();

const loading = ref(false);
const errorMessage = ref("");

const fetchData = async () => {
  if (selectedCountry.value && selectedIndicator.value) {
    loading.value = true;
    errorMessage.value = "";

    try {
      const data = await getHistoricalIndicatorTimeSeries(
        selectedCountry.value,
        selectedIndicator.value,
      );
      const labels = data.map((item: { DateTime: string }) =>
        new Date(item.DateTime).getFullYear().toString(),
      );
      const values = data.map((item: { Value: any }) => item.Value);

      if (chartData.value.labels.length === 0) {
        chartData.value.labels = labels;
      }

      const existingDatasetIndex = chartData.value.datasets.findIndex(
        (dataset) =>
          dataset.label ===
          `${selectedCountry.value} - ${selectedIndicator.value.toUpperCase()}`,
      );

      if (existingDatasetIndex !== -1) {
        chartData.value.datasets[existingDatasetIndex].data = values;
      } else {
        chartData.value.datasets.push({
          label: `${selectedCountry.value} - ${selectedIndicator.value.toUpperCase()}`,
          data: values,
          borderColor: getColor(),
          backgroundColor: "rgba(66, 165, 245, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointHoverRadius: 8,
        });

        if (!countries.value.includes(selectedCountry.value)) {
          countries.value.push(selectedCountry.value);
        }
      }

      chartOptions.value.scales.y.title.text = `${selectedIndicator.value.toUpperCase()} VALUE`;

      toggleChartRerender();
    } catch (error) {
      errorMessage.value = "Failed to fetch data. Please try again.";
      console.error("Error fetching data:", error);
    } finally {
      loading.value = false;
    }
  }
};

const removeData = (key: string) => {
  const datasetIndex = chartData.value.datasets.findIndex(
    (dataset) =>
      dataset.label.startsWith(key) ||
      dataset.label.endsWith(key.toUpperCase()),
  );

  if (datasetIndex !== -1) {
    chartData.value.datasets.splice(datasetIndex, 1);

    if (countries.value.includes(key)) {
      countries.value = countries.value.filter((c) => c !== key);
    }
  }

  toggleChartRerender();
};

const render = ref(1);
function toggleChartRerender() {
  render.value += 1;
}
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container">
    <h2>Historical Indicators Comparison</h2>
    <p>
      API Docs Used:
      <a href="https://docs.tradingeconomics.com/indicators/historical/">
        https://docs.tradingeconomics.com/indicators/historical/
      </a>
    </p>
    <p>
      This page allows you to compare economic data (e.g., GDP, Population) of
      multiple countries. Select a country and indicator to fetch data.
    </p>

    <form class="form" @submit.prevent="fetchData">
      <div class="form-group">
        <label for="country">Select Country:</label>
        <select
          v-model="selectedCountry"
          id="country"
          class="form-control"
          required
        >
          <option
            v-for="country in AVAILABLECOUNTRIES"
            :key="country"
            :value="country"
          >
            {{ country }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="indicator">Select Indicator:</label>
        <select
          v-model="selectedIndicator"
          id="indicator"
          class="form-control"
          required
        >
          <option v-for="ind in availableIndicators" :key="ind" :value="ind">
            {{ ind.toUpperCase() }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn-submit" :disabled="loading">
        <span v-if="loading" class="spinner"></span>
        <div :style="{ opacity: loading ? 0 : 1 }">Add Data</div>
      </button>
    </form>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <ul class="country-list" v-if="chartData.datasets.length > 0">
      <li v-for="dataset in chartData.datasets" :key="dataset.label">
        {{ dataset.label }}
        <button
          class="btn-remove"
          @click="removeData(dataset.label.split(' - ')[0])"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
            />
          </svg>
        </button>
      </li>
    </ul>
  </div>
  <LineChart
    class="chart"
    v-if="chartData.datasets.length > 0"
    :reRenderKey="render"
    :chartOptions="chartOptions"
    :chartData="chartData"
  />
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 60rem;
}

.form {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 0.5rem;
}

.form-group {
  flex-grow: 1;
}

.form-control {
  width: 100%;
  padding: 0.4rem;
}

.btn-submit {
  background-color: #42a5f5;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  cursor: pointer;
  position: relative;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.spinner {
  position: absolute;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: #ef5350;
  font-weight: bold;
  margin-top: 10px;
}

.country-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  justify-content: center;
  gap: 1rem;
}

.country-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.btn-remove {
  background-color: #ef5350;
  color: white;
  border: none;
  padding: 0.1rem 0.3rem;
  cursor: pointer;
  border-radius: 2px;
  display: flex;
}

.btn-remove:hover {
  background-color: #d32f2f;
}

.chart {
  border: 2px;
  border-style: solid;
  border-radius: 2px;
  margin-bottom: 5rem;
}
</style>
