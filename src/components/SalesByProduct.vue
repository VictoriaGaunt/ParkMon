<template>
  <div class="card">
    <h2>Sales by Product</h2>
    <div v-if="data" class="content">
      <div class="totals">
        <div>Total sold: {{ data.totalSold }}</div>
        <div>Sold in top 5: {{ data.soldInTopFive }}</div>
        <div>Categories: {{ data.differentProductCategoriesCount }}</div>
      </div>
      <table class="table">
        <thead>
        <tr><th>Product ID</th><th>Sold</th><th>% of total</th></tr>
        </thead>
        <tbody>
        <tr v-for="product in data.topProducts" :key="product.productId">
          <td>{{ product.productId }}</td>
          <td>{{ product.soldTotal }}</td>
          <td>{{ product.percentageOfAllSales }}%</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="loading">Loading…</div>
  </div>
</template>

<script setup lang="ts">
import type { ProductsTotalSalesOverview } from '../types'

defineProps<{
  data: ProductsTotalSalesOverview | null
}>()
</script>

<style scoped>
.card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}
.totals {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: #374151;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th {
  text-align: left;
  font-weight: 500;
  font-size: 0.875rem;
  color: #6b7280;
  padding-bottom: 0.5rem;
}
.table td {
  padding: 0.25rem 0;
  border-bottom: 1px solid #f3f4f6;
}
.table td:last-child, .table th:last-child {
  text-align: right;
}
.loading {
  color: #9ca3af;
  text-align: center;
  padding: 2rem;
}
</style>