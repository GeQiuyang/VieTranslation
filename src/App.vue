<script setup>
import SideNavBar from '@/components/layout/SideNavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-on-background font-sans overflow-x-hidden">
    <SideNavBar />
    <main class="md:ml-64 pt-4 pb-16 px-6 max-w-[1440px] mx-auto min-h-screen">
      <RouterView />
    </main>
  </div>
</template>
