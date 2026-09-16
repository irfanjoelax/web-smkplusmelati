import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { getContent } from "@/app/lib/content";
import type { BeritaItem } from "@/app/lib/types";
import { breadcrumbSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Berita Sekolah",
  description:
    "Informasi terbaru seputar kegiatan, prestasi, dan pengumuman dari SMK Plus Melati Samarinda.",
  alternates: {
    canonical: "/berita",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/berita",
    title: "Berita Sekolah | SMK Plus Melati Samarinda",
    description:
      "Informasi terbaru seputar kegiatan, prestasi, dan pengumuman dari SMK Plus Melati Samarinda.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berita Sekolah | SMK Plus Melati Samarinda",
    description:
      "Informasi terbaru seputar kegiatan, prestasi, dan pengumuman dari SMK Plus Melati Samarinda.",
  },
};

export const revalidate = 60;

export default async function BeritaPage() {
  const berita = await getContent<BeritaItem[]>("berita");
  // Urutkan dari terbaru
  const sorted = [...berita].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return (
    <>
      <Header />
      <JsonLd data={breadcrumbSchema([{ name: "Berita", path: "/berita" }])} />
      <main className="flex-1">
        <PageHero
          eyebrow="Informasi Terbaru"
          title="Berita Sekolah"
          description="Kegiatan, prestasi, dan pengumuman terbaru dari SMK Plus Melati Samarinda."
        />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((item, i) => (
              <Reveal key={item.slug} delay={i * 80}>
                <ImageCard
                  src={item.image}
                  alt={item.title}
                  title={item.title}
                  description={item.desc}
                  href={`/berita/${item.slug}`}
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