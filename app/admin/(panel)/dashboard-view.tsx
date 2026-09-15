"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  BookIcon,
  BuildingIcon,
  TrophyIcon,
  UsersIcon,
} from "@/app/admin/components/icons";
import {
  ContentChart,
  CountUp,
  type ChartDatum,
} from "@/app/admin/components/ContentChart";
import type { ActivityLogEntry, BeritaItem, IncompleteContentItem } from "@/app/lib/types";

type Props = {
  guru: number;
  misi: number;
  skills: number;
  prestasi: number;
  fasilitas: number;
  ekskul: number;
  stats: number;
  berita: number;
  latestBerita: BeritaItem[];
  incompleteContent: IncompleteContentItem[];
  activityLog: ActivityLogEntry[];
};

const ITEMS_PER_PAGE = 5;

const ACTIVITY_LINKS: Record<string, string> = {
  guru: "/admin/guru",
  visiMisi: "/admin/visi-misi",
  jurusan: "/admin/jurusan",
  prestasi: "/admin/prestasi",
  fasilitas: "/admin/fasilitas",
  beranda: "/admin/beranda",
  ekskul: "/admin/ekskul",
  berita: "/admin/berita",
};

function relativeTime(timestamp: string, now: number): string {
  const seconds = Math.max(0, Math.floor((now - Date.parse(timestamp)) / 1000));
  if (seconds < 60) return "Baru saja";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  if (hours < 48) return "Kemarin";
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari lalu`;
  if (days < 30) return `${Math.floor(days / 7)} minggu lalu`;
  if (days < 365) return `${Math.floor(days / 30)} bulan lalu`;
  return `${Math.floor(days / 365)} tahun lalu`;
}

function activityLabel(item: BeritaItem): string {
  const value = item.updatedAt ?? item.createdAt;
  if (!value) return "Waktu aktivitas belum tercatat";

  const formatted = new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${item.updatedAt ? "Diedit" : "Ditambahkan"} ${formatted}`;
}

const CHART_LINKS: Record<string, string> = {
  Guru: "/admin/guru",
  "Jurusan": "/admin/jurusan",
  Prestasi: "/admin/prestasi",
  Fasilitas: "/admin/fasilitas",
  Ekskul: "/admin/ekskul",
  Berita: "/admin/berita",
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
  skills,
  prestasi,
  fasilitas,
  ekskul,
  berita,
  latestBerita,
  incompleteContent,
  activityLog,
}: Props) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [now, setNow] = useState(0);
  const [incompletePage, setIncompletePage] = useState(1);

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

  useEffect(() => {
    const initial = setTimeout(() => setNow(Date.now()), 0);
    const interval = setInterval(() => setNow(Date.now()), 60_000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  const chartTheme = "#0e5f9c";
  const chartData: ChartDatum[] = [
    { label: "Guru", count: guru, color: chartTheme },
    { label: "Jurusan", count: skills, color: chartTheme },
    { label: "Prestasi", count: prestasi, color: chartTheme },
    { label: "Fasilitas", count: fasilitas, color: chartTheme },
    { label: "Ekskul", count: ekskul, color: chartTheme },
    { label: "Berita", count: berita, color: chartTheme },
  ];
  const quick = [
    {
      label: "Guru",
      value: guru,
      href: "/admin/guru",
      icon: UsersIcon,
      card: "bg-gradient-to-br from-[#0e5f9c] via-[#0b5c97] to-[#083f68]",
      iconBox: "border border-white/20 bg-white/10 text-white shadow-sm",
      shadow: "shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30",
    },
    {
      label: "Jurusan",
      value: skills,
      href: "/admin/jurusan",
      icon: BookIcon,
      card: "bg-gradient-to-br from-[#0e5f9c] via-[#0b5c97] to-[#083f68]",
      iconBox: "border border-white/20 bg-white/10 text-white shadow-sm",
      shadow: "shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30",
    },
    {
      label: "Prestasi",
      value: prestasi,
      href: "/admin/prestasi",
      icon: TrophyIcon,
      card: "bg-gradient-to-br from-[#0e5f9c] via-[#0b5c97] to-[#083f68]",
      iconBox: "border border-white/20 bg-white/10 text-white shadow-sm",
      shadow: "shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30",
    },
    {
      label: "Fasilitas",
      value: fasilitas,
      href: "/admin/fasilitas",
      icon: BuildingIcon,
      card: "bg-gradient-to-br from-[#0e5f9c] via-[#0b5c97] to-[#083f68]",
      iconBox: "border border-white/20 bg-white/10 text-white shadow-sm",
      shadow: "shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30",
    },
  ];

  const handleSelect = (label: string) => {
    const href = CHART_LINKS[label];
    if (href) router.push(href);
  };

  const incompletePages = Math.ceil(incompleteContent.length / ITEMS_PER_PAGE);
  const visibleIncomplete = incompleteContent.slice(
    (incompletePage - 1) * ITEMS_PER_PAGE,
    incompletePage * ITEMS_PER_PAGE,
  );

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
          {quick.map((q) => (
            <Link
              key={q.label}
              href={q.href}
              className={`group rounded-xl border border-white/20 p-5 text-white transition-all duration-200 hover:-translate-y-1 ${q.card} ${q.shadow}`}
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${q.iconBox}`}>
                  <q.icon className="h-5 w-5" />
                </div>
                <span className="text-white/40 transition group-hover:translate-x-0.5 group-hover:text-white">
                  →
                </span>
              </div>
              <CountUp
                value={q.value}
                className="mt-4 block text-3xl font-extrabold tracking-tight text-white"
              />
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white/70">
                {q.label}
              </p>
            </Link>
          ))}
        </div>
      </FadeUp>

      <FadeUp delay={160}>
        <div id="chart"><ContentChart data={chartData} onSelect={handleSelect} /></div>
      </FadeUp>

      <FadeUp delay={240}>
        <section className="rounded-xl border border-blue-200/70 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-500">
                Berita Terbaru
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Tiga berita yang terakhir ditambahkan atau diedit.
              </p>
            </div>
            <Link
              href="/admin/berita"
              className="shrink-0 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Lihat Semua
            </Link>
          </div>

          {latestBerita.length === 0 ? (
            <p className="mt-6 rounded-lg bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              Belum ada berita.
            </p>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {latestBerita.map((item) => (
                <article
                  key={item.slug}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                >
                  <div className="relative aspect-[16/9] bg-slate-100">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 30vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
                        Tidak ada gambar
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-blue-700">
                      {activityLabel(item)}
                    </p>
                    <h3 className="mt-1 line-clamp-2 font-bold leading-snug text-slate-900">
                      {item.title || "Tanpa judul"}
                    </h3>
                    {item.desc && (
                      <p className="mt-2 line-clamp-2 text-sm text-slate-500">{item.desc}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </FadeUp>

      <FadeUp delay={320}>
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <section className="flex flex-col justify-between rounded-xl border border-blue-200/70 bg-white p-6 shadow-sm sm:p-7">
            <div>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-black text-[#0e5f9c]">!</span>
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-700">
                    Konten Perlu Diperbarui
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-500">Lengkapi bagian berikut agar situs tampil optimal.</p>
                </div>
              </div>

              {incompleteContent.length === 0 ? (
                <p className="mt-6 rounded-lg bg-blue-50 px-4 py-6 text-center text-sm font-semibold text-blue-700">
                  Semua konten sudah lengkap.
                </p>
              ) : (
                <div className="mt-5 divide-y divide-slate-100 min-h-[235px]">
                  {visibleIncomplete.map((item, index) => (
                    <Link
                      key={`${item.href}-${item.title}-${index}`}
                      href={item.href}
                      className="group flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-800">{item.title}</p>
                        <p className="mt-0.5 text-xs font-medium text-blue-700">{item.issue}</p>
                      </div>
                      <span className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {incompletePages > 1 && (
              <div className="mt-5 flex items-center justify-center gap-3 border-t border-slate-100 pt-4">
                <span className="text-xs font-semibold text-slate-500">
                  Halaman {incompletePage}{incompletePage < incompletePages ? `-${incompletePage + 1}` : ""}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Halaman sebelumnya"
                    onClick={() => setIncompletePage((page) => Math.max(1, page - 1))}
                    disabled={incompletePage === 1}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    &lt;
                  </button>
                  <button
                    type="button"
                    aria-label="Halaman berikutnya"
                    onClick={() => setIncompletePage((page) => Math.min(incompletePages, page + 1))}
                    disabled={incompletePage === incompletePages}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="flex flex-col justify-between rounded-xl border border-blue-200/70 bg-white p-6 shadow-sm sm:p-7">
            <div>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-700">
                    Aktivitas Terakhir
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-500">Riwayat perubahan terbaru di panel admin.</p>
                </div>
              </div>

              {activityLog.length === 0 ? (
                <p className="mt-6 rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                  Belum ada aktivitas tercatat.
                </p>
              ) : (
                <div className="mt-5 divide-y divide-slate-100 min-h-[235px]">
                  {activityLog.slice(0, 5).map((item) => (
                    <Link
                      key={item.id}
                      href={ACTIVITY_LINKS[item.collection] ?? "/admin"}
                      className="group flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-800">{item.label}</p>
                        <p className="mt-0.5 text-xs font-semibold text-blue-700">
                          {now ? relativeTime(item.timestamp, now) : "Menghitung waktu..."}
                        </p>
                      </div>
                      <span className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </FadeUp>
    </div>
  );
}
