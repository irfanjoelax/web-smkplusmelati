"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import StringListEditor from "@/app/admin/components/StringListEditor";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { EditIcon, TrashIcon } from "@/app/admin/components/icons";
import {
  AddButton,
  ConfirmDialog,
  Field,
  IconBtn,
  Input,
  PageHeader,
  Panel,
  Textarea,
  SaveButton,
} from "@/app/admin/components/ui";
import type { ProgramCard, ProgramData } from "@/app/lib/types";
import {
  deleteEditorItem,
  deletePersistedItem,
  markPersistedContent,
  removePersistedImage,
  tagPersistedItems,
} from "@/app/admin/components/deleteContent";

type TabKey = "pelatihan" | "keagamaan" | "asrama";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function ProgramEditor({ initial }: { initial: ProgramData }) {
  const [tab, setTab] = useState<TabKey>("pelatihan");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const [pelatihanCards, setPelatihanCards] = useState<ProgramCard[]>(() =>
    tagPersistedItems(initial.pelatihan.cards),
  );
  const [pelatihanHarapan, setPelatihanHarapan] = useState<string[]>(
    initial.pelatihan.harapan,
  );

  const [keagamaanCards, setKeagamaanCards] = useState<ProgramCard[]>(() =>
    tagPersistedItems(initial.keagamaan.cards),
  );
  const [keagamaanPerayaanText, setKeagamaanPerayaanText] = useState<string>(
    initial.keagamaan.perayaanText,
  );

  const [asramaCards, setAsramaCards] = useState<ProgramCard[]>(() =>
    tagPersistedItems(initial.asrama.cards),
  );
  const [asramaJadwal, setAsramaJadwal] = useState<string[]>(
    initial.asrama.jadwal,
  );

  const data: ProgramData = {
    pelatihan: { cards: pelatihanCards, harapan: pelatihanHarapan },
    keagamaan: { cards: keagamaanCards, perayaanText: keagamaanPerayaanText },
    asrama: { cards: asramaCards, jadwal: asramaJadwal },
  };

  const { save } = useManualSave("program", data);

  // State untuk form tambah/edit card
  const [editingCardIdx, setEditingCardIdx] = useState<number | null>(null);
  const [draftCard, setDraftCard] = useState<ProgramCard | null>(null);
  const [confirmCardIdx, setConfirmCardIdx] = useState<number | null>(null);

  function addNewCard() {
    setEditingCardIdx(null);
    setDraftCard({ title: "", description: "", image: "" });
  }

  function editCard(i: number, cards: ProgramCard[]) {
    setEditingCardIdx(i);
    setDraftCard({ ...cards[i] });
  }

  function cancelCardEdit() {
    setEditingCardIdx(null);
    setDraftCard(null);
  }

  async function saveCardDraft() {
    if (!draftCard) return;

    if (tab === "pelatihan") {
      const next = editingCardIdx === null
        ? [...pelatihanCards, draftCard]
        : pelatihanCards.map((c, i) => (i === editingCardIdx ? draftCard : c));
      const nextData = { ...data, pelatihan: { ...data.pelatihan, cards: next } };
      await save(nextData);
      setPelatihanCards(next);
    } else if (tab === "keagamaan") {
      const next = editingCardIdx === null
        ? [...keagamaanCards, draftCard]
        : keagamaanCards.map((c, i) => (i === editingCardIdx ? draftCard : c));
      const nextData = { ...data, keagamaan: { ...data.keagamaan, cards: next } };
      await save(nextData);
      setKeagamaanCards(next);
    } else if (tab === "asrama") {
      const next = editingCardIdx === null
        ? [...asramaCards, draftCard]
        : asramaCards.map((c, i) => (i === editingCardIdx ? draftCard : c));
      const nextData = { ...data, asrama: { ...data.asrama, cards: next } };
      await save(nextData);
      setAsramaCards(next);
    }

    cancelCardEdit();
  }

  async function removeDraftImage() {
    if (!draftCard) return;
    const section =
      tab === "pelatihan"
        ? "pelatihan.cards"
        : tab === "keagamaan"
        ? "keagamaan.cards"
        : "asrama.cards";

    const removeCurrentUpload = await removePersistedImage(
      "program",
      section,
      draftCard,
      draftCard.image,
    );

    if (!removeCurrentUpload && editingCardIdx !== null) {
      if (tab === "pelatihan") {
        const next = [...pelatihanCards];
        next[editingCardIdx] = { ...next[editingCardIdx], image: "" };
        markPersistedContent(next[editingCardIdx]);
        setPelatihanCards(next);
      } else if (tab === "keagamaan") {
        const next = [...keagamaanCards];
        next[editingCardIdx] = { ...next[editingCardIdx], image: "" };
        markPersistedContent(next[editingCardIdx]);
        setKeagamaanCards(next);
      } else if (tab === "asrama") {
        const next = [...asramaCards];
        next[editingCardIdx] = { ...next[editingCardIdx], image: "" };
        markPersistedContent(next[editingCardIdx]);
        setAsramaCards(next);
      }
    }
    return removeCurrentUpload;
  }

  async function removeCard(i: number) {
    if (tab === "pelatihan") {
      await deleteEditorItem("program", "pelatihan.cards", pelatihanCards[i], () => {
        const next = pelatihanCards.filter((_, idx) => idx !== i);
        setPelatihanCards(next);
        setPage((cur) => Math.min(cur, Math.max(1, Math.ceil(next.length / pageSize))));
        setConfirmCardIdx(null);
      });
    } else if (tab === "keagamaan") {
      await deleteEditorItem("program", "keagamaan.cards", keagamaanCards[i], () => {
        const next = keagamaanCards.filter((_, idx) => idx !== i);
        setKeagamaanCards(next);
        setPage((cur) => Math.min(cur, Math.max(1, Math.ceil(next.length / pageSize))));
        setConfirmCardIdx(null);
      });
    } else if (tab === "asrama") {
      await deleteEditorItem("program", "asrama.cards", asramaCards[i], () => {
        const next = asramaCards.filter((_, idx) => idx !== i);
        setAsramaCards(next);
        setPage((cur) => Math.min(cur, Math.max(1, Math.ceil(next.length / pageSize))));
        setConfirmCardIdx(null);
      });
    }
  }

  const currentCards =
    tab === "pelatihan"
      ? pelatihanCards
      : tab === "keagamaan"
      ? keagamaanCards
      : asramaCards;

  const totalPages = Math.max(1, Math.ceil(currentCards.length / pageSize));
  const visibleCards = currentCards
    .map((card, index) => ({ card, index }))
    .slice((page - 1) * pageSize, page * pageSize);

  if (draftCard) {
    return (
      <div>
        <PageHeader
          title={
            editingCardIdx === null
              ? `Tambah Kegiatan ${tab === "pelatihan" ? "Pelatihan" : tab === "keagamaan" ? "Keagamaan" : "Asrama"}`
              : `Edit Kegiatan ${tab === "pelatihan" ? "Pelatihan" : tab === "keagamaan" ? "Keagamaan" : "Asrama"}`
          }
          description={editingCardIdx === null ? "Tambahkan data kegiatan baru." : draftCard.title || "Perbarui data kegiatan."}
        />
        <Panel
          title={editingCardIdx === null ? "Kegiatan Baru" : draftCard.title || "Edit Kegiatan"}
          description="Pilih foto, lalu isi judul dan deskripsi kegiatan."
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={cancelCardEdit}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                ← Kembali
              </button>
              <SaveButton onSave={saveCardDraft} />
            </div>
          }
        >
          <div className="space-y-6">
            <ImagePicker
              value={draftCard.image}
              large
              onChange={(image) => setDraftCard({ ...draftCard, image })}
              onRemove={removeDraftImage}
            />
            <div className="space-y-4">
              <Field label="Judul Kegiatan">
                <Input
                  value={draftCard.title}
                  placeholder="Masukkan judul kegiatan"
                  onChange={(event) => setDraftCard({ ...draftCard, title: event.target.value })}
                />
              </Field>
              <Field label="Deskripsi">
                <Textarea
                  value={draftCard.description}
                  placeholder="Masukkan deskripsi kegiatan"
                  onChange={(event) => setDraftCard({ ...draftCard, description: event.target.value })}
                />
              </Field>
            </div>
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <div>
      <ConfirmDialog
        open={confirmCardIdx !== null}
        onConfirm={() => removeCard(confirmCardIdx!)}
        onCancel={() => setConfirmCardIdx(null)}
      />
      <PageHeader
        title="Program Unggulan"
        description="Kelola kegiatan Program Pelatihan, Program Keagamaan, dan Program Asrama."
      />

      {/* Navigasi Tab */}
      <div className="mb-6 grid grid-cols-3 gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
        <button
          type="button"
          onClick={() => { setTab("pelatihan"); setPage(1); cancelCardEdit(); }}
          className={`rounded-lg px-3 py-2.5 text-xs font-bold transition sm:text-sm ${
            tab === "pelatihan"
              ? "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          }`}
        >
          Program Pelatihan
        </button>
        <button
          type="button"
          onClick={() => { setTab("keagamaan"); setPage(1); cancelCardEdit(); }}
          className={`rounded-lg px-3 py-2.5 text-xs font-bold transition sm:text-sm ${
            tab === "keagamaan"
              ? "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          }`}
        >
          Program Keagamaan
        </button>
        <button
          type="button"
          onClick={() => { setTab("asrama"); setPage(1); cancelCardEdit(); }}
          className={`rounded-lg px-3 py-2.5 text-xs font-bold transition sm:text-sm ${
            tab === "asrama"
              ? "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          }`}
        >
          Program Asrama
        </button>
      </div>

      {/* Konten Tab Pelatihan */}
      {tab === "pelatihan" && (
        <div className="space-y-6">
          <Panel
            title="Kartu Kegiatan Pelatihan"
            description={`${pelatihanCards.length} kegiatan terdaftar`}
            action={
              <div className="flex items-center gap-2">
                <label htmlFor="pelatihan-page-size" className="sr-only">Jumlah kegiatan per halaman</label>
                <select
                  id="pelatihan-page-size"
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
                <AddButton onClick={addNewCard}>Tambah</AddButton>
              </div>
            }
          >
            {pelatihanCards.length === 0 ? (
              <p className="rounded-xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                Belum ada kegiatan pelatihan. Klik Tambah untuk mulai.
              </p>
            ) : (
              <div className="space-y-3">
                {visibleCards.map(({ card, index }) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
                  >
                    {card.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.image}
                        alt=""
                        className="h-18 w-18 shrink-0 rounded-xl border border-slate-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-[0.65rem] text-slate-400">
                        Tanpa foto
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-slate-900">{card.title || "Tanpa judul"}</p>
                      <p className="mt-0.5 line-clamp-2 text-sm text-slate-500">{card.description || "Deskripsi belum diisi"}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <IconBtn label={`Edit ${card.title || "kegiatan"}`} onClick={() => editCard(index, pelatihanCards)}>
                        <EditIcon className="h-4 w-4" />
                      </IconBtn>
                      <IconBtn label={`Hapus ${card.title || "kegiatan"}`} danger onClick={() => setConfirmCardIdx(index)}>
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

          <Panel
            title="Catatan Harapan Program"
            description="Teks harapan yang tampil di bawah kartu pelatihan pada halaman publik"
            action={<SaveButton onSave={save} />}
          >
            <StringListEditor
              value={pelatihanHarapan}
              onChange={setPelatihanHarapan}
              sortable={false}
              placeholder="Tulis paragraf catatan harapan…"
              onRemove={async (index, next, persisted) => {
                if (persisted !== undefined) {
                  await deletePersistedItem(
                    "program",
                    "pelatihan.harapan",
                    persisted,
                    pelatihanHarapan[index],
                  );
                }
                setPelatihanHarapan(next);
              }}
            />
          </Panel>
        </div>
      )}

      {/* Konten Tab Keagamaan */}
      {tab === "keagamaan" && (
        <div className="space-y-6">
          <Panel
            title="Kartu Kegiatan Keagamaan"
            description={`${keagamaanCards.length} kegiatan terdaftar`}
            action={
              <div className="flex items-center gap-2">
                <label htmlFor="keagamaan-page-size" className="sr-only">Jumlah kegiatan per halaman</label>
                <select
                  id="keagamaan-page-size"
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
                <AddButton onClick={addNewCard}>Tambah</AddButton>
              </div>
            }
          >
            {keagamaanCards.length === 0 ? (
              <p className="rounded-xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                Belum ada kegiatan keagamaan. Klik Tambah untuk mulai.
              </p>
            ) : (
              <div className="space-y-3">
                {visibleCards.map(({ card, index }) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
                  >
                    {card.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.image}
                        alt=""
                        className="h-18 w-18 shrink-0 rounded-xl border border-slate-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-[0.65rem] text-slate-400">
                        Tanpa foto
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-slate-900">{card.title || "Tanpa judul"}</p>
                      <p className="mt-0.5 line-clamp-2 text-sm text-slate-500">{card.description || "Deskripsi belum diisi"}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <IconBtn label={`Edit ${card.title || "kegiatan"}`} onClick={() => editCard(index, keagamaanCards)}>
                        <EditIcon className="h-4 w-4" />
                      </IconBtn>
                      <IconBtn label={`Hapus ${card.title || "kegiatan"}`} danger onClick={() => setConfirmCardIdx(index)}>
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

          <Panel
            title="Perayaan Hari Besar"
            description="Teks penjelasan kegiatan perayaan hari besar keagamaan"
            action={<SaveButton onSave={save} />}
          >
            <Field label="Deskripsi Perayaan">
              <Textarea
                value={keagamaanPerayaanText}
                onChange={(e) => setKeagamaanPerayaanText(e.target.value)}
                placeholder="Tuliskan penjelasan kegiatan perayaan hari besar..."
              />
            </Field>
          </Panel>
        </div>
      )}

      {/* Konten Tab Asrama */}
      {tab === "asrama" && (
        <div className="space-y-6">
          <Panel
            title="Kartu Kegiatan Asrama"
            description={`${asramaCards.length} kegiatan terdaftar`}
            action={
              <div className="flex items-center gap-2">
                <label htmlFor="asrama-page-size" className="sr-only">Jumlah kegiatan per halaman</label>
                <select
                  id="asrama-page-size"
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
                <AddButton onClick={addNewCard}>Tambah</AddButton>
              </div>
            }
          >
            {asramaCards.length === 0 ? (
              <p className="rounded-xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                Belum ada kegiatan asrama. Klik Tambah untuk mulai.
              </p>
            ) : (
              <div className="space-y-3">
                {visibleCards.map(({ card, index }) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
                  >
                    {card.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.image}
                        alt=""
                        className="h-18 w-18 shrink-0 rounded-xl border border-slate-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-[0.65rem] text-slate-400">
                        Tanpa foto
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-slate-900">{card.title || "Tanpa judul"}</p>
                      <p className="mt-0.5 line-clamp-2 text-sm text-slate-500">{card.description || "Deskripsi belum diisi"}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <IconBtn label={`Edit ${card.title || "kegiatan"}`} onClick={() => editCard(index, asramaCards)}>
                        <EditIcon className="h-4 w-4" />
                      </IconBtn>
                      <IconBtn label={`Hapus ${card.title || "kegiatan"}`} danger onClick={() => setConfirmCardIdx(index)}>
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

          <Panel
            title="Rutinitas Harian Asrama"
            description={`${asramaJadwal.length} jadwal terdaftar`}
            action={<SaveButton onSave={save} />}
          >
            <StringListEditor
              value={asramaJadwal}
              onChange={setAsramaJadwal}
              sortable={false}
              placeholder="Contoh: Bangun Pukul 04.00 WITA"
              onRemove={async (index, next, persisted) => {
                if (persisted !== undefined) {
                  await deletePersistedItem(
                    "program",
                    "asrama.jadwal",
                    persisted,
                    asramaJadwal[index],
                  );
                }
                setAsramaJadwal(next);
              }}
            />
          </Panel>
        </div>
      )}
    </div>
  );
}
