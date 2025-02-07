<script setup lang="ts">
import Navbar from "./components/common/Navbar.vue";
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
    "
  >
    <Navbar />
    <router-view></router-view>
  </div>
</template>
