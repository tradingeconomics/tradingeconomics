<script setup lang="ts">
import ApiView from "../ApiView.vue";
import CreditRatings from "./CreditRatings.vue";
import HistoricalIndicators from "./HistoricalIndicators.vue";

const pages = [
  {
    key: "HistoricalIndicators",
    title: "Historical Indicators",
    description: "Analyze historical indicators and trends.",
    component: HistoricalIndicators,
  },
  {
    key: "CreditRatings",
    title: "Credit Ratings",
    description: "View the latest credit ratings by country.",
    component: CreditRatings,
  },
];
</script>

<template>
  <ApiView :pages="pages" />
</template>
