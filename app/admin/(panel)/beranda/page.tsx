import { getContent } from "@/app/lib/content";
import type { Beranda } from "@/app/lib/types";
import BerandaEditor from "./editor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Beranda | Admin Panel",
};

export default async function BerandaAdminPage() {
  return <BerandaEditor initial={await getContent<Beranda>("beranda")} />;
}