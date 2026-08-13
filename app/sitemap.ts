import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/seo";

const routes = [
  "",
  "/profil",
  "/visi-misi",
  "/guru",
  "/program-pelatihan",
  "/program-asrama",
  "/program-keagamaan",
  "/prestasi-siswa",
  "/jurusan/tkj",
  "/jurusan/tata-boga",
  "/fasilitas",
  "/ekskul",
  "/hubungi-kami",
  "/ppdb",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route === "" ? "/" : route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}