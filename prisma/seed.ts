import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL tidak ditemukan di environment variables.");
}

// Langsung berikan connectionString ke dalam PrismaMariaDb
const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("admin123456", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@andaracargo.com" },
    update: {},
    create: {
      name: "Admin Utama",
      email: "admin@andaracargo.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin berhasil dibuat:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });