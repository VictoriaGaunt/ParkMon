<template>
  <DashboardLayout>
    <template #sidebar>
      <AppSidebar />
    </template>

    <template #topbar>
      <AppTopbar />
    </template>

    <div class="dashboard-page">
      <HorizontalNav
          v-model="activePeriod"
          date-range="23.08.2023 – 20.09.2024"
      />

      <OverviewCards
          v-if="overview"
          :data="overview"
      />

      <MapWidget />

      <section class="dashboard-section">
        <h2 class="dashboard-section__title">
          Обзор состояния ТА
        </h2>

        <div class="dashboard-section__grid dashboard-section__grid--three">
          <SalesIndexChart :data="salesIndex" />

          <ProductFill
              v-if="productFill"
              :data="productFill"
          />

          <MoneyFill :data="moneyFill" />
        </div>
      </section>

      <section class="dashboard-section">
        <h2 class="dashboard-section__title">
          Аналитика продаж и потребительского поведения
        </h2>

        <div class="dashboard-section__grid dashboard-section__grid--three">
          <SalesByMachine
              v-if="salesByMachine"
              :data="salesByMachine"
          />

          <SalesByProduct
              v-if="salesByProduct"
              :data="salesByProduct"
          />

          <ProductsCategoriesCard
              v-if="salesByProduct"
              :data="salesByProduct"
          />
        </div>
      </section>

      <PeakSalesTimes :data="peakTimes" />

      <div
          v-if="isLoading"
          class="dashboard-state"
      >
        Loading dashboard data...
      </div>

      <div
          v-if="errorMessage"
          class="dashboard-state dashboard-state--error"
      >
        {{ errorMessage }}
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { dashboardApi } from '../api'
import type {
  PeakSaleTimeAtDay,
  ProductsTotalSalesOverview,
  SalesIndex,
  VendingMachineMoneyStatus,
  VendingMachinesItemFillOverview,
  VendingMachinesOverview,
  VendingMachinesTotalSalesOverview,
} from '../types'

import HorizontalNav from '../components/dashboard/HorizontalNav.vue'
import MapWidget from '../components/dashboard/MapWidget.vue'
import MoneyFill from '../components/dashboard/MoneyFill.vue'
import OverviewCards from '../components/dashboard/OverviewCards.vue'
import PeakSalesTimes from '../components/dashboard/PeakSalesTimes.vue'
import ProductFill from '../components/dashboard/ProductFill.vue'
import ProductsCategoriesCard from '../components/dashboard/ProductsCategoriesCard.vue'
import SalesByMachine from '../components/dashboard/SalesByMachine.vue'
import SalesByProduct from '../components/dashboard/SalesByProduct.vue'
import SalesIndexChart from '../components/dashboard/SalesIndexChart.vue'

import AppSidebar from '../components/layout/AppSidebar.vue'
import AppTopbar from '../components/layout/AppTopbar.vue'
import DashboardLayout from '../components/layout/DashboardLayout.vue'

type PeriodValue = 'today' | 'yesterday' | 'week' | 'month' | 'quarter'

const activePeriod = ref<PeriodValue>('month')

const overview = ref<VendingMachinesOverview | null>(null)
const salesIndex = ref<SalesIndex[]>([])
const productFill = ref<VendingMachinesItemFillOverview | null>(null)
const moneyFill = ref<VendingMachineMoneyStatus[]>([])
const salesByMachine = ref<VendingMachinesTotalSalesOverview | null>(null)
const salesByProduct = ref<ProductsTotalSalesOverview | null>(null)
const peakTimes = ref<PeakSaleTimeAtDay[]>([])

const isLoading = ref(true)
const errorMessage = ref('')

async function loadDashboardData() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const [
      overviewData,
      salesIndexData,
      productFillData,
      moneyFillData,
      salesByMachineData,
      salesByProductData,
      peakTimesData,
    ] = await Promise.all([
      dashboardApi.getMachinesOverview(),
      dashboardApi.getSalesIndex(),
      dashboardApi.getProductFill(),
      dashboardApi.getMoneyFill(),
      dashboardApi.getSalesByMachine(),
      dashboardApi.getSalesByProduct(),
      dashboardApi.getPeakSalesTimes(),
    ])

    overview.value = overviewData
    salesIndex.value = salesIndexData
    productFill.value = productFillData
    moneyFill.value = moneyFillData
    salesByMachine.value = salesByMachineData
    salesByProduct.value = salesByProductData
    peakTimes.value = peakTimesData
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
    errorMessage.value = 'Failed to load dashboard data. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void loadDashboardData()
})
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.dashboard-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.dashboard-section__title {
  margin: 0;
  color: #a3acbc;
  font-size: 18px;
  line-height: 1.3;
  font-weight: 700;
}

.dashboard-section__grid {
  display: grid;
  gap: 18px;
}

.dashboard-section__grid--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.dashboard-state {
  padding: 18px 20px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-bg-surface);
  color: #98a1b2;
  font-size: 14px;
  font-weight: 500;
}

.dashboard-state--error {
  color: var(--color-danger);
  border-color: rgba(209, 67, 67, 0.22);
  background: #fff6f6;
}

@media (max-width: 1200px) {
  .dashboard-section__grid--three {
    grid-template-columns: 1fr;
  }
}
</style>