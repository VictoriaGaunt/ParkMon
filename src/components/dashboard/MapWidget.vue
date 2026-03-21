<template>
  <BaseCard class="map-widget" padding="none" flat>
    <div class="map-widget__body">
      <MapPlaceholder />
    </div>

    <div class="map-widget__footer">
      <div class="map-widget__tabs" role="tablist" aria-label="Параметры карты">
        <button
            v-for="item in mapTabs"
            :key="item.value"
            type="button"
            class="map-widget__tab"
            :class="{ 'is-active': activeTab === item.value }"
            :aria-pressed="activeTab === item.value"
            @click="activeTab = item.value"
        >
          <span class="map-widget__tab-label">{{ item.label }}</span>
        </button>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import MapPlaceholder from './MapPlaceholder.vue'

type MapTabValue = 'status' | 'revenue' | 'downtime' | 'fill'

const activeTab = ref<MapTabValue>('status')

const mapTabs: Array<{ label: string; value: MapTabValue }> = [
  { label: 'Состояние автоматов', value: 'status' },
  { label: 'Средняя выручка', value: 'revenue' },
  { label: 'Простой ТА', value: 'downtime' },
  { label: 'Уровень заполнения', value: 'fill' },
]
</script>

<style scoped>
.map-widget {
  overflow: hidden;
  border: 1px solid #d6dbe5;
  border-radius: 22px;
  background: #f7f8fb;
}

.map-widget__body {
  min-height: 360px;
  background: #f7f8fb;
}

.map-widget__footer {
  padding: 10px 14px 14px;
  border-top: 1px solid #e6eaf1;
  background: #f3f5f8;
}

.map-widget__tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
  min-width: 0;
}

.map-widget__tab {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 38px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: transparent;
  color: #536177;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  transition:
      background-color 0.18s ease,
      border-color 0.18s ease,
      color 0.18s ease;
}

.map-widget__tab:hover {
  background: #e9edf3;
}

.map-widget__tab.is-active {
  background: #f8f9fb;
  border-color: #d6dbe5;
  color: #2f384c;
}

.map-widget__tab-label {
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1200px) {
  .map-widget__body {
    min-height: 330px;
  }

  .map-widget__footer {
    padding: 10px 12px 12px;
  }

  .map-widget__tabs {
    gap: 6px;
  }

  .map-widget__tab {
    min-height: 36px;
    padding: 0 8px;
    font-size: 13px;
  }
}

@media (max-width: 900px) {
  .map-widget__body {
    min-height: 300px;
  }

  .map-widget__footer {
    padding: 8px 10px 10px;
  }

  .map-widget__tab {
    min-height: 34px;
    padding: 0 6px;
    font-size: 12px;
    border-radius: 10px;
  }
}

@media (max-width: 700px) {
  .map-widget {
    border-radius: 18px;
  }

  .map-widget__body {
    min-height: 260px;
  }

  .map-widget__tabs {
    gap: 4px;
  }

  .map-widget__tab {
    min-height: 32px;
    padding: 0 4px;
    font-size: 11px;
  }
}
</style>