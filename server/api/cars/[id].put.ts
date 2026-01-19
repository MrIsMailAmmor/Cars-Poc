import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../server/utils/prisma";
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  // Exclude ID and other metadata from the update payload
  const { id: _id, createdAt: _c, ...updateData } = body;

  try {
    return await prisma.car.update({
      where: { id: Number(id) },
      data: updateData,
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update vehicle",
    });
  }
});
