import Link from "next/link";
import {
  getBeranda,
  getFasilitas,
  getGuru,
  getJurusan,
  getPrestasi,
  getVisiMisi,
} from "@/app/lib/content";
import {
  BookIcon,
  BuildingIcon,
  EyeIcon,
  HomeIcon,
  ImageIcon,
  TrophyIcon,
  UsersIcon,
} from "@/app/admin/components/icons";
import { Chip, PageHeader, StatCard } from "@/app/admin/components/ui";

const sections = [
  { href: "/admin/guru", title: "Daftar Guru", desc: "Nama, jabatan, dan foto guru.", icon: UsersIcon },
  { href: "/admin/visi-misi", title: "Visi & Misi", desc: "Teks visi dan daftar misi.", icon: EyeIcon },
  { href: "/admin/jurusan", title: "Jurusan", desc: "Skill, keunggulan, dan prospek TKJ & Tata Boga.", icon: BookIcon },
  { href: "/admin/prestasi", title: "Prestasi Siswa", desc: "Kartu prestasi dan kutipan.", icon: TrophyIcon },
  { href: "/admin/fasilitas", title: "Fasilitas", desc: "Kartu sarana dan prasarana.", icon: BuildingIcon },
  { href: "/admin/beranda", title: "Beranda", desc: "Statistik, jurusan, program, ekskul, dan fasilitas.", icon: HomeIcon },
  { href: "/admin/media", title: "Media", desc: "Kelola gambar yang diunggah.", icon: ImageIcon },
];

export default function DashboardPage() {
  const guru = getGuru().length;
  const fasilitas = getFasilitas().length;
  const misi = getVisiMisi().misi.length;
  const stats = getBeranda().stats.length;
  const prestasi = getPrestasi().items.length;
  const jurusan = getJurusan();

  const statCards = [
    { label: "Guru", value: guru, icon: <UsersIcon className="h-5 w-5" />, tone: "blue" as const },
    { label: "Butir Misi", value: misi, icon: <EyeIcon className="h-5 w-5" />, tone: "violet" as const },
    { label: "Skill Jurusan", value: jurusan.tkj.skills.length + jurusan.tataBoga.skills.length, icon: <BookIcon className="h-5 w-5" />, tone: "cyan" as const },
    { label: "Prestasi", value: prestasi, icon: <TrophyIcon className="h-5 w-5" />, tone: "gold" as const },
    { label: "Fasilitas", value: fasilitas, icon: <BuildingIcon className="h-5 w-5" />, tone: "emerald" as const },
    { label: "Statistik Beranda", value: stats, icon: <HomeIcon className="h-5 w-5" />, tone: "rose" as const },
  ];

  const counts: Record<string, number> = {
    "Daftar Guru": guru,
    "Visi & Misi": misi,
    Jurusan: jurusan.tkj.skills.length + jurusan.tataBoga.skills.length,
    "Prestasi Siswa": prestasi,
    Fasilitas: fasilitas,
    Beranda: stats,
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Kelola konten situs SMK Plus Melati. Perubahan tersimpan otomatis."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((s) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} tone={s.tone} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-xs font-extrabold uppercase tracking-widest text-slate-500">
          Kelola Konten
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900">{s.title}</h3>
                    <p className="mt-0.5 text-sm text-slate-500">{s.desc}</p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <Chip tone="blue">{counts[s.title] ?? "—"}</Chip>
                  <span className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}