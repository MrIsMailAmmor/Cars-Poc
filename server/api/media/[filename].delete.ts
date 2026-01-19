import { unlink } from "node:fs/promises";
import { join } from "node:path";

export default defineEventHandler(async (event) => {
  const filename = getRouterParam(event, "filename");
  if (!filename) {
    throw createError({
      statusCode: 400,
      statusMessage: "Filename is required",
    });
  }
  const path = join(process.cwd(), "public/uploads", filename);

  try {
    await unlink(path);
    return { success: true };
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Could not delete file",
    });
  }
});
