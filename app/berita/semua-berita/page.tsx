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
  title: "Semua Berita Lainnya",
  description:
    "Kumpulan seluruh berita dan pengumuman lainnya seputar kegiatan dan perkembangan di SMK Plus Melati Samarinda.",
  alternates: {
    canonical: "/berita/semua-berita",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/berita/semua-berita",
    title: "Semua Berita Lainnya | SMK Plus Melati Samarinda",
    description:
      "Kumpulan seluruh berita dan pengumuman lainnya seputar kegiatan dan perkembangan di SMK Plus Melati Samarinda.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Semua Berita Lainnya | SMK Plus Melati Samarinda",
    description:
      "Kumpulan seluruh berita dan pengumuman lainnya seputar kegiatan dan perkembangan di SMK Plus Melati Samarinda.",
  },
};

export const revalidate = 60;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default async function SemuaBeritaPage() {
  const berita = await getContent<BeritaItem[]>("berita");
  const sorted = [...berita].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const otherNews = sorted.filter((item) => item.category !== "utama");

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Berita", path: "/berita" },
          { name: "Semua Berita", path: "/berita/semua-berita" },
        ])}
      />
      <main className="flex-1 bg-white">
        <section className="px-4 pb-20 pt-32 sm:pt-36 lg:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <Link
                href="/berita"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-primary-dark"
              >
                ← Kembali ke Berita Utama
              </Link>
            </div>

            <div className="mb-10 flex items-end justify-between border-b border-primary/15 pb-5">
              <div>
                <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
                  Arsip Berita
                </p>
                <h1 className="text-3xl font-extrabold tracking-tight text-primary-dark sm:text-4xl">
                  Semua Berita Lainnya
                </h1>
              </div>
              <span className="hidden h-1 w-20 bg-accent sm:block" />
            </div>

            {otherNews.length > 0 ? (
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {otherNews.map((item) => (
                  <article key={item.slug} className="group flex flex-col">
                    <Link href={`/berita/${item.slug}`} className="block h-full">
                      <div className="aspect-[4/3] overflow-hidden bg-primary-soft/40">
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
                        <h2 className="mt-3 text-lg font-extrabold leading-snug text-primary-dark transition-colors group-hover:text-primary">
                          {item.title}
                        </h2>
                        {item.desc && (
                          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/60">
                            {item.desc}
                          </p>
                        )}
                        <span className="mt-4 inline-flex items-center gap-2 border-b border-primary/25 pb-1 text-sm font-bold text-primary">
                          Baca Selengkapnya
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <p className="border-y border-primary/15 py-12 text-center text-foreground/60">
                Belum ada berita lainnya yang diterbitkan.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
