"use client";

import { useState } from "react";
import StringListEditor from "@/app/admin/components/StringListEditor";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { Field, PageHeader, Panel, Textarea, SaveButton } from "@/app/admin/components/ui";
import type { VisiMisi } from "@/app/lib/types";
import { deletePersistedItem } from "@/app/admin/components/deleteContent";

export default function VisiMisiEditor({ initial }: { initial: VisiMisi }) {
  const [visi, setVisi] = useState(initial.visi);
  const [misi, setMisi] = useState<string[]>(initial.misi);
  const { save } = useManualSave("visiMisi", { visi, misi });

  return (
    <div>
      <PageHeader
        title="Visi & Misi"
        description="Teks visi (tanpa tanda kutip) dan daftar misi."
      />

      <Panel
        title="Visi & Misi"
        description="Kelola visi dan daftar misi sekolah dalam satu tempat."
        action={<SaveButton onSave={save} />}
      >
        <div>
          <h3 className="mb-3 text-sm font-extrabold text-slate-800">Visi</h3>
          <Field label="Teks Visi">
            <Textarea
              value={visi}
              onChange={(e) => setVisi(e.target.value)}
            />
          </Field>
        </div>

        <div className="my-6 border-t border-slate-200" />

        <div>
          <div className="mb-3">
            <h3 className="text-sm font-extrabold text-slate-800">Misi</h3>
            <p className="mt-0.5 text-sm text-slate-500">{misi.length} misi terdaftar</p>
          </div>
          <StringListEditor
            value={misi}
            onChange={setMisi}
            sortable={false}
            onRemove={async (index, next, persisted) => {
              if (persisted !== undefined) {
                await deletePersistedItem("visiMisi", "misi", persisted, misi[index]);
              }
              setMisi(next);
            }}
            placeholder="Tulis misi…"
          />
        </div>
      </Panel>
    </div>
  );
}
