import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { getFasilitas } from "@/app/lib/content";
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

const facilities = getFasilitas();

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
                  description={f.description}
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
