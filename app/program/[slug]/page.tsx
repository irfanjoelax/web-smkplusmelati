import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { getProgramData } from "@/app/lib/program";
import { breadcrumbSchema, programSchema } from "@/app/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const programs = await getProgramData();
  return programs.map((program) => ({ slug: program.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = (await getProgramData()).find((program) => program.id === slug);
  if (!item) return {};
  const path = `/program-${item.id}`;
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "id_ID", url: path, title: `${item.title} | SMK Plus Melati Samarinda`, description: item.description, images: [item.cards[0]?.image || "/images/hero.jpg"] },
    twitter: { card: "summary_large_image", title: `${item.title} | SMK Plus Melati Samarinda`, description: item.description, images: [item.cards[0]?.image || "/images/hero.jpg"] },
  };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = (await getProgramData()).find((program) => program.id === slug);
  if (!item) notFound();
  const path = `/program-${item.id}`;

  return (
    <>
      <Header />
      <JsonLd data={breadcrumbSchema([{ name: item.title, path }])} />
      <JsonLd data={programSchema({ title: item.title, path, description: item.description })} />
      <main className="flex-1">
        <PageHero eyebrow="Program Unggulan" title={item.title} description={item.description} />
        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {item.cards.map((card, index) => (
              <Reveal key={`${card.title}-${index}`} delay={index * 80}>
                <ImageCard src={card.image} alt={card.title} title={card.title} description={card.description} />
              </Reveal>
            ))}
          </div>
        </section>

        {item.section?.items && item.section.items.length > 0 && (
          <section className="px-4 pb-24">
            <div className="clay-card mx-auto max-w-6xl p-8 sm:p-12">
              <h2 className="text-center text-2xl font-extrabold text-primary-dark">{item.section.title}</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {item.section.items.map((text, index) => (
                  <div key={`${text}-${index}`} className="clay-inset flex items-center gap-3 rounded-2xl px-5 py-4">
                    <span className="clay-chip clay-chip-primary !px-2.5">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-semibold text-foreground/80">{text}</span>
                  </div>
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
