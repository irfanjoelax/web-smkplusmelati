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
  title: "Fasilitas",
  description:
    "Fasilitas SMK Plus Melati Samarinda: ruang kelas ber-AC, perpustakaan, masjid Qiwamul Ummah, auditorium, kolam renang, dan berbagai lapangan olahraga.",
  alternates: {
    canonical: "/fasilitas",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/fasilitas",
    title: "Fasilitas | SMK Plus Melati Samarinda",
    description:
      "Fasilitas SMK Plus Melati: ruang kelas ber-AC, perpustakaan, masjid, auditorium, kolam renang, dan lapangan olahraga.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fasilitas | SMK Plus Melati Samarinda",
    description:
      "Fasilitas SMK Plus Melati: ruang kelas ber-AC, perpustakaan, masjid, auditorium, kolam renang, dan lapangan olahraga.",
  },
};

const facilities = [
  {
    title: "Ruang Kelas",
    desc: "Suasana belajar siswa/i dengan fasilitas ruangan ber-AC yang nyaman.",
    image: IMAGES.ruangKelas,
  },
  {
    title: "Perpustakaan",
    desc: "Ruangan perpustakaan yang nyaman, bersih, dan adem — lokasi favorit saat rehat.",
    image: IMAGES.perpustakaan,
  },
  {
    title: "Mesjid Qiwamul Ummah",
    desc: "Digunakan saat acara besar keagamaan, sholat berjamaah, dan ngaji setiap malam.",
    image: IMAGES.masjid,
  },
  {
    title: "Gedung Auditorium",
    desc: "Ruang untuk event-event besar dengan kapasitas mencapai ribuan orang.",
    image: IMAGES.auditorium,
  },
  {
    title: "Kolam Renang",
    desc: "Digunakan saat kegiatan olahraga dan waktu senggang setelah pembelajaran.",
    image: IMAGES.kolamRenang,
  },
  {
    title: "Lapangan Indoor",
    desc: "Digunakan untuk kegiatan besar, seperti bazar olahraga dan lainnya.",
    image: IMAGES.lapanganIndoor,
  },
  {
    title: "Lapangan Sepak Bola",
    desc: "Dilengkapi bola dan gawang, digunakan saat jam olahraga dan waktu senggang.",
    image: IMAGES.lapanganSepak,
  },
  {
    title: "Lapangan Basket",
    desc: "Sudah difasilitasi ring dan bola untuk kegiatan olahraga siswa dan guru.",
    image: IMAGES.lapanganBasket,
  },
  {
    title: "Lapangan Bulu Tangkis",
    desc: "Lapangan indoor lengkap dengan tiang net, jaring net, dan bola.",
    image: IMAGES.lapanganBulu,
  },
  {
    title: "Joging Track",
    desc: "Fasilitas untuk bersantai sambil berolahraga di lokasi yang nyaman dan sejuk.",
    image: IMAGES.jogingTrack,
  },
];

export default function FasilitasPage() {
  return (
    <>
      <Header />
      <JsonLd data={breadcrumbSchema([{ name: "Fasilitas", path: "/fasilitas" }])} />
      <main className="flex-1">
        <PageHero
          eyebrow="Sarana & Prasarana"
          title="Fasilitas Sekolah"
          description="Lingkungan belajar yang lengkap dan nyaman untuk mendukung proses pembelajaran siswa."
        />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <ImageCard
                  src={f.image}
                  alt={f.title}
                  title={f.title}
                  description={f.desc}
                />
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
