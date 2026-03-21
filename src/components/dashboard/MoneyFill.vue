<template>
  <BaseCard
      class="money-fill-card"
      title="Состояние денежных средств"
      padding="md"
      flat
  >
    <div class="money-fill-card__filter">
      <button class="money-fill-card__filter-btn" type="button">
        <img :src="icons.filter" alt="filter" />
        <span>Сначала полные ТА</span>
      </button>
    </div>

    <div class="money-fill-card__list">
      <div
          v-for="item in normalizedData"
          :key="item.machineId"
          class="money-fill-card__row"
      >
        <div class="money-fill-card__machine">
          <span class="money-fill-card__type">{{ item.machineType }}</span>
          <span class="money-fill-card__id"># {{ item.machineId }}</span>
        </div>

        <div class="money-fill-card__metric">
          <div class="money-fill-card__metric-top">
            <img class="money-fill-card__metric-icon" :src="icons.coins" alt="coins" />
            <span class="money-fill-card__percent">
              {{ formatPercent(item.coinFillPercentage) }}
            </span>
          </div>

          <div class="money-fill-card__progress">
            <div
                class="money-fill-card__progress-bar"
                :class="`money-fill-card__progress-bar--${getMetricVariant(item.machineType, item.coinFillPercentage)}`"
                :style="{ width: `${clampPercent(item.coinFillPercentage)}%` }"
            ></div>
          </div>
        </div>

        <div class="money-fill-card__metric">
          <div class="money-fill-card__metric-top">
            <img class="money-fill-card__metric-icon" :src="icons.banknotes" alt="banknotes" />
            <span class="money-fill-card__percent">
              {{ formatPercent(item.banknotesFillPercentage) }}
            </span>
          </div>

          <div class="money-fill-card__progress">
            <div
                class="money-fill-card__progress-bar"
                :class="`money-fill-card__progress-bar--${getMetricVariant(item.machineType, item.banknotesFillPercentage)}`"
                :style="{ width: `${clampPercent(item.banknotesFillPercentage)}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <button class="money-fill-card__report-link" type="button">
        <span>Перейти в отчет</span>
        <img :src="icons.arrow" alt="arrow" />
      </button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import type { VendingMachineMoneyStatus } from '../../types'
import { formatPercent } from '../../utils'

const base = import.meta.env.BASE_URL

function asset(name: string): string {
  return `${base}${name}`
}

const icons = {
  filter: asset('img21.png'),
  coins: asset('img22.png'),
  banknotes: asset('img23.png'),
  arrow: asset('img18.png'),
} as const

const props = defineProps<{
  data: VendingMachineMoneyStatus[]
}>()

const normalizedData = computed(() => {
  return [...props.data]
      .sort((a, b) => {
        const aAvg = (a.coinFillPercentage + a.banknotesFillPercentage) / 2
        const bAvg = (b.coinFillPercentage + b.banknotesFillPercentage) / 2
        return bAvg - aAvg
      })
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

function getMetricVariant(machineType: string, value: number): 'success' | 'warning' | 'danger' {
  const type = machineType.toUpperCase()

  if (type === 'B') {
    if (value <= 49) {
      return 'success'
    }
    if (value <= 89) {
      return 'warning'
    }
    return 'danger'
  }

  if (type === 'M') {
    if (value <= 39) {
      return 'success'
    }
    if (value <= 74) {
      return 'warning'
    }
    return 'danger'
  }

  if (value <= 49) {
    return 'success'
  }
  if (value <= 89) {
    return 'warning'
  }
  return 'danger'
}
</script>

<style scoped>
.money-fill-card {
  min-width: 0;
  border-radius: 18px;
  background: #fafafb;
}

.money-fill-card__filter-btn,
.money-fill-card__report-link {
  cursor: pointer;
  transition:
      background-color 0.18s ease,
      border-color 0.18s ease,
      color 0.18s ease;
}

.money-fill-card__filter {
  margin-bottom: 14px;
}

.money-fill-card__filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 30px;
  padding: 0 12px;
  border: 1px solid #edf0f4;
  border-radius: 10px;
  background: #f5f7fa;
  color: #8f99ab;
  font-size: 14px;
  font-weight: 500;
}

.money-fill-card__filter-btn:hover {
  background: #e9edf3;
  border-color: #d6dbe5;
}

.money-fill-card__filter-btn img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.5;
}

.money-fill-card__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.money-fill-card__row {
  display: grid;
  grid-template-columns: 118px 1fr 1fr;
  align-items: start;
  gap: 12px;
  min-height: 48px;
  padding: 6px 10px;
  border-radius: 10px;
  background: #f7f8fb;
}

.money-fill-card__machine {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding-top: 2px;
}

.money-fill-card__type {
  flex-shrink: 0;
  color: var(--color-accent);
  font-size: 18px;
  line-height: 1;
  font-weight: 700;
  text-transform: uppercase;
}

.money-fill-card__id {
  color: #2f384c;
  font-size: 15px;
  line-height: 1.2;
  font-weight: 600;
  white-space: nowrap;
}

.money-fill-card__metric {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.money-fill-card__metric-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.money-fill-card__metric-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.42;
  flex-shrink: 0;
}

.money-fill-card__percent {
  color: #8f99ab;
  font-size: 13px;
  line-height: 1;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.money-fill-card__progress {
  width: 100%;
  height: 4px;
  overflow: hidden;
  border-radius: 999px;
  background: #eceff4;
}

.money-fill-card__progress-bar {
  height: 100%;
  border-radius: inherit;
}

.money-fill-card__progress-bar--success {
  background: #20b26b;
}

.money-fill-card__progress-bar--warning {
  background: #f59e0b;
}

.money-fill-card__progress-bar--danger {
  background: #ef4444;
}

.money-fill-card__report-link {
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

.money-fill-card__report-link:hover {
  background: #e9edf3;
}

.money-fill-card__report-link img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.45;
}

@media (max-width: 1100px) {
  .money-fill-card__row {
    grid-template-columns: 104px 1fr 1fr;
    gap: 10px;
  }

  .money-fill-card__id {
    font-size: 14px;
  }

  .money-fill-card__percent {
    font-size: 12px;
  }
}

@media (max-width: 800px) {
  .money-fill-card__row {
    grid-template-columns: 92px 1fr 1fr;
    gap: 8px;
    padding: 6px 8px;
  }

  .money-fill-card__type {
    font-size: 16px;
  }

  .money-fill-card__id {
    font-size: 13px;
  }
}
</style>