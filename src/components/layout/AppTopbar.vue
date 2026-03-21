<template>
  <header class="app-topbar">
    <button class="app-topbar__location" type="button" aria-label="Выбрать район">
      <div class="app-topbar__location-text">
        <div class="app-topbar__city">
          Санкт-Петербург / Адмиралтейский
        </div>

        <div class="app-topbar__district">
          <span class="app-topbar__district-name">Семёновский</span>
          <span class="app-topbar__badge">58</span>
        </div>
      </div>

      <span class="app-topbar__chevron">
        <img :src="icons.chevron" alt="chevron" />
      </span>
    </button>

    <div class="app-topbar__search">
      <button class="app-topbar__search-icon-btn" type="button" aria-label="Поиск">
        <img class="app-topbar__search-icon" :src="icons.search" alt="search" />
      </button>

      <input
          class="app-topbar__search-input"
          type="text"
          placeholder="Найти"
      />

      <button class="app-topbar__shortcut" type="button" aria-label="Горячая клавиша">
        <span class="app-topbar__shortcut-symbol">⇧</span>
        <span class="app-topbar__shortcut-plus">+</span>
        <span class="app-topbar__shortcut-text">S</span>
      </button>
    </div>

    <button class="app-topbar__updated" type="button" aria-label="Последнее обновление">
      <img class="app-topbar__updated-icon" :src="icons.updated" alt="updated" />

      <div class="app-topbar__updated-text">
        <div class="app-topbar__updated-label">Обновлено</div>
        <div class="app-topbar__updated-date">20.09.2024 в 12:35</div>
      </div>
    </button>

    <button class="app-topbar__notifications" type="button" aria-label="Уведомления">
      <img :src="icons.notifications" alt="notifications" />
      <span class="app-topbar__notification-dot"></span>
    </button>

    <button class="app-topbar__profile" type="button" aria-label="Профиль">
      <img class="app-topbar__avatar" :src="icons.avatar" alt="Профиль" />
    </button>
  </header>
</template>

<script setup lang="ts">
const base = import.meta.env.BASE_URL

function asset(name: string): string {
  return `${base}${name}`
}

const icons = {
  chevron: asset('img26.png'),
  search: asset('img2.png'),
  updated: asset('img4.png'),
  notifications: asset('img5.png'),
  avatar: asset('img24.png'),
} as const
</script>

<style scoped>
.app-topbar {
  display: grid;
  grid-template-columns:
    minmax(160px, 1.2fr)
    minmax(150px, 1.25fr)
    minmax(120px, 0.8fr)
    64px
    74px;
  min-height: 56px;
  background: #f6f8fb;
  border-bottom: 1px solid #d6dbe5;
}

.app-topbar > * {
  min-width: 0;
  border-left: 1px solid #d6dbe5;
}

.app-topbar > *:first-child {
  border-left: none;
}

.app-topbar__location,
.app-topbar__search,
.app-topbar__updated,
.app-topbar__notifications,
.app-topbar__profile {
  display: flex;
  align-items: center;
  min-width: 0;
  padding: 0 10px;
  background: transparent;
}

.app-topbar__location,
.app-topbar__updated,
.app-topbar__notifications,
.app-topbar__profile,
.app-topbar__search-icon-btn,
.app-topbar__shortcut {
  cursor: pointer;
}

.app-topbar__location:hover,
.app-topbar__updated:hover,
.app-topbar__notifications:hover,
.app-topbar__profile:hover,
.app-topbar__search-icon-btn:hover,
.app-topbar__shortcut:hover {
  background: #e9edf3;
}

.app-topbar__location {
  justify-content: space-between;
  gap: 8px;
  text-align: left;
}

.app-topbar__location-text {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.app-topbar__city {
  color: #9aa5b9;
  font-size: 11px;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-topbar__district {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.app-topbar__district-name {
  color: #2f384c;
  font-size: 13px;
  line-height: 1.1;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-topbar__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: #e3e8f0;
  color: #91a0b3;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
}

.app-topbar__chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 10px;
}

.app-topbar__chevron img {
  width: 12px;
  height: 12px;
  object-fit: contain;
}

.app-topbar__search {
  gap: 6px;
}

.app-topbar__search-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 10px;
}

.app-topbar__search-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.app-topbar__search-input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  outline: none;
  color: #374154;
  font-size: 13px;
}

.app-topbar__search-input::placeholder {
  color: #b3bcc9;
}

.app-topbar__shortcut {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  min-width: 44px;
  height: 30px;
  padding: 0 8px;
  border: 1px solid #d6dbe5;
  border-radius: 12px;
  background: #eef2f7;
  color: #97a4b6;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  flex-shrink: 0;
}

.app-topbar__shortcut-symbol {
  font-size: 13px;
  line-height: 1;
  transform: translateY(-1px);
}

.app-topbar__shortcut-plus,
.app-topbar__shortcut-text {
  font-size: 11px;
  line-height: 1;
}

.app-topbar__updated {
  gap: 8px;
  justify-content: flex-start;
  text-align: left;
}

.app-topbar__updated-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  flex-shrink: 0;
}

.app-topbar__updated-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.app-topbar__updated-label {
  color: #98a4b8;
  font-size: 11px;
  line-height: 1.1;
  white-space: nowrap;
}

.app-topbar__updated-date {
  color: #a7b1c0;
  font-size: 11px;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-topbar__notifications,
.app-topbar__profile {
  justify-content: center;
  position: relative;
}

.app-topbar__notifications img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.app-topbar__notification-dot {
  position: absolute;
  top: 12px;
  right: 14px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-accent);
}

.app-topbar__avatar {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  object-fit: cover;
  background: #d9dfe8;
}

/* широкий экран */
@media (min-width: 1200px) {
  .app-topbar {
    grid-template-columns:
      minmax(220px, 1.25fr)
      minmax(220px, 1.35fr)
      minmax(170px, 0.9fr)
      74px
      82px;
    min-height: 60px;
  }

  .app-topbar__city {
    font-size: 12px;
  }

  .app-topbar__district-name {
    font-size: 14px;
  }

  .app-topbar__search-input,
  .app-topbar__updated-label,
  .app-topbar__updated-date {
    font-size: 12px;
  }
}

/* уже */
@media (max-width: 980px) {
  .app-topbar {
    grid-template-columns:
      minmax(130px, 1fr)
      minmax(130px, 1fr)
      minmax(96px, 0.7fr)
      58px
      66px;
  }

  .app-topbar__location,
  .app-topbar__search,
  .app-topbar__updated,
  .app-topbar__notifications,
  .app-topbar__profile {
    padding: 0 8px;
  }

  .app-topbar__city {
    font-size: 10px;
  }

  .app-topbar__district-name {
    font-size: 12px;
  }

  .app-topbar__updated-label,
  .app-topbar__updated-date {
    font-size: 10px;
  }

  .app-topbar__shortcut {
    min-width: 40px;
    padding: 0 6px;
  }
}

/* очень узко, но все еще горизонтально */
@media (max-width: 760px) {
  .app-topbar {
    grid-template-columns:
      minmax(110px, 1fr)
      minmax(110px, 1fr)
      92px
      52px
      60px;
  }

  .app-topbar__city {
    display: none;
  }

  .app-topbar__updated-label {
    display: none;
  }

  .app-topbar__updated-date {
    font-size: 10px;
  }

  .app-topbar__search-input::placeholder {
    font-size: 12px;
  }

  .app-topbar__badge {
    min-width: 20px;
    height: 20px;
    font-size: 9px;
  }
}

/* совсем узко */
@media (max-width: 620px) {
  .app-topbar {
    grid-template-columns:
      minmax(98px, 1fr)
      minmax(96px, 1fr)
      82px
      48px
      56px;
  }

  .app-topbar__district-name {
    font-size: 11px;
  }

  .app-topbar__updated-date {
    display: none;
  }

  .app-topbar__search-input {
    font-size: 12px;
  }

  .app-topbar__shortcut {
    min-width: 36px;
    height: 28px;
    padding: 0 5px;
    gap: 2px;
  }

  .app-topbar__shortcut-symbol {
    font-size: 12px;
  }

  .app-topbar__shortcut-plus,
  .app-topbar__shortcut-text {
    font-size: 10px;
  }

  .app-topbar__avatar {
    width: 36px;
    height: 36px;
  }
}
</style>