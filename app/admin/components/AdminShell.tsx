"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  AcademicCapIcon,
  BookIcon,
  BuildingIcon,
  CloseIcon,
  DashboardIcon,
  ExternalIcon,
  EyeIcon,
  GearIcon,
  LayersIcon,
  LogoutIcon,
  MenuIcon,
  NewspaperIcon,
  SparklesIcon,
  TrophyIcon,
  UsersIcon,
} from "./icons";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon },
  { href: "/admin/profil", label: "Profil Sekolah", icon: BookIcon },
  { href: "/admin/visi-misi", label: "Visi & Misi", icon: EyeIcon },
  { href: "/admin/guru", label: "Daftar Guru", icon: UsersIcon },
  { href: "/admin/alumni", label: "Alumni", icon: UsersIcon },
  { href: "/admin/jurusan", label: "Jurusan", icon: AcademicCapIcon },
  { href: "/admin/program", label: "Program", icon: LayersIcon },
  { href: "/admin/prestasi", label: "Prestasi Siswa", icon: TrophyIcon },
  { href: "/admin/ekskul", label: "Ekstrakurikuler", icon: SparklesIcon },
  { href: "/admin/fasilitas", label: "Fasilitas", icon: BuildingIcon },
  { href: "/admin/berita", label: "Berita", icon: NewspaperIcon },
  { href: "/admin/beranda", label: "Pengaturan Beranda", icon: GearIcon },
];

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/admin" onClick={onNavigate} className="mb-6 flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-md shadow-black/10">
        <Image
          src="/logo melati.png"
          alt="Logo SMK Plus Melati"
          width={44}
          height={44}
          className="h-full w-full object-contain"
        />
      </span>
      <span>
        <span className="block text-lg font-extrabold tracking-tight text-white">
          Admin Panel
        </span>
        <span className="block text-xs font-semibold text-white/60">
          SMK Plus Melati
        </span>
      </span>
    </Link>
  );
}

function NavLinksList({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
              active
                ? "bg-white/15 text-white shadow-sm ring-1 ring-white/20"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                active
                  ? "bg-amber-400 text-slate-900 shadow-sm shadow-amber-400/30"
                  : "bg-white/5 text-white/80 group-hover:bg-white/10 group-hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="truncate">{item.label}</span>
            {active && (
              <span className="absolute right-3 h-1.5 w-1.5 rounded-full bg-amber-400" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      {/* Sidebar Desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#0e5f9c] via-[#0b5c97] to-[#083f68] p-5 shadow-xl shadow-blue-950/20 lg:flex">
        <div>
          <Brand />
          <NavLinksList pathname={pathname} />
        </div>

        <div className="space-y-2 border-t border-white/15 pt-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/80">
              <ExternalIcon className="h-4 w-4" />
            </span>
            <span>Lihat Situs</span>
          </a>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/80">
              <LogoutIcon className="h-4 w-4" />
            </span>
            <span>{loggingOut ? "Keluar…" : "Keluar"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Mobile Header Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm lg:hidden">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 p-0.5">
              <Image
                src="/logo melati.png"
                alt="Logo SMK Plus Melati"
                width={36}
                height={36}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="text-base font-extrabold tracking-tight text-slate-900">
              Admin Panel
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </header>

        {/* Mobile Drawer */}
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="fixed inset-0 bg-slate-900/50 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 flex w-72 flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#0e5f9c] via-[#0b5c97] to-[#083f68] p-5 shadow-2xl">
              <div>
                <div className="flex items-center justify-between">
                  <Brand onNavigate={() => setOpen(false)} />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Tutup menu"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                </div>
                <NavLinksList pathname={pathname} onNavigate={() => setOpen(false)} />
              </div>

              <div className="space-y-2 border-t border-white/15 pt-4">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/80">
                    <ExternalIcon className="h-4 w-4" />
                  </span>
                  <span>Lihat Situs</span>
                </a>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/80">
                    <LogoutIcon className="h-4 w-4" />
                  </span>
                  <span>{loggingOut ? "Keluar…" : "Keluar"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
