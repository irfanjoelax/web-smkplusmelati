import type { Metadata } from "next";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { breadcrumbSchema, programSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Jurusan TKJ",
  description:
    "Jurusan Teknik Komputer dan Jaringan (TKJ) SMK Plus Melati Samarinda: jaringan komputer, administrasi server, Mikrotik MTCNA, keamanan jaringan, hingga prospek karier teknisi jaringan.",
  alternates: {
    canonical: "/jurusan/tkj",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/jurusan/tkj",
    title: "Jurusan TKJ | SMK Plus Melati Samarinda",
    description:
      "Jurusan Teknik Komputer dan Jaringan (TKJ) SMK Plus Melati Samarinda dengan sertifikasi Mikrotik MTCNA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jurusan TKJ | SMK Plus Melati Samarinda",
    description:
      "Jurusan Teknik Komputer dan Jaringan (TKJ) SMK Plus Melati Samarinda dengan sertifikasi Mikrotik MTCNA.",
  },
};

const skills = [
  "Administrasi Infrastruktur Jaringan",
  "Administrasi Sistem Jaringan",
  "Perakitan & Troubleshooting Komputer",
  "Jaringan Berbasis Mikrotik (MTCNA)",
  "Administrasi Server",
  "Keamanan Jaringan Dasar",
];

export default function TkjPage() {
  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Jurusan", path: "/jurusan/tkj" },
          { name: "TKJ", path: "/jurusan/tkj" },
        ])}
      />
      <JsonLd
        data={programSchema({
          title: "Jurusan Teknik Komputer dan Jaringan (TKJ)",
          path: "/jurusan/tkj",
          description:
            "Program keahlian TKJ membekali siswa keterampilan jaringan komputer, administrasi sistem, Mikrotik MTCNA, dan keamanan jaringan.",
        })}
      />
      <main className="flex-1">
        <PageHero
          eyebrow="Bidang Keahlian"
          title="Teknik Komputer & Jaringan (TKJ)"
          description="Jurusan yang membekali siswa keterampilan jaringan komputer, administrasi sistem, dan teknologi informasi yang dibutuhkan industri."
        />

        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <ClayCard className="p-8 sm:p-12">
                <h2 className="text-2xl font-extrabold text-primary-dark">
                  Mengapa Memilih TKJ?
                </h2>
                <p className="mt-4 leading-relaxed text-foreground/75">
                  Jurusan Teknik Komputer & Jaringan (TKJ) mempersiapkan siswa
                  untuk memahami dan menguasai infrastruktur serta sistem
                  jaringan komputer. Di SMK Plus Melati, siswa TKJ dilatih dengan
                  60% praktik sehingga lulusannya siap bekerja di dunia industri
                  maupun berwirausaha di bidang teknologi informasi.
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
                <span className="clay-chip clay-chip-primary">Sertifikasi</span>
                <h3 className="mt-4 text-lg font-extrabold text-primary-dark">
                  MTCNA (Mikrotik)
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  Sertifikasi jaringan tingkat dasar berbasis Mikrotik sebagai
                  bukti kemampuan siswa di bidang jaringan komputer.
                </p>
              </ClayCard>
            </Reveal>
            <Reveal className="h-full" delay={120}>
              <ClayCard hover className="h-full p-7">
                <span className="clay-chip clay-chip-primary">Prospek</span>
                <h3 className="mt-4 text-lg font-extrabold text-primary-dark">
                  Karier Lulusan TKJ
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  Teknisi jaringan, administrator server, network engineer,
                  teknisi komputer, hingga technopreneur di bidang IT.
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
