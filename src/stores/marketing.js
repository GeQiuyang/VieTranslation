import { defineStore } from 'pinia'
import { ref } from 'vue'
import { generateMarketingCopy } from '@/api/deepseek.js'
import { translateText } from '@/api/deepseek.js'
import { useTranslationStore } from '@/stores/translation.js'

export const useMarketingStore = defineStore('marketing', () => {
  const productName = ref('')
  const wordCount = ref(200)
  const generatedCopy = ref('')
  const isLoading = ref(false)
  const error = ref(null)

  const enTranslation = ref('')
  const viTranslation = ref('')
  const isTranslatingEn = ref(false)
  const isTranslatingVi = ref(false)
  const translateError = ref(null)

  async function generate() {
    if (!productName.value.trim()) {
      error.value = 'empty_product'
      return
    }

    const translationStore = useTranslationStore()
    const apiKey = translationStore.getApiKey()
    if (!apiKey) {
      error.value = 'missing_api_key'
      return
    }

    isLoading.value = true
    error.value = null
    generatedCopy.value = ''
    enTranslation.value = ''
    viTranslation.value = ''

    try {
      generatedCopy.value = await generateMarketingCopy({
        productName: productName.value,
        wordCount: wordCount.value,
        apiKey
      })
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  async function translateTo(lang) {
    if (!generatedCopy.value) return

    const translationStore = useTranslationStore()
    const apiKey = translationStore.getApiKey()
    if (!apiKey) {
      translateError.value = 'missing_api_key'
      return
    }

    translateError.value = null
    if (lang === 'en') isTranslatingEn.value = true
    else isTranslatingVi.value = true

    try {
      const result = await translateText({
        text: generatedCopy.value,
        sourceLang: 'zh',
        targetLang: lang,
        mode: 'general',
        apiKey
      })
      if (lang === 'en') enTranslation.value = result
      else viTranslation.value = result
    } catch (err) {
      translateError.value = err.message
    } finally {
      if (lang === 'en') isTranslatingEn.value = false
      else isTranslatingVi.value = false
    }
  }

  function clear() {
    productName.value = ''
    wordCount.value = 200
    generatedCopy.value = ''
    error.value = null
    enTranslation.value = ''
    viTranslation.value = ''
    translateError.value = null
  }

  return {
    productName, wordCount, generatedCopy, isLoading, error,
    enTranslation, viTranslation, isTranslatingEn, isTranslatingVi, translateError,
    generate, translateTo, clear
  }
})
