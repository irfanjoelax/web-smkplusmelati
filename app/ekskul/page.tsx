import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ImageCard from "@/app/components/ImageCard";
import JsonLd from "@/app/components/JsonLd";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import { IMAGES } from "@/app/components/images";
import { breadcrumbSchema } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Ekskul",
  description:
    "Ekstrakurikuler SMK Plus Melati Samarinda: podschool zaman now, konten kreator, desain grafis, pramuka, english club, seni vokal, dan e-sport.",
  alternates: {
    canonical: "/ekskul",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/ekskul",
    title: "Ekskul | SMK Plus Melati Samarinda",
    description:
      "Ekstrakurikuler SMK Plus Melati: podschool, konten kreator, desain grafis, pramuka, english club, seni vokal, dan e-sport.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekskul | SMK Plus Melati Samarinda",
    description:
      "Ekstrakurikuler SMK Plus Melati: podschool, konten kreator, desain grafis, pramuka, english club, seni vokal, dan e-sport.",
  },
};

const ekskul = [
  {
    title: "PodSchool Zaman Now",
    desc: "Podcast milik SMK Plus Melati sebagai sarana siswa menggali informasi, dapat disaksikan di YouTube, Instagram, dan Facebook.",
    image: IMAGES.podschoool,
  },
  {
    title: "Konten Kreator",
    desc: "Tim kreator yang memanfaatkan teknologi dengan unsur pendidikan, hiburan, komedi, dan motivasi.",
    image: IMAGES.kontenKreator,
  },
  {
    title: "Desain Grafis",
    desc: "Wadah berkreasi membuat karya rancangan gambar untuk kepentingan percetakan dan informasi.",
    image: IMAGES.desainGrafis,
  },
  {
    title: "Pramuka",
    desc: "Melatih kemandirian, kedisiplinan, mental, serta fisik melalui metode belajar interaktif progresif.",
    image: IMAGES.pramuka,
  },
  {
    title: "English Club",
    desc: "Melatih keberanian siswa berbahasa Inggris di luar jam pembelajaran.",
    image: IMAGES.englishClub,
  },
  {
    title: "Seni Vocal",
    desc: "Mengembangkan bakat vokal: beatbox, acapella, pernapasan, intonasi, dan artikulasi.",
    image: IMAGES.seniVocal,
  },
  {
    title: "E-Sport",
    desc: "Olahraga elektronik berbasis game kompetitif yang melatih sistem berpikir otak.",
    image: IMAGES.esport,
  },
];

export default function EkskulPage() {
  return (
    <>
      <Header />
      <JsonLd data={breadcrumbSchema([{ name: "Ekskul", path: "/ekskul" }])} />
      <main className="flex-1">
        <PageHero
          eyebrow="Kegiatan Siswa"
          title="Ekstrakurikuler"
          description="Kreativitas tanpa batas — wadah siswa mengembangkan bakat, minat, dan keterampilan di luar jam pelajaran."
        />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ekskul.map((e, i) => (
              <Reveal key={e.title} delay={i * 80}>
                <ImageCard
                  src={e.image}
                  alt={e.title}
                  title={e.title}
                  description={e.desc}
                />
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
