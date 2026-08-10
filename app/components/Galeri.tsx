"use client";
import Image from "next/image";
import { useState } from "react";

const galeriItems = [
  {
    src: "/galeri_poster.jpg",
    label: "SMK Plus Melati — The Center of Future Digital Entrepreneurs",
    category: "Profil",
    span: true,
  },
  {
    src: "/galeri_dhuha.jpg",
    label: "Program Pembiasaan Sholat Dhuha",
    category: "Kegiatan",
    span: false,
  },
  {
    src: "/galeri_android.jpg",
    label: "Pelatihan Pembuatan Aplikasi Android",
    category: "Prestasi",
    span: false,
  },
  {
    src: "/galeri_sholat.jpg",
    label: "Kegiatan Sholat Berjamaah Siswa",
    category: "Kegiatan",
    span: false,
  },
];

const categories = ["Semua", "Profil", "Kegiatan", "Prestasi"];

export default function Galeri() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered =
    activeCategory === "Semua"
      ? galeriItems
      : galeriItems.filter((g) => g.category === activeCategory);

  return (
    <section
      id="galeri"
      className="section-padding"
      style={{ background: "#FFE033", borderBottom: "3px solid #0D0D0D" }}
    >
      <div className="container-brutal">
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <span className="brutal-tag" style={{ marginBottom: "16px", display: "inline-block" }}>
            Galeri
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#0D0D0D",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Momen{" "}
              <span
                style={{
                  display: "inline-block",
                  background: "#0D0D0D",
                  color: "#FFE033",
                  padding: "0 10px",
                  border: "2px solid #0D0D0D",
                  boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
                }}
              >
                Berkesan
              </span>
            </h2>

            {/* Filter buttons */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "0.03em",
                    border: "2px solid #0D0D0D",
                    cursor: "pointer",
                    background: activeCategory === cat ? "#0D0D0D" : "white",
                    color: activeCategory === cat ? "#FFE033" : "#0D0D0D",
                    boxShadow: activeCategory === cat ? "none" : "3px 3px 0 #0D0D0D",
                    transform: activeCategory === cat ? "translate(3px,3px)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
          className="galeri-grid"
        >
          {filtered.map((item, i) => (
            <div
              key={i}
              style={{
                border: "3px solid #0D0D0D",
                boxShadow: "6px 6px 0 #0D0D0D",
                overflow: "hidden",
                position: "relative",
                gridColumn: item.span && filtered.length > 1 ? "span 2" : "span 1",
                transition: "box-shadow 0.15s ease, transform 0.15s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "2px 2px 0 #0D0D0D";
                (e.currentTarget as HTMLElement).style.transform = "translate(4px,4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #0D0D0D";
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
              }}
            >
              <Image
                src={item.src}
                alt={item.label}
                width={800}
                height={item.span ? 500 : 400}
                style={{
                  objectFit: "cover",
                  display: "block",
                  width: "100%",
                  height: item.span ? 420 : 300,
                }}
              />
              {/* Caption overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(13,13,13,0.9), transparent)",
                  padding: "32px 20px 16px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 10px",
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: "#FFE033",
                    color: "#0D0D0D",
                    border: "1px solid #0D0D0D",
                    marginBottom: "6px",
                  }}
                >
                  {item.category}
                </span>
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "white",
                    lineHeight: 1.3,
                  }}
                >
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <a href="#kontak" id="galeri-lihat-semua" className="brutal-btn brutal-btn-black">
            Lihat Semua Foto →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .galeri-grid { grid-template-columns: 1fr !important; }
          .galeri-grid > div { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
