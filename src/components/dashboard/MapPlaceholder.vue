<template>
  <div class="map-placeholder">
    <img
        class="map-placeholder__image"
        src="/img00.png"
        alt="Map"
    />

    <button class="map-placeholder__control map-placeholder__control--expand" type="button">
      <img src="/img00.svg" alt="" />
    </button>

    <button class="map-placeholder__control map-placeholder__control--help" type="button">
      <img src="/img00.svg" alt="" />
    </button>

    <div
        v-for="marker in markers"
        :key="marker.id"
        class="map-placeholder__marker"
        :class="`map-placeholder__marker--${marker.variant}`"
        :style="{ left: marker.left, top: marker.top }"
    >
      <span>{{ marker.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MarkerItem {
  id: string
  label: string
  left: string
  top: string
  variant: 'danger' | 'warning' | 'success'
}

const markers: MarkerItem[] = [
  { id: 'm1', label: '1', left: '36%', top: '21%', variant: 'danger' },
  { id: 'm2', label: '2', left: '29%', top: '62%', variant: 'danger' },
  { id: 'm3', label: '3', left: '8%', top: '36%', variant: 'warning' },
  { id: 'm4', label: '5', left: '74%', top: '12%', variant: 'warning' },
  { id: 'm5', label: '2', left: '92%', top: '58%', variant: 'success' },
]
</script>

<style scoped>
.map-placeholder {
  position: relative;
  width: 100%;
  min-height: 380px;
  overflow: hidden;
  background: #eef1f4;
}

.map-placeholder__image {
  width: 100%;
  height: 100%;
  min-height: 380px;
  object-fit: cover;
  display: block;
}

.map-placeholder__control {
  position: absolute;
  right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
}

.map-placeholder__control img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.map-placeholder__control--expand {
  top: 12px;
}

.map-placeholder__control--help {
  right: 12px;
  bottom: 12px;
}

.map-placeholder__marker {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 42px;
  height: 42px;
  border-radius: 50% 50% 50% 0;
  rotate: -45deg;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 3px solid currentColor;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
}

.map-placeholder__marker span {
  rotate: 45deg;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  color: currentColor;
}

.map-placeholder__marker--danger {
  color: #d51f4a;
}

.map-placeholder__marker--warning {
  color: #f39a2e;
}

.map-placeholder__marker--success {
  color: #18a567;
}
</style>