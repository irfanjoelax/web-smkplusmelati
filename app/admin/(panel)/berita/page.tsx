import { getContent } from "@/app/lib/content";
import type { BeritaItem } from "@/app/lib/types";
import BeritaEditor from "./editor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Berita | Admin Panel",
};

export default async function BeritaAdminPage() {
  return <BeritaEditor initial={await getContent<BeritaItem[]>("berita")} />;
}