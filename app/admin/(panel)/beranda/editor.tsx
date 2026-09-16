"use client";

import { useState, useMemo } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useManualSave } from "@/app/admin/components/useManualSave";
import {
  BuildingIcon,
  ImageIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
} from "@/app/admin/components/icons";
import {
  ConfirmDialog,
  IconBtn,
  PageHeader,
  SaveButton,
} from "@/app/admin/components/ui";
import type {
  Beranda,
  EkskulItem,
  EkskulPreview,
  FacilityPreview,
  FasilitasItem,
} from "@/app/lib/types";
import { deleteEditorItem } from "@/app/admin/components/deleteContent";

type DeleteTarget = {
  section: "ekskulPreview" | "facilities";
  index: number;
};

export default function BerandaEditor({
  initial,
  allEkskul = [],
  allFasilitas = [],
}: {
  initial: Beranda;
  allEkskul?: EkskulItem[];
  allFasilitas?: FasilitasItem[];
}) {
  const [heroImage, setHeroImage] = useState<string>(initial.heroImage || "/images/hero.jpg");
  const [ppdbImage, setPpdbImage] = useState<string>(initial.ppdbImage || "/images/hero.jpg");
  const [ekskulPreview, setEkskulPreview] = useState<EkskulPreview[]>(() => initial.ekskulPreview || []);
  const [facilities, setFacilities] = useState<FacilityPreview[]>(() => initial.facilities || []);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // State Checklist Multi-Select (Centang Banyak)
  const [checkedEkskul, setCheckedEkskul] = useState<string[]>([]);
  const [checkedFasilitas, setCheckedFasilitas] = useState<string[]>([]);
  const [showEkskulPicker, setShowEkskulPicker] = useState(false);
  const [showFasilitasPicker, setShowFasilitasPicker] = useState(false);

  // State Accordion
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    banners: false,
    ekskul: false,
    facilities: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToSection = (id: string, sectionKey: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionKey]: true }));
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const currentData: Beranda = useMemo(
    () => ({
      ...initial,
      heroImage,
      ppdbImage,
      ekskulPreview,
      facilities,
    }),
    [initial, heroImage, ppdbImage, ekskulPreview, facilities],
  );

  const { save } = useManualSave("beranda", currentData);

  const handleSaveAll = async () => {
    await save(currentData);
  };

  // Filter ekskul & fasilitas yang belum terpilih di beranda
  const availableEkskul = useMemo(() => {
    return allEkskul.filter((e) => {
      const eTitle = e.title.trim().toLowerCase();
      const eImg = e.image?.trim().toLowerCase();
      return !ekskulPreview.some((p) => {
        const pName = p.name.trim().toLowerCase();
        const pImg = p.image?.trim().toLowerCase();
        return (
          pName === eTitle ||
          (eTitle && pName && (eTitle.startsWith(pName) || pName.startsWith(eTitle))) ||
          (eImg && pImg && eImg === pImg)
        );
      });
    });
  }, [allEkskul, ekskulPreview]);

  const availableFasilitas = useMemo(() => {
    return allFasilitas.filter((f) => {
      const fTitle = f.title.trim().toLowerCase();
      const fImg = f.image?.trim().toLowerCase();
      return !facilities.some((p) => {
        const pName = p.name.trim().toLowerCase();
        const pImg = p.image?.trim().toLowerCase();
        return (
          pName === fTitle ||
          (fTitle && pName && (fTitle.startsWith(pName) || pName.startsWith(fTitle))) ||
          (fImg && pImg && fImg === pImg)
        );
      });
    });
  }, [allFasilitas, facilities]);

  // Sisa kuota slot yang bisa dipilih (maksimal 4)
  const remainingEkskulSlots = 4 - ekskulPreview.length;
  const remainingFasilitasSlots = 4 - facilities.length;

  // Toggle Centang Ekskul
  const handleToggleCheckEkskul = (title: string) => {
    if (checkedEkskul.includes(title)) {
      setCheckedEkskul(checkedEkskul.filter((t) => t !== title));
    } else {
      if (checkedEkskul.length < remainingEkskulSlots) {
        setCheckedEkskul([...checkedEkskul, title]);
      }
    }
  };

  // Toggle Centang Fasilitas
  const handleToggleCheckFasilitas = (title: string) => {
    if (checkedFasilitas.includes(title)) {
      setCheckedFasilitas(checkedFasilitas.filter((t) => t !== title));
    } else {
      if (checkedFasilitas.length < remainingFasilitasSlots) {
        setCheckedFasilitas([...checkedFasilitas, title]);
      }
    }
  };

  // Tambah Banyak Ekskul Tercentang Sekaligus (Auto Save)
  const handleAddMultipleEkskul = async () => {
    if (checkedEkskul.length === 0) return;
    const itemsToAdd = allEkskul
      .filter((e) => checkedEkskul.includes(e.title))
      .map((e) => ({
        name: e.title,
        href: "/ekskul",
        image: e.image || "/images/hero.jpg",
      }));

    const nextEkskul = [...ekskulPreview, ...itemsToAdd].slice(0, 4);
    const nextData: Beranda = {
      ...currentData,
      ekskulPreview: nextEkskul,
    };
    setEkskulPreview(nextEkskul);
    setCheckedEkskul([]);
    setShowEkskulPicker(false);
    await save(nextData);
  };

  // Tambah Banyak Fasilitas Tercentang Sekaligus (Auto Save)
  const handleAddMultipleFasilitas = async () => {
    if (checkedFasilitas.length === 0) return;
    const itemsToAdd = allFasilitas
      .filter((f) => checkedFasilitas.includes(f.title))
      .map((f) => ({
        name: f.title,
        image: f.image || "/images/hero.jpg",
      }));

    const nextFacilities = [...facilities, ...itemsToAdd].slice(0, 4);
    const nextData: Beranda = {
      ...currentData,
      facilities: nextFacilities,
    };
    setFacilities(nextFacilities);
    setCheckedFasilitas([]);
    setShowFasilitasPicker(false);
    await save(nextData);
  };

  async function remove() {
    if (!deleteTarget) return;
    const { section, index } = deleteTarget;
    const done = () => setDeleteTarget(null);

    if (section === "ekskulPreview") {
      const next = ekskulPreview.filter((_, i) => i !== index);
      await deleteEditorItem("beranda", section, ekskulPreview[index], async () => {
        setEkskulPreview(next);
        done();
        await save({ ...currentData, ekskulPreview: next });
      });
    } else if (section === "facilities") {
      const next = facilities.filter((_, i) => i !== index);
      await deleteEditorItem("beranda", section, facilities[index], async () => {
        setFacilities(next);
        done();
        await save({ ...currentData, facilities: next });
      });
    }
  }

  const navButtons = [
    { label: "Foto Banner", id: "section-banners", key: "banners", icon: ImageIcon },
    { label: "Ekstrakurikuler", id: "section-ekskul", key: "ekskul", icon: StarIcon },
    { label: "Fasilitas", id: "section-facilities", key: "facilities", icon: BuildingIcon },
  ];

  return (
    <div className="pb-24">
      <ConfirmDialog
        open={deleteTarget !== null}
        onConfirm={remove}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* 1. Header */}
      <PageHeader
        title="Pengaturan Beranda"  
        description="Atur foto banner, ekstrakurikuler, dan fasilitas yang ditampilkan pada halaman utama."
      />

      {/* 2. Navigasi Bagian & Tombol Simpan */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto">
          {navButtons.map((btn) => {
            const Icon = btn.icon;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => scrollToSection(btn.id, btn.key)}
                className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                <Icon className="h-4 w-4 text-slate-500" />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>
        <div className="shrink-0">
          <SaveButton onSave={handleSaveAll} />
        </div>
      </div>

      {/* 3. Tiga Section Accordion Utama */}
      <div className="space-y-4">
        {/* Section 1: Foto Banner Beranda */}
        <div
          id="section-banners"
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition"
        >
          <button
            type="button"
            onClick={() => toggleSection("banners")}
            className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-50 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Foto Banner Beranda
                </h2>
                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  Kelola foto banner utama di bagian atas dan foto ajakan SPMB di bagian bawah beranda.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 sm:inline-block">
                2 Foto
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-500">
                {openSections.banners ? "▲" : "▼"}
              </span>
            </div>
          </button>

          {openSections.banners && (
            <div className="border-t border-slate-100 p-5 sm:p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Kotak 1: Foto Banner Hero */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <h3 className="text-sm font-extrabold text-slate-800">
                    Foto Banner Utama (Hero / Atas)
                  </h3>
                  <p className="mt-0.5 mb-4 text-xs text-slate-500">
                    Tampil di sebelah sambutan pada bagian paling atas beranda.
                  </p>
                  <ImagePicker
                    value={heroImage}
                    large
                    onChange={(url) => setHeroImage(url)}
                    onRemove={() => setHeroImage("")}
                  />
                </div>

                {/* Kotak 2: Foto Banner SPMB */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <h3 className="text-sm font-extrabold text-slate-800">
                    Foto Banner SPMB (Bawah)
                  </h3>
                  <p className="mt-0.5 mb-4 text-xs text-slate-500">
                    Tampil pada panel ajakan pendaftaran di bagian bawah beranda.
                  </p>
                  <ImagePicker
                    value={ppdbImage}
                    large
                    onChange={(url) => setPpdbImage(url)}
                    onRemove={() => setPpdbImage("")}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Ekstrakurikuler di Beranda */}
        <div
          id="section-ekskul"
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition"
        >
          <button
            type="button"
            onClick={() => toggleSection("ekskul")}
            className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-50 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <StarIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Ekstrakurikuler di Beranda
                </h2>
                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  Pilih maksimal 4 ekstrakurikuler yang ditampilkan pada halaman utama.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  ekskulPreview.length >= 4
                    ? "bg-amber-100 text-amber-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {ekskulPreview.length} / 4 Terpilih
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-500">
                {openSections.ekskul ? "▲" : "▼"}
              </span>
            </div>
          </button>

          {openSections.ekskul && (
            <div className="border-t border-slate-100 p-5 sm:p-6">
              {/* Form Pemilih Centang (Multi-Select Checklist) */}
              {remainingEkskulSlots > 0 ? (
                <div className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-900">
                        + Pilih Ekstrakurikuler untuk Beranda
                      </p>
                      <p className="mt-0.5 text-xs text-slate-600">
                        Bisa centang hingga <strong className="text-indigo-700">{remainingEkskulSlots} ekskul</strong> sekaligus.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowEkskulPicker(!showEkskulPicker)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-3.5 py-2 text-xs font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
                    >
                      <span>{showEkskulPicker ? "Tutup Pilihan ▲" : "Buka Daftar Pilihan (Centang) ▼"}</span>
                    </button>
                  </div>

                  {showEkskulPicker && (
                    <div className="mt-4 border-t border-indigo-100 pt-4">
                      {availableEkskul.length === 0 ? (
                        <p className="text-xs text-slate-500">
                          Semua ekstrakurikuler yang terdaftar sudah dimasukkan ke beranda.
                        </p>
                      ) : (
                        <div>
                          <p className="mb-3 text-xs font-semibold text-slate-600">
                            Centang ekskul yang ingin ditambahkan: ({checkedEkskul.length} dari {remainingEkskulSlots} dipilih)
                          </p>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {availableEkskul.map((e) => {
                              const isChecked = checkedEkskul.includes(e.title);
                              const isDisabled = !isChecked && checkedEkskul.length >= remainingEkskulSlots;
                              return (
                                <label
                                  key={e.title}
                                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                                    isChecked
                                      ? "border-indigo-500 bg-white shadow-sm ring-2 ring-indigo-200"
                                      : isDisabled
                                      ? "cursor-not-allowed border-slate-200 bg-slate-100/60 opacity-50"
                                      : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    disabled={isDisabled}
                                    onChange={() => handleToggleCheckEkskul(e.title)}
                                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  {e.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={e.image}
                                      alt=""
                                      className="h-10 w-10 shrink-0 rounded-lg border border-slate-200 object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-[0.6rem] text-slate-400">
                                      Tanpa foto
                                    </div>
                                  )}
                                  <span className="min-w-0 flex-1 truncate text-xs font-bold text-slate-800">
                                    {e.title}
                                  </span>
                                </label>
                              );
                            })}
                          </div>

                          <div className="mt-4 flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => { setCheckedEkskul([]); setShowEkskulPicker(false); }}
                              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              disabled={checkedEkskul.length === 0}
                              onClick={handleAddMultipleEkskul}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:from-indigo-600 hover:to-indigo-800 disabled:opacity-40"
                            >
                              <PlusIcon className="h-4 w-4" />
                              <span>Masukkan ({checkedEkskul.length}) Ekskul Terpilih</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs font-bold text-amber-800">
                  ✓ Batas maksimal 4 ekstrakurikuler di beranda telah tercapai. Hapus salah satu jika ingin mengganti dengan yang lain.
                </div>
              )}

              {/* Daftar Ekskul yang Sedang Tampil di Beranda */}
              {ekskulPreview.length === 0 ? (
                <p className="py-6 text-center text-sm text-slate-400">
                  Belum ada ekstrakurikuler yang dipilih untuk beranda.
                </p>
              ) : (
                <div className="space-y-3">
                  {ekskulPreview.map((e, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-indigo-200 hover:shadow-sm"
                    >
                      {e.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={e.image}
                          alt=""
                          className="h-14 w-14 shrink-0 rounded-xl border border-slate-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-[0.65rem] text-slate-400">
                          Tanpa foto
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="mb-0.5 inline-block rounded bg-indigo-50 px-2 py-0.5 text-[0.65rem] font-bold text-indigo-700">
                          Posisi #{i + 1}
                        </span>
                        <p className="truncate font-bold text-slate-900">{e.name}</p>
                      </div>
                      <div className="flex shrink-0">
                        <IconBtn
                          label="Hapus"
                          danger
                          onClick={() =>
                            setDeleteTarget({ section: "ekskulPreview", index: i })
                          }
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconBtn>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 3: Fasilitas di Beranda */}
        <div
          id="section-facilities"
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition"
        >
          <button
            type="button"
            onClick={() => toggleSection("facilities")}
            className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-50 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <BuildingIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Fasilitas di Beranda
                </h2>
                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  Pilih maksimal 4 fasilitas yang ditampilkan pada halaman utama.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  facilities.length >= 4
                    ? "bg-amber-100 text-amber-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {facilities.length} / 4 Terpilih
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-500">
                {openSections.facilities ? "▲" : "▼"}
              </span>
            </div>
          </button>

          {openSections.facilities && (
            <div className="border-t border-slate-100 p-5 sm:p-6">
              {/* Form Pemilih Centang (Multi-Select Checklist) */}
              {remainingFasilitasSlots > 0 ? (
                <div className="mb-6 rounded-2xl border border-violet-100 bg-violet-50/40 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-violet-900">
                        + Pilih Fasilitas untuk Beranda
                      </p>
                      <p className="mt-0.5 text-xs text-slate-600">
                        Bisa centang hingga <strong className="text-violet-700">{remainingFasilitasSlots} fasilitas</strong> sekaligus.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowFasilitasPicker(!showFasilitasPicker)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-violet-200 bg-white px-3.5 py-2 text-xs font-bold text-violet-700 shadow-sm transition hover:bg-violet-50"
                    >
                      <span>{showFasilitasPicker ? "Tutup Pilihan ▲" : "Buka Daftar Pilihan (Centang) ▼"}</span>
                    </button>
                  </div>

                  {showFasilitasPicker && (
                    <div className="mt-4 border-t border-violet-100 pt-4">
                      {availableFasilitas.length === 0 ? (
                        <p className="text-xs text-slate-500">
                          Semua fasilitas yang terdaftar sudah dimasukkan ke beranda.
                        </p>
                      ) : (
                        <div>
                          <p className="mb-3 text-xs font-semibold text-slate-600">
                            Centang fasilitas yang ingin ditambahkan: ({checkedFasilitas.length} dari {remainingFasilitasSlots} dipilih)
                          </p>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {availableFasilitas.map((f) => {
                              const isChecked = checkedFasilitas.includes(f.title);
                              const isDisabled = !isChecked && checkedFasilitas.length >= remainingFasilitasSlots;
                              return (
                                <label
                                  key={f.title}
                                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                                    isChecked
                                      ? "border-violet-500 bg-white shadow-sm ring-2 ring-violet-200"
                                      : isDisabled
                                      ? "cursor-not-allowed border-slate-200 bg-slate-100/60 opacity-50"
                                      : "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50/50"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    disabled={isDisabled}
                                    onChange={() => handleToggleCheckFasilitas(f.title)}
                                    className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                  />
                                  {f.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={f.image}
                                      alt=""
                                      className="h-10 w-10 shrink-0 rounded-lg border border-slate-200 object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-[0.6rem] text-slate-400">
                                      Tanpa foto
                                    </div>
                                  )}
                                  <span className="min-w-0 flex-1 truncate text-xs font-bold text-slate-800">
                                    {f.title}
                                  </span>
                                </label>
                              );
                            })}
                          </div>

                          <div className="mt-4 flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => { setCheckedFasilitas([]); setShowFasilitasPicker(false); }}
                              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              disabled={checkedFasilitas.length === 0}
                              onClick={handleAddMultipleFasilitas}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-violet-500 to-violet-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:from-violet-600 hover:to-violet-800 disabled:opacity-40"
                            >
                              <PlusIcon className="h-4 w-4" />
                              <span>Masukkan ({checkedFasilitas.length}) Fasilitas Terpilih</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs font-bold text-amber-800">
                  ✓ Batas maksimal 4 fasilitas di beranda telah tercapai. Hapus salah satu jika ingin mengganti dengan yang lain.
                </div>
              )}

              {/* Daftar Fasilitas yang Sedang Tampil di Beranda */}
              {facilities.length === 0 ? (
                <p className="py-6 text-center text-sm text-slate-400">
                  Belum ada fasilitas yang dipilih untuk beranda.
                </p>
              ) : (
                <div className="space-y-3">
                  {facilities.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-violet-200 hover:shadow-sm"
                    >
                      {f.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={f.image}
                          alt=""
                          className="h-14 w-14 shrink-0 rounded-xl border border-slate-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-[0.65rem] text-slate-400">
                          Tanpa foto
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="mb-0.5 inline-block rounded bg-violet-50 px-2 py-0.5 text-[0.65rem] font-bold text-violet-700">
                          Posisi #{i + 1}
                        </span>
                        <p className="truncate font-bold text-slate-900">{f.name}</p>
                      </div>
                      <div className="flex shrink-0">
                        <IconBtn
                          label="Hapus"
                          danger
                          onClick={() =>
                            setDeleteTarget({ section: "facilities", index: i })
                          }
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconBtn>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
