<template>
  <div class="p-10 max-w-7xl mx-auto bg-slate-50 min-h-screen">
    <h1 class="text-3xl font-black mb-10 tracking-tighter">
      Inventory Management
    </h1>

    <div
      class="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 mb-12"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="space-y-4">
          <h3
            class="text-xs font-black uppercase text-indigo-600 tracking-widest"
          >
            General Info
          </h3>
          <input
            v-model="form.name"
            placeholder="Car Name"
            class="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 ring-indigo-500"
          />
          <input
            v-model="form.brand"
            placeholder="Brand"
            class="w-full p-3 bg-slate-50 rounded-xl border-none"
          />
          <div class="flex gap-2">
            <input
              v-model.number="form.modelYear"
              type="number"
              class="w-1/2 p-3 bg-slate-50 rounded-xl border-none"
            />
            <input
              v-model.number="form.price"
              type="number"
              placeholder="Price"
              class="w-1/2 p-3 bg-slate-50 rounded-xl border-none"
            />
          </div>
        </div>

        <div class="space-y-4">
          <h3
            class="text-xs font-black uppercase text-indigo-600 tracking-widest"
          >
            Mechanical Specs
          </h3>
          <input
            v-model="form.engine"
            placeholder="Engine Type"
            class="w-full p-3 bg-slate-50 rounded-xl border-none"
          />
          <select
            v-model="form.transmission"
            class="w-full p-3 bg-slate-50 rounded-xl border-none"
          >
            <option>Automatic</option>
            <option>Manual</option>
            <option>Semi-Auto</option>
          </select>
          <div class="flex gap-2">
            <input
              v-model.number="form.horsepower"
              type="number"
              placeholder="HP"
              class="w-1/2 p-3 bg-slate-50 rounded-xl border-none"
            />
            <select
              v-model="form.drivetrain"
              class="w-1/2 p-3 bg-slate-50 rounded-xl border-none"
            >
              <option>AWD</option>
              <option>RWD</option>
              <option>FWD</option>
            </select>
          </div>
        </div>

        <div class="space-y-4">
          <h3
            class="text-xs font-black uppercase text-indigo-600 tracking-widest"
          >
            Media & Extras
          </h3>
          <input
            v-model="form.image"
            placeholder="Main Image URL"
            class="w-full p-3 bg-slate-50 rounded-xl border-none"
          />
          <textarea
            v-model="form.description"
            placeholder="Short Bio"
            class="w-full p-3 bg-slate-50 rounded-xl border-none h-24"
          />
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              v-model="form.isFeatured"
              class="w-5 h-5 accent-indigo-600"
            />
            <span class="text-sm font-bold">Feature on Homepage</span>
          </label>
        </div>
      </div>

      <button
        @click="saveCar"
        class="mt-8 w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all"
      >
        Add Vehicle to Catalogue
      </button>
    </div>

    <div
      class="bg-white rounded-[2rem] overflow-hidden border border-slate-200"
    >
      <table class="w-full text-left">
        <thead
          class="bg-slate-50 text-[10px] font-black uppercase text-slate-400"
        >
          <tr>
            <th class="p-6">Vehicle</th>
            <th class="p-6">Price</th>
            <th class="p-6">Status</th>
            <th class="p-6">Featured</th>
            <th class="p-6">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="car in cars"
            :key="car.id"
            class="hover:bg-slate-50/50 transition"
          >
            <td class="p-6 font-bold">
              {{ car.name }}
              <span class="text-slate-400 font-medium"
                >({{ car.modelYear }})</span
              >
            </td>
            <td class="p-6 text-indigo-600 font-bold">
              ${{ car.price.toLocaleString() }}
            </td>
            <td class="p-6">
              <span
                class="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-full uppercase"
                >{{ car.status }}</span
              >
            </td>
            <td class="p-6">{{ car.isFeatured ? "⭐️" : "" }}</td>
            <td class="p-6 text-right">
              <button
                @click="startEdit(car)"
                class="px-4 py-2 bg-slate-100 hover:bg-orange-500 hover:text-white rounded-lg text-xs font-bold transition-all"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <EditCarModal
      v-model:isOpen="showEditModal"
      :car="selectedCar"
      @updated="refresh"
    />
  </div>
</template>
<script setup>
const { data: cars, refresh } = await useFetch("/api/cars");

const form = ref({
  name: "",
  brand: "",
  modelYear: 2024,
  price: 0,
  engine: "",
  horsepower: 0,
  transmission: "Automatic",
  fuelType: "Petrol",
  mileage: 0,
  drivetrain: "AWD",
  exteriorColor: "",
  interiorColor: "",
  description: "",
  image: "",
  status: "AVAILABLE",
  isFeatured: false,
});

const saveCar = async () => {
  await $fetch("/api/cars", { method: "POST", body: form.value });
  refresh();
};
const showEditModal = ref(false);
const selectedCar = ref(null);

const startEdit = (car) => {
  selectedCar.value = car;
  showEditModal.value = true;
};
</script>
