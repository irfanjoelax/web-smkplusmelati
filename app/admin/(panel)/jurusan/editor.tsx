"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import StringListEditor from "@/app/admin/components/StringListEditor";
import { useManualSave } from "@/app/admin/components/useManualSave";
import {
  removePersistedImage,
  tagPersistedItems,
} from "@/app/admin/components/deleteContent";
import {
  AddButton,
  Button,
  ConfirmDialog,
  Field,
  Input,
  PageHeader,
  Panel,
  SaveButton,
  Textarea,
} from "@/app/admin/components/ui";
import type { JurusanCard, JurusanData, JurusanItem } from "@/app/lib/types";

function CardEditor({
  label,
  value,
  onChange,
  showLabel = true,
  showTitle = true,
}: {
  label: string;
  value: JurusanCard;
  onChange: (next: JurusanCard) => void;
  showLabel?: boolean;
  showTitle?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="mb-3 text-sm font-extrabold text-slate-700">{label}</p>
      <div className="space-y-3">
        {showLabel && (
          <Field label="Label">
            <Input value={value.chip} onChange={(e) => onChange({ ...value, chip: e.target.value })} />
          </Field>
        )}
        {showTitle && (
          <Field label="Judul">
            <Input value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
          </Field>
        )}
        <Field label="Deskripsi">
          <Textarea value={value.description} onChange={(e) => onChange({ ...value, description: e.target.value })} />
        </Field>
      </div>
    </div>
  );
}

function makeId(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function JurusanEditor({ initial }: { initial: JurusanData }) {
  const [items, setItems] = useState(() => tagPersistedItems(initial));
  const [activeId, setActiveId] = useState(initial[0]?.id ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [addError, setAddError] = useState("");
  const { save } = useManualSave("jurusan", items);
  const activeIndex = items.findIndex((item) => item.id === activeId);
  const current = items[activeIndex];

  function updateCurrent(next: JurusanItem) {
    setItems(items.map((item, index) => (index === activeIndex ? next : item)));
  }

  function addJurusan() {
    const name = newName.trim();
    const fullName = newFullName.trim();
    const id = makeId(name);
    if (!name || !fullName) {
      setAddError("Nama singkat dan nama panjang wajib diisi.");
      return;
    }
    if (!id) {
      setAddError("Nama singkat harus memiliki huruf atau angka.");
      return;
    }
    if (items.some((item) => item.id === id)) {
      setAddError("Nama singkat sudah digunakan oleh jurusan lain.");
      return;
    }

    const next: JurusanItem = {
      id,
      name,
      fullName,
      image: "",
      description: "Deskripsi singkat jurusan.",
      whyTitle: `Mengapa Memilih ${name}?`,
      whyText: "Jelaskan alasan memilih jurusan ini.",
      skills: [],
      card1: { chip: "Keunggulan", title: "Keunggulan Jurusan", description: "Jelaskan keunggulan jurusan." },
      card2: { chip: "Prospek", title: "Prospek Lulusan", description: "Jelaskan prospek lulusan." },
    };
    setItems([...items, next]);
    setActiveId(id);
    setShowAddDialog(false);
    setNewName("");
    setNewFullName("");
    setAddError("");
  }

  function closeAddDialog() {
    setShowAddDialog(false);
    setNewName("");
    setNewFullName("");
    setAddError("");
  }

  async function deleteCurrent() {
    if (!current || items.length === 1) return;
    const next = items.filter((item) => item.id !== current.id);
    await save(next);
    setItems(next);
    setActiveId(next[0].id);
    setConfirmDelete(false);
  }

  async function removeCurrentImage() {
    if (!current) return;
    return removePersistedImage("jurusan", null, current, current.image);
  }

  return (
    <div>
      <ConfirmDialog
        open={confirmDelete}
        message={`Yakin ingin menghapus jurusan ${current?.name ?? "ini"}? Jurusan akan langsung dihapus dari website.`}
        onConfirm={deleteCurrent}
        onCancel={() => setConfirmDelete(false)}
      />
      {showAddDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onClick={closeAddDialog}
        >
          <form
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault();
              addJurusan();
            }}
          >
            <h2 className="text-lg font-extrabold text-slate-900">Tambah Jurusan</h2>
            <p className="mt-1 text-sm text-slate-500">
              Isi identitas jurusan. Alamat halaman dibuat otomatis.
            </p>
            <div className="mt-5 space-y-4">
              <Field label="Nama Singkat">
                <Input
                  autoFocus
                  value={newName}
                  onChange={(event) => {
                    setNewName(event.target.value);
                    setAddError("");
                  }}
                  placeholder="Contoh: MPLB"
                />
              </Field>
              <Field label="Nama Panjang">
                <Input
                  value={newFullName}
                  onChange={(event) => {
                    setNewFullName(event.target.value);
                    setAddError("");
                  }}
                  placeholder="Contoh: Manajemen Perkantoran dan Layanan Bisnis"
                />
              </Field>
            </div>
            {addError && (
              <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
                {addError}
              </p>
            )}
            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={closeAddDialog}>
                Batal
              </Button>
              <Button type="submit">Tambah</Button>
            </div>
          </form>
        </div>
      )}
      <PageHeader
        title="Jurusan"
        description="Kelola isi halaman jurusan dan tambahkan jurusan baru."
        right={<AddButton onClick={() => setShowAddDialog(true)}>Tambah Jurusan</AddButton>}
      />

      <div className="mb-4 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={`rounded-lg px-3 py-2.5 text-sm font-bold transition ${
              activeId === item.id
                ? "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {current && (
        <Panel
          title={current.fullName}
          description="Semua perubahan disimpan bersamaan dan tampil di website."
          action={
            <div className="flex gap-2">
              {items.length > 1 && (
                <Button variant="danger" onClick={() => setConfirmDelete(true)}>
                  Hapus
                </Button>
              )}
              <SaveButton onSave={save} />
            </div>
          }
        >
          <div className="grid gap-4">
            <Field label="Foto Hero Jurusan">
              <ImagePicker
                value={current.image}
                large
                onChange={(image) => updateCurrent({ ...current, image })}
                onRemove={removeCurrentImage}
              />
            </Field>
            <Field label="Nama Singkat">
              <Input
                value={current.name}
                onChange={(e) => updateCurrent({ ...current, name: e.target.value })}
              />
            </Field>
            <Field label="Nama Lengkap">
              <Input
                value={current.fullName}
                onChange={(e) => updateCurrent({ ...current, fullName: e.target.value })}
              />
            </Field>
            <Field label="Deskripsi Halaman">
              <Textarea
                value={current.description}
                onChange={(e) => updateCurrent({ ...current, description: e.target.value })}
              />
            </Field>
            <Field label="Judul Alasan">
              <Input
                value={current.whyTitle}
                onChange={(e) => updateCurrent({ ...current, whyTitle: e.target.value })}
              />
            </Field>
            <Field label="Isi Alasan">
              <Textarea
                value={current.whyText}
                onChange={(e) => updateCurrent({ ...current, whyText: e.target.value })}
              />
            </Field>
          </div>

          <div className="my-6 border-t border-slate-200" />

          <div>
            <div className="mb-3">
              <h3 className="text-sm font-extrabold text-slate-700">Keahlian</h3>
              <p className="mt-0.5 text-sm text-slate-500">{current.skills.length} keahlian terdaftar</p>
            </div>
            <StringListEditor
              key={current.id}
              value={current.skills}
              sortable={false}
              onChange={(skills) => updateCurrent({ ...current, skills })}
            />
          </div>

          <div className="my-6 border-t border-slate-200" />

          <div className="space-y-4">
            <CardEditor
              label="Kartu Keunggulan"
              value={current.card1}
              onChange={(card1) => updateCurrent({ ...current, card1 })}
              showLabel={false}
              showTitle={false}
            />
            <CardEditor
              label="Kartu Prospek"
              value={current.card2}
              onChange={(card2) => updateCurrent({ ...current, card2 })}
              showLabel={false}
              showTitle={false}
            />
          </div>
        </Panel>
      )}
    </div>
  );
}
