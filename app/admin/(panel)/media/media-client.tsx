"use client";

import { useState } from "react";
import { ImageIcon } from "@/app/admin/components/icons";
import { ConfirmDialog, PageHeader, Panel } from "@/app/admin/components/ui";

export default function MediaClient({ initial }: { initial: string[] }) {
  const [files, setFiles] = useState<string[]>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirmUrl, setConfirmUrl] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setError(json?.error ?? "Gagal mengunggah");
        return;
      }
      setFiles((prev) => [json.url, ...prev]);
    } catch {
      setError("Terjadi kesalahan saat mengunggah");
    } finally {
      setBusy(false);
    }
  }

  async function remove(url: string) {
    const res = await fetch(`/api/admin/upload?path=${encodeURIComponent(url)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setFiles((prev) => prev.filter((f) => f !== url));
    }
  }

  return (
    <div>
      <ConfirmDialog
        open={confirmUrl !== null}
        message="Yakin ingin menghapus gambar ini? Tindakan tidak bisa dibatalkan."
        onConfirm={() => { remove(confirmUrl!); setConfirmUrl(null); }}
        onCancel={() => setConfirmUrl(null)}
      />
      <PageHeader
        title="Media"
        description="Gambar hasil unggahan dari panel admin."
      />

      <Panel
        title="Unggah Gambar"
        description="PNG, JPG, WEBP, atau GIF — maksimal 3 MB"
        icon={<ImageIcon className="h-5 w-5" />}
      >
        <div className="flex flex-wrap items-center gap-3">
          <label className="cursor-pointer rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:from-blue-600 hover:to-blue-800 disabled:opacity-50">
            {busy ? "Mengunggah…" : "Pilih Gambar"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              disabled={busy}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f);
                e.target.value = "";
              }}
            />
          </label>
          <span className="text-xs text-slate-500">
            Path yang bisa dipakai: <code>/uploads/…</code>
          </span>
          {error && <span className="text-sm font-semibold text-red-600">{error}</span>}
        </div>
      </Panel>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {files.map((f) => (
          <div
            key={f}
            className="group overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm"
          >
            <div className="relative aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center justify-between gap-2 p-2.5">
              <span className="truncate text-[0.65rem] font-medium text-slate-500">{f}</span>
              <button
                type="button"
                onClick={() => setConfirmUrl(f)}
                className="shrink-0 rounded-lg bg-red-50 px-2 py-1 text-[0.65rem] font-bold text-red-600 transition hover:bg-red-100"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
        {files.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center">
            <p className="text-sm text-slate-500">Belum ada gambar yang diunggah.</p>
          </div>
        )}
      </div>
    </div>
  );
}