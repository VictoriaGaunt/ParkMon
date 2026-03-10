<template>
  <div class="card">
    <h2>Peak Sale Time of Day (last 31 days)</h2>
    <div v-if="data.length" class="times">
      <div v-for="item in data" :key="item.day" class="day-row">
        <span class="day-label">Day {{ item.day }}</span>
        <span class="time">{{ formatTime(item.peakSalesTime) }}</span>
      </div>
    </div>
    <div v-else class="loading">Loading…</div>
  </div>
</template>

<script setup lang="ts">
import type { PeakSaleTimeAtDay } from '../types'

defineProps<{
  data: PeakSaleTimeAtDay[]
}>()

function formatTime(timeStr: string): string {
  // backend returns "HH:mm:ss" (e.g., "14:30:00")
  // we'll trim seconds and show HH:mm
  return timeStr.substring(0, 5)
}
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
.times {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
}
.day-row {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  border-bottom: 1px solid #f3f4f6;
}
.day-label {
  font-size: 0.875rem;
  color: #4b5563;
}
.time {
  font-weight: 500;
  color: #1f2937;
}
.loading {
  color: #9ca3af;
  text-align: center;
  padding: 2rem;
}
</style>