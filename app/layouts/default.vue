<template>
  <div class="min-h-screen bg-white flex flex-col font-sans antialiased text-slate-900">
    
    <nav class="sticky top-0 z-[100] w-full h-20 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 lg:px-12 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold transition-transform group-hover:rotate-6">
          C
        </div>
        <span class="text-xl font-black tracking-tighter">
          CARS<span class="text-orange-500">POC</span>
        </span>
      </NuxtLink>

      <div class="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
        <NuxtLink to="/" class="hover:text-slate-900 transition-colors">Inventory</NuxtLink>
        <NuxtLink to="/admin" class="hover:text-slate-900 transition-colors">Admin Portal</NuxtLink>
      </div>

      <button class="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-full transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </nav>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="py-12 border-t border-slate-50 bg-white">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2026 CARSPOC Showroom • All Rights Reserved
        </p>
        <div class="flex gap-6">
          <div class="w-4 h-4 bg-slate-100 rounded-full"></div>
          <div class="w-4 h-4 bg-slate-100 rounded-full"></div>
          <div class="w-4 h-4 bg-slate-100 rounded-full"></div>
        </div>
      </div>
    </footer>
  </div>
</template>