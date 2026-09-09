"use client";

import { useState, useRef, useEffect } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { TrashIcon } from "@/app/admin/components/icons";
import { AddButton, ConfirmDialog, Field, IconBtn, Input, PageHeader, Panel, Textarea, SaveButton } from "@/app/admin/components/ui";
import type { BeritaItem } from "@/app/lib/types";
import { deleteEditorItem, tagPersistedItems } from "@/app/admin/components/deleteContent";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const PER_PAGE_OPTIONS = [6, 10, 20, 50];

export default function BeritaEditor({ initial }: { initial: BeritaItem[] }) {
  const [items, setItems] = useState<BeritaItem[]>(() => tagPersistedItems(initial));
  const { save } = useManualSave("berita", items);
  const [confirmIdx, setConfirmIdx] = useState<number | null>(null);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [perPage, setPerPage] = useState(6);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
              <SaveButton onSave={save} />
            </div>
          }
        >
          <div className="flex flex-wrap items-start gap-4">
            <ImagePicker value={e.image} onChange={(url) => update(i, { image: url })} />
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
          </div>
        </Panel>
      </div>
    );
  }

  // Mode daftar card
  const visibleItems = items.slice(0, perPage);
  const gridClass =
    perPage === 6  ? "grid-cols-2 sm:grid-cols-3" :
    perPage === 10 ? "grid-cols-2 sm:grid-cols-5" :
    perPage === 20 ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-5" :
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
            {/* Dropdown tampilkan */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                {perPage}
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-1 w-28 rounded-lg border border-slate-200 bg-white shadow-lg">
                  {PER_PAGE_OPTIONS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => { setPerPage(n); setDropdownOpen(false); }}
                      className={`w-full px-4 py-2 text-left text-sm transition hover:bg-slate-50 ${
                        perPage === n ? "font-semibold text-blue-600" : "text-slate-700"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <AddButton onClick={addNew}>Tambah</AddButton>
          </div>
        }
      >
        {items.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-400">Belum ada berita. Klik Tambah untuk mulai.</p>
        )}
        <div className={`grid gap-4 ${gridClass}`}>
          {visibleItems.map((e, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-400 hover:shadow-md cursor-pointer"
              onClick={() => setEditingIdx(i)}
            >
              {/* Gambar */}
              {e.image ? (
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
              <div
                className="flex items-center justify-end gap-1 border-t border-slate-100 px-3 py-1.5"
                onClick={(ev) => ev.stopPropagation()}
              >
                <IconBtn label="Hapus" danger onClick={() => setConfirmIdx(i)}>
                  <TrashIcon className="h-4 w-4" />
                </IconBtn>
              </div>
            </div>
          ))}
        </div>

        {items.length > perPage && (
          <p className="mt-3 text-center text-xs text-slate-400">
            Menampilkan {perPage} dari {items.length} artikel. Pilih angka lebih besar untuk lihat lebih banyak.
          </p>
        )}
      </Panel>
    </div>
  );
}
