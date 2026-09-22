import { randomUUID } from "crypto";
import type { ContentKey } from "./content";
import { getActivityLog, saveActivityLog } from "./content";
import type { ActivityLogEntry } from "./types";

const COLLECTION_LABELS: Record<ContentKey, string> = {
  alumni: "alumni",
  guru: "guru",
  visiMisi: "visi dan misi",
  jurusan: "jurusan",
  prestasi: "prestasi",
  fasilitas: "fasilitas",
  beranda: "beranda",
  ekskul: "ekskul",
  berita: "berita",
  program: "program",
  profil: "profil",
  testimoniOrtu: "testimoni orang tua",
};

function itemLabel(value: unknown): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  const item = value as Record<string, unknown>;
  for (const key of ["title", "name", "label", "chip"]) {
    if (typeof item[key] === "string" && item[key].trim()) return item[key].trim();
  }
}

function describe(label: string, item?: unknown): string {
  const name = itemLabel(item);
  return name ? `${label} "${name}"` : label;
}

export function describeContentChange(
  key: ContentKey,
  before: unknown,
  after: unknown,
): Pick<ActivityLogEntry, "action" | "collection" | "label"> | null {
  if (JSON.stringify(before) === JSON.stringify(after)) return null;

  const collection = COLLECTION_LABELS[key];
  if (Array.isArray(before) && Array.isArray(after)) {
    if (after.length > before.length) {
      const added = after.find((item) => !before.some((old) => JSON.stringify(old) === JSON.stringify(item)));
      return { action: "add", collection: key, label: `Tambah ${describe(collection, added)}` };
    }
    if (after.length < before.length) {
      const removed = before.find((item) => !after.some((next) => JSON.stringify(next) === JSON.stringify(item)));
      return { action: "delete", collection: key, label: `Hapus ${describe(collection, removed)}` };
    }

    const changedIndex = after.findIndex((item, index) => JSON.stringify(item) !== JSON.stringify(before[index]));
    return { action: "edit", collection: key, label: `Edit ${describe(collection, after[changedIndex])}` };
  }

  return { action: "edit", collection: key, label: `Edit ${collection}` };
}

export function describeDeletedContent(
  key: ContentKey,
  target: unknown,
): Pick<ActivityLogEntry, "action" | "collection" | "label"> {
  const collection = COLLECTION_LABELS[key];
  return { action: "delete", collection: key, label: `Hapus ${describe(collection, target)}` };
}

export async function logActivity(
  activity: Pick<ActivityLogEntry, "action" | "collection" | "label">,
): Promise<void> {
  const entries = await getActivityLog<ActivityLogEntry[]>();
  entries.unshift({
    ...activity,
    id: randomUUID(),
    timestamp: new Date().toISOString(),
  });
  await saveActivityLog(entries.slice(0, 5));
}
