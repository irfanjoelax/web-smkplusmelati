export type DeleteResult =
  | { ok: true; data: unknown }
  | { ok: false; reason: "invalid-section" | "not-found" };

export function deleteContentItem(
  data: unknown,
  section: string | null,
  target: unknown,
): DeleteResult {
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

  if (!Array.isArray(list)) {
    return { ok: false, reason: "invalid-section" };
  }

  const serializedTarget = JSON.stringify(target);
  const index = list.findIndex((item) => JSON.stringify(item) === serializedTarget);
  if (index === -1) {
    return { ok: false, reason: "not-found" };
  }

  list.splice(index, 1);
  return { ok: true, data };
}
