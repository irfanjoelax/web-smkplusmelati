"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  BookIcon,
  BuildingIcon,
  CloseIcon,
  DashboardIcon,
  ExternalIcon,
  EyeIcon,
  HomeIcon,
  LogoutIcon,
  MenuIcon,
  StarIcon,
  TrophyIcon,
  UsersIcon,
} from "./icons";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon },
  { href: "/admin/guru", label: "Daftar Guru", icon: UsersIcon },
  { href: "/admin/visi-misi", label: "Visi & Misi", icon: EyeIcon },
  { href: "/admin/jurusan", label: "Jurusan", icon: BookIcon },
  { href: "/admin/prestasi", label: "Prestasi Siswa", icon: TrophyIcon },
  { href: "/admin/fasilitas", label: "Fasilitas", icon: BuildingIcon },
  { href: "/admin/ekskul", label: "Ekskul", icon: StarIcon },
  { href: "/admin/beranda", label: "Beranda", icon: HomeIcon },
];

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/admin" onClick={onNavigate} className="mb-6 block">
      <span className="block text-lg font-extrabold tracking-tight text-white">
        Admin Panel
      </span>
      <span className="block text-xs font-semibold text-white/60">
        SMK Plus Melati
      </span>
    </Link>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const close = () => setOpen(false);

  const sidebar = (
    <div className="flex h-full flex-col">
      <Brand onNavigate={close} />
      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                active
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-amber-400" />
              )}
              <item.icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex flex-col gap-2 pt-4">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <ExternalIcon className="h-5 w-5 shrink-0" />
          Lihat Situs
        </a>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-red-500/30"
        >
          <LogoutIcon className="h-5 w-5 shrink-0" />
          Keluar
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-gradient-to-r from-[#0e5f9c] to-[#0b5c97] px-4 py-3 text-white lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          className="rounded-lg p-1.5 transition hover:bg-white/10"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <span className="font-extrabold tracking-tight">Admin Panel</span>
        <span className="h-8 w-8" />
      </header>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#0e5f9c] via-[#0b5c97] to-[#083f68] p-5 transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Tutup menu"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
        {sidebar}
      </aside>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 bg-gradient-to-b from-[#0e5f9c] via-[#0b5c97] to-[#083f68] p-5 lg:block">
        {sidebar}
      </aside>

      <main className="flex-1 p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}