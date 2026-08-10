"use client";

const pengumuman = [
  {
    tanggal: "08 Agt 2025",
    kategori: "PPDB",
    judul: "Penerimaan Peserta Didik Baru Tahun Ajaran 2025/2026 Dibuka",
    desc: "Pendaftaran siswa baru telah resmi dibuka. Kuota terbatas, segera daftar sebelum penuh. Tersedia beasiswa untuk siswa berprestasi.",
    penting: true,
  },
  {
    tanggal: "05 Agt 2025",
    kategori: "Prestasi",
    judul: "Siswa SMK Plus Melati Raih Juara 1 LKS Tingkat Provinsi",
    desc: "Selamat kepada Tim RPL kami yang berhasil meraih medali emas dalam Lomba Kompetensi Siswa (LKS) bidang Web Technology.",
    penting: false,
  },
  {
    tanggal: "01 Agt 2025",
    kategori: "Akademik",
    judul: "Jadwal Ujian Semester Gasal 2025/2026 Telah Diterbitkan",
    desc: "Jadwal ujian akhir semester gasal telah resmi diterbitkan. Siswa dapat mengunduh melalui portal siswa atau menghubungi wali kelas.",
    penting: false,
  },
  {
    tanggal: "25 Jul 2025",
    kategori: "Beasiswa",
    judul: "Program Beasiswa Prestasi Semester Baru Dibuka Kembali",
    desc: "Beasiswa penuh tersedia bagi siswa dengan prestasi akademik terbaik. Batas pendaftaran 30 Agustus 2025.",
    penting: true,
  },
  {
    tanggal: "20 Jul 2025",
    kategori: "Kegiatan",
    judul: "Pelatihan Sertifikasi Kompetensi Microsoft & Cisco",
    desc: "Kerjasama dengan Microsoft dan Cisco, siswa TKJ dan RPL berkesempatan mengikuti ujian sertifikasi internasional secara gratis.",
    penting: false,
  },
];

const kategoriColor: Record<string, { bg: string; text: string }> = {
  PPDB:      { bg: "#FF3B3B", text: "white" },
  Prestasi:  { bg: "#FFE033", text: "#0D0D0D" },
  Akademik:  { bg: "#0D3B7A", text: "white" },
  Beasiswa:  { bg: "#0D0D0D", text: "#FFE033" },
  Kegiatan:  { bg: "#1E6FD9", text: "white" },
};

export default function Pengumuman() {
  return (
    <section
      id="pengumuman"
      className="section-padding"
      style={{ background: "#FFFFF0", borderBottom: "3px solid #0D0D0D" }}
    >
      <div className="container-brutal">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span className="brutal-tag" style={{ marginBottom: "16px", display: "inline-block" }}>
              Berita & Info
            </span>
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
              Pengumuman{" "}
              <span
                style={{
                  display: "inline-block",
                  background: "#FF3B3B",
                  color: "white",
                  padding: "0 10px",
                  border: "2px solid #0D0D0D",
                  boxShadow: "4px 4px 0 #0D0D0D",
                }}
              >
                Terbaru
              </span>
            </h2>
          </div>
          <a
            href="#"
            id="lihat-semua-pengumuman"
            className="brutal-btn brutal-btn-black"
            style={{ padding: "10px 20px", fontSize: "0.875rem" }}
          >
            Lihat Semua →
          </a>
        </div>

        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {pengumuman.map((p, i) => {
            const kat = kategoriColor[p.kategori] || { bg: "#0D0D0D", text: "white" };
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  borderTop: i === 0 ? "3px solid #0D0D0D" : "none",
                  borderLeft: "3px solid #0D0D0D",
                  borderRight: "3px solid #0D0D0D",
                  borderBottom: "3px solid #0D0D0D",
                  background: p.penting ? "#FFFBDE" : "white",
                  transition: "background 0.15s ease",
                  cursor: "pointer",
                }}
                className="pengumuman-row"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#FFE033";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = p.penting ? "#FFFBDE" : "white";
                }}
              >
                {/* Date column */}
                <div
                  style={{
                    background: kat.bg,
                    padding: "20px 16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: "3px solid #0D0D0D",
                    textAlign: "center",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      color: kat.text,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.kategori}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.75rem",
                      color: kat.text,
                      opacity: 0.8,
                    }}
                  >
                    {p.tanggal}
                  </span>
                  {p.penting && (
                    <span
                      style={{
                        padding: "2px 8px",
                        background: "rgba(255,255,255,0.25)",
                        border: `1px solid ${kat.text}`,
                        color: kat.text,
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      PENTING
                    </span>
                  )}
                </div>

                {/* Content column */}
                <div style={{ padding: "20px 24px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "#0D0D0D",
                      marginBottom: "8px",
                      lineHeight: 1.3,
                    }}
                  >
                    {p.judul}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.875rem",
                      color: "#444",
                      lineHeight: 1.6,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
