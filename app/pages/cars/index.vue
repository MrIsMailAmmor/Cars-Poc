<script setup>
const { data: cars, pending } = await useFetch("/api/cars");

// 1. FILTER STATE
const search = ref("");
const selectedBrand = ref("All");
const selectedYear = ref("All");
const maxPrice = ref(300000);
const selectedEngine = ref("All");

// 2. DYNAMIC OPTIONS (Derived from your actual data)
const brands = computed(() => [
  "All",
  ...new Set(cars.value?.map((c) => c.brand)),
]);
const years = computed(() =>
  ["All", ...new Set(cars.value?.map((c) => c.modelYear))].sort(
    (a, b) => b - a,
  ),
);

// 3. THE FILTER LOGIC
const filteredCars = computed(() => {
  if (!cars.value) return [];

  return cars.value.filter((car) => {
    const matchesSearch = car.name
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const matchesBrand =
      selectedBrand.value === "All" || car.brand === selectedBrand.value;
    const matchesYear =
      selectedYear.value === "All" ||
      car.modelYear === Number(selectedYear.value);
    const matchesPrice = car.price <= maxPrice.value;
    const matchesEngine =
      selectedEngine.value === "All" ||
      car.engine.includes(selectedEngine.value);

    return (
      matchesSearch &&
      matchesBrand &&
      matchesYear &&
      matchesPrice &&
      matchesEngine
    );
  });
});

const resetFilters = () => {
  search.value = "";
  selectedBrand.value = "All";
  selectedYear.value = "All";
  maxPrice.value = 300000;
  selectedEngine.value = "All";
};
</script>

<template>
  <div class="min-h-screen bg-white flex">
    <aside
      class="hidden lg:block w-80 border-r border-slate-100 p-10 h-screen sticky top-20 overflow-y-auto"
    >
      <div class="flex items-center justify-between mb-10">
        <h2
          class="text-xs font-black uppercase tracking-[0.2em] text-slate-900"
        >
          Filters
        </h2>
        <button
          @click="resetFilters"
          class="text-[10px] font-bold text-orange-500 uppercase hover:underline"
        >
          Reset
        </button>
      </div>

      <div class="space-y-10">
        <div class="space-y-3">
          <label
            class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
            >Search Model</label
          >
          <input
            v-model="search"
            type="text"
            placeholder="e.g. Carrera..."
            class="w-full p-3 bg-slate-50 rounded-xl border-none text-sm focus:ring-2 ring-orange-500"
          />
        </div>

        <div class="space-y-3">
          <label
            class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
            >Brand</label
          >
          <select
            v-model="selectedBrand"
            class="w-full p-3 bg-slate-50 rounded-xl border-none text-sm cursor-pointer"
          >
            <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
          </select>
        </div>

        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <label
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
              >Max Price</label
            >
            <span class="text-sm font-black text-slate-900"
              >${{ maxPrice.toLocaleString() }}</span
            >
          </div>
          <input
            v-model="maxPrice"
            type="range"
            min="20000"
            max="300000"
            step="5000"
            class="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        <div class="space-y-3">
          <label
            class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
            >Engine Type</label
          >
          <div class="flex flex-wrap gap-2">
            <button
              v-for="e in ['All', 'V6', 'V8', 'V10', 'Electric']"
              :key="e"
              @click="selectedEngine = e"
              class="px-4 py-2 rounded-full text-[10px] font-bold uppercase transition-all"
              :class="
                selectedEngine === e
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              "
            >
              {{ e }}
            </button>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 p-6 lg:p-12">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h1 class="text-4xl font-black tracking-tighter text-slate-900">
            The Showroom
          </h1>
          <p class="text-slate-400 text-sm font-medium mt-1">
            Showing {{ filteredCars.length }} vehicles matching your criteria
          </p>
        </div>
      </div>

      <div
        v-if="filteredCars.length === 0 && !pending"
        class="py-20 text-center"
      >
        <div class="text-4xl mb-4 text-slate-200">📭</div>
        <h3 class="text-xl font-bold text-slate-900">No vehicles found</h3>
        <p class="text-slate-400">
          Try adjusting your filters to find your perfect match.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <NuxtLink
          v-for="car in filteredCars"
          :key="car.id"
          :to="`/cars/${car.id}`"
          class="group border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500"
        >
          <div class="aspect-[16/10] bg-slate-50 overflow-hidden relative">
            <img
              :src="car.image"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute bottom-4 left-4 flex gap-2">
              <span
                class="px-2 py-1 bg-white/90 backdrop-blur rounded text-[9px] font-black uppercase"
                >{{ car.horsepower }} HP</span
              >
              <span
                class="px-2 py-1 bg-white/90 backdrop-blur rounded text-[9px] font-black uppercase"
                >{{ car.fuelType }}</span
              >
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start">
              <h3
                class="font-bold text-lg text-slate-900 group-hover:text-orange-500 transition-colors"
              >
                {{ car.name }}
              </h3>
              <p class="font-black text-slate-900">
                ${{ car.price.toLocaleString() }}
              </p>
            </div>
            <p
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1"
            >
              {{ car.brand }} • {{ car.modelYear }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Range Slider Styling */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #f97316; /* Tailwind orange-500 */
  cursor: pointer;
}
</style>
