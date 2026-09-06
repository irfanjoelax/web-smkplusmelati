"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@/app/admin/components/icons";
import { AddButton, ConfirmDialog, Field, IconBtn, Input, PageHeader, Panel, Textarea, SaveButton } from "@/app/admin/components/ui";
import type { BeritaItem } from "@/app/lib/types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function BeritaEditor({ initial }: { initial: BeritaItem[] }) {
  const [items, setItems] = useState<BeritaItem[]>(initial);
  const { save } = useManualSave("berita", items);
  const [confirmIdx, setConfirmIdx] = useState<number | null>(null);

  function update(i: number, patch: Partial<BeritaItem>) {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    // Auto-generate slug from title if slug not manually set
    if (patch.title && !patch.slug) {
      const base = slugify(patch.title);
      // Ensure uniqueness: if slug exists, add suffix
      let slug = base;
      let counter = 1;
      while (next.some((item, idx) => idx !== i && item.slug === slug)) {
        slug = `${base}-${counter}`;
        counter++;
      }
      next[i].slug = slug;
    }
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
    const next = items.filter((_, idx) => idx !== i);
    setItems(next);
  }

  return (
    <div>
      <ConfirmDialog
        open={confirmIdx !== null}
        onConfirm={() => { remove(confirmIdx!); setConfirmIdx(null); }}
        onCancel={() => setConfirmIdx(null)}
      />
      <PageHeader
        title="Berita"
        description="Kelola artikel berita yang tampil di halaman publik."
      />

      <Panel
        title="Berita"
        description={`${items.length} artikel`}
        action={
          <div className="flex items-center gap-2">
            <SaveButton onSave={save} />
            <AddButton
              onClick={() =>
                setItems([
                  ...items,
                  { title: "", slug: "", desc: "", content: "", image: "", date: new Date().toISOString().split("T")[0] },
                ])
              }
            >
              Tambah
            </AddButton>
          </div>
        }
      >
        <div className="space-y-4">
          {items.map((e, i) => (
            <div
              key={i}
              className="flex flex-wrap items-start gap-4 rounded-xl border border-slate-200 p-4"
            >
              <ImagePicker
                value={e.image}
                onChange={(url) => update(i, { image: url })}
              />
              <div className="min-w-0 flex-1 space-y-3">
                <Field label="Judul">
                  <Input value={e.title} onChange={(ev) => update(i, { title: ev.target.value })} />
                </Field>
                <Field label="Tanggal">
                  <Input type="date" value={e.date} onChange={(ev) => update(i, { date: ev.target.value })} />
                </Field>
                <Field label="Ringkasan (tampil di card)">
                  <Textarea value={e.desc} onChange={(ev) => update(i, { desc: ev.target.value })} />
                </Field>
                <Field label="Isi Berita (lengkap)">
                  <Textarea className="min-h-40" value={e.content} onChange={(ev) => update(i, { content: ev.target.value })} />
                </Field>
              </div>
              <div className="flex shrink-0 gap-1">
                <IconBtn label="Naikkan" onClick={() => move(i, -1)}>
                  <ArrowUpIcon className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="Turunkan" onClick={() => move(i, 1)}>
                  <ArrowDownIcon className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="Hapus" danger onClick={() => setConfirmIdx(i)}>
                  <TrashIcon className="h-4 w-4" />
                </IconBtn>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}