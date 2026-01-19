import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);
  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
  }

  const file = files[0];

  // 1. USE THE ABSOLUTE DOCKER PATH
  // This matches your docker-compose volume exactly: ./public/uploads:/app/public/uploads
  const UPLOAD_DIR = "/app/public/uploads";
  const filename = `${Date.now()}-${file.filename}`;
  const fullPath = join(UPLOAD_DIR, filename);

  try {
    // 2. ENSURE THE DIRECTORY EXISTS AT THE ABSOLUTE PATH
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // 3. WRITE TO THE ABSOLUTE PATH
    await writeFile(fullPath, file.data);

    // 4. RETURN THE RELATIVE URL FOR THE BROWSER
    // Nuxt will serve files from public/ as if they are at the root
    return {
      url: `/uploads/${filename}`,
      savedTo: fullPath,
    };
  } catch (error) {
    console.error("Upload Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to write file to disk",
    });
  }
});
