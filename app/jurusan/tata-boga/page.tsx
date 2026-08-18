import type { Metadata } from "next";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { getJurusan } from "@/app/lib/content";
import { breadcrumbSchema, programSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Jurusan Tata Boga",
  description:
    "Jurusan Tata Boga SMK Plus Melati Samarinda: seni memasak, teknik penyajian, higiene sanitasi makanan, kewirausahaan kuliner, hingga prospek karier chef dan wirausaha kuliner.",
  alternates: {
    canonical: "/jurusan/tata-boga",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/jurusan/tata-boga",
    title: "Jurusan Tata Boga | SMK Plus Melati Samarinda",
    description:
      "Jurusan Tata Boga SMK Plus Melati Samarinda: seni memasak, penyajian, dan kewirausahaan kuliner.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jurusan Tata Boga | SMK Plus Melati Samarinda",
    description:
      "Jurusan Tata Boga SMK Plus Melati Samarinda: seni memasak, penyajian, dan kewirausahaan kuliner.",
  },
};

const skills = getJurusan().tataBoga.skills;

export default function TataBogaPage() {
  const { keunggulan, prospek } = getJurusan().tataBoga;
  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Jurusan", path: "/jurusan/tata-boga" },
          { name: "Tata Boga", path: "/jurusan/tata-boga" },
        ])}
      />
      <JsonLd
        data={programSchema({
          title: "Jurusan Tata Boga",
          path: "/jurusan/tata-boga",
          description:
            "Program keahlian Tata Boga mengasah seni memasak, teknik penyajian, higiene sanitasi, dan kewirausahaan kuliner.",
        })}
      />
      <main className="flex-1">
        <PageHero
          eyebrow="Bidang Keahlian"
          title="Tata Boga"
          description="Jurusan yang mengasah seni memasak, teknik penyajian, dan jiwa wirausaha di bidang kuliner."
        />

        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <ClayCard className="p-8 sm:p-12">
                <h2 className="text-2xl font-extrabold text-primary-dark">
                  Mengapa Memilih Tata Boga?
                </h2>
                <p className="mt-4 leading-relaxed text-foreground/75">
                  Semua orang bisa memasak, namun tidak semua orang tahu seni
                  memasak. Di SMK Plus Melati, siswa Tata Boga belajar bagaimana
                  proses pembuatan makanan yang bisa dinilai harga jualnya,
                  hingga teknik akhir penyediaan makanan yang menarik. Ruang
                  khusus disediakan untuk siswa bereksperimen membuat makanan.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="clay-inset flex items-center gap-3 rounded-2xl px-5 py-4"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-extrabold text-primary-darker">
                        ✓
                      </span>
                      <span className="text-sm font-semibold text-foreground/80">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </ClayCard>
            </Reveal>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <ClayCard hover className="h-full p-7">
                <span className="clay-chip clay-chip-primary">{keunggulan.chip}</span>
                <h3 className="mt-4 text-lg font-extrabold text-primary-dark">
                  {keunggulan.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {keunggulan.description}
                </p>
              </ClayCard>
            </Reveal>
            <Reveal className="h-full" delay={120}>
              <ClayCard hover className="h-full p-7">
                <span className="clay-chip clay-chip-primary">{prospek.chip}</span>
                <h3 className="mt-4 text-lg font-extrabold text-primary-dark">
                  {prospek.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {prospek.description}
                </p>
              </ClayCard>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
