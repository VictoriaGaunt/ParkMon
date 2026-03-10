<template>
  <div class="card">
    <h2>Machines Overview</h2>
    <div v-if="data" class="stats">
      <div class="stat">
        <span class="label">Total</span>
        <span class="value">{{ data.total }}</span>
      </div>
      <div class="stat">
        <span class="label">Working</span>
        <span class="value">{{ data.working }}</span>
      </div>
      <div class="stat">
        <span class="label">Low Supply</span>
        <span class="value">{{ data.lowSupply }}</span>
      </div>
      <div class="stat">
        <span class="label">Needs Repair</span>
        <span class="value">{{ data.needsRepair }}</span>
      </div>
    </div>
    <div v-else class="loading">Loading…</div>
  </div>
</template>

<script setup lang="ts">
import type { VendingMachinesOverview } from '../types'

defineProps<{
  data: VendingMachinesOverview | null
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
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.stat {
  display: flex;
  flex-direction: column;
}
.label {
  font-size: 0.875rem;
  color: #6b7280;
}
.value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}
.loading {
  color: #9ca3af;
  text-align: center;
  padding: 2rem;
}
</style>