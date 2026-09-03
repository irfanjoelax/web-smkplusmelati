import { getContent } from "@/app/lib/content";
import type { Prestasi } from "@/app/lib/types";
import PrestasiEditor from "./editor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Prestasi Siswa | Admin Panel",
};

export default async function PrestasiAdminPage() {
  return <PrestasiEditor initial={await getContent<Prestasi>("prestasi")} />;
}