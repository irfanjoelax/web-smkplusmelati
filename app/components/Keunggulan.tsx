"use client";

const keunggulan = [
  { icon: "🏭", title: "Kerjasama Industri", desc: "Kemitraan dengan 100+ perusahaan terkemuka untuk magang dan rekrutmen langsung.", bg: "#FFE033", textColor: "#0D0D0D" },
  { icon: "🖥️", title: "Lab Modern", desc: "Fasilitas laboratorium komputer, elektronik, dan studio desain berteknologi terkini.", bg: "#0D3B7A", textColor: "white" },
  { icon: "👨‍🏫", title: "Guru Berpengalaman", desc: "Tenaga pengajar bersertifikat industri dengan pengalaman di perusahaan terkemuka.", bg: "#FF3B3B", textColor: "white" },
  { icon: "🌍", title: "Program Internasional", desc: "Kesempatan magang di luar negeri dan sertifikasi internasional diakui global.", bg: "#0D0D0D", textColor: "#FFE033" },
  { icon: "🎯", title: "Kurikulum Industri", desc: "Kurikulum selalu diperbarui sesuai kebutuhan dunia kerja dan perkembangan teknologi.", bg: "#FFFFF0", textColor: "#0D0D0D" },
  { icon: "🏆", title: "Berprestasi Nasional", desc: "Raih berbagai juara lomba kompetensi siswa tingkat provinsi hingga nasional.", bg: "#FFE033", textColor: "#0D0D0D" },
  { icon: "💰", title: "Beasiswa Tersedia", desc: "Program beasiswa prestasi, yatim piatu, dan keluarga kurang mampu terbuka lebar.", bg: "#0D3B7A", textColor: "white" },
  { icon: "📱", title: "Pembelajaran Digital", desc: "Platform e-learning, LMS modern, dan akses materi belajar 24/7 kapan saja.", bg: "#FF3B3B", textColor: "white" },
];

export default function Keunggulan() {
  return (
    <section
      id="keunggulan"
      className="section-padding"
      style={{
        background: "#0D0D0D",
        borderBottom: "3px solid #0D0D0D",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background text watermark */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 900,
          fontSize: "20vw",
          color: "rgba(255,255,255,0.02)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          letterSpacing: "-0.05em",
          userSelect: "none",
        }}
      >
        UNGGUL
      </div>

      <div className="container-brutal" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <span
            className="brutal-tag"
            style={{ marginBottom: "16px", display: "inline-block" }}
          >
            Keunggulan Kami
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
            Mengapa Kami{" "}
            <span
              style={{
                background: "#FFE033",
                color: "#0D0D0D",
                padding: "0 10px",
                border: "2px solid #FFE033",
              }}
            >
              Berbeda?
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}
          className="keunggulan-grid"
        >
          {keunggulan.map((k, i) => (
            <div
              key={i}
              style={{
                background: k.bg,
                border: "2px solid #0D0D0D",
                padding: "32px 24px",
                transition: "transform 0.2s ease, z-index 0.2s",
                cursor: "default",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "scale(1.05)";
                el.style.zIndex = "10";
                el.style.boxShadow = "0 0 0 3px #FFE033";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "scale(1)";
                el.style.zIndex = "1";
                el.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "16px",
                }}
              >
                {k.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: k.textColor,
                  marginBottom: "10px",
                  lineHeight: 1.3,
                }}
              >
                {k.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.85rem",
                  color: k.textColor,
                  opacity: 0.8,
                  lineHeight: 1.6,
                }}
              >
                {k.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .keunggulan-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .keunggulan-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
