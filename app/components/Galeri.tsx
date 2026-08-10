"use client";
import Image from "next/image";
import { useState } from "react";

const categories = ["Semua", "Akademik", "Ekstrakurikuler", "Fasilitas", "Prestasi"];

const galeriItems = [
  { label: "Lab Komputer Modern", category: "Fasilitas", span: "col-span-2" },
  { label: "Lomba LKS Nasional", category: "Prestasi", span: "" },
  { label: "Upacara Bendera", category: "Akademik", span: "" },
  { label: "Pameran Karya Siswa", category: "Akademik", span: "" },
  { label: "Pelatihan Coding", category: "Akademik", span: "" },
  { label: "Ekstrakurikuler Pramuka", category: "Ekstrakurikuler", span: "col-span-2" },
  { label: "Studio DKV", category: "Fasilitas", span: "" },
  { label: "Juara Olimpiade IT", category: "Prestasi", span: "" },
];

const colors = [
  "#FFE033", "#0D3B7A", "#FF3B3B", "#0D0D0D",
  "#1E6FD9", "#FFE033", "#FF3B3B", "#0D3B7A"
];

export default function Galeri() {
  const [activeCategory, setActiveCategory] = useState("Semua");

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
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
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

        {/* Main gallery image */}
        <div
          style={{
            border: "3px solid #0D0D0D",
            boxShadow: "8px 8px 0 #0D0D0D",
            marginBottom: "24px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src="/gallery_activities.png"
            alt="Galeri Kegiatan SMK Plus Melati"
            width={1200}
            height={500}
            style={{ objectFit: "cover", display: "block", width: "100%", height: "auto" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(13,13,13,0.85), transparent)",
              padding: "40px 24px 24px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "white",
                }}
              >
                Kegiatan Belajar Mengajar & Ekstrakurikuler
              </div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", marginTop: "4px" }}>
                Tahun Ajaran 2024/2025
              </div>
            </div>
            <span
              style={{
                padding: "6px 14px",
                background: "#FFE033",
                border: "2px solid #0D0D0D",
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 700,
                fontSize: "0.8rem",
                color: "#0D0D0D",
              }}
            >
              100+ Foto
            </span>
          </div>
        </div>

        {/* Mini grid of colored placeholder cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
          className="galeri-mini-grid"
        >
          {galeriItems.slice(0, 4).map((item, i) => (
            <div
              key={i}
              className="brutal-card"
              style={{
                background: colors[i],
                border: "3px solid #0D0D0D",
                boxShadow: "5px 5px 0 #0D0D0D",
                padding: "24px",
                minHeight: 120,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                cursor: "pointer",
                transition: "box-shadow 0.15s ease, transform 0.15s ease",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  color: colors[i] === "#0D0D0D" ? "#FFE033" : "#0D0D0D",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.75rem",
                  color: colors[i] === "#0D0D0D" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
                  marginTop: "4px",
                }}
              >
                {item.category}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <a
            href="#"
            id="galeri-lihat-semua"
            className="brutal-btn brutal-btn-black"
          >
            Lihat Semua Foto →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .galeri-mini-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
