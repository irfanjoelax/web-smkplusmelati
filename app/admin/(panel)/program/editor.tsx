"use client";

import { useState } from "react";
import Image from "next/image";
import ImagePicker from "@/app/admin/components/ImagePicker";
import StringListEditor from "@/app/admin/components/StringListEditor";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { EditIcon, TrashIcon } from "@/app/admin/components/icons";
import {
  AddButton,
  Button,
  ConfirmDialog,
  Field,
  IconBtn,
  Input,
  PageHeader,
  Panel,
  SaveButton,
  Textarea,
} from "@/app/admin/components/ui";
import type { ProgramCard, ProgramData, ProgramEntity } from "@/app/lib/types";

function makeId(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ProgramEditor({ initial }: { initial: ProgramData }) {
  const [items, setItems] = useState(initial);
  const [activeId, setActiveId] = useState(initial[0]?.id ?? "");
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [addError, setAddError] = useState("");
  const [confirmProgram, setConfirmProgram] = useState(false);
  const [confirmCard, setConfirmCard] = useState<number | null>(null);
  const [editingCard, setEditingCard] = useState<number | null>(null);
  const [draftCard, setDraftCard] = useState<ProgramCard | null>(null);
  const { save } = useManualSave("program", items);
  const activeIndex = items.findIndex((item) => item.id === activeId);
  const current = items[activeIndex];

  function updateCurrent(next: ProgramEntity) {
    setItems(items.map((item, index) => (index === activeIndex ? next : item)));
  }

  function closeAdd() {
    setShowAdd(false);
    setNewTitle("");
    setNewSummary("");
    setAddError("");
  }

  async function addProgram() {
    const title = newTitle.trim();
    const summary = newSummary.trim();
    const id = makeId(title.replace(/^program\s+/i, ""));
    if (!title || !summary) return setAddError("Nama dan deskripsi singkat wajib diisi.");
    if (!id) return setAddError("Nama program harus memiliki huruf atau angka.");
    if (items.some((item) => item.id === id)) return setAddError("Nama program sudah digunakan.");
    const next: ProgramEntity = {
      id,
      title: /^program\s/i.test(title) ? title : `Program ${title}`,
      summary,
      description: summary,
      icon: "training",
      cards: [],
      section: { type: "list", title: "Kegiatan", items: [] },
    };
    const nextItems = [...items, next];
    try {
      await save(nextItems);
      setItems(nextItems);
      setActiveId(id);
      closeAdd();
    } catch (error) {
      setAddError(error instanceof Error ? error.message : "Gagal menambahkan program.");
    }
  }

  async function deleteProgram() {
    if (!current || items.length === 1) return;
    const next = items.filter((item) => item.id !== current.id);
    await save(next);
    setItems(next);
    setActiveId(next[0].id);
    setConfirmProgram(false);
  }

  function startCard(index: number | null) {
    setEditingCard(index);
    setDraftCard(index === null ? { title: "", description: "", image: "" } : { ...current.cards[index] });
  }

  async function saveCard() {
    if (!current || !draftCard) return;
    const cards = editingCard === null
      ? [...current.cards, draftCard]
      : current.cards.map((card, index) => (index === editingCard ? draftCard : card));
    const updated = { ...current, cards };
    const next = items.map((item, index) => (index === activeIndex ? updated : item));
    await save(next);
    setItems(next);
    setDraftCard(null);
    setEditingCard(null);
  }

  async function deleteCard() {
    if (!current || confirmCard === null) return;
    const cards = current.cards.filter((_, index) => index !== confirmCard);
    const updated = { ...current, cards };
    const next = items.map((item, index) => (index === activeIndex ? updated : item));
    await save(next);
    setItems(next);
    setConfirmCard(null);
  }

  if (draftCard && current) {
    return (
      <div>
        <PageHeader title={editingCard === null ? "Tambah Kegiatan" : "Edit Kegiatan"} description={current.title} />
        <Panel
          title={editingCard === null ? "Kegiatan Baru" : draftCard.title || "Edit Kegiatan"}
          description="Pilih foto, lalu isi judul dan deskripsi kegiatan."
          action={<div className="flex gap-2"><Button variant="ghost" onClick={() => setDraftCard(null)}>Kembali</Button><SaveButton onSave={saveCard} /></div>}
        >
          <div className="space-y-5">
            <ImagePicker value={draftCard.image} large onChange={(image) => setDraftCard({ ...draftCard, image })} />
            <Field label="Judul Kegiatan"><Input value={draftCard.title} onChange={(event) => setDraftCard({ ...draftCard, title: event.target.value })} /></Field>
            <Field label="Deskripsi"><Textarea value={draftCard.description} onChange={(event) => setDraftCard({ ...draftCard, description: event.target.value })} /></Field>
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <div>
      <ConfirmDialog open={confirmProgram} message={`Yakin ingin menghapus ${current?.title ?? "program ini"}? Program akan langsung dihapus dari website.`} onConfirm={deleteProgram} onCancel={() => setConfirmProgram(false)} />
      <ConfirmDialog open={confirmCard !== null} onConfirm={deleteCard} onCancel={() => setConfirmCard(null)} />
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm" onClick={closeAdd}>
          <form className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); addProgram(); }}>
            <h2 className="text-lg font-extrabold text-slate-900">Tambah Program</h2>
            <p className="mt-1 text-sm text-slate-500">Alamat halaman dibuat otomatis dari nama program.</p>
            <div className="mt-5 space-y-4">
              <Field label="Nama Program"><Input autoFocus value={newTitle} placeholder="Contoh: Magang Industri" onChange={(event) => { setNewTitle(event.target.value); setAddError(""); }} /></Field>
              <Field label="Deskripsi Singkat"><Textarea value={newSummary} placeholder="Ringkasan program untuk halaman utama" onChange={(event) => { setNewSummary(event.target.value); setAddError(""); }} /></Field>
            </div>
            {addError && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">{addError}</p>}
            <div className="mt-6 flex justify-end gap-2"><Button type="button" variant="ghost" onClick={closeAdd}>Batal</Button><Button type="submit">Tambah</Button></div>
          </form>
        </div>
      )}

      <PageHeader title="Program Unggulan" description="Kelola program dan kegiatan yang tampil di website." right={<AddButton onClick={() => setShowAdd(true)}>Tambah Program</AddButton>} />
      <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
        {items.map((item) => (
          <button key={item.id} type="button" onClick={() => { setActiveId(item.id); setConfirmCard(null); }} className={`rounded-lg px-3 py-2.5 text-sm font-bold transition ${activeId === item.id ? "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>{item.title}</button>
        ))}
      </div>

      {current && (
        <div className="space-y-6">
          <Panel title={current.title} description={`Halaman publik: /program-${current.id}`} action={<div className="flex gap-2">{items.length > 1 && <Button variant="danger" onClick={() => setConfirmProgram(true)}>Hapus Program</Button>}<SaveButton onSave={save} /></div>}>
            <div className="space-y-4">
              <Field label="Nama Program"><Input value={current.title} onChange={(event) => updateCurrent({ ...current, title: event.target.value })} /></Field>
              <Field label="Deskripsi Singkat"><Textarea value={current.summary} onChange={(event) => updateCurrent({ ...current, summary: event.target.value })} /></Field>
              <Field label="Deskripsi Halaman"><Textarea value={current.description} onChange={(event) => updateCurrent({ ...current, description: event.target.value })} /></Field>
            </div>
          </Panel>

          <Panel title="Kartu Kegiatan" description={`${current.cards.length} kegiatan terdaftar`} action={<AddButton onClick={() => startCard(null)}>Tambah Kegiatan</AddButton>}>
            {current.cards.length === 0 ? (
              <p className="rounded-xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">Belum ada kegiatan. Klik Tambah Kegiatan untuk mulai.</p>
            ) : (
              <div className="space-y-3">
                {current.cards.map((card, index) => (
                  <div key={`${card.title}-${index}`} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
                    {card.image ? <Image src={card.image} alt="" width={72} height={72} className="h-18 w-18 shrink-0 rounded-xl border border-slate-200 object-cover" /> : <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 text-xs text-slate-400">Tanpa foto</div>}
                    <div className="min-w-0 flex-1"><p className="truncate font-bold text-slate-900">{card.title || "Tanpa judul"}</p><p className="mt-0.5 line-clamp-2 text-sm text-slate-500">{card.description || "Deskripsi belum diisi"}</p></div>
                    <div className="flex gap-1"><IconBtn label="Edit kegiatan" onClick={() => startCard(index)}><EditIcon className="h-4 w-4" /></IconBtn><IconBtn label="Hapus kegiatan" danger onClick={() => setConfirmCard(index)}><TrashIcon className="h-4 w-4" /></IconBtn></div>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          {current.section && (
            <Panel title={current.section.title || "Kegiatan"} description="Bagian tambahan pada halaman program" action={<SaveButton onSave={save} />}>
              <StringListEditor
                value={current.section.items ?? []}
                sortable={false}
                onChange={(values) => updateCurrent({
                  ...current,
                  section: { ...current.section!, type: "list", items: values },
                })}
              />
            </Panel>
          )}
        </div>
      )}
    </div>
  );
}
