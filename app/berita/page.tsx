import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import JsonLd from "@/app/components/JsonLd";
import LocalImage from "@/app/components/LocalImage";
import { getContent } from "@/app/lib/content";
import type { BeritaItem } from "@/app/lib/types";
import { breadcrumbSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Berita Sekolah",
  description:
    "Informasi terbaru seputar kegiatan, prestasi, dan pengumuman dari SMK Plus Melati Samarinda.",
  alternates: {
    canonical: "/berita",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/berita",
    title: "Berita Sekolah | SMK Plus Melati Samarinda",
    description:
      "Informasi terbaru seputar kegiatan, prestasi, dan pengumuman dari SMK Plus Melati Samarinda.",
    images: ["/images/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Berita Sekolah | SMK Plus Melati Samarinda",
    description:
      "Informasi terbaru seputar kegiatan, prestasi, dan pengumuman dari SMK Plus Melati Samarinda.",
    images: ["/images/hero.jpg"],
  },
};

export const revalidate = 60;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default async function BeritaPage() {
  const berita = await getContent<BeritaItem[]>("berita");
  // Urutkan dari terbaru
  const sorted = [...berita].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const mainNews = sorted.filter((item) => item.category === "utama").slice(0, 4);
  const headline = mainNews[0];
  const selectedNews = mainNews.slice(1);
  const otherNews = sorted.filter((item) => item.category !== "utama").slice(0, 4);

  return (
    <>
      <Header />
      <JsonLd data={breadcrumbSchema([{ name: "Berita", path: "/berita" }])} />
      <main className="flex-1 bg-white">
        <section className="px-4 pb-20 pt-32 sm:pt-36 lg:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-end justify-between border-b border-primary/15 pb-5">
              <div>
                <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
                  Informasi Terkini
                </p>
                <h1 className="text-3xl font-extrabold tracking-tight text-primary-dark sm:text-4xl">
                  Berita Utama
                </h1>
              </div>
              <span className="hidden h-1 w-20 bg-accent sm:block" />
            </div>

            {headline ? (
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)] lg:gap-12">
                <article className="group">
                  <Link href={`/berita/${headline.slug}`} className="block">
                    <div className="aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-primary/10 bg-primary-soft/40">
                      <LocalImage
                        src={headline.image}
                        alt={headline.title}
                        width={1200}
                        height={750}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="pt-6">
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider">
                        <span className="bg-accent px-3 py-1.5 text-primary-dark">
                          Berita Sekolah
                        </span>
                        <time className="text-foreground/50">
                          {formatDate(headline.date)}
                        </time>
                      </div>
                      <h2 className="max-w-3xl text-2xl font-extrabold leading-tight text-primary-dark transition-colors group-hover:text-primary sm:text-3xl lg:text-4xl">
                        {headline.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/65 sm:text-base">
                        {headline.desc}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-primary">
                        Baca Selengkapnya
                      </span>
                    </div>
                  </Link>
                </article>

                <div className="divide-y divide-primary/15 border-y border-primary/15 lg:border-t-0">
                  {selectedNews.map((item) => (
                    <article key={item.slug} className="group py-6 first:pt-0 lg:first:pt-0">
                      <Link
                        href={`/berita/${item.slug}`}
                        className="grid grid-cols-[112px_minmax(0,1fr)] gap-5 sm:grid-cols-[150px_minmax(0,1fr)] lg:grid-cols-[120px_minmax(0,1fr)]"
                      >
                        <div className="aspect-[4/3] overflow-hidden rounded-xl border border-primary/10 bg-primary-soft/40">
                          <LocalImage
                            src={item.image}
                            alt={item.title}
                            width={360}
                            height={270}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0 self-center">
                          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary">
                            Berita Sekolah
                            <span className="mx-2 text-accent-dark">/</span>
                            <time className="text-foreground/45">
                              {formatDate(item.date)}
                            </time>
                          </p>
                          <h2 className="line-clamp-3 text-base font-extrabold leading-snug text-primary-dark transition-colors group-hover:text-primary sm:text-lg">
                            {item.title}
                          </h2>
                          <p className="mt-2 hidden line-clamp-2 text-sm leading-relaxed text-foreground/60 sm:block lg:hidden xl:block">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <p className="border-y border-primary/15 py-12 text-center text-foreground/60">
                Belum ada berita utama yang diterbitkan.
              </p>
            )}
          </div>
        </section>

        {otherNews.length > 0 && (
          <section id="berita-terbaru" className="bg-primary-soft/25 px-4 py-20 lg:py-24">
            <div className="mx-auto max-w-6xl">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-5 border-b border-primary/15 pb-5">
                <div>
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
                    Warta Sekolah
                  </p>
                  <h2 className="text-3xl font-extrabold tracking-tight text-primary-dark sm:text-4xl">
                    Berita Lainnya
                  </h2>
                </div>
                <Link
                  href="/berita/semua-berita"
                  className="text-sm font-extrabold text-primary transition-colors hover:text-primary-dark"
                >
                  Lihat Semua Berita
                </Link>
              </div>

              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {otherNews.map((item) => (
                  <article key={item.slug} className="group">
                    <Link href={`/berita/${item.slug}`} className="block h-full">
                      <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-primary/10 bg-white">
                        <LocalImage
                          src={item.image}
                          alt={item.title}
                          width={640}
                          height={480}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="pt-5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                          Berita Sekolah
                          <span className="mx-2 text-accent-dark">/</span>
                          <time className="text-foreground/45">
                            {formatDate(item.date)}
                          </time>
                        </p>
                        <h3 className="mt-3 text-lg font-extrabold leading-snug text-primary-dark transition-colors group-hover:text-primary">
                          {item.title}
                        </h3>
                        <span className="mt-4 inline-flex items-center gap-2 border-b border-primary/25 pb-1 text-sm font-bold text-primary">
                          Baca Selengkapnya
                        </span>
                      </div>
                    </Link>
                  </article>
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
