import { readFileSync, writeFileSync, renameSync } from "fs";
import path from "path";
import { put } from "@vercel/blob";
import type {
  Beranda,
  EkskulItem,
  FasilitasItem,
  JurusanData,
  Prestasi,
  Teacher,
  VisiMisi,
} from "./types";

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

// Env var name per collection — set di Vercel dashboard setelah upload pertama
// Contoh: BLOB_URL_GURU, BLOB_URL_VISIMISI, dst.
function envKey(key: ContentKey) {
  return `BLOB_URL_${key.toUpperCase()}`;
}

/**
 * Baca data collection.
 * - Production (BLOB_READ_WRITE_TOKEN ada + BLOB_URL_<KEY> ada): fetch dari Vercel Blob
 * - Dev / fallback: baca dari file lokal app/data/*.json
 */
export async function getContent<T>(key: ContentKey): Promise<T> {
  const blobUrl = process.env[envKey(key)];
  if (blobUrl) {
    const res = await fetch(blobUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`Gagal fetch blob ${key}: ${res.status}`);
    return res.json() as Promise<T>;
  }
  // Fallback lokal
  const file = COLLECTION_FILES[key];
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
    });
  } else {
    const target = path.join(dataDir, file);
    const tmp = `${target}.tmp`;
    writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
    renameSync(tmp, target);
  }
}

// ──────────────────────────────────────────────────────────────
// Typed getters (sync) — untuk Server Components yang baca saat build/SSR
// Di production, gunakan getContent() versi async di API route.
// ──────────────────────────────────────────────────────────────
function loadLocal<T>(file: string): T {
  return JSON.parse(readFileSync(path.join(dataDir, file), "utf-8")) as T;
}

export function getGuru(): Teacher[] { return loadLocal("guru.json"); }
export function getVisiMisi(): VisiMisi { return loadLocal("visi-misi.json"); }
export function getJurusan(): JurusanData { return loadLocal("jurusan.json"); }
export function getPrestasi(): Prestasi { return loadLocal("prestasi.json"); }
export function getFasilitas(): FasilitasItem[] { return loadLocal("fasilitas.json"); }
export function getBeranda(): Beranda { return loadLocal("beranda.json"); }
export function getEkskul(): EkskulItem[] { return loadLocal("ekskul.json"); }
