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
  background: var(--color-bg-app);
}

.dashboard-layout__sidebar {
  width: 370px;
  min-width: 370px;
  flex: 0 0 370px;
}

.dashboard-layout__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.dashboard-layout__topbar {
  background: var(--color-bg-surface);
}

.dashboard-layout__content {
  flex: 1;
  padding: 20px;
}

@media (max-width: 1100px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .dashboard-layout__sidebar {
    width: 100%;
    min-width: 0;
    flex-basis: auto;
  }

  .dashboard-layout__content {
    padding: 16px;
  }
}
</style>