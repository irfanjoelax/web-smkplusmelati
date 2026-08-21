import { getJurusan } from "@/app/lib/content";
import JurusanEditor from "./editor";

export const metadata = {
  title: "Jurusan | Admin Panel",
};

export default function JurusanAdminPage() {
  return <JurusanEditor initial={getJurusan()} />;
}