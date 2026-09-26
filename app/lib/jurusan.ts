import { getContent } from "./content";
import type { JurusanCard, JurusanData, PracticeActivity } from "./types";

const TJKT_WHY =
  "Jurusan Teknik Jaringan Komputer & Telekomunikasi (TJKT) mempersiapkan siswa untuk memahami dan menguasai infrastruktur serta sistem jaringan komputer. Di SMK Plus Melati, siswa TJKT dilatih dengan 60% praktik sehingga lulusannya siap bekerja di dunia industri maupun berwirausaha di bidang teknologi informasi.";
const KULINER_WHY =
  "Semua orang bisa memasak, namun tidak semua orang tahu seni memasak. Di SMK Plus Melati, siswa Kuliner belajar bagaimana proses pembuatan makanan yang bisa dinilai harga jualnya, hingga teknik akhir penyediaan makanan yang menarik. Ruang khusus disediakan untuk siswa bereksperimen membuat makanan.";

type LegacyJurusan = {
  tkj?: { skills?: string[]; sertifikasi?: JurusanCard; prospek?: JurusanCard };
  tataBoga?: { skills?: string[]; keunggulan?: JurusanCard; prospek?: JurusanCard };
};

export function normalizeJurusanData(data: unknown): JurusanData {
  if (Array.isArray(data)) {
    return data.map((item) => {
      const entry = item && typeof item === "object" ? item : {};
      return {
        ...entry,
        image: "image" in entry && typeof entry.image === "string" ? entry.image : "",
        practiceImages:
          "practiceImages" in entry && Array.isArray(entry.practiceImages)
            ? (entry.practiceImages as unknown[]).flatMap((activity, index) => {
                if (typeof activity === "string") {
                  return [{ image: activity, title: `Kegiatan Praktik ${index + 1}` }];
                }
                if (!activity || typeof activity !== "object") return [];
                const value = activity as Record<string, unknown>;
                return typeof value.image === "string"
                  ? [{
                      image: value.image,
                      title: typeof value.title === "string" && value.title.trim()
                        ? value.title
                        : `Kegiatan Praktik ${index + 1}`,
                    }]
                  : [];
              })
            : [],
      } as JurusanData[number];
    });
  }

  const legacy = (data ?? {}) as LegacyJurusan;
  if (!legacy.tkj || !legacy.tataBoga) return [];

  return [
    {
      id: "tjkt",
      name: "TJKT",
      fullName: "Teknik Jaringan Komputer & Telekomunikasi (TJKT)",
      image: "",
      description:
        "Jurusan yang membekali siswa keterampilan jaringan komputer, administrasi sistem, dan teknologi informasi yang dibutuhkan industri.",
      whyTitle: "Mengapa Memilih TJKT?",
      whyText: TJKT_WHY,
      skills: legacy.tkj.skills ?? [],
      practiceImages: [],
      card1: legacy.tkj.sertifikasi ?? { chip: "Keunggulan", title: "", description: "" },
      card2: legacy.tkj.prospek ?? { chip: "Prospek", title: "", description: "" },
    },
    {
      id: "kuliner",
      name: "Kuliner",
      fullName: "Kuliner",
      image: "",
      description:
        "Jurusan yang mengasah seni memasak, teknik penyajian, dan jiwa wirausaha di bidang kuliner.",
      whyTitle: "Mengapa Memilih Kuliner?",
      whyText: KULINER_WHY,
      skills: legacy.tataBoga.skills ?? [],
      practiceImages: [],
      card1: legacy.tataBoga.keunggulan ?? { chip: "Keunggulan", title: "", description: "" },
      card2: legacy.tataBoga.prospek ?? { chip: "Prospek", title: "", description: "" },
    },
  ];
}

export async function getJurusanData(): Promise<JurusanData> {
  return normalizeJurusanData(await getContent<unknown>("jurusan"));
}

function isCard(value: unknown): value is JurusanCard {
  if (!value || typeof value !== "object") return false;
  const card = value as Record<string, unknown>;
  return [card.chip, card.title, card.description].every((field) => typeof field === "string");
}

function isPracticeActivity(value: unknown): value is PracticeActivity {
  if (!value || typeof value !== "object") return false;
  const activity = value as Record<string, unknown>;
  return typeof activity.image === "string" &&
    typeof activity.title === "string" &&
    activity.title.trim().length > 0;
}

export function isJurusanData(value: unknown): value is JurusanData {
  if (!Array.isArray(value) || value.length === 0) return false;
  const ids = new Set<string>();

  return value.every((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const item = entry as Record<string, unknown>;
    if (
      typeof item.id !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) ||
      ids.has(item.id) ||
      typeof item.image !== "string" ||
      ![item.name, item.fullName, item.description, item.whyTitle, item.whyText].every(
        (field) => typeof field === "string" && field.trim().length > 0,
      ) ||
      !Array.isArray(item.skills) ||
      !item.skills.every((skill) => typeof skill === "string") ||
      ("practiceImages" in item &&
        (!Array.isArray(item.practiceImages) ||
          !item.practiceImages.every(isPracticeActivity))) ||
      !isCard(item.card1) ||
      !isCard(item.card2)
    ) {
      return false;
    }
    ids.add(item.id);
    return true;
  });
}
