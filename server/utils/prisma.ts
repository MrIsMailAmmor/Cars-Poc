import pkg from "@prisma/client";
import * as adapterPkg from "@prisma/adapter-pg";
import pg from "pg";

const { PrismaClient } = pkg;
const { PrismaPg } = adapterPkg;

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined;
};

const createPrismaClient = () => {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    // Helps you see DB errors in Railway logs
    log: ["error", "warn"],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
