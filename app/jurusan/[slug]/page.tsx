import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import JsonLd from "@/app/components/JsonLd";
import LocalImage from "@/app/components/LocalImage";
import PracticeGallery from "@/app/components/PracticeGallery";
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
      images: [item.image || "/images/hero.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `Jurusan ${item.name} | SMK Plus Melati Samarinda`,
      description: `Jurusan ${item.fullName} SMK Plus Melati Samarinda.`,
      images: [item.image || "/images/hero.jpg"],
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
  const heroImage = item.image ||
    (item.id === "tjkt"
      ? "/images/pelatihan-android.jpg"
      : item.id === "kuliner"
        ? "/images/pelatihan-wirausaha.jpg"
        : "/images/hero.jpg");

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([{ name: item.name, path: `/jurusan/${item.id}` }])}
      />
      <JsonLd
        data={programSchema({
          title: `Jurusan ${item.fullName}`,
          path: `/jurusan/${item.id}`,
          description: item.description,
        })}
      />
      <main className="flex-1">
        <section className="relative px-4 pt-10 sm:pt-14">
          <div className="clay-card-blue relative mx-auto max-w-6xl overflow-hidden rounded-[2rem]">
            <span className="clay-orb h-44 w-44 -left-16 -top-16 animate-float-orb opacity-70" />
            <span className="clay-orb-ghost h-36 w-36 -bottom-16 left-1/3 opacity-70" />
            <div className="relative grid items-center gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-14 lg:py-14">
              <Reveal>
                <div className="text-left">
                  <span className="clay-chip-blue mb-5">Bidang Keahlian</span>
                  <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                    {item.fullName}
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                    {item.description}
                  </p>
                  <span className="mt-7 block h-1 w-20 rounded-full bg-accent" />
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="overflow-hidden rounded-[1.5rem] border-4 border-white/15 bg-white/10 p-1.5 shadow-2xl shadow-primary-darker/30">
                  <div className="aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-primary-soft">
                    <LocalImage
                      src={heroImage}
                      alt={`Kegiatan jurusan ${item.fullName}`}
                      width={900}
                      height={675}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
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

        {/* ===== GALERI KEGIATAN PRAKTIK ===== */}
        {(() => {
          const practiceList =
            item.practiceImages && item.practiceImages.length > 0
              ? item.practiceImages
              : [
                  { image: `/images/jurusan/${item.id}/praktek-1.jpg`, title: "Kegiatan Praktik 1" },
                  { image: `/images/jurusan/${item.id}/praktek-2.jpg`, title: "Kegiatan Praktik 2" },
                  { image: `/images/jurusan/${item.id}/praktek-3.jpg`, title: "Kegiatan Praktik 3" },
                  { image: `/images/jurusan/${item.id}/praktek-4.jpg`, title: "Kegiatan Praktik 4" },
                ];
          return (
            <section className="px-4 pb-16">
              <div className="mx-auto max-w-6xl">
                <Reveal>
                  <PracticeGallery
                    title={`Kegiatan Praktik ${item.name}`}
                    subtitle={`Dokumentasi suasana praktik dan pembelajaran kejuruan siswa ${item.fullName}.`}
                    totalItems={practiceList.length}
                  >
                    {practiceList.map((activity, idx) => (
                      <div
                        key={`${activity.image}-${idx}`}
                        className="w-full shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
                      >
                        <ClayCard hover className="h-full overflow-hidden p-3">
                          <div className="aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-primary-soft/60">
                            <LocalImage
                              src={activity.image}
                              alt={`${activity.title} - ${item.name}`}
                              width={600}
                              height={450}
                              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                          <div className="p-3 text-center">
                            <p className="text-sm font-extrabold text-primary-dark">
                              {activity.title}
                            </p>
                          </div>
                        </ClayCard>
                      </div>
                    ))}
                  </PracticeGallery>
                </Reveal>
              </div>
            </section>
          );
        })()}

        <section className="px-4 pb-24">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
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
