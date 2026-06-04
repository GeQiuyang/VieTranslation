import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExchangeRateStore = defineStore('exchangeRate', () => {
  const cnyToVnd = ref(3450.25)
  const usdToVnd = ref(25410.0)
  const trend = ref('+0.12%')
  const lastUpdated = ref(new Date().toISOString())

  return { cnyToVnd, usdToVnd, trend, lastUpdated }
})
