<script setup>
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface border-b border-outline-variant">
    <span class="text-2xl font-bold text-primary tracking-tight">TradeFlow</span>
    <!-- Mobile menu toggle -->
    <button class="md:hidden material-symbols-outlined text-on-surface-variant p-2 cursor-pointer" @click="$emit('toggle-sidebar')">
      menu
    </button>
  </header>
</template>
