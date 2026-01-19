<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <div class="relative min-h-[90vh] bg-white overflow-hidden">
      <div
        class="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-orange-50 rounded-full blur-[120px] opacity-50"
      ></div>

      <div
        class="max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 lg:pt-24 flex flex-col lg:flex-row items-center gap-16 relative z-10"
      >
        <div class="w-full lg:w-1/2 space-y-8">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full"
          >
            <span
              class="flex h-2 w-2 rounded-full bg-orange-500 animate-ping"
            ></span>
            <span class="text-[10px] font-black uppercase tracking-[0.2em]"
              >New Arrivals: 2026 Collection</span
            >
          </div>

          <h1
            class="text-7xl lg:text-[110px] font-black leading-[0.85] tracking-tighter text-slate-900"
          >
            DRIVE <br />
            <span class="text-orange-500">BEYOND.</span>
          </h1>

          <p
            class="max-w-md text-slate-500 text-lg leading-relaxed font-medium"
          >
            Experience the pinnacle of automotive engineering. From track-ready
            legends to sustainable luxury, your next masterpiece is here.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <NuxtLink
              to="/cars"
              class="px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-orange-500 transition-all shadow-2xl shadow-slate-200 text-center"
            >
              Explore Inventory
            </NuxtLink>
            <button
              class="px-10 py-5 bg-white border border-slate-100 text-slate-900 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-50 transition-all text-center"
            >
              Private Viewing
            </button>
          </div>

          <div class="flex gap-12 pt-12 border-t border-slate-50">
            <div>
              <p class="text-2xl font-black text-slate-900">120+</p>
              <p
                class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
              >
                Global Locations
              </p>
            </div>
            <div>
              <p class="text-2xl font-black text-slate-900">2.4s</p>
              <p
                class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
              >
                Avg. 0-60 MPH
              </p>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-1/2 relative">
          <div
            class="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transform rotate-2 hover:rotate-0 transition-transform duration-700"
          >
            <img
              src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200"
              class="w-full h-[600px] object-cover"
              alt="Hero Car"
            />

            <div
              class="absolute bottom-8 left-8 p-6 bg-white/90 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-xl"
            >
              <p
                class="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1"
              >
                Current Spotlight
              </p>
              <p class="text-xl font-black text-slate-900">DB12 Volante</p>
              <div class="mt-3 h-1 w-12 bg-slate-900"></div>
            </div>
          </div>

          <div
            class="absolute -bottom-10 -left-10 w-40 h-40 border-l-8 border-b-8 border-orange-500/20 rounded-bl-[4rem]"
          ></div>
        </div>
      </div>
    </div>

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
                >{{ car.modelYear }} MODEL</span
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
