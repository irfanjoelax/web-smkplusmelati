import { Suspense } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { currentAdmin } from "@/app/lib/admin-guard";

export const metadata = {
  title: "Login Admin | SMK Plus Melati",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const user = await currentAdmin();
  if (user) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-[#4aa7e0] via-[#0e5f9c] to-[#083f68] lg:block">
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-md shadow-black/10">
                <Image
                  src="/logo melati.png"
                  alt="Logo SMK Plus Melati"
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </span>
              <span>
                <span className="block text-lg font-extrabold tracking-tight text-white">
                  Admin Panel
                </span>
                <span className="block text-xs font-semibold text-white/60">
                  SMK Plus Melati
                </span>
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-white">
              Kelola konten situs
              <br />
              dengan mudah.
            </h1>
            <p className="mt-3 max-w-sm text-sm text-white/70">
              Perubahan konten tersimpan otomatis dan langsung tampil di situs
              publik.
            </p>
          </div>
          <span className="text-xs text-white/50">
            © 2026 SMK Plus Melati
          </span>
        </div>
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />
      </div>

      {/* Form side */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-6 lg:hidden">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-sm">
                <Image
                  src="/logo melati.png"
                  alt="Logo SMK Plus Melati"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </span>
              <span>
                <span className="block text-lg font-extrabold tracking-tight text-slate-900">
                  Admin Panel
                </span>
                <span className="block text-xs font-semibold text-slate-500">
                  SMK Plus Melati
                </span>
              </span>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-lg shadow-slate-200/60">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Selamat Datang
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Masuk untuk mengelola konten situs.
            </p>
            <div className="mt-6">
              <Suspense
                fallback={
                  <div className="space-y-4">
                    <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
                    <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
                    <div className="h-11 animate-pulse rounded-xl bg-slate-200" />
                  </div>
                }
              >
                <LoginForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
