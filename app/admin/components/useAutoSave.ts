"use client";

import { useEffect, useRef } from "react";

export type ContentSaveKey =
  | "guru"
  | "visiMisi"
  | "jurusan"
  | "prestasi"
  | "fasilitas"
  | "beranda"
  | "ekskul";

const DEBOUNCE_MS = 700;

export function useAutoSave(key: ContentSaveKey, data: unknown) {
  const lastSavedRef = useRef(JSON.stringify(data));
  const dirtyRef = useRef(false);
  const latestRef = useRef(data);

  useEffect(() => {
    const json = JSON.stringify(data);
    if (json === lastSavedRef.current) return;

    latestRef.current = data;
    lastSavedRef.current = json;
    dirtyRef.current = true;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/content/${key}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: json,
        });
        if (res.ok) dirtyRef.current = false;
      } catch {
        // biarkan, data akan terkirim ulang pada perubahan berikutnya
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [key, data]);

  useEffect(() => {
    return () => {
      if (!dirtyRef.current) return;
      fetch(`/api/content/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(latestRef.current),
      }).catch(() => {});
    };
  }, [key]);
}