<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getCreditRatings } from "@/service/apiService";

const creditRatings = ref<
  {
    Country: string;
    Date: string;
    Agency: string;
    Rating: string;
    Outlook: string;
  }[]
>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    isLoading.value = true;
    creditRatings.value = await getCreditRatings();
  } catch (err) {
    error.value = "Failed to fetch credit ratings. Please try again later.";
    console.error("Error fetching credit ratings:", err);
  } finally {
    isLoading.value = false;
  }
});

const groupedByCountry = computed(() => {
  return creditRatings.value.reduce(
    (groups, rating) => {
      (groups[rating.Country] = groups[rating.Country] || []).push(rating);
      return groups;
    },
    {} as Record<string, typeof creditRatings.value>,
  );
});
</script>

<template>
  <div class="container credit-ratings">
    <h1 class="title">Credit Ratings</h1>
    <div v-if="isLoading" class="loading">Loading data...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else>
      <div
        v-for="(ratings, country) in groupedByCountry"
        :key="country"
        class="country-section"
      >
        <h2 class="country-name">{{ country }}</h2>
        <table class="ratings-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Agency</th>
              <th>Rating</th>
              <th>Outlook</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rating, index) in ratings" :key="index">
              <td>{{ rating.Date }}</td>
              <td>{{ rating.Agency }}</td>
              <td>{{ rating.Rating }}</td>
              <td>{{ rating.Outlook }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 60rem;
}
.credit-ratings {
  padding: 1rem;
}

.title {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
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

.ratings-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-top: 0.5rem;
}

.ratings-table th,
.ratings-table td {
  padding: 0.5rem;
  border: 1px solid #ddd;
}

.ratings-table thead {
  background-color: #f4f4f4;
}

.ratings-table tbody tr:hover {
  background-color: #e3f2fd;
}
</style>
