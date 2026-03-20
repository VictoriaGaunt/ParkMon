<template>
  <BaseCard
      class="money-fill-card"
      title="Состояние денежных средств"
      padding="md"
      flat
  >
    <div class="money-fill-card__filter">
      <button class="money-fill-card__filter-btn" type="button">
        <img src="/img00.svg" alt="" />
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

        <div class="money-fill-card__bars">
          <div class="money-fill-card__bar-group">
            <img class="money-fill-card__bar-icon" src="/img00.svg" alt="" />
            <div class="money-fill-card__progress">
              <div
                  class="money-fill-card__progress-bar money-fill-card__progress-bar--orange"
                  :style="{ width: `${clampPercent(item.coinFillPercentage)}%` }"
              ></div>
            </div>
            <span class="money-fill-card__percent">
              {{ formatPercent(item.coinFillPercentage) }}
            </span>
          </div>

          <div class="money-fill-card__bar-group">
            <img class="money-fill-card__bar-icon" src="/img00.svg" alt="" />
            <div class="money-fill-card__progress">
              <div
                  class="money-fill-card__progress-bar money-fill-card__progress-bar--green"
                  :style="{ width: `${clampPercent(item.banknotesFillPercentage)}%` }"
              ></div>
            </div>
            <span class="money-fill-card__percent">
              {{ formatPercent(item.banknotesFillPercentage) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <button class="money-fill-card__report-link" type="button">
        <span>Перейти в отчет</span>
        <img src="/img00.svg" alt="" />
      </button>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import type { VendingMachineMoneyStatus } from '../../types'
import { formatPercent } from '../../utils'

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
</script>

<style scoped>
.money-fill-card {
  min-width: 0;
  border-radius: 18px;
  background: #fafafb;
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
  color: #98a1b2;
  font-size: 14px;
  font-weight: 500;
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
  gap: 12px;
}

.money-fill-card__row {
  display: grid;
  grid-template-columns: 92px 1fr;
  align-items: center;
  gap: 14px;
}

.money-fill-card__machine {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
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
  color: #3b4354;
  font-size: 15px;
  line-height: 1.2;
  font-weight: 500;
}

.money-fill-card__bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.money-fill-card__bar-group {
  display: grid;
  grid-template-columns: 14px 1fr auto;
  align-items: center;
  gap: 8px;
}

.money-fill-card__bar-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.5;
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

.money-fill-card__progress-bar--orange {
  background: #f59e0b;
}

.money-fill-card__progress-bar--green {
  background: #20b26b;
}

.money-fill-card__percent {
  min-width: 34px;
  text-align: right;
  color: #98a1b2;
  font-size: 13px;
  line-height: 1;
  font-weight: 500;
}

.money-fill-card__report-link {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #98a1b2;
  font-size: 14px;
  font-weight: 500;
}

.money-fill-card__report-link img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.45;
}

@media (max-width: 640px) {
  .money-fill-card__row {
    grid-template-columns: 1fr;
  }
}
</style>