import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="clay-card mx-auto max-w-xl p-10 text-center sm:p-14">
          <p className="text-7xl font-extrabold text-primary">404</p>
          <h1 className="mt-4 text-2xl font-extrabold text-primary-dark">
            Halaman Tidak Ditemukan
          </h1>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-foreground/70">
            Halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.
            Silakan kembali ke beranda untuk menjelajahi SMK Plus Melati
            Samarinda.
          </p>
          <Link href="/" className="clay-btn clay-btn-accent mt-8">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}