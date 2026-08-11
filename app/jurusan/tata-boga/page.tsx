import type { Metadata } from "next";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import PageHero from "@/app/components/PageHero";

export const metadata: Metadata = {
  title: "Jurusan Tata Boga",
};

const skills = [
  "Dasar-Dasar Tata Boga",
  "Seni Memasak & Teknik Penyajian",
  "Pengolahan Makanan & Minuman",
  "Higiene Sanitasi Makanan",
  "Kewirausahaan Kuliner",
  "Manajemen Dapur & Pelayanan",
];

export default function TataBogaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Bidang Keahlian"
          title="Tata Boga"
          description="Jurusan yang mengasah seni memasak, teknik penyajian, dan jiwa wirausaha di bidang kuliner."
        />

        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <ClayCard className="p-8 sm:p-12">
              <h2 className="text-2xl font-extrabold text-primary-dark">
                Mengapa Memilih Tata Boga?
              </h2>
              <p className="mt-4 leading-relaxed text-foreground/75">
                Semua orang bisa memasak, namun tidak semua orang tahu seni
                memasak. Di SMK Plus Melati, siswa Tata Boga belajar bagaimana
                proses pembuatan makanan yang bisa dinilai harga jualnya,
                hingga teknik akhir penyediaan makanan yang menarik. Ruang
                khusus disediakan untuk siswa bereksperimen membuat makanan.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="clay-inset flex items-center gap-3 rounded-2xl px-5 py-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-extrabold text-primary-darker">
                      ✓
                    </span>
                    <span className="text-sm font-semibold text-foreground/80">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </ClayCard>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <ClayCard hover className="p-7">
              <span className="clay-chip clay-chip-primary">Keunggulan</span>
              <h3 className="mt-4 text-lg font-extrabold text-primary-dark">
                Pencetak Wirausaha
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                Pelatihan dan fasilitas ruangan memasak dirancang untuk
                mencetak profesional di bidang tata boga yang mampu
                menciptakan lapangan kerja sendiri.
              </p>
            </ClayCard>
            <ClayCard hover className="p-7">
              <span className="clay-chip clay-chip-primary">Prospek</span>
              <h3 className="mt-4 text-lg font-extrabold text-primary-dark">
                Karier Lulusan Tata Boga
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                Chef, pastry, food stylist, manajer restoran, wirausahawan
                kuliner, hingga pelaku usaha catering dan UMKM makanan.
              </p>
            </ClayCard>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
