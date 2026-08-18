import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

export function randomHex(bytes: number): string {
  return randomBytes(bytes).toString("hex");
}
