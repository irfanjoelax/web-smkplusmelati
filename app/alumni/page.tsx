import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import { breadcrumbSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Alumni",
  description:
    "Alumni SMK Plus Melati Samarinda — jejak langkah lulusan terbaik kami di dunia kerja dan pendidikan tinggi.",
  alternates: {
    canonical: "/alumni",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/alumni",
    title: "Alumni | SMK Plus Melati Samarinda",
    description:
      "Alumni SMK Plus Melati Samarinda — jejak langkah lulusan terbaik kami di dunia kerja dan pendidikan tinggi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alumni | SMK Plus Melati Samarinda",
    description:
      "Alumni SMK Plus Melati Samarinda — jejak langkah lulusan terbaik kami di dunia kerja dan pendidikan tinggi.",
  },
};

export default function AlumniPage() {
  return (
    <>
      <Header />
      <JsonLd data={breadcrumbSchema([{ name: "Alumni", path: "/alumni" }])} />
      <main className="flex-1">
        <PageHero
          eyebrow="Lulusan Kami"
          title="Alumni"
          description="Halaman ini sedang dalam pengembangan. Nantikan informasi lengkap tentang alumni SMK Plus Melati Samarinda."
        />

        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl text-center text-gray-500">
            <p>Konten akan segera hadir.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
