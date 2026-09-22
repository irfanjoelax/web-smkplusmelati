import type { Metadata } from "next";
import Link from "next/link";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import JsonLd from "@/app/components/JsonLd";
import LocalImage from "@/app/components/LocalImage";
import Reveal from "@/app/components/Reveal";
import SectionHeading from "@/app/components/SectionHeading";
import TestimonialMarquee from "@/app/components/TestimonialMarquee";
import { getContent } from "@/app/lib/content";
import { breadcrumbSchema } from "@/app/lib/seo";
import type { AlumniItem, TestimoniOrtuItem } from "@/app/lib/types";

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

export const revalidate = 60;

export default async function AlumniPage() {
  const [rawAlumni, savedTestimonials] = await Promise.all([
    getContent<(AlumniItem & { institution?: string })[]>("alumni"),
    getContent<TestimoniOrtuItem[]>("testimoniOrtu"),
  ]);
  const alumni = rawAlumni.map(({ name, graduationYear, major, status, testimonial, institution, image }) => ({
    name,
    graduationYear,
    major,
    status,
    testimonial: testimonial ?? institution ?? "",
    image,
  }));
  const testimonials = savedTestimonials;
  const featuredAlumni = alumni.slice(0, 6);

  return (
    <>
      <Header />
      <JsonLd data={breadcrumbSchema([{ name: "Alumni", path: "/alumni" }])} />
      <main className="flex-1">
        <section className="px-4 pt-8 sm:pt-10">
          <div className="clay-card-blue mx-auto max-w-6xl rounded-[1.75rem] px-6 py-9 text-center sm:px-10 sm:py-11">
            <span className="clay-chip-blue mx-auto mb-3">Lulusan Kami</span>
            <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-4xl">
              Jejak Alumni SMK Plus Melati
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
              Mengenal perjalanan para lulusan yang terus berkarya di dunia kerja, pendidikan tinggi, dan dunia usaha.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Jejak Lulusan"
              title="Alumni Kami"
              description="Cerita lulusan SMK Plus Melati dalam melanjutkan langkah dan mengembangkan potensi setelah sekolah."
            />

            {featuredAlumni.length === 0 ? (
              <ClayCard className="mx-auto mt-8 max-w-2xl px-6 py-8 text-center sm:px-10">
                <p className="font-extrabold text-primary-dark">Profil alumni segera hadir</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                  Kami sedang menyiapkan kisah perjalanan alumni SMK Plus Melati Samarinda.
                </p>
              </ClayCard>
            ) : (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featuredAlumni.map((item, index) => (
                  <ClayCard key={`${item.name}-${item.graduationYear}-${index}`} hover className="flex h-full min-w-0 items-start gap-3 overflow-hidden p-3.5">
                    <div className="clay-inset h-24 w-24 shrink-0 overflow-hidden rounded-2xl p-1.5 sm:h-28 sm:w-24">
                      <LocalImage
                        src={item.image}
                        alt={`Foto ${item.name}`}
                        width={240}
                        height={280}
                        className="h-full w-full rounded-xl object-cover"
                        placeholderClassName="h-full rounded-xl p-2 [&_p]:hidden [&_svg]:h-7 [&_svg]:w-7"
                      />
                    </div>
                    <div className="min-w-0 flex-1 py-0.5">
                      <h2 className="[overflow-wrap:anywhere] text-base font-extrabold leading-tight text-primary-dark">{item.name}</h2>
                      <p className="mt-1 [overflow-wrap:anywhere] text-xs font-semibold leading-snug text-foreground/65">
                        Lulus {item.graduationYear} · {item.major}
                      </p>
                      <span className="mt-2 inline-flex rounded-full bg-accent-soft px-2 py-0.5 text-[0.65rem] font-extrabold text-accent-dark">
                        {item.status}
                      </span>
                      <p className="mt-1.5 line-clamp-3 [overflow-wrap:anywhere] text-xs leading-relaxed text-foreground/70">{item.testimonial}</p>
                    </div>
                  </ClayCard>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="clay-card-blue rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
                <SectionHeading
                  eyebrow="Cerita Mereka"
                  title="Testimoni Orang Tua"
                  description="Pengalaman dan kesan orang tua selama putra-putrinya bertumbuh bersama SMK Plus Melati."
                  variant="dark"
                />
                {testimonials.length > 0 ? (
                  <div className="mt-8">
                    <TestimonialMarquee testimonials={testimonials} />
                  </div>
                ) : (
                  <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-white/75">
                    Testimoni orang tua sedang disiapkan dan akan tampil setelah data ditambahkan.
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <ClayCard className="px-6 py-10 text-center sm:px-12 sm:py-14">
                <span className="clay-chip-gold mx-auto mb-5">SPMB 2026</span>
                <h2 className="text-2xl font-extrabold text-primary-dark sm:text-4xl">
                  Jadilah Bagian dari Generasi Berikutnya
                </h2>
                <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-foreground/70">
                  Mulai langkah menuju masa depan yang terampil, mandiri, dan berkarakter bersama SMK Plus Melati Samarinda.
                </p>
                <Link href="/spmb" className="clay-btn clay-btn-accent mt-8">
                  Daftar SPMB 2026
                </Link>
              </ClayCard>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
