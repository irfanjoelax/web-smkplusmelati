import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import PageHero from "@/app/components/PageHero";
import SectionHeading from "@/app/components/SectionHeading";
import { IMAGES } from "@/app/components/images";

export const metadata: Metadata = {
  title: "Program Pelatihan",
};

export default function ProgramPelatihanPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Program Unggulan"
          title="Program Pelatihan"
          description="Membekali siswa keterampilan praktis yang bisa menjadi keahlian khusus dan bernilai jual tinggi."
        />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div>
              <ImageCard
                src={IMAGES.pelatihanAndroid}
                alt="Pembuatan aplikasi Android"
                title="Pembuatan Aplikasi Android"
                description="Siswa dibekali materi terlebih dahulu sebelum praktik, sehingga kegiatan berjalan sesuai aturan. Kemampuan ini menjadi keahlian khusus yang bisa dimanfaatkan banyak orang."
                aspect="aspect-[4/3]"
              />
            </div>
            <div>
              <ImageCard
                src={IMAGES.pelatihanWirausaha}
                alt="Pelatihan wirausaha Tata Boga"
                title="Pencetak Wirausaha"
                description="Ruang khusus untuk bereksperimen membuat makanan. Siswa belajar seni memasak yang bernilai jual, dari proses pembuatan hingga penyajian yang menarik."
                aspect="aspect-[4/3]"
              />
            </div>
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
              <p className="rounded-[1.75rem] bg-primary-soft/70 p-7 leading-relaxed text-foreground/75">
                Diharapkan dengan adanya program pelatihan ini, siswa/i SMK Plus
                Melati Samarinda bisa membuat aplikasi yang nantinya bisa
                dimanfaatkan oleh orang banyak, yang memberi manfaat bagi siswa
                dan lingkungan sekitarnya.
              </p>
              <p className="rounded-[1.75rem] bg-accent-soft/70 p-7 leading-relaxed text-foreground/75">
                Semua orang bisa memasak, namun tidak semua orang tahu seni
                memasak. Diharapkan dengan fasilitas ruangan memasak dan
                program pelatihan ini, bisa mencetak seorang yang profesional di
                bidang tata boga.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
