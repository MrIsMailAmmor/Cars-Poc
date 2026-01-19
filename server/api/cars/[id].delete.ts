import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../server/utils/prisma";
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    return await prisma.car.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to Delete vehicle",
    });
  }
});
