<script setup>
const isOpen = defineModel("isOpen", { type: Boolean });
const props = defineProps({
  car: { type: Object, default: null },
});
const emit = defineEmits(["updated"]);

const form = ref(null);

// Deep clone the car object whenever it changes
watch(
  () => props.car,
  (newCar) => {
    if (newCar) {
      form.value = JSON.parse(JSON.stringify(newCar));
    }
  },
  { immediate: true },
);

const handleSave = async () => {
  try {
    await $fetch(`/api/cars/${form.value.id}`, {
      method: "PUT",
      body: form.value,
    });
    isOpen.value = false;
    emit("updated");
  } catch (e) {
    alert("Error updating vehicle.");
  }
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen && form"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        @click="isOpen = false"
        class="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
      ></div>

      <div
        class="relative bg-white w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-[2.5rem] shadow-2xl p-8 lg:p-12"
      >
        <div class="flex justify-between items-center mb-10">
          <div>
            <h2 class="text-3xl font-black tracking-tighter">
              Edit <span class="text-orange-500">{{ form.name }}</span>
            </h2>
            <p
              class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1"
            >
              ID: #{{ form.id }} • {{ form.brand }}
            </p>
          </div>
          <button
            @click="isOpen = false"
            class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
          >
            ✕
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div class="space-y-6">
            <h3
              class="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em] border-b border-slate-100 pb-2"
            >
              Identity & Status
            </h3>

            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label
                    class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                    >Car Name</label
                  >
                  <input
                    v-model="form.name"
                    class="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-orange-500"
                  />
                </div>
                <div class="space-y-1">
                  <label
                    class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                    >Brand</label
                  >
                  <input
                    v-model="form.brand"
                    class="w-full p-4 bg-slate-50 rounded-2xl border-none"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label
                    class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                    >Year</label
                  >
                  <input
                    v-model.number="form.modelYear"
                    type="number"
                    class="w-full p-4 bg-slate-50 rounded-2xl border-none"
                  />
                </div>
                <div class="space-y-1">
                  <label
                    class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                    >Price ($)</label
                  >
                  <input
                    v-model.number="form.price"
                    type="number"
                    class="w-full p-4 bg-slate-50 rounded-2xl border-none"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label
                    class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                    >Availability</label
                  >
                  <select
                    v-model="form.status"
                    class="w-full p-4 bg-slate-50 rounded-2xl border-none"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="RESERVED">Reserved</option>
                    <option value="SOLD">Sold</option>
                  </select>
                </div>
                <div class="flex items-end">
                  <label
                    class="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer w-full"
                  >
                    <input
                      type="checkbox"
                      v-model="form.isFeatured"
                      class="w-5 h-5 accent-orange-500"
                    />
                    <span class="text-sm font-bold">Featured Listing</span>
                  </label>
                </div>
              </div>
            </div>

            <h3
              class="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em] border-b border-slate-100 pb-2 pt-4"
            >
              Aesthetics
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label
                  class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                  >Exterior Color</label
                >
                <input
                  v-model="form.exteriorColor"
                  class="w-full p-4 bg-slate-50 rounded-2xl border-none"
                />
              </div>
              <div class="space-y-1">
                <label
                  class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                  >Interior Color</label
                >
                <input
                  v-model="form.interiorColor"
                  class="w-full p-4 bg-slate-50 rounded-2xl border-none"
                />
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <h3
              class="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em] border-b border-slate-100 pb-2"
            >
              Technical Specs
            </h3>

            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label
                    class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                    >Engine</label
                  >
                  <input
                    v-model="form.engine"
                    class="w-full p-4 bg-slate-50 rounded-2xl border-none"
                  />
                </div>
                <div class="space-y-1">
                  <label
                    class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                    >Horsepower</label
                  >
                  <input
                    v-model.number="form.horsepower"
                    type="number"
                    class="w-full p-4 bg-slate-50 rounded-2xl border-none"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label
                    class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                    >Transmission</label
                  >
                  <input
                    v-model="form.transmission"
                    class="w-full p-4 bg-slate-50 rounded-2xl border-none"
                  />
                </div>
                <div class="space-y-1">
                  <label
                    class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                    >Fuel Type</label
                  >
                  <input
                    v-model="form.fuelType"
                    class="w-full p-4 bg-slate-50 rounded-2xl border-none"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label
                    class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                    >Drivetrain</label
                  >
                  <input
                    v-model="form.drivetrain"
                    class="w-full p-4 bg-slate-50 rounded-2xl border-none"
                  />
                </div>
                <div class="space-y-1">
                  <label
                    class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                    >Mileage (mi)</label
                  >
                  <input
                    v-model.number="form.mileage"
                    type="number"
                    class="w-full p-4 bg-slate-50 rounded-2xl border-none"
                  />
                </div>
              </div>
            </div>

            <h3
              class="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em] border-b border-slate-100 pb-2 pt-4"
            >
              Media
            </h3>
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                >Main Image URL</label
              >
              <input
                v-model="form.image"
                class="w-full p-4 bg-slate-50 rounded-2xl border-none"
              />
            </div>
          </div>

          <div class="md:col-span-2 space-y-1 mt-4">
            <label class="text-[10px] font-bold text-slate-400 uppercase ml-1"
              >Vehicle Description</label
            >
            <textarea
              v-model="form.description"
              class="w-full p-6 bg-slate-50 rounded-[2rem] border-none h-32 focus:ring-2 ring-orange-500"
            ></textarea>
          </div>
        </div>

        <div class="flex gap-4 mt-12 pt-8 border-t border-slate-100">
          <button
            @click="handleSave"
            class="flex-1 py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold hover:bg-orange-500 transition-all shadow-lg shadow-slate-100"
          >
            Apply Changes
          </button>
          <button
            @click="isOpen = false"
            class="px-10 py-5 bg-slate-100 text-slate-500 rounded-[1.5rem] font-bold hover:bg-slate-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
