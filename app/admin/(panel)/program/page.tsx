import { getProgramData } from "@/app/lib/program";
import ProgramEditor from "./editor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Program Unggulan | Admin Panel",
};

export default async function ProgramAdminPage() {
  return <ProgramEditor initial={await getProgramData()} />;
}
