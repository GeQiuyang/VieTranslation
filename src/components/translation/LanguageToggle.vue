<script setup>
import { useTranslationStore } from '@/stores/translation.js'

const store = useTranslationStore()
</script>

<template>
  <div class="flex items-center justify-center gap-4 mb-8">
    <button
      class="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer"
      :class="store.sourceLang === 'zh'
        ? 'bg-secondary text-on-secondary shadow-sm'
        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
      @click="store.sourceLang = 'zh'; store.targetLang = 'vi'"
    >
      <span class="text-[10px] font-black px-1.5 py-0.5 rounded bg-white/20">CN</span>
      中文
    </button>

    <button
      class="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer text-on-surface-variant text-2xl"
      @click="store.swapLanguages()"
      title="Swap languages"
    >
      swap_horiz
    </button>

    <button
      class="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer"
      :class="store.sourceLang === 'vi'
        ? 'bg-secondary text-on-secondary shadow-sm'
        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
      @click="store.sourceLang = 'vi'; store.targetLang = 'zh'"
    >
      <span class="text-[10px] font-black px-1.5 py-0.5 rounded bg-white/20">VN</span>
      Tiếng Việt
    </button>
  </div>
</template>
