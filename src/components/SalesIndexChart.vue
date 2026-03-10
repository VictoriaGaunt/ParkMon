<template>
  <div class="card">
    <h2>Sales Index vs Historic Avg</h2>
    <div v-if="data.length" class="chart">
      <div v-for="item in data" :key="item.machineId" class="bar-row">
        <span class="machine-label">#{{ item.machineId }} ({{ item.machineType }})</span>
        <div class="bar-container">
          <div class="bar" :style="{ width: item.percentage + '%' }"></div>
        </div>
        <span class="percentage">{{ item.percentage }}%</span>
      </div>
    </div>
    <div v-else class="loading">Loading…</div>
  </div>
</template>

<script setup lang="ts">
import type { SalesIndex } from '../types'

defineProps<{
  data: SalesIndex[]
}>()
</script>

<style scoped>
.card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}
.chart {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.bar-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.machine-label {
  width: 5rem;
  font-size: 0.875rem;
  color: #4b5563;
}
.bar-container {
  flex: 1;
  height: 1.5rem;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}
.bar {
  height: 100%;
  background: #3b82f6;
  border-radius: 9999px;
  transition: width 0.3s ease;
}
.percentage {
  width: 3rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  text-align: right;
}
.loading {
  color: #9ca3af;
  text-align: center;
  padding: 2rem;
}
</style>