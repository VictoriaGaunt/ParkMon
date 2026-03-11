<template>
  <aside class="sidebar">
    <div class="location">
      <span class="city">Санкт-Петербург</span>
      <span class="district">/ Адмиралтейский Семёновский 58</span>
    </div>
    <nav class="menu">
      <ul>
        <li v-for="item in menuItems" :key="item" :class="{ active: item === activeItem }">
          <a href="#">{{ item }}</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuItems = [
  'Администрирование и мониторинг',
  'Монитор парка ТА',
  'Удаленное управление ТА',
  'Регистрация ТА',
  'Вывод ТА из эксплуатации'
]

// В реальном приложении активный пункт может определяться роутером
const activeItem = ref('Монитор парка ТА')
</script>

<style scoped>
.sidebar {
  width: 260px;
  background-color: #f9fafb;
  border-right: 1px solid #e5e7eb;
  padding: 1.5rem 1rem;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
}
.location {
  font-size: 0.9rem;
  margin-bottom: 2rem;
  color: #1f2937;
  line-height: 1.4;
}
.city {
  font-weight: 600;
  display: block;
}
.district {
  color: #6b7280;
  font-size: 0.85rem;
}
.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu li {
  margin-bottom: 0.5rem;
}
.menu a {
  display: block;
  padding: 0.6rem 0.75rem;
  border-radius: 0.5rem;
  color: #374151;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background 0.2s;
}
.menu a:hover {
  background-color: #e5e7eb;
}
.menu li.active a {
  background-color: #e0f2fe;
  color: #0369a1;
  font-weight: 500;
}
</style>