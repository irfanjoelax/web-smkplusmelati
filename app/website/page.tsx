import Image from "next/image";
import Link from "next/link";
import AnimatedNumber from "@/app/components/AnimatedNumber";
import ClayCard from "@/app/components/ClayCard";
import CyberSlider from "@/app/components/CyberSlider";
import LocalImage from "@/app/components/LocalImage";
import Reveal from "@/app/components/Reveal";
import { CONTACT, SOCIALS } from "@/app/components/site";
import { getContent } from "@/app/lib/content";
import { getJurusanData } from "@/app/lib/jurusan";
import { getProgramData } from "@/app/lib/program";
import type { EkskulItem, FasilitasItem, Prestasi, Teacher } from "@/app/lib/types";

export const revalidate = 60;

const majorFallbacks: Record<string, string> = {
  tjkt: "/images/website/jurusan-tjkt.jpg",
  kuliner: "/images/website/jurusan-kuliner.jpg",
};

const programFallbacks: Record<string, string> = {
  pelatihan: "/images/website/pengalaman-workshop.png",
  asrama: "/images/asrama-sholat.jpg",
  keagamaan: "/images/mengaji.jpg",
};

const benefits = [
  {
    number: "01",
    tag: "PRAKTIK 60%",
    title: "Vokasi & Keahlian Terapan",
    text: "Porsi 60% kurikulum fokus pada praktik langsung di bengkel kerja berstandar teknologi industri terkini.",
  },
  {
    number: "02",
    tag: "ERA DIGITAL",
    title: "Jurusan Berorientasi Masa Depan",
    text: "Teknik Jaringan Komputer & Telekomunikasi (TJKT) serta Kuliner / Gastronomi Kreatif berbasis digital.",
  },
  {
    number: "03",
    tag: "KARAKTER & MORAL",
    title: "Kedisiplinan & Nilai Luhur",
    text: "Program asrama dan pembinaan keagamaan membentuk integritas, kepemimpinan, dan akhlak mulia.",
  },
  {
    number: "04",
    tag: "KREATIVITAS 4.0",
    title: "Inovasi & Bakat Digital",
    text: "Wadah minat bakat modern mulai dari podcasting studio, desain grafis, hingga kompetisi e-sport.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
  center = true,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : "text-left"}`}>
      <span className={light ? "clay-chip-blue" : "clay-chip-gold"}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse mr-1" />
        {eyebrow}
      </span>
      <h2
        className={`mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-primary-darker"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mt-4 text-pretty text-base leading-relaxed sm:text-lg ${
            light ? "text-white/80" : "text-foreground/70"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

export default async function WebsiteLandingPage() {
  const [majors, programs, facilities, teachers, achievement, extracurriculars] = await Promise.all([
    getJurusanData(),
    getProgramData(),
    getContent<FasilitasItem[]>("fasilitas"),
    getContent<Teacher[]>("guru"),
    getContent<Prestasi>("prestasi"),
    getContent<EkskulItem[]>("ekskul"),
  ]);

  const featuredTeachers = teachers
    .filter((teacher) => teacher.name.trim().length > 3 && teacher.role.trim().length > 3)
    .slice(0, 3);
  const featuredExtracurriculars = extracurriculars
    .filter((item) => !item.title.toLowerCase().includes("tttt"));
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;

  return (
    <main className="overflow-x-hidden bg-primary-soft text-foreground selection:bg-accent selection:text-primary-darker">
      {/* =========================================================================
          HERO SECTION — High Impact Blue Header
      ========================================================================= */}
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-primary-darker px-4 pb-20 pt-6 text-white sm:px-6 lg:pb-28">
        {/* Glow ambient background matching home */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(63,151,216,0.45),transparent_32%),radial-gradient(circle_at_10%_80%,rgba(245,179,1,0.16),transparent_28%)]" />
        <span className="clay-orb-ghost -right-24 top-24 h-80 w-80 opacity-40" />
        <span className="clay-orb-ghost -left-24 bottom-4 h-64 w-64 opacity-30" />

        <div className="relative mx-auto max-w-6xl">
          {/* Futuristic Floating Header */}
          <nav className="flex items-center justify-between gap-4 rounded-full border border-white/20 bg-white/10 px-5 py-3 shadow-lg backdrop-blur-md">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1 shadow-md shadow-primary-darker/50 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo melati.png"
                  alt="Logo SMK Plus Melati Samarinda"
                  width={38}
                  height={38}
                  className="h-full w-full object-contain"
                />
              </span>
              <div className="hidden sm:block">
                <p className="text-sm font-extrabold leading-tight text-white">
                  SMK Plus Melati
                </p>
                <p className="text-xs font-bold text-accent">
                  Samarinda • Vokasi Unggulan
                </p>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-extrabold text-accent md:inline-flex">
                <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
                STATUS: SPMB OPEN
              </span>
              <Link
                href="/spmb"
                className="clay-btn clay-btn-accent !px-4 !py-2 text-xs font-extrabold shadow-lg"
              >
                Daftar SPMB 2026
              </Link>
            </div>
          </nav>

          {/* Hero Content Grid */}
          <div className="grid items-center gap-12 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-20">
            <Reveal>
              <span className="clay-chip-blue">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse mr-1" />
                SMK Wirausaha Muda & Vokasi Unggulan
              </span>

              <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Masa Depanmu Dimulai dari{" "}
                <span className="bg-gradient-to-r from-accent via-[#ffd766] to-accent bg-clip-text text-transparent">
                  Pilihan Hari Ini.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Gerbang menuju dunia industri dan wirausaha modern. Kurikulum berbasis praktik kejuruan, pembinaan karakter Islami, dan lingkungan belajar serba terpadu.
              </p>

              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Link
                  href="/spmb"
                  className="clay-btn clay-btn-accent min-h-12 text-center text-sm font-extrabold transition-transform hover:scale-105"
                >
                  Daftar SPMB Online
                </Link>
                <Link
                  href="/profil"
                  className="clay-btn clay-btn-light min-h-12 text-center text-sm font-extrabold transition-transform hover:scale-105"
                >
                  Kenali Sekolah
                </Link>
              </div>

              {/* Stats Matrix Clay Style */}
              <div className="mt-12 grid grid-cols-3 gap-3.5 border-t border-white/15 pt-8">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
                  <p className="text-3xl font-extrabold text-accent">
                    <AnimatedNumber value="2" />
                  </p>
                  <p className="mt-1 text-xs font-bold text-white/75">Jurusan Utama</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
                  <p className="text-3xl font-extrabold text-white">
                    <AnimatedNumber value="3" />
                  </p>
                  <p className="mt-1 text-xs font-bold text-white/75">Program Unggulan</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md">
                  <p className="text-3xl font-extrabold text-accent">
                    <AnimatedNumber value="7+" />
                  </p>
                  <p className="mt-1 text-xs font-bold text-white/75">Kegiatan Siswa</p>
                </div>
              </div>
            </Reveal>

            {/* Floating Visual Hero */}
            <Reveal delay={120}>
              <div className="relative mx-auto w-full max-w-md animate-float-slow lg:max-w-none">
                <div className="relative rounded-[2.5rem] border border-white/25 bg-white/12 p-3 shadow-2xl backdrop-blur-xl">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-primary-dark">
                    <LocalImage
                      src="/images/website/hero.jpg"
                      alt="Kegiatan siswa SMK Plus Melati Samarinda"
                      width={900}
                      height={1125}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-darker/90 via-transparent to-transparent" />
                    
                    {/* Floating Hero Badge */}
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-primary-darker/70 p-4 shadow-xl backdrop-blur-md">
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary-darker font-extrabold">
                          ★
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-extrabold uppercase tracking-widest text-accent">
                            SMK Wirausaha Muda
                          </p>
                          <p className="truncate text-sm font-extrabold text-white">
                            SMK Plus Melati Samarinda
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BENEFITS SECTION — Clay Cards
      ========================================================================= */}
      <section id="keunggulan" className="relative px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Keunggulan Utama"
              title="Visi Masa Depan untuk Generasi Berdaya Saing"
              text="Pendidikan kejuruan terpadu yang memadukan keahlian praktis, wawasan industri, dan pembinaan karakter kuat."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <ClayCard hover className="flex h-full flex-col justify-between p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-extrabold leading-none text-accent drop-shadow-sm">
                        {item.number}
                      </span>
                      <span className="rounded-full border border-primary/20 bg-primary-soft px-2.5 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-primary-dark">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold text-primary-darker">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                      {item.text}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-primary/10 pt-4">
                    <span className="text-xs font-bold text-primary">
                      Standar Vokasi Unggulan
                    </span>
                  </div>
                </ClayCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAJORS SECTION — Pilihan Jurusan
      ========================================================================= */}
      <section className="relative px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl rounded-[2.75rem] bg-primary-darker px-6 py-16 shadow-2xl sm:px-10 lg:px-16">
          <Reveal>
            <SectionHeading
              light
              eyebrow="Bidang Keahlian"
              title="Pilih Jurusan yang Relevan dengan Industri"
              text="Laboratorium canggih, bengkel kerja modern, dan instruktur berpengalaman mendampingi proses belajarmu."
            />
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {majors.slice(0, 2).map((major, index) => (
              <Reveal key={major.id} delay={index * 90}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[2.25rem] border border-white/20 bg-white/10 p-3.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-primary-dark">
                    <LocalImage
                      src={major.image || majorFallbacks[major.id] || ""}
                      alt={`Kegiatan jurusan ${major.fullName}`}
                      width={900}
                      height={560}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 text-white sm:p-6">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-accent">
                      Jurusan Unggulan 0{index + 1}
                    </span>
                    <h3 className="mt-2 text-2xl font-extrabold leading-tight text-white">
                      {major.fullName}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                      {major.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {major.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-8">
                      <Link
                        href={`/jurusan/${major.id}`}
                        className="clay-btn clay-btn-accent inline-flex w-full text-center text-sm font-extrabold shadow-lg sm:w-auto"
                      >
                        Pelajari Jurusan {major.name}
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PROGRAMS SECTION — Slider Interaktif Program
      ========================================================================= */}
      <section className="relative px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Program Terpadu"
              title="Pengalaman Belajar Komprehensif"
              text="Geser untuk menjelajahi program pelatihan intensif, asrama disiplin, dan pembinaan karakter keagamaan."
            />
          </Reveal>

          <div className="mt-14">
            <CyberSlider totalItems={programs.length}>
              {programs.map((program, index) => (
                <div
                  key={program.id}
                  className="w-full shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
                >
                  <Link
                    href={`/program-${program.id}`}
                    className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <ClayCard hover className="flex h-full flex-col overflow-hidden p-3.5">
                      <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-primary-soft">
                        <LocalImage
                          src={program.cards[0]?.image || programFallbacks[program.id] || ""}
                          alt={program.title}
                          width={700}
                          height={440}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-accent-dark">
                          Program 0{index + 1}
                        </span>
                        <h3 className="mt-1 text-xl font-extrabold text-primary-darker group-hover:text-primary">
                          {program.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                          {program.summary}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-extrabold text-primary">
                          Lihat Selengkapnya
                        </span>
                      </div>
                    </ClayCard>
                  </Link>
                </div>
              ))}
            </CyberSlider>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FACILITIES & TEACHERS SECTION (Slider Interaktif Fasilitas)
      ========================================================================= */}
      <section className="relative bg-white/50 px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Infrastruktur & Pendidik"
              title="Fasilitas Lengkap & Guru Ahli"
              text="Geser galeri fasilitas untuk melihat sarana praktikum kejuruan, olahraga, dan ruang belajar modern."
            />
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            {/* Interactive Fasilitas Slider */}
            <div className="w-full">
              <CyberSlider totalItems={facilities.length}>
                {facilities.map((facility) => (
                  <div
                    key={facility.title}
                    className="w-full shrink-0 snap-start sm:w-[calc(50%-0.625rem)]"
                  >
                    <ClayCard hover className="h-full overflow-hidden p-3">
                      <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-primary-soft/40">
                        <LocalImage
                          src={facility.image}
                          alt={facility.title}
                          width={640}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-extrabold text-primary-darker">
                          {facility.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                          {facility.description}
                        </p>
                      </div>
                    </ClayCard>
                  </div>
                ))}
              </CyberSlider>
            </div>

            {/* Pendidik Panel */}
            <Reveal delay={100}>
              <ClayCard variant="blue" className="flex h-full flex-col justify-between p-7 sm:p-8">
                <div>
                  <span className="clay-chip-blue">Pendidik Vokasi</span>
                  <h3 className="mt-5 text-2xl font-extrabold text-white">
                    Belajar Bersama Guru Kami
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/85">
                    Guru dan instruktur kompeten siap mengarahkan potensi siswa menuju pencapaian terbaik.
                  </p>

                  <div className="mt-6 space-y-3">
                    {featuredTeachers.map((teacher) => (
                      <div
                        key={teacher.name}
                        className="flex items-center gap-3.5 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-md"
                      >
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/15">
                          <LocalImage
                            src={teacher.image}
                            alt={teacher.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-white">
                            {teacher.name}
                          </p>
                          <p className="truncate text-xs text-white/70">
                            {teacher.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/fasilitas" className="clay-btn clay-btn-accent text-xs font-extrabold">
                    Lihat Fasilitas
                  </Link>
                  <Link href="/guru" className="clay-btn clay-btn-light text-xs font-extrabold">
                    Daftar Guru
                  </Link>
                </div>
              </ClayCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ACHIEVEMENT / SERTIFIKASI SECTION
      ========================================================================= */}
      <section className="relative px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Standar Kompetensi"
              title="Bukti Nyata Kualitas Pembelajaran"
              text="Pengakuan sertifikasi dan prestasi menjadi tolok ukur kesiapan siswa di dunia kerja."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {achievement.items.slice(0, 2).map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <ClayCard className="grid h-full overflow-hidden p-3.5 sm:grid-cols-[0.85fr_1.15fr]">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-primary-soft sm:aspect-auto sm:min-h-56">
                    <LocalImage
                      src={item.image}
                      alt={item.title}
                      width={520}
                      height={560}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-5">
                    <div>
                      <span className="clay-chip-gold">Sertifikasi</span>
                      <h3 className="mt-4 text-xl font-extrabold text-primary-darker">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                        {item.description}
                      </p>
                    </div>
                    <p className="mt-4 text-xs font-bold text-foreground/45">
                      Kurikulum & sertifikasi resmi sekolah.
                    </p>
                  </div>
                </ClayCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/prestasi-siswa" className="clay-btn text-sm font-extrabold">
              Lihat Semua Prestasi
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXTRACURRICULAR SECTION (Slider Interaktif Ekskul)
      ========================================================================= */}
      <section className="relative px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Bakat & Minat"
              title="Salurkan Potensimu di Luar Jam Kelas"
              text="Geser untuk melihat ragam kegiatan ekstrakurikuler kepemimpinan, seni kreatif, dan olahraga."
            />
          </Reveal>

          <div className="mt-14">
            <CyberSlider totalItems={featuredExtracurriculars.length}>
              {featuredExtracurriculars.map((item) => (
                <div
                  key={item.title}
                  className="w-[280px] shrink-0 snap-start sm:w-[320px] lg:w-[calc(25%-0.9375rem)]"
                >
                  <ClayCard hover className="h-full overflow-hidden p-3">
                    <div className="aspect-square overflow-hidden rounded-2xl bg-primary-soft/60">
                      <LocalImage
                        src={item.image}
                        alt={item.title}
                        width={560}
                        height={560}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <span className="inline-flex rounded-full bg-accent/15 px-2.5 py-0.5 text-[0.7rem] font-extrabold text-amber-900">
                        {item.required ? "Wajib" : "Pilihan"}
                      </span>
                      <h3 className="mt-2 text-base font-extrabold text-primary-darker">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-foreground/65">
                        {item.desc}
                      </p>
                    </div>
                  </ClayCard>
                </div>
              ))}
            </CyberSlider>
          </div>

          <div className="mt-10 text-center">
            <Link href="/ekskul" className="clay-btn text-sm font-extrabold">
              Lihat Seluruh Ekstrakurikuler
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ALUMNI & NEWS HIGHLIGHTS
      ========================================================================= */}
      <section className="relative bg-primary-darker px-4 py-20 text-white sm:px-6 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Alumni Story */}
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-[2.25rem] border border-white/20 bg-white/10 p-8 backdrop-blur-xl sm:p-10">
              <div>
                <span className="clay-chip-blue">Cerita Alumni</span>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white">
                  Jejak Langkah Lulusan
                </h2>
                <p className="mt-4 leading-relaxed text-white/80">
                  Perjalanan para lulusan SMK Plus Melati yang telah berkiprah di industri profesional dan merintis wirausaha mandiri.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4" aria-label="Placeholder cerita alumni">
                  {[
                    ["Profil", "M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"],
                    ["Karier", "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"],
                    ["Wirausaha", "M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"],
                  ].map(([label, path]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-dashed border-white/25 bg-white/5 p-5 text-center text-xs font-bold text-white/60"
                    >
                      <svg
                        className="mx-auto mb-3 h-8 w-8 text-accent"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={path} />
                      </svg>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href="/alumni"
                  className="clay-btn clay-btn-accent text-xs font-extrabold"
                >
                  Kunjungi Halaman Alumni
                </Link>
              </div>
            </div>
          </Reveal>

          {/* School Life & News */}
          <Reveal delay={80}>
            <div className="flex h-full flex-col justify-between rounded-[2.25rem] border border-white/20 bg-white/10 p-8 backdrop-blur-xl sm:p-10">
              <div>
                <span className="clay-chip-blue">Warta Sekolah</span>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white">
                  Kabar & Agenda Terkini
                </h2>
                <p className="mt-4 leading-relaxed text-white/80">
                  Ikuti berita terbaru tentang prestasi siswa, agenda akademik, workshop kejuruan, dan kegiatan sekolah.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4" aria-label="Placeholder berita sekolah">
                  {[
                    ["Kegiatan", "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"],
                    ["Prestasi", "M5 3l3.057-1.528a1 1 0 01.886 0L12 3l3.057-1.528a1 1 0 01.886 0L19 3v16l-3.057 1.528a1 1 0 01-.886 0L12 19l-3.057 1.528a1 1 0 01-.886 0L5 19V3z"],
                    ["Informasi", "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2"],
                  ].map(([label, path]) => (
                    <div
                      key={label}
                      className="overflow-hidden rounded-2xl border border-dashed border-white/25 bg-white/5 text-center text-xs font-bold text-white/60"
                    >
                      <span className="flex h-16 items-center justify-center bg-white/10">
                        <svg
                          className="h-7 w-7 text-accent"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d={path} />
                        </svg>
                      </span>
                      <span className="block p-3">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href="/berita"
                  className="clay-btn clay-btn-accent text-xs font-extrabold"
                >
                  Lihat Berita Sekolah
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================================
          KEY TAKEAWAYS — Checklist Nilai Sekolah
      ========================================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <ClayCard className="relative overflow-hidden p-8 sm:p-12 lg:p-16">
              <span className="clay-orb-ghost -right-16 -top-16 h-64 w-64" />
              <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <span className="clay-chip-gold">Nilai Unggulan</span>
                  <h2 className="mt-5 text-3xl font-extrabold leading-tight text-primary-darker sm:text-4xl">
                    Pilihan Tepat untuk Masa Depan Cerah
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg">
                    Lingkungan belajar terarah yang membentuk keahlian vokasi nyata, kemandirian karakter, dan daya saing tinggi.
                  </p>
                </div>

                <div className="grid gap-3.5">
                  {[
                    "Bengkel & lab praktik berstandar industri",
                    "Program pembinaan karakter & asrama keagamaan",
                    "Peluang magang & kerjasama mitra usaha",
                    "Kemandirian wirausaha sejak dini",
                  ].map((item) => (
                    <div
                      key={item}
                      className="clay-inset flex items-center gap-3.5 rounded-2xl p-4 text-sm font-bold text-primary-darker"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-primary-darker font-extrabold">
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ClayCard>
          </Reveal>
        </div>
      </section>

      {/* =========================================================================
          FINAL CALL TO ACTION — Portal Menuju Pendaftaran
      ========================================================================= */}
      <section className="px-4 pb-20 sm:px-6 lg:pb-28">
        <Reveal>
          <ClayCard
            variant="blue"
            className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] px-6 py-20 text-center shadow-2xl sm:px-12 sm:py-24"
          >
            <span className="clay-orb -left-20 -top-20 h-64 w-64 opacity-60" />
            <span className="clay-orb-ghost -bottom-20 -right-16 h-72 w-72" />
            
            <div className="relative mx-auto max-w-3xl">
              <span className="clay-chip-blue">SPMB 2026/2027</span>
              <h2 className="mt-6 text-balance text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
                Wujudkan Cita-Citamu Bersama Kami
              </h2>
              <p className="mt-5 text-base text-white/85 sm:text-lg">
                Penerimaan Peserta Didik Baru SMK Plus Melati Samarinda telah dibuka. Daftarkan dirimu dan raih masa depan gemilang.
              </p>
              
              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/spmb"
                  className="clay-btn clay-btn-accent min-h-12 text-sm font-extrabold shadow-xl transition-transform hover:scale-105"
                >
                  Daftar SPMB Online Sekarang
                </Link>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn clay-btn-light min-h-12 text-sm font-extrabold transition-transform hover:scale-105"
                >
                  Konsultasi dengan Admin
                </a>
              </div>
            </div>
          </ClayCard>
        </Reveal>
      </section>

      {/* =========================================================================
          FUTURISTIC FOOTER
      ========================================================================= */}
      <footer className="relative bg-primary-darker px-4 pb-10 pt-20 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.7fr]">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3.5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-1.5 shadow-lg shadow-black/50">
                  <Image
                    src="/logo melati.png"
                    alt="Logo SMK Plus Melati Samarinda"
                    width={52}
                    height={52}
                    className="h-full w-full object-contain"
                  />
                </span>
                <div>
                  <p className="font-extrabold leading-tight text-white">SMK Plus Melati Samarinda</p>
                  <p className="text-sm font-semibold text-accent">{CONTACT.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
                Sekolah menengah kejuruan swasta keunggulan di Samarinda Seberang. Menyiapkan SDM terampil, disiplin, dan berjiwa wirausaha di era modern.
              </p>
            </div>

            <div>
              <h2 className="font-extrabold text-accent">Kontak & Lokasi</h2>
              <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-white/75">
                <p>{CONTACT.address}</p>
                <p>
                  <a
                    className="transition-colors hover:text-accent"
                    href={CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp: {CONTACT.phone}
                  </a>
                </p>
                <p>
                  <a className="transition-colors hover:text-accent" href={`mailto:${CONTACT.email}`}>
                    Email: {CONTACT.email}
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex items-center gap-1.5 font-bold text-accent transition-colors hover:text-white"
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buka Google Maps
                  </a>
                </p>
              </address>
            </div>

            <div>
              <h2 className="font-extrabold text-accent">Media Sosial & Tautan</h2>
              <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/75">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {social.label}
                  </a>
                ))}
                <Link href="/" className="font-bold text-accent transition-colors hover:text-white">
                  Website Utama
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} SMK Plus Melati Samarinda. All rights reserved.</p>
            <p className="font-semibold text-accent/80">SMK Wirausaha Muda • SPMB 2026/2027</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
