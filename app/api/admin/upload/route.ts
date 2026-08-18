import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import path from "path";
import { requireAdmin } from "@/app/lib/admin-guard";

const ALLOWED = new Map([
  ["image/png", ".png"],
  ["image/jpeg", ".jpg"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

const MAX_SIZE = 3 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
  }

  const ext = ALLOWED.get(file.type);
  if (!ext) {
    return NextResponse.json(
      { error: "Tipe file tidak didukung (PNG/JPG/WEBP/GIF)" },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Ukuran maksimal 3 MB" }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const name = `${Date.now()}-${randomBytes(6).toString("hex")}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(path.join(dir, name), buffer);

  return NextResponse.json({ url: `/uploads/${name}` });
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const target = searchParams.get("path") ?? "";
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadsDir, path.basename(target));

  if (!target.startsWith("/uploads/") || !filePath.startsWith(uploadsDir)) {
    return NextResponse.json({ error: "Path tidak valid" }, { status: 400 });
  }

  try {
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  } catch {
    // abaikan error saat menghapus
  }

  return NextResponse.json({ ok: true });
}