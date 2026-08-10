"use client";
import Image from "next/image";

const values = [
  { icon: "🎯", label: "Visi", desc: "Menjadi SMK terdepan yang menghasilkan lulusan kompeten, berkarakter Islami, dan berdaya saing global." },
  { icon: "🚀", label: "Misi", desc: "Menyelenggarakan pendidikan vokasi berkualitas dengan kurikulum industri terkini dan pengembangan karakter siswa." },
  { icon: "⭐", label: "Nilai", desc: "Integritas, Inovasi, Kolaborasi, dan Keunggulan menjadi landasan setiap proses belajar mengajar." },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-padding"
      style={{ background: "#0D3B7A", borderBottom: "3px solid #0D0D0D" }}
    >
      <div className="container-brutal">
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <span className="brutal-tag brutal-tag-blue" style={{ background: "#FFE033", color: "#0D0D0D", marginBottom: "16px", display: "inline-block" }}>
            Tentang Kami
          </span>
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Kenapa Memilih{" "}
            <span
              style={{
                display: "inline-block",
                background: "#FFE033",
                color: "#0D0D0D",
                padding: "0 10px",
                border: "2px solid #0D0D0D",
                boxShadow: "4px 4px 0 #0D0D0D",
              }}
            >
              SMK Plus Melati?
            </span>
          </h2>
        </div>

        {/* Content grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left: Text */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.85)",
                marginBottom: "32px",
              }}
            >
              SMK Plus Melati berdiri dengan tekad kuat untuk mencetak tenaga kerja profesional
              yang tidak hanya unggul secara teknis, tetapi juga memiliki karakter yang kuat.
              Didirikan oleh para pendidik berpengalaman, kami telah membimbing lebih dari
              ribuan siswa menuju karir impian mereka.
            </p>

            {/* Value cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {values.map((v, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "2px solid rgba(255,224,51,0.4)",
                    padding: "20px",
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,224,51,0.12)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#FFE033";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,224,51,0.4)";
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.75rem",
                      flexShrink: 0,
                      width: 48,
                      height: 48,
                      background: "#FFE033",
                      border: "2px solid #0D0D0D",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "#FFE033",
                        marginBottom: "4px",
                      }}
                    >
                      {v.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.9rem",
                        color: "rgba(255,255,255,0.8)",
                        lineHeight: 1.6,
                      }}
                    >
                      {v.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual box */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Big highlight box */}
            <div
              style={{
                background: "#FFE033",
                border: "3px solid #0D0D0D",
                boxShadow: "8px 8px 0 #0D0D0D",
                padding: "32px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 800,
                  fontSize: "4rem",
                  color: "#0D0D0D",
                  lineHeight: 1,
                }}
              >
                15+
              </div>
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#0D0D0D",
                }}
              >
                Tahun Pengalaman
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.9rem",
                  color: "#0D0D0D",
                  marginTop: "8px",
                  opacity: 0.75,
                }}
              >
                Melayani pendidikan vokasi berkualitas sejak berdirinya sekolah hingga kini.
              </div>
            </div>

            {/* Two small boxes */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div
                style={{
                  background: "#FF3B3B",
                  border: "3px solid #0D0D0D",
                  boxShadow: "5px 5px 0 #0D0D0D",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    color: "white",
                    lineHeight: 1,
                  }}
                >
                  8
                </div>
                <div style={{ color: "white", fontSize: "0.85rem", fontWeight: 600, marginTop: "4px" }}>
                  Jurusan Tersedia
                </div>
              </div>
              <div
                style={{
                  background: "#0D0D0D",
                  border: "3px solid #0D0D0D",
                  boxShadow: "5px 5px 0 rgba(255,224,51,0.5)",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    color: "#FFE033",
                    lineHeight: 1,
                  }}
                >
                  A
                </div>
                <div style={{ color: "white", fontSize: "0.85rem", fontWeight: 600, marginTop: "4px" }}>
                  Akreditasi BAN-S/M
                </div>
              </div>
            </div>

            {/* Accreditation note */}
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "2px solid rgba(255,255,255,0.2)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>🏫</span>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Terakreditasi resmi oleh Badan Akreditasi Nasional Sekolah/Madrasah
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
