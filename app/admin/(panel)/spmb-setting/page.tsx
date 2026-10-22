import { getContent } from "@/app/lib/content";
import type { SpmbSetting } from "@/app/lib/types";
import SpmbSettingEditor from "./editor";

export const dynamic = "force-dynamic";
export const metadata = { title: "SPMB Setting | Admin Panel" };

export default async function SpmbSettingAdminPage() {
  return <SpmbSettingEditor initial={await getContent<SpmbSetting>("spmbSetting")} />;
}
