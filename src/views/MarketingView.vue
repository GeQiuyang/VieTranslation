<script setup>
import { ref } from 'vue'
import { useMarketingStore } from '@/stores/marketing.js'

const store = useMarketingStore()
const copied = ref({ main: false, en: false, vi: false })

async function handleGenerate() {
  await store.generate()
}

async function copyText(text, key) {
  await navigator.clipboard.writeText(text)
  copied.value[key] = true
  setTimeout(() => copied.value[key] = false, 1500)
}

const errorLabels = {
  missing_api_key: '请先在侧边栏设置中配置 API Key',
  empty_product: '请输入产品名称'
}
</script>

<template>
  <div>
    <!-- Input Section -->
    <div class="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">Product Name</label>
          <input
            v-model="store.productName"
            type="text"
            placeholder="输入产品名称 / Enter product name"
            class="w-full px-3 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface text-sm focus:ring-2 focus:ring-tertiary-container outline-none"
            @keyup.enter="handleGenerate"
          />
        </div>
        <div>
          <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">Word Count: {{ store.wordCount }}</label>
          <input
            v-model.number="store.wordCount"
            type="range"
            min="20"
            max="500"
            step="10"
            class="w-full accent-secondary"
          />
          <div class="flex justify-between text-[10px] text-outline mt-0.5">
            <span>20</span><span>500</span>
          </div>
        </div>
        <button
          class="flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-on-secondary rounded-lg font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="store.isLoading || !store.productName.trim()"
          @click="handleGenerate"
        >
          <span v-if="store.isLoading" class="material-symbols-outlined animate-spin text-sm">progress_activity</span>
          <span v-else class="material-symbols-outlined text-sm">auto_awesome</span>
          {{ store.isLoading ? 'Generating...' : 'Generate' }}
        </button>
      </div>
      <div v-if="store.error" class="mt-3 text-error text-xs flex items-center gap-1">
        <span class="material-symbols-outlined text-sm">warning</span>
        {{ errorLabels[store.error] || store.error }}
      </div>
    </div>

    <!-- Output Section -->
    <div v-if="store.generatedCopy || store.isLoading" class="space-y-4">
      <!-- Generated Copy -->
      <div class="bg-surface-container-lowest border-t-4 border-primary rounded-lg shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-primary text-on-primary">CN</span>
            <span class="text-sm font-semibold">营销文案 / Marketing Copy</span>
          </div>
          <button
            v-if="store.generatedCopy"
            class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer"
            @click="copyText(store.generatedCopy, 'main')"
          >{{ copied.main ? 'check' : 'content_copy' }}</button>
        </div>
        <div class="p-6">
          <div v-if="store.isLoading" class="flex items-center gap-3 text-outline-variant py-8">
            <span class="material-symbols-outlined animate-spin">progress_activity</span>
            <span class="italic">正在生成营销文案...</span>
          </div>
          <p v-else class="text-on-surface text-base leading-relaxed whitespace-pre-wrap">{{ store.generatedCopy }}</p>
        </div>
      </div>

      <!-- Translations -->
      <div v-if="store.generatedCopy" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- English -->
        <div class="bg-surface-container-lowest border-t-4 border-secondary rounded-lg shadow-sm overflow-hidden">
          <div class="px-6 py-3 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-on-secondary">EN</span>
              <span class="text-sm font-semibold">English</span>
            </div>
            <div class="flex gap-1">
              <button
                v-if="store.enTranslation"
                class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer text-sm"
                @click="copyText(store.enTranslation, 'en')"
              >{{ copied.en ? 'check' : 'content_copy' }}</button>
              <button
                v-if="!store.enTranslation"
                class="flex items-center gap-1 text-xs text-secondary font-bold hover:underline cursor-pointer"
                :disabled="store.isTranslatingEn"
                @click="store.translateTo('en')"
              >
                <span v-if="store.isTranslatingEn" class="material-symbols-outlined animate-spin text-xs">progress_activity</span>
                {{ store.isTranslatingEn ? 'Translating...' : 'Translate' }}
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="store.isTranslatingEn" class="flex items-center gap-2 text-outline-variant text-sm">
              <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span>
              Translating...
            </div>
            <p v-else-if="store.enTranslation" class="text-on-surface text-base leading-relaxed whitespace-pre-wrap">{{ store.enTranslation }}</p>
            <p v-else class="text-outline-variant italic text-sm">Click "Translate" to generate English version</p>
          </div>
        </div>

        <!-- Vietnamese -->
        <div class="bg-surface-container-lowest border-t-4 border-tertiary-container rounded-lg shadow-sm overflow-hidden">
          <div class="px-6 py-3 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary">VN</span>
              <span class="text-sm font-semibold">Tiếng Việt</span>
            </div>
            <div class="flex gap-1">
              <button
                v-if="store.viTranslation"
                class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer text-sm"
                @click="copyText(store.viTranslation, 'vi')"
              >{{ copied.vi ? 'check' : 'content_copy' }}</button>
              <button
                v-if="!store.viTranslation"
                class="flex items-center gap-1 text-xs text-tertiary font-bold hover:underline cursor-pointer"
                :disabled="store.isTranslatingVi"
                @click="store.translateTo('vi')"
              >
                <span v-if="store.isTranslatingVi" class="material-symbols-outlined animate-spin text-xs">progress_activity</span>
                {{ store.isTranslatingVi ? 'Đang dịch...' : 'Dịch' }}
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="store.isTranslatingVi" class="flex items-center gap-2 text-outline-variant text-sm">
              <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span>
              Đang dịch...
            </div>
            <p v-else-if="store.viTranslation" class="text-on-surface text-base leading-relaxed whitespace-pre-wrap">{{ store.viTranslation }}</p>
            <p v-else class="text-outline-variant italic text-sm">Nhấn "Dịch" để tạo bản tiếng Việt</p>
          </div>
        </div>
      </div>

      <div v-if="store.translateError" class="text-error text-xs flex items-center gap-1">
        <span class="material-symbols-outlined text-sm">warning</span>
        {{ store.translateError }}
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-24 text-center">
      <span class="material-symbols-outlined text-[80px] text-outline-variant/40 mb-6">auto_awesome</span>
      <p class="text-on-surface-variant text-base max-w-md">
        输入产品名称，AI 将为您生成中文营销文案，并可翻译为英语和越南语。
      </p>
    </div>
  </div>
</template>
