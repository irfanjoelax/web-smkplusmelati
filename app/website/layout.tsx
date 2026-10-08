import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "SPMB 2026/2027 | SMK Plus Melati Samarinda",
  description:
    "Kenali jurusan, program, biaya, fasilitas, dan pendaftaran SPMB SMK Plus Melati Samarinda.",
  alternates: {
    canonical: "/website",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/website",
    title: "SMK Plus Melati Samarinda | Bangun Masa Depan",
    description:
      "Informasi jurusan, program belajar, biaya, fasilitas, dan SPMB untuk calon siswa dan orang tua.",
    images: ["/images/website/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMK Plus Melati Samarinda | Bangun Masa Depan",
    description:
      "Informasi jurusan, program belajar, biaya, fasilitas, dan SPMB untuk calon siswa dan orang tua.",
    images: ["/images/website/hero.jpg"],
  },
};

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return children;
}
