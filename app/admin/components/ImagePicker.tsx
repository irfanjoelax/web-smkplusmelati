"use client";

import { useState } from "react";

export default function ImagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
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

  return (
    <div className="flex items-center gap-3">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center text-[0.65rem] text-slate-400">
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
            onClick={() => onChange("")}
            className="text-xs text-red-500 hover:underline"
          >
            Hapus gambar
          </button>
        )}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  );
}
