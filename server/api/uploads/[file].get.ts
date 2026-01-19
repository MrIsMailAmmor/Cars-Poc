import { createReadStream } from "node:fs";
import { join } from "node:path";
import { existsSync } from "node:fs";

export default defineEventHandler(async (event) => {
  // 1. Extract the filename from the URL
  const filename = getRouterParam(event, "file");

  // 2. The ABSOLUTE path where Railway mounts your volume
  // Make sure this matches your Railway Volume mount path exactly
  const filePath = join("/app/public/uploads", filename || "");

  // 3. Check if the file actually exists on the volume
  if (!existsSync(filePath)) {
    console.error(`[Image Proxy] 404 - File not found at: ${filePath}`);
    throw createError({
      statusCode: 404,
      statusMessage: "Image not found on disk",
    });
  }

  // 4. Stream the file to the browser
  return sendStream(event, createReadStream(filePath));
});
