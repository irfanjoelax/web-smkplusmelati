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
  title: "Program Asrama",
  description:
    "Program asrama SMK Plus Melati Samarinda: rutinitas harian disiplin, mengaji dan sholat berjamaah, kurve asrama, serta kegiatan kebersihan yang membentuk kemandirian siswa.",
  alternates: {
    canonical: "/program-asrama",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/program-asrama",
    title: "Program Asrama | SMK Plus Melati Samarinda",
    description:
      "Program asrama SMK Plus Melati: rutinitas harian disiplin, mengaji, dan sholat berjamaah.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Program Asrama | SMK Plus Melati Samarinda",
    description:
      "Program asrama SMK Plus Melati: rutinitas harian disiplin, mengaji, dan sholat berjamaah.",
  },
};

export const revalidate = 60;

export default async function ProgramAsramaPage() {
  const programData = await getContent<ProgramData>("program");
  const { cards, jadwal } = programData.asrama;

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Program", path: "/program-asrama" },
          { name: "Program Asrama", path: "/program-asrama" },
        ])}
      />
      <main className="flex-1">
        <PageHero
          eyebrow="Program Unggulan"
          title="Program Asrama"
          description="Membentuk kedisiplinan dan kemandirian siswa melalui kegiatan yang terjadwal setiap hari."
        />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <Reveal key={`${card.title}-${i}`} delay={i * 120}>
                <ImageCard
                  src={card.image}
                  alt={card.title}
                  title={card.title}
                  description={card.description}
                  aspect="aspect-[4/3]"
                />
              </Reveal>
            ))}
          </div>
        </section>

        {jadwal.length > 0 && (
          <section className="px-4 pb-24">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <div className="clay-card p-8 sm:p-12">
                  <h2 className="text-center text-2xl font-extrabold text-primary-dark">
                    Rutinitas Harian Asrama
                  </h2>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {jadwal.map((item, i) => (
                      <div
                        key={`${item}-${i}`}
                        className="clay-inset flex items-center gap-3 rounded-2xl px-5 py-4"
                      >
                        <span className="clay-chip clay-chip-primary !px-2.5">
                          0{i + 1}
                        </span>
                        <span className="text-sm font-semibold text-foreground/80">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
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
