import { getContent } from "./content";
import type { IconKey, ProgramCard, ProgramData } from "./types";

type LegacyProgram = {
  pelatihan?: { cards?: ProgramCard[]; harapan?: string[] };
  keagamaan?: { cards?: ProgramCard[]; perayaanText?: string };
  asrama?: { cards?: ProgramCard[]; jadwal?: string[] };
};

const ICONS: IconKey[] = ["network", "chef", "training", "dormitory", "religion", "award"];

export function normalizeProgramData(data: unknown): ProgramData {
  if (Array.isArray(data)) return data as ProgramData;
  const legacy = (data ?? {}) as LegacyProgram;
  if (!legacy.pelatihan || !legacy.keagamaan || !legacy.asrama) return [];

  return [
    {
      id: "pelatihan",
      title: "Program Pelatihan",
      summary: "Pembuatan aplikasi Android dan pencetak wirausaha dengan praktik langsung.",
      description: "Membekali siswa keterampilan praktis yang bisa menjadi keahlian khusus dan bernilai jual tinggi.",
      icon: "training",
      cards: legacy.pelatihan.cards ?? [],
      section: {
        type: "list",
        title: "Kegiatan",
        items: legacy.pelatihan.harapan ?? [],
      },
    },
    {
      id: "asrama",
      title: "Program Asrama",
      summary: "Kedisiplinan, kebersamaan, dan pembinaan karakter melalui kehidupan asrama.",
      description: "Membentuk kedisiplinan dan kemandirian siswa melalui kegiatan yang terjadwal setiap hari.",
      icon: "dormitory",
      cards: legacy.asrama.cards ?? [],
      section: {
        type: "list",
        title: "Kegiatan",
        items: legacy.asrama.jadwal ?? [],
      },
    },
    {
      id: "keagamaan",
      title: "Program Keagamaan",
      summary: "Sholat dhuha, mengaji pagi, khataman Al-Qur'an, dan perayaan hari besar.",
      description: "Menanamkan keimanan dan ketaqwaan melalui pengalaman ajaran agama dalam keseharian siswa.",
      icon: "religion",
      cards: legacy.keagamaan.cards ?? [],
      section: {
        type: "list",
        title: "Kegiatan",
        items: legacy.keagamaan.perayaanText ? [legacy.keagamaan.perayaanText] : [],
      },
    },
  ];
}

export async function getProgramData(): Promise<ProgramData> {
  return normalizeProgramData(await getContent<unknown>("program"));
}

export function isProgramData(value: unknown): value is ProgramData {
  if (!Array.isArray(value) || value.length === 0) return false;
  const ids = new Set<string>();
  return value.every((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const item = entry as Record<string, unknown>;
    const section = item.section as Record<string, unknown> | undefined;
    const sectionValid = section === undefined || (
      typeof section === "object" &&
      typeof section.title === "string" &&
      section.type === "list" && Array.isArray(section.items) && section.items.every((value) => typeof value === "string")
    );
    if (
      typeof item.id !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) ||
      ids.has(item.id) ||
      ![item.title, item.summary, item.description].every(
        (field) => typeof field === "string" && field.trim().length > 0,
      ) ||
      !ICONS.includes(item.icon as IconKey) ||
      !Array.isArray(item.cards) ||
      !item.cards.every((card) => {
        if (!card || typeof card !== "object") return false;
        const value = card as Record<string, unknown>;
        return [value.title, value.description, value.image].every((field) => typeof field === "string");
      }) ||
      !sectionValid
    ) return false;
    ids.add(item.id);
    return true;
  });
}
