"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { EditIcon, TrashIcon } from "@/app/admin/components/icons";
import { AddButton, ConfirmDialog, Field, IconBtn, Input, PageHeader, Panel, SaveButton, Textarea } from "@/app/admin/components/ui";
import {
  deleteEditorItem,
  markPersistedContent,
  removePersistedImage,
  tagPersistedItems,
} from "@/app/admin/components/deleteContent";
import { isAlumniData } from "@/app/lib/alumni";
import type { AlumniItem, AlumniStatus, TestimoniOrtuItem } from "@/app/lib/types";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const STATUSES: AlumniStatus[] = ["Bekerja", "Kuliah", "Wirausaha"];

const EMPTY_ALUMNI: AlumniItem = {
  name: "",
  graduationYear: new Date().getFullYear(),
  major: "",
  status: "Bekerja",
  testimonial: "",
  image: "",
};

export default function AlumniEditor({
  initial,
  initialTestimonials,
  majors,
}: {
  initial: AlumniItem[];
  initialTestimonials: TestimoniOrtuItem[];
  majors: string[];
}) {
  const [items, setItems] = useState<AlumniItem[]>(() => tagPersistedItems(initial));
  const { save: saveAlumni } = useManualSave("alumni", items);
  const [testimonials, setTestimonials] = useState<TestimoniOrtuItem[]>(() => tagPersistedItems(initialTestimonials));
  const { save: saveTestimonials } = useManualSave("testimoniOrtu", testimonials);
  const [confirmIdx, setConfirmIdx] = useState<number | null>(null);
  const [confirmTestimonialIdx, setConfirmTestimonialIdx] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<AlumniItem | null>(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [testimonialPageSize, setTestimonialPageSize] = useState(5);
  const [testimonialPage, setTestimonialPage] = useState(1);
  const [testimonialDraft, setTestimonialDraft] = useState<string | null>(null);
  const [editingTestimonialIdx, setEditingTestimonialIdx] = useState<number | null>(null);

  function addNew() {
    setEditingIdx(null);
    setDraft({ ...EMPTY_ALUMNI });
  }

  function edit(index: number) {
    setEditingIdx(index);
    setDraft({ ...items[index] });
  }

  function cancelEdit() {
    setEditingIdx(null);
    setDraft(null);
  }

  async function saveDraft() {
    if (!draft) return;
    const normalized = {
      ...draft,
      name: draft.name.trim(),
      major: draft.major.trim(),
      testimonial: draft.testimonial.trim(),
    };
    if (!isAlumniData([normalized])) {
      throw new Error("Lengkapi seluruh data alumni dan foto sebelum menyimpan.");
    }

    const next = editingIdx === null
      ? [...items, normalized]
      : items.map((item, index) => index === editingIdx ? normalized : item);
    await saveAlumni(next);
    setItems(next);
    cancelEdit();
  }

  async function removeDraftImage() {
    if (!draft) return;
    const removeCurrentUpload = await removePersistedImage("alumni", null, draft, draft.image);
    if (!removeCurrentUpload && editingIdx !== null) {
      const next = [...items];
      next[editingIdx] = { ...next[editingIdx], image: "" };
      markPersistedContent(next[editingIdx]);
      setItems(next);
    }
    return removeCurrentUpload;
  }

  async function remove(index: number) {
    await deleteEditorItem("alumni", null, items[index], () => {
      const next = items.filter((_, itemIndex) => itemIndex !== index);
      setItems(next);
      setPage((current) => Math.min(current, Math.max(1, Math.ceil(next.length / pageSize))));
      setConfirmIdx(null);
    });
  }

  function editTestimonial(index: number) {
    setEditingTestimonialIdx(index);
    setTestimonialDraft(testimonials[index].text);
  }

  function cancelTestimonialEdit() {
    setEditingTestimonialIdx(null);
    setTestimonialDraft(null);
  }

  async function saveTestimonial() {
    const text = testimonialDraft?.trim() ?? "";
    if (!text) throw new Error("Isi testimoni wajib diisi.");
    const next = editingTestimonialIdx === null
      ? [...testimonials, { text }]
      : testimonials.map((item, index) => index === editingTestimonialIdx ? { text } : item);
    await saveTestimonials(next);
    setTestimonials(tagPersistedItems(next));
    if (editingTestimonialIdx === null) {
      setTestimonialPage(Math.max(1, Math.ceil(next.length / testimonialPageSize)));
    }
    cancelTestimonialEdit();
  }

  async function removeTestimonial(index: number) {
    await deleteEditorItem("testimoniOrtu", null, testimonials[index], () => {
      const next = testimonials.filter((_, itemIndex) => itemIndex !== index);
      setTestimonials(next);
      setTestimonialPage((current) => Math.min(current, Math.max(1, Math.ceil(next.length / testimonialPageSize))));
      setConfirmTestimonialIdx(null);
      if (editingTestimonialIdx === index) cancelTestimonialEdit();
    });
  }

  if (draft) {
    return (
      <div>
        <PageHeader
          title={editingIdx === null ? "Tambah Alumni" : "Edit Alumni"}
          description={editingIdx === null ? "Tambahkan jejak alumni baru." : draft.name || "Perbarui data alumni."}
        />
        <Panel
          title={editingIdx === null ? "Alumni Baru" : draft.name || "Edit Alumni"}
          description="Isi seluruh informasi yang akan tampil pada halaman Alumni."
          action={
            <div className="flex items-center gap-2">
              <button type="button" onClick={cancelEdit} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                ← Kembali
              </button>
              <SaveButton onSave={saveDraft} />
            </div>
          }
        >
          <div className="space-y-6">
            <ImagePicker
              value={draft.image}
              large
              onChange={(image) => setDraft({ ...draft, image })}
              onRemove={removeDraftImage}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nama Alumni">
                <Input value={draft.name} maxLength={100} placeholder="Nama lengkap alumni" onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
              </Field>
              <Field label="Tahun Lulus">
                <Input type="number" min={1950} max={2100} value={draft.graduationYear} onChange={(event) => setDraft({ ...draft, graduationYear: Number(event.target.value) })} />
              </Field>
              <Field label="Jurusan">
                <select
                  value={majors.find((m) => m.toLowerCase() === draft.major.toLowerCase()) ?? ""}
                  onChange={(event) => setDraft({ ...draft, major: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="" disabled>Pilih jurusan</option>
                  {majors.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </Field>
              <Field label="Status Setelah Lulus">
                <select
                  value={draft.status}
                  onChange={(event) => setDraft({ ...draft, status: event.target.value as AlumniStatus })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {STATUSES.map((status) => <option key={status}>{status}</option>)}
                </select>
              </Field>
              <Field label="Testimoni Alumni" className="md:col-span-2">
                <Textarea value={draft.testimonial} maxLength={500} placeholder="Tulis testimoni alumni" onChange={(event) => setDraft({ ...draft, testimonial: event.target.value })} />
              </Field>
            </div>
          </div>
        </Panel>
      </div>
    );
  }

  if (testimonialDraft !== null) {
    const isNew = editingTestimonialIdx === null;
    return (
      <div>
        <PageHeader
          title={isNew ? "Tambah Testimoni Orang Tua" : "Edit Testimoni Orang Tua"}
          description={isNew ? "Tambahkan testimoni orang tua baru." : "Perbarui isi testimoni orang tua."}
        />
        <Panel
          title={isNew ? "Testimoni Baru" : "Edit Testimoni"}
          description="Isi testimoni yang akan tampil pada halaman Alumni."
          action={
            <div className="flex items-center gap-2">
              <button type="button" onClick={cancelTestimonialEdit} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                ← Kembali
              </button>
              <SaveButton onSave={saveTestimonial} />
            </div>
          }
        >
          <Field label="Isi Testimoni">
            <Textarea
              value={testimonialDraft}
              maxLength={500}
              placeholder="Tulis testimoni orang tua"
              onChange={(event) => setTestimonialDraft(event.target.value)}
            />
          </Field>
        </Panel>
      </div>
    );
  }

  const query = search.trim().toLocaleLowerCase("id-ID");
  const filteredItems = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !query || `${item.name} ${item.major} ${item.status} ${item.testimonial}`.toLocaleLowerCase("id-ID").includes(query));
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const visibleItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);
  const testimonialTotalPages = Math.max(1, Math.ceil(testimonials.length / testimonialPageSize));
  const visibleTestimonials = testimonials
    .map((item, index) => ({ item, index }))
    .slice((testimonialPage - 1) * testimonialPageSize, testimonialPage * testimonialPageSize);

  return (
    <div>
      <ConfirmDialog open={confirmIdx !== null} onConfirm={() => remove(confirmIdx!)} onCancel={() => setConfirmIdx(null)} />
      <ConfirmDialog
        open={confirmTestimonialIdx !== null}
        message="Yakin ingin menghapus testimoni ini?"
        onConfirm={() => removeTestimonial(confirmTestimonialIdx!)}
        onCancel={() => setConfirmTestimonialIdx(null)}
      />
      <PageHeader title="Alumni" description="Kelola profil alumni dan testimoni orang tua." />
      <Panel
        title="Alumni"
        description={`${items.length} alumni terdaftar`}
        action={
          <div className="flex items-center gap-2">
            <label htmlFor="alumni-page-size" className="sr-only">Jumlah alumni per halaman</label>
            <select
              id="alumni-page-size"
              value={pageSize}
              onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {PAGE_SIZE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <AddButton onClick={addNew}>Tambah</AddButton>
          </div>
        }
      >
        <div className="mb-5 max-w-md">
          <label htmlFor="search-alumni" className="sr-only">Cari alumni</label>
          <Input
            id="search-alumni"
            type="search"
            value={search}
            placeholder="Cari nama, jurusan, status, atau testimoni..."
            onChange={(event) => { setSearch(event.target.value); setPage(1); }}
          />
        </div>

        {filteredItems.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            {items.length === 0 ? "Belum ada alumni. Klik Tambah untuk mulai." : "Alumni tidak ditemukan."}
          </p>
        ) : (
          <div className="space-y-3">
            {visibleItems.map(({ item, index }) => (
              <div key={`${item.name}-${index}`} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt="" className="h-18 w-18 shrink-0 rounded-xl border border-slate-200 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="[overflow-wrap:anywhere] font-bold text-slate-900">{item.name}</p>
                  <p className="mt-0.5 [overflow-wrap:anywhere] text-sm text-slate-500">Lulus {item.graduationYear} · {item.major}</p>
                  <p className="mt-1 text-xs font-semibold text-blue-700">{item.status}</p>
                  <p className="mt-1 line-clamp-2 [overflow-wrap:anywhere] text-xs text-slate-500">{item.testimonial}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <IconBtn label={`Edit ${item.name}`} onClick={() => edit(index)}><EditIcon className="h-4 w-4" /></IconBtn>
                  <IconBtn label={`Hapus ${item.name}`} danger onClick={() => setConfirmIdx(index)}><TrashIcon className="h-4 w-4" /></IconBtn>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-5 flex items-center justify-center gap-3 border-t border-slate-100 pt-4">
            <span className="text-xs font-semibold text-slate-500">Halaman {page} dari {totalPages}</span>
            <button type="button" aria-label="Halaman sebelumnya" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-40">&lt;</button>
            <button type="button" aria-label="Halaman berikutnya" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-40">&gt;</button>
          </div>
        )}
      </Panel>
      <Panel
        className="mt-6"
        title="Testimoni Orang Tua"
        description={`${testimonials.length} testimoni tersimpan`}
        action={
          <div className="flex items-center gap-2">
            <label htmlFor="testimonial-page-size" className="sr-only">Jumlah testimoni per halaman</label>
            <select
              id="testimonial-page-size"
              value={testimonialPageSize}
              onChange={(event) => { setTestimonialPageSize(Number(event.target.value)); setTestimonialPage(1); }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {PAGE_SIZE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <AddButton onClick={() => setTestimonialDraft("")}>Tambah</AddButton>
          </div>
        }
      >
        {testimonials.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            Belum ada testimoni orang tua. Klik Tambah untuk mulai.
          </p>
        ) : (
          <div className="space-y-3">
            {visibleTestimonials.map(({ item, index }) => (
              <div key={`${item.text}-${index}`} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm">
                <p className="min-w-0 flex-1 whitespace-pre-wrap [overflow-wrap:anywhere] text-sm leading-relaxed text-slate-700">
                  {item.text}
                </p>
                <div className="flex shrink-0 gap-1">
                  <IconBtn label={`Edit testimoni ${index + 1}`} onClick={() => editTestimonial(index)}><EditIcon className="h-4 w-4" /></IconBtn>
                  <IconBtn label={`Hapus testimoni ${index + 1}`} danger onClick={() => setConfirmTestimonialIdx(index)}><TrashIcon className="h-4 w-4" /></IconBtn>
                </div>
              </div>
            ))}
          </div>
        )}
        {testimonialTotalPages > 1 && (
          <div className="mt-5 flex items-center justify-center gap-3 border-t border-slate-100 pt-4">
            <span className="text-xs font-semibold text-slate-500">Halaman {testimonialPage} dari {testimonialTotalPages}</span>
            <button type="button" aria-label="Halaman testimoni sebelumnya" onClick={() => setTestimonialPage((current) => Math.max(1, current - 1))} disabled={testimonialPage === 1} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-40">&lt;</button>
            <button type="button" aria-label="Halaman testimoni berikutnya" onClick={() => setTestimonialPage((current) => Math.min(testimonialTotalPages, current + 1))} disabled={testimonialPage === testimonialTotalPages} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-40">&gt;</button>
          </div>
        )}
      </Panel>
    </div>
  );
}
