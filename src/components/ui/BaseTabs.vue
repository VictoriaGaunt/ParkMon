<template>
  <div
      class="base-tabs"
      :class="[
      `base-tabs--${size}`,
      `base-tabs--${variant}`,
      { 'base-tabs--full': fullWidth }
    ]"
      role="tablist"
  >
    <button
        v-for="item in items"
        :key="item.value"
        type="button"
        class="base-tabs__item"
        :class="{ 'is-active': item.value === modelValue }"
        role="tab"
        :aria-selected="item.value === modelValue"
        @click="handleSelect(item.value)"
    >
      <span class="base-tabs__label">{{ item.label }}</span>

      <span v-if="item.badge" class="base-tabs__badge">
        {{ item.badge }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
export interface BaseTabsItem {
  label: string
  value: string
  badge?: string | number
}

const props = withDefaults(
    defineProps<{
      items: readonly BaseTabsItem[]
      modelValue: string
      size?: 'sm' | 'md'
      variant?: 'default' | 'pill'
      fullWidth?: boolean
    }>(),
    {
      size: 'md',
      variant: 'default',
      fullWidth: false,
    },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

function handleSelect(value: string) {
  if (value === props.modelValue) {
    return
  }

  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
.base-tabs {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.base-tabs--full {
  display: flex;
  width: 100%;
}

.base-tabs--default {
  background: transparent;
}

.base-tabs--pill {
  padding: 4px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: #f6f7fa;
}

.base-tabs__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 10px;
  color: #5f687c;
  font-weight: 500;
  transition:
      background-color var(--transition-base),
      color var(--transition-base),
      border-color var(--transition-base);
}

.base-tabs--full .base-tabs__item {
  flex: 1;
}

.base-tabs--sm .base-tabs__item {
  min-height: 32px;
  padding: 0 10px;
  font-size: 13px;
}

.base-tabs--md .base-tabs__item {
  min-height: 38px;
  padding: 0 14px;
  font-size: 15px;
}

.base-tabs--default .base-tabs__item.is-active {
  background: #f3f4f7;
  border: 1px solid var(--color-border);
  color: #3b4354;
}

.base-tabs--pill .base-tabs__item.is-active {
  background: var(--color-bg-surface);
  color: #3b4354;
  box-shadow: var(--shadow-sm);
}

.base-tabs__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.06);
  font-size: 11px;
  line-height: 1;
}
</style>