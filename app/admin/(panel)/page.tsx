import {
  getBeranda,
  getEkskul,
  getFasilitas,
  getGuru,
  getJurusan,
  getPrestasi,
  getVisiMisi,
} from "@/app/lib/content";
import DashboardView from "./dashboard-view";

export default function DashboardPage() {
  const guru = getGuru().length;
  const fasilitas = getFasilitas().length;
  const misi = getVisiMisi().misi.length;
  const stats = getBeranda().stats.length;
  const prestasi = getPrestasi().items.length;
  const ekskul = getEkskul().length;
  const jurusan = getJurusan();
  const skills = Object.keys(jurusan).length;
  const total = guru + fasilitas + misi + stats + prestasi + ekskul + skills;

  return (
    <DashboardView
      guru={guru}
      misi={misi}
      skills={skills}
      prestasi={prestasi}
      fasilitas={fasilitas}
      ekskul={ekskul}
      stats={stats}
      total={total}
    />
  );
}