<template>
  <div class="dashboard">
    <header>
      <h1>Vending Machine Dashboard</h1>
    </header>
    <main>
      <div class="grid">
        <OverviewCards :data="overview" />
        <SalesIndexChart :data="salesIndex" />
        <ProductFill :data="productFill" />
        <MoneyFill :data="moneyFill" />
        <SalesByMachine :data="salesByMachine" />
        <SalesByProduct :data="salesByProduct" />
        <PeakSalesTimes :data="peakTimes" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from './api'
import type {
  VendingMachinesOverview,
  SalesIndex,
  VendingMachinesItemFillOverview,
  VendingMachineMoneyStatus,
  VendingMachinesTotalSalesOverview,
  ProductsTotalSalesOverview,
  PeakSaleTimeAtDay
} from './types'

import OverviewCards from './components/OverviewCards.vue'
import SalesIndexChart from './components/SalesIndexChart.vue'
import ProductFill from './components/ProductFill.vue'
import MoneyFill from './components/MoneyFill.vue'
import SalesByMachine from './components/SalesByMachine.vue'
import SalesByProduct from './components/SalesByProduct.vue'
import PeakSalesTimes from './components/PeakSalesTimes.vue'

const overview = ref<VendingMachinesOverview | null>(null)
const salesIndex = ref<SalesIndex[]>([])
const productFill = ref<VendingMachinesItemFillOverview | null>(null)
const moneyFill = ref<VendingMachineMoneyStatus[]>([])
const salesByMachine = ref<VendingMachinesTotalSalesOverview | null>(null)
const salesByProduct = ref<ProductsTotalSalesOverview | null>(null)
const peakTimes = ref<PeakSaleTimeAtDay[]>([])

onMounted(async () => {
  try {
    const [
      ov,
      si,
      pf,
      mf,
      sbm,
      sbp,
      pt
    ] = await Promise.all([
      api.getMachinesOverview(),
      api.getSalesIndex(),
      api.getProductFill(),
      api.getMoneyFill(),
      api.getSalesByMachine(),
      api.getSalesByProduct(),
      api.getPeakSalesTimes()
    ])

    overview.value = ov
    salesIndex.value = si
    productFill.value = pf
    moneyFill.value = mf
    salesByMachine.value = sbm
    salesByProduct.value = sbp
    peakTimes.value = pt
  } catch (error) {
    console.error('Failed to fetch dashboard data', error)
  }
})
</script>

<style scoped>
.dashboard {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  padding: 2rem;
  background: #f3f4f6;
  min-height: 100vh;
}
header h1 {
  margin-bottom: 2rem;
  color: #111827;
  font-size: 2rem;
  font-weight: 600;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}
</style>