import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const THEMES = [
  { key: 'industrial', label: 'Industrial', icon: 'manufacturing' },
  { key: 'ocean', label: 'Ocean', icon: 'water' },
  { key: 'forest', label: 'Forest', icon: 'forest' },
  { key: 'sunset', label: 'Sunset', icon: 'wb_twilight' },
]

export const useThemeStore = defineStore('theme', () => {
  const current = ref(localStorage.getItem('app_theme') || 'industrial')

  watch(current, (val) => {
    document.documentElement.setAttribute('data-theme', val)
    localStorage.setItem('app_theme', val)
  }, { immediate: true })

  function setTheme(key) {
    current.value = key
  }

  return { current, themes: THEMES, setTheme }
})
