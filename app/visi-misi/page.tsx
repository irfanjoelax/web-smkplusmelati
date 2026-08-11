import type { Metadata } from "next";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import PageHero from "@/app/components/PageHero";

export const metadata: Metadata = {
  title: "Visi Misi",
};

const misi = [
  "Membangun kultur sekolah yang mengutamakan pelayanan, kualitas pembelajaran, prestasi dan lulusan",
  "Menanamkan keimanan dan ketaqwaan melalui pengalaman ajaran agama",
  "Menyelenggarakan pendidikan dan latihan dalam membentuk jiwa entrepreneur",
  "Membina peserta didik berwawasan global, cerdas intelektual, emosional, dan spiritual",
  "Membangun kreatifitas dan keterampilan peserta didik agar mampu bersaing di dunia usaha dan dunia industri",
  "Membiasakan budaya bersih dan disiplin tinggi",
  "Membentuk karakter peserta didik agar memiliki sikap dan akhlak yang mulia",
];

export default function VisiMisiPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Arah & Tujuan"
          title="Visi dan Misi"
          description="Komitmen SMK Plus Melati Samarinda dalam mencetak generasi unggul yang beriman, terampil, dan berakhlak mulia."
        />

        <section className="px-4 py-14">
          <div className="mx-auto max-w-5xl">
            <ClayCard className="relative overflow-hidden p-8 sm:p-14">
              <span className="clay-chip clay-chip-primary mb-6">Visi</span>
              <p className="text-2xl font-extrabold leading-snug text-primary-dark sm:text-4xl sm:leading-snug">
                &ldquo;Terwujudnya SMK Unggul dalam mencetak SDM yang beriman,
                berjiwa entrepreneur, berwawasan global, cerdas, terampil,
                disiplin, dan berakhlak mulia.&rdquo;
              </p>
            </ClayCard>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 flex justify-center">
              <span className="clay-chip clay-chip-primary">Misi</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {misi.map((item, i) => (
                <ClayCard key={i} hover className="flex items-start gap-4 p-6">
                  <span className="clay-inset flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-primary">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm font-medium leading-relaxed text-foreground/75">
                    {item}
                  </p>
                </ClayCard>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
