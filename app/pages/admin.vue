<script setup>
const { data: cars, refresh } = await useFetch("/api/cars");

// Form State
const initialState = { id: null, name: "", price: "", status: "AVAILABLE" };
const form = ref({ ...initialState });
const isEditing = computed(() => !!form.value.id);

// ACTIONS
const saveCar = async () => {
  const method = isEditing.value ? "PATCH" : "POST";

  await $fetch("/api/cars", {
    method,
    body: form.value,
  });

  resetForm();
  refresh(); // Refresh table data
};

const editCar = (car) => {
  form.value = { ...car }; // Populate form with car data
};

const deleteCar = async (id) => {
  if (confirm("Delete this car?")) {
    await $fetch("/api/cars", { method: "DELETE", body: { id } });
    refresh();
  }
};

const resetForm = () => {
  form.value = { ...initialState };
};
</script>

<template>
  <div style="max-width: 800px; margin: 40px auto; font-family: sans-serif">
    <h1>🚗 Car Admin PoC</h1>

    <div
      style="
        background: #f4f4f4;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
      "
    >
      <h3>{{ isEditing ? "Edit Car" : "Add New Car" }}</h3>
      <div class="grid grid-col-7">
        <input
          v-model="form.name"
          placeholder="Car Name (e.g. BMW M3)"
          style="flex: 2; padding: 8px"
        />
        <input
          v-model="form.price"
          type="number"
          placeholder="Price"
          style="flex: 1; padding: 8px"
        />
        <input
          v-model="form.image"
          placeholder="Image URL (Unsplash link)"
          class="p-2 border"
        />
        <textarea
          v-model="form.description"
          placeholder="Short description..."
          class="p-2 border"
        ></textarea>
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="form.isFeatured" />
          Feature on Landing Page
        </label>
        <select v-model="form.status" style="padding: 8px">
          <option value="AVAILABLE">Available</option>
          <option value="RESERVED">Reserved</option>
          <option value="SOLD">Sold</option>
        </select>
        <button
          @click="saveCar"
          style="
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          {{ isEditing ? "Update" : "Add" }}
        </button>
        <button
          v-if="isEditing"
          @click="resetForm"
          style="
            background: #6c757d;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Cancel
        </button>
      </div>
    </div>

    <table
      border="1"
      style="width: 100%; border-collapse: collapse; text-align: left"
    >
      <thead style="background: #eee">
        <tr>
          <th style="padding: 10px">Name</th>
          <th style="padding: 10px">Price</th>
          <th style="padding: 10px">Status</th>
          <th style="padding: 10px">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in cars" :key="car.id">
          <td style="padding: 10px">{{ car.name }}</td>
          <td style="padding: 10px">${{ car.price.toLocaleString() }}</td>
          <td style="padding: 10px">
            <span
              :style="{
                color: car.status === 'AVAILABLE' ? 'green' : 'red',
                fontWeight: 'bold',
              }"
            >
              {{ car.status }}
            </span>
          </td>
          <td style="padding: 10px">
            <button @click="editCar(car)" style="margin-right: 5px">
              Edit
            </button>
            <button @click="deleteCar(car.id)" style="color: red">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
