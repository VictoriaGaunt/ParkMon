<template>
  <div class="card overview-cards">
    <div class="period-selector">
      <button
          v-for="period in periods"
          :key="period"
          :class="{ active: selectedPeriod === period }"
          @click="selectedPeriod = period"
      >
        {{ period }}
      </button>
    </div>
    <div v-if="data" class="stats-grid">
      <div class="stat-item">
        <span class="stat-label">Всего автоматов</span>
        <span class="stat-value">{{ data.total }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Работающих</span>
        <span class="stat-value">{{ data.working }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Масштаб</span>
        <span class="stat-value">{{ scalePercentage }}%</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Требуют обслуживания</span>
        <span class="stat-value">{{ data.needsRepair }}</span>
      </div>
    </div>
    <div v-else class="loading">Загрузка...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { VendingMachinesOverview } from '../types'

const props = defineProps<{
  data: VendingMachinesOverview | null
}>()

const periods = ['Сегодня', 'Вчера', 'Неделя', 'Месяц', 'Квартал']
const selectedPeriod = ref('Сегодня')

// Просто для демонстрации — вычисляем "масштаб" как отношение работающих к общему числу
const scalePercentage = computed(() => {
  if (!props.data) return 0
  return Math.round((props.data.working / props.data.total) * 100)
})
</script>

<style scoped>
.overview-cards {
  padding: 1rem;
}
.period-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.period-selector button {
  background: none;
  border: 1px solid #e5e7eb;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
}
.period-selector button.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
.stat-item {
  display: flex;
  flex-direction: column;
}
.stat-label {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}
.stat-value {
  font-size: 2rem;
  font-weight: 600;
  color: #111827;
}
.loading {
  text-align: center;
  color: #9ca3af;
  padding: 2rem;
}
</style>