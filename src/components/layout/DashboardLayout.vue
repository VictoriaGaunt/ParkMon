<template>
  <div class="dashboard-layout">
    <div class="dashboard-layout__sidebar">
      <slot name="sidebar" />
    </div>

    <div class="dashboard-layout__main">
      <div class="dashboard-layout__topbar">
        <slot name="topbar" />
      </div>

      <main class="dashboard-layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #e9edf3;
}

.dashboard-layout__sidebar {
  width: auto;
  min-width: 82px;
  flex: 0 0 auto;
}

.dashboard-layout__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.dashboard-layout__topbar {
  background: #f6f8fb;
}

.dashboard-layout__content {
  flex: 1;
  min-width: 0;
  padding: 22px;
}

@media (max-width: 1400px) {
  .dashboard-layout__content {
    padding: 18px;
  }
}

@media (max-width: 1100px) {
  .dashboard-layout__sidebar {
    min-width: 74px;
  }

  .dashboard-layout__content {
    padding: 16px;
  }
}

@media (max-width: 820px) {
  .dashboard-layout {
    flex-direction: row;
  }

  .dashboard-layout__content {
    padding: 14px;
  }
}
</style>