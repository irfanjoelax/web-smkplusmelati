"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "./site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 120 && y > lastScrollY.current && !open);
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 px-4 pt-4 transition-all duration-300 ${
        scrolled ? "pb-2" : "pb-4"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav className="clay-card mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-[1.75rem] px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="clay-inset flex h-11 w-11 items-center justify-center overflow-hidden rounded-full p-1">
            <Image
              src="/logo melati.png"
              alt="Logo SMK Plus Melati"
              width={44}
              height={44}
              className="h-full w-full object-contain"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-extrabold text-primary-dark">
              SMK Plus Melati
            </span>
            <span className="block text-[0.7rem] font-semibold text-primary/70">
             Sekolah Kewirausahaan Yang Bertakwa
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="group relative">
              <Link
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-sm font-bold transition-all duration-200 ${
                  isActive(link.href)
                    ? "clay-chip-primary !py-2 text-white"
                    : "text-foreground hover:-translate-y-0.5 hover:bg-primary-soft hover:text-primary-dark"
                }`}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="clay-card min-w-52 p-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                          isActive(child.href)
                            ? "bg-primary-soft text-primary-dark"
                            : "text-foreground hover:bg-primary-soft/60"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/ppdb"
            className="clay-btn clay-btn-accent ml-2 !px-4 !py-2 text-sm"
          >
            PPDB 2026
          </Link>
        </div>

        <button
          type="button"
          aria-label="Buka menu"
          onClick={() => setOpen((v) => !v)}
          className="clay-inset flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-5 rounded-full bg-primary-dark transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-primary-dark transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-primary-dark transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="clay-card mx-auto mt-3 max-w-6xl rounded-[1.5rem] p-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-bold ${
                    isActive(link.href)
                      ? "bg-primary-soft text-primary-dark"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-3 flex flex-col border-l-2 border-primary/15 pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block rounded-xl px-4 py-2 text-sm font-bold ${
                          isActive(child.href)
                            ? "bg-primary-soft/70 text-primary-dark"
                            : "text-foreground/80"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/ppdb"
              className="clay-btn clay-btn-accent mt-2 w-full text-sm"
            >
              Daftar PPDB 2026
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}