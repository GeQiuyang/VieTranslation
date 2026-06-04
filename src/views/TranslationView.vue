<script setup>
import { ref, watch } from 'vue'
import { useTranslationStore } from '@/stores/translation.js'
import LanguageToggle from '@/components/translation/LanguageToggle.vue'
import TranslationPanel from '@/components/translation/TranslationPanel.vue'

const store = useTranslationStore()
const showHistory = ref(false)

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

function handleShowHistory() {
  showHistory.value = !showHistory.value
}

function loadEntry(entry) {
  store.loadFromHistory(entry)
  showHistory.value = false
}

function clearAllHistory() {
  store.clearHistory()
  showHistory.value = false
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
        @show-history="handleShowHistory"
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

    <!-- Translation History Panel -->
    <div v-if="showHistory" class="mt-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-primary">Translation History</h3>
        <div class="flex gap-2">
          <button
            v-if="store.history.length"
            class="text-xs text-error hover:underline cursor-pointer"
            @click="clearAllHistory"
          >Clear All</button>
          <button
            class="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer"
            @click="showHistory = false"
          >close</button>
        </div>
      </div>
      <div v-if="!store.history.length" class="text-on-surface-variant text-sm text-center py-8">
        No translation history yet. Start translating to see your history here.
      </div>
      <div v-else class="space-y-2 max-h-96 overflow-y-auto">
        <div
          v-for="entry in store.history"
          :key="entry.id"
          class="flex items-start gap-4 p-3 border border-outline-variant rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors"
          @click="loadEntry(entry)"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                {{ entry.sourceLang.toUpperCase() }} → {{ entry.targetLang.toUpperCase() }}
              </span>
              <span class="text-[10px] text-outline">{{ entry.time }}</span>
            </div>
            <p class="text-sm text-on-surface truncate">{{ entry.input }}</p>
            <p class="text-xs text-on-surface-variant truncate mt-0.5">{{ entry.output }}</p>
          </div>
          <span class="material-symbols-outlined text-outline text-base shrink-0">arrow_forward</span>
        </div>
      </div>
    </div>

  </div>
</template>
