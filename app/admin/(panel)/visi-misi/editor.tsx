"use client";

import { useState } from "react";
import StringListEditor from "@/app/admin/components/StringListEditor";
import { useAutoSave } from "@/app/admin/components/useAutoSave";
import { AddButton, Field, PageHeader, Panel, Textarea } from "@/app/admin/components/ui";
import type { VisiMisi } from "@/app/lib/types";

export default function VisiMisiEditor({ initial }: { initial: VisiMisi }) {
  const [visi, setVisi] = useState(initial.visi);
  const [misi, setMisi] = useState<string[]>(initial.misi);
  useAutoSave("visiMisi", { visi, misi });

  return (
    <div>
      <PageHeader
        title="Visi & Misi"
        description="Teks visi (tanpa tanda kutip) dan daftar misi."
      />

      <div className="space-y-6">
        <Panel title="Visi">
          <Field label="Teks Visi">
            <Textarea
              value={visi}
              onChange={(e) => setVisi(e.target.value)}
            />
          </Field>
        </Panel>

        <Panel
          title="Misi"
          description={`${misi.length} butir misi`}
          action={
            <AddButton onClick={() => setMisi([...misi, ""])}>
              Tambah Misi
            </AddButton>
          }
        >
          <StringListEditor
            value={misi}
            onChange={setMisi}
            placeholder="Tulis misi…"
          />
        </Panel>
      </div>
    </div>
  );
}