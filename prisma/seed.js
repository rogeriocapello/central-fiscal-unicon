const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const db = new PrismaClient();

async function main() {
  // Master credential is stored only as a bcrypt hash; no plaintext password is committed.
  const masterPasswordHash = "$2y$12$Gvg/Dy2PPXUUTqTfGsczKefxZEVLMUEen.zgypMdTazhTCzRZstfi";

  await db.user.upsert({
    where: { email: "rogerio@unicon.local" },
    update: { name: "Rogério Capello", passwordHash: masterPasswordHash, role: "MASTER", active: true },
    create: { name: "Rogério Capello", email: "rogerio@unicon.local", passwordHash: masterPasswordHash, role: "MASTER", active: true },
  });

  for (const name of ["Aline", "Nelson", "Mariane", "Verônica", "Adriana"]) {
    const email = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() + "@unicon.local";
    const randomPassword = crypto.randomBytes(32).toString("base64url");
    const analystHash = await bcrypt.hash(randomPassword, 12);
    await db.user.upsert({
      where: { email },
      update: { name, role: "ANALYST", active: true },
      create: { name, email, passwordHash: analystHash, role: "ANALYST", active: true },
    });
  }
}

main().finally(() => db.$disconnect());
