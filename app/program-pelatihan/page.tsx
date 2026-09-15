import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import SectionHeading from "@/app/components/SectionHeading";
import { getContent } from "@/app/lib/content";
import type { ProgramData } from "@/app/lib/types";
import { breadcrumbSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Program Pelatihan",
  description:
    "Program pelatihan unggulan SMK Plus Melati Samarinda: pembuatan aplikasi Android dan pencetak wirausaha tata boga untuk membekali siswa keterampilan bernilai jual tinggi.",
  alternates: {
    canonical: "/program-pelatihan",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/program-pelatihan",
    title: "Program Pelatihan | SMK Plus Melati Samarinda",
    description:
      "Program pelatihan unggulan SMK Plus Melati: pembuatan aplikasi Android dan pencetak wirausaha tata boga.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Program Pelatihan | SMK Plus Melati Samarinda",
    description:
      "Program pelatihan unggulan SMK Plus Melati: pembuatan aplikasi Android dan pencetak wirausaha tata boga.",
  },
};

export const revalidate = 60;

export default async function ProgramPelatihanPage() {
  const programData = await getContent<ProgramData>("program");
  const { cards, harapan } = programData.pelatihan;

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Program", path: "/program-pelatihan" },
          { name: "Program Pelatihan", path: "/program-pelatihan" },
        ])}
      />
      <main className="flex-1">
        <PageHero
          eyebrow="Program Unggulan"
          title="Program Pelatihan"
          description="Membekali siswa keterampilan praktis yang bisa menjadi keahlian khusus dan bernilai jual tinggi."
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

        {harapan.length > 0 && (
          <section className="px-4 pb-24">
            <div className="mx-auto max-w-6xl">
              <SectionHeading
                eyebrow="Catatan"
                title="Diharapkan dari Program Ini"
                description="Setiap pelatihan dirancang agar siswa mampu menghasilkan karya yang bermanfaat bagi masyarakat luas."
              />
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {harapan.map((text, i) => (
                  <Reveal key={i} delay={i * 120}>
                    <p
                      className={`rounded-[1.75rem] p-7 leading-relaxed text-foreground/75 ${
                        i % 2 === 0
                          ? "bg-primary-soft/70"
                          : "bg-accent-soft/70"
                      }`}
                    >
                      {text}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
