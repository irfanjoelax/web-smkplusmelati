import type { AlumniItem } from "./types";

const STATUSES = new Set(["Bekerja", "Kuliah", "Wirausaha"]);

function isText(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

export function isAlumniData(value: unknown): value is AlumniItem[] {
  return Array.isArray(value) && value.every((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const item = entry as Record<string, unknown>;

    return isText(item.name, 100) &&
      Number.isInteger(item.graduationYear) &&
      (item.graduationYear as number) >= 1950 &&
      (item.graduationYear as number) <= 2100 &&
      isText(item.major, 100) &&
      typeof item.status === "string" &&
      STATUSES.has(item.status) &&
      isText(item.testimonial, 500) &&
      isText(item.image, 500);
  });
}
