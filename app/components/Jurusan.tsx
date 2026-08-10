"use client";

const jurusan = [
  {
    icon: "💻",
    kode: "RPL",
    nama: "Rekayasa Perangkat Lunak",
    desc: "Mempelajari pemrograman, pengembangan aplikasi web & mobile, database, dan software engineering.",
    skills: ["Web Development", "Mobile App", "Database", "UI/UX"],
    color: "#1E6FD9",
    textColor: "white",
  },
  {
    icon: "🌐",
    kode: "TKJ",
    nama: "Teknik Komputer & Jaringan",
    desc: "Keahlian instalasi jaringan komputer, administrasi server, cybersecurity, dan infrastruktur IT.",
    skills: ["Networking", "Server Admin", "Cybersecurity", "Cloud"],
    color: "#FFE033",
    textColor: "#0D0D0D",
  },
  {
    icon: "🎨",
    kode: "DKV",
    nama: "Desain Komunikasi Visual",
    desc: "Mengembangkan kreativitas dalam desain grafis, fotografi, videografi, dan animasi digital.",
    skills: ["Desain Grafis", "Fotografi", "Video Editing", "Animasi"],
    color: "#FF3B3B",
    textColor: "white",
  },
  {
    icon: "⚡",
    kode: "TEI",
    nama: "Teknik Elektronika Industri",
    desc: "Mempelajari elektronika, sistem kendali otomatis, PLC, robotika, dan instrumentasi industri.",
    skills: ["PLC", "Robotika", "IoT", "Otomasi"],
    color: "#0D0D0D",
    textColor: "#FFE033",
  },
  {
    icon: "📊",
    kode: "AKL",
    nama: "Akuntansi & Keuangan Lembaga",
    desc: "Menguasai akuntansi, perpajakan, perbankan, manajemen keuangan, dan software akuntansi.",
    skills: ["Akuntansi", "Perpajakan", "Perbankan", "MYOB"],
    color: "#1E6FD9",
    textColor: "white",
  },
  {
    icon: "🏪",
    kode: "BDP",
    nama: "Bisnis Daring & Pemasaran",
    desc: "Strategi pemasaran digital, e-commerce, manajemen bisnis online, dan kewirausahaan.",
    skills: ["Digital Marketing", "E-Commerce", "Copywriting", "SEO"],
    color: "#FFE033",
    textColor: "#0D0D0D",
  },
];

export default function Jurusan() {
  return (
    <section
      id="jurusan"
      className="section-padding"
      style={{ background: "#FFFFF0", borderBottom: "3px solid #0D0D0D" }}
    >
      <div className="container-brutal">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span
            className="brutal-tag"
            style={{ marginBottom: "16px", display: "inline-block" }}
          >
            Program Keahlian
          </span>
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0D0D0D",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Pilih Jurusanmu,{" "}
            <span
              style={{
                background: "#0D3B7A",
                color: "#FFE033",
                padding: "0 10px",
                border: "2px solid #0D0D0D",
                boxShadow: "4px 4px 0 #0D0D0D",
              }}
            >
              Raih Masa Depanmu
            </span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "1rem",
              color: "#555",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Kami menawarkan berbagai program keahlian yang relevan dengan kebutuhan industri masa kini.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="jurusan-grid"
        >
          {jurusan.map((j, i) => (
            <div
              key={i}
              style={{
                background: j.color,
                border: "3px solid #0D0D0D",
                boxShadow: "6px 6px 0 #0D0D0D",
                padding: "28px",
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
              {/* Icon + kode */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "2.5rem",
                    background: "rgba(255,255,255,0.15)",
                    border: `2px solid ${j.textColor === "white" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"}`,
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {j.icon}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: j.textColor,
                    opacity: 0.4,
                    letterSpacing: "0.05em",
                  }}
                >
                  {j.kode}
                </span>
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: j.textColor,
                  marginBottom: "10px",
                  lineHeight: 1.3,
                }}
              >
                {j.nama}
              </h3>

              {/* Desc */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.875rem",
                  color: j.textColor,
                  opacity: 0.85,
                  lineHeight: 1.6,
                  marginBottom: "20px",
                }}
              >
                {j.desc}
              </p>

              {/* Skills tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {j.skills.map((skill, si) => (
                  <span
                    key={si}
                    style={{
                      padding: "3px 10px",
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      letterSpacing: "0.04em",
                      background: "rgba(255,255,255,0.2)",
                      border: `1px solid ${j.textColor === "white" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)"}`,
                      color: j.textColor,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA bottom */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a href="#kontak" className="brutal-btn brutal-btn-black" id="jurusan-cta">
            Konsultasi Jurusan Gratis →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .jurusan-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .jurusan-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
