<template>
  <Teleport to="body">
    <div
      v-if="isOpen && form"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        @click="isOpen = false"
        class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      ></div>

      <div
        class="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl p-8 lg:p-12"
      >
        <div class="flex justify-between items-center mb-10">
          <h2 class="text-3xl font-black">
            Edit <span class="text-orange-500">{{ form.name }}</span>
          </h2>
          <button
            @click="isOpen = false"
            class="text-slate-400 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <label class="text-[10px] font-bold uppercase text-slate-400"
              >Core Details</label
            >
            <input
              v-model="form.name"
              class="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-orange-500"
              placeholder="Name"
            />
            <input
              v-model.number="form.price"
              type="number"
              class="w-full p-4 bg-slate-50 rounded-2xl border-none"
              placeholder="Price"
            />
            <select
              v-model="form.status"
              class="w-full p-4 bg-slate-50 rounded-2xl border-none"
            >
              <option value="AVAILABLE">Available</option>
              <option value="RESERVED">Reserved</option>
              <option value="SOLD">Sold</option>
            </select>
          </div>

          <div class="space-y-4">
            <label class="text-[10px] font-bold uppercase text-slate-400"
              >Specifications</label
            >
            <input
              v-model="form.engine"
              class="w-full p-4 bg-slate-50 rounded-2xl border-none"
              placeholder="Engine"
            />
            <input
              v-model.number="form.horsepower"
              type="number"
              class="w-full p-4 bg-slate-50 rounded-2xl border-none"
              placeholder="Horsepower"
            />
            <label
              class="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer"
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

        <div class="flex gap-4 mt-12 pt-8 border-t border-slate-100">
          <button
            @click="handleSave"
            class="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-orange-500 transition-all"
          >
            Save Changes
          </button>
          <button
            @click="handleDelete"
            class="px-8 py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition"
          >
            Delete Vehicle
          </button>
          <button
            @click="isOpen = false"
            class="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
// defineModel handles the v-model visibility from the parent
const isOpen = defineModel("isOpen", { type: Boolean });

const props = defineProps({
  car: { type: Object, default: null },
});

const emit = defineEmits(["updated"]);

// Local reactive state for the form
const form = ref(null);

// Whenever a new car is passed to the modal, create a deep clone for editing
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
    isOpen.value = false; // Close modal on success
    emit("updated"); // Tell parent to refresh the table
  } catch (e) {
    alert("Error updating vehicle.");
  }
};

const handleDelete = async () => {
  if (!confirm("Are you sure you want to delete this vehicle?")) return;
  try {
    await $fetch(`/api/cars/${form.value.id}`, { method: "DELETE" });
    isOpen.value = false; // Close modal on success
    emit("updated"); // Tell parent to refresh the table
  } catch (e) {
    alert("Error deleting vehicle.");
  }
};
</script>
