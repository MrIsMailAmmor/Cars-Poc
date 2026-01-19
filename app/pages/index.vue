<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <header
      class="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900"
    >
      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
        class="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div class="relative z-10 text-center text-white px-4">
        <h2 class="text-5xl md:text-7xl font-extrabold mb-4 uppercase">
          Find Your Legacy
        </h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Explore our curated collection of premium vehicles at unbeatable
          market prices.
        </p>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105"
        >
          View Collection
        </button>
      </div>
    </header>

    <section class="max-w-7xl mx-auto py-20 px-6">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-3xl font-bold text-slate-900">Featured Deals</h2>
          <p class="text-slate-500">
            Hand-picked premium selections for this week.
          </p>
        </div>
        <div class="h-1 w-20 bg-blue-600"></div>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="car in featuredCars"
          :key="car.id"
          class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
        >
          <div class="relative h-64 overflow-hidden">
            <img
              :src="car.image"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div
              class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600"
            >
              {{ car.status }}
            </div>
          </div>

          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-slate-900">{{ car.name }}</h3>
              <span class="text-blue-600 font-bold"
                >${{ car.price.toLocaleString() }}</span
              >
            </div>
            <p class="text-slate-500 text-sm mb-6 line-clamp-2">
              {{ car.description }}
            </p>
            <div
              class="flex items-center justify-between pt-4 border-t border-slate-100"
            >
              <span class="text-xs font-bold text-slate-400"
                >{{ car.year }} MODEL</span
              >
              <NuxtLink
                :to="`/cars/${car.id}`"
                class="text-blue-600 font-bold text-sm hover:underline"
              >
                View Details →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Fetch only featured cars for the "Top Deals" section
const { data: featuredCars } = await useFetch("/api/cars", {
  transform: (cars) =>
    cars.filter((c) => c.isFeatured || c.price < 50000).slice(0, 5),
});
</script>
