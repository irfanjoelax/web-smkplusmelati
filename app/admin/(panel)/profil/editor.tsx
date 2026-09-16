"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { EditIcon } from "@/app/admin/components/icons";
import {
  IconBtn,
  PageHeader,
  Panel,
  SaveButton,
} from "@/app/admin/components/ui";
import type { ProfilData } from "@/app/lib/types";

type PhotoKey = "image1" | "image2";

const PHOTO_ITEMS: { key: PhotoKey; title: string; desc: string }[] = [
  {
    key: "image1",
    title: "Foto Kegiatan 1 (Profil Singkat / Atas)",
    desc: "Tampil di sebelah narasi profil singkat pada bagian atas halaman profil.",
  },
  {
    key: "image2",
    title: "Foto Kegiatan 2 (Sorotan Penutup / Bawah)",
    desc: "Tampil pada kartu sorotan di bagian paling bawah halaman profil.",
  },
];

export default function ProfilEditor({ initial }: { initial: ProfilData }) {
  const [image1, setImage1] = useState(initial.image1 || "/images/profil-1.jpg");
  const [image2, setImage2] = useState(initial.image2 || "/images/profil-2.jpg");

  const [editingKey, setEditingKey] = useState<PhotoKey | null>(null);
  const [draftUrl, setDraftUrl] = useState<string>("");

  const data: ProfilData = {
    ...initial,
    image1,
    image2,
  };

  const { save } = useManualSave("profil", data);

  function edit(key: PhotoKey) {
    setEditingKey(key);
    setDraftUrl(key === "image1" ? image1 : image2);
  }

  function cancelEdit() {
    setEditingKey(null);
    setDraftUrl("");
  }

  async function saveDraft() {
    if (!editingKey) return;
    const nextData = {
      ...data,
      [editingKey]: draftUrl,
    };
    await save(nextData);
    if (editingKey === "image1") setImage1(draftUrl);
    if (editingKey === "image2") setImage2(draftUrl);
    cancelEdit();
  }

  if (editingKey) {
    const activeItem = PHOTO_ITEMS.find((p) => p.key === editingKey);
    return (
      <div>
        <PageHeader
          title="Edit Foto Profil"
          description={activeItem?.title || "Perbarui foto kegiatan."}
        />
        <Panel
          title={activeItem?.title || "Edit Foto"}
          description={activeItem?.desc}
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
              value={draftUrl}
              large
              onChange={(url) => setDraftUrl(url)}
              onRemove={() => setDraftUrl("")}
            />
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Profil Sekolah"
        description="Kelola foto kegiatan yang ditampilkan pada halaman profil website."
      />

      <Panel
        title="Foto Profil Sekolah"
        description="2 foto kegiatan terdaftar"
      >
        <div className="space-y-3">
          {PHOTO_ITEMS.map((item) => {
            const currentImg = item.key === "image1" ? image1 : image2;
            return (
              <div
                key={item.key}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
              >
                {currentImg ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentImg}
                    alt=""
                    className="h-18 w-18 shrink-0 rounded-xl border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-[0.65rem] text-slate-400">
                    Tanpa foto
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-900">{item.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-sm text-slate-500">{item.desc}</p>
                </div>
                <div className="flex shrink-0">
                  <IconBtn label={`Edit ${item.title}`} onClick={() => edit(item.key)}>
                    <EditIcon className="h-4 w-4" />
                  </IconBtn>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
