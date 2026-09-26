import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/seo";
import { getContent } from "@/app/lib/content";
import { getJurusanData } from "@/app/lib/jurusan";
import { getProgramData } from "@/app/lib/program";
import type { BeritaItem } from "@/app/lib/types";

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
  "/hubungi-spmb",
  "/spmb",
  "/website",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [jurusan, programs, news] = await Promise.all([
    getJurusanData(),
    getProgramData(),
    getContent<BeritaItem[]>("berita"),
  ]);
  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route === "" ? "/" : route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
  const dynamicEntries: MetadataRoute.Sitemap = [
    ...jurusan.map((item) => ({
      url: `${SITE_URL}/jurusan/${item.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...programs.map((item) => ({
      url: `${SITE_URL}/program-${item.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...news.map((item) => ({
      url: `${SITE_URL}/berita/${item.slug}`,
      lastModified: new Date(item.updatedAt ?? item.createdAt ?? item.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return [...staticEntries, ...dynamicEntries];
}
