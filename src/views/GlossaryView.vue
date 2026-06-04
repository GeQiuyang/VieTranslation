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
