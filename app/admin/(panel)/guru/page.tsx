import { getContent } from "@/app/lib/content";
import type { Teacher } from "@/app/lib/types";
import GuruEditor from "./editor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Daftar Guru | Admin Panel",
};

export default async function GuruAdminPage() {
  return <GuruEditor initial={await getContent<Teacher[]>("guru")} />;
}