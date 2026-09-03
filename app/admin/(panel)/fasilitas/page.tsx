import { getContent } from "@/app/lib/content";
import type { FasilitasItem } from "@/app/lib/types";
import FasilitasEditor from "./editor";

export const metadata = {
  title: "Fasilitas | Admin Panel",
};

export default async function FasilitasAdminPage() {
  return <FasilitasEditor initial={await getContent<FasilitasItem[]>("fasilitas")} />;
}