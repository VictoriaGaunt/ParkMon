<template>
  <BaseCard
      class="sales-by-product-card"
      padding="md"
      flat
  >
    <template #header>
      <div class="sales-by-product-card__header">
        <h3 class="sales-by-product-card__title">Популярные</h3>

        <BaseTabs
            v-model="activeTab"
            :items="tabs"
            size="sm"
            variant="default"
        />
      </div>
    </template>

    <div class="sales-by-product-card__chart">
      <div
          v-for="(_, index) in chartItems"
          :key="index"
          class="sales-by-product-card__column-wrap"
      >
        <div class="sales-by-product-card__top-percent">
          {{ getTopPercentLabel(index) }}
        </div>

        <div class="sales-by-product-card__column-track">
          <div
              class="sales-by-product-card__column-fill"
              :class="{
              'sales-by-product-card__column-fill--accent': getColumnVariant(index) === 'accent',
              'sales-by-product-card__column-fill--total': getColumnVariant(index) === 'total',
            }"
              :style="{ height: `${getColumnHeight(index)}%` }"
          >
            <span
                v-if="showMarker(index)"
                class="sales-by-product-card__column-marker"
                :class="{
                'sales-by-product-card__column-marker--yellow': getMarkerVariant(index) === 'yellow',
                'sales-by-product-card__column-marker--gray': getMarkerVariant(index) === 'gray',
                'sales-by-product-card__column-marker--brown': getMarkerVariant(index) === 'brown',
              }"
            ></span>

            <span
                v-if="getDisplayValue(index) > 0"
                class="sales-by-product-card__column-value"
            >
              {{ formatNumber(getDisplayValue(index)) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="sales-by-product-card__summary">
      <div class="sales-by-product-card__summary-card">
        <div class="sales-by-product-card__metric-value">
          {{ leftSummaryValue }}
        </div>

        <div class="sales-by-product-card__metric-label">
          {{ leftSummaryLabel }}
        </div>
      </div>

      <div class="sales-by-product-card__summary-card sales-by-product-card__summary-card--accent">
        <div class="sales-by-product-card__metric-row">
          <div class="sales-by-product-card__metric-value">
            {{ formatNumber(props.data.soldInTopFive) }}
          </div>

          <div class="sales-by-product-card__metric-badge">
            {{ summaryPercent }}
          </div>
        </div>

        <div class="sales-by-product-card__metric-label">
          {{ rightSummaryLabel }}
        </div>
      </div>
    </div>

    <template #footer>
      <button class="sales-by-product-card__report-link" type="button">
        <span>Перейти в отчет</span>
        <img :src="icons.arrow" alt="arrow" />
      </button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import BaseTabs from '../ui/BaseTabs.vue'
import type { ProductTotalSales, ProductsTotalSalesOverview } from '../../types'
import { formatNumber, formatPercent } from '../../utils'

type CardTab = 'products' | 'categories'

const base = import.meta.env.BASE_URL

function asset(name: string): string {
  return `${base}${name}`
}

const icons = {
  arrow: asset('img18.png'),
} as const

const props = defineProps<{
  data: ProductsTotalSalesOverview
}>()

const activeTab = ref<CardTab>('products')

const tabs = [
  { label: 'Товары', value: 'products' },
  { label: 'Категории', value: 'categories' },
] as const

const chartItems = computed<ProductTotalSales[]>(() => {
  const items = [...props.data.topProducts]

  while (items.length < 6) {
    items.push({
      productId: 0,
      soldTotal: 0,
      percentageOfAllSales: 0,
    })
  }

  return items.slice(0, 6)
})

const summaryPercent = computed(() => {
  if (!props.data.totalSold) {
    return '0%'
  }

  return formatPercent((props.data.soldInTopFive / props.data.totalSold) * 100)
})

const leftSummaryValue = computed(() => {
  return formatNumber(props.data.differentProductCategoriesCount)
})

const leftSummaryLabel = computed(() => {
  return 'Категории товаров\nиз Топ-5'
})

const rightSummaryLabel = computed(() => {
  return activeTab.value === 'products'
      ? 'Итого продано в топ-5 товаров'
      : 'Итого продано в топ-5 категорий'
})

function getDisplayValue(index: number): number {
  const item = chartItems.value[index]

  if (activeTab.value === 'products') {
    if (index === chartItems.value.length - 1) {
      return Math.max(item.soldTotal, 350)
    }

    return item.soldTotal
  }

  if (index === chartItems.value.length - 1) {
    return props.data.differentProductCategoriesCount * 175
  }

  return Math.max(1, Math.round(item.soldTotal * 0.45))
}

function getTopPercentLabel(index: number): string {
  if (index === chartItems.value.length - 1) {
    return '66%'
  }

  return formatPercent(chartItems.value[index].percentageOfAllSales)
}

function getColumnVariant(index: number): 'accent' | 'total' {
  return index === chartItems.value.length - 1 ? 'total' : 'accent'
}

function getColumnHeight(index: number): number {
  const item = chartItems.value[index]

  if (index === chartItems.value.length - 1) {
    return 86
  }

  return Math.max(10, Math.min(item.percentageOfAllSales * 5.2, 100))
}

function showMarker(index: number): boolean {
  return index < 3
}

function getMarkerVariant(index: number): 'yellow' | 'gray' | 'brown' {
  if (index === 0) {
    return 'yellow'
  }

  if (index === 1) {
    return 'gray'
  }

  return 'brown'
}
</script>

<style scoped>
.sales-by-product-card {
  width: 100%;
  min-width: 0;
  border-radius: 18px;
  background: #fafafb;
}

.sales-by-product-card__report-link {
  cursor: pointer;
  transition:
      background-color 0.18s ease,
      border-color 0.18s ease,
      color 0.18s ease;
}

.sales-by-product-card__header {
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.sales-by-product-card__title {
  margin: 0;
  min-width: 0;
  color: #2f384c;
  font-size: 16px;
  line-height: 1.35;
  font-weight: 700;
}

.sales-by-product-card__chart {
  width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  align-items: end;
  gap: 8px;
  min-height: 168px;
  margin-bottom: 18px;
}

.sales-by-product-card__column-wrap {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
}

.sales-by-product-card__top-percent {
  text-align: center;
  color: #8f99ab;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
  white-space: nowrap;
}

.sales-by-product-card__column-track {
  position: relative;
  height: 132px;
  overflow: hidden;
  border-radius: 8px;
  background: #eef1f5;
}

.sales-by-product-card__column-fill {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 4px 8px;
  border-radius: 8px;
}

.sales-by-product-card__column-fill--accent {
  background: var(--color-accent);
}

.sales-by-product-card__column-fill--total {
  background: #5f6d82;
}

.sales-by-product-card__column-marker {
  position: absolute;
  top: -8px;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translateX(-50%);
}

.sales-by-product-card__column-marker--yellow {
  background: #f5c542;
}

.sales-by-product-card__column-marker--gray {
  background: #bcc4d2;
}

.sales-by-product-card__column-marker--brown {
  background: #b25f1e;
}

.sales-by-product-card__column-value {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  max-width: 100%;
  height: 24px;
  padding: 0 8px;
  border-radius: 8px;
  background: #ffffff;
  color: #2f384c;
  font-size: 12px;
  line-height: 1;
  font-weight: 700;
  white-space: nowrap;
}

.sales-by-product-card__summary {
  width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 8px;
}

.sales-by-product-card__summary-card {
  min-width: 0;
  min-height: 136px;
  padding: 16px 14px;
  border-radius: 12px;
  background: #f7f8fb;
}

.sales-by-product-card__metric-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}

.sales-by-product-card__metric-value {
  min-width: 0;
  color: #2f384c;
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sales-by-product-card__metric-badge {
  flex-shrink: 0;
  min-width: 42px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #eef1f6;
  color: #8f99ab;
  font-size: 13px;
  line-height: 1;
  font-weight: 600;
}

.sales-by-product-card__metric-label {
  margin-top: 14px;
  color: #8f99ab;
  font-size: 14px;
  line-height: 1.35;
  font-weight: 500;
  white-space: pre-line;
}

.sales-by-product-card__report-link {
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

.sales-by-product-card__report-link:hover {
  background: #e9edf3;
}

.sales-by-product-card__report-link img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.45;
}

@media (max-width: 1200px) {
  .sales-by-product-card__chart {
    gap: 6px;
    min-height: 160px;
  }

  .sales-by-product-card__column-track {
    height: 124px;
  }

  .sales-by-product-card__column-value {
    min-width: 30px;
    height: 22px;
    padding: 0 6px;
    font-size: 11px;
  }

  .sales-by-product-card__summary {
    gap: 6px;
  }

  .sales-by-product-card__summary-card {
    min-height: 124px;
    padding: 14px 12px;
  }

  .sales-by-product-card__metric-value {
    font-size: 24px;
  }

  .sales-by-product-card__metric-label {
    font-size: 13px;
  }

  .sales-by-product-card__metric-badge {
    min-width: 38px;
    height: 26px;
    font-size: 12px;
  }
}

@media (max-width: 1024px) {
  .sales-by-product-card__header {
    flex-wrap: nowrap;
    align-items: center;
  }

  .sales-by-product-card__chart {
    gap: 5px;
  }

  .sales-by-product-card__top-percent {
    font-size: 11px;
  }

  .sales-by-product-card__column-track {
    height: 116px;
  }

  .sales-by-product-card__summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
  }

  .sales-by-product-card__summary-card {
    min-height: 118px;
    padding: 12px 10px;
  }

  .sales-by-product-card__metric-value {
    font-size: 22px;
  }

  .sales-by-product-card__metric-label {
    margin-top: 10px;
    font-size: 12px;
    line-height: 1.3;
  }

  .sales-by-product-card__metric-badge {
    min-width: 34px;
    height: 24px;
    font-size: 11px;
  }
}

@media (max-width: 900px) {
  .sales-by-product-card__chart {
    gap: 4px;
    min-height: 148px;
  }

  .sales-by-product-card__column-track {
    height: 108px;
  }

  .sales-by-product-card__column-value {
    min-width: 26px;
    height: 20px;
    padding: 0 5px;
    border-radius: 6px;
    font-size: 10px;
  }

  .sales-by-product-card__summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
  }

  .sales-by-product-card__summary-card {
    min-height: 110px;
    padding: 10px 8px;
  }

  .sales-by-product-card__metric-value {
    font-size: 20px;
  }

  .sales-by-product-card__metric-label {
    font-size: 11px;
  }
}

@media (max-width: 760px) {
  .sales-by-product-card__chart {
    min-height: 138px;
  }

  .sales-by-product-card__column-track {
    height: 98px;
  }

  .sales-by-product-card__top-percent {
    font-size: 10px;
  }

  .sales-by-product-card__column-marker {
    width: 8px;
    height: 8px;
    top: -6px;
  }

  .sales-by-product-card__summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
  }

  .sales-by-product-card__summary-card {
    min-height: 104px;
    padding: 8px 6px;
  }

  .sales-by-product-card__metric-row {
    gap: 6px;
  }

  .sales-by-product-card__metric-value {
    font-size: 18px;
  }

  .sales-by-product-card__metric-badge {
    min-width: 30px;
    height: 22px;
    font-size: 10px;
  }

  .sales-by-product-card__metric-label {
    margin-top: 8px;
    font-size: 10px;
    line-height: 1.2;
  }
}
</style>