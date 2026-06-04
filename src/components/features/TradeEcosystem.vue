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
