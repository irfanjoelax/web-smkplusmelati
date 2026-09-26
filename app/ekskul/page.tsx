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
  const sortedEkskul = [...ekskul].sort((a, b) => {
    if (a.required === b.required) return 0;
    return a.required ? -1 : 1;
  });

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
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedEkskul.map((e, i) => (
                <Reveal key={`${e.title}-${i}`} delay={i * 60}>
                  <ImageCard
                    src={e.image}
                    alt={e.title}
                    title={e.title}
                    description={e.desc}
                    badge={e.required ? "Ekskul Wajib" : "Ekskul Pilihan"}
                    badgeTone={e.required ? "gold" : "blue"}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
