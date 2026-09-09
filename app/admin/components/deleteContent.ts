import type { ContentSaveKey } from "./useManualSave";

const persistedSnapshot = Symbol("persistedSnapshot");
const persistedArray = Symbol("persistedArray");

function snapshot(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value));
}

export function markPersistedContent(value: unknown): void {
  if (Array.isArray(value)) {
    (value as unknown as { [persistedArray]: unknown[] })[persistedArray] = value.map(snapshot);
    value.forEach(markPersistedContent);
  } else if (value !== null && typeof value === "object") {
    (value as { [persistedSnapshot]?: unknown })[persistedSnapshot] = snapshot(value);
    Object.values(value).forEach(markPersistedContent);
  }
}

export function tagPersistedItems<T extends object>(items: T[]): T[] {
  const tagged = items.map((item) => ({
    ...item,
    [persistedSnapshot]: snapshot(item),
  }));
  markPersistedContent(tagged);
  return tagged;
}

export function getPersistedSnapshot(item: object): unknown {
  return (item as { [persistedSnapshot]?: unknown })[persistedSnapshot];
}

export function getPersistedArrayItem(value: unknown[], index: number): unknown {
  return (value as { [persistedArray]?: unknown[] })[persistedArray]?.[index];
}

export async function deletePersistedItem(
  collection: ContentSaveKey,
  section: string | null,
  target: unknown,
  fallback?: unknown,
): Promise<void> {
  const response = await fetch(`/api/content/${collection}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section, target, fallback }),
  });

  if (!response.ok) {
    const json = await response.json().catch(() => null);
    throw new Error(json?.error ?? `Gagal menghapus (${response.status})`);
  }
}

export async function deleteEditorItem<T extends object>(
  collection: ContentSaveKey,
  section: string | null,
  item: T,
  onDeleted: () => void,
): Promise<void> {
  const snapshot = getPersistedSnapshot(item);
  if (snapshot !== undefined) {
    await deletePersistedItem(collection, section, snapshot, item);
  }
  onDeleted();
}
