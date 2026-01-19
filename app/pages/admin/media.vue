<template>
  <div class="p-10 max-w-7xl mx-auto">
    <div class="flex justify-between items-end mb-10">
      <div>
        <h1 class="text-4xl font-black tracking-tighter">Media Vault</h1>
        <p
          class="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2"
        >
          Storage Optimization & Asset Management
        </p>
      </div>
      <div class="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
        <span class="text-xs font-bold text-slate-500">Total Assets: </span>
        <span class="text-sm font-black text-slate-900">{{
          media?.length || 0
        }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div
        v-for="file in media"
        :key="file.filename"
        class="group relative bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all"
      >
        <div class="aspect-square bg-slate-50 relative">
          <img :src="file.url" class="w-full h-full object-cover" />

          <div class="absolute top-3 left-3">
            <span
              v-if="file.isUsed"
              class="px-2 py-1 bg-green-500 text-white text-[8px] font-black uppercase rounded-md shadow-lg"
              >In Use</span
            >
            <span
              v-else
              class="px-2 py-1 bg-orange-500 text-white text-[8px] font-black uppercase rounded-md shadow-lg"
              >Orphaned</span
            >
          </div>

          <div
            class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
          >
            <button
              @click="deleteFile(file.filename)"
              class="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition"
            >
              🗑️
            </button>
            <a
              :href="file.url"
              target="_blank"
              class="p-3 bg-white text-slate-900 rounded-xl hover:scale-110 transition"
            >
              👁️
            </a>
          </div>
        </div>

        <div class="p-4">
          <p class="text-[10px] font-black text-slate-900 truncate mb-1">
            {{ file.filename }}
          </p>
          <p class="text-[9px] font-bold text-slate-400 uppercase">
            {{ file.size }} • {{ file.linkedTo || "No Owner" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { data: media, refresh } = await useFetch("/api/media");

const deleteFile = async (filename) => {
  if (
    !confirm("Are you sure? This will break any car listing using this image.")
  )
    return;

  await $fetch(`/api/media/${filename}`, { method: "DELETE" });
  refresh();
};
</script>
