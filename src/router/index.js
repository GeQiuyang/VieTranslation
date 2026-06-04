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
