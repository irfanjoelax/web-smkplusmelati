import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { getJurusanData } from "@/app/lib/jurusan";
import { breadcrumbSchema, programSchema } from "@/app/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const jurusan = await getJurusanData();
  return jurusan.map((j) => ({ slug: j.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const jurusan = await getJurusanData();
  const item = jurusan.find((j) => j.id === slug);
  if (!item) return {};
  return {
    title: `Jurusan ${item.name}`,
    description: `Jurusan ${item.fullName} SMK Plus Melati Samarinda: ${item.description}`,
    alternates: { canonical: `/jurusan/${item.id}` },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: `/jurusan/${item.id}`,
      title: `Jurusan ${item.name} | SMK Plus Melati Samarinda`,
      description: `Jurusan ${item.fullName} SMK Plus Melati Samarinda.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Jurusan ${item.name} | SMK Plus Melati Samarinda`,
      description: `Jurusan ${item.fullName} SMK Plus Melati Samarinda.`,
    },
  };
}

export default async function JurusanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const jurusan = await getJurusanData();
  const item = jurusan.find((j) => j.id === slug);
  if (!item) notFound();

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Jurusan", path: `/jurusan/${item.id}` },
          { name: item.name, path: `/jurusan/${item.id}` },
        ])}
      />
      <JsonLd
        data={programSchema({
          title: `Jurusan ${item.fullName}`,
          path: `/jurusan/${item.id}`,
          description: item.description,
        })}
      />
      <main className="flex-1">
        <PageHero
          eyebrow="Bidang Keahlian"
          title={item.fullName}
          description={item.description}
        />

        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <ClayCard className="p-8 sm:p-12">
                <h2 className="text-2xl font-extrabold text-primary-dark">
                  {item.whyTitle}
                </h2>
                <p className="mt-4 leading-relaxed text-foreground/75">
                  {item.whyText}
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {item.skills.map((skill, i) => (
                    <div
                      key={`${skill}-${i}`}
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
                <span className="clay-chip clay-chip-primary">{item.card1.chip}</span>
                <h3 className="mt-4 text-lg font-extrabold text-primary-dark">
                  {item.card1.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {item.card1.description}
                </p>
              </ClayCard>
            </Reveal>
            <Reveal className="h-full" delay={120}>
              <ClayCard hover className="h-full p-7">
                <span className="clay-chip clay-chip-primary">{item.card2.chip}</span>
                <h3 className="mt-4 text-lg font-extrabold text-primary-dark">
                  {item.card2.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {item.card2.description}
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
