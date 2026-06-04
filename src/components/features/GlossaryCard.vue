<script setup>
import { useGlossaryStore } from '@/stores/glossary.js'

const glossary = useGlossaryStore()
const samples = glossary.terms.slice(0, 2)
</script>

<template>
  <div class="md:col-span-2 bg-surface-container-low border border-outline-variant p-6 rounded-lg relative overflow-hidden group">
    <div class="relative z-10">
      <div class="flex items-center gap-3 mb-4">
        <span class="material-symbols-outlined p-2 bg-primary text-on-primary rounded">menu_book</span>
        <h3 class="text-2xl font-semibold">Industry Glossary</h3>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="term in samples" :key="term.cn" class="bg-white/60 p-3 border border-outline-variant rounded">
          <p class="text-[10px] font-bold text-outline-variant uppercase">CN: {{ term.cn }}</p>
          <p class="text-sm font-bold text-on-surface">VN: {{ term.vn }}</p>
          <p class="text-xs text-on-surface-variant">{{ term.en }}</p>
        </div>
      </div>
      <router-link to="/glossary" class="mt-6 text-primary font-bold text-sm flex items-center gap-2 hover:translate-x-1 transition-transform inline-flex cursor-pointer">
        Explore Full Glossary <span class="material-symbols-outlined">arrow_forward</span>
      </router-link>
    </div>
    <div class="absolute -right-8 -bottom-8 opacity-5 transition-transform group-hover:scale-110 duration-500">
      <span class="material-symbols-outlined text-[160px]">settings_input_component</span>
    </div>
  </div>
</template>
