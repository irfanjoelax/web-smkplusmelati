import { getContent } from "@/app/lib/content";
import type { ProfilData } from "@/app/lib/types";
import ProfilEditor from "./editor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Profil Sekolah | Admin Panel",
};

export default async function ProfilAdminPage() {
  return <ProfilEditor initial={await getContent<ProfilData>("profil")} />;
}
