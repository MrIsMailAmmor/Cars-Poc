import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  // 1. Create a standard connection pool
  const pool = new pg.Pool({ 
    connectionString: process.env.DATABASE_URL 
  });
  
  // 2. Wrap it in the Prisma Adapter
  const adapter = new PrismaPg(pool);

  // 3. Pass that adapter to the client
  return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}