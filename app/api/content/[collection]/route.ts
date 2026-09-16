import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  COLLECTION_FILES,
  type ContentKey,
  getContent,
  saveContent,
} from "@/app/lib/content";
import { requireAdmin } from "@/app/lib/admin-guard";
import {
  describeContentChange,
  describeDeletedContent,
  logActivity,
} from "@/app/lib/activity";
import { deleteContentItem } from "@/app/lib/deleteContentItem";
import { clearContentImage } from "@/app/lib/updateContentImage";
import { deleteUploadIfUnused } from "@/app/lib/unusedUpload";
import { removeBerandaPreview } from "@/app/lib/removeBerandaPreview";
import type { Beranda } from "@/app/lib/types";
import { isJurusanData, normalizeJurusanData } from "@/app/lib/jurusan";
import { isProgramData, normalizeProgramData } from "@/app/lib/program";

const KEYS = Object.keys(COLLECTION_FILES) as ContentKey[];

const REVALIDATE_ROUTES: Record<ContentKey, string[]> = {
  guru: ["/guru"],
  visiMisi: ["/visi-misi"],
  jurusan: [],
  prestasi: ["/prestasi-siswa"],
  fasilitas: ["/fasilitas"],
  beranda: ["/"],
  ekskul: ["/ekskul"],
  berita: ["/berita"],
  program: [],
  profil: ["/profil"],
};

const DELETE_SECTIONS: Record<ContentKey, (string | null)[]> = {
  guru: [null],
  visiMisi: ["misi"],
  jurusan: [null],
  prestasi: ["items"],
  fasilitas: [null],
  beranda: ["stats", "majors", "programs", "ekskulPreview", "facilities"],
  ekskul: [null],
  berita: [null],
  program: [null],
  profil: ["paragraphs", "reasons"],
};

const IMAGE_SECTIONS: Partial<Record<ContentKey, (string | null)[]>> = {
  guru: [null],
  prestasi: ["items"],
  fasilitas: [null],
  beranda: ["ekskulPreview", "facilities"],
  ekskul: [null],
  berita: [null],
  program: [],
  profil: [null],
};

function revalidateCollection(key: ContentKey) {
  if (key === "jurusan") revalidatePath("/jurusan/[slug]", "page");
  if (key === "program") revalidatePath("/program/[slug]", "page");
  for (const route of REVALIDATE_ROUTES[key]) {
    revalidatePath(route);
  }
  revalidatePath("/", "layout");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  if (!KEYS.includes(collection as ContentKey)) {
    return NextResponse.json({ error: "Koleksi tidak dikenal" }, { status: 404 });
  }
  const data = await getContent(collection as ContentKey);
  if (collection === "jurusan") {
    return NextResponse.json(normalizeJurusanData(data));
  }
  if (collection === "program") {
    return NextResponse.json(normalizeProgramData(data));
  }
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

  if (collection === "jurusan" && !isJurusanData(body)) {
    return NextResponse.json(
      { error: "Data jurusan tidak valid. Pastikan semua kolom terisi dan slug unik." },
      { status: 400 },
    );
  }
  if (collection === "program" && !isProgramData(body)) {
    return NextResponse.json(
      { error: "Data program tidak valid. Pastikan semua kolom terisi dan nama program unik." },
      { status: 400 },
    );
  }

  const key = collection as ContentKey;
  const previous = await getContent(key);
  const activity = describeContentChange(key, previous, body);
  await saveContent(key, body);
  if (activity) await logActivity(activity);

  revalidateCollection(key);

  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ collection: string }> },
) {
  const { collection } = await params;
  const key = collection as ContentKey;
  if (!KEYS.includes(key) || !IMAGE_SECTIONS[key]) {
    return NextResponse.json({ error: "Koleksi tidak mendukung gambar" }, { status: 404 });
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

  const section = (body as { section?: unknown })?.section;
  if (
    (section !== null && typeof section !== "string") ||
    !IMAGE_SECTIONS[key]?.includes(section as string | null) ||
    !(body && typeof body === "object" && "target" in body)
  ) {
    return NextResponse.json({ error: "Target gambar tidak valid" }, { status: 400 });
  }

  const previous = await getContent(key);
  const before = structuredClone(previous);
  const result = clearContentImage(
    previous,
    section as string | null,
    (body as { target: unknown }).target,
  );
  if (!result.ok) {
    return NextResponse.json(
      { error: "Data sudah berubah atau tidak ditemukan. Muat ulang halaman." },
      { status: 409 },
    );
  }

  await saveContent(key, result.data);
  const activity = describeContentChange(key, before, result.data);
  if (activity) await logActivity(activity);
  revalidateCollection(key);

  try {
    await deleteUploadIfUnused(result.previousImage);
  } catch (error) {
    console.error("Gagal membersihkan gambar yang tidak dipakai:", error);
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ collection: string }> },
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

  const key = collection as ContentKey;
  const section = (body as { section?: unknown })?.section;
  if (
    (section !== null && typeof section !== "string") ||
    !DELETE_SECTIONS[key].includes(section as string | null) ||
    !(body && typeof body === "object" && "target" in body)
  ) {
    return NextResponse.json({ error: "Target hapus tidak valid" }, { status: 400 });
  }

  const data = await getContent(key);
  let result = deleteContentItem(
    data,
    section as string | null,
    (body as { target: unknown }).target,
  );
  if (!result.ok && "fallback" in body) {
    result = deleteContentItem(
      data,
      section as string | null,
      (body as { fallback: unknown }).fallback,
    );
  }
  if (!result.ok) {
    return NextResponse.json(
      { error: "Item sudah berubah atau tidak ditemukan. Muat ulang halaman." },
      { status: 409 },
    );
  }

  await saveContent(key, result.data);
  if (key === "ekskul" || key === "fasilitas") {
    try {
      const beranda = await getContent<Beranda>("beranda");
      const synced = removeBerandaPreview(
        beranda,
        key,
        (body as { target: unknown }).target,
      );
      if (synced.changed) {
        await saveContent("beranda", synced.data);
        revalidateCollection("beranda");
      }
    } catch (error) {
      console.error("Gagal menyinkronkan pratinjau beranda:", error);
    }
  }
  await logActivity(
    describeDeletedContent(key, (body as { target: unknown }).target),
  );
  revalidateCollection(key);
  return NextResponse.json({ ok: true });
}
