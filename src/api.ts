import type {
    VendingMachinesOverview,
    SalesIndex,
    VendingMachinesItemFillOverview,
    VendingMachineMoneyStatus,
    VendingMachinesTotalSalesOverview,
    ProductsTotalSalesOverview,
    PeakSaleTimeAtDay
} from './types'

const API_BASE = '/api' // will be proxied

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(`${API_BASE}${url}`)
    if (!response.ok) throw new Error(`HTTP error ${response.status}`)
    return response.json()
}

export const api = {
    getMachinesOverview: () =>
        fetchJson<VendingMachinesOverview>('/machines/overview'),

    getSalesIndex: () =>
        fetchJson<SalesIndex[]>('/sales/index-by-historic-avg'),

    getProductFill: () =>
        fetchJson<VendingMachinesItemFillOverview>('/machines/product-fill'),

    getMoneyFill: () =>
        fetchJson<VendingMachineMoneyStatus[]>('/machines/money-fill'),

    getSalesByMachine: () =>
        fetchJson<VendingMachinesTotalSalesOverview>('/sales/by-vending-machine'),

    getSalesByProduct: () =>
        fetchJson<ProductsTotalSalesOverview>('/sales/by-product-type'),

    getPeakSalesTimes: () =>
        fetchJson<PeakSaleTimeAtDay[]>('/sales/peak-sale-count-per-day')
}