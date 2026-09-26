"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import StringListEditor from "@/app/admin/components/StringListEditor";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { EditIcon, TrashIcon } from "@/app/admin/components/icons";
import {
  getPersistedSnapshot,
  removePersistedImage,
  tagPersistedItems,
} from "@/app/admin/components/deleteContent";
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
  const [imageEditor, setImageEditor] = useState<"hero" | number | null>(null);
  const { save } = useManualSave("jurusan", items);
  const activeIndex = items.findIndex((item) => item.id === activeId);
  const current = items[activeIndex];

  function updateCurrent(next: JurusanItem) {
    setItems(items.map((item, index) => (index === activeIndex ? next : item)));
  }

  function updatePracticeImage(index: number, image: string) {
    if (!current) return;
    const practiceImages = [...(current.practiceImages ?? [])];
    if (image) practiceImages[index] = { ...practiceImages[index], image };
    else practiceImages.splice(index, 1);
    updateCurrent({ ...current, practiceImages });
    if (!image) setImageEditor(null);
  }

  async function removePracticeImage(index: number) {
    if (!current) return;
    const image = current.practiceImages?.[index]?.image ?? "";
    const snapshot = getPersistedSnapshot(current) as { practiceImages?: unknown } | undefined;
    const persistedImages = Array.isArray(snapshot?.practiceImages)
      ? snapshot.practiceImages
      : [];
    const persistedImage = persistedImages.some(
      (activity) =>
        activity && typeof activity === "object" &&
        (activity as { image?: unknown }).image === image,
    );
    if (image && !persistedImage) {
      await fetch(`/api/admin/upload?cleanup=1&path=${encodeURIComponent(image)}`, {
        method: "DELETE",
      });
    }
    updatePracticeImage(index, "");
  }

  function updatePracticeTitle(index: number, title: string) {
    if (!current) return;
    const practiceImages = [...(current.practiceImages ?? [])];
    practiceImages[index] = { ...practiceImages[index], title };
    updateCurrent({ ...current, practiceImages });
  }

  async function saveItems() {
    const normalizedItems = items.map((item) => ({
      ...item,
      practiceImages: item.practiceImages ?? [],
    }));
    const previousImages = items.flatMap((item) => {
      const snapshot = getPersistedSnapshot(item) as { practiceImages?: unknown } | undefined;
      return Array.isArray(snapshot?.practiceImages)
        ? snapshot.practiceImages.flatMap((activity) => {
            if (typeof activity === "string") return [activity];
            if (!activity || typeof activity !== "object") return [];
            const image = (activity as { image?: unknown }).image;
            return typeof image === "string" ? [image] : [];
          })
        : [];
    });
    const currentImages = new Set(
      normalizedItems.flatMap((item) => item.practiceImages.map((activity) => activity.image)),
    );

    await save(normalizedItems);
    setItems(normalizedItems);
    await Promise.all(
      previousImages
        .filter((image) => !currentImages.has(image))
        .map((image) =>
          fetch(`/api/admin/upload?cleanup=1&path=${encodeURIComponent(image)}`, {
            method: "DELETE",
          }),
        ),
    );
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
      practiceImages: [],
      card1: { chip: "Keunggulan", title: "Keunggulan Jurusan", description: "Jelaskan keunggulan jurusan." },
      card2: { chip: "Prospek", title: "Prospek Lulusan", description: "Jelaskan prospek lulusan." },
    };
    setItems([...items, next]);
    setActiveId(id);
    setShowAddDialog(false);
    setNewName("");
    setNewFullName("");
    setAddError("");
    setImageEditor(null);
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

  async function removeHeroImage() {
    if (!current?.image) return;
    const cleanupUpload = await removeCurrentImage();
    if (cleanupUpload) {
      await fetch(`/api/admin/upload?cleanup=1&path=${encodeURIComponent(current.image)}`, {
        method: "DELETE",
      });
    }
    updateCurrent({ ...current, image: "" });
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
              <SaveButton onSave={saveItems} />
            </div>
          }
        >
          <div className="grid gap-4">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">Foto Hero Jurusan</p>
              {imageEditor === "hero" ? (
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-extrabold text-slate-700">Edit Foto Hero</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setImageEditor(null)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        Kembali
                      </button>
                      <SaveButton
                        onSave={async () => {
                          await saveItems();
                          setImageEditor(null);
                        }}
                      />
                    </div>
                  </div>
                  <ImagePicker
                    value={current.image}
                    large
                    onChange={(image) => updateCurrent({ ...current, image })}
                    onRemove={removeCurrentImage}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
                  {current.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={current.image} alt="" className="h-20 w-20 rounded-xl border border-slate-200 object-cover" />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center text-[0.65rem] text-slate-400">Tanpa foto</div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900">Foto Hero</p>
                    <p className="mt-0.5 text-sm text-slate-500">Gambar utama halaman jurusan.</p>
                  </div>
                  <div className="flex gap-1">
                    <IconBtn label="Edit foto hero" onClick={() => setImageEditor("hero")}><EditIcon className="h-4 w-4" /></IconBtn>
                    {current.image && <IconBtn label="Hapus foto hero" danger onClick={removeHeroImage}><TrashIcon className="h-4 w-4" /></IconBtn>}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-700">Galeri Kegiatan Praktik</h3>
                  <p className="mt-0.5 text-sm text-slate-500">{(current.practiceImages ?? []).length} foto terdaftar</p>
                </div>
                <AddButton
                  onClick={() => {
                    const index = (current.practiceImages ?? []).length;
                    updateCurrent({
                      ...current,
                      practiceImages: [
                        ...(current.practiceImages ?? []),
                        { image: "", title: "" },
                      ],
                    });
                    setImageEditor(index);
                  }}
                >
                  Tambah Foto
                </AddButton>
              </div>

              {typeof imageEditor === "number" ? (
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-extrabold text-slate-700">Foto Praktik {imageEditor + 1}</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            !current.practiceImages?.[imageEditor]?.image &&
                            !current.practiceImages?.[imageEditor]?.title.trim()
                          ) updatePracticeImage(imageEditor, "");
                          setImageEditor(null);
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        Kembali
                      </button>
                      <SaveButton
                        onSave={async () => {
                          await saveItems();
                          setImageEditor(null);
                        }}
                      />
                    </div>
                  </div>
                  <ImagePicker
                    value={current.practiceImages?.[imageEditor]?.image ?? ""}
                    large
                    onChange={(image) => updatePracticeImage(imageEditor, image)}
                    onRemove={() => removePracticeImage(imageEditor)}
                  />
                  <Field label="Nama Kegiatan" className="mt-4">
                    <Input
                      value={current.practiceImages?.[imageEditor]?.title ?? ""}
                      placeholder="Contoh: Praktik Instalasi Jaringan"
                      onChange={(event) => updatePracticeTitle(imageEditor, event.target.value)}
                    />
                  </Field>
                </div>
              ) : (current.practiceImages ?? []).length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(current.practiceImages ?? []).map((activity, index) => (
                    <div key={`${activity.image}-${index}`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                      {activity.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={activity.image} alt="" className="h-16 w-16 shrink-0 rounded-xl border border-slate-200 object-cover" />
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-[0.6rem] text-slate-400">Tanpa foto</div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-900">{activity.title || `Foto ${index + 1}`}</p>
                        <p className="truncate text-xs text-slate-500">Kegiatan praktik</p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <IconBtn label={`Edit foto praktik ${index + 1}`} onClick={() => setImageEditor(index)}><EditIcon className="h-4 w-4" /></IconBtn>
                        <IconBtn label={`Hapus foto praktik ${index + 1}`} danger onClick={() => removePracticeImage(index)}><TrashIcon className="h-4 w-4" /></IconBtn>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">Belum ada foto kegiatan praktik.</div>
              )}
            </div>

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
