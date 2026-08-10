"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

/* ── Data ── */
const programs = [
  {
    icon: "💻",
    title: "Teknik Jaringan Komputer dan Telekomunikasi",
    short: "TJKT",
    desc: "Membangun infrastruktur jaringan, keamanan siber, dan administrasi sistem berbasis teknologi terkini.",
  },
  {
    icon: "🍳",
    title: "Tata Boga",
    short: "BOGA",
    desc: "Mencetak profesional kuliner yang menguasai seni pengolahan makanan, penyajian, dan manajemen industri boga.",
  },
];

const stats = [
  { value: "12+", label: "Tahun Berdiri", accent: false },
  { value: "1.200+", label: "Alumni Sukses", accent: true },
  { value: "95%", label: "Tingkat Kelulusan", accent: false },
  { value: "2", label: "Program Keahlian", accent: false },
];

const keunggulan = [
  { icon: "🏆", title: "Akreditasi A", desc: "Diakui secara nasional dengan akreditasi terbaik dari BAN-SM." },
  { icon: "🤝", title: "Kemitraan Industri", desc: "Kerja sama aktif dengan perusahaan lokal dan nasional untuk PKL siswa." },
  { icon: "🔬", title: "Lab Modern", desc: "Fasilitas laboratorium komputer, multimedia, dan kesehatan berstandar industri." },
  { icon: "📚", title: "Guru Berpengalaman", desc: "Tenaga pengajar bersertifikasi dengan pengalaman praktis di bidangnya." },
  { icon: "🌱", title: "Pengembangan Karakter", desc: "Program pembentukan karakter, kedisiplinan, dan kepemimpinan siswa." },
  { icon: "🎓", title: "Siap Kerja & Kuliah", desc: "Lulusan siap memasuki dunia kerja atau melanjutkan pendidikan tinggi." },
];

const navLinks = [
  { href: "#beranda", label: "Beranda" },
  { href: "#program", label: "Program" },
  { href: "#keunggulan", label: "Keunggulan" },
  { href: "#prestasi", label: "Prestasi" },
  { href: "#kontak", label: "Kontak" },
];

/* ── Component ── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav id="navbar" className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="container-site" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
          {/* Logo + Brand */}
          <a href="#beranda" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
            <Image
              src="/images/logo-smk.jpeg"
              alt="Logo SMK Plus Melati"
              width={44}
              height={44}
              style={{ objectFit: "contain", mixBlendMode: "multiply" }}
              priority
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.9375rem", color: "#1976d2", lineHeight: 1.2 }}>SMK Plus Melati</div>
              <div style={{ fontSize: "0.6875rem", color: "#6b7a90", fontWeight: 500 }}>Samarinda</div>
            </div>
          </a>

          {/* Desktop Links */}
          <ul style={{ display: "flex", gap: "0.25rem", listStyle: "none", alignItems: "center" }} className="nav-links-desktop">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} style={{ padding: "0.4rem 0.85rem", borderRadius: "6px", fontWeight: 500, fontSize: "0.9rem", color: "#374151", textDecoration: "none", transition: "background 0.15s, color 0.15s" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = "#e3f0fb"; (e.target as HTMLElement).style.color = "#1976d2"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = ""; (e.target as HTMLElement).style.color = "#374151"; }}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href="#kontak" className="btn-primary" style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}>
            Daftar Sekarang
          </a>

          {/* Mobile burger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: "#1976d2" }}
            className="burger-btn">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid #e8edf3", padding: "1rem 1.5rem" }} className="mobile-menu">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "0.6rem 0", fontWeight: 500, color: "#374151", textDecoration: "none", borderBottom: "1px solid #f1f5f9" }}>
                {l.label}
              </a>
            ))}
            <a href="#kontak" className="btn-primary" style={{ display: "inline-block", marginTop: "1rem", width: "100%", textAlign: "center" }}>
              Daftar Sekarang
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="beranda" style={{ paddingTop: "68px", background: "#fff" }}>
        <div className="container-site" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", minHeight: "calc(100vh - 68px)", padding: "5rem 1.5rem" }}>
          {/* Left */}
          <div className="animate-fade-in-up">
            <div className="badge" style={{ marginBottom: "1.25rem" }}>
              <span>🏫</span> SMK Plus Melati Samarinda
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, color: "#1a2332", marginBottom: "1rem", lineHeight: 1.15 }}>
              Pendidikan Vokasi{" "}
              <span style={{ color: "#1976d2" }}>Berkarakter</span>{" "}
              &amp;{" "}
              <span style={{ color: "#f5c518" }}>Berdaya Saing</span>
            </h1>
            <span className="accent-line" style={{ marginBottom: "1.25rem" }} />
            <p style={{ fontSize: "1.0625rem", color: "#6b7a90", lineHeight: 1.75, maxWidth: "480px", marginBottom: "2rem" }}>
              Mencetak lulusan siap kerja, inovatif, dan berakhlak mulia melalui kurikulum berbasis industri yang terintegrasi dengan teknologi masa kini.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#program" className="btn-primary">Lihat Program Keahlian</a>
              <a href="#keunggulan" className="btn-secondary">Keunggulan Kami</a>
            </div>
          </div>

          {/* Right — Foto Siswa */}
          <div className="animate-fade-in-up delay-200" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            {/* Decorative blue shape behind image */}
            <div style={{
              position: "absolute",
              top: "12px", right: "-12px",
              width: "100%", height: "100%",
              borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(25,118,210,0.12), rgba(245,197,24,0.1))",
              border: "1.5px solid rgba(25,118,210,0.15)",
              zIndex: 0,
            }} />
            {/* Photo card */}
            <div style={{
              position: "relative", zIndex: 1,
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 16px 48px rgba(25,118,210,0.18), 0 4px 16px rgba(0,0,0,0.08)",
              border: "3px solid rgba(25,118,210,0.15)",
              width: "100%",
              maxWidth: "460px",
            }}>
              <Image
                src="/images/siswa1-smk.png"
                alt="Siswa SMK Plus Melati Samarinda"
                width={460}
                height={380}
                style={{ objectFit: "cover", display: "block", width: "100%", height: "auto" }}
                priority
              />
              {/* Logo badge di pojok kanan bawah */}
              <div style={{
                position: "absolute", bottom: "14px", right: "14px",
                background: "rgba(255,255,255,0.92)",
                borderRadius: "10px",
                padding: "6px 10px",
                display: "flex", alignItems: "center", gap: "7px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                backdropFilter: "blur(6px)",
              }}>
                <Image src="/images/logo-smk.jpeg" alt="Logo SMK Plus Melati" width={28} height={28} style={{ objectFit: "contain", mixBlendMode: "multiply" }} />
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontWeight: 800, fontSize: "0.7rem", color: "#1976d2" }}>SMK Plus Melati</div>
                  <div style={{ fontSize: "0.625rem", color: "#6b7a90" }}>Samarinda</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: "#1976d2", padding: "3rem 0" }} className="circuit-bg">
        <div className="container-site" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }}>
          {stats.map((s, i) => (
            <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`stat-number${s.accent ? " accent" : ""}`} style={{ color: s.accent ? "#f5c518" : "#ffffff" }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", marginTop: "0.25rem", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROGRAM KEAHLIAN ── */}
      <section id="program" className="section-pad section-offwhite">
        <div className="container-site">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="badge" style={{ marginBottom: "0.75rem" }}>Program Keahlian</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#1a2332" }}>Pilih Jurusanmu,{" "}
              <span style={{ color: "#1976d2" }}>Raih Masa Depanmu</span>
            </h2>
            <span className="accent-line" style={{ margin: "0.75rem auto 0" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {programs.map((p, i) => (
              <div key={i} className="card animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                  <div className="icon-box" style={{ fontSize: "1.5rem" }}>{p.icon}</div>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1976d2", background: "#e3f0fb", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>{p.short}</span>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a2332", marginTop: "0.35rem" }}>{p.title}</h3>
                  </div>
                </div>
                <p style={{ fontSize: "0.9rem", color: "#6b7a90", lineHeight: 1.7 }}>{p.desc}</p>
                <a href="#kontak" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", marginTop: "1.25rem", fontWeight: 600, fontSize: "0.875rem", color: "#1976d2", textDecoration: "none" }}>
                  Selengkapnya <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEUNGGULAN ── */}
      <section id="keunggulan" className="section-pad section-white">
        <div className="container-site">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="badge" style={{ marginBottom: "0.75rem" }}>Mengapa SMK Plus Melati?</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#1a2332" }}>
              Keunggulan yang <span style={{ color: "#1976d2" }}>Membedakan Kami</span>
            </h2>
            <span className="accent-line" style={{ margin: "0.75rem auto 0" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {keunggulan.map((k, i) => (
              <div key={i} className="card animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div className="icon-box">{k.icon}</div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a2332", marginBottom: "0.35rem" }}>{k.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#6b7a90", lineHeight: 1.65 }}>{k.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESTASI / CTA BLUE ── */}
      <section id="prestasi" className="section-pad circuit-bg" style={{ background: "#1976d2" }}>
        <div className="container-site" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <div className="badge" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>Prestasi Siswa</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#ffffff", marginBottom: "1rem" }}>
              Mekar Bersama{" "}
              <span style={{ color: "#f5c518" }}>Prestasi &amp; Potensi</span>
            </h2>
            <span className="accent-line" style={{ background: "#f5c518", marginBottom: "1.25rem" }} />
            <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.75, fontSize: "1rem", marginBottom: "2rem" }}>
              Siswa SMK Plus Melati aktif berprestasi di tingkat kota, provinsi, hingga nasional. Kami percaya setiap siswa memiliki potensi unik yang perlu dikembangkan secara menyeluruh — akademik, keterampilan, dan karakter.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#kontak" className="btn-accent">Bergabung Sekarang</a>
              <a href="#program" className="btn-secondary" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)" }}>Pelajari Program</a>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { val: "50+", label: "Kejuaraan Diraih" },
              { val: "15+", label: "Mitra Industri" },
              { val: "98%", label: "Kepuasan Orang Tua" },
              { val: "100%", label: "Peserta UN Lulus" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.1)", borderRadius: "12px", padding: "1.5rem", textAlign: "center", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#f5c518" }}>{s.val}</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginTop: "0.25rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KONTAK ── */}
      <section id="kontak" className="section-pad section-offwhite">
        <div className="container-site" style={{ maxWidth: "720px", textAlign: "center" }}>
          <div className="badge" style={{ marginBottom: "0.75rem" }}>Hubungi Kami</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#1a2332", marginBottom: "0.5rem" }}>
            Siap Bergabung? <span style={{ color: "#1976d2" }}>Mari Bicara</span>
          </h2>
          <span className="accent-line" style={{ margin: "0.75rem auto 1.5rem" }} />
          <p style={{ color: "#6b7a90", lineHeight: 1.75, marginBottom: "2.5rem" }}>
            Kami siap menjawab pertanyaan Anda seputar penerimaan siswa baru, program keahlian, dan informasi lainnya.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "2.5rem" }}>
            {[
              { icon: "📍", label: "Alamat", val: "Jl. Pangeran Antasari, Samarinda, Kalimantan Timur" },
              { icon: "📞", label: "Telepon", val: "(0541) 123-4567" },
              { icon: "✉️", label: "Email", val: "info@smkplusmelati.sch.id" },
            ].map((c, i) => (
              <div key={i} className="card" style={{ textAlign: "center", padding: "1.25rem" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{c.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#1976d2", marginBottom: "0.25rem" }}>{c.label}</div>
                <div style={{ fontSize: "0.825rem", color: "#6b7a90" }}>{c.val}</div>
              </div>
            ))}
          </div>

          <a href="mailto:info@smkplusmelati.sch.id" className="btn-primary" style={{ fontSize: "1rem", padding: "0.875rem 2.5rem" }}>
            Kirim Pesan Sekarang
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#1a2332", color: "rgba(255,255,255,0.7)", padding: "3rem 0" }}>
        <div className="container-site">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "2.5rem" }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ background: "#fff", padding: "4px", borderRadius: "8px", display: "flex" }}>
                  <Image src="/images/logo-smk.jpeg" alt="Logo SMK Plus Melati" width={40} height={40} style={{ objectFit: "contain", mixBlendMode: "multiply" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#fff" }}>SMK Plus Melati</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Samarinda</div>
                </div>
              </div>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.75, maxWidth: "320px" }}>
                Mencetak generasi unggul yang siap kerja, inovatif, dan berkarakter mulia untuk masa depan Indonesia.
              </p>
            </div>
            {/* Links */}
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "1rem", fontSize: "0.9375rem" }}>Navigasi</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = "#f5c518"}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)"}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Program */}
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "1rem", fontSize: "0.9375rem" }}>Program</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {programs.map((p) => (
                  <li key={p.short}>
                    <a href="#program" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = "#f5c518"}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)"}>
                      {p.short} — {p.title.split(" ").slice(0, 3).join(" ")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <p style={{ fontSize: "0.8125rem" }}>© 2024 SMK Plus Melati Samarinda. Hak Cipta Dilindungi.</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1976d2", display: "inline-block" }} />
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f5c518", display: "inline-block" }} />
            </div>
          </div>
        </div>
      </footer>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 900px) {
          #hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          #hero-right { display: none !important; }
          #stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          #prestasi-grid { grid-template-columns: 1fr !important; }
          #footer-grid { grid-template-columns: 1fr !important; }
          #kontak-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .burger-btn { display: flex !important; }
          .btn-primary[href="#kontak"]:not(.mobile-menu *) { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
