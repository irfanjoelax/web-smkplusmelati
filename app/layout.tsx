import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMK Plus Melati Samarinda — Sekolah Menengah Kejuruan Unggulan",
  description:
    "SMK Plus Melati Samarinda adalah sekolah kejuruan terbaik yang mencetak lulusan siap kerja, berkarakter, dan berdaya saing tinggi melalui pendidikan vokasi berkualitas.",
  keywords:
    "SMK Plus Melati, SMK Plus Melati Samarinda, sekolah kejuruan, SMK terbaik, pendidikan vokasi, Samarinda",
  openGraph: {
    title: "SMK Plus Melati Samarinda",
    description: "Sekolah Menengah Kejuruan Unggulan — Pendidikan · Teknologi · Karakter",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
