<script setup lang="ts">
import { getEconomicCalendarByCountry } from "@/service/apiService";
import { AVAILABLECOUNTRIES, type AvailableCountriesTypes } from "@/consts";
import { computed, onMounted, ref } from "vue";

const selectedCountries = ref<AvailableCountriesTypes[]>([
  ...AVAILABLECOUNTRIES,
]);

const economicCalendar = ref<
  {
    CalendarId: string;
    Date: string;
    Country: string;
    Category: string;
    Event: string;
    Reference: string;
    ReferenceDate: string;
    Source: string;
    SourceURL: string;
    Actual: string;
    Previous: string;
    Forecast: string;
    TEForecast: string;
    URL: string;
    Importance: number;
    LastUpdate: string;
    Revised: string;
    Currency: string;
    Unit: string;
    Ticker: string;
    Symbol: string;
  }[]
>([]);

const isLoading = ref(false);
const error = ref<string | null>(null);

const fetchCalendarData = async () => {
  isLoading.value = true;
  error.value = null;
  economicCalendar.value = [];

  try {
    for (const country of selectedCountries.value) {
      try {
        const countryData = await getEconomicCalendarByCountry(country);
        economicCalendar.value.push(...countryData);
      } catch (err) {
        console.error(`Failed to fetch data for ${country}:`, err);
      }
    }
  } catch (err) {
    error.value =
      "Failed to fetch economic calendar data. Please try again later.";
    console.error("Error fetching economic calendar data:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchCalendarData);

const groupedByCountry = computed(() => {
  return economicCalendar.value.reduce(
    (groups, event) => {
      (groups[event.Country] = groups[event.Country] || []).push(event);
      return groups;
    },
    {} as Record<string, typeof economicCalendar.value>,
  );
});
</script>

<template>
  <div class="container economic-calendar">
    <h1 class="title">Economic Calendar</h1>

    <!-- Country Selection -->
    <div class="country-selector">
      <label
        v-for="country in AVAILABLECOUNTRIES"
        :key="country"
        class="checkbox-label"
      >
        <input type="checkbox" :value="country" v-model="selectedCountries" />
        {{ country }}
      </label>
      <button
        class="fetch-button"
        :disabled="isLoading"
        @click="fetchCalendarData"
      >
        Fetch Data
      </button>
    </div>

    <!-- Loading and Error Messages -->
    <div v-if="isLoading" class="loading">Loading data...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- Display Data -->
    <div v-else>
      <div
        v-for="(events, country) in groupedByCountry"
        :key="country"
        class="country-section"
      >
        <template
          v-if="
            AVAILABLECOUNTRIES.find(
              (v) => v.toLowerCase() === country.toLowerCase(),
            )
          "
        >
          <h2 class="country-name">{{ country }}</h2>
          <table class="calendar-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Event</th>
                <th>Reference</th>
                <th>Source</th>
                <th>Actual</th>
                <th>Previous</th>
                <th>Forecast</th>
                <th>TE Forecast</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(event, index) in events" :key="index">
                <td>{{ new Date(event.Date).toLocaleString() }}</td>
                <td>{{ event.Category }}</td>
                <td>
                  {{ event.Event }}
                </td>
                <td>{{ event.Reference }}</td>
                <td>
                  <a
                    v-if="event.SourceURL"
                    :href="event.SourceURL"
                    target="_blank"
                  >
                    {{ event.Source || "N/A" }}
                  </a>
                  <template v-else>
                    {{ event.SourceURL || "N/A" }}
                  </template>
                </td>
                <td>{{ event.Actual || "N/A" }}</td>
                <td>{{ event.Previous || "N/A" }}</td>
                <td>{{ event.Forecast || "N/A" }}</td>
                <td>{{ event.TEForecast || "N/A" }}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 70rem;
}

.economic-calendar {
  padding: 1rem;
}

.title {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.country-selector {
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #333;
}

.fetch-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.fetch-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #007bff;
}

.error {
  text-align: center;
  font-size: 1.2rem;
  color: #ff0000;
}

.country-section {
  margin-bottom: 2rem;
}

.country-name {
  text-align: left;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #222;
}

.calendar-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-top: 0.5rem;
}

.calendar-table th,
.calendar-table td {
  padding: 0.5rem;
  border: 1px solid #ddd;
}

.calendar-table thead {
  background-color: #f4f4f4;
}

.calendar-table tbody tr:hover {
  background-color: #e3f2fd;
}
</style>
