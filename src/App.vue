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
  <div class="min-h-screen bg-background text-on-background font-sans overflow-x-hidden">
    <TopNavBar @toggle-sidebar="toggleSidebar" />
    <SideNavBar :visible="sidebarVisible" @close="closeSidebar" />
    <main class="md:ml-64 pt-20 pb-16 px-6 max-w-[1440px] mx-auto min-h-screen">
      <RouterView />
    </main>
    <FooterBar class="md:ml-64" />
  </div>
</template>
