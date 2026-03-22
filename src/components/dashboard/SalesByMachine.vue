<template>
  <BaseCard
      class="sales-by-machine-card"
      title="ТА по объемам продаж"
      padding="md"
      flat
  >
    <div class="sales-by-machine-card__chart">
      <div
          v-for="(_, index) in chartItems"
          :key="index"
          class="sales-by-machine-card__column-wrap"
      >
        <div class="sales-by-machine-card__top-percent">
          {{ formatPercent(chartItems[index].percentageOfAllSales) }}
        </div>

        <div class="sales-by-machine-card__column-track">
          <div
              class="sales-by-machine-card__column-fill"
              :class="{
              'sales-by-machine-card__column-fill--accent': getColumnVariant(index) === 'accent',
              'sales-by-machine-card__column-fill--neutral': getColumnVariant(index) === 'neutral',
            }"
              :style="{ height: `${getColumnHeight(chartItems[index].percentageOfAllSales)}%` }"
          >
            <span
                v-if="showMarker(index)"
                class="sales-by-machine-card__column-marker"
                :class="{
                'sales-by-machine-card__column-marker--yellow': getMarkerVariant(index) === 'yellow',
                'sales-by-machine-card__column-marker--gray': getMarkerVariant(index) === 'gray',
                'sales-by-machine-card__column-marker--brown': getMarkerVariant(index) === 'brown',
              }"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <div class="sales-by-machine-card__summary">
      <div class="sales-by-machine-card__summary-card">
        <div class="sales-by-machine-card__metric-value">
          {{ formatNumber(data.totalSales) }}
        </div>
        <div class="sales-by-machine-card__metric-label">
          Всего<br />
          проданных единиц
        </div>
      </div>

      <div class="sales-by-machine-card__summary-card sales-by-machine-card__summary-card--accent">
        <div class="sales-by-machine-card__metric-row">
          <div class="sales-by-machine-card__metric-value">
            {{ formatNumber(data.soldInTopFive) }}
          </div>

          <div class="sales-by-machine-card__metric-badge">
            {{ topFivePercent }}
          </div>
        </div>

        <div class="sales-by-machine-card__metric-label">
          Итого продано<br />
          в топ-5 ТА
        </div>
      </div>
    </div>

    <template #footer>
      <button class="sales-by-machine-card__report-link" type="button">
        <span>Перейти в отчет</span>
        <img :src="icons.arrow" alt="arrow" />
      </button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import type { VendingMachineTotalSales, VendingMachinesTotalSalesOverview } from '../../types'
import { formatNumber, formatPercent } from '../../utils'

const base = import.meta.env.BASE_URL

function asset(name: string): string {
  return `${base}${name}`
}

const icons = {
  arrow: asset('img18.png'),
} as const

const props = defineProps<{
  data: VendingMachinesTotalSalesOverview
}>()

const chartItems = computed<VendingMachineTotalSales[]>(() => {
  const items = [...props.data.topVendingMachines]

  while (items.length < 6) {
    items.push({
      totalSales: 0,
      percentageOfAllSales: 0,
    })
  }

  return items.slice(0, 6)
})

const topFivePercent = computed(() => {
  if (!props.data.totalSales) {
    return '0%'
  }

  return formatPercent((props.data.soldInTopFive / props.data.totalSales) * 100)
})

function getColumnHeight(value: number): number {
  return Math.max(8, Math.min(value * 2, 100))
}

function getColumnVariant(index: number): 'accent' | 'neutral' {
  return index === chartItems.value.length - 1 ? 'neutral' : 'accent'
}

function showMarker(index: number): boolean {
  return index < 3
}

function getMarkerVariant(index: number): 'yellow' | 'gray' | 'brown' {
  if (index === 0) return 'yellow'
  if (index === 1) return 'gray'
  return 'brown'
}
</script>

<style scoped>
.sales-by-machine-card {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  border-radius: 18px;
  background: #fafafb;
}

.sales-by-machine-card__chart {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  align-items: end;
  gap: 8px;
  min-height: 182px;
  margin-bottom: 18px;
}

.sales-by-machine-card__column-wrap {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
}

.sales-by-machine-card__top-percent {
  min-width: 0;
  text-align: center;
  color: #8f99ab;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
  white-space: nowrap;
}

.sales-by-machine-card__column-track {
  position: relative;
  width: 100%;
  height: 132px;
  min-width: 0;
  overflow: hidden;
  border-radius: 8px;
  background: #eef1f5;
}

.sales-by-machine-card__column-fill {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
}

.sales-by-machine-card__column-fill--accent {
  background: var(--color-accent);
}

.sales-by-machine-card__column-fill--neutral {
  background: #667388;
}

.sales-by-machine-card__column-marker {
  position: absolute;
  top: -8px;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translateX(-50%);
}

.sales-by-machine-card__column-marker--yellow {
  background: #f5c542;
}

.sales-by-machine-card__column-marker--gray {
  background: #bcc4d2;
}

.sales-by-machine-card__column-marker--brown {
  background: #b25f1e;
}

.sales-by-machine-card__summary {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 8px;
}

.sales-by-machine-card__summary-card {
  min-width: 0;
  min-height: 136px;
  padding: 16px 14px;
  border-radius: 12px;
  background: #f7f8fb;
}

.sales-by-machine-card__metric-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}

.sales-by-machine-card__metric-value {
  min-width: 0;
  color: #2f384c;
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sales-by-machine-card__metric-badge {
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

.sales-by-machine-card__metric-label {
  margin-top: 14px;
  color: #8f99ab;
  font-size: 14px;
  line-height: 1.35;
  font-weight: 500;
}

.sales-by-machine-card__report-link {
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
  cursor: pointer;
  transition:
      background-color 0.18s ease,
      border-color 0.18s ease,
      color 0.18s ease;
}

.sales-by-machine-card__report-link:hover {
  background: #e9edf3;
}

.sales-by-machine-card__report-link img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.45;
}

@media (max-width: 1200px) {
  .sales-by-machine-card__chart {
    gap: 6px;
    min-height: 170px;
  }

  .sales-by-machine-card__column-track {
    height: 120px;
  }

  .sales-by-machine-card__summary-card {
    min-height: 124px;
    padding: 14px 12px;
  }

  .sales-by-machine-card__metric-value {
    font-size: 24px;
  }

  .sales-by-machine-card__metric-label {
    font-size: 13px;
  }

  .sales-by-machine-card__metric-badge {
    min-width: 38px;
    height: 26px;
    font-size: 12px;
  }
}

@media (max-width: 900px) {
  .sales-by-machine-card__chart {
    gap: 4px;
    min-height: 150px;
  }

  .sales-by-machine-card__column-track {
    height: 108px;
  }

  .sales-by-machine-card__summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
  }

  .sales-by-machine-card__summary-card {
    min-height: 110px;
    padding: 10px 8px;
  }

  .sales-by-machine-card__metric-value {
    font-size: 20px;
  }

  .sales-by-machine-card__metric-badge {
    min-width: 34px;
    height: 24px;
    font-size: 11px;
  }

  .sales-by-machine-card__metric-label {
    margin-top: 10px;
    font-size: 11px;
    line-height: 1.25;
  }
}
</style>