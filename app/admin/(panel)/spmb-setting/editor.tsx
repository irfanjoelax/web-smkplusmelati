"use client";

import { useState } from "react";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { Button, ConfirmDialog, Field, IconBtn, Input, PageHeader, Panel, SaveButton, Textarea } from "@/app/admin/components/ui";
import { EditIcon, PlusIcon, TrashIcon } from "@/app/admin/components/icons";
import { CONTACT } from "@/app/components/site";
import type { SpmbSetting, SpmbStep } from "@/app/lib/types";

export default function SpmbSettingEditor({ initial }: { initial: SpmbSetting }) {
  const [data, setData] = useState(initial);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingForm, setEditingForm] = useState(false);
  const [deletingStep, setDeletingStep] = useState<{ index: number; step: SpmbStep } | null>(null);
  const [draft, setDraft] = useState<SpmbStep>({ title: "", desc: "" });
  const [titleDraft, setTitleDraft] = useState("");
  const [formDraft, setFormDraft] = useState(initial.googleFormEmbedUrl ?? CONTACT.googleFormEmbedUrl);
  const { save } = useManualSave("spmbSetting", data);

  function openForm(index?: number) {
    setEditingTitle(false);
    setEditingForm(false);
    setEditingIndex(index ?? -1);
    setDraft(index === undefined ? { title: "", desc: "" } : { ...data.steps[index] });
  }

  function closeForm() {
    setEditingIndex(null);
    setEditingTitle(false);
    setEditingForm(false);
    setDraft({ title: "", desc: "" });
  }

  function openTitleForm() {
    setEditingTitle(true);
    setTitleDraft(data.title);
  }

  async function saveTitle() {
    if (!titleDraft.trim()) throw new Error("Judul wajib diisi.");
    const next = { ...data, title: titleDraft.trim() };
    setData(next);
    await save(next);
    closeForm();
  }

  function openFormSetting() {
    setEditingForm(true);
    setFormDraft(data.googleFormEmbedUrl ?? CONTACT.googleFormEmbedUrl);
  }

  async function saveFormSetting() {
    try {
      const url = new URL(formDraft.trim());
      if (url.hostname !== "docs.google.com" || !url.pathname.startsWith("/forms/")) throw new Error();
    } catch {
      throw new Error("Masukkan URL embed Google Form yang valid.");
    }
    const next = { ...data, googleFormEmbedUrl: formDraft.trim() };
    setData(next);
    await save(next);
    closeForm();
  }

  async function saveStep() {
    if (!draft.title.trim() || !draft.desc.trim()) throw new Error("Nama dan deskripsi wajib diisi.");
    const steps = editingIndex === -1
      ? [...data.steps, { title: draft.title.trim(), desc: draft.desc.trim() }]
      : data.steps.map((step, index) => index === editingIndex ? { title: draft.title.trim(), desc: draft.desc.trim() } : step);
    const next = { ...data, steps };
    setData(next);
    await save(next);
    closeForm();
  }

  async function removeStep(index: number) {
    const next = { ...data, steps: data.steps.filter((_, i) => i !== index) };
    setData(next);
    await save(next);
    setDeletingStep(null);
  }

  if (editingTitle) {
    return (
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Edit Judul Prosedur" description="Ubah judul prosedur SPMB Online 2026/2027." />
        <Panel
          title="Form judul prosedur"
          description="Perubahan akan tampil setelah disimpan."
          action={<div className="flex items-center gap-2"><Button type="button" variant="ghost" onClick={closeForm}>Kembali</Button><SaveButton onSave={saveTitle} /></div>}
        >
          <div className="space-y-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 sm:p-6">
            <Field label="Judul prosedur">
              <Input autoFocus value={titleDraft} placeholder="Contoh: Prosedur SPMB Online 2026/2027" onChange={(e) => setTitleDraft(e.target.value)} />
            </Field>
          </div>
        </Panel>
      </div>
    );
  }

  if (editingForm) {
    return (
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Edit Google Form" description="Ubah formulir yang tampil di halaman SPMB." />
        <Panel title="Form Google Form" description="Gunakan URL embed dari Google Forms." action={<div className="flex items-center gap-2"><Button type="button" variant="ghost" onClick={closeForm}>Kembali</Button><SaveButton onSave={saveFormSetting} /></div>}>
          <div className="space-y-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 sm:p-6">
            <Field label="URL embed Google Form">
              <Input autoFocus type="url" value={formDraft} placeholder="https://docs.google.com/forms/d/e/.../viewform?embedded=true" onChange={(e) => setFormDraft(e.target.value)} />
            </Field>
          </div>
        </Panel>
      </div>
    );
  }

  if (editingIndex !== null) {
    return (
      <div className="mx-auto max-w-5xl">
        <PageHeader title={editingIndex === -1 ? "Tambah Langkah" : `Edit Langkah ${editingIndex + 1}`} description="Isi nama dan deskripsi prosedur SPMB." />
        <Panel
          title="Form langkah prosedur"
          description="Perubahan akan tampil setelah disimpan."
          action={
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" onClick={closeForm}>Kembali</Button>
              <SaveButton onSave={saveStep} />
            </div>
          }
        >
          <div className="space-y-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 sm:p-6">
            <Field label="Nama langkah">
              <Input autoFocus value={draft.title} placeholder="Contoh: Daftar Online" onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            </Field>
            <Field label="Deskripsi">
              <Textarea className="min-h-36" value={draft.desc} placeholder="Jelaskan proses pada langkah ini…" onChange={(e) => setDraft({ ...draft, desc: e.target.value })} />
            </Field>
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl">
      <PageHeader title="SPMB Setting" description="Atur teks prosedur SPMB Online 2026/2027." />
      <Panel title="Prosedur SPMB Online" description="Data tampil sebagai daftar. Tekan edit untuk mengubah langkah.">
        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 sm:p-5">
          <div className="min-w-0 flex-1"><p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Judul prosedur</p><p className="mt-1 font-bold text-slate-800">{data.title}</p></div>
          <IconBtn label="Edit judul prosedur" onClick={openTitleForm}><EditIcon className="h-4 w-4" /></IconBtn>
        </div>

        <div className="mt-8 flex items-end justify-between border-b border-slate-200 pb-4">
          <div><h3 className="text-base font-extrabold text-slate-900">Langkah prosedur</h3><p className="mt-1 text-sm text-slate-500">{data.steps.length} langkah terdaftar</p></div>
          <Button type="button" variant="ghost" onClick={() => openForm()}><PlusIcon className="mr-1 inline h-4 w-4" /> Tambah</Button>
        </div>

        <div className="mt-5 space-y-3">
          {data.steps.map((step, index) => (
            <div key={`${step.title}-${index}`} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-extrabold text-blue-700">{index + 1}</span>
              <div className="min-w-0 flex-1"><h4 className="font-extrabold text-slate-800">{step.title}</h4><p className="mt-1 text-sm leading-6 text-slate-500">{step.desc}</p></div>
              <div className="flex shrink-0 gap-1">
                <IconBtn label={`Edit langkah ${index + 1}`} onClick={() => openForm(index)}><EditIcon className="h-4 w-4" /></IconBtn>
                <IconBtn label={`Hapus langkah ${index + 1}`} danger onClick={() => setDeletingStep({ index, step })}><TrashIcon className="h-4 w-4" /></IconBtn>
              </div>
            </div>
          ))}
          {!data.steps.length && <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">Belum ada langkah. Klik “Tambah” untuk mulai mengisi prosedur.</div>}
        </div>
      </Panel>
      <Panel title="Google Form SPMB" description="Formulir ini tampil di sisi kanan halaman SPMB." className="mt-6">
        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 sm:p-5">
          <div className="min-w-0 flex-1"><p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">URL embed aktif</p><p className="mt-1 truncate text-sm font-semibold text-slate-700">{data.googleFormEmbedUrl ?? CONTACT.googleFormEmbedUrl}</p></div>
          <IconBtn label="Edit Google Form" onClick={openFormSetting}><EditIcon className="h-4 w-4" /></IconBtn>
        </div>
      </Panel>
      </div>
      <ConfirmDialog
        open={deletingStep !== null}
        message={deletingStep ? `Langkah “${deletingStep.step.title}” akan dihapus.` : undefined}
        onCancel={() => setDeletingStep(null)}
        onConfirm={() => deletingStep ? removeStep(deletingStep.index) : Promise.resolve()}
      />
    </>
  );
}
