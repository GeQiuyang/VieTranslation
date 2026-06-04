<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useTranslationStore } from '@/stores/translation.js'

defineProps({
  visible: { type: Boolean, default: true }
})
defineEmits(['close'])

const route = useRoute()
const router = useRouter()
const store = useTranslationStore()

const navItems = [
  { path: '/', icon: 'translate', label: 'Translation' },
  { path: '/glossary', icon: 'settings_input_component', label: 'Parts Glossary' },
  { path: '/inquiry', icon: 'description', label: 'Inquiry Management' },
  { path: '/profile', icon: 'person', label: 'User Profile' }
]

const commonPhrases = [
  { key: 'price', icon: 'payments', label: 'Price quotation' },
  { key: 'shipping', icon: 'local_shipping', label: 'Shipping terms' },
  { key: 'technical', icon: 'engineering', label: 'Technical specs' }
]

function usePhrase(key) {
  store.useCommonPhrase(key)
  if (route.path !== '/') router.push('/')
}
</script>

<template>
  <!-- Desktop sidebar (always fixed visible) -->
  <aside
    class="fixed left-0 top-0 h-full flex-col pt-16 z-40 bg-surface-container-low border-r border-outline-variant w-64 hidden md:flex"
  >
    <div class="px-6 py-6 border-b border-outline-variant mb-4">
      <h2 class="text-2xl font-black text-on-surface">TradeFlow</h2>
      <p class="text-sm font-semibold text-on-surface-variant opacity-70 tracking-wider uppercase">Technical Trade Tool</p>
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
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span class="text-sm font-semibold">{{ item.label }}</span>
      </router-link>

      <div class="mt-8 px-4">
        <router-link to="/inquiry" class="block w-full py-3 bg-primary text-on-primary rounded text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity text-center">
          New Inquiry
        </router-link>
      </div>
      <div class="mt-8 px-4">
        <p class="text-[10px] uppercase font-bold text-outline mb-2 tracking-widest px-2">Common Phrases</p>
        <div class="space-y-1">
          <button
            v-for="phrase in commonPhrases"
            :key="phrase.key"
            class="w-full text-left px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded text-sm transition-colors flex items-center gap-2 cursor-pointer"
            @click="usePhrase(phrase.key)"
          >
            <span class="material-symbols-outlined text-lg">{{ phrase.icon }}</span>
            {{ phrase.label }}
          </button>
        </div>
      </div>
    </div>
    <div class="mt-auto border-t border-outline-variant p-2">
      <router-link to="/profile" class="flex items-center gap-3 px-4 py-3 mb-1 mx-2 rounded-lg text-on-surface-variant hover:bg-surface-variant cursor-pointer transition-all">
        <span class="material-symbols-outlined">settings</span>
        <span class="text-sm font-semibold">Settings</span>
      </router-link>
      <a href="#" class="flex items-center gap-3 px-4 py-3 mb-1 mx-2 rounded-lg text-on-surface-variant hover:bg-surface-variant cursor-pointer transition-all">
        <span class="material-symbols-outlined">help</span>
        <span class="text-sm font-semibold">Support</span>
      </a>
    </div>
  </aside>

  <!-- Mobile overlay -->
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/40 z-30 md:hidden"
    @click="$emit('close')"
  />
  <!-- Mobile sidebar drawer -->
  <aside
    class="fixed left-0 top-0 h-full flex flex-col pt-16 z-40 bg-surface-container-low border-r border-outline-variant w-64 md:hidden transition-transform duration-300"
    :class="visible ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="px-6 py-6 border-b border-outline-variant mb-4">
      <h2 class="text-2xl font-black text-on-surface">TradeFlow</h2>
      <p class="text-sm font-semibold text-on-surface-variant opacity-70 tracking-wider uppercase">Technical Trade Tool</p>
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
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span class="text-sm font-semibold">{{ item.label }}</span>
      </router-link>

      <div class="mt-8 px-4">
        <router-link to="/inquiry" class="block w-full py-3 bg-primary text-on-primary rounded text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity text-center">
          New Inquiry
        </router-link>
      </div>
      <div class="mt-8 px-4">
        <p class="text-[10px] uppercase font-bold text-outline mb-2 tracking-widest px-2">Common Phrases</p>
        <div class="space-y-1">
          <button
            v-for="phrase in commonPhrases"
            :key="phrase.key"
            class="w-full text-left px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded text-sm transition-colors flex items-center gap-2 cursor-pointer"
            @click="usePhrase(phrase.key)"
          >
            <span class="material-symbols-outlined text-lg">{{ phrase.icon }}</span>
            {{ phrase.label }}
          </button>
        </div>
      </div>
    </div>
    <div class="mt-auto border-t border-outline-variant p-2">
      <router-link to="/profile" class="flex items-center gap-3 px-4 py-3 mb-1 mx-2 rounded-lg text-on-surface-variant hover:bg-surface-variant cursor-pointer transition-all">
        <span class="material-symbols-outlined">settings</span>
        <span class="text-sm font-semibold">Settings</span>
      </router-link>
    </div>
  </aside>
</template>
