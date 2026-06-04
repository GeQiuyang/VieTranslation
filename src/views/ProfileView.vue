<script setup>
import { ref, onMounted } from 'vue'
import { useTranslationStore } from '@/stores/translation.js'

const store = useTranslationStore()
const apiKeyInput = ref('')
const saved = ref(false)

onMounted(() => {
  apiKeyInput.value = store.getApiKey()
})

function saveApiKey() {
  store.setApiKey(apiKeyInput.value)
  saved.value = true
  setTimeout(() => saved.value = false, 2000)
}
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-4xl font-bold text-primary mb-2">User Settings</h1>
    <p class="text-on-surface-variant text-base mb-8">Configure your translation preferences and API access.</p>

    <!-- API Key -->
    <section class="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 mb-6">
      <h2 class="text-xl font-bold text-primary mb-1">DeepSeek API Key</h2>
      <p class="text-sm text-on-surface-variant mb-4">Your API key is stored locally in your browser and never sent to our servers.</p>
      <div class="flex gap-3">
        <input
          v-model="apiKeyInput"
          type="password"
          placeholder="sk-..."
          class="flex-1 px-4 py-2.5 bg-surface-container border border-outline-variant rounded-lg text-on-surface text-sm focus:ring-2 focus:ring-tertiary-container focus:border-transparent outline-none"
        />
        <button
          class="px-5 py-2.5 bg-secondary text-on-secondary rounded-lg font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer"
          @click="saveApiKey"
        >
          {{ saved ? 'Saved!' : 'Save' }}
        </button>
      </div>
      <p class="text-[10px] text-outline mt-2">
        You can also set it via <code class="bg-surface-container px-1 py-0.5 rounded">VITE_DEEPSEEK_API_KEY</code> environment variable.
      </p>
    </section>

    <!-- Language Preference -->
    <section class="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 mb-6">
      <h2 class="text-xl font-bold text-primary mb-1">Default Translation Direction</h2>
      <p class="text-sm text-on-surface-variant mb-4">Choose which language pair you use most often.</p>
      <div class="flex gap-3">
        <button
          class="px-5 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer"
          :class="store.sourceLang === 'zh'
            ? 'bg-secondary text-on-secondary shadow-sm'
            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
          @click="store.sourceLang = 'zh'; store.targetLang = 'vi'"
        >
          中文 → Tiếng Việt
        </button>
        <button
          class="px-5 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer"
          :class="store.sourceLang === 'vi'
            ? 'bg-secondary text-on-secondary shadow-sm'
            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
          @click="store.sourceLang = 'vi'; store.targetLang = 'zh'"
        >
          Tiếng Việt → 中文
        </button>
      </div>
    </section>

    <!-- Dark Mode (placeholder) -->
    <section class="bg-surface-container-lowest border border-outline-variant rounded-lg p-6">
      <h2 class="text-xl font-bold text-primary mb-1">Appearance</h2>
      <p class="text-sm text-on-surface-variant mb-4">Dark mode support coming in a future update.</p>
      <div class="flex items-center gap-3 opacity-50">
        <span class="material-symbols-outlined text-on-surface-variant">light_mode</span>
        <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-outline cursor-not-allowed">
          <span class="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
        </button>
        <span class="material-symbols-outlined text-on-surface-variant">dark_mode</span>
      </div>
    </section>
  </div>
</template>
