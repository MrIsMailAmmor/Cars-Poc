
<template>
  <div style="font-family: sans-serif; padding: 20px;">
    <h1>Admin Car Catalogue</h1>
    
    <table border="1" cellpadding="10" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price ($)</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in cars" :key="car.id">
          <td>{{ car.name }}</td>
          <td>
            <input type="number" :value="car.price" 
              @change="(e) => updatePrice(car, e.target.value)" />
          </td>
          <td>
            <span :style="{ color: car.status === 'AVAILABLE' ? 'green' : 'red' }">
              {{ car.status }}
            </span>
          </td>
          <td>
            <button @click="toggleStatus(car)">Toggle Status</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const { data: cars, refresh } = await useFetch('/api/cars')

// Function to update price quickly
const updatePrice = async (car, newPrice) => {
  await $fetch('/api/cars', {
    method: 'PATCH',
    body: { id: car.id, price: parseInt(newPrice) }
  })
  refresh()
}

// Function to toggle status
const toggleStatus = async (car) => {
  const nextStatus = car.status === 'AVAILABLE' ? 'SOLD' : 'AVAILABLE'
  await $fetch('/api/cars', {
    method: 'PATCH',
    body: { id: car.id, status: nextStatus }
  })
  refresh()
}
</script>
