"use client";
import { useState } from "react";

export default function Kontak() {
  const [form, setForm] = useState({ nama: "", email: "", telp: "", jurusan: "", pesan: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="kontak"
      className="section-padding"
      style={{ background: "#0D3B7A", borderBottom: "3px solid #0D0D0D" }}
    >
      <div className="container-brutal">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span
            className="brutal-tag"
            style={{ marginBottom: "16px", display: "inline-block" }}
          >
            Hubungi Kami
          </span>
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Siap Bergabung Bersama{" "}
            <span
              style={{
                background: "#FFE033",
                color: "#0D0D0D",
                padding: "0 10px",
                border: "2px solid #0D0D0D",
                boxShadow: "4px 4px 0 #0D0D0D",
              }}
            >
              Kami?
            </span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.75)",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Isi formulir di bawah ini atau hubungi kami langsung. Tim kami siap membantu kamu 24/7.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}
          className="kontak-grid"
        >
          {/* Contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: "📍", label: "Alamat", value: "Jl. Melati Raya No. 123, Jakarta Selatan, DKI Jakarta 12345" },
              { icon: "📞", label: "Telepon", value: "(021) 1234-5678" },
              { icon: "📱", label: "WhatsApp", value: "+62 812-3456-7890" },
              { icon: "📧", label: "Email", value: "info@smkplusmelati.sch.id" },
              { icon: "🕐", label: "Jam Layanan", value: "Senin – Jumat: 07.00 – 16.00 WIB" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "2px solid rgba(255,224,51,0.3)",
                  padding: "20px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,224,51,0.12)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#FFE033";
                  (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,224,51,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    width: 44,
                    height: 44,
                    background: "#FFE033",
                    border: "2px solid #0D0D0D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#FFE033",
                      marginBottom: "4px",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              {["Instagram", "YouTube", "Facebook", "TikTok"].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    padding: "8px 16px",
                    background: i === 0 ? "#FF3B3B" : i === 1 ? "#FF3B3B" : i === 2 ? "#1E6FD9" : "#0D0D0D",
                    border: "2px solid #0D0D0D",
                    color: "white",
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textDecoration: "none",
                    boxShadow: "3px 3px 0 rgba(0,0,0,0.3)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translate(3px,3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 rgba(0,0,0,0.3)";
                    (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            <div
              style={{
                background: "white",
                border: "3px solid #0D0D0D",
                boxShadow: "8px 8px 0 #0D0D0D",
                padding: "36px",
              }}
            >
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "16px" }}>✅</div>
                  <h3
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 800,
                      fontSize: "1.5rem",
                      color: "#0D0D0D",
                      marginBottom: "8px",
                    }}
                  >
                    Pesan Terkirim!
                  </h3>
                  <p style={{ color: "#555", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    Tim kami akan segera menghubungi kamu dalam 1x24 jam.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="brutal-btn brutal-btn-black"
                    style={{ marginTop: "24px" }}
                  >
                    Kirim Pesan Lagi
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 800,
                      fontSize: "1.25rem",
                      color: "#0D0D0D",
                      marginBottom: "8px",
                    }}
                  >
                    Formulir Pendaftaran / Konsultasi
                  </h3>

                  <div>
                    <label
                      style={{ display: "block", fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.04em", color: "#0D0D0D", marginBottom: "6px" }}
                    >
                      NAMA LENGKAP *
                    </label>
                    <input
                      id="form-nama"
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap"
                      className="brutal-input"
                      value={form.nama}
                      onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label
                        style={{ display: "block", fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.04em", color: "#0D0D0D", marginBottom: "6px" }}
                      >
                        EMAIL *
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        placeholder="email@contoh.com"
                        className="brutal-input"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label
                        style={{ display: "block", fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.04em", color: "#0D0D0D", marginBottom: "6px" }}
                      >
                        NO. TELEPON
                      </label>
                      <input
                        id="form-telp"
                        type="tel"
                        placeholder="08xx-xxxx-xxxx"
                        className="brutal-input"
                        value={form.telp}
                        onChange={(e) => setForm({ ...form, telp: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{ display: "block", fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.04em", color: "#0D0D0D", marginBottom: "6px" }}
                    >
                      PILIHAN JURUSAN
                    </label>
                    <select
                      id="form-jurusan"
                      className="brutal-input"
                      value={form.jurusan}
                      onChange={(e) => setForm({ ...form, jurusan: e.target.value })}
                    >
                      <option value="">-- Pilih Jurusan --</option>
                      <option value="tjkt">Teknik Jaringan Komputer &amp; Telekomunikasi (TJKT)</option>
                      <option value="kuliner">Kuliner</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{ display: "block", fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.04em", color: "#0D0D0D", marginBottom: "6px" }}
                    >
                      PESAN / PERTANYAAN
                    </label>
                    <textarea
                      id="form-pesan"
                      rows={4}
                      placeholder="Tuliskan pesan atau pertanyaan kamu..."
                      className="brutal-input"
                      style={{ resize: "vertical" }}
                      value={form.pesan}
                      onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                    />
                  </div>

                  <button
                    id="form-submit"
                    type="submit"
                    className="brutal-btn brutal-btn-yellow"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Kirim Pesan →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .kontak-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
