"use client";

import { useState } from "react";
import StringListEditor from "@/app/admin/components/StringListEditor";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { AddButton, Field, Input, PageHeader, Panel, Textarea, SaveButton } from "@/app/admin/components/ui";
import type { JurusanCard, JurusanData } from "@/app/lib/types";

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
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Chip / Label">
          <Input value={value.chip} onChange={(e) => onChange({ ...value, chip: e.target.value })} />
        </Field>
        <Field label="Judul">
          <Input value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
        </Field>
        <Field label="Deskripsi" className="sm:col-span-2">
          <Textarea value={value.description} onChange={(e) => onChange({ ...value, description: e.target.value })} />
        </Field>
      </div>
    </div>
  );
}

export default function JurusanEditor({ initial }: { initial: JurusanData }) {
  const [tkj, setTkj] = useState(initial.tkj);
  const [tataBoga, setTataBoga] = useState(initial.tataBoga);
  const { save } = useManualSave("jurusan", { tkj, tataBoga });

  return (
    <div>
      <PageHeader
        title="Jurusan"
        description="Kelola skill serta kartu keunggulan/sertifikasi dan prospek tiap jurusan."
      />

      <div className="space-y-6">
        <Panel
          title="Teknik Komputer & Jaringan (TKJ)"
          action={
            <SaveButton onSave={save} />
          }
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-extrabold text-slate-700">
                Keahlian ({tkj.skills.length})
              </p>
              <StringListEditor
                value={tkj.skills}
                onChange={(skills) => setTkj({ ...tkj, skills })}
              />
            </div>
            <div className="space-y-4">
              <CardEditor
                label="Kartu Keunggulan"
                value={tkj.sertifikasi}
                onChange={(sertifikasi) => setTkj({ ...tkj, sertifikasi })}
              />
              <CardEditor
                label="Kartu Prospek"
                value={tkj.prospek}
                onChange={(prospek) => setTkj({ ...tkj, prospek })}
              />
            </div>
          </div>
        </Panel>

        <Panel
          title="Tata Boga"
          action={
            <SaveButton onSave={save} />
          }
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-extrabold text-slate-700">
                Keahlian ({tataBoga.skills.length})
              </p>
              <StringListEditor
                value={tataBoga.skills}
                onChange={(skills) => setTataBoga({ ...tataBoga, skills })}
              />
            </div>
            <div className="space-y-4">
              <CardEditor
                label="Kartu Keunggulan"
                value={tataBoga.keunggulan}
                onChange={(keunggulan) => setTataBoga({ ...tataBoga, keunggulan })}
              />
              <CardEditor
                label="Kartu Prospek"
                value={tataBoga.prospek}
                onChange={(prospek) => setTataBoga({ ...tataBoga, prospek })}
              />
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}