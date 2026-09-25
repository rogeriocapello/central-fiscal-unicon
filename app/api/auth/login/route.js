import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "../../../../lib/db";
import { signSession } from "../../../../lib/auth";

export async function POST(req) {
  const body = await req.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  const user = await db.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });

  if (!user || !user.active || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const token = signSession(user);
  const res = NextResponse.json({ user: { name: user.name, email: user.email, role: user.role } });
  res.cookies.set("unicon_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 28800,
  });
  await db.auditLog.create({ data: { userId: user.id, action: "LOGIN", entity: "SESSION" } });
  return res;
}
