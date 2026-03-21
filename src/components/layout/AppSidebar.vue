<template>
  <aside class="app-sidebar" :class="{ 'is-collapsed': !isExpanded }">
    <div class="app-sidebar__icons-column">
      <div class="app-sidebar__brand">
        <img class="app-sidebar__logo" :src="icons.logo" alt="Logo" />
      </div>

      <div class="app-sidebar__icons">
        <button
            v-for="item in sideIcons"
            :key="item.id"
            type="button"
            class="app-sidebar__icon-btn"
            :class="{ 'is-active': item.active }"
            :aria-label="item.label"
            @click="handleSideIconClick(item.id)"
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

    <transition name="sidebar-panel">
      <div v-if="isExpanded" class="app-sidebar__content">
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
    </transition>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const base = import.meta.env.BASE_URL

function asset(name: string): string {
  return `${base}${name}`
}

const icons = {
  logo: asset('img1.png'),
  dashboard: asset('img7.png'),
  settings: asset('img8.png'),
  cash: asset('img9.png'),
  gift: asset('img10.png'),
  security: asset('img11.png'),
  help: asset('img12.png'),
  messages: asset('img13.png'),

  parkMonitor: asset('img14.png'),
  remote: asset('img15.png'),
  registration: asset('img16.png'),
  decommission: asset('img17.png'),
} as const

interface SidebarItem {
  id: string
  label: string
  icon: string
  active?: boolean
}

const isExpanded = ref(true)

const sideIcons: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: icons.dashboard, active: true },
  { id: 'settings', label: 'Settings', icon: icons.settings },
  { id: 'cash', label: 'Cash', icon: icons.cash },
  { id: 'gift', label: 'Gift', icon: icons.gift },
  { id: 'security', label: 'Security', icon: icons.security },
]

const menuItems: SidebarItem[] = [
  { id: 'park-monitor', label: 'Монитор парка ТА', icon: icons.parkMonitor, active: true },
  { id: 'remote-control', label: 'Удаленное управление ТА', icon: icons.remote },
  { id: 'registration', label: 'Регистрация ТА', icon: icons.registration },
  { id: 'decommission', label: 'Вывод ТА из эксплуатации', icon: icons.decommission },
]

const bottomIcons: SidebarItem[] = [
  { id: 'help', label: 'Help', icon: icons.help },
  { id: 'messages', label: 'Messages', icon: icons.messages },
]

function handleSideIconClick(id: string): void {
  if (id === 'dashboard') {
    isExpanded.value = !isExpanded.value
  }
}
</script>

<style scoped>
.app-sidebar {
  display: grid;
  grid-template-columns: 82px 260px;
  min-height: 100vh;
  background: #eef1f5;
  border-right: 1px solid #d6dbe5;
  transition: grid-template-columns 0.22s ease;
}

.app-sidebar.is-collapsed {
  grid-template-columns: 82px 0;
}

.app-sidebar__icons-column {
  display: flex;
  flex-direction: column;
  min-width: 82px;
  background: #f6f8fb;
  border-right: 1px solid #d6dbe5;
}

.app-sidebar__brand {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 82px;
  background: #d60039;
  overflow: hidden;
}

.app-sidebar__logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.app-sidebar__icons,
.app-sidebar__bottom-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-sidebar__icons {
  gap: 18px;
  padding-top: 18px;
}

.app-sidebar__bottom-icons {
  gap: 18px;
  margin-top: auto;
  padding-bottom: 18px;
}

.app-sidebar__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 16px;
  overflow: hidden;
}

.app-sidebar__icon-btn:hover {
  background: #e2e7ef;
}

.app-sidebar__icon-btn.is-active {
  background: #e1e6ee;
}

.app-sidebar__icon-btn img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.app-sidebar__content {
  min-width: 0;
  overflow: hidden;
  background: #eef1f5;
  padding: 22px 14px 20px 20px;
}

.app-sidebar__title {
  margin-bottom: 22px;
  color: #95a1b6;
  font-size: 16px;
  line-height: 1.35;
  font-weight: 700;
}

.app-sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.app-sidebar__nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 52px;
  padding: 0 14px;
  border-radius: 16px;
  color: #30384b;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  transition: background-color 0.18s ease;
}

.app-sidebar__nav-item:hover {
  background: #dde3ec;
}

.app-sidebar__nav-item.is-active {
  background: #dfe4ec;
}

.app-sidebar__nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  object-fit: contain;
  opacity: 0.9;
}

.sidebar-panel-enter-active,
.sidebar-panel-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.sidebar-panel-enter-from,
.sidebar-panel-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

@media (max-width: 1400px) {
  .app-sidebar {
    grid-template-columns: 78px 248px;
  }

  .app-sidebar.is-collapsed {
    grid-template-columns: 78px 0;
  }

  .app-sidebar__icons-column {
    min-width: 78px;
  }

  .app-sidebar__brand {
    height: 78px;
  }
}

@media (max-width: 1100px) {
  .app-sidebar {
    grid-template-columns: 74px 232px;
  }

  .app-sidebar.is-collapsed {
    grid-template-columns: 74px 0;
  }

  .app-sidebar__icons-column {
    min-width: 74px;
  }

  .app-sidebar__icon-btn {
    width: 46px;
    height: 46px;
  }

  .app-sidebar__icon-btn img {
    width: 22px;
    height: 22px;
  }

  .app-sidebar__nav-item {
    min-height: 48px;
    font-size: 14px;
  }
}

@media (max-width: 900px) {
  .app-sidebar {
    grid-template-columns: 70px 208px;
  }

  .app-sidebar.is-collapsed {
    grid-template-columns: 70px 0;
  }

  .app-sidebar__icons-column {
    min-width: 70px;
  }

  .app-sidebar__content {
    padding: 18px 10px 18px 14px;
  }

  .app-sidebar__title {
    font-size: 15px;
  }
}
</style>