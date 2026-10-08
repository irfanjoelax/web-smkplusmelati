"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  ["Beranda", "top"],
  ["Profil", "profil"],
  ["Keunggulan", "keunggulan"],
  ["Transparansi", "visi-misi"],
  ["Promo Pendaftaran", "guru"],
  ["Beasiswa", "beasiswa"],
  ["Jurusan", "jurusan"],
  ["Sarana & Prasarana", "fasilitas"],
  ["Eskul", "eskul"],
  ["Alumni", "alumni"],
  ["FAQ", "faq"],
] as const;

export default function WebsiteNav() {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sections = links.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-30% 0px -60%", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let previousY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < 24 || currentY < previousY);
      if (currentY > 24 && currentY > previousY) setOpen(false);
      previousY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-300 sm:px-6 ${visible ? "translate-y-0" : "-translate-y-[calc(100%+1rem)]"}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/20 bg-primary-darker/85 px-3 py-2.5 text-white shadow-xl backdrop-blur-xl sm:px-5">
        <button type="button" onClick={() => navigate("top")} className="flex min-h-11 items-center gap-2 rounded-xl text-left focus-visible:outline-2 focus-visible:outline-accent">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1"><Image src="/logo melati.png" alt="Logo SMK Plus Melati" width={38} height={38} className="h-full w-full object-contain" /></span>
          <span className="hidden leading-tight sm:block"><strong className="block text-sm">SMK PLUS MELATI</strong><span className="block text-[9px] font-bold text-accent">The Center of Future Digital Entrepreneurs</span></span>
        </button>
        <div className="hidden items-center gap-1 xl:flex">
          {links.map(([label, id]) => <button key={id} type="button" onClick={() => navigate(id)} className={`relative min-h-11 rounded-lg px-1.5 text-[11px] font-bold transition hover:text-accent focus-visible:outline-2 focus-visible:outline-accent ${active === id ? "text-accent after:absolute after:inset-x-1.5 after:bottom-1 after:h-0.5 after:bg-accent" : "text-white/75"}`}>{label}</button>)}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/spmb" className="clay-btn clay-btn-accent min-h-11 !px-3 !py-2 text-[11px] font-extrabold sm:!px-4">Daftar Sekarang</Link>
          <button type="button" aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 text-xl xl:hidden focus-visible:outline-2 focus-visible:outline-accent">{open ? "×" : "☰"}</button>
        </div>
      </nav>
      {open && <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/20 bg-primary-darker/95 p-3 text-white shadow-xl backdrop-blur-xl xl:hidden">{links.map(([label, id]) => <button key={id} type="button" onClick={() => navigate(id)} className={`flex min-h-11 w-full items-center rounded-xl px-4 text-left text-sm font-bold ${active === id ? "bg-white/10 text-accent" : "text-white/80"}`}>{label}</button>)}</div>}
    </header>
  );
}
