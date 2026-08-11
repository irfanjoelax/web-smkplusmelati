import type { Metadata } from "next";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import LocalImage from "@/app/components/LocalImage";
import PageHero from "@/app/components/PageHero";
import SectionHeading from "@/app/components/SectionHeading";
import { IMAGES } from "@/app/components/images";

export const metadata: Metadata = {
  title: "Profil",
};

const reasons = [
  {
    title: "Pemilihan Bidang Keahlian",
    desc: "Beragam pilihan bidang keahlian sesuai minat dan bakat, mengikuti perkembangan era modern dan permintaan industri.",
  },
  {
    title: "Pembekalan Kewirausahaan",
    desc: "Siswa diajarkan berwirausaha dengan baik, sehingga mampu menciptakan lapangan kerja sendiri dan menggerakkan ekonomi kreatif.",
  },
  {
    title: "Bisa Melanjutkan ke Perguruan Tinggi",
    desc: "Lulusan SMK juga berkesempatan melanjutkan ke jenjang pendidikan tinggi. SMK bukan penghalang untuk kuliah.",
  },
  {
    title: "Lulusan Bisa Langsung Bekerja",
    desc: "Berbekal PKL (Praktek Kerja Lapangan), lulusan siap bekerja di dunia industri tanpa perlu waktu lama untuk beradaptasi.",
  },
];

export default function ProfilPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Tentang Kami"
          title="Profil SMK Plus Melati"
          description="Menjadi garda terdepan demi tercapainya sumber daya manusia yang berilmu dan beradab di Kalimantan Timur."
        />

        <section className="px-4 py-14">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
            <div className="relative">
              <ClayCard className="overflow-hidden p-3">
                <LocalImage
                  src={IMAGES.profil1}
                  alt="Kegiatan SMK Plus Melati"
                  width={800}
                  height={600}
                  className="h-72 w-full rounded-[1.6rem] object-cover sm:h-96"
                />
              </ClayCard>
              <ClayCard className="absolute -bottom-6 -right-4 hidden p-5 sm:block">
                <p className="text-2xl font-extrabold text-primary">Yayasan Melati</p>
                <p className="text-xs font-semibold text-foreground/60">
                  Kurang lebih 30 tahun mengabdi di Kaltim
                </p>
              </ClayCard>
            </div>
            <div>
              <SectionHeading
                center={false}
                eyebrow="Profil Singkat"
                title="Pendidikan untuk Masa Depan IKN"
              />
              <div className="mt-5 space-y-4 leading-relaxed text-foreground/75">
                <p>
                  Dinobatkan sebagai ibukota baru Indonesia, pendidikan yang
                  merata dan berkualitas menjadi prioritas dalam pembangunan
                  sumber daya manusia guna menyokong kebutuhan industri.
                </p>
                <p>
                  Yayasan Melati, kurang lebih 30 tahun menjadi bagian dari
                  upaya pengembangan sumber daya manusia di Kalimantan Timur,
                  kini ingin menjadi garda terdepan demi tercapainya SDM yang
                  berilmu dan beradab.
                </p>
                <p>
                  Sebagai SMK, pembelajaran di SMK Plus Melati menghadirkan
                  <strong> 60% praktik dan 40% teori</strong> sehingga siswa
                  siap menghadapi dunia kerja.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Alasan Memilih"
              title="Mengapa Harus SMK Plus Melati?"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {reasons.map((r, i) => (
                <ClayCard key={r.title} hover className="p-8">
                  <span className="clay-chip clay-chip-primary mb-4">
                    0{i + 1}
                  </span>
                  <h3 className="text-lg font-extrabold text-primary-dark">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {r.desc}
                  </p>
                </ClayCard>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-6xl">
            <ClayCard className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
              <div className="clay-inset overflow-hidden rounded-[1.6rem] p-2">
                <LocalImage
                  src={IMAGES.profil2}
                  alt="Suasana sekolah"
                  width={800}
                  height={600}
                  className="h-72 w-full rounded-[1.3rem] object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-primary-dark">
                  Siap Menyambut Era Smart Capital
                </h3>
                <p className="mt-4 leading-relaxed text-foreground/75">
                  Ibu Kota Baru menjadi kalangan perkembangan kebutuhan
                  industri yang bertransformasi menjadi lingkungan
                  berteknologi tinggi. SMK Plus Melati menyiapkan lulusan yang
                  berdaya saing untuk lingkungan tersebut.
                </p>
              </div>
            </ClayCard>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
