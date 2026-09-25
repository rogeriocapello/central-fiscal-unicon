const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const db = new PrismaClient();

async function main() {
  const masterPassword = process.env.INITIAL_MASTER_PASSWORD;
  if (!masterPassword) throw new Error("INITIAL_MASTER_PASSWORD is required");

  const masterHash = await bcrypt.hash(masterPassword, 12);
  await db.user.upsert({
    where: { email: "rogerio@unicon.local" },
    update: { name: "Rogério Capello", passwordHash: masterHash, role: "MASTER", active: true },
    create: { name: "Rogério Capello", email: "rogerio@unicon.local", passwordHash: masterHash, role: "MASTER" },
  });

  for (const name of ["Aline", "Nelson", "Mariane", "Verônica", "Adriana"]) {
    const email = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() + "@unicon.local";
    const analystPassword = crypto.randomBytes(32).toString("base64url");
    const analystHash = await bcrypt.hash(analystPassword, 12);
    await db.user.upsert({
      where: { email },
      update: { name, role: "ANALYST", active: true },
      create: { name, email, passwordHash: analystHash, role: "ANALYST" },
    });
  }
}

main().finally(() => db.$disconnect());
