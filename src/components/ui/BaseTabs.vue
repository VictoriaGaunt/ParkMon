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
  min-width: 0;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none;
}

.base-tabs::-webkit-scrollbar {
  display: none;
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
  border: 1px solid #d6dbe5;
  border-radius: 16px;
  background: #eef2f7;
}

.base-tabs__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 0 0 auto;
  border-radius: 14px;
  color: #5f687c;
  font-weight: 600;
  white-space: nowrap;
  transition:
      background-color 0.18s ease,
      color 0.18s ease,
      border-color 0.18s ease,
      box-shadow 0.18s ease;
}

.base-tabs__item:hover {
  background: #e2e7ef;
}

.base-tabs--full .base-tabs__item {
  flex: 0 0 auto;
}

.base-tabs--sm .base-tabs__item {
  min-height: 34px;
  min-width: 120px;
  padding: 0 12px;
  font-size: 13px;
}

.base-tabs--md .base-tabs__item {
  min-height: 40px;
  min-width: 150px;
  padding: 0 16px;
  font-size: 15px;
}

.base-tabs--default .base-tabs__item.is-active {
  background: #f5f7fa;
  border: 1px solid #d6dbe5;
  color: #384154;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.45);
}

.base-tabs--pill .base-tabs__item.is-active {
  background: #f8f9fb;
  color: #384154;
  box-shadow: inset 0 0 0 1px #d6dbe5;
}

.base-tabs__label {
  white-space: nowrap;
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

@media (max-width: 700px) {
  .base-tabs--md .base-tabs__item {
    min-height: 36px;
    min-width: 132px;
    padding: 0 14px;
    font-size: 14px;
  }

  .base-tabs--sm .base-tabs__item {
    min-height: 32px;
    min-width: 110px;
    padding: 0 10px;
    font-size: 12px;
  }
}
</style>