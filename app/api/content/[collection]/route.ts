import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readFileSync } from "fs";
import path from "path";
import {
  COLLECTION_FILES,
  type ContentKey,
  saveContent,
} from "@/app/lib/content";
import { requireAdmin } from "@/app/lib/admin-guard";

const KEYS = Object.keys(COLLECTION_FILES) as ContentKey[];

const REVALIDATE_ROUTES: Record<ContentKey, string[]> = {
  guru: ["/guru"],
  visiMisi: ["/visi-misi"],
  jurusan: ["/jurusan/tkj", "/jurusan/tata-boga"],
  prestasi: ["/prestasi-siswa"],
  fasilitas: ["/fasilitas"],
  beranda: ["/"],
  ekskul: ["/ekskul"],
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  if (!KEYS.includes(collection as ContentKey)) {
    return NextResponse.json({ error: "Koleksi tidak dikenal" }, { status: 404 });
  }
  const file = path.join(
    process.cwd(),
    "app",
    "data",
    COLLECTION_FILES[collection as ContentKey]
  );
  const data = JSON.parse(readFileSync(file, "utf-8"));
  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  if (!KEYS.includes(collection as ContentKey)) {
    return NextResponse.json({ error: "Koleksi tidak dikenal" }, { status: 404 });
  }
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid" }, { status: 400 });
  }
  if (body === null || typeof body !== "object") {
    return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
  }

  saveContent(collection as ContentKey, body);

  // Regenerasi semua halaman yang bersumber dari data ini.
  for (const route of REVALIDATE_ROUTES[collection as ContentKey]) {
    revalidatePath(route);
  }
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}