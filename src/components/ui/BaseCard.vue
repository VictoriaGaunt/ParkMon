<template>
  <section
      class="base-card"
      :class="[
      `base-card--padding-${padding}`,
      { 'base-card--flat': flat }
    ]"
  >
    <header
        v-if="$slots.header || title || subtitle || $slots.actions"
        class="base-card__header"
    >
      <div class="base-card__heading">
        <slot name="header">
          <h3 v-if="title" class="base-card__title">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="base-card__subtitle">
            {{ subtitle }}
          </p>
        </slot>
      </div>

      <div v-if="$slots.actions" class="base-card__actions">
        <slot name="actions" />
      </div>
    </header>

    <div class="base-card__content">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </footer>
  </section>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
      title?: string
      subtitle?: string
      padding?: 'none' | 'sm' | 'md' | 'lg'
      flat?: boolean
    }>(),
    {
      title: '',
      subtitle: '',
      padding: 'md',
      flat: false,
    },
)
</script>

<style scoped>
.base-card {
  background: #f8f9fb;
  border: 1px solid #d6dbe5;
  border-radius: 20px;
  box-shadow: 0 1px 2px rgba(31, 41, 55, 0.03);
}

.base-card--flat {
  box-shadow: none;
}

.base-card--padding-none .base-card__content {
  padding: 0;
}

.base-card--padding-sm .base-card__content {
  padding: 12px;
}

.base-card--padding-md .base-card__content {
  padding: 16px;
}

.base-card--padding-lg .base-card__content {
  padding: 20px;
}

.base-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 16px 0;
}

.base-card--padding-lg .base-card__header {
  padding: 20px 20px 0;
}

.base-card--padding-sm .base-card__header {
  padding: 12px 12px 0;
}

.base-card--padding-none .base-card__header {
  padding: 16px 16px 0;
}

.base-card__heading {
  min-width: 0;
}

.base-card__title {
  margin: 0;
  color: #3b4354;
  font-size: 16px;
  line-height: 1.35;
  font-weight: 600;
}

.base-card__subtitle {
  margin: 6px 0 0;
  color: #9aa3b2;
  font-size: 13px;
  line-height: 1.4;
}

.base-card__actions {
  flex-shrink: 0;
}

.base-card__content {
  min-width: 0;
}

.base-card__footer {
  padding: 0 16px 16px;
}

.base-card--padding-lg .base-card__footer {
  padding: 0 20px 20px;
}

.base-card--padding-sm .base-card__footer {
  padding: 0 12px 12px;
}

.base-card--padding-none .base-card__footer {
  padding: 0 16px 16px;
}

@media (max-width: 700px) {
  .base-card {
    border-radius: 18px;
  }

  .base-card--padding-md .base-card__content {
    padding: 14px;
  }

  .base-card__header {
    padding: 14px 14px 0;
  }

  .base-card__footer {
    padding: 0 14px 14px;
  }
}
</style>