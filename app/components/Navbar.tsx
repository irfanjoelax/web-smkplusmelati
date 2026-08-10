"use client";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Beranda", href: "#hero" },
  { label: "Tentang", href: "#about" },
  { label: "Jurusan", href: "#jurusan" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Galeri", href: "#galeri" },
  { label: "Pengumuman", href: "#pengumuman" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      id="navbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#0D3B7A",
        borderBottom: "3px solid #0D0D0D",
        boxShadow: "0 3px 0 #0D0D0D",
      }}
    >
      {/* Top announcement bar */}
      <div
        style={{
          background: "#FFE033",
          borderBottom: "2px solid #0D0D0D",
          overflow: "hidden",
          height: "36px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="animate-marquee"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: "0.05em",
            color: "#0D0D0D",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ padding: "0 40px" }}>
              🎓 PENERIMAAN PESERTA DIDIK BARU SMK PLUS MELATI &nbsp;|&nbsp; TAHUN AJARAN 2025/2026 &nbsp;|&nbsp;
              🏆 SEKOLAH UNGGULAN &amp; BERPRESTASI &nbsp;|&nbsp; DAFTAR SEKARANG &nbsp;|&nbsp;
              📚 PROGRAM KEAHLIAN TERBAIK &nbsp;|&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Main navbar */}
      <div
        className="container-brutal"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px" }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              border: "2px solid #FFE033",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
              flexShrink: 0,
            }}
          >
            <Image
              src="/logo.png"
              alt="Logo SMK Plus Melati"
              width={40}
              height={40}
              style={{ objectFit: "contain", width: "auto", height: 40 }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "#FFE033",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              SMK PLUS
            </div>
            <div
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "white",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              MELATI
            </div>
          </div>
        </a>

        {/* Desktop nav links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                padding: "8px 14px",
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "white",
                textDecoration: "none",
                border: "2px solid transparent",
                transition: "all 0.15s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FFE033";
                (e.currentTarget as HTMLElement).style.color = "#0D0D0D";
                (e.currentTarget as HTMLElement).style.borderColor = "#0D0D0D";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "white";
                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontak"
            className="brutal-btn brutal-btn-yellow"
            style={{ marginLeft: "12px", padding: "10px 20px", fontSize: "0.875rem" }}
          >
            Daftar Sekarang →
          </a>
        </div>

        {/* Hamburger menu button (mobile) */}
        <button
          id="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "#FFE033",
            border: "2px solid #0D0D0D",
            width: 44,
            height: 44,
            cursor: "pointer",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: 22, height: 3, background: "#0D0D0D" }} />
          <span style={{ display: "block", width: 22, height: 3, background: "#0D0D0D" }} />
          <span style={{ display: "block", width: 22, height: 3, background: "#0D0D0D" }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            background: "#0D3B7A",
            borderTop: "2px solid #FFE033",
            padding: "12px 24px 24px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: "white",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontak"
            onClick={() => setMenuOpen(false)}
            className="brutal-btn brutal-btn-yellow"
            style={{ marginTop: "16px", display: "block", textAlign: "center" }}
          >
            Daftar Sekarang →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
