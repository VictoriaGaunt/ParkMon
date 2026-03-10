<template>
  <div class="card">
    <h2>Money Fill Status</h2>
    <div v-if="data.length" class="machines">
      <div v-for="machine in data" :key="machine.machineId" class="machine">
        <div class="machine-header">
          <span>#{{ machine.machineId }} ({{ machine.machineType }})</span>
        </div>
        <div class="fill-row">
          <span class="fill-label">Coins</span>
          <div class="bar-container">
            <div class="bar coin" :style="{ width: machine.coinFillPercentage + '%' }"></div>
          </div>
          <span class="fill-percent">{{ machine.coinFillPercentage }}%</span>
        </div>
        <div class="fill-row">
          <span class="fill-label">Banknotes</span>
          <div class="bar-container">
            <div class="bar banknote" :style="{ width: machine.banknotesFillPercentage + '%' }"></div>
          </div>
          <span class="fill-percent">{{ machine.banknotesFillPercentage }}%</span>
        </div>
      </div>
    </div>
    <div v-else class="loading">Loading…</div>
  </div>
</template>

<script setup lang="ts">
import type { VendingMachineMoneyStatus } from '../types'

defineProps<{
  data: VendingMachineMoneyStatus[]
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
.machines {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.machine-header {
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 0.5rem;
}
.fill-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
.fill-label {
  width: 4rem;
  font-size: 0.875rem;
  color: #4b5563;
}
.bar-container {
  flex: 1;
  height: 1rem;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}
.bar {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.3s ease;
}
.bar.coin {
  background: #f59e0b;
}
.bar.banknote {
  background: #8b5cf6;
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