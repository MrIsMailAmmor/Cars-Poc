import pkg from "@prisma/client";
import * as adapterPkg from "@prisma/adapter-pg";
import pg from "pg";

const { PrismaClient } = pkg;
const { PrismaPg } = adapterPkg;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  // Use the database URL from your environment variables
  const connectionString = process.env.DATABASE_URL;

  // 1. Create a standard connection pool using the pg library
  const pool = new pg.Pool({ connectionString });

  // 2. Wrap it in the Prisma Adapter for Postgres
  const adapter = new PrismaPg(pool);

  // 3. Initialize Prisma with the driver adapter
  return new PrismaClient({
    adapter,
    // Optional: useful for debugging Railway deployment logs
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

// Singleton pattern to prevent exhausting DB connections during hot-reloads
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
