import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import PageHero from "@/app/components/PageHero";
import { IMAGES } from "@/app/components/images";

export const metadata: Metadata = {
  title: "Program Keagamaan",
};

const items = [
  {
    title: "Sholat Dhuha",
    desc: "Siswa diarahkan ke masjid untuk melaksanakan sholat dhuha sebagai pembuka kegiatan belajar.",
    image: IMAGES.keagamaanDhuha,
  },
  {
    title: "Mengaji Pagi",
    desc: "Aktifitas mengaji pagi sebelum memulai pembelajaran untuk menanamkan nilai keagamaan.",
    image: IMAGES.keagamaanMengaji,
  },
  {
    title: "Sholat Berjamaah",
    desc: "Sholat fardu berjamaah dilaksanakan pada jam istirahat di masjid.",
    image: IMAGES.keagamaanSholat,
  },
  {
    title: "Khataman Al-Qur'an",
    desc: "Kegiatan khataman Al-Qur'an rutin dilaksanakan beberapa bulan sekali.",
    image: IMAGES.keagamaanKhataman,
  },
];

export default function ProgramKeagamaanPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Program Unggulan"
          title="Program Keagamaan"
          description="Menanamkan keimanan dan ketaqwaan melalui pengalaman ajaran agama dalam keseharian siswa."
        />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
            {items.map((item) => (
              <ImageCard
                key={item.title}
                src={item.image}
                alt={item.title}
                title={item.title}
                description={item.desc}
              />
            ))}
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-4xl">
            <div className="clay-card p-8 text-center sm:p-12">
              <span className="clay-chip clay-chip-primary">Perayaan Hari Besar</span>
              <p className="mt-6 leading-relaxed text-foreground/75">
                Perayaan hari besar merupakan program rutinan keagamaan. Pada
                hari perayaan ini, siswa difokuskan untuk mengikuti kegiatan
                hingga selesai, dan tidak ada kegiatan belajar mengajar pada
                hari tersebut.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
