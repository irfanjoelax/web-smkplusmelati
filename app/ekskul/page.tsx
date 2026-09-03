import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { getContent } from "@/app/lib/content";
import type { EkskulItem } from "@/app/lib/types";
import { breadcrumbSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Ekskul",
  description:
    "Ekstrakurikuler SMK Plus Melati Samarinda: podschool zaman now, konten kreator, desain grafis, pramuka, english club, seni vokal, dan e-sport.",
  alternates: {
    canonical: "/ekskul",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/ekskul",
    title: "Ekskul | SMK Plus Melati Samarinda",
    description:
      "Ekstrakurikuler SMK Plus Melati: podschool, konten kreator, desain grafis, pramuka, english club, seni vokal, dan e-sport.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekskul | SMK Plus Melati Samarinda",
    description:
      "Ekstrakurikuler SMK Plus Melati: podschool, konten kreator, desain grafis, pramuka, english club, seni vokal, dan e-sport.",
  },
};

export const revalidate = 60;

export default async function EkskulPage() {
  const ekskul = await getContent<EkskulItem[]>("ekskul");
  return (
    <>
      <Header />
      <JsonLd data={breadcrumbSchema([{ name: "Ekskul", path: "/ekskul" }])} />
      <main className="flex-1">
        <PageHero
          eyebrow="Kegiatan Siswa"
          title="Ekstrakurikuler"
          description="Kreativitas tanpa batas — wadah siswa mengembangkan bakat, minat, dan keterampilan di luar jam pelajaran."
        />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ekskul.map((e, i) => (
              <Reveal key={e.title} delay={i * 80}>
                <ImageCard
                  src={e.image}
                  alt={e.title}
                  title={e.title}
                  description={e.desc}
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
