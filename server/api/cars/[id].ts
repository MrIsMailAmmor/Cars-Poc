// server/api/cars/[id].ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }

  // Fetch only one car
  const car = await prisma.car.findUnique({
    where: { id: parseInt(id) }
  })

  if (!car) {
    throw createError({ statusCode: 404, statusMessage: 'Car not found' })
  }

  return car
})