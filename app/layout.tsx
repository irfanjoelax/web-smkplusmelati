import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "SMK Plus Melati Samarinda — Terampil Berakhlak",
    template: "%s | SMK Plus Melati Samarinda",
  },
  description:
    "SMK Plus Melati Samarinda, sekolah SMK swasta keunggulan di Samarinda Seberang dengan jurusan TKJ dan Tata Boga. Terampil Berakhlak.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
