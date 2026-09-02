"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  BookIcon,
  BuildingIcon,
  DashboardIcon,
  EyeIcon,
  HomeIcon,
  StarIcon,
  TrophyIcon,
  UsersIcon,
} from "@/app/admin/components/icons";
import {
  ContentChart,
  CountUp,
  type ChartDatum,
} from "@/app/admin/components/ContentChart";
import { Chip } from "@/app/admin/components/ui";

type Props = {
  guru: number;
  misi: number;
  skills: number;
  prestasi: number;
  fasilitas: number;
  ekskul: number;
  stats: number;
  total: number;
};

const SECTIONS = [
  { href: "/admin/guru", title: "Daftar Guru", desc: "Nama, jabatan, dan foto guru.", icon: UsersIcon },
  { href: "/admin/visi-misi", title: "Visi & Misi", desc: "Teks visi dan daftar misi.", icon: EyeIcon },
  { href: "/admin/jurusan", title: "Jurusan", desc: "Skill, keunggulan, dan prospek TKJ & Tata Boga.", icon: BookIcon },
  { href: "/admin/prestasi", title: "Prestasi Siswa", desc: "Kartu prestasi dan kutipan.", icon: TrophyIcon },
  { href: "/admin/fasilitas", title: "Fasilitas", desc: "Kartu sarana dan prasarana.", icon: BuildingIcon },
  { href: "/admin/ekskul", title: "Ekskul", desc: "Kartu ekstrakurikuler.", icon: StarIcon },
  { href: "/admin/beranda", title: "Beranda", desc: "Statistik, jurusan, program, ekskul, dan fasilitas.", icon: HomeIcon },
];

const CHART_LINKS: Record<string, string> = {
  Guru: "/admin/guru",
  "Jurusan": "/admin/jurusan",
  Prestasi: "/admin/prestasi",
  Fasilitas: "/admin/fasilitas",
  Ekskul: "/admin/ekskul",
};

function FadeUp({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setOn(true), reduce ? 0 : delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(14px)",
        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}

export default function DashboardView({
  guru,
  misi,
  skills,
  prestasi,
  fasilitas,
  ekskul,
  stats,
  total,
}: Props) {
  const router = useRouter();
  const handleTotalClick = () => {
    router.push('/admin?refresh=true');
    setTimeout(() => {
      document.getElementById('chart')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };
  const [date, setDate] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setDate(
        new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      );
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const counts: Record<string, number> = {
    "Daftar Guru": guru,
    "Visi & Misi": misi,
    Jurusan: skills,
    "Prestasi Siswa": prestasi,
    Fasilitas: fasilitas,
    Ekskul: ekskul,
    Beranda: stats,
  };

  const chartData: ChartDatum[] = [
    { label: "Guru", count: guru, color: "#f59e0b" },
    { label: "Jurusan", count: skills, color: "#06b6d4" },
    { label: "Prestasi", count: prestasi, color: "#f43f5e" },
    { label: "Fasilitas", count: fasilitas, color: "#10b981" },
    { label: "Ekskul", count: ekskul, color: "#6366f1" },
  ];

  const quick = [
    {
      label: "Total Konten",
      value: total,
      onClick: handleTotalClick,
      icon: DashboardIcon,
      card: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBox: "bg-white/70 text-blue-600 shadow-sm",
      shadow: "hover:shadow-md hover:shadow-blue-200/60",
    },
    {
      label: "Guru",
      value: guru,
      href: "/admin/guru",
      icon: UsersIcon,
      card: "bg-gradient-to-br from-amber-50 to-amber-100",
      iconBox: "bg-white/70 text-amber-600 shadow-sm",
      shadow: "hover:shadow-md hover:shadow-amber-200/60",
    },
    {
      label: "Prestasi",
      value: prestasi,
      href: "/admin/prestasi",
      icon: TrophyIcon,
      card: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconBox: "bg-white/70 text-emerald-600 shadow-sm",
      shadow: "hover:shadow-md hover:shadow-emerald-200/60",
    },
    {
      label: "Fasilitas",
      value: fasilitas,
      href: "/admin/fasilitas",
      icon: BuildingIcon,
      card: "bg-gradient-to-br from-violet-50 to-violet-100",
      iconBox: "bg-white/70 text-violet-600 shadow-sm",
      shadow: "hover:shadow-md hover:shadow-violet-200/60",
    },
  ];

  const handleSelect = (label: string) => {
    const href = CHART_LINKS[label];
    if (href) router.push(href);
  };

  return (
    <div className="space-y-6">
      <FadeUp>
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0e5f9c] via-[#0b5c97] to-[#083f68] p-6 text-white shadow-lg shadow-blue-900/20 sm:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-amber-400" />
          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-125" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
              <p className="mt-1 max-w-md text-sm text-white/70">
                Kelola konten situs SMK Plus Melati. Perubahan tersimpan otomatis
                dan langsung tampil di situs publik.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">

              <span className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80">
                {date || "—"}
              </span>
            </div>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={80}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quick.map((q) => {
            if (q.onClick) {
              return (
                <div
                  key={q.label}
                  onClick={q.onClick}
                  className={`group rounded-xl border border-slate-200/70 p-5 text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-1 ${q.card} ${q.shadow} cursor-pointer`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${q.iconBox}`}>
                      <q.icon className="h-5 w-5" />
                    </div>
                    <span className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500">
                      →
                    </span>
                  </div>
                  <CountUp
                    value={q.value}
                    className="mt-4 block text-3xl font-extrabold tracking-tight text-slate-900"
                  />
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                    {q.label}
                  </p>
                </div>
              );
            } else {
              return (
                <Link
                  key={q.label}
                  href={q.href}
                  className={`group rounded-xl border border-slate-200/70 p-5 text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-1 ${q.card} ${q.shadow}`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${q.iconBox}`}>
                      <q.icon className="h-5 w-5" />
                    </div>
                    <span className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500">
                      →
                    </span>
                  </div>
                  <CountUp
                    value={q.value}
                    className="mt-4 block text-3xl font-extrabold tracking-tight text-slate-900"
                  />
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                    {q.label}
                  </p>
                </Link>
              );
            }
          })}
        </div>
      </FadeUp>

      <FadeUp delay={160}>
        <div id="chart"><ContentChart data={chartData} onSelect={handleSelect} /></div>
      </FadeUp>

      <FadeUp delay={240}>
        <div>
          <h2 className="mb-3 text-xs font-extrabold uppercase tracking-widest text-slate-500">
            Kelola Konten
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-600/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-gradient-to-b group-hover:from-[#0e5f9c] group-hover:to-[#083f68] group-hover:text-white">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900">{s.title}</h3>
                      <p className="mt-0.5 text-sm text-slate-500">{s.desc}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <Chip tone="blue" className="transition group-hover:bg-amber-50 group-hover:text-amber-700">
                      {counts[s.title] ?? "—"}
                    </Chip>
                    <span className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}