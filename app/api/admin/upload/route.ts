import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { put, del } from "@vercel/blob";
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

  const name = `uploads/${Date.now()}-${randomBytes(6).toString("hex")}${ext}`;
  const blob = await put(name, file, {
    access: "public",
    contentType: file.type,
  });

  return NextResponse.json({ url: blob.url });
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const url = searchParams.get("path") ?? "";

  if (!url.startsWith("https://")) {
    return NextResponse.json({ error: "URL tidak valid" }, { status: 400 });
  }

  try {
    await del(url);
  } catch {
    // abaikan error saat menghapus
  }

  return NextResponse.json({ ok: true });
}
