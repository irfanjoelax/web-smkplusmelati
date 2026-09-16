import { getJurusanData } from "@/app/lib/jurusan";
import JurusanEditor from "./editor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Jurusan | Admin Panel",
};

export default async function JurusanAdminPage() {
  return <JurusanEditor initial={await getJurusanData()} />;
}
