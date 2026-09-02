"use client";

import { useState } from "react";
import StringListEditor from "@/app/admin/components/StringListEditor";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { AddButton, Field, PageHeader, Panel, Textarea, SaveButton } from "@/app/admin/components/ui";
import type { VisiMisi } from "@/app/lib/types";

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

      <div className="space-y-6">
        <Panel
          title="Visi"
          action={
            <SaveButton onSave={save} />
          }
        >
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
            <SaveButton onSave={save} />
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