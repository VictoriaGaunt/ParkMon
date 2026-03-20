<template>
  <BaseCard
      class="sales-index-card"
      title="Индекс продаж по средней исторической активности"
      padding="md"
      flat
  >
    <template #actions>
      <button class="sales-index-card__sort-btn" type="button" aria-label="Изменить показатель">
        <img src="/img00.svg" alt="" />
      </button>
    </template>

    <div class="sales-index-card__filter">
      <button class="sales-index-card__filter-btn" type="button">
        Изменить показатель
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
              :class="`sales-index-card__progress-bar--${getProgressVariant(item.percentage)}`"
              :style="{ width: `${clampPercent(item.percentage)}%` }"
          ></div>
        </div>
      </div>
    </div>

    <template #footer>
      <button class="sales-index-card__report-link" type="button">
        <span>Перейти в отчет</span>
        <img src="/img00.svg" alt="" />
      </button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import type { SalesIndex } from '../../types'
import { formatPercent } from '../../utils'

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

.sales-index-card__sort-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.sales-index-card__sort-btn img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.5;
}

.sales-index-card__filter {
  margin-bottom: 12px;
}

.sales-index-card__filter-btn {
  min-height: 30px;
  padding: 0 12px;
  border: 1px solid #edf0f4;
  border-radius: 10px;
  background: #f5f7fa;
  color: #98a1b2;
  font-size: 14px;
  font-weight: 500;
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
  color: #3b4354;
  font-size: 15px;
  line-height: 1.2;
  font-weight: 500;
}

.sales-index-card__percent {
  flex-shrink: 0;
  color: #98a1b2;
  font-size: 13px;
  line-height: 1;
  font-weight: 500;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #98a1b2;
  font-size: 14px;
  font-weight: 500;
}

.sales-index-card__report-link img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.45;
}
</style>