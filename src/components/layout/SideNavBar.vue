<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTranslationStore } from '@/stores/translation.js'

const route = useRoute()
const store = useTranslationStore()
const showSettings = ref(false)
const apiKeyInput = ref(store.getApiKey())
const saved = ref(false)

const navItems = [
  { path: '/', icon: 'translate', label: 'Translation' },
  { path: '/glossary', icon: 'settings_input_component', label: 'Parts Glossary' },
  { path: '/inquiry', icon: 'description', label: 'Inquiry Management' },
]

function saveApiKey() {
  store.setApiKey(apiKeyInput.value)
  saved.value = true
  setTimeout(() => saved.value = false, 1500)
}
</script>

<template>
  <aside
    class="fixed left-0 top-0 h-full flex-col z-40 bg-surface-container-low border-r border-outline-variant w-64 flex"
  >
    <div class="px-6 py-6 border-b border-outline-variant mb-4">
      <h2 class="text-2xl font-black text-on-surface">MakeDeal</h2>
    </div>
    <div class="flex-1 overflow-y-auto py-2">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 mb-1 mx-2 rounded-lg cursor-pointer transition-all"
        :class="route.path === item.path
          ? 'bg-secondary text-on-secondary'
          : 'text-on-surface-variant hover:bg-surface-variant'"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span class="text-sm font-semibold">{{ item.label }}</span>
      </router-link>
    </div>
    <div class="border-t border-outline-variant">
      <button
        class="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-colors cursor-pointer"
        @click="showSettings = !showSettings"
      >
        <span class="material-symbols-outlined">settings</span>
        <span class="text-sm font-semibold">Settings</span>
        <span class="material-symbols-outlined text-sm ml-auto transition-transform" :class="{ 'rotate-180': showSettings }">expand_less</span>
      </button>
      <div v-if="showSettings" class="px-4 pb-4">
        <label class="text-[10px] uppercase font-bold text-outline mb-1 block tracking-widest">API Key</label>
        <input
          v-model="apiKeyInput"
          type="password"
          placeholder="sk-..."
          class="w-full px-3 py-2 text-sm bg-surface-container-lowest border border-outline-variant rounded focus:ring-2 focus:ring-tertiary-container outline-none text-on-surface"
        />
        <button
          class="mt-2 w-full py-2 text-xs font-bold rounded transition-colors cursor-pointer"
          :class="saved ? 'bg-green-600 text-white' : 'bg-secondary text-on-secondary hover:opacity-90'"
          @click="saveApiKey"
        >
          {{ saved ? 'Saved' : 'Save Key' }}
        </button>
      </div>
    </div>
    <div class="px-4 py-3 border-t border-outline-variant">
      <router-link to="/inquiry" class="block w-full py-3 bg-primary text-on-primary rounded text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity text-center">
        New Inquiry
      </router-link>
    </div>
  </aside>
</template>
