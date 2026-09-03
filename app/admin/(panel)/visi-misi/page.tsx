import { getContent } from "@/app/lib/content";
import type { VisiMisi } from "@/app/lib/types";
import VisiMisiEditor from "./editor";

export const metadata = {
  title: "Visi & Misi | Admin Panel",
};

export default async function VisiMisiAdminPage() {
  return <VisiMisiEditor initial={await getContent<VisiMisi>("visiMisi")} />;
}