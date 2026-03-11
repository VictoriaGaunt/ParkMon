<template>
  <nav class="horizontal-nav">
    <ul>
      <li v-for="tab in tabs" :key="tab" :class="{ active: tab === activeTab }">
        <a href="#">{{ tab }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = ['Обзор', 'Продажи', 'Автоматы', 'Товары', 'Аналитика']
const activeTab = ref('Обзор')
</script>

<style scoped>
.horizontal-nav {
  margin: 1rem 0 2rem 0;
  border-bottom: 1px solid #e5e7eb;
}
.horizontal-nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1.5rem;
}
.horizontal-nav a {
  display: block;
  padding: 0.5rem 0;
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}
.horizontal-nav li.active a {
  color: #1f2937;
  border-bottom-color: #3b82f6;
}
</style>