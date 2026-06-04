<script setup>
import { useExchangeRateStore } from '@/stores/exchangeRate.js'

const rates = useExchangeRateStore()
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface border-b border-outline-variant">
    <div class="flex items-center gap-8">
      <span class="text-2xl font-bold text-primary tracking-tight">TradeFlow</span>
      <nav class="hidden md:flex items-center gap-6">
        <div class="flex items-center gap-2 text-secondary font-bold border-b-2 border-secondary px-1 h-16 cursor-pointer">
          <span class="text-sm">CNY/VND: {{ rates.cnyToVnd.toLocaleString() }}</span>
        </div>
        <div class="text-on-surface-variant hover:bg-surface-container-low transition-colors px-3 py-1 rounded cursor-pointer">
          <span class="text-sm">Live Market News</span>
        </div>
      </nav>
    </div>
    <div class="flex items-center gap-4">
      <button class="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors cursor-pointer">
        language
      </button>
      <button class="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors cursor-pointer">
        notifications
      </button>
      <div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant">
        <span class="material-symbols-outlined text-on-surface-variant text-base">person</span>
      </div>
      <!-- Mobile menu toggle -->
      <button class="md:hidden material-symbols-outlined text-on-surface-variant p-2 cursor-pointer" @click="$emit('toggle-sidebar')">
        menu
      </button>
    </div>
  </header>
</template>
