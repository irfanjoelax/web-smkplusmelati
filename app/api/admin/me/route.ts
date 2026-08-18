import { NextResponse } from "next/server";
import { currentAdmin } from "@/app/lib/admin-guard";

export async function GET() {
  const user = await currentAdmin();
  if (!user) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, user });
}