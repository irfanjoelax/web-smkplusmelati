"use client";
import { useEffect, useState } from "react";

const stats = [
  { number: "1200+", label: "Siswa Aktif" },
  { number: "50+", label: "Tenaga Pendidik" },
  { number: "95%", label: "Lulusan Terserap" },
  { number: "15+", label: "Tahun Berprestasi" },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      style={{
        background: "#FFE033",
        borderBottom: "3px solid #0D0D0D",
        overflow: "hidden",
        position: "relative",
        minHeight: "calc(100vh - 95px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Background geometric shapes */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute", top: -60, right: -60,
            width: 320, height: 320,
            background: "#0D3B7A",
            border: "3px solid #0D0D0D",
            transform: "rotate(15deg)",
            opacity: 0.15,
          }}
        />
        <div
          style={{
            position: "absolute", bottom: 80, left: -40,
            width: 200, height: 200,
            background: "#FF3B3B",
            border: "3px solid #0D0D0D",
            transform: "rotate(-10deg)",
            opacity: 0.12,
          }}
        />
        <div
          style={{
            position: "absolute", top: "40%", right: "8%",
            width: 100, height: 100,
            background: "#0D0D0D",
            opacity: 0.08,
          }}
        />
        {/* Grid dots */}
        {[...Array(8)].map((_, i) =>
          [...Array(6)].map((_, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                position: "absolute",
                top: `${j * 18}%`,
                left: `${i * 14}%`,
                width: 4,
                height: 4,
                background: "#0D0D0D",
                opacity: 0.1,
                borderRadius: "50%",
              }}
            />
          ))
        )}
      </div>

      <div className="container-brutal" style={{ padding: "60px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left: Text Content */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.7s ease",
            }}
          >
            <div
              className="brutal-tag"
              style={{ marginBottom: "20px" }}
            >
              🎓 Sekolah Menengah Kejuruan
            </div>

            <h1
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "#0D0D0D",
                marginBottom: "24px",
              }}
            >
              SMK{" "}
              <span
                style={{
                  display: "inline-block",
                  background: "#0D3B7A",
                  color: "#FFE033",
                  padding: "0 12px",
                  border: "3px solid #0D0D0D",
                  boxShadow: "5px 5px 0 #0D0D0D",
                }}
              >
                PLUS
              </span>
              <br />
              MELATI
            </h1>

            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.15rem",
                lineHeight: 1.7,
                color: "#0D0D0D",
                maxWidth: 480,
                marginBottom: "36px",
                fontWeight: 500,
              }}
            >
              Mencetak generasi unggul, berkarakter, dan siap bersaing di era digital.
              Bergabunglah dengan ribuan alumni berprestasi kami!
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a
                href="#kontak"
                id="cta-daftar"
                className="brutal-btn brutal-btn-black"
                style={{ fontSize: "1rem" }}
              >
                Daftar Sekarang →
              </a>
              <a
                href="#jurusan"
                id="cta-jurusan"
                className="brutal-btn brutal-btn-white"
                style={{ fontSize: "1rem" }}
              >
                Lihat Jurusan
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.7s ease 0.2s",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="animate-float"
              style={{
                position: "relative",
                border: "3px solid #0D0D0D",
                boxShadow: "10px 10px 0 #0D0D0D",
                background: "white",
                overflow: "hidden",
                maxWidth: 460,
                width: "100%",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero_school.png"
                alt="Poster SPMB SMK Plus Melati Samarinda"
                style={{ display: "block", width: "100%", height: "auto", objectFit: "contain" }}
              />
              {/* Corner badge placeholder - kept for structure */}
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "transparent",
                  border: "none",
                  color: "white",
                  padding: "6px 12px",
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                }}
              >
                PPDB 2025/2026
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginTop: "48px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease 0.4s",
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: i % 2 === 0 ? "#0D3B7A" : "#0D0D0D",
                border: "3px solid #0D0D0D",
                boxShadow: "5px 5px 0 #0D0D0D",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 800,
                  fontSize: "2rem",
                  color: "#FFE033",
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.85rem",
                  color: "white",
                  marginTop: "4px",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
