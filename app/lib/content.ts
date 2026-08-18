import { readFileSync, renameSync, writeFileSync } from "fs";
import path from "path";
import type {
  Beranda,
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
  | "beranda";

function load<T>(file: string): T {
  return JSON.parse(readFileSync(path.join(dataDir, file), "utf-8")) as T;
}

export function getGuru(): Teacher[] {
  return load<Teacher[]>("guru.json");
}

export function getVisiMisi(): VisiMisi {
  return load<VisiMisi>("visi-misi.json");
}

export function getJurusan(): JurusanData {
  return load<JurusanData>("jurusan.json");
}

export function getPrestasi(): Prestasi {
  return load<Prestasi>("prestasi.json");
}

export function getFasilitas(): FasilitasItem[] {
  return load<FasilitasItem[]>("fasilitas.json");
}

export function getBeranda(): Beranda {
  return load<Beranda>("beranda.json");
}

export const COLLECTION_FILES: Record<ContentKey, string> = {
  guru: "guru.json",
  visiMisi: "visi-misi.json",
  jurusan: "jurusan.json",
  prestasi: "prestasi.json",
  fasilitas: "fasilitas.json",
  beranda: "beranda.json",
};

export function saveContent(key: ContentKey, data: unknown): void {
  const file = COLLECTION_FILES[key];
  const target = path.join(dataDir, file);
  const tmp = `${target}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
  renameSync(tmp, target);
}
