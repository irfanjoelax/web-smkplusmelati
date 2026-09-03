import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { getContent } from "@/app/lib/content";
import type { Prestasi } from "@/app/lib/types";
import { breadcrumbSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Prestasi Siswa",
  description:
    "Prestasi siswa SMK Plus Melati Samarinda: sertifikasi internasional TOEIC dan MTCNA sebagai bukti kemampuan dan nilai saing lulusan di dunia kerja.",
  alternates: {
    canonical: "/prestasi-siswa",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/prestasi-siswa",
    title: "Prestasi Siswa | SMK Plus Melati Samarinda",
    description:
      "Prestasi siswa SMK Plus Melati: sertifikasi internasional TOEIC dan MTCNA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prestasi Siswa | SMK Plus Melati Samarinda",
    description:
      "Prestasi siswa SMK Plus Melati: sertifikasi internasional TOEIC dan MTCNA.",
  },
};

export const revalidate = 60;

export default async function PrestasiSiswaPage() {
  const { items, quote } = await getContent<Prestasi>("prestasi");
  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Program", path: "/prestasi-siswa" },
          { name: "Prestasi Siswa", path: "/prestasi-siswa" },
        ])}
      />
      <main className="flex-1">
        <PageHero
          eyebrow="Pencapaian"
          title="Prestasi Siswa"
          description="Sertifikasi internasional sebagai bukti kemampuan dan nilai saing lulusan SMK Plus Melati di dunia kerja."
        />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            {items.map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <ImageCard
                  src={item.image}
                  alt={item.alt}
                  title={item.title}
                  description={item.description}
                />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="clay-card p-8 sm:p-12">
                <p className="text-center text-lg font-extrabold text-primary-dark">
                  &ldquo;{quote}&rdquo;
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
