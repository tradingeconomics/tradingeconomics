<script setup lang="ts">
import { ref, type Component } from "vue";

const props = defineProps<{
  pages: {
    key: string;
    title: string;
    description: string;
    component: Component;
  }[];
}>();

const activePage = ref(props?.pages?.[0]?.key);

const setActivePage = (pageKey: string) => {
  activePage.value = pageKey;
};
</script>

<template>
  <div class="page-container">
    <div class="button-group">
      <button
        v-for="page in pages"
        :key="page.key"
        class="toggle-button"
        :class="{ active: activePage === page.key }"
        @click="setActivePage(page.key)"
      >
        {{ page.title }}
      </button>
    </div>

    <div class="content">
      <template v-for="page in pages">
        <component
          :key="page.key"
          :is="page.component"
          v-if="activePage === page.key"
        ></component>
      </template>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 1rem;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.toggle-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: #333;
  cursor: pointer;
  font-size: 1rem;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.toggle-button:hover {
  background-color: #e0e0e0;
}

.toggle-button.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.content {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}
</style>
