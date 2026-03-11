<template>
  <div class="app-layout">
    <SidebarMenu />
    <div class="main-content">
      <AppHeader />
      <div class="content-wrapper">
        <MapPlaceholder />
        <HorizontalNav />
        <div class="dashboard-grid">
          <OverviewCards :data="overview" />
          <SalesIndexChart :data="salesIndex" />
          <ProductFill :data="productFill" />
          <MoneyFill :data="moneyFill" />
          <SalesByMachine :data="salesByMachine" />
          <SalesByProduct :data="salesByProduct" />
          <PeakSalesTimes :data="peakTimes" />
        </div>
      </div>
    </div>
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

// Layout components
import SidebarMenu from './components/layout/SidebarMenu.vue'
import AppHeader from './components/layout/AppHeader.vue'
import MapPlaceholder from './components/layout/MapPlaceholder.vue'
import HorizontalNav from './components/layout/HorizontalNav.vue'

// Dashboard components
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
.app-layout {
  display: flex;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f3f4f6;
}
.content-wrapper {
  padding: 1.5rem 2rem;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}
</style>