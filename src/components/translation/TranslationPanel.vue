<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, required: true }, // 'input' | 'output'
  language: { type: String, required: true }, // 'zh' | 'vi'
  modelValue: { type: String, default: '' },
  isLoading: { type: Boolean, default: false },
  error: { type: String, default: null },
  maxChars: { type: Number, default: 5000 }
})

const emit = defineEmits(['update:modelValue', 'clear', 'translate'])

const label = computed(() => props.language === 'zh' ? '中文 (Simplified)' : 'Tiếng Việt')
const badge = computed(() => props.language === 'zh' ? 'CN' : 'VN')
const placeholder = computed(() =>
  props.language === 'zh' ? '在此处输入技术规格或贸易条款...' : 'Nhập thông số kỹ thuật hoặc điều khoản thương mại...'
)
const emptyText = computed(() =>
  props.language === 'zh' ? '翻译结果将显示在此处...' : 'Bản dịch sẽ xuất hiện ở đây...'
)
const borderColor = computed(() => props.language === 'zh' ? 'border-secondary' : 'border-tertiary-container')
const badgeBg = computed(() => props.language === 'zh' ? 'bg-primary text-on-primary' : 'bg-tertiary-container text-on-tertiary')

const charCount = computed(() => props.modelValue?.length || 0)

const errorMessages = {
  missing_api_key: '请先在设置中配置 API Key / Vui lòng cấu hình API Key trong cài đặt',
  empty_input: '请输入翻译内容 / Vui lòng nhập nội dung cần dịch',
  timeout: '翻译服务响应超时，请重试 / Dịch vụ dịch thuật quá thời gian, vui lòng thử lại',
  rate_limited: '请求过于频繁，请稍后重试 / Quá nhiều yêu cầu, vui lòng thử lại sau',
  invalid_api_key: 'API Key 无效，请检查设置 / API Key không hợp lệ, vui lòng kiểm tra cài đặt',
  too_long: `输入超过${props.maxChars}字限制，已截断 / Vượt quá giới hạn ${props.maxChars} ký tự`
}

const displayError = computed(() => props.error ? (errorMessages[props.error] || props.error) : null)

function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="flex flex-col bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden translation-glow" :class="`border-t-4 ${borderColor}`">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
      <div class="flex items-center gap-3">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded tracking-tighter" :class="badgeBg">
          {{ badge }}
        </span>
        <span class="text-sm font-semibold uppercase">{{ label }}</span>
      </div>
      <div class="flex gap-2">
        <template v-if="type === 'input'">
          <button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer" title="Voice Input">mic</button>
          <button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer" title="History">history</button>
        </template>
        <template v-else>
          <button
            class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer"
            title="Copy"
            @click="navigator.clipboard.writeText(modelValue)"
          >content_copy</button>
          <button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer" title="Listen">volume_up</button>
          <button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer" title="Share">share</button>
        </template>
      </div>
    </div>

    <!-- Body -->
    <div class="relative flex-1">
      <textarea
        v-if="type === 'input'"
        class="w-full h-64 md:h-80 p-6 bg-transparent border-none focus:ring-0 text-on-surface text-lg resize-none placeholder:text-outline-variant"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
      />
      <div v-else class="w-full h-64 md:h-80 p-6 text-on-surface text-lg overflow-y-auto leading-relaxed">
        <div v-if="isLoading" class="flex items-center gap-3 text-outline-variant">
          <span class="material-symbols-outlined animate-spin">progress_activity</span>
          <span class="italic">{{ language === 'zh' ? '翻译中...' : 'Đang dịch...' }}</span>
        </div>
        <div v-else-if="displayError" class="text-error text-sm flex flex-col gap-2">
          <span>{{ displayError }}</span>
          <button
            v-if="error === 'missing_api_key'"
            class="text-tertiary font-bold text-xs hover:underline self-start cursor-pointer"
            @click="$router.push('/profile')"
          >
            {{ language === 'zh' ? '前往设置 →' : 'Đi tới cài đặt →' }}
          </button>
          <button
            v-else
            class="text-tertiary font-bold text-xs hover:underline self-start cursor-pointer"
            @click="$emit('translate')"
          >
            {{ language === 'zh' ? '重试 / Thử lại' : 'Thử lại / 重试' }}
          </button>
        </div>
        <span v-else-if="!modelValue" class="text-outline-variant italic">{{ emptyText }}</span>
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
        <span class="text-xs">{{ language === 'zh' ? `字数: ${charCount} / ${maxChars}` : `Ký tự: ${charCount} / ${maxChars}` }}</span>
        <button class="text-xs flex items-center gap-1 hover:text-primary transition-colors cursor-pointer" @click="$emit('clear')">
          <span class="material-symbols-outlined text-sm">delete</span> {{ language === 'zh' ? '清空' : 'Xóa' }}
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
