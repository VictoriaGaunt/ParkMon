<template>
  <span
      class="base-badge"
      :class="[
      `base-badge--${variant}`,
      `base-badge--${size}`,
      { 'base-badge--dot': dot }
    ]"
  >
    <span v-if="dot" class="base-badge__dot"></span>
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
      label?: string
      variant?: 'default' | 'neutral' | 'success' | 'warning' | 'danger' | 'accent'
      size?: 'sm' | 'md'
      dot?: boolean
    }>(),
    {
      label: '',
      variant: 'default',
      size: 'sm',
      dot: false,
    },
)
</script>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 600;
  line-height: 1;
}

.base-badge--sm {
  min-height: 22px;
  padding: 0 8px;
  font-size: 11px;
}

.base-badge--md {
  min-height: 28px;
  padding: 0 10px;
  font-size: 12px;
}

.base-badge--default,
.base-badge--neutral {
  background: #eef1f6;
  color: #8d96a8;
  border-color: #e2e7ef;
}

.base-badge--success {
  background: rgba(32, 178, 107, 0.1);
  color: var(--color-success);
  border-color: rgba(32, 178, 107, 0.18);
}

.base-badge--warning {
  background: rgba(245, 158, 11, 0.12);
  color: var(--color-warning);
  border-color: rgba(245, 158, 11, 0.2);
}

.base-badge--danger {
  background: rgba(209, 67, 67, 0.1);
  color: var(--color-danger);
  border-color: rgba(209, 67, 67, 0.16);
}

.base-badge--accent {
  background: rgba(213, 31, 74, 0.08);
  color: var(--color-accent);
  border-color: rgba(213, 31, 74, 0.14);
}

.base-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
</style>