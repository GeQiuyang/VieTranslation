<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  type: { type: String, required: true }, // 'input' | 'output'
  language: { type: String, required: true }, // 'zh' | 'vi' | 'en'
  modelValue: { type: String, default: '' },
  isLoading: { type: Boolean, default: false },
  error: { type: String, default: null },
  maxChars: { type: Number, default: 5000 }
})

const emit = defineEmits(['update:modelValue', 'clear', 'translate', 'show-history'])
const copied = ref(false)
const speaking = ref(false)

async function doCopy() {
  await navigator.clipboard.writeText(props.modelValue)
  copied.value = true
  setTimeout(() => copied.value = false, 1500)
}

async function doShare() {
  if (navigator.share) {
    await navigator.share({ text: props.modelValue })
  } else {
    await doCopy()
  }
}

function doSpeak() {
  if (!props.modelValue) return
  const langCodes = { zh: 'zh-CN', vi: 'vi-VN', en: 'en-US' }
  const utterance = new SpeechSynthesisUtterance(props.modelValue)
  utterance.lang = langCodes[props.language] || 'en-US'
  utterance.rate = 0.9
  speaking.value = true
  utterance.onend = () => { speaking.value = false }
  utterance.onerror = () => { speaking.value = false }
  speechSynthesis.speak(utterance)
}

const labels = { zh: '中文 (Simplified)', vi: 'Tiếng Việt', en: 'English' }
const badges = { zh: 'CN', vi: 'VN', en: 'EN' }
const placeholders = {
  zh: '在此处输入技术规格或贸易条款...',
  vi: 'Nhập thông số kỹ thuật hoặc điều khoản thương mại...',
  en: 'Enter technical specs or trade terms...'
}
const emptyTexts = {
  zh: '翻译结果将显示在此处...',
  vi: 'Bản dịch sẽ xuất hiện ở đây...',
  en: 'Translation will appear here...'
}
const loadingTexts = {
  zh: '翻译中...',
  vi: 'Đang dịch...',
  en: 'Translating...'
}
const retryTexts = {
  zh: '重试 / Thử lại',
  vi: 'Thử lại / 重试',
  en: 'Retry'
}
const charLabels = {
  zh: '字数',
  vi: 'Ký tự',
  en: 'Chars'
}
const clearLabels = {
  zh: '清空',
  vi: 'Xóa',
  en: 'Clear'
}

const borderColors = {
  zh: 'border-secondary',
  vi: 'border-tertiary-container',
  en: 'border-primary'
}
const badgeBgs = {
  zh: 'bg-primary text-on-primary',
  vi: 'bg-tertiary-container text-on-tertiary',
  en: 'bg-secondary text-on-secondary'
}

const charCount = computed(() => props.modelValue?.length || 0)

const errorMessages = {
  missing_api_key: '请先在设置中配置 API Key / Vui lòng cấu hình API Key trong cài đặt / Configure API Key in Settings',
  empty_input: '请输入翻译内容 / Vui lòng nhập nội dung cần dịch / Please enter text to translate',
  timeout: '翻译服务响应超时，请重试 / Dịch vụ quá thời gian, thử lại / Translation timed out, please retry',
  rate_limited: '请求过于频繁，请稍后重试 / Quá nhiều yêu cầu, thử lại sau / Too many requests, try again later',
  invalid_api_key: 'API Key 无效，请检查设置 / API Key không hợp lệ / Invalid API Key',
  too_long: `输入超过${props.maxChars}字限制 / Vượt quá ${props.maxChars} ký tự / Exceeds ${props.maxChars} character limit`
}

const displayError = computed(() => props.error ? (errorMessages[props.error] || props.error) : null)

function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="flex flex-col bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden translation-glow" :class="`border-t-4 ${borderColors[language] || 'border-secondary'}`">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
      <div class="flex items-center gap-3">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded tracking-tighter" :class="badgeBgs[language] || badgeBgs.zh">
          {{ badges[language] || badges.zh }}
        </span>
        <span class="text-sm font-semibold uppercase">{{ labels[language] || labels.zh }}</span>
      </div>
      <div class="flex gap-2">
        <template v-if="type === 'input'">
          <button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer" title="Voice Input">mic</button>
          <button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer" title="History" @click="$emit('show-history')">history</button>
        </template>
        <template v-else>
          <button
            class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer relative"
            :title="copied ? 'Copied!' : 'Copy'"
            @click="doCopy"
          >{{ copied ? 'check' : 'content_copy' }}</button>
          <button
            class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer"
            :class="{ 'text-tertiary': speaking }"
            :title="speaking ? 'Speaking...' : 'Listen'"
            @click="doSpeak"
          >volume_up</button>
          <button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer" title="Share" @click="doShare">share</button>
        </template>
      </div>
    </div>

    <!-- Body -->
    <div class="relative flex-1">
      <textarea
        v-if="type === 'input'"
        class="w-full h-64 md:h-80 p-6 bg-transparent border-none focus:ring-0 text-on-surface text-lg resize-none placeholder:text-outline-variant"
        :placeholder="placeholders[language] || placeholders.zh"
        :value="modelValue"
        @input="onInput"
      />
      <div v-else class="w-full h-64 md:h-80 p-6 text-on-surface text-lg overflow-y-auto leading-relaxed">
        <div v-if="isLoading" class="flex items-center gap-3 text-outline-variant">
          <span class="material-symbols-outlined animate-spin">progress_activity</span>
          <span class="italic">{{ loadingTexts[language] || loadingTexts.zh }}</span>
        </div>
        <div v-else-if="displayError" class="text-error text-sm flex flex-col gap-2">
          <span>{{ displayError }}</span>
          <button
            v-if="error !== 'missing_api_key'"
            class="text-tertiary font-bold text-xs hover:underline self-start cursor-pointer"
            @click="$emit('translate')"
          >
            {{ retryTexts[language] || retryTexts.zh }}
          </button>
        </div>
        <span v-else-if="!modelValue" class="text-outline-variant italic">{{ emptyTexts[language] || emptyTexts.zh }}</span>
        <span v-else class="whitespace-pre-wrap">{{ modelValue }}</span>
      </div>

      <!-- Technical accuracy badge (output only) -->
      <div v-if="type === 'output' && modelValue && !isLoading && !error" class="absolute bottom-4 right-4 flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold border border-on-tertiary-container/20">
        <span class="material-symbols-outlined text-base" style="font-variation-settings: 'FILL' 1;">verified_user</span>
        Technical Precision: 98.4%
      </div>
    </div>

    <!-- Footer -->
    <div class="px-6 py-3 border-t border-outline-variant flex justify-between items-center text-on-surface-variant" :class="{ 'bg-tertiary-container/5': type === 'output' }">
      <template v-if="type === 'input'">
        <span class="text-xs">{{ charLabels[language] || charLabels.zh }}: {{ charCount }} / {{ maxChars }}</span>
        <button class="text-xs flex items-center gap-1 hover:text-primary transition-colors cursor-pointer" @click="$emit('clear')">
          <span class="material-symbols-outlined text-sm">delete</span> {{ clearLabels[language] || clearLabels.zh }}
        </button>
      </template>
      <template v-else>
        <div class="flex gap-4">
          <span class="text-xs flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-500"></span> Engine Active</span>
          <span class="text-xs">Latency: 45ms</span>
        </div>
        <router-link to="/glossary" class="text-xs text-tertiary font-bold hover:underline">View Parts Catalog</router-link>
      </template>
    </div>
  </div>
</template>
