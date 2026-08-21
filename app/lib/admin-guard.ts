import { cookies } from "next/headers";
import { COOKIE_NAME, verifySession } from "./jwt";

export async function requireAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return (await verifySession(token)) !== null;
}

export async function currentAdmin(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}