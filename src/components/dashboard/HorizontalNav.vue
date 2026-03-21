<template>
  <section class="dashboard-nav">
    <div class="dashboard-nav__tabs" role="tablist" aria-label="Период">
      <button
          v-for="item in periodTabs"
          :key="item.value"
          type="button"
          class="dashboard-nav__tab"
          :class="{ 'is-active': currentValue === item.value }"
          :aria-pressed="currentValue === item.value"
          @click="handleChange(item.value)"
      >
        {{ item.label }}
      </button>
    </div>

    <button
        type="button"
        class="dashboard-nav__range"
        aria-label="Выбранный диапазон дат"
    >
      {{ dateRange }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type PeriodValue = 'today' | 'yesterday' | 'week' | 'month' | 'quarter'

const props = withDefaults(
    defineProps<{
      modelValue?: PeriodValue
      dateRange?: string
    }>(),
    {
      modelValue: 'month',
      dateRange: '23.08.2023 – 20.09.2024',
    },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: PeriodValue): void
}>()

const currentValue = computed<PeriodValue>(() => props.modelValue ?? 'month')

const periodTabs: ReadonlyArray<{ label: string; value: PeriodValue }> = [
  { label: 'Сегодня', value: 'today' },
  { label: 'Вчера', value: 'yesterday' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
  { label: 'Квартал', value: 'quarter' },
]

function handleChange(value: PeriodValue): void {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.dashboard-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  min-width: 0;
  padding: 12px 18px;
  border: 1px solid #d6dbe5;
  border-radius: 24px;
  background: #f6f8fb;
}

.dashboard-nav__tabs {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1 1 auto;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.dashboard-nav__tabs::-webkit-scrollbar {
  display: none;
}

.dashboard-nav__tab {
  flex: 0 0 auto;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 16px;
  color: #546179;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  transition:
      background-color 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease;
}

.dashboard-nav__tab:hover {
  background: #e7ebf2;
}

.dashboard-nav__tab.is-active {
  background: #e9edf3;
  color: #2f384c;
  box-shadow: inset 0 0 0 1px #d6dbe5;
}

.dashboard-nav__range {
  flex: 0 0 auto;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 16px;
  color: #2f384c;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  text-align: center;
  transition: background-color 0.18s ease;
}

.dashboard-nav__range:hover {
  background: #eef2f7;
}

@media (max-width: 1200px) {
  .dashboard-nav {
    gap: 12px;
    padding: 10px 14px;
    border-radius: 20px;
  }

  .dashboard-nav__tab,
  .dashboard-nav__range {
    min-height: 42px;
    padding: 0 14px;
    font-size: 14px;
  }
}

@media (max-width: 900px) {
  .dashboard-nav {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .dashboard-nav__tabs {
    width: 100%;
  }

  .dashboard-nav__range {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .dashboard-nav {
    padding: 10px 10px;
    border-radius: 18px;
  }

  .dashboard-nav__tab,
  .dashboard-nav__range {
    min-height: 40px;
    padding: 0 12px;
    font-size: 13px;
    border-radius: 14px;
  }
}
</style>