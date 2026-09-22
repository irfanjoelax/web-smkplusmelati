import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/seo";
import { getJurusanData } from "@/app/lib/jurusan";
import { getProgramData } from "@/app/lib/program";

const routes = [
  "",
  "/profil",
  "/visi-misi",
  "/guru",
  "/prestasi-siswa",
  "/fasilitas",
  "/ekskul",
  "/alumni",
  "/berita",
  "/berita/semua-berita",
  "/hubungi-kami",
  "/spmb",
  "/website",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [jurusan, programs] = await Promise.all([getJurusanData(), getProgramData()]);
  const allRoutes = [
    ...routes,
    ...jurusan.map((item) => `/jurusan/${item.id}`),
    ...programs.map((item) => `/program-${item.id}`),
  ];
  return allRoutes.map((route) => ({
    url: `${SITE_URL}${route === "" ? "/" : route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
