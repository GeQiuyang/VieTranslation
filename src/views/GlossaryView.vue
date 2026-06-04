<script setup>
import { ref, computed } from 'vue'
import { useGlossaryStore } from '@/stores/glossary.js'

const glossary = useGlossaryStore()
const searchQuery = ref('')
const selectedCategory = ref('全部')
const showModal = ref(false)
const editIndex = ref(-1)
const newTerm = ref({ cn: '', vn: '', en: '', category: '' })
const formErrors = ref({})
const duplicateError = ref(false)

const filteredTerms = computed(() => glossary.search(searchQuery.value, selectedCategory.value))

const modalTitle = computed(() => editIndex.value >= 0 ? 'Edit Term' : 'Add New Term')

function openAddModal() {
  editIndex.value = -1
  newTerm.value = { cn: '', vn: '', en: '', category: '' }
  formErrors.value = {}
  duplicateError.value = false
  showModal.value = true
}

function openEditModal(index, term) {
  editIndex.value = index
  newTerm.value = { ...term }
  formErrors.value = {}
  duplicateError.value = false
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  formErrors.value = {}
  duplicateError.value = false
}

function validate() {
  const errors = {}
  if (!newTerm.value.cn.trim()) errors.cn = 'Required'
  if (!newTerm.value.vn.trim()) errors.vn = 'Required'
  if (!newTerm.value.category.trim()) errors.category = 'Required'
  formErrors.value = errors
  return Object.keys(errors).length === 0
}

function submitTerm() {
  if (!validate()) return

  const term = {
    cn: newTerm.value.cn.trim(),
    vn: newTerm.value.vn.trim(),
    en: newTerm.value.en.trim(),
    category: newTerm.value.category.trim()
  }

  if (glossary.isDuplicate(term, editIndex.value)) {
    duplicateError.value = true
    return
  }

  if (editIndex.value >= 0) {
    glossary.updateTerm(editIndex.value, term)
  } else {
    glossary.addTerm(term)
  }
  closeModal()
}

function removeTerm(index) {
  glossary.deleteTerm(index)
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
        @click="openAddModal"
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
            <th class="text-center px-4 py-3 text-sm font-semibold w-24">Actions</th>
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
            <td class="px-2 py-3 text-center">
              <button
                class="material-symbols-outlined text-sm text-on-surface-variant hover:text-primary p-1 cursor-pointer"
                title="Edit"
                @click="openEditModal(i, term)"
              >edit</button>
              <button
                class="material-symbols-outlined text-sm text-on-surface-variant hover:text-error p-1 cursor-pointer"
                title="Delete"
                @click="removeTerm(i)"
              >delete</button>
            </td>
          </tr>
          <tr v-if="filteredTerms.length === 0">
            <td colspan="5" class="px-4 py-12 text-center text-on-surface-variant text-sm">
              No terms found matching your search.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Term Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" @click.self="closeModal">
      <div class="bg-surface-container-lowest rounded-lg border border-outline-variant p-6 w-full max-w-md shadow-lg">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-primary">{{ modalTitle }}</h3>
          <button class="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer" @click="closeModal">close</button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">中文 <span class="text-error">*</span></label>
            <input v-model="newTerm.cn" class="w-full mt-1 px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-tertiary-container outline-none" :class="formErrors.cn ? 'border-error' : 'border-outline-variant'" placeholder="中文术语" />
            <span v-if="formErrors.cn" class="text-error text-[10px]">{{ formErrors.cn }}</span>
          </div>
          <div>
            <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Tiếng Việt <span class="text-error">*</span></label>
            <input v-model="newTerm.vn" class="w-full mt-1 px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-tertiary-container outline-none" :class="formErrors.vn ? 'border-error' : 'border-outline-variant'" placeholder="Thuật ngữ tiếng Việt" />
            <span v-if="formErrors.vn" class="text-error text-[10px]">{{ formErrors.vn }}</span>
          </div>
          <div>
            <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">English</label>
            <input v-model="newTerm.en" class="w-full mt-1 px-3 py-2 border border-outline-variant rounded text-sm focus:ring-2 focus:ring-tertiary-container outline-none" placeholder="English term (optional)" />
          </div>
          <div>
            <label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Category <span class="text-error">*</span></label>
            <input
              v-model="newTerm.category"
              :list="'category-list'"
              class="w-full mt-1 px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-tertiary-container outline-none"
              :class="formErrors.category ? 'border-error' : 'border-outline-variant'"
              placeholder="Select or type a category"
            />
            <datalist :id="'category-list'">
              <option v-for="cat in glossary.categoryOptions" :key="cat" :value="cat" />
            </datalist>
            <span v-if="formErrors.category" class="text-error text-[10px]">{{ formErrors.category }}</span>
          </div>
        </div>
        <div v-if="duplicateError" class="mt-3 text-error text-xs flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">warning</span>
          This term already exists in the inventory.
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button class="px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container rounded cursor-pointer" @click="closeModal">Cancel</button>
          <button class="px-4 py-2 text-sm bg-secondary text-on-secondary rounded font-bold hover:opacity-90 cursor-pointer" @click="submitTerm">
            {{ editIndex >= 0 ? 'Update' : 'Add Term' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
