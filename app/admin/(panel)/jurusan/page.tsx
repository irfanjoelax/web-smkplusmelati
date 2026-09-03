import { getContent } from "@/app/lib/content";
import type { JurusanData } from "@/app/lib/types";
import JurusanEditor from "./editor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Jurusan | Admin Panel",
};

export default async function JurusanAdminPage() {
  return <JurusanEditor initial={await getContent<JurusanData>("jurusan")} />;
}