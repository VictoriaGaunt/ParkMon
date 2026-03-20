<template>
  <section class="dashboard-nav">
    <BaseTabs
        :model-value="currentValue"
        :items="periodTabs"
        size="md"
        variant="default"
        @update:model-value="handleChange"
    />

    <div class="dashboard-nav__range">
      {{ dateRange }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseTabs from '../ui/BaseTabs.vue'

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

const periodTabs = [
  { label: 'Сегодня', value: 'today' },
  { label: 'Вчера', value: 'yesterday' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
  { label: 'Квартал', value: 'quarter' },
] as const

function handleChange(value: string) {
  emit('update:modelValue', value as PeriodValue)
}
</script>

<style scoped>
.dashboard-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 56px;
  padding: 0 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: #f5f6f8;
}

.dashboard-nav__range {
  flex-shrink: 0;
  color: #3b4354;
  font-size: 15px;
  line-height: 1.2;
  font-weight: 600;
}

@media (max-width: 992px) {
  .dashboard-nav {
    flex-direction: column;
    align-items: flex-start;
    padding: 14px 16px;
  }

  .dashboard-nav__range {
    font-size: 14px;
  }
}
</style>