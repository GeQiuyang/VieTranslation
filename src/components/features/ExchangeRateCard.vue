<script setup>
import { useExchangeRateStore } from '@/stores/exchangeRate.js'

const rates = useExchangeRateStore()
</script>

<template>
  <div class="bg-secondary-fixed text-on-secondary-fixed p-6 rounded-lg flex flex-col justify-between border border-secondary/20 shadow-sm relative overflow-hidden">
    <div class="relative z-10">
      <div class="flex justify-between items-start mb-4">
        <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'wght' 600;">currency_exchange</span>
        <span class="bg-white/50 px-2 py-1 rounded text-[10px] font-black">{{ rates.trend }} 24h</span>
      </div>
      <h3 class="text-2xl font-semibold leading-tight mb-2">Live Exchange Rate</h3>
      <div class="space-y-1">
        <div class="flex justify-between items-baseline">
          <span class="text-sm opacity-80">1 CNY =</span>
          <span class="text-xl font-black">{{ rates.cnyToVnd.toLocaleString() }} VND</span>
        </div>
        <div class="flex justify-between items-baseline">
          <span class="text-sm opacity-80">1 USD =</span>
          <span class="text-xl font-black">{{ rates.usdToVnd.toLocaleString() }} VND</span>
        </div>
      </div>
    </div>
    <div class="mt-6 p-3 bg-white/30 rounded border border-on-secondary-fixed/10">
      <p class="text-[10px] uppercase font-bold mb-1">Trading Strategy</p>
      <p class="text-xs leading-tight">Stable conditions. Ideal for confirming long-term procurement contracts.</p>
    </div>
    <div class="absolute -left-12 -top-12 opacity-5">
      <span class="material-symbols-outlined text-[140px]">trending_up</span>
    </div>
  </div>
</template>
