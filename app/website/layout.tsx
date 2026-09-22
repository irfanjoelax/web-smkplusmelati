import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "SPMB 2026 | SMK Plus Melati Samarinda",
  description:
    "Kenali jurusan, pengalaman belajar, kegiatan siswa, fasilitas, dan SPMB 2026 SMK Plus Melati Samarinda.",
  alternates: {
    canonical: "/website",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/website",
    title: "Masa Depanmu Dimulai dari Pilihan Hari Ini",
    description:
      "Landing page SPMB 2026 SMK Plus Melati Samarinda untuk calon siswa SMP/MTs dan orang tua.",
    images: ["/images/website/hero.jpg"],
  },
};

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return children;
}
