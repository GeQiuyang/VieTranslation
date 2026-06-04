<script setup>
import { useTranslationStore } from '@/stores/translation.js'

const store = useTranslationStore()

const langOptions = [
  { key: 'zh', flag: 'CN', label: '中文' },
  { key: 'vi', flag: 'VN', label: 'Tiếng Việt' },
  { key: 'en', flag: 'EN', label: 'English' }
]

function selectSource(key) {
  if (key === store.targetLang) {
    store.swapLanguages()
  } else {
    store.sourceLang = key
    store.clearInput()
  }
}

function selectTarget(key) {
  if (key === store.sourceLang) {
    store.swapLanguages()
  } else {
    store.targetLang = key
    store.clearInput()
  }
}
</script>

<template>
  <div class="flex items-center justify-center gap-3 mb-8 flex-wrap">
    <!-- Source languages -->
    <div class="flex items-center gap-1 bg-surface-container p-1 rounded-lg">
      <button
        v-for="opt in langOptions"
        :key="'src-' + opt.key"
        class="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold transition-all cursor-pointer"
        :class="store.sourceLang === opt.key
          ? 'bg-secondary text-on-secondary shadow-sm'
          : 'text-on-surface-variant hover:bg-surface-container-high'"
        @click="selectSource(opt.key)"
      >
        <span class="text-[9px] font-black px-1 py-0.5 rounded"
          :class="store.sourceLang === opt.key ? 'bg-white/20' : 'bg-surface-container-high'">{{ opt.flag }}</span>
        {{ opt.label }}
      </button>
    </div>

    <!-- Swap -->
    <button
      class="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer text-on-surface-variant text-2xl shrink-0"
      @click="store.swapLanguages()"
      title="Swap languages"
    >
      swap_horiz
    </button>

    <!-- Target languages -->
    <div class="flex items-center gap-1 bg-surface-container p-1 rounded-lg">
      <button
        v-for="opt in langOptions"
        :key="'tgt-' + opt.key"
        class="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold transition-all cursor-pointer"
        :class="store.targetLang === opt.key
          ? 'bg-tertiary-container text-on-tertiary-container shadow-sm'
          : 'text-on-surface-variant hover:bg-surface-container-high'"
        @click="selectTarget(opt.key)"
      >
        <span class="text-[9px] font-black px-1 py-0.5 rounded"
          :class="store.targetLang === opt.key ? 'bg-white/20' : 'bg-surface-container-high'">{{ opt.flag }}</span>
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>
