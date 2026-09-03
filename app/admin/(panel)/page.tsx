import {
  getContent,
  type ContentKey,
} from "@/app/lib/content";
import type { Beranda, EkskulItem, FasilitasItem, JurusanData, Prestasi, Teacher, VisiMisi } from "@/app/lib/types";
import DashboardView from "./dashboard-view";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [guruData, fasilitasData, visiMisiData, berandaData, prestasiData, ekskulData, jurusanData] =
    await Promise.all([
      getContent<Teacher[]>("guru"),
      getContent<FasilitasItem[]>("fasilitas"),
      getContent<VisiMisi>("visiMisi"),
      getContent<Beranda>("beranda"),
      getContent<Prestasi>("prestasi"),
      getContent<EkskulItem[]>("ekskul"),
      getContent<JurusanData>("jurusan"),
    ]);

  const guru = guruData.length;
  const fasilitas = fasilitasData.length;
  const misi = visiMisiData.misi.length;
  const stats = berandaData.stats.length;
  const prestasi = prestasiData.items.length;
  const ekskul = ekskulData.length;
  const skills = Object.keys(jurusanData).length;
  return (
    <DashboardView
      guru={guru}
      misi={misi}
      skills={skills}
      prestasi={prestasi}
      fasilitas={fasilitas}
      ekskul={ekskul}
      stats={stats}
    />
  );
}
