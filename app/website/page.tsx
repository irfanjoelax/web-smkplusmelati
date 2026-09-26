import Image from "next/image";
import Link from "next/link";
import ClayCard from "@/app/components/ClayCard";
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
    title: "Belajar Keahlian Nyata",
    text: "Pembelajaran vokasi membantu siswa memahami teori sekaligus mengasah keterampilan melalui praktik.",
  },
  {
    number: "02",
    title: "Jurusan Relevan",
    text: "Pilih TJKT untuk teknologi jaringan atau Kuliner untuk keterampilan memasak dan wirausaha.",
  },
  {
    number: "03",
    title: "Karakter Ikut Tumbuh",
    text: "Program asrama dan keagamaan mendukung disiplin, kemandirian, kebersamaan, dan akhlak.",
  },
  {
    number: "04",
    title: "Ruang untuk Berkarya",
    text: "Ekskul dan kegiatan siswa membuka ruang untuk mencoba, bekerja sama, dan menemukan potensi.",
  },
];

function SectionTitle({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className={light ? "clay-chip-blue" : "clay-chip-gold"}>{eyebrow}</span>
      <h2 className={`mt-5 text-3xl font-extrabold leading-tight sm:text-4xl ${light ? "text-white" : "text-primary-darker"}`}>
        {title}
      </h2>
      <p className={`mt-4 leading-relaxed ${light ? "text-white/80" : "text-foreground/70"}`}>{text}</p>
    </div>
  );
}

function Arrow() {
  return <span aria-hidden="true">→</span>;
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
    .filter((item) => !item.title.toLowerCase().includes("tttt"))
    .slice(0, 4);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;

  return (
    <main className="overflow-x-hidden bg-primary-soft text-foreground">
      <section className="relative isolate min-h-svh overflow-hidden bg-primary-darker px-4 pb-20 pt-6 text-white sm:px-6 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(63,151,216,0.45),transparent_32%),radial-gradient(circle_at_10%_80%,rgba(245,179,1,0.16),transparent_28%)]" />
        <span className="clay-orb-ghost -right-24 top-24 h-80 w-80 opacity-40" />
        <span className="clay-orb-ghost -left-24 bottom-4 h-64 w-64 opacity-30" />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="group inline-flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1.5 shadow-lg">
                <Image src="/logo melati.png" alt="Logo SMK Plus Melati Samarinda" width={44} height={44} className="h-full w-full object-contain transition-transform group-hover:scale-105" />
              </span>
              <span className="hidden text-sm font-extrabold leading-tight sm:block">
                SMK Plus Melati<br /><span className="text-accent">Samarinda</span>
              </span>
            </Link>
            <Link href="/spmb" className="clay-chip-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              SPMB 2026/2027 <Arrow />
            </Link>
          </div>

          <div className="grid items-center gap-12 pb-4 pt-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:pt-20">
            <Reveal>
              <span className="clay-chip-blue">Sekolah vokasi di Samarinda</span>
              <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
                Masa Depanmu Dimulai dari <span className="text-accent">Pilihan Hari Ini.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/82 sm:text-lg">
                Temukan jurusan, pengalaman belajar, kegiatan, dan lingkungan yang membantumu tumbuh di SMK Plus Melati Samarinda.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/spmb" className="clay-btn clay-btn-accent min-h-12 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  Daftar SPMB 2026 <Arrow />
                </Link>
                <Link href="/profil" className="clay-btn clay-btn-light min-h-12 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  Kenali Sekolah
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-3 border-t border-white/20 pt-6">
                {["2 pilihan jurusan", "3 program pengembangan", "7 kegiatan siswa"].map((stat) => (
                  <span key={stat} className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-sm font-bold text-white/80">{stat}</span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative rounded-[2.25rem] border border-white/25 bg-white/12 p-3 shadow-2xl backdrop-blur-xl">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.7rem] bg-primary-dark">
                  <LocalImage src="/images/website/hero.jpg" alt="Kegiatan siswa SMK Plus Melati Samarinda" width={900} height={960} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-darker/90 via-transparent to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-primary-darker/55 p-4 backdrop-blur-md">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">SMK Wirausaha Muda</p>
                    <p className="mt-1 font-extrabold">SMK Plus Melati</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="keunggulan" className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal><SectionTitle eyebrow="Kenapa Melati?" title="Tempat Belajar, Bertumbuh, dan Mencoba" text="Bekal sekolah bukan hanya pelajaran. Lingkungan yang tepat memberi ruang untuk mengenal kemampuan dan membangun arah masa depan." /></Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <ClayCard className="h-full p-6">
                  <span className="text-3xl font-extrabold leading-none text-accent/30">{item.number}</span>
                  <h3 className="mt-4 text-xl font-extrabold text-primary-darker">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{item.text}</p>
                </ClayCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-primary-darker px-5 py-14 shadow-2xl sm:px-10 lg:px-14">
          <Reveal><SectionTitle light eyebrow="Pilih Bidangmu" title="Pilih Jurusan & Masa Depanmu" text="Mulai dari hal yang kamu sukai, lalu bangun keterampilan yang dapat terus dikembangkan." /></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {majors.slice(0, 2).map((major, index) => (
              <Reveal key={major.id} delay={index * 90}>
                <article className="group h-full overflow-hidden rounded-[2rem] border border-white/25 bg-white/10 p-3 backdrop-blur-lg">
                  <div className="aspect-[16/10] overflow-hidden rounded-[1.45rem] bg-primary-soft">
                    <LocalImage src={major.image || majorFallbacks[major.id] || ""} alt={`Kegiatan jurusan ${major.fullName}`} width={900} height={560} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5 text-white sm:p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Jurusan 0{index + 1}</span>
                    <h3 className="mt-2 text-2xl font-extrabold">{major.fullName}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">{major.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {major.skills.slice(0, 3).map((skill) => <span key={skill} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">{skill}</span>)}
                    </div>
                    <Link href={`/jurusan/${major.id}`} className="mt-6 inline-flex font-extrabold text-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                      Lihat Jurusan&nbsp; <Arrow />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal><SectionTitle eyebrow="Pengalaman Siswa" title="Bukan Cuma Belajar di Kelas" text="Kegiatan terarah membantu siswa belajar mandiri, berkolaborasi, menjalankan kebiasaan baik, dan menghasilkan karya." /></Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {programs.slice(0, 3).map((program, index) => (
              <Reveal key={program.id} delay={index * 80}>
                <Link href={`/program-${program.id}`} className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  <ClayCard hover className="h-full overflow-hidden p-3">
                    <div className="aspect-[16/10] overflow-hidden rounded-[1.4rem] bg-primary-soft">
                      <LocalImage src={program.cards[0]?.image || programFallbacks[program.id] || ""} alt={program.title} width={700} height={440} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-extrabold text-primary-darker">{program.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/70">{program.summary}</p>
                      <p className="mt-5 text-sm font-extrabold text-primary">Lihat program <Arrow /></p>
                    </div>
                  </ClayCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/45 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal><SectionTitle eyebrow="Lingkungan Sekolah" title="Lingkungan yang Mendukung" text="Ruang belajar yang nyaman dan tenaga pendidik yang hadir mendampingi proses tumbuh siswa." /></Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
            <div className="grid gap-5 sm:grid-cols-2">
              {facilities.slice(0, 4).map((facility, index) => (
                <Reveal key={facility.title} delay={index * 60}>
                  <ClayCard className="h-full overflow-hidden p-3">
                    <div className="aspect-[16/9] overflow-hidden rounded-[1.35rem]">
                      <LocalImage src={facility.image} alt={facility.title} width={640} height={360} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4"><h3 className="font-extrabold text-primary-darker">{facility.title}</h3><p className="mt-2 text-sm leading-relaxed text-foreground/65">{facility.description}</p></div>
                  </ClayCard>
                </Reveal>
              ))}
            </div>
            <Reveal delay={100}>
              <ClayCard variant="blue" className="h-full p-7 sm:p-8">
                <span className="clay-chip-blue">Tenaga Pendidik</span>
                <h3 className="mt-5 text-2xl font-extrabold">Belajar Bersama Guru Kami</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">Kenali sebagian tenaga sekolah yang mendampingi kegiatan belajar dan pengembangan siswa.</p>
                <div className="mt-7 space-y-3">
                  {featuredTeachers.map((teacher) => (
                    <div key={teacher.name} className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/15"><LocalImage src={teacher.image} alt={teacher.name} width={96} height={96} className="h-full w-full object-cover" /></div>
                      <div><p className="text-sm font-extrabold">{teacher.name}</p><p className="text-xs text-white/65">{teacher.role}</p></div>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/fasilitas" className="clay-btn clay-btn-accent text-sm">Lihat Fasilitas</Link>
                  <Link href="/guru" className="clay-btn clay-btn-light text-sm">Kenali Guru Kami</Link>
                </div>
              </ClayCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal><SectionTitle eyebrow="Capaian Siswa" title="Bukti, Bukan Sekadar Janji" text="Sertifikasi menjadi salah satu bentuk pengakuan atas keterampilan yang dipelajari siswa." /></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {achievement.items.slice(0, 2).map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <ClayCard className="grid h-full overflow-hidden p-3 sm:grid-cols-[.8fr_1.2fr]">
                  <div className="aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-primary-soft sm:aspect-auto sm:min-h-52"><LocalImage src={item.image} alt={item.title} width={520} height={560} className="h-full w-full object-cover" /></div>
                  <div className="p-5">
                    <span className="clay-chip-gold">Sertifikasi</span>
                    <h3 className="mt-4 text-xl font-extrabold text-primary-darker">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">{item.description}</p>
                    <p className="mt-4 text-xs font-bold text-foreground/45">Detail tahun akan diperbarui dari data resmi sekolah.</p>
                  </div>
                </ClayCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/prestasi-siswa" className="clay-btn">Lihat Semua Prestasi <Arrow /></Link></div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal><SectionTitle eyebrow="Minat & Bakat" title="Temukan Potensimu" text="Kembangkan keberanian, kreativitas, kerja sama, dan pengalaman baru di luar pembelajaran kelas." /></Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredExtracurriculars.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <ClayCard className="h-full overflow-hidden p-3">
                  <div className="aspect-square overflow-hidden rounded-[1.4rem] bg-primary-soft"><LocalImage src={item.image} alt={item.title} width={560} height={560} className="h-full w-full object-cover" /></div>
                  <div className="p-4"><h3 className="font-extrabold text-primary-darker">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-foreground/65">{item.desc}</p></div>
                </ClayCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/ekskul" className="clay-btn">Lihat Ekstrakurikuler <Arrow /></Link></div>
        </div>
      </section>

      <section className="bg-primary-darker px-4 py-20 text-white sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-white/20 bg-white/10 p-7 backdrop-blur-lg sm:p-9">
              <span className="clay-chip-blue">Cerita Alumni</span>
              <h2 className="mt-5 text-3xl font-extrabold">Perjalanan Mereka Akan Hadir di Sini</h2>
              <p className="mt-4 leading-relaxed text-white/75">Cerita alumni sedang dipersiapkan berdasarkan data resmi sekolah agar setiap nama, perjalanan, dan testimoni dapat ditampilkan dengan tepat.</p>
              <div className="mt-8 grid grid-cols-3 gap-4" aria-label="Placeholder cerita alumni">
                {[["Profil", "M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"], ["Perjalanan", "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"], ["Cerita", "M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"]].map(([label, path]) => <div key={label} className="rounded-2xl border border-dashed border-white/25 bg-white/5 p-5 text-center text-xs font-bold text-white/55"><svg className="mx-auto mb-3 h-8 w-8 text-white/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>{label}</div>)}
              </div>
              <Link href="/alumni" className="mt-7 inline-flex font-extrabold text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Kunjungi Halaman Alumni&nbsp; <Arrow /></Link>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-[2rem] border border-white/20 bg-white/10 p-7 backdrop-blur-lg sm:p-9">
              <span className="clay-chip-blue">Kehidupan Sekolah</span>
              <h2 className="mt-5 text-3xl font-extrabold">Kabar Terbaru Sedang Disiapkan</h2>
              <p className="mt-4 leading-relaxed text-white/75">Berita dan dokumentasi kegiatan terpilih akan ditampilkan setelah data resmi sekolah selesai diperbarui.</p>
              <div className="mt-8 grid grid-cols-3 gap-4" aria-label="Placeholder berita sekolah">
                {[["Kegiatan", "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"], ["Prestasi", "M5 3l3.057-1.528a1 1 0 01.886 0L12 3l3.057-1.528a1 1 0 01.886 0L19 3v16l-3.057 1.528a1 1 0 01-.886 0L12 19l-3.057 1.528a1 1 0 01-.886 0L5 19V3z"], ["Informasi", "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2"]].map(([label, path]) => <div key={label} className="overflow-hidden rounded-2xl border border-dashed border-white/25 bg-white/5 text-center text-xs font-bold text-white/55"><span className="flex h-20 items-center justify-center bg-white/8"><svg className="h-8 w-8 text-white/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg></span><span className="block p-3">{label}</span></div>)}
              </div>
              <Link href="/berita" className="mt-7 inline-flex font-extrabold text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Lihat Semua Berita&nbsp; <Arrow /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <ClayCard className="relative overflow-hidden p-7 sm:p-10 lg:p-14">
              <span className="clay-orb-ghost -right-16 -top-16 h-56 w-56" />
              <div className="relative grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
                <div><span className="clay-chip-gold">Kesempatanmu</span><h2 className="mt-5 text-3xl font-extrabold leading-tight text-primary-darker sm:text-4xl">Jangan Sampai Kesempatan Ini Kamu Lewatkan</h2><p className="mt-5 max-w-2xl leading-relaxed text-foreground/70">Masa SMK hanya berlangsung sekali. Memilih sekolah berarti memilih lingkungan tempat kamu belajar, berkembang, menemukan potensi, mencoba berbagai kegiatan, dan mulai menentukan arah masa depan.</p></div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {["Belajar di jurusan pilihan", "Mengikuti program pengembangan", "Mencoba kegiatan dan organisasi", "Mengasah keterampilan dan kemandirian"].map((item) => <div key={item} className="clay-inset flex items-center gap-3 p-4 text-sm font-bold text-primary-darker"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-primary-darker"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg></span>{item}</div>)}
                </div>
              </div>
            </ClayCard>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <Reveal>
          <ClayCard variant="blue" className="relative mx-auto max-w-6xl overflow-hidden px-6 py-20 text-center sm:px-12 sm:py-24">
            <span className="clay-orb -left-20 -top-20 h-56 w-56 opacity-65" /><span className="clay-orb-ghost -bottom-20 -right-16 h-64 w-64" />
            <div className="relative mx-auto max-w-3xl">
              <span className="clay-chip-blue">SPMB 2026/2027</span>
              <h2 className="mt-6 text-4xl font-extrabold sm:text-5xl">Siap Memulai Perjalananmu?</h2>
              <p className="mt-4 text-lg text-white/80">Jadilah bagian dari SMK Plus Melati Samarinda.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/spmb" className="clay-btn clay-btn-accent min-h-12">Daftar SPMB 2026 Sekarang <Arrow /></Link>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="clay-btn clay-btn-light min-h-12">Tanya Admin</a>
              </div>
            </div>
          </ClayCard>
        </Reveal>
      </section>

      <footer className="bg-primary-darker px-4 pb-10 pt-20 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 border-b border-white/15 pb-14 sm:grid-cols-2 lg:grid-cols-[1.15fr_.85fr_.7fr]">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-1.5">
                  <Image src="/logo melati.png" alt="Logo SMK Plus Melati Samarinda" width={52} height={52} className="h-full w-full object-contain" />
                </span>
                <div>
                  <p className="font-extrabold">SMK Plus Melati Samarinda</p>
                  <p className="text-sm text-accent">{CONTACT.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">Sekolah vokasi untuk belajar keterampilan, membangun karakter, dan mulai menyiapkan masa depan.</p>
            </div>
            <div>
              <h2 className="font-extrabold text-accent">Hubungi Kami</h2>
              <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-white/70">
                <p>{CONTACT.address}</p>
                <p><a className="transition-colors hover:text-accent" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp {CONTACT.phone}</a></p>
                <p><a className="transition-colors hover:text-accent" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
                <p><a className="transition-colors hover:text-accent" href={mapUrl} target="_blank" rel="noopener noreferrer">Buka lokasi di Google Maps <Arrow /></a></p>
              </address>
            </div>
            <div>
              <h2 className="font-extrabold text-accent">Terhubung</h2>
              <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/70">
                {SOCIALS.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">{social.label} <Arrow /></a>)}
                <Link href="/" className="transition-colors hover:text-accent">Website Utama <Arrow /></Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} SMK Plus Melati Samarinda.</p>
            <p>SPMB 2026/2027</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
