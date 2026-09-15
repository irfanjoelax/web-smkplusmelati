import type { Beranda } from "./types";

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim().toLocaleLowerCase("id-ID") : "";
}

function matchesPreview(
  preview: { name: string; image: string },
  target: unknown,
): boolean {
  if (!target || typeof target !== "object") return false;
  const item = target as Record<string, unknown>;
  const targetImage = normalize(item.image);
  const targetName = normalize(item.title);

  return Boolean(
    (targetImage && normalize(preview.image) === targetImage) ||
    (targetName && normalize(preview.name) === targetName),
  );
}

export function removeBerandaPreview(
  data: Beranda,
  collection: "ekskul" | "fasilitas",
  target: unknown,
): { data: Beranda; changed: boolean } {
  if (collection === "ekskul") {
    const ekskulPreview = data.ekskulPreview.filter(
      (item) => !matchesPreview(item, target),
    );
    return {
      data: { ...data, ekskulPreview },
      changed: ekskulPreview.length !== data.ekskulPreview.length,
    };
  }

  const facilities = data.facilities.filter(
    (item) => !matchesPreview(item, target),
  );
  return {
    data: { ...data, facilities },
    changed: facilities.length !== data.facilities.length,
  };
}
