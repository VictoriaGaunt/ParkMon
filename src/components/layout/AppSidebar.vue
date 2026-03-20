<template>
  <aside class="app-sidebar">
    <div class="app-sidebar__icons-column">
      <div class="app-sidebar__brand">
        <img class="app-sidebar__logo" src="/img00.svg" alt="Logo" />
      </div>

      <div class="app-sidebar__icons">
        <button
            v-for="item in sideIcons"
            :key="item.id"
            type="button"
            class="app-sidebar__icon-btn"
            :class="{ 'is-active': item.active }"
            :aria-label="item.label"
        >
          <img :src="item.icon" :alt="item.label" />
        </button>
      </div>

      <div class="app-sidebar__bottom-icons">
        <button
            v-for="item in bottomIcons"
            :key="item.id"
            type="button"
            class="app-sidebar__icon-btn"
            :aria-label="item.label"
        >
          <img :src="item.icon" :alt="item.label" />
        </button>
      </div>
    </div>

    <div class="app-sidebar__content">
      <div class="app-sidebar__title">
        Администрирование<br />
        и мониторинг
      </div>

      <nav class="app-sidebar__nav">
        <button
            v-for="item in menuItems"
            :key="item.id"
            type="button"
            class="app-sidebar__nav-item"
            :class="{ 'is-active': item.active }"
        >
          <img class="app-sidebar__nav-icon" :src="item.icon" :alt="item.label" />
          <span>{{ item.label }}</span>
        </button>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface SidebarItem {
  id: string
  label: string
  icon: string
  active?: boolean
}

const sideIcons: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '/img00.svg', active: true },
  { id: 'settings', label: 'Settings', icon: '/img00.svg' },
  { id: 'cash', label: 'Cash', icon: '/img00.svg' },
  { id: 'gift', label: 'Gift', icon: '/img00.svg' },
  { id: 'security', label: 'Security', icon: '/img00.svg' },
]

const menuItems: SidebarItem[] = [
  { id: 'park-monitor', label: 'Монитор парка ТА', icon: '/img00.svg', active: true },
  { id: 'remote-control', label: 'Удаленное управление ТА', icon: '/img00.svg' },
  { id: 'registration', label: 'Регистрация ТА', icon: '/img00.svg' },
  { id: 'decommission', label: 'Вывод ТА из эксплуатации', icon: '/img00.svg' },
]

const bottomIcons: SidebarItem[] = [
  { id: 'help', label: 'Help', icon: '/img00.svg' },
  { id: 'messages', label: 'Messages', icon: '/img00.svg' },
]
</script>

<style scoped>
.app-sidebar {
  display: grid;
  grid-template-columns: 70px 1fr;
  min-height: 100vh;
  border-right: 1px solid var(--color-border);
  background: #f7f7f8;
}

.app-sidebar__icons-column {
  display: flex;
  flex-direction: column;
  background: #fbfbfc;
  border-right: 1px solid var(--color-border);
}

.app-sidebar__brand {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  background: #d70035;
}

.app-sidebar__logo {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.app-sidebar__icons,
.app-sidebar__bottom-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.app-sidebar__icons {
  padding-top: 18px;
}

.app-sidebar__bottom-icons {
  margin-top: auto;
  padding-bottom: 22px;
}

.app-sidebar__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
}

.app-sidebar__icon-btn.is-active {
  background: #ededf1;
}

.app-sidebar__icon-btn img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.app-sidebar__content {
  padding: 18px 12px 24px 20px;
}

.app-sidebar__title {
  margin-bottom: 20px;
  color: #a2aabc;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 600;
}

.app-sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.app-sidebar__nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 40px;
  padding: 0 12px;
  border-radius: 10px;
  color: #2f3647;
  font-size: 15px;
  text-align: left;
}

.app-sidebar__nav-item.is-active {
  background: #ececef;
}

.app-sidebar__nav-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  opacity: 0.8;
}

@media (max-width: 1100px) {
  .app-sidebar {
    min-height: auto;
  }
}
</style>