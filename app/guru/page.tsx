import type { Metadata } from "next";
import ClayCard from "@/app/components/ClayCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import LocalImage from "@/app/components/LocalImage";

export const metadata: Metadata = {
  title: "Daftar Guru",
};

const teachers = [
  { name: "Dr. Pazri Nur Aliansyah, M.P.W.K.", image: "/images/guru-1.jpg" },
  { name: "Dr. Siti Nurbaya, M.Psi.", image: "/images/guru-2.jpg" },
  { name: "Dr. Li Lian, M.Kom.", image: "/images/guru-3.jpg" },
  { name: "Dr. Dewi Lestari, M.Pd.", image: "/images/guru-4.jpg" },
  { name: "Dr. Yuna Rosse, M.Pd.", image: "/images/guru-5.jpg" },
  { name: "Dr. Rina Wulandari, M.Kom.", image: "/images/guru-6.jpg" },
  { name: "Dr. Shakky Bella, M.Pd.", image: "/images/guru-7.jpg" },
  { name: "Dr. Putri Kusuma, M.Fil.", image: "/images/guru-8.jpg" },
];

export default function GuruPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="px-4 pb-24 pt-24">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teachers.map((t) => (
              <ClayCard key={t.name} hover className="flex flex-col items-center p-6">
                <div className="clay-inset overflow-hidden rounded-3xl p-2">
                  <LocalImage
                    src={t.image}
                    alt={t.name}
                    width={400}
                    height={400}
                    className="aspect-square w-full rounded-2xl object-cover"
                  />
                </div>
                <p className="mt-5 text-center text-base font-extrabold text-primary-dark">
                  {t.name}
                </p>
              </ClayCard>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}