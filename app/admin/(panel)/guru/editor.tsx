"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@/app/admin/components/icons";
import { AddButton, ConfirmDialog, Field, IconBtn, Input, PageHeader, Panel, SaveButton } from "@/app/admin/components/ui";
import type { Teacher } from "@/app/lib/types";

export default function GuruEditor({ initial }: { initial: Teacher[] }) {
  const [items, setItems] = useState<Teacher[]>(initial);
  const { save } = useManualSave("guru", items);
  const [confirmIdx, setConfirmIdx] = useState<number | null>(null);

  function update(i: number, patch: Partial<Teacher>) {
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
      <ConfirmDialog
        open={confirmIdx !== null}
        onConfirm={() => { remove(confirmIdx!); setConfirmIdx(null); }}
        onCancel={() => setConfirmIdx(null)}
      />
      <PageHeader
        title="Daftar Guru"
        description="Kelola nama, jabatan, dan foto setiap guru."
      />

      <Panel
        title="Guru"
        description={`${items.length} guru terdaftar`}
        action={
          <div className="flex items-center gap-2">
            <SaveButton onSave={save} />
            <AddButton
              onClick={() => setItems([...items, { name: "", role: "", image: "" }])}
            >
              Tambah
            </AddButton>
          </div>
        }
      >
        <div className="space-y-4">
          {items.map((t, i) => (
            <div
              key={i}
              className="flex flex-wrap items-start gap-4 rounded-xl border border-slate-200 p-4"
            >
              <ImagePicker
                value={t.image}
                onChange={(url) => update(i, { image: url })}
              />
              <div className="min-w-0 flex-1 space-y-3">
                <Field label="Nama">
                  <Input
                    value={t.name}
                    onChange={(e) => update(i, { name: e.target.value })}
                  />
                </Field>
                <Field label="Jabatan">
                  <Input
                    value={t.role}
                    onChange={(e) => update(i, { role: e.target.value })}
                  />
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