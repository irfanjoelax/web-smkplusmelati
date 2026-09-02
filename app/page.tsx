import type { Metadata } from "next";
import Link from "next/link";
import AnimatedNumber from "@/app/components/AnimatedNumber";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import LocalImage from "@/app/components/LocalImage";
import Reveal from "@/app/components/Reveal";
import SectionHeading from "@/app/components/SectionHeading";
import { Icon } from "@/app/lib/icons";
import { IMAGES } from "@/app/components/images";
import { CONTACT } from "@/app/components/site";
import { getBeranda } from "@/app/lib/content";
import JsonLd from "@/app/components/JsonLd";
import { websiteSchema } from "@/app/lib/seo";

export const revalidate = 60;

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

export default function Home() {
  const { stats, majors, programs, ekskulPreview, facilities } = getBeranda();
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
                    className="h-72 w-full rounded-[1.6rem] object-fill sm:h-96"
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
                        <Icon name={m.icon} className="h-8 w-8" />
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
                        <Icon name={p.icon} className="h-7 w-7" />
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
                      href="/hubungi-ppdb"
                      className="clay-btn clay-btn-accent"
                    >
                      Hubungi Panitia PPDB
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
                    className="h-80 w-full rounded-[1.6rem] object-fill"
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