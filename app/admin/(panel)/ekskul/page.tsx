import { getContent } from "@/app/lib/content";
import type { EkskulItem } from "@/app/lib/types";
import EkskulEditor from "./editor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ekskul | Admin Panel",
};

export default async function EkskulAdminPage() {
  return <EkskulEditor initial={await getContent<EkskulItem[]>("ekskul")} />;
}