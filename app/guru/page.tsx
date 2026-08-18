import type { Metadata } from "next";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import JsonLd from "@/app/components/JsonLd";
import LocalImage from "@/app/components/LocalImage";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { getGuru } from "@/app/lib/content";
import { breadcrumbSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Daftar Guru",
  description:
    "Daftar guru dan tenaga pendidik SMK Plus Melati Samarinda yang berdedikasi membimbing siswa menjadi SDM berjiwa kewirausahaan dan bertakwa.",
  alternates: {
    canonical: "/guru",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/guru",
    title: "Daftar Guru | SMK Plus Melati Samarinda",
    description:
      "Daftar guru dan tenaga pendidik SMK Plus Melati Samarinda.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daftar Guru | SMK Plus Melati Samarinda",
    description: "Daftar guru dan tenaga pendidik SMK Plus Melati Samarinda.",
  },
};

const teachers = getGuru();

export default function GuruPage() {
  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Profil", path: "/profil" },
          { name: "Daftar Guru", path: "/guru" },
        ])}
      />
      <main className="flex-1">
        <PageHero
          eyebrow="Tenaga Pendidik"
          title="Daftar Guru"
          description="Guru dan tenaga pendidik SMK Plus Melati yang berdedikasi membimbing siswa menjadi SDM berjiwa kewirausahaan dan bertakwa."
        />

        <section className="px-4 pb-24 pt-16">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teachers.map((t, i) => (
              <Reveal key={t.image} delay={i * 80}>
                <ClayCard hover className="flex flex-col items-center p-6">
                  <div className="clay-inset overflow-hidden rounded-3xl p-2">
                    <LocalImage
                      src={t.image}
                      alt={t.name}
                      width={400}
                      height={400}
                      className="aspect-square w-full rounded-2xl object-cover"
                    />
                  </div>
                  <div className="mt-3 flex w-full flex-col items-center justify-start min-h-[2.5rem]">
                    <p className="w-full text-center text-sm font-extrabold leading-5 text-primary-dark">
                      {t.name}
                    </p>
                    <p className="mt-0.5 w-full text-center text-xs font-semibold leading-4 text-accent">
                      {t.role}
                    </p>
                  </div>
                </ClayCard>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}