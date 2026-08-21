import { getVisiMisi } from "@/app/lib/content";
import VisiMisiEditor from "./editor";

export const metadata = {
  title: "Visi & Misi | Admin Panel",
};

export default function VisiMisiAdminPage() {
  return <VisiMisiEditor initial={getVisiMisi()} />;
}