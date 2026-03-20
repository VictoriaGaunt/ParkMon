<template>
  <section class="overview-cards">
    <BaseCard
        v-for="card in cards"
        :key="card.id"
        class="overview-cards__item"
        padding="md"
        flat
    >
      <div class="overview-card" :class="`overview-card--${card.variant}`">
        <div class="overview-card__top">
          <div class="overview-card__label">
            {{ card.label }}
          </div>

          <img
              class="overview-card__icon"
              src="/img00.svg"
              alt=""
              aria-hidden="true"
          />
        </div>

        <div class="overview-card__bottom">
          <div class="overview-card__value">
            {{ formatNumber(card.value) }}
          </div>

          <div
              v-if="card.meta"
              class="overview-card__meta"
          >
            {{ card.meta }}
          </div>
        </div>
      </div>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import type { VendingMachinesOverview } from '../../types'
import { formatNumber, formatPercent } from '../../utils'

interface OverviewCardItem {
  id: string
  label: string
  value: number
  meta?: string
  variant: 'default' | 'success' | 'warning' | 'danger'
}

const props = defineProps<{
  data: VendingMachinesOverview
}>()

const cards = computed<OverviewCardItem[]>(() => {
  const total = props.data.total || 0

  const workingPercent =
      total > 0 ? formatPercent((props.data.working / total) * 100) : '0%'

  const lowSupplyPercent =
      total > 0 ? formatPercent((props.data.lowSupply / total) * 100) : '0%'

  const needsRepairPercent =
      total > 0 ? formatPercent((props.data.needsRepair / total) * 100) : '0%'

  return [
    {
      id: 'total',
      label: 'Всего автоматов',
      value: props.data.total,
      variant: 'default',
    },
    {
      id: 'working',
      label: 'Работающих',
      value: props.data.working,
      meta: workingPercent,
      variant: 'success',
    },
    {
      id: 'low-supply',
      label: 'Мало товаров',
      value: props.data.lowSupply,
      meta: lowSupplyPercent,
      variant: 'warning',
    },
    {
      id: 'needs-repair',
      label: 'Требуют обслуживания',
      value: props.data.needsRepair,
      meta: needsRepairPercent,
      variant: 'danger',
    },
  ]
})
</script>

<style scoped>
.overview-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.overview-cards__item {
  min-width: 0;
  border-radius: 16px;
  background: #fafafb;
}

.overview-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 92px;
}

.overview-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.overview-card__label {
  color: #97a0b2;
  font-size: 14px;
  line-height: 1.3;
  font-weight: 400;
}

.overview-card__icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.45;
}

.overview-card__bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.overview-card__value {
  color: #2f3647;
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.overview-card__meta {
  color: #a5adbb;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
}

.overview-card--success .overview-card__value {
  color: var(--color-success);
}

.overview-card--warning .overview-card__value {
  color: #b85a17;
}

.overview-card--danger .overview-card__value {
  color: #b3261e;
}

@media (max-width: 1100px) {
  .overview-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .overview-cards {
    grid-template-columns: 1fr;
  }
}
</style>