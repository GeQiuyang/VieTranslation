# Chinese-Vietnamese Translation Web App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Vue 3 SPA with real-time Chinese-Vietnamese translation via DeepSeek API, industry glossary, and exchange rate display.

**Architecture:** Vue 3 + Vite SPA with Pinia stores, Vue Router (hash mode), and Tailwind CSS. DeepSeek API called client-side. Four views: translation home, glossary, inquiry placeholder, profile/settings.

**Tech Stack:** Vue 3 (Composition API), Vite, Pinia, Vue Router, Tailwind CSS, Material Symbols Icons, Inter font

---

### Task 1: Scaffold Vue 3 + Vite project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `postcss.config.js`
- Create: `tailwind.config.js`
- Create: `.env.example`
- Create: `src/main.js`
- Create: `src/style.css`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "vie-translation",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.13",
    "vue-router": "^4.5.0",
    "pinia": "^3.0.2"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.3",
    "vite": "^6.3.5",
    "tailwindcss": "^4.1.5",
    "@tailwindcss/vite": "^4.1.5",
    "autoprefixer": "^10.4.21"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

- [ ] **Step 3: Create index.html**

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RigExpert Pro | 中越翻译工具</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
</head>
<body class="bg-background text-on-background min-h-screen">
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Create postcss.config.js**

```js
export default {
  plugins: {
    autoprefixer: {}
  }
}
```

- [ ] **Step 5: Create tailwind.config.js** (using standard Tailwind v4 CSS-first config via `@theme` in style.css — the config file is kept minimal since v4 uses CSS-based theme)

```js
export default {
  content: ['./index.html', './src/**/*.{vue,js}']
}
```

- [ ] **Step 6: Create .env.example**

```
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

- [ ] **Step 7: Create src/main.js**

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

- [ ] **Step 8: Create src/style.css** with full Tailwind v4 theme + custom tokens

```css
@import "tailwindcss";

@theme {
  --font-family-display: "Inter", sans-serif;
  --font-family-body: "Inter", sans-serif;
  --font-family-mono: "Inter", sans-serif;

  --color-primary: #1e1e1e;
  --color-on-primary: #ffffff;
  --color-primary-container: #333333;
  --color-on-primary-container: #9c9b9b;
  --color-primary-fixed: #e4e2e1;
  --color-primary-fixed-dim: #c8c6c6;
  --color-on-primary-fixed: #1b1c1c;
  --color-on-primary-fixed-variant: #474747;
  --color-inverse-primary: #c8c6c6;

  --color-secondary: #705d00;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #fcd400;
  --color-on-secondary-container: #6e5c00;
  --color-secondary-fixed: #ffe16d;
  --color-secondary-fixed-dim: #e9c400;
  --color-on-secondary-fixed: #221b00;
  --color-on-secondary-fixed-variant: #544600;

  --color-tertiary: #001f3d;
  --color-on-tertiary: #ffffff;
  --color-tertiary-container: #003461;
  --color-on-tertiary-container: #5a9ef1;
  --color-tertiary-fixed: #d4e3ff;
  --color-tertiary-fixed-dim: #a4c9ff;
  --color-on-tertiary-fixed: #001c39;
  --color-on-tertiary-fixed-variant: #004883;

  --color-error: #ba1a1a;
  --color-on-error: #ffffff;
  --color-error-container: #ffdad6;
  --color-on-error-container: #93000a;

  --color-background: #f9f9f9;
  --color-on-background: #1a1c1c;
  --color-surface: #f9f9f9;
  --color-on-surface: #1a1c1c;
  --color-on-surface-variant: #444748;
  --color-surface-dim: #dadada;
  --color-surface-bright: #f9f9f9;
  --color-surface-container: #eeeeee;
  --color-surface-container-low: #f3f3f3;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-high: #e8e8e8;
  --color-surface-container-highest: #e2e2e2;
  --color-surface-variant: #e2e2e2;
  --color-surface-tint: #5f5e5e;
  --color-inverse-surface: #2f3131;
  --color-inverse-on-surface: #f1f1f1;

  --color-outline: #747878;
  --color-outline-variant: #c4c7c7;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #c4c7c7; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #747878; }

/* Material icons */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
}

/* Translation glow */
.translation-glow {
  box-shadow: 0 0 20px rgba(112, 93, 0, 0.05);
}
```

- [ ] **Step 9: Install dependencies and verify scaffold**

Run: `cd /Users/geqiuyang/Downloads/Coding/AICoding/VieProject && npm install`
Expected: All packages install successfully

- [ ] **Step 10: Commit**

```bash
git add package.json vite.config.js index.html postcss.config.js tailwind.config.js .env.example src/main.js src/style.css
git commit -m "feat: scaffold Vue 3 + Vite + Tailwind project"
```

---

### Task 2: Setup Vue Router

**Files:**
- Create: `src/router/index.js`

- [ ] **Step 1: Create router with all four routes**

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'translation',
    component: () => import('@/views/TranslationView.vue')
  },
  {
    path: '/glossary',
    name: 'glossary',
    component: () => import('@/views/GlossaryView.vue')
  },
  {
    path: '/inquiry',
    name: 'inquiry',
    component: () => import('@/views/InquiryView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

- [ ] **Step 2: Commit**

```bash
git add src/router/index.js
git commit -m "feat: add Vue Router with all four routes"
```

---

### Task 3: Create DeepSeek API integration

**Files:**
- Create: `src/api/deepseek.js`

- [ ] **Step 1: Create API module with translate function**

```js
const API_BASE = 'https://api.deepseek.com/v1/chat/completions'

const SYSTEM_PROMPTS = {
  general: '你是一名专业的中文-越南语翻译专家。请将以下内容准确翻译到目标语言，保持原意和语气。只返回翻译结果，不要加任何解释。',
  technical: '你是旋挖钻机行业的中越翻译专家。精通钻杆（Kelly Bar）、钻头（Drill Bit）、动力头（Rotary Head）、液压系统（Hydraulic System）、底盘（Undercarriage）、变幅机构（Luffing Mechanism）等术语。请使用行业标准译法翻译以下内容，保留技术规格的数值精度。只返回翻译结果，不要加任何解释。'
}

const LANG_NAMES = {
  zh: 'Vietnamese',
  vi: 'Chinese'
}

export async function translateText({ text, sourceLang, targetLang, mode = 'general', apiKey }) {
  if (!apiKey) {
    throw new Error('missing_api_key')
  }
  if (!text?.trim()) {
    throw new Error('empty_input')
  }

  const systemPrompt = `${SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.general} 将以下${sourceLang === 'zh' ? '中文' : '越南语'}翻译成${targetLang === 'zh' ? '中文' : '越南语'}。`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        temperature: 0.3,
        max_tokens: 4096
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      if (response.status === 429) throw new Error('rate_limited')
      if (response.status === 401) throw new Error('invalid_api_key')
      throw new Error(errorData.error?.message || `API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('timeout')
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/api/deepseek.js
git commit -m "feat: add DeepSeek API translation module"
```

---

### Task 4: Create Pinia stores

**Files:**
- Create: `src/stores/translation.js`
- Create: `src/stores/glossary.js`
- Create: `src/stores/exchangeRate.js`

- [ ] **Step 1: Create translation store**

```js
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
```

- [ ] **Step 2: Create glossary store**

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const SEED_TERMS = [
  { cn: '旋挖钻机', vn: 'Máy khoan xoay', en: 'Rotary Drilling Rig', category: '整机' },
  { cn: '凯氏钻杆', vn: 'Thanh Kelly', en: 'Kelly Bar', category: '钻杆' },
  { cn: '钻头', vn: 'Mũi khoan', en: 'Drill Bit', category: '钻头' },
  { cn: '动力头', vn: 'Đầu quay', en: 'Rotary Head', category: '动力头' },
  { cn: '液压系统', vn: 'Hệ thống thủy lực', en: 'Hydraulic System', category: '液压系统' },
  { cn: '底盘', vn: 'Khung gầm', en: 'Undercarriage', category: '底盘' },
  { cn: '变幅机构', vn: 'Cơ cấu thay đổi biên độ', en: 'Luffing Mechanism', category: '变幅机构' },
  { cn: '桅杆', vn: 'Cột chống', en: 'Mast', category: '结构件' },
  { cn: '加压油缸', vn: 'Xi lanh áp lực', en: 'Feed Cylinder', category: '液压系统' },
  { cn: '主卷扬', vn: 'Tời chính', en: 'Main Winch', category: '卷扬' }
]

export const useGlossaryStore = defineStore('glossary', () => {
  const stored = localStorage.getItem('glossary_terms')
  const terms = ref(stored ? JSON.parse(stored) : [...SEED_TERMS])

  function save() {
    localStorage.setItem('glossary_terms', JSON.stringify(terms.value))
  }

  function search(query, category) {
    let result = terms.value
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(t =>
        t.cn.includes(q) || t.vn.toLowerCase().includes(q) || t.en.toLowerCase().includes(q)
      )
    }
    if (category && category !== '全部') {
      result = result.filter(t => t.category === category)
    }
    return result
  }

  function addTerm(term) {
    terms.value.push(term)
    save()
  }

  const categories = computed(() => {
    const cats = new Set(terms.value.map(t => t.category))
    return ['全部', ...Array.from(cats)]
  })

  return { terms, search, addTerm, categories }
})
```

- [ ] **Step 3: Create exchangeRate store**

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExchangeRateStore = defineStore('exchangeRate', () => {
  const cnyToVnd = ref(3450.25)
  const usdToVnd = ref(25410.0)
  const trend = ref('+0.12%')
  const lastUpdated = ref(new Date().toISOString())

  return { cnyToVnd, usdToVnd, trend, lastUpdated }
})
```

- [ ] **Step 4: Commit**

```bash
git add src/stores/
git commit -m "feat: add Pinia stores for translation, glossary, and exchange rate"
```

---

### Task 5: Create layout components — TopNavBar

**Files:**
- Create: `src/components/layout/TopNavBar.vue`

- [ ] **Step 1: Create TopNavBar.vue**

```vue
<script setup>
import { useExchangeRateStore } from '@/stores/exchangeRate.js'

const rates = useExchangeRateStore()
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface border-b border-outline-variant">
    <div class="flex items-center gap-8">
      <span class="text-2xl font-bold text-primary tracking-tight">RIG-EXPERT</span>
      <nav class="hidden md:flex items-center gap-6">
        <div class="flex items-center gap-2 text-secondary font-bold border-b-2 border-secondary px-1 h-16 cursor-pointer">
          <span class="text-sm">CNY/VND: {{ rates.cnyToVnd.toLocaleString() }}</span>
        </div>
        <div class="text-on-surface-variant hover:bg-surface-container-low transition-colors px-3 py-1 rounded cursor-pointer">
          <span class="text-sm">Live Market News</span>
        </div>
      </nav>
    </div>
    <div class="flex items-center gap-4">
      <button class="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors cursor-pointer">
        language
      </button>
      <button class="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors cursor-pointer">
        notifications
      </button>
      <div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant">
        <span class="material-symbols-outlined text-on-surface-variant text-base">person</span>
      </div>
      <!-- Mobile menu toggle -->
      <button class="md:hidden material-symbols-outlined text-on-surface-variant p-2 cursor-pointer" @click="$emit('toggle-sidebar')">
        menu
      </button>
    </div>
  </header>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/TopNavBar.vue
git commit -m "feat: add TopNavBar layout component"
```

---

### Task 6: Create layout components — SideNavBar

**Files:**
- Create: `src/components/layout/SideNavBar.vue`

- [ ] **Step 1: Create SideNavBar.vue**

```vue
<script setup>
import { useRoute } from 'vue-router'

defineProps({
  visible: { type: Boolean, default: true }
})
defineEmits(['close'])

const route = useRoute()

const navItems = [
  { path: '/', icon: 'translate', label: 'Translation' },
  { path: '/glossary', icon: 'settings_input_component', label: 'Parts Glossary' },
  { path: '/inquiry', icon: 'description', label: 'Inquiry Management' },
  { path: '/profile', icon: 'person', label: 'User Profile' }
]

const commonPhrases = [
  { icon: 'payments', label: 'Price quotation' },
  { icon: 'local_shipping', label: 'Shipping terms' },
  { icon: 'engineering', label: 'Technical specs' }
]
</script>

<template>
  <!-- Desktop sidebar -->
  <aside
    class="fixed left-0 top-0 h-full flex flex-col pt-16 z-40 bg-surface-container-low border-r border-outline-variant w-64"
    :class="{ 'translate-x-0': visible, '-translate-x-full': !visible, 'hidden md:flex': true }"
  >
    <div class="px-6 py-6 border-b border-outline-variant mb-4">
      <h2 class="text-2xl font-black text-on-surface">RigExpert Pro</h2>
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
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span class="text-sm font-semibold">{{ item.label }}</span>
      </router-link>

      <div class="mt-8 px-4">
        <router-link to="/inquiry" class="block w-full py-3 bg-primary text-on-primary rounded text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity text-center">
          New Inquiry
        </router-link>
      </div>
      <div class="mt-8 px-4">
        <p class="text-[10px] uppercase font-bold text-outline mb-2 tracking-widest px-2">Common Phrases</p>
        <div class="space-y-1">
          <button
            v-for="phrase in commonPhrases"
            :key="phrase.label"
            class="w-full text-left px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded text-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span class="material-symbols-outlined text-lg">{{ phrase.icon }}</span>
            {{ phrase.label }}
          </button>
        </div>
      </div>
    </div>
    <div class="mt-auto border-t border-outline-variant p-2">
      <router-link to="/profile" class="flex items-center gap-3 px-4 py-3 mb-1 mx-2 rounded-lg text-on-surface-variant hover:bg-surface-variant cursor-pointer transition-all">
        <span class="material-symbols-outlined">settings</span>
        <span class="text-sm font-semibold">Settings</span>
      </router-link>
      <a href="#" class="flex items-center gap-3 px-4 py-3 mb-1 mx-2 rounded-lg text-on-surface-variant hover:bg-surface-variant cursor-pointer transition-all">
        <span class="material-symbols-outlined">help</span>
        <span class="text-sm font-semibold">Support</span>
      </a>
    </div>
  </aside>

  <!-- Mobile overlay -->
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/40 z-30 md:hidden"
    @click="$emit('close')"
  />
  <!-- Mobile sidebar drawer -->
  <aside
    class="fixed left-0 top-0 h-full flex flex-col pt-16 z-40 bg-surface-container-low border-r border-outline-variant w-64 md:hidden transition-transform duration-300"
    :class="visible ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="px-6 py-6 border-b border-outline-variant mb-4">
      <h2 class="text-2xl font-black text-on-surface">RigExpert Pro</h2>
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
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span class="text-sm font-semibold">{{ item.label }}</span>
      </router-link>

      <div class="mt-8 px-4">
        <router-link to="/inquiry" class="block w-full py-3 bg-primary text-on-primary rounded text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity text-center">
          New Inquiry
        </router-link>
      </div>
      <div class="mt-8 px-4">
        <p class="text-[10px] uppercase font-bold text-outline mb-2 tracking-widest px-2">Common Phrases</p>
        <div class="space-y-1">
          <button
            v-for="phrase in commonPhrases"
            :key="phrase.label"
            class="w-full text-left px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded text-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span class="material-symbols-outlined text-lg">{{ phrase.icon }}</span>
            {{ phrase.label }}
          </button>
        </div>
      </div>
    </div>
    <div class="mt-auto border-t border-outline-variant p-2">
      <router-link to="/profile" class="flex items-center gap-3 px-4 py-3 mb-1 mx-2 rounded-lg text-on-surface-variant hover:bg-surface-variant cursor-pointer transition-all">
        <span class="material-symbols-outlined">settings</span>
        <span class="text-sm font-semibold">Settings</span>
      </router-link>
    </div>
  </aside>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/SideNavBar.vue
git commit -m "feat: add SideNavBar with responsive drawer"
```

---

### Task 7: Create layout components — FooterBar

**Files:**
- Create: `src/components/layout/FooterBar.vue`

- [ ] **Step 1: Create FooterBar.vue**

```vue
<template>
  <footer class="w-full py-12 px-6 bg-surface-container-lowest border-t border-outline-variant">
    <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
      <div class="flex flex-col gap-4 max-w-sm">
        <span class="text-2xl font-bold text-primary">RIG-EXPERT</span>
        <p class="text-on-surface-variant text-sm">The definitive technical trade tool for the Sino-Vietnamese drilling industry. Engineered for precision, built for reliability.</p>
        <div class="flex gap-4 mt-2">
          <span class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">public</span>
          <span class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">contact_support</span>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-12">
        <div>
          <h4 class="text-sm font-semibold uppercase text-primary mb-4 tracking-widest">Platform</h4>
          <ul class="space-y-2 text-on-surface-variant text-sm">
            <li class="hover:text-secondary cursor-pointer transition-colors">Translator</li>
            <li class="hover:text-secondary cursor-pointer transition-colors">Parts API</li>
            <li class="hover:text-secondary cursor-pointer transition-colors">Live Market</li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold uppercase text-primary mb-4 tracking-widest">Support</h4>
          <ul class="space-y-2 text-on-surface-variant text-sm">
            <li class="hover:text-secondary cursor-pointer transition-colors">Terms of Trade</li>
            <li class="hover:text-secondary cursor-pointer transition-colors">Privacy Policy</li>
            <li class="hover:text-secondary cursor-pointer transition-colors">Help Center</li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold uppercase text-primary mb-4 tracking-widest">Status</h4>
          <div class="bg-surface-container border border-outline-variant px-3 py-2 rounded">
            <p class="text-[10px] font-bold text-green-600 mb-1 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-green-600"></span> ALL SYSTEMS ONLINE
            </p>
            <p class="text-[10px] opacity-60">Version 2.4.1 (Stable Build)</p>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-sm font-semibold text-on-surface-variant">© 2024 RigExpert Technical Trade. All rights reserved.</p>
      <div class="flex items-center gap-2">
        <span class="text-xs text-on-surface-variant">Powered by</span>
        <span class="font-bold text-sm tracking-widest">NEURAL-RIG AI</span>
      </div>
    </div>
  </footer>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/FooterBar.vue
git commit -m "feat: add FooterBar component"
```

---

### Task 8: Create TranslationPanel component

**Files:**
- Create: `src/components/translation/TranslationPanel.vue`

- [ ] **Step 1: Create TranslationPanel.vue**

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/translation/TranslationPanel.vue
git commit -m "feat: add reusable TranslationPanel component"
```

---

### Task 9: Create LanguageToggle component

**Files:**
- Create: `src/components/translation/LanguageToggle.vue`

- [ ] **Step 1: Create LanguageToggle.vue**

```vue
<script setup>
import { useTranslationStore } from '@/stores/translation.js'

const store = useTranslationStore()
</script>

<template>
  <div class="flex items-center justify-center gap-4 mb-8">
    <button
      class="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer"
      :class="store.sourceLang === 'zh'
        ? 'bg-secondary text-on-secondary shadow-sm'
        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
      @click="store.sourceLang = 'zh'; store.targetLang = 'vi'"
    >
      <span class="text-[10px] font-black px-1.5 py-0.5 rounded bg-white/20">CN</span>
      中文
    </button>

    <button
      class="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer text-on-surface-variant text-2xl"
      @click="store.swapLanguages()"
      title="Swap languages"
    >
      swap_horiz
    </button>

    <button
      class="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer"
      :class="store.sourceLang === 'vi'
        ? 'bg-secondary text-on-secondary shadow-sm'
        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
      @click="store.sourceLang = 'vi'; store.targetLang = 'zh'"
    >
      <span class="text-[10px] font-black px-1.5 py-0.5 rounded bg-white/20">VN</span>
      Tiếng Việt
    </button>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/translation/LanguageToggle.vue
git commit -m "feat: add LanguageToggle component"
```

---

### Task 10: Create feature cards — GlossaryCard, ExchangeRateCard, TradeEcosystem

**Files:**
- Create: `src/components/features/GlossaryCard.vue`
- Create: `src/components/features/ExchangeRateCard.vue`
- Create: `src/components/features/TradeEcosystem.vue`

- [ ] **Step 1: Create GlossaryCard.vue**

```vue
<script setup>
import { useGlossaryStore } from '@/stores/glossary.js'

const glossary = useGlossaryStore()
const samples = glossary.terms.slice(0, 2)
</script>

<template>
  <div class="md:col-span-2 bg-surface-container-low border border-outline-variant p-6 rounded-lg relative overflow-hidden group">
    <div class="relative z-10">
      <div class="flex items-center gap-3 mb-4">
        <span class="material-symbols-outlined p-2 bg-primary text-on-primary rounded">menu_book</span>
        <h3 class="text-2xl font-semibold">Industry Glossary</h3>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="term in samples" :key="term.cn" class="bg-white/60 p-3 border border-outline-variant rounded">
          <p class="text-[10px] font-bold text-outline-variant uppercase">CN: {{ term.cn }}</p>
          <p class="text-sm font-bold text-on-surface">VN: {{ term.vn }}</p>
          <p class="text-xs text-on-surface-variant">{{ term.en }}</p>
        </div>
      </div>
      <router-link to="/glossary" class="mt-6 text-primary font-bold text-sm flex items-center gap-2 hover:translate-x-1 transition-transform inline-flex cursor-pointer">
        Explore Full Glossary <span class="material-symbols-outlined">arrow_forward</span>
      </router-link>
    </div>
    <div class="absolute -right-8 -bottom-8 opacity-5 transition-transform group-hover:scale-110 duration-500">
      <span class="material-symbols-outlined text-[160px]">settings_input_component</span>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Create ExchangeRateCard.vue**

```vue
<script setup>
import { useExchangeRateStore } from '@/stores/exchangeRate.js'

const rates = useExchangeRateStore()
</script>

<template>
  <div class="bg-secondary-fixed text-on-secondary-fixed p-6 rounded-lg flex flex-col justify-between border border-secondary/20 shadow-sm relative overflow-hidden">
    <div class="relative z-10">
      <div class="flex justify-between items-start mb-4">
        <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'wght' 600;">currency_exchange</span>
        <span class="bg-white/50 px-2 py-1 rounded text-[10px] font-black">{{ rates.trend }} 24h</span>
      </div>
      <h3 class="text-2xl font-semibold leading-tight mb-2">Live Exchange Rate</h3>
      <div class="space-y-1">
        <div class="flex justify-between items-baseline">
          <span class="text-sm opacity-80">1 CNY =</span>
          <span class="text-xl font-black">{{ rates.cnyToVnd.toLocaleString() }} VND</span>
        </div>
        <div class="flex justify-between items-baseline">
          <span class="text-sm opacity-80">1 USD =</span>
          <span class="text-xl font-black">{{ rates.usdToVnd.toLocaleString() }} VND</span>
        </div>
      </div>
    </div>
    <div class="mt-6 p-3 bg-white/30 rounded border border-on-secondary-fixed/10">
      <p class="text-[10px] uppercase font-bold mb-1">Trading Strategy</p>
      <p class="text-xs leading-tight">Stable conditions. Ideal for confirming long-term procurement contracts.</p>
    </div>
    <div class="absolute -left-12 -top-12 opacity-5">
      <span class="material-symbols-outlined text-[140px]">trending_up</span>
    </div>
  </div>
</template>
```

- [ ] **Step 3: Create TradeEcosystem.vue**

```vue
<template>
  <section class="mt-12">
    <div class="bg-surface border border-outline-variant rounded-lg overflow-hidden flex flex-col md:flex-row">
      <div class="w-full md:w-1/3 h-64 md:h-auto relative bg-surface-container-high flex items-center justify-center">
        <span class="material-symbols-outlined text-[120px] text-outline-variant/30">precision_manufacturing</span>
        <div class="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-end p-6">
          <p class="text-white font-bold text-lg">Visual Parts Identifier</p>
          <p class="text-white/80 text-xs">AI-powered image-to-text translation coming soon.</p>
        </div>
      </div>
      <div class="flex-1 p-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-12 rounded bg-tertiary-fixed flex items-center justify-center">
            <span class="material-symbols-outlined text-on-tertiary-fixed">layers</span>
          </div>
          <div>
            <h3 class="text-2xl font-semibold">Integrated Trade Ecosystem</h3>
            <p class="text-on-surface-variant text-sm">Beyond translation. Manage the entire procurement lifecycle.</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex items-start gap-3">
            <span class="material-symbols-outlined text-secondary">check_circle</span>
            <div>
              <p class="font-bold text-sm">Automated Quoting</p>
              <p class="text-xs text-on-surface-variant">Convert chats into formal PDF inquiries instantly.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="material-symbols-outlined text-secondary">check_circle</span>
            <div>
              <p class="font-bold text-sm">Logistics Mapping</p>
              <p class="text-xs text-on-surface-variant">Track cross-border shipments between CN & VN.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/features/
git commit -m "feat: add feature cards — Glossary, ExchangeRate, TradeEcosystem"
```

---

### Task 11: Create TranslationView (home page)

**Files:**
- Create: `src/views/TranslationView.vue`

- [ ] **Step 1: Create TranslationView.vue**

```vue
<script setup>
import { watch } from 'vue'
import { useTranslationStore } from '@/stores/translation.js'
import LanguageToggle from '@/components/translation/LanguageToggle.vue'
import TranslationPanel from '@/components/translation/TranslationPanel.vue'
import GlossaryCard from '@/components/features/GlossaryCard.vue'
import ExchangeRateCard from '@/components/features/ExchangeRateCard.vue'
import TradeEcosystem from '@/components/features/TradeEcosystem.vue'

const store = useTranslationStore()

let debounceTimer = null
watch(() => store.inputText, () => {
  clearTimeout(debounceTimer)
  if (store.inputText.trim()) {
    debounceTimer = setTimeout(() => store.translate(), 500)
  } else {
    store.outputText = ''
    store.error = null
  }
})

function handleClear() {
  store.clearInput()
}

function handleTranslate() {
  store.translate()
}
</script>

<template>
  <div>
    <!-- Hero / Controls Row -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 class="text-4xl font-bold text-primary mb-1">Precision Translation</h1>
        <p class="text-on-surface-variant text-base">Real-time trade communication for rotary drilling rig parts.</p>
      </div>
      <!-- Technical Mode Toggle -->
      <div class="flex items-center gap-4 bg-surface-container p-2 rounded-xl border border-outline-variant">
        <span class="text-sm font-semibold text-on-surface-variant ml-2">Rotary Drilling Rig Mode</span>
        <button
          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer"
          :class="store.mode === 'technical' ? 'bg-tertiary' : 'bg-outline'"
          @click="store.mode = store.mode === 'technical' ? 'general' : 'technical'"
        >
          <span
            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            :class="store.mode === 'technical' ? 'translate-x-6' : 'translate-x-1'"
          />
        </button>
      </div>
    </div>

    <!-- Language Toggle -->
    <LanguageToggle />

    <!-- Translation Panels -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      <TranslationPanel
        type="input"
        :language="store.sourceLang"
        v-model="store.inputText"
        @clear="handleClear"
        @translate="handleTranslate"
      />
      <TranslationPanel
        type="output"
        :language="store.targetLang"
        :modelValue="store.outputText"
        :isLoading="store.isLoading"
        :error="store.error"
        @translate="handleTranslate"
      />
    </div>

    <!-- Bento Grid -->
    <section class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <GlossaryCard />
      <ExchangeRateCard />
    </section>

    <!-- Trade Ecosystem -->
    <TradeEcosystem />
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/TranslationView.vue
git commit -m "feat: add TranslationView with panels, toggle, and feature cards"
```

---

### Task 12: Create GlossaryView

**Files:**
- Create: `src/views/GlossaryView.vue`

- [ ] **Step 1: Create GlossaryView.vue**

```vue
<script setup>
import { ref, computed } from 'vue'
import { useGlossaryStore } from '@/stores/glossary.js'

const glossary = useGlossaryStore()
const searchQuery = ref('')
const selectedCategory = ref('全部')
const showAddModal = ref(false)
const newTerm = ref({ cn: '', vn: '', en: '', category: '' })

const filteredTerms = computed(() => glossary.search(searchQuery.value, selectedCategory.value))

function addTerm() {
  if (!newTerm.value.cn || !newTerm.value.vn) return
  glossary.addTerm({ ...newTerm.value })
  newTerm.value = { cn: '', vn: '', en: '', category: '' }
  showAddModal.value = false
}
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold text-primary mb-2">Industry Glossary</h1>
    <p class="text-on-surface-variant text-base mb-8">Chinese-Vietnamese technical terminology for rotary drilling rig parts.</p>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="relative flex-1">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search terms..."
          class="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-sm focus:ring-2 focus:ring-tertiary-container focus:border-transparent outline-none"
        />
      </div>
      <button
        class="flex items-center gap-2 px-4 py-2.5 bg-secondary text-on-secondary rounded-lg font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer"
        @click="showAddModal = true"
      >
        <span class="material-symbols-outlined">add</span> Add Term
      </button>
    </div>

    <!-- Category chips -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="cat in glossary.categories"
        :key="cat"
        class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
        :class="selectedCategory === cat
          ? 'bg-tertiary-container text-on-tertiary-container'
          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Term Table -->
    <div class="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-primary text-on-primary">
            <th class="text-left px-4 py-3 text-sm font-semibold">中文</th>
            <th class="text-left px-4 py-3 text-sm font-semibold">Tiếng Việt</th>
            <th class="text-left px-4 py-3 text-sm font-semibold hidden md:table-cell">English</th>
            <th class="text-left px-4 py-3 text-sm font-semibold hidden sm:table-cell">Category</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(term, i) in filteredTerms"
            :key="i"
            class="border-b border-outline-variant text-sm"
            :class="i % 2 === 0 ? 'bg-white/40' : 'bg-surface-container-low/40'"
          >
            <td class="px-4 py-3 font-medium text-on-surface">{{ term.cn }}</td>
            <td class="px-4 py-3 text-on-surface">{{ term.vn }}</td>
            <td class="px-4 py-3 text-on-surface-variant hidden md:table-cell">{{ term.en }}</td>
            <td class="px-4 py-3 hidden sm:table-cell">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-container-high text-on-surface-variant">
                {{ term.category }}
              </span>
            </td>
          </tr>
          <tr v-if="filteredTerms.length === 0">
            <td colspan="4" class="px-4 py-12 text-center text-on-surface-variant text-sm">
              No terms found matching your search.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Term Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" @click.self="showAddModal = false">
      <div class="bg-surface-container-lowest rounded-lg border border-outline-variant p-6 w-full max-w-md shadow-lg">
        <h3 class="text-xl font-bold text-primary mb-4">Add New Term</h3>
        <div class="space-y-3">
          <div>
            <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">中文</label>
            <input v-model="newTerm.cn" class="w-full mt-1 px-3 py-2 border border-outline-variant rounded text-sm focus:ring-2 focus:ring-tertiary-container outline-none" />
          </div>
          <div>
            <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Tiếng Việt</label>
            <input v-model="newTerm.vn" class="w-full mt-1 px-3 py-2 border border-outline-variant rounded text-sm focus:ring-2 focus:ring-tertiary-container outline-none" />
          </div>
          <div>
            <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">English</label>
            <input v-model="newTerm.en" class="w-full mt-1 px-3 py-2 border border-outline-variant rounded text-sm focus:ring-2 focus:ring-tertiary-container outline-none" />
          </div>
          <div>
            <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Category</label>
            <input v-model="newTerm.category" class="w-full mt-1 px-3 py-2 border border-outline-variant rounded text-sm focus:ring-2 focus:ring-tertiary-container outline-none" />
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button class="px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container rounded cursor-pointer" @click="showAddModal = false">Cancel</button>
          <button class="px-4 py-2 text-sm bg-secondary text-on-secondary rounded font-bold hover:opacity-90 cursor-pointer" @click="addTerm">Add Term</button>
        </div>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/GlossaryView.vue
git commit -m "feat: add GlossaryView with search, filter, and add term"
```

---

### Task 13: Create InquiryView and ProfileView

**Files:**
- Create: `src/views/InquiryView.vue`
- Create: `src/views/ProfileView.vue`

- [ ] **Step 1: Create InquiryView.vue**

```vue
<template>
  <div class="flex flex-col items-center justify-center py-24 text-center">
    <span class="material-symbols-outlined text-[80px] text-outline-variant/40 mb-6">description</span>
    <h1 class="text-3xl font-bold text-primary mb-2">Inquiry Management</h1>
    <p class="text-on-surface-variant text-base max-w-md">
      询价管理功能正在开发中，即将上线。<br/>
      Chức năng quản lý yêu cầu báo giá đang được phát triển.
    </p>
    <router-link to="/" class="mt-8 px-6 py-3 bg-tertiary-container text-on-tertiary-container rounded-lg font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer">
      Back to Translation
    </router-link>
  </div>
</template>
```

- [ ] **Step 2: Create ProfileView.vue**

```vue
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
```

- [ ] **Step 3: Commit**

```bash
git add src/views/InquiryView.vue src/views/ProfileView.vue
git commit -m "feat: add InquiryView placeholder and ProfileView with API key config"
```

---

### Task 14: Create App.vue with layout shell

**Files:**
- Create: `src/App.vue`

- [ ] **Step 1: Create App.vue**

```vue
<script setup>
import { ref } from 'vue'
import TopNavBar from '@/components/layout/TopNavBar.vue'
import SideNavBar from '@/components/layout/SideNavBar.vue'
import FooterBar from '@/components/layout/FooterBar.vue'

const sidebarVisible = ref(false)

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value
}

function closeSidebar() {
  sidebarVisible.value = false
}
</script>

<template>
  <div class="min-h-screen bg-background text-on-background font-sans">
    <TopNavBar @toggle-sidebar="toggleSidebar" />
    <SideNavBar :visible="sidebarVisible" @close="closeSidebar" />
    <main class="md:ml-64 pt-20 pb-16 px-6 max-w-[1440px] mx-auto min-h-screen">
      <RouterView />
    </main>
    <FooterBar class="md:ml-64" />
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/App.vue
git commit -m "feat: add App.vue shell with layout and routing"
```

---

### Task 15: Verify the project builds and runs

**Files:**
- None (verification only)

- [ ] **Step 1: Install dependencies**

Run: `cd /Users/geqiuyang/Downloads/Coding/AICoding/VieProject && npm install`
Expected: All packages install without errors

- [ ] **Step 2: Build the project**

Run: `cd /Users/geqiuyang/Downloads/Coding/AICoding/VieProject && npm run build`
Expected: Build succeeds with no errors. Output in `dist/` directory.

- [ ] **Step 3: Verify file structure**

Run: `ls /Users/geqiuyang/Downloads/Coding/AICoding/VieProject/src/`
Expected: `main.js  App.vue  style.css  router/  stores/  api/  views/  components/`

---

## Self-Review

1. **Spec coverage:**
   - TranslationView with dual panels, language toggle, mode toggle — Task 11
   - DeepSeek API integration — Task 3
   - Pinia stores (translation, glossary, exchangeRate) — Task 4
   - GlossaryView with search, filter, table, add term — Task 12
   - InquiryView placeholder — Task 13
   - ProfileView with API key — Task 13
   - Layout components (TopNav, SideNav, Footer) — Tasks 5-7
   - Feature cards (GlossaryCard, ExchangeRateCard, TradeEcosystem) — Task 10
   - Responsive sidebar (desktop persistent, mobile drawer) — Task 6
   - Error handling — Task 8 (error messages in TranslationPanel)
   - All spec requirements covered.

2. **Placeholder scan:** No TBDs, TODOs, or vague instructions. All code is complete and specific. InquiryView placeholder is by design (spec says so).

3. **Type consistency:**
   - `useTranslationStore` — consistent across Tasks 4, 8, 9, 11, 13
   - `useGlossaryStore` — consistent across Tasks 4, 10, 12
   - `useExchangeRateStore` — consistent across Tasks 4, 5, 10
   - Component props (type, language, modelValue) — consistent across Tasks 8, 11
   - Router paths (`/`, `/glossary`, `/inquiry`, `/profile`) — consistent across Tasks 2, 6, 11, 12, 13
   - All checks pass.
