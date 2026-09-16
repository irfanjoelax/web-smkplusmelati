import { del } from "@vercel/blob";
import { existsSync, unlinkSync } from "fs";
import path from "path";
import { getContent, type ContentKey } from "./content";

const CONTENT_KEYS: ContentKey[] = [
  "guru",
  "visiMisi",
  "jurusan",
  "prestasi",
  "fasilitas",
  "beranda",
  "ekskul",
  "berita",
];

function containsValue(value: unknown, target: string): boolean {
  if (value === target) return true;
  if (Array.isArray(value)) return value.some((item) => containsValue(item, target));
  if (value && typeof value === "object") {
    return Object.values(value).some((item) => containsValue(item, target));
  }
  return false;
}

function isManagedBlobUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname.endsWith(".public.blob.vercel-storage.com") &&
      url.pathname.startsWith("/uploads/");
  } catch {
    return false;
  }
}

export async function deleteUploadIfUnused(url: string): Promise<boolean> {
  const isLocalUpload = /^\/uploads\/[^/]+$/.test(url);
  if (!isLocalUpload && !isManagedBlobUrl(url)) return false;

  const collections = await Promise.all(CONTENT_KEYS.map((key) => getContent(key)));
  if (collections.some((content) => containsValue(content, url))) return false;

  if (isManagedBlobUrl(url)) {
    await del(url);
    return true;
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const file = path.join(uploadsDir, path.basename(url));
  if (existsSync(file)) unlinkSync(file);
  return true;
}
