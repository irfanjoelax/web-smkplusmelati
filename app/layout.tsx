import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import JsonLd from "@/app/components/JsonLd";
import "./globals.css";
import {
  GOOGLE_SITE_VERIFICATION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
  organizationSchema,
} from "@/app/lib/seo";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Sekolah SMK swasta keunggulan di Samarinda Seberang, Kalimantan Timur dengan jurusan TKJ dan Tata Boga. Sekolah Kewirausahaan yang Bertakwa.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [
    "SMK Plus Melati",
    "SMK Samarinda",
    "SMK Samarinda Seberang",
    "SMK swasta Samarinda",
    "SMK TKJ Samarinda",
    "SMK Tata Boga Samarinda",
    "sekolah kewirausahaan",
    "PPDB Samarinda",
    "Kalimantan Timur",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Sekolah SMK swasta keunggulan di Samarinda Seberang, Kalimantan Timur dengan jurusan TKJ dan Tata Boga.",
    url: SITE_URL,
    images: [
      {
        url: absoluteUrl("/images/hero.jpg"),
        width: 1200,
        height: 630,
        alt: `Logo ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Sekolah SMK swasta keunggulan di Samarinda Seberang, Kalimantan Timur dengan jurusan TKJ dan Tata Boga.",
    images: [absoluteUrl("/images/hero.jpg")],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: "/",
  },
  verification: GOOGLE_SITE_VERIFICATION
    ? { google: GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}