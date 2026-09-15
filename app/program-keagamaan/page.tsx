import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { getContent } from "@/app/lib/content";
import type { ProgramData } from "@/app/lib/types";
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

export const revalidate = 60;

export default async function ProgramKeagamaanPage() {
  const programData = await getContent<ProgramData>("program");
  const { cards, perayaanText } = programData.keagamaan;

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
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((item, i) => (
              <Reveal key={`${item.title}-${i}`} delay={i * 80}>
                <ImageCard
                  src={item.image}
                  alt={item.title}
                  title={item.title}
                  description={item.description}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {perayaanText && (
          <section className="px-4 pb-24">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <div className="clay-card p-8 text-center sm:p-12">
                  <span className="clay-chip clay-chip-primary">Perayaan Hari Besar</span>
                  <p className="mt-6 leading-relaxed text-foreground/75">
                    {perayaanText}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
