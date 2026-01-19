import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../server/utils/prisma";
export default defineEventHandler(async (event) => {
  // readBody is a Nuxt/h3 utility that automatically parses the JSON body
  const body = await readBody(event);

  try {
    // Ensure numeric fields are actually numbers before saving
    const newCar = await prisma.car.create({
      data: {
        name: body.name,
        brand: body.brand,
        modelYear: Number(body.modelYear),
        price: Number(body.price),
        engine: body.engine,
        horsepower: Number(body.horsepower),
        transmission: body.transmission,
        fuelType: body.fuelType,
        mileage: Number(body.mileage),
        drivetrain: body.drivetrain,
        exteriorColor: body.exteriorColor,
        interiorColor: body.interiorColor,
        description: body.description,
        image: body.image,
        status: body.status || "AVAILABLE",
        isFeatured: body.isFeatured || false,
      },
    });

    return newCar;
  } catch (error) {
    console.error("Create Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error creating vehicle listing",
    });
  }
});
