import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, signSession } from "@/app/lib/jwt";
import { verifyPassword } from "@/app/lib/auth";

export async function POST(req: Request) {
  let username = "";
  let password = "";
  let rememberMe = false;
  try {
    const body = await req.json();
    username = String(body.username ?? "");
    password = String(body.password ?? "");
    rememberMe = Boolean(body.rememberMe);
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid" }, { status: 400 });
  }

  const expectedUser = process.env.ADMIN_USERNAME ?? "";
  const expectedHash = process.env.ADMIN_PASSWORD_HASH ?? "";

  if (
    !expectedUser ||
    !expectedHash ||
    username !== expectedUser ||
    !verifyPassword(password, expectedHash)
  ) {
    return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
  }

  const token = await signSession(username, rememberMe ? "7d" : "1h");
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(rememberMe ? { maxAge: 60 * 60 * 24 * 7 } : {}),
  });

  return NextResponse.json({ ok: true });
}