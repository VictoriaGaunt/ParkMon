<template>
  <BaseCard
      class="peak-sales-card"
      title="Время пиковых продаж"
      padding="md"
      flat
  >
    <template #actions>
      <BaseTabs
          v-model="activeView"
          :items="viewTabs"
          size="sm"
          variant="default"
      />
    </template>

    <div v-if="activeView === 'line'" class="peak-sales-card__chart-layout">
      <div class="peak-sales-card__y-axis">
        <div
            v-for="slot in timeSlots"
            :key="slot"
            class="peak-sales-card__y-label"
        >
          {{ slot }}
        </div>
      </div>

      <div class="peak-sales-card__chart-area">
        <div class="peak-sales-card__grid">
          <div
              v-for="day in days"
              :key="`grid-${day}`"
              class="peak-sales-card__grid-col"
          ></div>
        </div>

        <svg
            class="peak-sales-card__svg"
            viewBox="0 0 1000 240"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
          <path
              :d="linePath"
              class="peak-sales-card__line"
          />
        </svg>

        <div class="peak-sales-card__x-axis">
          <div
              v-for="day in days"
              :key="day"
              class="peak-sales-card__x-label"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>

    <div v-else class="peak-sales-card__heatmap">
      <div class="peak-sales-card__heatmap-grid">
        <div
            v-for="cell in heatmapCells"
            :key="`${cell.day}-${cell.slot}`"
            class="peak-sales-card__heatmap-cell"
            :style="{ opacity: String(cell.intensity) }"
        ></div>
      </div>

      <div class="peak-sales-card__heatmap-note">
        Heatmap preview mode
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import BaseTabs from '../ui/BaseTabs.vue'
import type { PeakSaleTimeAtDay } from '../../types'

type ViewMode = 'line' | 'heatmap'

interface HeatmapCell {
  day: number
  slot: string
  intensity: number
}

const props = defineProps<{
  data: PeakSaleTimeAtDay[]
}>()

const activeView = ref<ViewMode>('line')

const viewTabs = [
  { label: 'Линейный график', value: 'line' },
  { label: 'Тепловая карта', value: 'heatmap' },
] as const

const timeSlots = [
  '00:00 – 05:59',
  '06:00 – 09:59',
  '10:00 – 11:59',
  '12:00 – 15:59',
  '16:00 – 19:59',
  '20:00 – 23:59',
] as const

const days = computed(() => {
  return Array.from({ length: 31 }, (_, index) => index + 1)
})

const normalizedPoints = computed(() => {
  const map = new Map<number, PeakSaleTimeAtDay>()

  for (const item of props.data) {
    map.set(item.day, item)
  }

  return days.value.map((day) => {
    const point = map.get(day)

    if (!point) {
      return {
        day,
        slotIndex: 2.5,
      }
    }

    return {
      day,
      slotIndex: mapTimeToSlotIndex(point.peakSalesTime),
    }
  })
})

const linePath = computed(() => {
  const width = 1000
  const height = 240
  const xStep = width / Math.max(days.value.length - 1, 1)

  const points = normalizedPoints.value.map((point, index) => {
    const x = index * xStep
    const y = mapSlotIndexToY(point.slotIndex, height)
    return { x, y }
  })

  if (!points.length) {
    return ''
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`
  }

  let d = `M ${points[0].x} ${points[0].y}`

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index]
    const next = points[index + 1]
    const controlX = (current.x + next.x) / 2

    d += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`
  }

  return d
})

const heatmapCells = computed<HeatmapCell[]>(() => {
  const cells: HeatmapCell[] = []

  for (const day of days.value) {
    const point = normalizedPoints.value.find((item) => item.day === day)
    const activeSlot = point ? Math.round(point.slotIndex) : 0

    timeSlots.forEach((slot, slotIndex) => {
      const distance = Math.abs(slotIndex - activeSlot)
      const intensity = Math.max(0.15, 1 - distance * 0.28)

      cells.push({
        day,
        slot,
        intensity,
      })
    })
  }

  return cells
})

function mapTimeToSlotIndex(timeValue: string): number {
  const parts = timeValue.split(':')

  if (parts.length < 2) {
    return 2.5
  }

  const hours = Number(parts[0])
  const minutes = Number(parts[1])

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return 2.5
  }

  const totalMinutes = hours * 60 + minutes

  if (totalMinutes <= 359) return 0
  if (totalMinutes <= 599) return 1
  if (totalMinutes <= 719) return 2
  if (totalMinutes <= 959) return 3
  if (totalMinutes <= 1199) return 4
  return 5
}

function mapSlotIndexToY(slotIndex: number, chartHeight: number): number {
  const minIndex = 0
  const maxIndex = 5
  const normalized = (slotIndex - minIndex) / (maxIndex - minIndex)
  const topPadding = 18
  const bottomPadding = 18
  const usableHeight = chartHeight - topPadding - bottomPadding

  return topPadding + normalized * usableHeight
}
</script>

<style scoped>
.peak-sales-card {
  min-width: 0;
  border-radius: 18px;
  background: #fafafb;
}

.peak-sales-card__chart-layout {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 16px;
  min-height: 240px;
}

.peak-sales-card__y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px 0 28px;
}

.peak-sales-card__y-label {
  color: #a4acba;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
}

.peak-sales-card__chart-area {
  position: relative;
  min-width: 0;
  min-height: 240px;
}

.peak-sales-card__grid {
  position: absolute;
  inset: 0 0 28px 0;
  display: grid;
  grid-template-columns: repeat(31, minmax(0, 1fr));
  gap: 0;
  pointer-events: none;
}

.peak-sales-card__grid-col {
  border-left: 1px solid #eef1f5;
}

.peak-sales-card__grid-col:last-child {
  border-right: 1px solid #eef1f5;
}

.peak-sales-card__svg {
  position: absolute;
  inset: 0 0 28px 0;
  width: 100%;
  height: calc(100% - 28px);
  overflow: visible;
}

.peak-sales-card__line {
  fill: none;
  stroke: #667487;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.peak-sales-card__x-axis {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(31, minmax(0, 1fr));
  align-items: center;
  height: 28px;
}

.peak-sales-card__x-label {
  text-align: center;
  color: #a4acba;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
}

.peak-sales-card__heatmap {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.peak-sales-card__heatmap-grid {
  display: grid;
  grid-template-columns: repeat(31, minmax(0, 1fr));
  gap: 6px;
}

.peak-sales-card__heatmap-cell {
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  background: #667487;
}

.peak-sales-card__heatmap-note {
  color: #98a1b2;
  font-size: 13px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .peak-sales-card__chart-layout {
    grid-template-columns: 1fr;
  }

  .peak-sales-card__y-axis {
    display: none;
  }
}
</style>