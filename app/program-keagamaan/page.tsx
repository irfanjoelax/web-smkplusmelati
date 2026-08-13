import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { IMAGES } from "@/app/components/images";
import { breadcrumbSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Program Keagamaan",
  description:
    "Program keagamaan SMK Plus Melati Samarinda: sholat dhuha, mengaji pagi, sholat berjamaah, khataman Al-Qur'an, dan perayaan hari besar untuk menanamkan keimanan dan ketaqwaan.",
  alternates: {
    canonical: "/program-keagamaan",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/program-keagamaan",
    title: "Program Keagamaan | SMK Plus Melati Samarinda",
    description:
      "Program keagamaan SMK Plus Melati: sholat dhuha, mengaji, khataman Al-Qur'an, dan perayaan hari besar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Program Keagamaan | SMK Plus Melati Samarinda",
    description:
      "Program keagamaan SMK Plus Melati: sholat dhuha, mengaji, khataman Al-Qur'an, dan perayaan hari besar.",
  },
};

const items = [
  {
    title: "Sholat Dhuha",
    desc: "Siswa diarahkan ke masjid untuk melaksanakan sholat dhuha sebagai pembuka kegiatan belajar.",
    image: IMAGES.keagamaanDhuha,
  },
  {
    title: "Mengaji Pagi",
    desc: "Aktifitas mengaji pagi sebelum memulai pembelajaran untuk menanamkan nilai keagamaan.",
    image: IMAGES.keagamaanMengaji,
  },
  {
    title: "Sholat Berjamaah",
    desc: "Sholat fardu berjamaah dilaksanakan pada jam istirahat di masjid.",
    image: IMAGES.keagamaanSholat,
  },
  {
    title: "Khataman Al-Qur'an",
    desc: "Kegiatan khataman Al-Qur'an rutin dilaksanakan beberapa bulan sekali.",
    image: IMAGES.keagamaanKhataman,
  },
];

export default function ProgramKeagamaanPage() {
  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Program", path: "/program-keagamaan" },
          { name: "Program Keagamaan", path: "/program-keagamaan" },
        ])}
      />
      <main className="flex-1">
        <PageHero
          eyebrow="Program Unggulan"
          title="Program Keagamaan"
          description="Menanamkan keimanan dan ketaqwaan melalui pengalaman ajaran agama dalam keseharian siswa."
        />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
            {items.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <ImageCard
                  src={item.image}
                  alt={item.title}
                  title={item.title}
                  description={item.desc}
                />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="clay-card p-8 text-center sm:p-12">
                <span className="clay-chip clay-chip-primary">Perayaan Hari Besar</span>
                <p className="mt-6 leading-relaxed text-foreground/75">
                  Perayaan hari besar merupakan program rutinan keagamaan. Pada
                  hari perayaan ini, siswa difokuskan untuk mengikuti kegiatan
                  hingga selesai, dan tidak ada kegiatan belajar mengajar pada
                  hari tersebut.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
