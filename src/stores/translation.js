import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { translateText } from '@/api/deepseek.js'

export const useTranslationStore = defineStore('translation', () => {
  const sourceLang = ref('zh')
  const targetLang = ref('vi')
  const inputText = ref('')
  const outputText = ref('')
  const isLoading = ref(false)
  const error = ref(null)
  const mode = ref('general')

  const characterCount = computed(() => inputText.value.length)

  function getApiKey() {
    return import.meta.env.VITE_DEEPSEEK_API_KEY || localStorage.getItem('deepseek_api_key') || ''
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
    isLoading, error, mode, characterCount,
    translate, swapLanguages, clearInput, setApiKey, getApiKey
  }
})
