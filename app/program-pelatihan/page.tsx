import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import SectionHeading from "@/app/components/SectionHeading";
import { IMAGES } from "@/app/components/images";
import { breadcrumbSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Program Pelatihan",
  description:
    "Program pelatihan unggulan SMK Plus Melati Samarinda: pembuatan aplikasi Android dan pencetak wirausaha tata boga untuk membekali siswa keterampilan bernilai jual tinggi.",
  alternates: {
    canonical: "/program-pelatihan",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/program-pelatihan",
    title: "Program Pelatihan | SMK Plus Melati Samarinda",
    description:
      "Program pelatihan unggulan SMK Plus Melati: pembuatan aplikasi Android dan pencetak wirausaha tata boga.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Program Pelatihan | SMK Plus Melati Samarinda",
    description:
      "Program pelatihan unggulan SMK Plus Melati: pembuatan aplikasi Android dan pencetak wirausaha tata boga.",
  },
};

export default function ProgramPelatihanPage() {
  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Program", path: "/program-pelatihan" },
          { name: "Program Pelatihan", path: "/program-pelatihan" },
        ])}
      />
      <main className="flex-1">
        <PageHero
          eyebrow="Program Unggulan"
          title="Program Pelatihan"
          description="Membekali siswa keterampilan praktis yang bisa menjadi keahlian khusus dan bernilai jual tinggi."
        />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <Reveal>
              <ImageCard
                src={IMAGES.pelatihanAndroid}
                alt="Pembuatan aplikasi Android"
                title="Pembuatan Aplikasi Android"
                description="Siswa dibekali materi terlebih dahulu sebelum praktik, sehingga kegiatan berjalan sesuai aturan. Kemampuan ini menjadi keahlian khusus yang bisa dimanfaatkan banyak orang."
                aspect="aspect-[4/3]"
              />
            </Reveal>
            <Reveal delay={120}>
              <ImageCard
                src={IMAGES.pelatihanWirausaha}
                alt="Pelatihan wirausaha Tata Boga"
                title="Pencetak Wirausaha"
                description="Ruang khusus untuk bereksperimen membuat makanan. Siswa belajar seni memasak yang bernilai jual, dari proses pembuatan hingga penyajian yang menarik."
                aspect="aspect-[4/3]"
              />
            </Reveal>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Catatan"
              title="Diharapkan dari Program Ini"
              description="Setiap pelatihan dirancang agar siswa mampu menghasilkan karya yang bermanfaat bagi masyarakat luas."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Reveal>
                <p className="rounded-[1.75rem] bg-primary-soft/70 p-7 leading-relaxed text-foreground/75">
                  Diharapkan dengan adanya program pelatihan ini, siswa/i SMK Plus
                  Melati Samarinda bisa membuat aplikasi yang nantinya bisa
                  dimanfaatkan oleh orang banyak, yang memberi manfaat bagi siswa
                  dan lingkungan sekitarnya.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p className="rounded-[1.75rem] bg-accent-soft/70 p-7 leading-relaxed text-foreground/75">
                  Semua orang bisa memasak, namun tidak semua orang tahu seni
                  memasak. Diharapkan dengan fasilitas ruangan memasak dan
                  program pelatihan ini, bisa mencetak seorang yang profesional di
                  bidang tata boga.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
