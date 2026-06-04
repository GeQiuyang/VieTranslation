<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', icon: 'translate', label: 'Translation' },
  { path: '/glossary', icon: 'settings_input_component', label: 'Parts Glossary' },
  { path: '/inquiry', icon: 'description', label: 'Inquiry Management' },
]

</script>

<template>
  <aside
    class="fixed left-0 top-0 h-full flex-col z-40 bg-surface-container-low border-r border-outline-variant w-64 flex"
  >
    <div class="px-6 py-6 border-b border-outline-variant mb-4">
      <h2 class="text-2xl font-black text-on-surface">MakeDeal</h2>
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
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span class="text-sm font-semibold">{{ item.label }}</span>
      </router-link>
    </div>
    <div class="px-4 py-3 border-t border-outline-variant">
      <router-link to="/inquiry" class="block w-full py-3 bg-primary text-on-primary rounded text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity text-center">
        New Inquiry
      </router-link>
    </div>
  </aside>
</template>
