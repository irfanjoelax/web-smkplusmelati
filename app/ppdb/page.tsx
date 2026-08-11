import type { Metadata } from "next";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import LocalImage from "@/app/components/LocalImage";
import PageHero from "@/app/components/PageHero";
import { IMAGES } from "@/app/components/images";
import { CONTACT } from "@/app/components/site";

export const metadata: Metadata = {
  title: "PPDB",
};

const steps = [
  {
    title: "Daftar Online",
    desc: "Calon peserta didik mendaftar secara online melalui website PPDB SMK Plus Melati.",
  },
  {
    title: "Cetak Bukti Pendaftaran",
    desc: "Calon peserta didik mencetak bukti hasil pendaftaran online mandiri.",
  },
  {
    title: "Verifikasi Berkas",
    desc: "Bawa dan tunjukkan berkas persyaratan beserta bukti pendaftaran pada panitia PPDB untuk verifikasi.",
  },
  {
    title: "Menunggu Pengumuman",
    desc: "Setelah data terverifikasi sesuai syarat, peserta menunggu hasil pengumuman.",
  },
  {
    title: "Daftar Ulang",
    desc: "Pengumuman disampaikan di website SMK Plus Melati. Siswa yang lulus melanjutkan ke tahap daftar ulang.",
  },
];

export default function PPDBPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Penerimaan Peserta Didik Baru"
          title="PPDB Online SMK Plus Melati"
          description="Proses PPDB dapat berjalan cepat dan dilakukan di mana pun serta kapan pun selama sesi PPDB Online dibuka — tanpa formulir konvensional."
        />

        <section className="px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="clay-card overflow-hidden rounded-[2.5rem]">
              <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
                <div>
                  <span className="clay-chip clay-chip-primary mb-4">
                    Jalur Prestasi
                  </span>
                  <h2 className="text-2xl font-extrabold text-primary-dark sm:text-3xl">
                    Prosedur PPDB Online 2026/2027
                  </h2>
                  <ol className="mt-8 space-y-4">
                    {steps.map((step, i) => (
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
                <div className="clay-inset overflow-hidden rounded-[2rem] p-2">
                  <LocalImage
                    src={IMAGES.ppdb2}
                    alt="PPDB SMK Plus Melati"
                    width={800}
                    height={600}
                    className="h-80 w-full rounded-[1.6rem] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-4xl text-center">
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
                  href={CONTACT.ppdbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn clay-btn-accent"
                >
                  Menuju Link PPDB
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="clay-btn"
                >
                  Tanya via Email
                </a>
              </div>
            </ClayCard>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
