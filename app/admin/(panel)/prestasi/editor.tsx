"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useAutoSave } from "@/app/admin/components/useAutoSave";
import { AddButton, Field, IconBtn, Input, PageHeader, Panel, Textarea } from "@/app/admin/components/ui";
import type { Prestasi, PrestasiItem } from "@/app/lib/types";

export default function PrestasiEditor({ initial }: { initial: Prestasi }) {
  const [quote, setQuote] = useState(initial.quote);
  const [items, setItems] = useState<PrestasiItem[]>(initial.items);
  useAutoSave("prestasi", { quote, items });

  function update(i: number, patch: Partial<PrestasiItem>) {
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
        title="Prestasi Siswa"
        description="Kartu prestasi, gambar sertifikat, dan kutipan halaman."
      />

      <div className="space-y-6">
        <Panel title="Kutipan Halaman">
          <Field label="Teks Kutipan (tanpa tanda kutip)">
            <Textarea value={quote} onChange={(e) => setQuote(e.target.value)} />
          </Field>
        </Panel>

        <Panel
          title="Kartu Prestasi"
          description={`${items.length} kartu`}
          action={
            <AddButton
              onClick={() =>
                setItems([...items, { title: "", description: "", image: "", alt: "" }])
              }
            >
              Tambah Kartu
            </AddButton>
          }
        >
          <div className="space-y-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex flex-wrap items-start gap-4 rounded-xl border border-slate-200 p-4"
              >
                <ImagePicker
                  value={item.image}
                  onChange={(url) => update(i, { image: url })}
                />
                <div className="min-w-0 flex-1 space-y-3">
                  <Field label="Judul">
                    <Input value={item.title} onChange={(e) => update(i, { title: e.target.value })} />
                  </Field>
                  <Field label="Teks Alt Gambar">
                    <Input value={item.alt} onChange={(e) => update(i, { alt: e.target.value })} />
                  </Field>
                  <Field label="Deskripsi">
                    <Textarea value={item.description} onChange={(e) => update(i, { description: e.target.value })} />
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
    </div>
  );
}