import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { translateText } from '@/api/deepseek.js'

const COMMON_PHRASES = {
  'price': {
    zh: '请提供该旋挖钻机配件的报价，包括FOB价格和最小起订量。',
    vi: 'Vui lòng cung cấp báo giá cho phụ tùng máy khoan xoay này, bao gồm giá FOB và số lượng đặt hàng tối thiểu.',
    en: 'Please provide a quotation for this rotary drilling rig part, including FOB price and MOQ.'
  },
  'shipping': {
    zh: '请说明运输条款、包装方式和预计交货时间。',
    vi: 'Vui lòng cho biết điều khoản vận chuyển, phương thức đóng gói và thời gian giao hàng dự kiến.',
    en: 'Please specify the shipping terms, packaging method, and estimated delivery time.'
  },
  'technical': {
    zh: '请提供该旋挖钻机配件的详细技术参数、材质说明和规格尺寸。',
    vi: 'Vui lòng cung cấp thông số kỹ thuật chi tiết, mô tả vật liệu và kích thước của phụ tùng máy khoan xoay này.',
    en: 'Please provide detailed technical parameters, material specifications, and dimensions for this rotary drilling rig part.'
  },
  'warranty': {
    zh: '请说明该配件的保修期限、售后服务和配件供应情况。',
    vi: 'Vui lòng cho biết thời gian bảo hành, dịch vụ hậu mãi và tình trạng cung cấp phụ tùng.',
    en: 'Please specify the warranty period, after-sales service, and spare parts availability.'
  },
  'quality': {
    zh: '请提供该产品的质量认证文件、检验标准和出厂检测报告。',
    vi: 'Vui lòng cung cấp tài liệu chứng nhận chất lượng, tiêu chuẩn kiểm tra và báo cáo kiểm tra xuất xưởng.',
    en: 'Please provide quality certification documents, inspection standards, and factory test reports.'
  }
}

export const useTranslationStore = defineStore('translation', () => {
  const sourceLang = ref('zh')
  const targetLang = ref('vi')
  const inputText = ref('')
  const outputText = ref('')
  const isLoading = ref(false)
  const error = ref(null)
  const mode = ref('technical')
  const history = ref(JSON.parse(localStorage.getItem('translation_history') || '[]'))

  const characterCount = computed(() => inputText.value.length)

  function getApiKey() {
    return import.meta.env.VITE_DEEPSEEK_API_KEY || localStorage.getItem('deepseek_api_key') || ''
  }

  function saveHistory() {
    localStorage.setItem('translation_history', JSON.stringify(history.value))
  }

  function addToHistory() {
    if (!outputText.value || !inputText.value) return
    history.value.unshift({
      id: Date.now(),
      sourceLang: sourceLang.value,
      targetLang: targetLang.value,
      input: inputText.value,
      output: outputText.value,
      time: new Date().toLocaleString()
    })
    if (history.value.length > 20) history.value.pop()
    saveHistory()
  }

  function loadFromHistory(entry) {
    sourceLang.value = entry.sourceLang
    targetLang.value = entry.targetLang
    inputText.value = entry.input
    outputText.value = entry.output
    error.value = null
  }

  function clearHistory() {
    history.value = []
    saveHistory()
  }

  function useCommonPhrase(key) {
    const phrase = COMMON_PHRASES[key]
    if (!phrase) return
    inputText.value = phrase[sourceLang.value] || phrase.zh
    outputText.value = ''
    error.value = null
  }

  async function translate() {
    const apiKey = getApiKey()
    if (!apiKey) {
      error.value = 'missing_api_key'
      return
    }
    if (!inputText.value.trim()) {
      error.value = 'empty_input'
      return
    }
    if (inputText.value.length > 5000) {
      error.value = 'too_long'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      outputText.value = await translateText({
        text: inputText.value,
        sourceLang: sourceLang.value,
        targetLang: targetLang.value,
        mode: mode.value,
        apiKey
      })
      addToHistory()
    } catch (err) {
      error.value = err.message
      outputText.value = ''
    } finally {
      isLoading.value = false
    }
  }

  function swapLanguages() {
    const tmp = sourceLang.value
    sourceLang.value = targetLang.value
    targetLang.value = tmp
    inputText.value = outputText.value
    outputText.value = ''
    error.value = null
  }

  function clearInput() {
    inputText.value = ''
    outputText.value = ''
    error.value = null
  }

  function setApiKey(key) {
    localStorage.setItem('deepseek_api_key', key)
  }

  return {
    sourceLang, targetLang, inputText, outputText,
    isLoading, error, mode, characterCount, history,
    translate, swapLanguages, clearInput, setApiKey, getApiKey,
    useCommonPhrase, loadFromHistory, clearHistory, addToHistory
  }
})
