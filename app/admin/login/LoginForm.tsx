"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EyeIcon } from "@/app/admin/components/icons";
import { Button, Input } from "@/app/admin/components/ui";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const next = searchParams.get("next") ?? "/admin";
        router.push(next);
        router.refresh();
      } else {
        const json = await res.json().catch(() => null);
        setError(json?.error ?? "Gagal masuk");
      }
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
          Username
        </span>
        <Input
          value={username}
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
          Password
        </span>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            className="pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 transition hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-blue-500"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
        </div>
      </label>
      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      <Button type="submit" disabled={busy} className="w-full">
        {busy ? "Memeriksa…" : "Masuk"}
      </Button>
    </form>
  );
}
