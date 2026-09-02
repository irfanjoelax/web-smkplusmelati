"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@/app/admin/components/icons";
import { AddButton, Field, IconBtn, Input, PageHeader, Panel, Textarea, SaveButton } from "@/app/admin/components/ui";
import type { EkskulItem } from "@/app/lib/types";

export default function EkskulEditor({ initial }: { initial: EkskulItem[] }) {
  const [items, setItems] = useState<EkskulItem[]>(initial);
  const { save } = useManualSave("ekskul", items);

  function update(i: number, patch: Partial<EkskulItem>) {
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
    const next = items.filter((_, idx) => idx !== i);
    setItems(next);
  }

  return (
    <div>
      <PageHeader
        title="Ekskul"
        description="Kelola kartu ekstrakurikuler yang tampil di halaman publik."
      />

      <Panel
        title="Ekskul"
        description={`${items.length} ekstrakurikuler`}
        action={
          <div className="flex items-center gap-2">
            <SaveButton onSave={save} />
            <AddButton
              onClick={() =>
                setItems([
                  ...items,
                  { title: "", desc: "", image: "" },
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
                <Field label="Nama Ekskul">
                  <Input value={e.title} onChange={(ev) => update(i, { title: ev.target.value })} />
                </Field>
                <Field label="Deskripsi">
                  <Textarea value={e.desc} onChange={(ev) => update(i, { desc: ev.target.value })} />
                </Field>
              </div>
              <div className="flex shrink-0 gap-1">
                <IconBtn label="Naikkan" onClick={() => move(i, -1)}>
                  <ArrowUpIcon className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="Turunkan" onClick={() => move(i, 1)}>
                  <ArrowDownIcon className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="Hapus" danger onClick={() => remove(i)}>
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