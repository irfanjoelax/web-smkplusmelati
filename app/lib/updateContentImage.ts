export type UpdateContentImageResult =
  | { ok: true; data: unknown; previousImage: string }
  | { ok: false; reason: "invalid-section" | "invalid-target" | "not-found" };

export function clearContentImage(
  data: unknown,
  section: string | null,
  target: unknown,
): UpdateContentImageResult {
  let list: unknown = data;

  if (section) {
    for (const key of section.split(".")) {
      if (
        list === null ||
        typeof list !== "object" ||
        !Object.prototype.hasOwnProperty.call(list, key)
      ) {
        return { ok: false, reason: "invalid-section" };
      }
      list = (list as Record<string, unknown>)[key];
    }
  }

  if (!Array.isArray(list)) return { ok: false, reason: "invalid-section" };
  if (!target || typeof target !== "object") {
    return { ok: false, reason: "invalid-target" };
  }

  const serializedTarget = JSON.stringify(target);
  const matches = list
    .map((item, index) => JSON.stringify(item) === serializedTarget ? index : -1)
    .filter((index) => index !== -1);
  if (matches.length !== 1) return { ok: false, reason: "not-found" };

  const index = matches[0];
  const item = list[index];
  if (!item || typeof item !== "object") {
    return { ok: false, reason: "invalid-target" };
  }

  const previousImage = (item as Record<string, unknown>).image;
  if (typeof previousImage !== "string") {
    return { ok: false, reason: "invalid-target" };
  }

  list[index] = { ...item, image: "" };
  return { ok: true, data, previousImage };
}
