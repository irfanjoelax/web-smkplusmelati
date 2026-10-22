import type { Metadata } from "next";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { CONTACT } from "@/app/components/site";
import { getContent } from "@/app/lib/content";
import type { SpmbSetting } from "@/app/lib/types";
import { breadcrumbSchema, faqSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "SPMB",
  description:
    "SPMB SMK Plus Melati Samarinda 2026/2027: daftar online, cetak bukti pendaftaran, verifikasi berkas, pengumuman, dan daftar ulang. Pendaftaran peserta didik baru dibuka.",
  alternates: {
    canonical: "/spmb",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/spmb",
    title: "SPMB 2026/2027 | SMK Plus Melati Samarinda",
    description:
      "SPMB SMK Plus Melati Samarinda: daftar online, verifikasi berkas, pengumuman, dan daftar ulang.",
    images: ["/images/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SPMB 2026/2027 | SMK Plus Melati Samarinda",
    description:
      "SPMB SMK Plus Melati Samarinda: daftar online, verifikasi berkas, pengumuman, dan daftar ulang.",
    images: ["/images/hero.jpg"],
  },
};

const faqItems = [
  {
    q: "Bagaimana cara mendaftar SPMB SMK Plus Melati?",
    a: "Calon peserta didik mendaftar secara online melalui website SPMB SMK Plus Melati di ppdb.smkplusmelati.sch.id, kemudian mencetak bukti pendaftaran.",
  },
  {
    q: "Apa saja berkas persyaratan SPMB?",
    a: "Bawa dan tunjukkan berkas persyaratan beserta bukti pendaftaran pada panitia SPMB untuk diverifikasi sesuai ketentuan yang berlaku.",
  },
  {
    q: "Kapan pengumuman kelulusan SPMB diumumkan?",
    a: "Setelah data terverifikasi sesuai syarat, hasil pengumuman kelulusan disampaikan di website SMK Plus Melati.",
  },
  {
    q: "Bagaimana cara menghubungi panitia jika kesulitan mendaftar?",
    a: "Hubungi SMK Plus Melati melalui telepon 0851-9157-6889 atau email smkmelatismd@gmail.com untuk bantuan pendaftaran.",
  },
];

export default async function SPMBPage() {
  const spmbSetting = await getContent<SpmbSetting>("spmbSetting");

  return (
    <>
      <Header />
      <JsonLd data={breadcrumbSchema([{ name: "SPMB", path: "/spmb" }])} />
      <JsonLd data={faqSchema(faqItems)} />
      <main className="flex-1">
        <PageHero
          eyebrow="Penerimaan Peserta Didik Baru"
          title="SPMB Online SMK Plus Melati"
          description="Proses SPMB dapat berjalan cepat dan dilakukan di mana pun serta kapan pun selama sesi SPMB Online dibuka — tanpa formulir konvensional."
        />

        <section className="px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="clay-card overflow-hidden rounded-[2.5rem]">
                <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-extrabold text-primary-dark sm:text-3xl">
                    {spmbSetting.title}
                  </h2>
                  <ol className="mt-8 space-y-4">
                    {spmbSetting.steps.map((step, i) => (
                      <li key={step.title} className="flex items-start gap-4">
                        <span className="clay-inset flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-primary">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-bold text-primary-dark">
                            {step.title}
                          </p>
                          <p className="mt-0.5 text-sm leading-relaxed text-foreground/70">
                            {step.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="clay-inset w-full overflow-hidden rounded-[2rem] p-2">
                  <iframe
                    src={spmbSetting.googleFormEmbedUrl ?? CONTACT.googleFormEmbedUrl}
                    title="Formulir kontak SMK Plus Melati Samarinda"
                    className="block h-[480px] w-full rounded-[1.6rem] border-0 sm:h-[560px]"
                    loading="lazy"
                  >
                    Memuat formulir kontak…
                  </iframe>
                </div>
              </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-6xl text-center">
            <Reveal>
              <ClayCard className="p-10 sm:p-14">
              <h2 className="text-2xl font-extrabold text-primary-dark sm:text-3xl">
                Siap Bergabung?
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground/70">
                Mulai langkahmu menuju masa depan yang cerdas, terampil, dan
                berakhlak mulia bersama SMK Plus Melati Samarinda.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="/hubungi-spmb"
                  className="clay-btn clay-btn-accent"
                >
                  Hubungi Panitia SPMB
                </a>
              </div>
            </ClayCard>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
