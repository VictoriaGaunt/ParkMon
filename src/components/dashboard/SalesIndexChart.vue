<template>
  <BaseCard
      class="sales-index-card"
      title="Индекс продаж по средней исторической активности"
      padding="md"
      flat
  >
    <div class="sales-index-card__filter-row">
      <div class="sales-index-card__filter-label">
        Изменить показатель
      </div>

      <button class="sales-index-card__sort-btn" type="button" aria-label="Изменить показатель">
        <img :src="icons.sort" alt="sort" />
      </button>
    </div>

    <div class="sales-index-card__list">
      <div
          v-for="item in normalizedData"
          :key="item.machineId"
          class="sales-index-card__row"
      >
        <div class="sales-index-card__row-top">
          <div class="sales-index-card__machine">
            <span class="sales-index-card__type">{{ item.machineType }}</span>
            <span class="sales-index-card__id"># {{ item.machineId }}</span>
          </div>

          <div class="sales-index-card__percent">
            {{ formatPercent(item.percentage) }}
          </div>
        </div>

        <div class="sales-index-card__progress">
          <div
              class="sales-index-card__progress-bar"
              :class="{
              'sales-index-card__progress-bar--danger': getProgressVariant(item.percentage) === 'danger',
              'sales-index-card__progress-bar--warning': getProgressVariant(item.percentage) === 'warning',
              'sales-index-card__progress-bar--success': getProgressVariant(item.percentage) === 'success',
            }"
              :style="{ width: `${clampPercent(item.percentage)}%` }"
          ></div>
        </div>
      </div>
    </div>

    <template #footer>
      <button class="sales-index-card__report-link" type="button">
        <span>Перейти в отчет</span>
        <img :src="icons.arrow" alt="arrow" />
      </button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import type { SalesIndex } from '../../types'
import { formatPercent } from '../../utils'

const base = import.meta.env.BASE_URL

function asset(name: string): string {
  return `${base}${name}`
}

const icons = {
  sort: asset('img21.png'),
  arrow: asset('img18.png'),
} as const

const props = defineProps<{
  data: SalesIndex[]
}>()

const normalizedData = computed(() => {
  return [...props.data]
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 5)
})

function clampPercent(value: number): number {
  if (value < 0) {
    return 0
  }

  if (value > 100) {
    return 100
  }

  return value
}

function getProgressVariant(value: number): 'danger' | 'warning' | 'success' {
  if (value >= 70) {
    return 'success'
  }

  if (value >= 40) {
    return 'warning'
  }

  return 'danger'
}
</script>

<style scoped>
.sales-index-card {
  min-width: 0;
  border-radius: 18px;
  background: #fafafb;
}

.sales-index-card__sort-btn,
.sales-index-card__report-link {
  cursor: pointer;
  transition:
      background-color 0.18s ease,
      border-color 0.18s ease,
      color 0.18s ease;
}

.sales-index-card__filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.sales-index-card__filter-label {
  color: #8f99ab;
  font-size: 14px;
  line-height: 1.2;
  font-weight: 500;
}

.sales-index-card__sort-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  flex-shrink: 0;
}

.sales-index-card__sort-btn:hover {
  background: #e9edf3;
}

.sales-index-card__sort-btn img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.55;
}

.sales-index-card__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sales-index-card__row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sales-index-card__row-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.sales-index-card__machine {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.sales-index-card__type {
  flex-shrink: 0;
  color: var(--color-accent);
  font-size: 18px;
  line-height: 1;
  font-weight: 700;
  text-transform: uppercase;
}

.sales-index-card__id {
  color: #2f384c;
  font-size: 15px;
  line-height: 1.2;
  font-weight: 600;
}

.sales-index-card__percent {
  flex-shrink: 0;
  color: #8f99ab;
  font-size: 13px;
  line-height: 1;
  font-weight: 600;
}

.sales-index-card__progress {
  width: 100%;
  height: 4px;
  overflow: hidden;
  border-radius: 999px;
  background: #eceff4;
}

.sales-index-card__progress-bar {
  height: 100%;
  border-radius: inherit;
}

.sales-index-card__progress-bar--danger {
  background: #ef4444;
}

.sales-index-card__progress-bar--warning {
  background: #f59e0b;
}

.sales-index-card__progress-bar--success {
  background: #20b26b;
}

.sales-index-card__report-link {
  width: 100%;
  min-height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  border-radius: 10px;
  color: #8f99ab;
  font-size: 14px;
  font-weight: 500;
}

.sales-index-card__report-link:hover {
  background: #e9edf3;
}

.sales-index-card__report-link img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.45;
}
</style>