<script setup>
import { watch } from 'vue'
import { useTranslationStore } from '@/stores/translation.js'
import LanguageToggle from '@/components/translation/LanguageToggle.vue'
import TranslationPanel from '@/components/translation/TranslationPanel.vue'
import GlossaryCard from '@/components/features/GlossaryCard.vue'
import ExchangeRateCard from '@/components/features/ExchangeRateCard.vue'
import TradeEcosystem from '@/components/features/TradeEcosystem.vue'

const store = useTranslationStore()

let debounceTimer = null
watch(() => store.inputText, () => {
  clearTimeout(debounceTimer)
  if (store.inputText.trim()) {
    debounceTimer = setTimeout(() => store.translate(), 500)
  } else {
    store.outputText = ''
    store.error = null
  }
})

function handleClear() {
  store.clearInput()
}

function handleTranslate() {
  store.translate()
}
</script>

<template>
  <div>
    <!-- Hero / Controls Row -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 class="text-4xl font-bold text-primary mb-1">Precision Translation</h1>
        <p class="text-on-surface-variant text-base">Real-time trade communication for rotary drilling rig parts.</p>
      </div>
      <!-- Technical Mode Toggle -->
      <div class="flex items-center gap-4 bg-surface-container p-2 rounded-xl border border-outline-variant">
        <span class="text-sm font-semibold text-on-surface-variant ml-2">Rotary Drilling Rig Mode</span>
        <button
          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer"
          :class="store.mode === 'technical' ? 'bg-tertiary' : 'bg-outline'"
          @click="store.mode = store.mode === 'technical' ? 'general' : 'technical'"
        >
          <span
            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            :class="store.mode === 'technical' ? 'translate-x-6' : 'translate-x-1'"
          />
        </button>
      </div>
    </div>

    <!-- Language Toggle -->
    <LanguageToggle />

    <!-- Translation Panels -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      <TranslationPanel
        type="input"
        :language="store.sourceLang"
        v-model="store.inputText"
        @clear="handleClear"
        @translate="handleTranslate"
      />
      <TranslationPanel
        type="output"
        :language="store.targetLang"
        :modelValue="store.outputText"
        :isLoading="store.isLoading"
        :error="store.error"
        @translate="handleTranslate"
      />
    </div>

    <!-- Bento Grid -->
    <section class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <GlossaryCard />
      <ExchangeRateCard />
    </section>

    <!-- Trade Ecosystem -->
    <TradeEcosystem />
  </div>
</template>
