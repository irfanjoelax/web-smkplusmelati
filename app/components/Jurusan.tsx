"use client";

const jurusan = [
  {
    icon: "🌐",
    kode: "TJKT",
    nama: "Teknik Jaringan Komputer & Telekomunikasi",
    desc: "Mempelajari instalasi jaringan komputer, administrasi server, telekomunikasi, cybersecurity, dan infrastruktur IT modern. Dilengkapi program sertifikasi MTCNA & TOEIC.",
    skills: ["Networking", "Server Admin", "Cybersecurity", "MTCNA", "TOEIC", "Digital Marketing"],
    color: "#1E6FD9",
    textColor: "white",
  },
  {
    icon: "🍳",
    kode: "KULINER",
    nama: "Kuliner",
    desc: "Program keahlian kuliner dengan kerjasama industri bersama perusahaan Boga & Hotel terkemuka di Kalimantan Timur. Tersedia jalur beasiswa dan peluang kerja langsung.",
    skills: ["Memasak", "Food Plating", "Pastry & Bakery", "Manajemen Dapur", "Kerjasama Industri"],
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
            Kami menyediakan 2 program keahlian unggulan yang relevan dengan kebutuhan industri di Kalimantan Timur.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px",
            maxWidth: 900,
            margin: "0 auto",
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
          @media (max-width: 640px) {
            .jurusan-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
    </section>
  );
}
