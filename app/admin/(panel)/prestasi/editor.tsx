"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { EditIcon, TrashIcon } from "@/app/admin/components/icons";
import { AddButton, ConfirmDialog, Field, IconBtn, Input, PageHeader, Panel, Textarea, SaveButton } from "@/app/admin/components/ui";
import type { Prestasi, PrestasiItem } from "@/app/lib/types";
import {
  deleteEditorItem,
  markPersistedContent,
  removePersistedImage,
  tagPersistedItems,
} from "@/app/admin/components/deleteContent";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function PrestasiEditor({ initial }: { initial: Prestasi }) {
  const [quote, setQuote] = useState(initial.quote);
  const [items, setItems] = useState<PrestasiItem[]>(() => tagPersistedItems(initial.items));
  const { save } = useManualSave("prestasi", { quote, items });
  const [confirmIdx, setConfirmIdx] = useState<number | null>(null);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<PrestasiItem | null>(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  function addNew() {
    setEditingIdx(null);
    setDraft({ title: "", description: "", image: "" });
  }

  function edit(i: number) {
    setEditingIdx(i);
    setDraft({ ...items[i] });
  }

  function cancelEdit() {
    setEditingIdx(null);
    setDraft(null);
  }

  async function saveDraft() {
    if (!draft) return;
    const next = editingIdx === null
      ? [...items, draft]
      : items.map((item, index) => index === editingIdx ? draft : item);
    await save({ quote, items: next });
    setItems(next);
    cancelEdit();
  }

  async function removeDraftImage() {
    if (!draft) return;
    const removeCurrentUpload = await removePersistedImage(
      "prestasi",
      "items",
      draft,
      draft.image,
    );

    if (!removeCurrentUpload && editingIdx !== null) {
      const next = [...items];
      next[editingIdx] = { ...next[editingIdx], image: "" };
      markPersistedContent(next[editingIdx]);
      setItems(next);
    }
    return removeCurrentUpload;
  }

  async function remove(i: number) {
    await deleteEditorItem("prestasi", "items", items[i], () => {
      const next = items.filter((_, idx) => idx !== i);
      setItems(next);
      setPage((current) => Math.min(current, Math.max(1, Math.ceil(next.length / pageSize))));
      setConfirmIdx(null);
    });
  }

  if (draft) {
    return (
      <div>
        <PageHeader
          title={editingIdx === null ? "Tambah Prestasi" : "Edit Prestasi"}
          description={editingIdx === null ? "Tambahkan prestasi siswa baru." : draft.title || "Perbarui data prestasi."}
        />
        <Panel
          title={editingIdx === null ? "Prestasi Baru" : draft.title || "Edit Prestasi"}
          description="Pilih gambar, lalu isi judul dan deskripsi prestasi."
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
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
            <div className="space-y-4">
              <Field label="Judul Prestasi">
                <Input
                  value={draft.title}
                  placeholder="Masukkan judul prestasi"
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                />
              </Field>
              <Field label="Deskripsi">
                <Textarea
                  value={draft.description}
                  placeholder="Masukkan deskripsi prestasi"
                  onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                />
              </Field>
            </div>
          </div>
        </Panel>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const visibleItems = items
    .map((item, index) => ({ item, index }))
    .slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <ConfirmDialog
        open={confirmIdx !== null}
        onConfirm={() => remove(confirmIdx!)}
        onCancel={() => setConfirmIdx(null)}
      />
      <PageHeader
        title="Prestasi Siswa"
        description="Kartu prestasi, gambar sertifikat, dan kutipan halaman."
      />

      <div className="space-y-6">
        <Panel
          title="Kartu Prestasi"
          description={`${items.length} prestasi terdaftar`}
          action={
            <div className="flex items-center gap-2">
              <label htmlFor="prestasi-page-size" className="sr-only">Jumlah prestasi per halaman</label>
              <select
                id="prestasi-page-size"
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                {PAGE_SIZE_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <AddButton onClick={addNew}>Tambah</AddButton>
            </div>
          }
        >
          {items.length === 0 ? (
            <p className="rounded-xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
              Belum ada prestasi. Klik Tambah untuk mulai.
            </p>
          ) : (
            <div className="space-y-3">
              {visibleItems.map(({ item, index }) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
                >
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt=""
                      className="h-18 w-18 shrink-0 rounded-xl border border-slate-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-[0.65rem] text-slate-400">
                      Tanpa gambar
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-slate-900">{item.title || "Tanpa judul"}</p>
                    <p className="mt-0.5 line-clamp-2 text-sm text-slate-500">
                      {item.description || "Deskripsi belum diisi"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <IconBtn label={`Edit ${item.title || "prestasi"}`} onClick={() => edit(index)}>
                      <EditIcon className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn label={`Hapus ${item.title || "prestasi"}`} danger onClick={() => setConfirmIdx(index)}>
                      <TrashIcon className="h-4 w-4" />
                    </IconBtn>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-5 flex items-center justify-center gap-3 border-t border-slate-100 pt-4">
              <span className="text-xs font-semibold text-slate-500">
                Halaman {page}{page < totalPages ? `-${page + 1}` : ""}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Halaman sebelumnya"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  &lt;
                </button>
                <button
                  type="button"
                  aria-label="Halaman berikutnya"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page === totalPages}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </Panel>

        <Panel title="Kutipan Halaman" action={<SaveButton onSave={save} />}>
          <Field label="Teks Kutipan (tanpa tanda kutip)">
            <Textarea value={quote} onChange={(event) => setQuote(event.target.value)} />
          </Field>
        </Panel>
      </div>
    </div>
  );
}
