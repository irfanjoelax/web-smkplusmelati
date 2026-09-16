"use client";

import { useState } from "react";

export default function ImagePicker({
  value,
  onChange,
  onRemove,
  large = false,
}: {
  value: string;
  onChange: (url: string) => void;
  onRemove?: () => boolean | void | Promise<boolean | void>;
  large?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setBusy(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setError(json?.error ?? "Gagal mengunggah gambar");
        return;
      }
      onChange(json.url);
    } catch {
      setError("Terjadi kesalahan saat mengunggah");
    } finally {
      setBusy(false);
    }
  }

  async function handleRemove() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const removeCurrentUpload = await onRemove?.();
      if (removeCurrentUpload) {
        const response = await fetch(`/api/admin/upload?cleanup=1&path=${encodeURIComponent(value)}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const json = await response.json().catch(() => null);
          throw new Error(json?.error ?? "Gagal menghapus file gambar");
        }
      }
      onChange("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus gambar");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`flex gap-3 ${large ? "flex-col items-start" : "items-center"}`}>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className={`${large ? "h-40 w-40 rounded-2xl" : "h-16 w-16 rounded-xl"} border border-slate-200 object-cover`}
        />
      ) : (
        <div className={`flex items-center justify-center border border-dashed border-slate-300 bg-slate-50 text-center text-slate-400 ${large ? "h-40 w-40 rounded-2xl text-xs" : "h-16 w-16 rounded-xl text-[0.65rem]"}`}>
          Tanpa foto
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label className="cursor-pointer rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 px-3 py-2 text-center text-xs font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:from-blue-600 hover:to-blue-800">
          {busy ? "Mengunggah…" : "Unggah"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={busy}
            className="text-xs text-red-500 hover:underline"
          >
            {busy ? "Menghapus..." : "Hapus gambar"}
          </button>
        )}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  );
}
