"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { EditIcon, TrashIcon } from "@/app/admin/components/icons";
import { AddButton, ConfirmDialog, Field, IconBtn, Input, PageHeader, Panel, SaveButton } from "@/app/admin/components/ui";
import type { Teacher } from "@/app/lib/types";
import { deleteEditorItem, removePersistedImage, tagPersistedItems } from "@/app/admin/components/deleteContent";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function GuruEditor({ initial }: { initial: Teacher[] }) {
  const [items, setItems] = useState<Teacher[]>(() => tagPersistedItems(initial));
  const { save } = useManualSave("guru", items);
  const [confirmIdx, setConfirmIdx] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<Teacher | null>(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  function addNew() {
    setEditingIdx(null);
    setDraft({ name: "", role: "", image: "" });
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

  async function remove(i: number) {
    await deleteEditorItem("guru", null, items[i], () => {
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
          title={editingIdx === null ? "Tambah Guru" : "Edit Guru"}
          description={editingIdx === null ? "Tambahkan data guru baru." : draft.name || "Perbarui data guru."}
        />
        <Panel
          title={editingIdx === null ? "Guru Baru" : draft.name || "Edit Guru"}
          description="Pilih foto, lalu isi nama dan jabatan guru."
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
              onRemove={() => removePersistedImage("guru", null, draft, draft.image)}
            />
            <div className="space-y-4">
              <Field label="Nama Guru">
                <Input
                  value={draft.name}
                  placeholder="Masukkan nama guru"
                  onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                />
              </Field>
              <Field label="Jabatan">
                <Input
                  value={draft.role}
                  placeholder="Masukan jabatan"
                  onChange={(event) => setDraft({ ...draft, role: event.target.value })}
                />
              </Field>
            </div>
          </div>
        </Panel>
      </div>
    );
  }

  const query = search.trim().toLocaleLowerCase("id-ID");
  const filteredItems = items
    .map((teacher, index) => ({ teacher, index }))
    .filter(({ teacher }) =>
      !query || `${teacher.name} ${teacher.role}`.toLocaleLowerCase("id-ID").includes(query),
    );

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const visibleItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <ConfirmDialog
        open={confirmIdx !== null}
        onConfirm={() => remove(confirmIdx!)}
        onCancel={() => setConfirmIdx(null)}
      />
      <PageHeader
        title="Daftar Guru"
        description="Cari dan kelola data guru yang tampil di situs."
      />

      <Panel
        title="Guru"
        description={`${items.length} guru terdaftar`}
        action={
          <div className="flex items-center gap-2">
            <label htmlFor="guru-page-size" className="sr-only">Jumlah guru per halaman</label>
            <select
              id="guru-page-size"
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
          <label htmlFor="search-guru" className="sr-only">Cari guru</label>
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
              id="search-guru"
              type="search"
              value={search}
              placeholder="Cari nama atau jabatan guru..."
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
            {items.length === 0 ? "Belum ada guru. Klik Tambah untuk mulai." : "Guru tidak ditemukan."}
          </p>
        ) : (
          <div className="space-y-3">
            {visibleItems.map(({ teacher, index }) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
              >
                {teacher.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={teacher.image}
                    alt=""
                    className="h-18 w-18 shrink-0 rounded-xl border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-[0.65rem] text-slate-400">
                    Tanpa foto
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-900">{teacher.name || "Tanpa nama"}</p>
                  <p className="mt-0.5 truncate text-sm text-slate-500">{teacher.role || "Jabatan belum diisi"}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <IconBtn label={`Edit ${teacher.name || "guru"}`} onClick={() => edit(index)}>
                    <EditIcon className="h-4 w-4" />
                  </IconBtn>
                  <IconBtn label={`Hapus ${teacher.name || "guru"}`} danger onClick={() => setConfirmIdx(index)}>
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
    </div>
  );
}
