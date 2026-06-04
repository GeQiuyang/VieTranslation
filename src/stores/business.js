import { defineStore } from 'pinia'
import { ref } from 'vue'
import { searchCustomers } from '@/api/deepseek.js'
import { useTranslationStore } from '@/stores/translation.js'

export const useBusinessStore = defineStore('business', () => {
  const keyword = ref('')
  const customerCount = ref(10)
  const country = ref('Vietnam')
  const results = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function search() {
    if (!keyword.value.trim()) {
      error.value = 'empty_keyword'
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

    try {
      const raw = await searchCustomers({
        keyword: keyword.value,
        customerCount: customerCount.value,
        country: country.value,
        apiKey
      })
      results.value = raw
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  function clear() {
    keyword.value = ''
    results.value = []
    error.value = null
  }

  function removeRow(index) {
    results.value.splice(index, 1)
  }

  return { keyword, customerCount, country, results, isLoading, error, search, clear, removeRow }
})
