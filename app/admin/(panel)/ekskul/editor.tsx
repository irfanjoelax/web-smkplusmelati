"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { EditIcon, TrashIcon } from "@/app/admin/components/icons";
import { AddButton, ConfirmDialog, Field, IconBtn, Input, PageHeader, Panel, Textarea, SaveButton } from "@/app/admin/components/ui";
import type { EkskulItem } from "@/app/lib/types";
import {
  deleteEditorItem,
  markPersistedContent,
  removePersistedImage,
  tagPersistedItems,
} from "@/app/admin/components/deleteContent";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function EkskulEditor({ initial }: { initial: EkskulItem[] }) {
  const [items, setItems] = useState<EkskulItem[]>(() => tagPersistedItems(initial));
  const { save } = useManualSave("ekskul", items);
  const [confirmIdx, setConfirmIdx] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<EkskulItem | null>(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  function addNew() {
    setEditingIdx(null);
    setDraft({ title: "", desc: "", image: "", required: false });
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
    await save(next);
    setItems(next);
    cancelEdit();
  }

  async function removeDraftImage() {
    if (!draft) return;
    const removeCurrentUpload = await removePersistedImage(
      "ekskul",
      null,
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
    await deleteEditorItem("ekskul", null, items[i], () => {
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
          title={editingIdx === null ? "Tambah Ekskul" : "Edit Ekskul"}
          description={editingIdx === null ? "Tambahkan data ekstrakurikuler baru." : draft.title || "Perbarui data ekstrakurikuler."}
        />
        <Panel
          title={editingIdx === null ? "Ekskul Baru" : draft.title || "Edit Ekskul"}
          description="Pilih foto, lalu isi nama dan deskripsi ekstrakurikuler."
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
              <Field label="Nama Ekskul">
                <Input
                  value={draft.title}
                  placeholder="Masukkan nama ekstrakurikuler"
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                />
              </Field>
              <Field label="Deskripsi">
                <Textarea
                  value={draft.desc}
                  placeholder="Masukkan deskripsi ekstrakurikuler"
                  onChange={(event) => setDraft({ ...draft, desc: event.target.value })}
                />
              </Field>
              <Field label="Kategori">
                <select
                  value={draft.required ? "wajib" : "lainnya"}
                  onChange={(event) => setDraft({ ...draft, required: event.target.value === "wajib" })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="wajib">Ekskul Wajib</option>
                  <option value="lainnya">Ekskul Pilihan</option>
                </select>
              </Field>
            </div>
          </div>
        </Panel>
      </div>
    );
  }

  const query = search.trim().toLocaleLowerCase("id-ID");
  const filteredItems = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) =>
      !query || `${item.title} ${item.desc}`.toLocaleLowerCase("id-ID").includes(query),
    )
    .sort((a, b) => Number(Boolean(b.item.required)) - Number(Boolean(a.item.required)));

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const visibleItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);
  const visibleGroups = [
    { title: "Ekskul Wajib", items: visibleItems.filter(({ item }) => item.required) },
    { title: "Ekskul Pilihan", items: visibleItems.filter(({ item }) => !item.required) },
  ].filter((group) => group.items.length > 0);

  return (
    <div>
      <ConfirmDialog
        open={confirmIdx !== null}
        onConfirm={() => remove(confirmIdx!)}
        onCancel={() => setConfirmIdx(null)}
      />
      <PageHeader
        title="Ekskul"
        description="Kelola kartu ekstrakurikuler yang tampil di halaman publik."
      />

      <Panel
        title="Ekskul"
        description={`${items.length} ekstrakurikuler terdaftar`}
        action={
          <div className="flex items-center gap-2">
            <label htmlFor="ekskul-page-size" className="sr-only">Jumlah ekskul per halaman</label>
            <select
              id="ekskul-page-size"
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
        <div className="mb-5">
          <label htmlFor="search-ekskul" className="sr-only">Cari ekskul</label>
          <div className="relative max-w-md">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
            <Input
              id="search-ekskul"
              type="search"
              value={search}
              placeholder="Cari nama atau deskripsi ekskul..."
              className="pl-10"
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            {items.length === 0 ? "Belum ada ekskul. Klik Tambah untuk mulai." : "Ekskul tidak ditemukan."}
          </p>
        ) : (
          <div className="space-y-6">
            {visibleGroups.map((group) => (
              <section key={group.title}>
                <h3 className="mb-3 text-sm font-extrabold text-slate-800">
                  {group.title}
                </h3>
                <div className="space-y-3">
                  {group.items.map(({ item, index }) => (
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
                          Tanpa foto
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-bold text-slate-900">{item.title || "Tanpa judul"}</p>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${item.required ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                            {item.required ? "Wajib" : "Pilihan"}
                          </span>
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-sm text-slate-500">{item.desc || "Deskripsi belum diisi"}</p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <IconBtn label={`Edit ${item.title || "ekskul"}`} onClick={() => edit(index)}>
                          <EditIcon className="h-4 w-4" />
                        </IconBtn>
                        <IconBtn label={`Hapus ${item.title || "ekskul"}`} danger onClick={() => setConfirmIdx(index)}>
                          <TrashIcon className="h-4 w-4" />
                        </IconBtn>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
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
    </div>
  );
}
