<template>
  <BaseCard
      class="products-categories-card"
      padding="md"
      flat
  >
    <template #header>
      <div class="products-categories-card__header">
        <div class="products-categories-card__title-spacer"></div>

        <BaseTabs
            v-model="activeTab"
            :items="tabs"
            size="sm"
            variant="default"
        />
      </div>
    </template>

    <div class="products-categories-card__chart">
      <div
          v-for="(item, index) in chartItems"
          :key="index"
          class="products-categories-card__column-wrap"
      >
        <div class="products-categories-card__top-percent">
          {{ getTopPercentLabel(item.percentageOfAllSales) }}
        </div>

        <div class="products-categories-card__column-track">
          <div
              class="products-categories-card__column-fill"
              :class="`products-categories-card__column-fill--${getColumnVariant(index)}`"
              :style="{ height: `${getColumnHeight(item.percentageOfAllSales, index)}%` }"
          >
            <span
                v-if="item.soldTotal > 0"
                class="products-categories-card__column-value"
            >
              {{ formatNumber(getDisplayValue(item, index)) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="products-categories-card__summary">
      <div class="products-categories-card__summary-main">
        <div class="products-categories-card__total">
          {{ formatNumber(summaryTotal) }}
        </div>

        <div class="products-categories-card__subtitle">
          {{ summaryLabel }}
        </div>
      </div>

      <BaseBadge
          :label="summaryPercent"
          variant="neutral"
          size="sm"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseBadge from '../ui/BaseBadge.vue'
import BaseCard from '../ui/BaseCard.vue'
import BaseTabs from '../ui/BaseTabs.vue'
import type { ProductTotalSales, ProductsTotalSalesOverview } from '../../types'
import { formatNumber, formatPercent } from '../../utils'

type CardTab = 'products' | 'categories'

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

const summaryTotal = computed(() => {
  return props.data.soldInTopFive
})

const summaryPercent = computed(() => {
  if (!props.data.totalSold) {
    return '0%'
  }

  return formatPercent((props.data.soldInTopFive / props.data.totalSold) * 100)
})

const summaryLabel = computed(() => {
  return activeTab.value === 'products'
      ? 'Итого продано в топ-5 товаров'
      : 'Итого продано в топ-5 категорий'
})

function getDisplayValue(item: ProductTotalSales, index: number): number {
  if (activeTab.value === 'products') {
    return item.soldTotal
  }

  if (index === chartItems.value.length - 1) {
    return props.data.differentProductCategoriesCount * 175
  }

  return Math.max(1, Math.round(item.soldTotal * 0.45))
}

function getTopPercentLabel(value: number): string {
  return formatPercent(value)
}

function getColumnVariant(index: number): 'accent' | 'total' {
  return index === chartItems.value.length - 1 ? 'total' : 'accent'
}

function getColumnHeight(value: number, index: number): number {
  if (index === chartItems.value.length - 1) {
    return 88
  }

  return Math.max(10, Math.min(value * 5.2, 100))
}
</script>

<style scoped>
.products-categories-card {
  min-width: 0;
  border-radius: 18px;
  background: #fafafb;
}

.products-categories-card__header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.products-categories-card__title-spacer {
  min-height: 1px;
}

.products-categories-card__chart {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  align-items: end;
  gap: 8px;
  min-height: 168px;
  margin-bottom: 18px;
}

.products-categories-card__column-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  min-width: 0;
}

.products-categories-card__top-percent {
  text-align: center;
  color: #a4acba;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
}

.products-categories-card__column-track {
  position: relative;
  height: 132px;
  overflow: hidden;
  border-radius: 8px;
  background: #eef1f5;
}

.products-categories-card__column-fill {
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

.products-categories-card__column-fill--accent {
  background: var(--color-accent);
}

.products-categories-card__column-fill--total {
  background: #5f6d82;
}

.products-categories-card__column-value {
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

.products-categories-card__summary {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.products-categories-card__summary-main {
  min-width: 0;
}

.products-categories-card__total {
  color: #3b4354;
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.products-categories-card__subtitle {
  margin-top: 10px;
  color: #a0a8b8;
  font-size: 14px;
  line-height: 1.35;
}
</style>