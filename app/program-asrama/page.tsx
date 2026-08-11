import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import PageHero from "@/app/components/PageHero";
import { IMAGES } from "@/app/components/images";

export const metadata: Metadata = {
  title: "Program Asrama",
};

const jadwal = [
  "Bangun Pukul 04.00 WITA",
  "Apel Pagi, Sore dan Malam",
  "Mengaji Berjamaah",
  "Sholat Berjamaah",
  "Kurve Asrama (Piket)",
  "Rabu Bersih dan Jum'at Bersih",
];

export default function ProgramAsramaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Program Unggulan"
          title="Program Asrama"
          description="Membentuk kedisiplinan dan kemandirian siswa melalui kegiatan yang terjadwal setiap hari."
        />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <ImageCard
              src={IMAGES.asramaMengaji}
              alt="Mengaji berjamaah di asrama"
              title="Mengaji Berjamaah"
              description="Kegiatan rutin mengaji bersama yang memperkuat keimanan dan kebersamaan antar siswa."
              aspect="aspect-[4/3]"
            />
            <ImageCard
              src={IMAGES.asramaSholat}
              alt="Sholat berjamaah di asrama"
              title="Sholat Berjamaah"
              description="Setiap malam diadakan kegiatan sholat berjamaah dan ngaji di Mesjid Qiwamul Ummah."
              aspect="aspect-[4/3]"
            />
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-4xl">
            <div className="clay-card p-8 sm:p-12">
              <h2 className="text-center text-2xl font-extrabold text-primary-dark">
                Rutinitas Harian Asrama
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {jadwal.map((item, i) => (
                  <div
                    key={item}
                    className="clay-inset flex items-center gap-3 rounded-2xl px-5 py-4"
                  >
                    <span className="clay-chip clay-chip-primary !px-2.5">
                      0{i + 1}
                    </span>
                    <span className="text-sm font-semibold text-foreground/80">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
