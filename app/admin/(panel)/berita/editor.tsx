"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { EditIcon, TrashIcon } from "@/app/admin/components/icons";
import { AddButton, ConfirmDialog, Field, IconBtn, Input, PageHeader, Panel, Textarea, SaveButton } from "@/app/admin/components/ui";
import type { BeritaItem } from "@/app/lib/types";
import { deleteEditorItem, getPersistedSnapshot, removePersistedImage, tagPersistedItems } from "@/app/admin/components/deleteContent";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function BeritaEditor({ initial }: { initial: BeritaItem[] }) {
  const [items, setItems] = useState<BeritaItem[]>(() => tagPersistedItems(initial));
  const { save } = useManualSave("berita", items);
  const [confirmIdx, setConfirmIdx] = useState<number | null>(null);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  function update(i: number, patch: Partial<BeritaItem>) {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    if (patch.title && !patch.slug) {
      const base = slugify(patch.title);
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

  async function remove(i: number) {
    await deleteEditorItem("berita", null, items[i], () => {
      const next = items.filter((_, idx) => idx !== i);
      if (editingIdx === i) setEditingIdx(null);
      else if (editingIdx !== null && editingIdx > i) setEditingIdx(editingIdx - 1);
      setItems(next);
      setPage((current) => Math.min(current, Math.max(1, Math.ceil(next.length / pageSize))));
      setConfirmIdx(null);
    });
  }

  function addNew() {
    const next = [
      ...items,
      { title: "", slug: "", desc: "", content: "", image: "", date: new Date().toISOString().split("T")[0] },
    ];
    setItems(next);
    setEditingIdx(next.length - 1);
  }

  // Mode editor
  if (editingIdx !== null) {
    const e = items[editingIdx];
    const i = editingIdx;
    const saveBerita = async () => {
      const now = new Date().toISOString();
      const next = [...items];
      next[i] = getPersistedSnapshot(next[i]) === undefined
        ? { ...next[i], createdAt: now }
        : { ...next[i], updatedAt: now };
      setItems(next);
      await save(next);
    };
    return (
      <div>
        <PageHeader title="Edit Berita" description={e.title || "Berita baru"} />
        <Panel
          title={e.title || "Berita baru"}
          description={e.date}
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingIdx(null)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                ← Kembali
              </button>
              <SaveButton onSave={saveBerita} />
            </div>
          }
        >
          <div className="space-y-6">
            <ImagePicker
              value={e.image}
              large
              onChange={(url) => update(i, { image: url })}
              onRemove={() => removePersistedImage("berita", null, e, e.image)}
            />
            <div className="space-y-4">
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
          </div>
        </Panel>
      </div>
    );
  }

  // Mode daftar card
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const visibleItems = items
    .map((item, index) => ({ item, index }))
    .slice((page - 1) * pageSize, page * pageSize);

  const gridClass =
    pageSize === 5  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" :
    pageSize === 10 ? "grid-cols-2 sm:grid-cols-5" :
    pageSize === 20 ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-5" :
                      "grid-cols-2 sm:grid-cols-5 lg:grid-cols-5";

  return (
    <div>
      <ConfirmDialog
        open={confirmIdx !== null}
        onConfirm={() => remove(confirmIdx!)}
        onCancel={() => setConfirmIdx(null)}
      />
      <PageHeader
        title="Berita"
        description="Kelola artikel berita yang tampil di halaman publik."
      />
      <Panel
        title="Berita"
        description=""
        action={
          <div className="flex items-center gap-2">
            <label htmlFor="berita-page-size" className="sr-only">Jumlah berita per halaman</label>
            <select
              id="berita-page-size"
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
        {items.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-400">Belum ada berita. Klik Tambah untuk mulai.</p>
        )}
        <div className={`grid gap-4 ${gridClass}`}>
          {visibleItems.map(({ item: e, index: i }) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              {/* Gambar */}
              {e.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={e.image} alt={e.title} className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-slate-100 text-slate-300 text-xs">
                  Tidak ada gambar
                </div>
              )}

              {/* Info */}
              <div className="flex flex-1 flex-col px-3 py-2">
                <p className="text-xs text-slate-400">{e.date || "—"}</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">
                  {e.title || <span className="italic text-slate-400">Tanpa judul</span>}
                </p>
                {e.desc && (
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{e.desc}</p>
                )}
              </div>

              {/* Footer tombol aksi */}
              <div className="flex items-center justify-end gap-1 border-t border-slate-100 px-3 py-1.5">
                <IconBtn label={`Edit ${e.title || "berita"}`} onClick={() => setEditingIdx(i)}>
                  <EditIcon className="h-4 w-4" />
                </IconBtn>
                <IconBtn label={`Hapus ${e.title || "berita"}`} danger onClick={() => setConfirmIdx(i)}>
                  <TrashIcon className="h-4 w-4" />
                </IconBtn>
              </div>
            </div>
          ))}
        </div>

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
    </div>
  );
}

