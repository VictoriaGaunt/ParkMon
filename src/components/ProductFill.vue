<template>
  <div class="card">
    <h2>Product Fill Level</h2>
    <div v-if="data" class="content">
      <div class="total">Total items: {{ data.total }}</div>
      <div class="fills">
        <div v-for="(fill, idx) in data.topFilled" :key="idx" class="fill-row">
          <span class="fill-label">Machine {{ idx + 1 }}</span>
          <div class="bar-container">
            <div class="bar" :style="{ width: fill.fillPercentage + '%' }"></div>
          </div>
          <span class="fill-percent">{{ fill.fillPercentage }}%</span>
        </div>
      </div>
    </div>
    <div v-else class="loading">Loading…</div>
  </div>
</template>

<script setup lang="ts">
import type { VendingMachinesItemFillOverview } from '../types'

defineProps<{
  data: VendingMachinesItemFillOverview | null
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
.total {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #374151;
}
.fills {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.fill-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.fill-label {
  width: 5rem;
  font-size: 0.875rem;
  color: #4b5563;
}
.bar-container {
  flex: 1;
  height: 1.25rem;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}
.bar {
  height: 100%;
  background: #10b981;
  border-radius: 9999px;
  transition: width 0.3s ease;
}
.fill-percent {
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