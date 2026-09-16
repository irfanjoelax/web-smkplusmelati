import { getContent } from "@/app/lib/content";
import type { Beranda, EkskulItem, FasilitasItem } from "@/app/lib/types";
import BerandaEditor from "./editor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Beranda | Admin Panel",
};

export default async function BerandaAdminPage() {
  const [berandaData, ekskulData, fasilitasData] = await Promise.all([
    getContent<Beranda>("beranda"),
    getContent<EkskulItem[]>("ekskul"),
    getContent<FasilitasItem[]>("fasilitas"),
  ]);

  return (
    <BerandaEditor
      initial={berandaData}
      allEkskul={ekskulData}
      allFasilitas={fasilitasData}
    />
  );
}
