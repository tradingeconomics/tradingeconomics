<script setup lang="ts">
import ApiView from "../ApiView.vue";
import EconomicCalendarByCountry from "./EconomicCalendarByCountry.vue";

const pages = [
  {
    key: "EconomicCalendarByCountry",
    title: "Economic Calendar By Country",
    description: "See Economic Calendar By Country",
    component: EconomicCalendarByCountry,
  },
];
</script>

<template>
  <ApiView :pages="pages" />
</template>
