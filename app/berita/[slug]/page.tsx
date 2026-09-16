import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ClayCard from "@/app/components/ClayCard";
import LocalImage from "@/app/components/LocalImage";
import JsonLd from "@/app/components/JsonLd";
import { getContent } from "@/app/lib/content";
import type { BeritaItem } from "@/app/lib/types";
import { breadcrumbSchema } from "@/app/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const all = await getContent<BeritaItem[]>("berita");
  const item = all.find((b) => b.slug === slug);
  if (!item) return { title: "Berita Tidak Ditemukan" };
  return {
    title: item.title,
    description: item.desc,
    alternates: {
      canonical: `/berita/${slug}`,
    },
    openGraph: {
      type: "article",
      locale: "id_ID",
      url: `/berita/${slug}`,
      title: item.title,
      description: item.desc,
      images: [{ url: item.image }],
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
  const all = await getContent<BeritaItem[]>("berita");
  const item = all.find((b) => b.slug === slug);
  if (!item) notFound();

  const dateObj = new Date(item.date);
  const formattedDate = dateObj.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Berita", path: "/berita" },
          { name: item.title, path: `/berita/${slug}` },
        ])}
      />
      <main className="flex-1 px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 mb-6 group"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-white font-bold">
              &lt;
            </span>
            <span className="text-sm font-bold text-primary-dark transition group-hover:text-primary">
              Kembali Ke Halaman Berita
            </span>
          </Link>
          <ClayCard className="overflow-hidden p-0">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[1.4rem] bg-primary-soft/60">
              <LocalImage
                src={item.image}
                alt={item.title}
                width={1200}
                height={675}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="p-6 sm:p-8">
              <time className="clay-chip-primary mb-4 inline-block text-sm">
                {formattedDate}
              </time>
              <h1 className="text-2xl font-extrabold text-primary-dark sm:text-3xl">
                {item.title}
              </h1>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
                {item.content.split("\n").map((paragraph, idx) => {
                  if (!paragraph.trim()) return null;
                  return <p key={idx}>{paragraph}</p>;
                })}
              </div>
            </div>
          </ClayCard>
        </div>
      </main>
      <Footer />
    </>
  );
}