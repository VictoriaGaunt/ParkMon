<template>
  <BaseCard class="map-widget" padding="none" flat>
    <div class="map-widget__body">
      <MapPlaceholder />
    </div>

    <div class="map-widget__footer">
      <BaseTabs
          v-model="activeTab"
          :items="mapTabs"
          size="md"
          variant="default"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import BaseTabs from '../ui/BaseTabs.vue'
import MapPlaceholder from './MapPlaceholder.vue'

type MapTabValue = 'status' | 'revenue' | 'downtime' | 'fill'

const activeTab = ref<MapTabValue>('status')

const mapTabs = [
  { label: 'Состояние автоматов', value: 'status' },
  { label: 'Средняя выручка', value: 'revenue' },
  { label: 'Простой ТА', value: 'downtime' },
  { label: 'Уровень заполнения', value: 'fill' },
] as const
</script>

<style scoped>
.map-widget {
  overflow: hidden;
  border-radius: 18px;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
}

.map-widget__body {
  min-height: 380px;
}

.map-widget__footer {
  display: flex;
  justify-content: center;
  padding: 14px 18px 18px;
  border-top: 1px solid #f0f2f5;
  background: #fafafb;
}

@media (max-width: 992px) {
  .map-widget__footer {
    justify-content: flex-start;
    overflow-x: auto;
  }
}
</style>