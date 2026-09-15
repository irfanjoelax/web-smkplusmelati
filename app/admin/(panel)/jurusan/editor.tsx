"use client";

import { useState } from "react";
import StringListEditor from "@/app/admin/components/StringListEditor";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { Field, Input, PageHeader, Panel, Textarea, SaveButton } from "@/app/admin/components/ui";
import type { JurusanCard, JurusanData } from "@/app/lib/types";
import { deletePersistedItem } from "@/app/admin/components/deleteContent";

function CardEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: JurusanCard;
  onChange: (next: JurusanCard) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="mb-3 text-sm font-extrabold text-slate-700">{label}</p>
      <div className="space-y-3">
        <Field label="Label">
          <Input value={value.chip} onChange={(e) => onChange({ ...value, chip: e.target.value })} />
        </Field>
        <Field label="Judul">
          <Input value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
        </Field>
        <Field label="Deskripsi">
          <Textarea value={value.description} onChange={(e) => onChange({ ...value, description: e.target.value })} />
        </Field>
      </div>
    </div>
  );
}

export default function JurusanEditor({ initial }: { initial: JurusanData }) {
  const [tkj, setTkj] = useState(initial.tkj);
  const [tataBoga, setTataBoga] = useState(initial.tataBoga);
  const [active, setActive] = useState<"tkj" | "tataBoga">("tkj");
  const { save } = useManualSave("jurusan", { tkj, tataBoga });

  const isTkj = active === "tkj";
  const current = isTkj ? tkj : tataBoga;

  return (
    <div>
      <PageHeader
        title="Jurusan"
        description="Kelola skill serta kartu keunggulan/sertifikasi dan prospek tiap jurusan."
      />

      <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
        <button
          type="button"
          onClick={() => setActive("tkj")}
          className={`rounded-lg px-3 py-2.5 text-sm font-bold transition ${
            isTkj
              ? "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          }`}
        >
          Teknik Komputer & Jaringan
        </button>
        <button
          type="button"
          onClick={() => setActive("tataBoga")}
          className={`rounded-lg px-3 py-2.5 text-sm font-bold transition ${
            !isTkj
              ? "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          }`}
        >
          Tata Boga
        </button>
      </div>

      <Panel
        title={isTkj ? "Teknik Komputer & Jaringan (TKJ)" : "Tata Boga"}
        description="Perubahan kedua jurusan disimpan bersamaan."
        action={<SaveButton onSave={save} />}
      >
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-extrabold text-slate-700">Keahlian</h3>
            <p className="mt-0.5 text-sm text-slate-500">
              {current.skills.length} keahlian terdaftar
            </p>
          </div>
          <StringListEditor
            key={active}
            value={current.skills}
            sortable={false}
            onChange={(skills) => isTkj
              ? setTkj({ ...tkj, skills })
              : setTataBoga({ ...tataBoga, skills })}
            onRemove={async (index, skills, persisted) => {
              if (persisted !== undefined) {
                await deletePersistedItem(
                  "jurusan",
                  isTkj ? "tkj.skills" : "tataBoga.skills",
                  persisted,
                  current.skills[index],
                );
              }
              if (isTkj) setTkj({ ...tkj, skills });
              else setTataBoga({ ...tataBoga, skills });
            }}
          />
        </div>

        <div className="my-6 border-t border-slate-200" />

        <div className="space-y-4">
            <CardEditor
              label={isTkj ? "Kartu Keunggulan" : "Kartu Keunggulan"}
              value={isTkj ? tkj.sertifikasi : tataBoga.keunggulan}
              onChange={(card) => isTkj
                ? setTkj({ ...tkj, sertifikasi: card })
                : setTataBoga({ ...tataBoga, keunggulan: card })}
            />
            <CardEditor
              label="Kartu Prospek"
              value={current.prospek}
              onChange={(prospek) => isTkj
                ? setTkj({ ...tkj, prospek })
                : setTataBoga({ ...tataBoga, prospek })}
            />
        </div>
      </Panel>
    </div>
  );
}
