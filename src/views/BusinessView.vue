<script setup>
import { ref } from 'vue'
import { useBusinessStore } from '@/stores/business.js'

const store = useBusinessStore()
const keywordInput = ref('')

function handleSearch() {
  store.keyword = keywordInput.value
  store.search()
}

function exportExcel() {
  if (!store.results.length) return

  const headers = ['Company', 'Contact', 'Email', 'Address', 'Social Media', 'Legal Rep']
  const keys = ['company', 'contact', 'email', 'address', 'social', 'legalRep']

  let html = '<table>'
  html += '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>'
  store.results.forEach(row => {
    html += '<tr>' + keys.map(k => `<td>${(row[k] || '')}</td>`).join('') + '</tr>'
  })
  html += '</table>'

  const blob = new Blob(
    [`<html><head><meta charset="UTF-8"></head><body>${html}</body></html>`],
    { type: 'application/vnd.ms-excel' }
  )
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `customers_${keywordInput.value || 'export'}.xls`
  a.click()
  URL.revokeObjectURL(url)
}

const errorLabels = {
  missing_api_key: '请先在侧边栏设置中配置 API Key',
  empty_keyword: '请输入产品关键词',
  parse_error: '数据解析失败，请重试'
}
</script>

<template>
  <div>
    <!-- Search Section -->
    <div class="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 mb-6">
      <div class="flex flex-col sm:flex-row gap-4 items-end flex-wrap">
        <div class="flex-1 min-w-[200px]">
          <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">Product Keywords</label>
          <input
            v-model="keywordInput"
            type="text"
            placeholder="输入产品关键词 / Enter product keywords..."
            class="w-full px-3 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface text-sm focus:ring-2 focus:ring-tertiary-container outline-none"
            @keyup.enter="handleSearch"
          />
        </div>
        <div class="w-[140px]">
          <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">Customers</label>
          <input
            v-model.number="store.customerCount"
            type="number"
            min="1"
            max="100"
            class="w-full px-3 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface text-sm focus:ring-2 focus:ring-tertiary-container outline-none"
          />
        </div>
        <div class="w-[180px]">
          <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">Country</label>
          <input
            v-model="store.country"
            type="text"
            placeholder="Vietnam"
            class="w-full px-3 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface text-sm focus:ring-2 focus:ring-tertiary-container outline-none"
          />
        </div>
        <div class="flex gap-2">
          <button
            class="flex items-center gap-2 px-4 py-2.5 bg-secondary text-on-secondary rounded-lg font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="store.isLoading || !keywordInput.trim()"
            @click="handleSearch"
          >
            <span v-if="store.isLoading" class="material-symbols-outlined animate-spin text-sm">progress_activity</span>
            <span v-else class="material-symbols-outlined text-sm">search</span>
            {{ store.isLoading ? 'Searching...' : 'Search' }}
          </button>
          <button
            v-if="store.results.length"
            class="flex items-center gap-2 px-4 py-2.5 bg-tertiary-container text-on-tertiary-container rounded-lg font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            @click="exportExcel"
          >
            <span class="material-symbols-outlined text-sm">table_view</span>
            Export Excel
          </button>
        </div>
      </div>
      <div v-if="store.error" class="mt-3 text-error text-xs flex items-center gap-1">
        <span class="material-symbols-outlined text-sm">warning</span>
        {{ errorLabels[store.error] || store.error }}
      </div>
    </div>

    <!-- Results Table -->
    <div v-if="store.results.length" class="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-primary text-on-primary">
              <th class="text-left px-4 py-3 text-sm font-semibold">Company</th>
              <th class="text-left px-4 py-3 text-sm font-semibold">Contact</th>
              <th class="text-left px-4 py-3 text-sm font-semibold hidden md:table-cell">Email</th>
              <th class="text-left px-4 py-3 text-sm font-semibold hidden lg:table-cell">Address</th>
              <th class="text-left px-4 py-3 text-sm font-semibold hidden lg:table-cell">Social Media</th>
              <th class="text-left px-4 py-3 text-sm font-semibold hidden md:table-cell">Legal Rep</th>
              <th class="text-center px-2 py-3 text-sm font-semibold w-12"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in store.results"
              :key="i"
              class="border-b border-outline-variant text-sm"
              :class="i % 2 === 0 ? 'bg-white/40' : 'bg-surface-container-low/40'"
            >
              <td class="px-4 py-3 font-medium text-on-surface">{{ row.company }}</td>
              <td class="px-4 py-3 text-on-surface">{{ row.contact }}</td>
              <td class="px-4 py-3 text-on-surface-variant hidden md:table-cell">
                <a :href="'mailto:' + row.email" class="text-tertiary hover:underline">{{ row.email }}</a>
              </td>
              <td class="px-4 py-3 text-on-surface-variant hidden lg:table-cell text-xs">{{ row.address }}</td>
              <td class="px-4 py-3 text-on-surface-variant hidden lg:table-cell text-xs">{{ row.social }}</td>
              <td class="px-4 py-3 text-on-surface-variant hidden md:table-cell">{{ row.legalRep }}</td>
              <td class="px-2 py-3 text-center">
                <button
                  class="material-symbols-outlined text-sm text-on-surface-variant hover:text-error p-1 cursor-pointer"
                  title="Remove"
                  @click="store.removeRow(i)"
                >close</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-4 py-3 border-t border-outline-variant flex justify-between items-center text-xs text-on-surface-variant">
        <span>{{ store.results.length }} customers found in {{ store.country }} for "{{ store.keyword }}"</span>
        <button class="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer" @click="store.clear()">
          <span class="material-symbols-outlined text-sm">delete</span> Clear All
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="store.isLoading" class="bg-surface-container-lowest border border-outline-variant rounded-lg p-12 text-center">
      <span class="material-symbols-outlined animate-spin text-4xl text-outline-variant mb-4">progress_activity</span>
      <p class="text-on-surface-variant text-sm">搜索 {{ store.country || '...' }} 潜在客户中...</p>
    </div>

    <!-- Empty State -->
    <div v-if="!store.results.length && !store.isLoading" class="flex flex-col items-center justify-center py-24 text-center">
      <span class="material-symbols-outlined text-[80px] text-outline-variant/40 mb-6">person_search</span>
      <p class="text-on-surface-variant text-base max-w-md">
        输入产品关键词，设置客户数和目标国家，AI 将为您搜索潜在客户信息。
      </p>
    </div>
  </div>
</template>
