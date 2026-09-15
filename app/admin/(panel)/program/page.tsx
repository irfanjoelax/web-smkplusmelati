import { getContent } from "@/app/lib/content";
import type { ProgramData } from "@/app/lib/types";
import ProgramEditor from "./editor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Program Unggulan | Admin Panel",
};

export default async function ProgramAdminPage() {
  return <ProgramEditor initial={await getContent<ProgramData>("program")} />;
}
