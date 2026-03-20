<template>
  <header class="app-topbar">
    <div class="app-topbar__location">
      <div class="app-topbar__location-text">
        <div class="app-topbar__city">
          Санкт-Петербург / Адмиралтейский
        </div>
        <div class="app-topbar__district">
          Семёновский
          <span class="app-topbar__badge">58</span>
        </div>
      </div>

      <button class="app-topbar__chevron" type="button" aria-label="Выбрать район">
        <img src="/img00.svg" alt="" />
      </button>
    </div>

    <div class="app-topbar__search">
      <img class="app-topbar__search-icon" src="/img00.svg" alt="" />
      <input
          class="app-topbar__search-input"
          type="text"
          placeholder="Найти"
      />
      <button class="app-topbar__shortcut" type="button">+ S</button>
    </div>

    <div class="app-topbar__updated">
      <img class="app-topbar__updated-icon" src="/img00.svg" alt="" />
      <div class="app-topbar__updated-text">
        <div class="app-topbar__updated-label">Обновлено</div>
        <div class="app-topbar__updated-date">20.09.2024 в 12:35</div>
      </div>
    </div>

    <button class="app-topbar__notifications" type="button" aria-label="Уведомления">
      <img src="/img00.svg" alt="" />
      <span class="app-topbar__notification-dot"></span>
    </button>

    <button class="app-topbar__profile" type="button" aria-label="Профиль">
      <img class="app-topbar__avatar" src="/img00.png" alt="Профиль" />
    </button>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-topbar {
  display: grid;
  grid-template-columns: 294px 1fr 220px 72px 88px;
  min-height: 68px;
  background: var(--color-bg-surface);
  border-bottom: 1px solid var(--color-border);
}

.app-topbar > * {
  min-width: 0;
  border-left: 1px solid var(--color-border);
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
  padding: 0 18px;
}

.app-topbar__location {
  justify-content: space-between;
  gap: 12px;
}

.app-topbar__location-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.app-topbar__city {
  font-size: 13px;
  color: #a2aabc;
}

.app-topbar__district {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #3b4354;
  font-size: 16px;
  font-weight: 500;
}

.app-topbar__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: #eef1f6;
  color: #97a0b2;
  font-size: 11px;
  font-weight: 600;
}

.app-topbar__chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.app-topbar__chevron img,
.app-topbar__updated-icon,
.app-topbar__notifications img,
.app-topbar__search-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.app-topbar__search {
  gap: 10px;
}

.app-topbar__search-input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  outline: none;
  color: #3b4354;
}

.app-topbar__search-input::placeholder {
  color: #c0c6d2;
}

.app-topbar__shortcut {
  min-width: 34px;
  height: 24px;
  padding: 0 8px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: #fafbfc;
  color: #9aa3b2;
  font-size: 11px;
}

.app-topbar__updated {
  gap: 10px;
}

.app-topbar__updated-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.app-topbar__updated-label {
  font-size: 13px;
  color: #a2aabc;
}

.app-topbar__updated-date {
  font-size: 12px;
  color: #aab2c0;
}

.app-topbar__notifications,
.app-topbar__profile {
  justify-content: center;
  position: relative;
}

.app-topbar__notification-dot {
  position: absolute;
  top: 18px;
  right: 24px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

.app-topbar__avatar {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  object-fit: cover;
  background: #d9dfe8;
}

@media (max-width: 1100px) {
  .app-topbar {
    grid-template-columns: 1fr;
  }

  .app-topbar > * {
    border-left: none;
    border-top: 1px solid var(--color-border);
  }

  .app-topbar > *:first-child {
    border-top: none;
  }
}
</style>