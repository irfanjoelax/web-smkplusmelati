import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import AdminShell from "@/app/admin/components/AdminShell";
import { currentAdmin } from "@/app/lib/admin-guard";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function PanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentAdmin();
  if (!user) {
    redirect("/admin/login");
  }
  return <AdminShell>{children}</AdminShell>;
}
