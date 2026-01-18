// server/api/cars.ts
import { defineEventHandler, readBody } from 'h3';
import { prisma } from '../utils/prisma';

export default defineEventHandler(async (event) => {
  const method = event.method;

  // 1. GET: List all cars
  if (method === 'GET') {
    return await prisma.car.findMany({ orderBy: { id: 'desc' } });
  }

  // 2. POST: Add a new car
  if (method === 'POST') {
    const body = await readBody(event);
    return await prisma.car.create({ data: body });
  }

  // 3. PATCH: Update price or status
  if (method === 'PATCH') {
    const body = await readBody(event);
    return await prisma.car.update({
      where: { id: body.id },
      data: { 
        price: body.price, 
        status: body.status 
      },
    });
  }
});