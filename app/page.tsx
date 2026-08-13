import type { Metadata } from "next";
import Link from "next/link";
import AnimatedNumber from "@/app/components/AnimatedNumber";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import LocalImage from "@/app/components/LocalImage";
import Reveal from "@/app/components/Reveal";
import SectionHeading from "@/app/components/SectionHeading";
import { IMAGES } from "@/app/components/images";
import { CONTACT } from "@/app/components/site";
import JsonLd from "@/app/components/JsonLd";
import { websiteSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  description:
    "Sekolah SMK swasta keunggulan di Samarinda Seberang. Jurusan TKJ dan Tata Boga, program asrama, keagamaan, prestasi siswa, dan PPDB 2026.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "SMK Plus Melati Samarinda — Sekolah Kewirausahaan yang Bertakwa",
    description:
      "Sekolah SMK swasta keunggulan di Samarinda Seberang. Jurusan TKJ dan Tata Boga, program asrama, keagamaan, prestasi siswa, dan PPDB 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMK Plus Melati Samarinda — Sekolah Kewirausahaan yang Bertakwa",
    description:
      "Sekolah SMK swasta keunggulan di Samarinda Seberang. Jurusan TKJ dan Tata Boga, program asrama, keagamaan, prestasi siswa, dan PPDB 2026.",
  },
};

const majors = [
  {
    title: "TKJ",
    full: "Teknik Komputer & Jaringan",
    desc: "Menguasai jaringan komputer, administrasi server, dan teknologi informasi berbasis Mikrotik.",
    href: "/jurusan/tkj",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
      </svg>
    ),
  },
  {
    title: "Tata Boga",
    full: "Seni & Industri Kuliner",
    desc: "Mengasah seni memasak, penyajian menarik, dan nilai jual produk kuliner profesional.",
    href: "/jurusan/tata-boga",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 3c-1 2-2 4-2 6a4 4 0 008 0c0-2-1-4-2-6M4 20h16M12 13v5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16" />
      </svg>
    ),
  },
];

const programs = [
  {
    title: "Program Pelatihan",
    desc: "Pembuatan aplikasi Android & pencetak wirausaha dengan praktik langsung.",
    href: "/program-pelatihan",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Program Asrama",
    desc: "Kedisiplinan, apel pagi/sore/malam, dan pembinaan karakter melalui kebersamaan.",
    href: "/program-asrama",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    title: "Program Keagamaan",
    desc: "Sholat dhuha, mengaji pagi, khataman Al-Qur'an, dan perayaan hari besar.",
    href: "/program-keagamaan",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 3-4 4.5-4 8a4 4 0 008 0c0-3.5-2.5-5-4-8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v6M9 21h6" />
      </svg>
    ),
  },
  {
    title: "Prestasi Siswa",
    desc: "Sertifikasi internasional TOEIC dan MTCNA sebagai bukti kemampuan siswa.",
    href: "/prestasi-siswa",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
  },
];

const stats = [
  { value: 30, suffix: "+", label: "Tahun Yayasan Melati" },
  { value: 2, suffix: "", label: "Jurusan Keunggulan" },
  { value: 7, suffix: "+", label: "Ekskul Aktif" },
  { value: 100, suffix: "%", label: "Praktik & Teori" },
];

const ekskulPreview = [
  { name: "PodSchool", href: "/ekskul", image: IMAGES.podschoool },
  { name: "Konten Kreator", href: "/ekskul", image: IMAGES.kontenKreator },
  { name: "Desain Grafis", href: "/ekskul", image: IMAGES.desainGrafis },
  { name: "Pramuka", href: "/ekskul", image: IMAGES.pramuka },
];

const facilities = [
  { name: "Ruang Kelas Ber-AC", image: IMAGES.ruangKelas },
  { name: "Masjid Qiwamul Ummah", image: IMAGES.masjid },
  { name: "Kolam Renang", image: IMAGES.kolamRenang },
  { name: "Gedung Auditorium", image: IMAGES.auditorium },
];

export default function Home() {
  return (
    <>
      <Header />
      <JsonLd data={websiteSchema()} />

      <main className="flex-1">
        {/* ===== HERO — dominan biru ===== */}
        <section className="px-4 pt-10 sm:pt-14">
          <div className="clay-card-blue relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem]">
            <span className="clay-orb h-40 w-40 -right-12 -top-12 animate-float-orb opacity-90" />
            <span className="clay-orb-ghost h-48 w-48 -left-16 -top-20" />
            <span className="clay-blob h-64 w-64 -bottom-20 -right-16 animate-blob-morph" />

            <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-14">
              <Reveal className="text-center lg:text-left">
                <span className="clay-chip-blue mx-auto mb-5 lg:mx-0">
                  👋 Selamat Datang di
                </span>
                <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                  SMK Plus Melati{" "}
                  <span className="bg-gradient-to-r from-accent via-[#ffd766] to-accent bg-clip-text text-transparent">
                    Samarinda
                  </span>
                </h1>
                <p className="mt-4 text-lg font-extrabold tracking-wider text-accent">
Sekolah Kewirausahaan yang Bertakwa
                </p>
                <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/85 lg:mx-0">
                  Sekolah SMK Swasta Keunggulan di Samarinda Seberang. Mencetak
                  SDM bermutu dengan sikap dan akhlak yang mulia, siap bersaing
                  di dunia industri.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link href="/ppdb" className="clay-btn clay-btn-accent">
                    PPDB 2026
                  </Link>
                  <Link href="/hubungi-kami" className="clay-btn clay-btn-light">
                    Jelajah Sekolah
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={120} className="relative mx-auto w-full max-w-md">
                <div className="clay-inset overflow-hidden rounded-[2rem] p-2">
                  <LocalImage
                    src={IMAGES.hero}
                    alt="Suasana SMK Plus Melati Samarinda"
                    width={1280}
                    height={800}
                    className="h-72 w-full rounded-[1.6rem] object-cover sm:h-96"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== STATS — band putih dengan tile inset ===== */}
        <section className="px-4 pt-14">
          <Reveal>
            <ClayCard className="relative mx-auto max-w-6xl overflow-hidden p-6 sm:p-8">
              <span className="clay-orb-ghost h-32 w-32 -right-10 -top-10 opacity-70" />
              <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="clay-inset relative overflow-hidden rounded-3xl p-6 text-center"
                  >
                    <span className="clay-orb-ghost h-16 w-16 -right-6 -top-6 opacity-60" />
                    <p className="text-3xl font-extrabold text-primary">
                      <AnimatedNumber value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground/60">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </ClayCard>
          </Reveal>
        </section>

        {/* ===== JURUSAN ===== */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Bidang Keahlian"
              title="Jurusan Sesuai Zaman"
              description="Beragam pilihan bidang keahlian yang sesuai dengan perkembangan era modern dan permintaan industri."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {majors.map((m, i) => (
                <Reveal key={m.title} delay={i * 80}>
                  <Link href={m.href} className="group">
                    <ClayCard hover className="relative flex h-full items-center gap-6 overflow-hidden p-8">
                      <span className="clay-chip-gold absolute right-5 top-5 !text-xs">
                        0{i + 1}
                      </span>
                      <span className="clay-inset flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-primary transition-transform duration-300 group-hover:scale-105">
                        {m.icon}
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-accent-dark">
                          {m.full}
                        </p>
                        <p className="mt-0.5 text-2xl font-extrabold text-primary-dark group-hover:text-primary">
                          {m.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                          {m.desc}
                        </p>
                      </div>
                    </ClayCard>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROGRAM UNGGULAN — band biru ===== */}
        <section className="px-4 pb-20">
          <ClayCard
            variant="blue"
            className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem]"
          >
            <span className="clay-orb h-44 w-44 -right-14 -top-14 animate-float-orb opacity-90" />
            <span className="clay-orb-ghost h-64 w-64 -left-20 -bottom-24 opacity-70" />
            <span className="clay-blob h-72 w-72 -top-20 left-1/3 animate-blob-morph opacity-40" />

            <div className="relative px-6 py-14 sm:px-10 lg:px-14">
              <SectionHeading
                variant="dark"
                eyebrow="Program Unggulan"
                title="Lebih dari Sekadar Belajar"
                description="Pembinaan karakter, keagamaan, dan keterampilan kewirausahaan menjadi nilai lebih siswa SMK Plus Melati."
              />
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {programs.map((p) => (
                  <Link key={p.title} href={p.href} className="group">
                    <ClayCard
                      hover
                      className="relative flex h-full flex-col overflow-hidden p-6"
                    >
                      <span className="clay-inset flex h-14 w-14 items-center justify-center rounded-2xl text-primary transition-transform duration-300 group-hover:scale-105">
                        {p.icon}
                      </span>
                      <h3 className="mt-5 text-lg font-extrabold text-primary-dark group-hover:text-primary">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                        {p.desc}
                      </p>
                      <p className="mt-5 text-sm font-bold text-primary transition-transform duration-300 group-hover:translate-x-1">
                        Selengkapnya →
                      </p>
                    </ClayCard>
                  </Link>
                ))}
              </div>
            </div>
          </ClayCard>
        </section>

        {/* ===== EKSKUL PREVIEW ===== */}
        <section className="px-4 pb-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Ekskul"
              title="Kreativitas Tanpa Batas"
              description="Wadah mengembangkan bakat dan minat siswa, dari podcast, desain grafis, hingga e-sport."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ekskulPreview.map((e, i) => (
                <Reveal key={e.name} delay={i * 80}>
                  <Link href={e.href} className="group">
                    <ClayCard hover className="overflow-hidden p-3">
                      <div className="overflow-hidden rounded-[1.4rem] bg-primary-soft/60">
                        <LocalImage
                          src={e.image}
                          alt={e.name}
                          width={640}
                          height={400}
                          className="h-44 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="flex items-center justify-center gap-2 px-2 py-3 text-center text-sm font-extrabold text-primary-dark">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        {e.name}
                      </p>
                    </ClayCard>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FASILITAS PREVIEW ===== */}
        <section className="px-4 pb-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Fasilitas"
              title="Lingkungan Belajar Nyaman"
              description="Ruang ber-AC, masjid, auditorium, kolam renang, hingga berbagai lapangan olahraga."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {facilities.map((f, i) => (
                <Reveal key={f.name} delay={i * 80}>
                  <Link href="/fasilitas" className="group">
                    <ClayCard hover className="overflow-hidden p-3">
                      <div className="overflow-hidden rounded-[1.4rem] bg-primary-soft/60">
                        <LocalImage
                          src={f.image}
                          alt={f.name}
                          width={640}
                          height={400}
                          className="h-44 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="flex items-center justify-center gap-2 px-2 py-3 text-center text-sm font-extrabold text-primary-dark">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        {f.name}
                      </p>
                    </ClayCard>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA PPDB — panel biru ===== */}
        <section className="px-4 pb-24">
          <Reveal>
            <ClayCard
              variant="blue"
              className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem]"
            >
              <span className="clay-orb h-44 w-44 -left-14 -bottom-14 animate-float-orb opacity-80" />
              <span className="clay-orb-ghost h-56 w-56 -right-16 -top-16 opacity-70" />

              <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-14">
                <div>
                  <span className="clay-chip-blue mb-4">
                    Penerimaan Peserta Didik Baru
                  </span>
                  <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                    Wujudkan Masa Depanmu Bersama{" "}
                    <span className="bg-gradient-to-r from-accent via-[#ffd766] to-accent bg-clip-text text-transparent">
                      SMK Plus Melati
                    </span>
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-white/85">
                    Daftar secara online dengan mudah, cepat, dan bisa dilakukan
                    di mana pun serta kapan pun melalui PPDB Online SMK Plus
                    Melati.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={CONTACT.ppdbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay-btn clay-btn-accent"
                    >
                      Menuju Link PPDB
                    </a>
                    <Link href="/ppdb" className="clay-btn clay-btn-light">
                      Lihat Prosedur
                    </Link>
                  </div>
                </div>
                <div className="clay-inset hidden overflow-hidden rounded-[2rem] p-2 lg:block">
                  <LocalImage
                    src={IMAGES.ppdb1}
                    alt="PPDB SMK Plus Melati"
                    width={1280}
                    height={800}
                    className="h-80 w-full rounded-[1.6rem] object-cover"
                  />
                </div>
              </div>
            </ClayCard>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}