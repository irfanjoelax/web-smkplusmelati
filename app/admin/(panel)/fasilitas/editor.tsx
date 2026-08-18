"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useAutoSave } from "@/app/admin/components/useAutoSave";
import { AddButton, Field, IconBtn, Input, PageHeader, Panel, Textarea } from "@/app/admin/components/ui";
import type { FasilitasItem } from "@/app/lib/types";

export default function FasilitasEditor({ initial }: { initial: FasilitasItem[] }) {
  const [items, setItems] = useState<FasilitasItem[]>(initial);
  useAutoSave("fasilitas", items);

  function update(i: number, patch: Partial<FasilitasItem>) {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    setItems(next);
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  }

  function remove(i: number) {
    setItems(items.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <PageHeader
        title="Fasilitas"
        description="Kelola kartu sarana dan prasarana sekolah."
      />

      <Panel
        title="Fasilitas"
        description={`${items.length} fasilitas`}
        action={
          <AddButton onClick={() => setItems([...items, { title: "", description: "", image: "" }])}>
              Tambah Fasilitas
            </AddButton>
        }
      >
        <div className="space-y-4">
          {items.map((f, i) => (
            <div
              key={i}
              className="flex flex-wrap items-start gap-4 rounded-xl border border-slate-200 p-4"
            >
              <ImagePicker value={f.image} onChange={(url) => update(i, { image: url })} />
              <div className="min-w-0 flex-1 space-y-3">
                <Field label="Nama Fasilitas">
                  <Input value={f.title} onChange={(e) => update(i, { title: e.target.value })} />
                </Field>
                <Field label="Deskripsi">
                  <Textarea value={f.description} onChange={(e) => update(i, { description: e.target.value })} />
                </Field>
              </div>
              <div className="flex shrink-0 gap-1">
                <IconBtn label="Naikkan" onClick={() => move(i, -1)}>↑</IconBtn>
                <IconBtn label="Turunkan" onClick={() => move(i, 1)}>↓</IconBtn>
                <IconBtn label="Hapus" danger onClick={() => remove(i)}>✕</IconBtn>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}