import { getGuru } from "@/app/lib/content";
import GuruEditor from "./editor";

export const metadata = {
  title: "Daftar Guru | Admin Panel",
};

export default function GuruAdminPage() {
  return <GuruEditor initial={getGuru()} />;
}