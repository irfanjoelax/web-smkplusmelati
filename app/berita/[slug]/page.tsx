import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import LocalImage from "@/app/components/LocalImage";
import JsonLd from "@/app/components/JsonLd";
import { getContent } from "@/app/lib/content";
import type { BeritaItem } from "@/app/lib/types";
import { breadcrumbSchema, newsArticleSchema, SITE_NAME } from "@/app/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const sortByLatest = (items: BeritaItem[]) =>
  [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const all = await getContent<BeritaItem[]>("berita");
  const item = all.find((news) => news.slug === slug);
  if (!item) return { title: "Berita Tidak Ditemukan" };

  return {
    title: item.title,
    description: item.desc,
    alternates: { canonical: `/berita/${slug}` },
    openGraph: {
      type: "article",
      locale: "id_ID",
      url: `/berita/${slug}`,
      title: item.title,
      description: item.desc,
      images: [{ url: item.image }],
      publishedTime: item.createdAt ?? item.date,
      modifiedTime: item.updatedAt ?? item.createdAt ?? item.date,
      authors: [SITE_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.desc,
      images: [item.image],
    },
  };
}

export async function generateStaticParams() {
  const all = await getContent<BeritaItem[]>("berita");
  return all.map((item) => ({ slug: item.slug }));
}

export const revalidate = 60;

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;
  const sorted = sortByLatest(await getContent<BeritaItem[]>("berita"));
  const item = sorted.find((news) => news.slug === slug);
  if (!item) notFound();

  const otherNews = sorted.filter((news) => news.slug !== slug);
  const sidebarNews = otherNews.slice(0, 3);
  const recommendations = otherNews.slice(0, 3);

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Berita", path: "/berita" },
          { name: item.title, path: `/berita/${slug}` },
        ])}
      />
      <JsonLd
        data={newsArticleSchema({
          title: item.title,
          description: item.desc,
          path: `/berita/${slug}`,
          image: item.image,
          publishedAt: item.createdAt ?? item.date,
          modifiedAt: item.updatedAt,
        })}
      />

      <main className="flex-1 bg-[#f7fbfe] pb-20 pt-28 sm:pt-32 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <article>
            <header className="mx-auto max-w-5xl pb-10 pt-6 text-center sm:pb-12 sm:pt-10">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-primary-darker">
                  Berita Sekolah
                </span>
                <time dateTime={item.date} className="text-sm font-bold text-primary/65">
                  {formatDate(item.date)}
                </time>
              </div>
              <h1 className="mt-6 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-primary-darker sm:text-5xl lg:text-6xl">
                {item.title}
              </h1>
              {item.desc && (
                <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-8 text-foreground/65 sm:text-xl sm:leading-9">
                  {item.desc}
                </p>
              )}
            </header>

            <figure className="overflow-hidden rounded-[1.75rem] border border-white bg-white p-2 shadow-[0_24px_80px_rgba(16,112,176,0.16)] sm:rounded-[2.25rem] sm:p-3">
              <div className="aspect-[16/9] overflow-hidden rounded-[1.35rem] bg-primary-soft sm:rounded-[1.75rem]">
                <LocalImage
                  src={item.image}
                  alt={item.title}
                  width={1600}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start xl:gap-14">
              <div className="rounded-[1.75rem] border border-primary/10 bg-white px-6 py-8 shadow-[0_16px_50px_rgba(16,112,176,0.08)] sm:px-10 sm:py-12 lg:px-12">
                <div className="mx-auto max-w-[72ch]">
                  {item.desc && (
                    <p className="mb-9 border-l-4 border-accent pl-5 text-lg font-bold leading-8 text-primary-dark sm:text-xl sm:leading-9">
                      {item.desc}
                    </p>
                  )}
                  <div className="space-y-6 text-base leading-8 text-foreground/80 sm:text-lg sm:leading-9">
                    {item.content.split("\n").map((paragraph, index) =>
                      paragraph.trim() ? <p key={index}>{paragraph}</p> : null,
                    )}
                  </div>
                </div>
              </div>

              <aside aria-labelledby="more-news-title" className="lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white shadow-[0_16px_50px_rgba(16,112,176,0.08)]">
                  <div className="border-b border-primary/10 bg-primary-darker px-5 py-5 text-white">
                    <h2 id="more-news-title" className="text-xl font-extrabold">Berita Terbaru</h2>
                  </div>
                  <div className="divide-y divide-primary/10">
                    {sidebarNews.map((news) => (
                      <Link
                        key={news.slug}
                        href={`/berita/${news.slug}`}
                        className="group grid min-h-24 grid-cols-[76px_minmax(0,1fr)] gap-3 p-4 transition-colors hover:bg-primary-soft/55 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                      >
                        <div className="aspect-square overflow-hidden rounded-xl bg-primary-soft">
                          <LocalImage
                            src={news.image}
                            alt=""
                            width={152}
                            height={152}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <span className="min-w-0 self-center">
                          <time dateTime={news.date} className="text-[11px] font-bold uppercase tracking-wider text-primary/65">
                            {formatDate(news.date)}
                          </time>
                          <span className="mt-1 line-clamp-2 block text-sm font-extrabold leading-snug text-primary-dark transition-colors group-hover:text-primary">
                            {news.title}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-primary/10 p-4">
                    <Link href="/berita" className="clay-btn w-full text-sm">Lihat Semua Berita</Link>
                  </div>
                </div>
              </aside>
            </div>
          </article>

          {recommendations.length > 0 && (
            <section aria-labelledby="continue-reading-title" className="mt-20 border-t border-primary/15 pt-12">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <h2 id="continue-reading-title" className="text-2xl font-extrabold text-primary-darker sm:text-3xl">Berita Pilihan untuk Anda</h2>
                  <p className="mt-2 text-sm leading-7 text-foreground/60">Temukan kegiatan dan informasi sekolah lainnya.</p>
                </div>
                <Link href="/berita" className="inline-flex min-h-11 items-center text-sm font-extrabold text-primary hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  Jelajahi Semua Berita
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((news) => (
                  <article key={news.slug} className="group h-full overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white shadow-[0_12px_36px_rgba(16,112,176,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(16,112,176,0.16)]">
                    <Link href={`/berita/${news.slug}`} className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary">
                      <div className="aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-primary/10 bg-primary-soft">
                        <LocalImage src={news.image} alt={news.title} width={720} height={450} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <time dateTime={news.date} className="text-xs font-bold uppercase tracking-wider text-primary/65">{formatDate(news.date)}</time>
                        <h3 className="mt-2 line-clamp-2 text-xl font-extrabold leading-snug text-primary-dark transition-colors group-hover:text-primary">{news.title}</h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-foreground/60">{news.desc}</p>
                        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-extrabold text-primary">Baca Berita</span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
