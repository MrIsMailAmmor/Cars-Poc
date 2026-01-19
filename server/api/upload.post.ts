import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);
  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
  }

  const file = files[0]; // We only care about the first file

  // Create a unique filename: timestamp-originalName
  const filename = `${Date.now()}-${file.filename}`;
  const path = join(process.cwd(), "public/uploads", filename);

  // Ensure directory exists
  await mkdir(join(process.cwd(), "public/uploads"), { recursive: true });

  // Write the file to the disk
  await writeFile(path, file.data);

  // Return the public URL
  return { url: `/uploads/${filename}` };
});
