import { readFileSync, writeFileSync, renameSync } from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import { get, put } from "@vercel/blob";

const dataDir = path.join(process.cwd(), "app", "data");

export type ContentKey =
  | "guru"
  | "visiMisi"
  | "jurusan"
  | "prestasi"
  | "fasilitas"
  | "beranda"
  | "ekskul";

export const COLLECTION_FILES: Record<ContentKey, string> = {
  guru: "guru.json",
  visiMisi: "visi-misi.json",
  jurusan: "jurusan.json",
  prestasi: "prestasi.json",
  fasilitas: "fasilitas.json",
  beranda: "beranda.json",
  ekskul: "ekskul.json",
};

/**
 * Baca data collection.
 * - Production (BLOB_READ_WRITE_TOKEN ada): baca dari Vercel Blob
 * - Dev / fallback: baca dari file lokal app/data/*.json
 */
export async function getContent<T>(key: ContentKey): Promise<T> {
  // Opt-out dari Next.js Data Cache agar selalu baca data terbaru.
  noStore();

  const file = COLLECTION_FILES[key];
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const result = await get(`data/${file}`, {
      access: "public",
      useCache: false,
    });
    if (result) {
      return new Response(result.stream).json() as Promise<T>;
    }
  }

  // Blob belum dibuat: JSON bawaan menjadi data awal collection.
  return JSON.parse(readFileSync(path.join(dataDir, file), "utf-8")) as T;
}

/**
 * Simpan data collection.
 * - Production (BLOB_READ_WRITE_TOKEN ada): tulis ke Vercel Blob
 * - Dev lokal: tulis ke file lokal app/data/*.json
 */
export async function saveContent(key: ContentKey, data: unknown): Promise<void> {
  const file = COLLECTION_FILES[key];
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(`data/${file}`, JSON.stringify(data, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
    });
  } else {
    const target = path.join(dataDir, file);
    const tmp = `${target}.tmp`;
    writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
    renameSync(tmp, target);
  }
}
