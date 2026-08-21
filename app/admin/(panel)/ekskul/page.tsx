import { getEkskul } from "@/app/lib/content";
import EkskulEditor from "./editor";

export const metadata = {
  title: "Ekskul | Admin Panel",
};

export default function EkskulAdminPage() {
  return <EkskulEditor initial={getEkskul()} />;
}