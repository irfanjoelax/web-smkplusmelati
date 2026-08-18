import { getPrestasi } from "@/app/lib/content";
import PrestasiEditor from "./editor";

export const metadata = {
  title: "Prestasi Siswa | Admin Panel",
};

export default function PrestasiAdminPage() {
  return <PrestasiEditor initial={getPrestasi()} />;
}