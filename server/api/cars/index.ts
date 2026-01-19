// server/api/cars.ts
export default defineEventHandler(async (event) => {
  const method = event.method;

  // 1. GET ALL
  if (method === "GET") {
    return await prisma.car.findMany({ orderBy: { id: "desc" } });
  }

  // 2. CREATE NEW
  if (method === "POST") {
    const body = await readBody(event);
    return await prisma.car.create({
      data: {
        name: body.name,
        price: parseInt(body.price),
        status: body.status || "AVAILABLE",
      },
    });
  }
});
