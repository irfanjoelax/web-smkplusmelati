import { getFasilitas } from "@/app/lib/content";
import FasilitasEditor from "./editor";

export const metadata = {
  title: "Fasilitas | Admin Panel",
};

export default function FasilitasAdminPage() {
  return <FasilitasEditor initial={getFasilitas()} />;
}