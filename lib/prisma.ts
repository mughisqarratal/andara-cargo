import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
console.log("DATABASE_URL status:", connectionString ? "Loaded" : "MISSING!");

// Mencegah pembuatan instance berlebih saat hot-reloading di Next.js development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  (() => {
    const adapter = new PrismaMariaDb(connectionString!);
    const client = new PrismaClient({
      adapter,
      log: ["query", "error", "warn"],
    });
    console.log("Prisma Client successfully initialized with MariaDB adapter.");
    return client;
  })();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}