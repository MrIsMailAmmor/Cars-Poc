<script setup>
const route = useRoute()
const { data: car, pending } = await useFetch(`/api/cars/${route.params.id}`)

// Gallery logic: using the main image plus placeholders
const activeIndex = ref(0)
const images = computed(() => {
  if (!car.value) return []
  return [
    car.value.image,
    car.value.image,
    car.value.image,
    car.value.image,
      ]
})
const specs = computed(() => ({
  "Performance": `${car.value?.horsepower} HP`,
  "Engine": car.value?.engine,
  "Transmission": car.value?.transmission,
  "Drivetrain": car.value?.drivetrain,
  "Mileage": `${car.value?.mileage.toLocaleString()} mi`,
  "Fuel Type": car.value?.fuelType,
  "Exterior": car.value?.exteriorColor,
  "Interior": car.value?.interiorColor
}))

</script>

<template>
  <div class="min-h-screen bg-white">
    
    <section class="flex flex-col lg:flex-row w-full min-h-[600px] border-b border-slate-100">
      
      <div class="w-full lg:w-1/2 p-10 flex gap-6 bg-white border-r border-slate-50">
        
        <div class="flex flex-col gap-3 w-16 flex-shrink-0">
          <template v-if="pending">
             <div v-for="i in 4" :key="i" class="w-14 h-14 bg-slate-200 rounded animate-pulse" />
          </template>
          <template v-else>
            <button 
              v-for="(img, idx) in images" :key="idx"
              @mouseenter="activeIndex = idx"
              class="w-14 h-14 rounded border-2 overflow-hidden transition-all duration-150"
              :class="activeIndex === idx ? 'border-orange-500 ring-1 ring-orange-500' : 'border-transparent opacity-60 hover:opacity-100'"
            >
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </template>
        </div>

        <div class="flex-1 aspect-square bg-slate-100 rounded-sm flex items-center justify-center border border-slate-200 overflow-hidden">
           <div v-if="pending" class="animate-pulse flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest">
             Loading...
           </div>
           <img v-else :src="images[activeIndex]" class="w-full h-full object-contain p-4" />
        </div>
      </div>

      <div class="w-full lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center bg-white">
        
        <div v-if="pending" class="animate-pulse">
          <div class="h-4 w-32 bg-slate-100 mb-6 rounded"></div>
          <div class="h-12 w-3/4 bg-slate-200 mb-4 rounded"></div>
          <div class="h-10 w-1/3 bg-slate-900/10 mb-10 rounded"></div>
          <div class="space-y-4 mb-12">
            <div v-for="i in 3" :key="i" class="h-4 w-full bg-slate-50 rounded"></div>
          </div>
        </div>

        <div v-else>
          <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            {{ car.year }} Collection / Premium
          </div>

          <h1 class="text-5xl font-bold text-slate-900 mb-4 leading-tight">{{ car.name }}</h1>
          
          <div class="text-4xl font-light text-slate-900 mb-10">
            <span class="text-lg font-medium">$</span>{{ car.price.toLocaleString() }}
          </div>

          <div class="space-y-4 mb-12 text-slate-500 leading-relaxed italic">
            "{{ car.description || 'This premium vehicle has been inspected for quality and performance.' }}"
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <button class="h-14 w-full bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-100">
            Reserve Now
          </button>
          <button class="h-14 w-full bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition">
            Test Drive
          </button>
        </div>
      </div>

    </section>

    <section class="max-w-7xl mx-auto p-10">
      <div class="h-px bg-slate-100 mb-10"></div>
      <div class="text-center text-slate-400 font-medium uppercase tracking-[0.2em] text-sm">
        Details & Specifications
      </div>
      
      </section>
<section class="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
  <h2 class="text-3xl font-black mb-12 tracking-tight text-slate-900">Technical Specifications</h2>
  
  <div class="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
    <div v-for="(value, label) in specs" :key="label" class="border-l-2 border-slate-100 pl-6">
      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{{ label }}</p>
      <p class="text-xl font-semibold text-slate-900">{{ value }}</p>
    </div>
  </div>
</section>
  </div>
</template>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>