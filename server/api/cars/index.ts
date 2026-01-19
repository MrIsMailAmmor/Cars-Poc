// server/api/cars.ts
export default defineEventHandler(async (event) => {
  const method = event.method;

  // 1. GET ALL
  if (method === 'GET') {
    return await prisma.car.findMany({ orderBy: { id: 'desc' } });
  }

  // 2. CREATE NEW
  if (method === 'POST') {
    const body = await readBody(event);
    return await prisma.car.create({
      data: {
        name: body.name,
        price: parseInt(body.price),
        status: body.status || 'AVAILABLE'
      }
    });
  }

  // 3. UPDATE EXISTING
  if (method === 'PATCH') {
    const body = await readBody(event);
    return await prisma.car.update({
      where: { id: body.id },
      data: {
        name: body.name,
        price: parseInt(body.price),
        status: body.status
      }
    });
  }

  // 4. DELETE
  if (method === 'DELETE') {
    const body = await readBody(event);
    return await prisma.car.delete({ where: { id: body.id } });
  }
});