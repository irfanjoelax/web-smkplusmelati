import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import PageHero from "@/app/components/PageHero";
import { IMAGES } from "@/app/components/images";

export const metadata: Metadata = {
  title: "Prestasi Siswa",
};

export default function PrestasiSiswaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Pencapaian"
          title="Prestasi Siswa"
          description="Sertifikasi internasional sebagai bukti kemampuan dan nilai saing lulusan SMK Plus Melati di dunia kerja."
        />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div>
              <ImageCard
                src={IMAGES.prestasiToeic}
                alt="Sertifikat TOEIC"
                title="Peraih Sertifikat TOEIC"
                description="TOEIC (Test of English for International Communication) adalah ujian bahasa Inggris terstandar yang diakui ribuan lembaga pendidikan dan perusahaan di seluruh dunia. Lulusan SMK Plus Melati Samarinda telah tersertifikasi secara internasional."
              />
            </div>
            <div>
              <ImageCard
                src={IMAGES.prestasiMtcna}
                alt="Sertifikat MTCNA"
                title="Peraih Sertifikat MTCNA"
                description="MTCNA adalah sertifikasi jaringan komputer tingkat dasar berbasis teknologi Mikrotik. Selain skill yang dimiliki, SMK Plus Melati juga memiliki bukti akan kemampuan yang dimiliki oleh siswa/i-nya."
              />
            </div>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-4xl">
            <div className="clay-card p-8 sm:p-12">
              <p className="text-center text-lg font-extrabold text-primary-dark">
                &ldquo;Saat ini perkembangan zaman sangat pesat. Tidak semua
                bisa dilakukan dengan skill, namun harus ada bukti atau
                pengakuan bahwa skill itu memang ada — tentunya dalam bentuk
                sertifikat.&rdquo;
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
