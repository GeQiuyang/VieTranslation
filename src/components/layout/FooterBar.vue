<template>
  <footer class="w-full py-12 px-6 bg-surface-container-lowest border-t border-outline-variant">
    <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
      <div class="flex flex-col gap-4 max-w-sm">
        <span class="text-2xl font-bold text-primary">TradeFlow</span>
        <p class="text-on-surface-variant text-sm">The definitive technical trade tool for the Sino-Vietnamese drilling industry. Engineered for precision, built for reliability.</p>
        <div class="flex gap-4 mt-2">
          <span class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">public</span>
          <span class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">contact_support</span>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-12">
        <div>
          <h4 class="text-sm font-semibold uppercase text-primary mb-4 tracking-widest">Platform</h4>
          <ul class="space-y-2 text-on-surface-variant text-sm">
            <li class="hover:text-secondary cursor-pointer transition-colors">Translator</li>
            <li class="hover:text-secondary cursor-pointer transition-colors">Parts API</li>
            <li class="hover:text-secondary cursor-pointer transition-colors">Live Market</li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold uppercase text-primary mb-4 tracking-widest">Support</h4>
          <ul class="space-y-2 text-on-surface-variant text-sm">
            <li class="hover:text-secondary cursor-pointer transition-colors">Terms of Trade</li>
            <li class="hover:text-secondary cursor-pointer transition-colors">Privacy Policy</li>
            <li class="hover:text-secondary cursor-pointer transition-colors">Help Center</li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold uppercase text-primary mb-4 tracking-widest">Status</h4>
          <div class="bg-surface-container border border-outline-variant px-3 py-2 rounded">
            <p class="text-[10px] font-bold text-green-600 mb-1 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-green-600"></span> ALL SYSTEMS ONLINE
            </p>
            <p class="text-[10px] opacity-60">Version 2.4.1 (Stable Build)</p>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-sm font-semibold text-on-surface-variant">© 2024 TradeFlow. All rights reserved.</p>
      <div class="flex items-center gap-2">
        <span class="text-xs text-on-surface-variant">Powered by</span>
        <span class="font-bold text-sm tracking-widest">DeepSeek</span>
      </div>
    </div>
  </footer>
</template>
