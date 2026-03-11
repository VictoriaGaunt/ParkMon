<template>
  <header class="app-header">
    <div class="search-container">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="Поиск..." class="search-input" />
    </div>
    <div class="profile-icon">👤</div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
}
.search-container {
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  border-radius: 2rem;
  padding: 0.4rem 1rem;
  width: 300px;
}
.search-icon {
  margin-right: 0.5rem;
  color: #9ca3af;
}
.search-input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 0.95rem;
}
.search-input::placeholder {
  color: #9ca3af;
}
.profile-icon {
  width: 40px;
  height: 40px;
  background-color: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>