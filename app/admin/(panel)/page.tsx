import {
  getActivityLog,
  getContent,
} from "@/app/lib/content";
import type { ActivityLogEntry, Beranda, BeritaItem, EkskulItem, FasilitasItem, IncompleteContentItem, JurusanData, Prestasi, Teacher, VisiMisi } from "@/app/lib/types";
import DashboardView from "./dashboard-view";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [guruData, fasilitasData, visiMisiData, berandaData, prestasiData, ekskulData, jurusanData, beritaData, activityLog] =
    await Promise.all([
      getContent<Teacher[]>("guru"),
      getContent<FasilitasItem[]>("fasilitas"),
      getContent<VisiMisi>("visiMisi"),
      getContent<Beranda>("beranda"),
      getContent<Prestasi>("prestasi"),
      getContent<EkskulItem[]>("ekskul"),
      getContent<JurusanData>("jurusan"),
      getContent<BeritaItem[]>("berita"),
      getActivityLog<ActivityLogEntry[]>(),
    ]);

  const guru = guruData.length;
  const fasilitas = fasilitasData.length;
  const misi = visiMisiData.misi.length;
  const stats = berandaData.stats.length;
  const prestasi = prestasiData.items.length;
  const ekskul = ekskulData.length;
  const skills = Object.keys(jurusanData).length;
  const berita = beritaData.length;
  const latestBerita = [...beritaData]
    .sort((a, b) => {
      const bTime = Date.parse(b.updatedAt ?? b.createdAt ?? "") || 0;
      const aTime = Date.parse(a.updatedAt ?? a.createdAt ?? "") || 0;
      return bTime - aTime;
    })
    .slice(0, 3);
  const incompleteContent: IncompleteContentItem[] = [];
  const addIncomplete = (title: string, fields: string[], href: string) => {
    if (fields.length) {
      incompleteContent.push({ title, issue: `Belum ada ${fields.join(" dan ")}`, href });
    }
  };

  fasilitasData.forEach((item) => addIncomplete(
    item.title || "Fasilitas tanpa nama",
    [!item.description.trim() && "deskripsi", !item.image.trim() && "foto"].filter(Boolean) as string[],
    "/admin/fasilitas",
  ));
  ekskulData.forEach((item) => addIncomplete(
    item.title || "Ekskul tanpa nama",
    [!item.desc.trim() && "deskripsi", !item.image.trim() && "foto"].filter(Boolean) as string[],
    "/admin/ekskul",
  ));
  guruData.forEach((item) => addIncomplete(
    item.name || "Guru tanpa nama",
    [!item.role.trim() && "jabatan", !item.image.trim() && "foto"].filter(Boolean) as string[],
    "/admin/guru",
  ));
  beritaData.forEach((item) => addIncomplete(
    item.title || "Berita tanpa judul",
    [!item.desc.trim() && "ringkasan", !item.content.trim() && "isi berita", !item.image.trim() && "gambar"].filter(Boolean) as string[],
    "/admin/berita",
  ));
  prestasiData.items.forEach((item) => addIncomplete(
    item.title || "Prestasi tanpa judul",
    [!item.description.trim() && "deskripsi", !item.image.trim() && "foto"].filter(Boolean) as string[],
    "/admin/prestasi",
  ));
  return (
    <DashboardView
      guru={guru}
      misi={misi}
      skills={skills}
      prestasi={prestasi}
      fasilitas={fasilitas}
      ekskul={ekskul}
      stats={stats}
      berita={berita}
      latestBerita={latestBerita}
      incompleteContent={incompleteContent}
      activityLog={activityLog}
    />
  );
}
