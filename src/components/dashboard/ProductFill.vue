<template>
  <BaseCard
      class="product-fill-card"
      title="Заполнение товарами"
      padding="md"
      flat
  >
    <div class="product-fill-card__chart">
      <div
          v-for="(item, index) in chartItems"
          :key="index"
          class="product-fill-card__column-wrap"
      >
        <div
            v-if="showTopPercent(index)"
            class="product-fill-card__top-percent"
        >
          {{ formatPercent(item.fillPercentage) }}
        </div>

        <div class="product-fill-card__column-track">
          <div
              class="product-fill-card__column-fill"
              :class="`product-fill-card__column-fill--${getColumnVariant(index)}`"
              :style="{ height: `${getColumnHeight(item.fillPercentage)}%` }"
          >
            <span
                v-if="showInnerValue(index)"
                class="product-fill-card__column-value"
            >
              {{ formatNumber(item.itemCount) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="product-fill-card__summary">
      <div class="product-fill-card__summary-main">
        <div class="product-fill-card__total">
          {{ formatNumber(data.total) }}
        </div>
        <div class="product-fill-card__subtitle">
          ТА требуют пополнения товаром
        </div>
      </div>

      <div class="product-fill-card__summary-side">
        {{ averageFillPercent }}
      </div>
    </div>

    <template #footer>
      <button class="product-fill-card__report-link" type="button">
        <span>Перейти в отчет</span>
        <img src="/img00.svg" alt="" />
      </button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import type { VendingMachinesItemFillOverview } from '../../types'
import { formatNumber, formatPercent } from '../../utils'

const props = defineProps<{
  data: VendingMachinesItemFillOverview
}>()

const chartItems = computed(() => {
  const items = [...props.data.topFilled]

  while (items.length < 5) {
    items.push({
      itemCount: 0,
      fillPercentage: 0,
    })
  }

  return items.slice(0, 5)
})

const averageFillPercent = computed(() => {
  if (!chartItems.value.length) {
    return '0%'
  }

  const sum = chartItems.value.reduce((acc, item) => acc + item.fillPercentage, 0)
  const avg = sum / chartItems.value.length

  return formatPercent(avg)
})

function getColumnHeight(value: number): number {
  return Math.max(8, Math.min(value, 100))
}

function getColumnVariant(index: number): 'neutral' | 'accent' {
  return index >= 3 ? 'accent' : 'neutral'
}

function showTopPercent(index: number): boolean {
  return index >= 3
}

function showInnerValue(index: number): boolean {
  return index >= 3
}
</script>

<style scoped>
.product-fill-card {
  min-width: 0;
  border-radius: 18px;
  background: #fafafb;
}

.product-fill-card__chart {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: end;
  gap: 8px;
  min-height: 132px;
  margin-bottom: 18px;
}

.product-fill-card__column-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 6px;
  min-width: 0;
}

.product-fill-card__top-percent {
  align-self: flex-end;
  color: #a4acba;
  font-size: 13px;
  line-height: 1;
  font-weight: 500;
}

.product-fill-card__column-track {
  position: relative;
  height: 120px;
  overflow: hidden;
  border-radius: 8px;
  background: #eef1f5;
}

.product-fill-card__column-fill {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
  border-radius: 8px;
}

.product-fill-card__column-fill--neutral {
  background: #687489;
}

.product-fill-card__column-fill--accent {
  background: var(--color-accent);
}

.product-fill-card__column-value {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 24px;
  padding: 0 8px;
  border-radius: 8px;
  background: #ffffff;
  color: #3b4354;
  font-size: 12px;
  line-height: 1;
  font-weight: 700;
}

.product-fill-card__summary {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.product-fill-card__summary-main {
  min-width: 0;
}

.product-fill-card__total {
  color: #3b4354;
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.product-fill-card__subtitle {
  margin-top: 10px;
  color: #a0a8b8;
  font-size: 14px;
  line-height: 1.35;
}

.product-fill-card__summary-side {
  flex-shrink: 0;
  min-width: 42px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #eef1f6;
  color: #a0a8b8;
  font-size: 13px;
  line-height: 1;
  font-weight: 600;
}

.product-fill-card__report-link {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #98a1b2;
  font-size: 14px;
  font-weight: 500;
}

.product-fill-card__report-link img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.45;
}
</style>