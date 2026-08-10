"use client";
import Image from "next/image";

const links = [
  {
    title: "Tentang Kami",
    items: ["Profil Sekolah", "Visi & Misi", "Struktur Organisasi", "Tenaga Pendidik", "Fasilitas"],
  },
  {
    title: "Program",
    items: ["RPL", "TKJ", "DKV", "Teknik Elektronika", "Akuntansi", "Bisnis Digital"],
  },
  {
    title: "Informasi",
    items: ["PPDB 2025/2026", "Beasiswa", "Jadwal Kegiatan", "Pengumuman", "Download Formulir"],
  },
  {
    title: "Kontak",
    items: ["(021) 1234-5678", "+62 812-3456-7890", "info@smkplusmelati.sch.id", "Jl. Melati Raya No. 123", "Jakarta Selatan"],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      style={{
        background: "#0D0D0D",
        borderTop: "3px solid #FFE033",
      }}
    >
      {/* Top CTA Banner */}
      <div
        style={{
          background: "#FFE033",
          borderBottom: "3px solid #0D0D0D",
          padding: "32px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "#0D0D0D",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            Jangan Lewatkan PPDB 2025/2026! 🎓
          </div>
          <div
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "1rem",
              color: "#0D0D0D",
              opacity: 0.75,
              marginTop: "4px",
            }}
          >
            Kuota terbatas. Daftarkan dirimu sekarang dan raih masa depan cerah.
          </div>
        </div>
        <a
          href="#kontak"
          id="footer-cta"
          className="brutal-btn brutal-btn-black"
          style={{ flexShrink: 0 }}
        >
          Daftar Sekarang →
        </a>
      </div>

      {/* Main footer content */}
      <div className="container-brutal" style={{ padding: "60px 24px 40px" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "40px" }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  border: "2px solid #FFE033",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Logo SMK Plus Melati"
                  width={46}
                  height={46}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: "#FFE033",
                    lineHeight: 1,
                  }}
                >
                  SMK PLUS
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: "white",
                    lineHeight: 1,
                  }}
                >
                  MELATI
                </div>
              </div>
            </div>

            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                maxWidth: 240,
                marginBottom: "24px",
              }}
            >
              Sekolah menengah kejuruan unggulan yang mencetak generasi kompeten, berkarakter, dan siap kerja.
            </p>

            {/* Accreditation badge */}
            <div
              style={{
                display: "inline-block",
                background: "#FFE033",
                border: "2px solid #FFE033",
                padding: "8px 16px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  color: "#0D0D0D",
                  letterSpacing: "0.05em",
                }}
              >
                AKREDITASI A
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.65rem",
                  color: "#0D0D0D",
                  opacity: 0.7,
                }}
              >
                BAN-S/M
              </div>
            </div>
          </div>

          {/* Link columns */}
          {links.map((col, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#FFE033",
                  marginBottom: "16px",
                  paddingBottom: "8px",
                  borderBottom: "2px solid rgba(255,224,51,0.2)",
                }}
              >
                {col.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.items.map((item, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.65)",
                        textDecoration: "none",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "#FFE033";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "2px solid rgba(255,255,255,0.1)",
            marginTop: "48px",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            © {currentYear} SMK Plus Melati. Hak cipta dilindungi undang-undang.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Kebijakan Privasi", "Syarat & Ketentuan", "Peta Situs"].map((item, i) => (
              <a
                key={i}
                href="#"
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFE033"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
