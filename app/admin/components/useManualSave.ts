"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export type ContentSaveKey =
  | "guru"
  | "visiMisi"
  | "jurusan"
  | "prestasi"
  | "fasilitas"
  | "beranda"
  | "ekskul";

export function useManualSave(key: ContentSaveKey, data: unknown) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    if (!isSaved) return;
    const t = setTimeout(() => setIsSaved(false), 2000);
    return () => clearTimeout(t);
  }, [isSaved]);

  const save = useCallback(async () => {
    if (isSaving) return;
    setIsSaving(true);
    setIsSaved(false);
    try {
      const res = await fetch(`/api/content/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataRef.current),
      });
      if (res.ok) {
        setIsSaved(true);
      } else {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error ?? `Gagal menyimpan (${res.status})`);
      }
    } catch (err) {
      console.error("Save error:", err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [key, isSaving]);

  return { save, isSaving, isSaved };
}
