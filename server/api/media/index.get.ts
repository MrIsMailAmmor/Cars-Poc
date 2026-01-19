import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { prisma } from "../../utils/prisma";
import { existsSync, mkdir } from "node:fs";

export default defineEventHandler(async () => {
  const uploadDir = join(process.cwd(), "public", "uploads");
  // DEBUG: Check if directory exists
  if (!existsSync(uploadDir)) {
    console.log("Directory missing, creating:", uploadDir);
    return []; // Return empty if we just created it
  }
  try {
    const files = await readdir(uploadDir);
    const cars = await prisma.car.findMany({
      select: { image: true, name: true },
    });

    console.log(uploadDir);
    const mediaList = await Promise.all(
      files.map(async (file) => {
        const filePath = join(uploadDir, file);
        const fileStat = await stat(filePath);
        const publicPath = `/uploads/${file}`;

        // Find which car uses this image
        const linkedCar = cars.find((c) => c.image === publicPath);

        return {
          filename: file,
          url: publicPath,
          size: (fileStat.size / 1024 / 1024).toFixed(2) + " MB",
          isUsed: !!linkedCar,
          linkedTo: linkedCar ? linkedCar.name : null,
          createdAt: fileStat.birthtime,
        };
      }),
    );

    return mediaList.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  } catch (e) {
    return [];
  }
});
