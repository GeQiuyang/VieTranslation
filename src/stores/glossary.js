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
