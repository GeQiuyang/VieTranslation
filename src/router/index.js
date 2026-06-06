import { createRouter, createWebHistory } from 'vue-router'

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
    path: '/marketing',
    name: 'marketing',
    component: () => import('@/views/MarketingView.vue')
  },
  {
    path: '/business',
    name: 'business',
    component: () => import('@/views/BusinessView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
