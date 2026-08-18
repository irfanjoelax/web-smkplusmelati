import { getBeranda } from "@/app/lib/content";
import BerandaEditor from "./editor";

export const metadata = {
  title: "Beranda | Admin Panel",
};

export default function BerandaAdminPage() {
  return <BerandaEditor initial={getBeranda()} />;
}