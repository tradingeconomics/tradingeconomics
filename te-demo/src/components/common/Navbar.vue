<script setup lang="ts">
import routes from "@/router/routes";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isActive = (path: string) => computed(() => route.path === path);
</script>

<template>
  <div class="container">
    <nav class="nav">
      <RouterLink
        v-for="(route, index) in routes"
        :key="index"
        :to="route.path"
        class="nav-item"
        :class="{ 'active-link': isActive(route.path).value }"
      >
        {{ route.name }}
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.container {
  max-width: 60rem;
  width: 100%;
  margin: auto;
}
.nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.nav-item {
  background-color: rgb(96 165 250);
  color: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.nav-item:hover,
.nav-item.active-link {
  background-color: rgb(37 99 235);
}
</style>
