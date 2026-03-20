<template>
  <BaseCard
      class="sales-by-product-card"
      title="Популярные"
      padding="md"
      flat
  >
    <div class="sales-by-product-card__chart">
      <div
          v-for="(item, index) in chartItems"
          :key="index"
          class="sales-by-product-card__column-wrap"
      >
        <div class="sales-by-product-card__top-percent">
          {{ getTopPercentLabel(item.percentageOfAllSales) }}
        </div>

        <div class="sales-by-product-card__column-track">
          <div
              class="sales-by-product-card__column-fill sales-by-product-card__column-fill--accent"
              :style="{ height: `${getColumnHeight(item.percentageOfAllSales)}%` }"
          >
            <span
                v-if="showMarker(index)"
                class="sales-by-product-card__column-marker"
                :class="`sales-by-product-card__column-marker--${getMarkerVariant(index)}`"
            ></span>

            <span
                v-if="item.soldTotal > 0"
                class="sales-by-product-card__column-value"
            >
              {{ formatNumber(item.soldTotal) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="sales-by-product-card__summary">
      <div class="sales-by-product-card__metric">
        <div class="sales-by-product-card__metric-value">
          {{ formatNumber(data.differentProductCategoriesCount) }}
        </div>

        <div class="sales-by-product-card__metric-label">
          Категории товаров<br />
          из топ-5
        </div>
      </div>
    </div>

    <template #footer>
      <button class="sales-by-product-card__report-link" type="button">
        <span>Перейти в отчет</span>
        <img src="/img00.svg" alt="" />
      </button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import type { ProductTotalSales, ProductsTotalSalesOverview } from '../../types'
import { formatNumber, formatPercent } from '../../utils'

const props = defineProps<{
  data: ProductsTotalSalesOverview
}>()

const chartItems = computed<ProductTotalSales[]>(() => {
  const items = [...props.data.topProducts]

  while (items.length < 5) {
    items.push({
      productId: 0,
      soldTotal: 0,
      percentageOfAllSales: 0,
    })
  }

  return items.slice(0, 5)
})

function getColumnHeight(value: number): number {
  return Math.max(10, Math.min(value * 4.8, 100))
}

function getTopPercentLabel(value: number): string {
  return formatPercent(value)
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
  min-width: 0;
  border-radius: 18px;
  background: #fafafb;
}

.sales-by-product-card__chart {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: end;
  gap: 8px;
  min-height: 168px;
  margin-bottom: 18px;
}

.sales-by-product-card__column-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  min-width: 0;
}

.sales-by-product-card__top-percent {
  text-align: center;
  color: #a4acba;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
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
  padding-bottom: 8px;
  border-radius: 8px;
  background: var(--color-accent);
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

.sales-by-product-card__summary {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.sales-by-product-card__metric {
  min-width: 0;
}

.sales-by-product-card__metric-value {
  color: #3b4354;
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.sales-by-product-card__metric-label {
  margin-top: 10px;
  color: #a0a8b8;
  font-size: 14px;
  line-height: 1.35;
}

.sales-by-product-card__report-link {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #98a1b2;
  font-size: 14px;
  font-weight: 500;
}

.sales-by-product-card__report-link img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.45;
}
</style>