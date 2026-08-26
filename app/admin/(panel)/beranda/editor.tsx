"use client";

import { useState } from "react";
import ImagePicker from "@/app/admin/components/ImagePicker";
import { useManualSave } from "@/app/admin/components/useManualSave";
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@/app/admin/components/icons";
import {
  AddButton,
  Field,
  IconBtn,
  Input,
  PageHeader,
  Panel,
  Textarea,
  SaveButton,
} from "@/app/admin/components/ui";
import type {
  Beranda,
  EkskulPreview,
  FacilityPreview,
  IconKey,
  Major,
  ProgramItem,
  Stat,
} from "@/app/lib/types";

const ICON_KEYS: IconKey[] = [
  "network",
  "chef",
  "training",
  "dormitory",
  "religion",
  "award",
];

function MoveDelete({
  i,
  onMove,
  onRemove,
}: {
  i: number;
  onMove: (i: number, dir: -1 | 1) => void;
  onRemove: (i: number) => void;
}) {
  return (
    <div className="flex shrink-0 gap-1">
      <IconBtn label="Naikkan" onClick={() => onMove(i, -1)}>
        <ArrowUpIcon className="h-4 w-4" />
      </IconBtn>
      <IconBtn label="Turunkan" onClick={() => onMove(i, 1)}>
        <ArrowDownIcon className="h-4 w-4" />
      </IconBtn>
      <IconBtn label="Hapus" danger onClick={() => onRemove(i)}>
        <TrashIcon className="h-4 w-4" />
      </IconBtn>
    </div>
  );
}

export default function BerandaEditor({ initial }: { initial: Beranda }) {
  const [stats, setStats] = useState<Stat[]>(initial.stats);
  const [majors, setMajors] = useState<Major[]>(initial.majors);
  const [programs, setPrograms] = useState<ProgramItem[]>(initial.programs);
  const [ekskulPreview, setEkskulPreview] = useState<EkskulPreview[]>(initial.ekskulPreview);
  const [facilities, setFacilities] = useState<FacilityPreview[]>(initial.facilities);

  const data: Beranda = { stats, majors, programs, ekskulPreview, facilities };
  const { save } = useManualSave("beranda", data);

  return (
    <div>
      <PageHeader
        title="Beranda"
        description="Statistik, jurusan, program, pratinjau ekskul, dan pratinjau fasilitas."
      />

      <div className="space-y-6">
        <Panel
          title="Statistik"
          description="Angka besar di bagian tengah beranda"
          action={
            <div className="flex items-center gap-2">
              <SaveButton onSave={save} />
              <AddButton
                onClick={() => setStats([...stats, { value: 0, suffix: "", label: "" }])}
              >
                Tambah
              </AddButton>
            </div>
          }
        >
          <div className="space-y-3">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 p-3">
                <Field label="Angka" className="w-24">
                  <Input
                    type="number"
                    value={s.value}
                    onChange={(e) => {
                      const next = [...stats];
                      next[i] = { ...s, value: Number(e.target.value) };
                      setStats(next);
                    }}
                  />
                </Field>
                <Field label="Sufiks" className="w-20">
                  <Input
                    value={s.suffix}
                    onChange={(e) => {
                      const next = [...stats];
                      next[i] = { ...s, suffix: e.target.value };
                      setStats(next);
                    }}
                  />
                </Field>
                <div className="min-w-0 flex-1">
                  <Field label="Label">
                    <Input
                      value={s.label}
                      onChange={(e) => {
                        const next = [...stats];
                        next[i] = { ...s, label: e.target.value };
                        setStats(next);
                      }}
                    />
                  </Field>
                </div>
                <MoveDelete i={i} onMove={(idx, d) => {
                  const j = idx + d;
                  if (j < 0 || j >= stats.length) return;
                  const next = [...stats];
                  [next[idx], next[j]] = [next[j], next[idx]];
                  setStats(next);
                }} onRemove={(idx) => {
                  const next = stats.filter((_, x) => x !== idx);
                  setStats(next);
                }} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Jurusan"
          description="Dua kartu bidang keahlian"
          action={
            <div className="flex items-center gap-2">
              <SaveButton onSave={save} />
              <AddButton
                onClick={() =>
                  setMajors([...majors, { id: "", title: "", full: "", desc: "", href: "/jurusan", icon: "network" }])
                }
              >
                Tambah
              </AddButton>
            </div>
          }
        >
          <div className="space-y-4">
            {majors.map((m, i) => (
              <div key={i} className="flex flex-wrap items-start gap-4 rounded-xl border border-slate-200 p-4">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field label="Judul Singkat">
                      <Input value={m.title} onChange={(e) => { const n = [...majors]; n[i] = { ...m, title: e.target.value }; setMajors(n); }} />
                    </Field>
                    <Field label="Judul Lengkap">
                      <Input value={m.full} onChange={(e) => { const n = [...majors]; n[i] = { ...m, full: e.target.value }; setMajors(n); }} />
                    </Field>
                    <Field label="Icon">
                      <select
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-400"
                        value={m.icon}
                        onChange={(e) => { const n = [...majors]; n[i] = { ...m, icon: e.target.value as IconKey }; setMajors(n); }}
                      >
                        {ICON_KEYS.map((k) => (
                          <option key={k} value={k}>{k}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Deskripsi">
                    <Textarea value={m.desc} onChange={(e) => { const n = [...majors]; n[i] = { ...m, desc: e.target.value }; setMajors(n); }} />
                  </Field>
                  <Field label="Tautan (href)">
                    <Input value={m.href} onChange={(e) => { const n = [...majors]; n[i] = { ...m, href: e.target.value }; setMajors(n); }} />
                  </Field>
                </div>
                <MoveDelete i={i} onMove={(idx, d) => {
                  const j = idx + d;
                  if (j < 0 || j >= majors.length) return;
                  const n = [...majors];
                  [n[idx], n[j]] = [n[j], n[idx]];
                  setMajors(n);
                }} onRemove={(idx) => {
                  const next = majors.filter((_, x) => x !== idx);
                  setMajors(next);
                }} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Program"
          description="Empat kartu program unggulan"
          action={
            <div className="flex items-center gap-2">
              <SaveButton onSave={save} />
              <AddButton
                onClick={() =>
                  setPrograms([...programs, { id: "", title: "", desc: "", href: "/program-pelatihan", icon: "training" }])
                }
              >
                Tambah
              </AddButton>
            </div>
          }
        >
          <div className="space-y-4">
            {programs.map((p, i) => (
              <div key={i} className="flex flex-wrap items-start gap-4 rounded-xl border border-slate-200 p-4">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field label="Judul">
                      <Input value={p.title} onChange={(e) => { const n = [...programs]; n[i] = { ...p, title: e.target.value }; setPrograms(n); }} />
                    </Field>
                    <Field label="Tautan (href)">
                      <Input value={p.href} onChange={(e) => { const n = [...programs]; n[i] = { ...p, href: e.target.value }; setPrograms(n); }} />
                    </Field>
                    <Field label="Icon">
                      <select
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-400"
                        value={p.icon}
                        onChange={(e) => { const n = [...programs]; n[i] = { ...p, icon: e.target.value as IconKey }; setPrograms(n); }}
                      >
                        {ICON_KEYS.map((k) => (
                          <option key={k} value={k}>{k}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Deskripsi">
                    <Textarea value={p.desc} onChange={(e) => { const n = [...programs]; n[i] = { ...p, desc: e.target.value }; setPrograms(n); }} />
                  </Field>
                </div>
                <MoveDelete i={i} onMove={(idx, d) => {
                  const j = idx + d;
                  if (j < 0 || j >= programs.length) return;
                  const n = [...programs];
                  [n[idx], n[j]] = [n[j], n[idx]];
                  setPrograms(n);
                }} onRemove={(idx) => {
                  const next = programs.filter((_, x) => x !== idx);
                  setPrograms(next);
                }} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Pratinjau Ekskul"
          description="Empat ekskul yang tampil di beranda"
          action={
            <div className="flex items-center gap-2">
              <SaveButton onSave={save} />
              <AddButton
                onClick={() => setEkskulPreview([...ekskulPreview, { name: "", href: "/ekskul", image: "" }])}
              >
                Tambah
              </AddButton>
            </div>
          }
        >
          <div className="space-y-4">
            {ekskulPreview.map((e, i) => (
              <div key={i} className="flex flex-wrap items-start gap-4 rounded-xl border border-slate-200 p-4">
                <ImagePicker
                  value={e.image}
                  onChange={(url) => { const n = [...ekskulPreview]; n[i] = { ...e, image: url }; setEkskulPreview(n); }}
                />
                <div className="min-w-0 flex-1 space-y-3">
                  <Field label="Nama">
                    <Input value={e.name} onChange={(ev) => { const n = [...ekskulPreview]; n[i] = { ...e, name: ev.target.value }; setEkskulPreview(n); }} />
                  </Field>
                  <Field label="Tautan (href)">
                    <Input value={e.href} onChange={(ev) => { const n = [...ekskulPreview]; n[i] = { ...e, href: ev.target.value }; setEkskulPreview(n); }} />
                  </Field>
                </div>
                <MoveDelete i={i} onMove={(idx, d) => {
                  const j = idx + d;
                  if (j < 0 || j >= ekskulPreview.length) return;
                  const n = [...ekskulPreview];
                  [n[idx], n[j]] = [n[j], n[idx]];
                  setEkskulPreview(n);
                }} onRemove={(idx) => {
                  const next = ekskulPreview.filter((_, x) => x !== idx);
                  setEkskulPreview(next);
                }} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Pratinjau Fasilitas"
          description="Empat fasilitas yang tampil di beranda"
          action={
            <div className="flex items-center gap-2">
              <SaveButton onSave={save} />
              <AddButton
                onClick={() => setFacilities([...facilities, { name: "", image: "" }])}
              >
                Tambah
              </AddButton>
            </div>
          }
        >
          <div className="space-y-4">
            {facilities.map((f, i) => (
              <div key={i} className="flex flex-wrap items-start gap-4 rounded-xl border border-slate-200 p-4">
                <ImagePicker
                  value={f.image}
                  onChange={(url) => { const n = [...facilities]; n[i] = { ...f, image: url }; setFacilities(n); }}
                />
                <div className="min-w-0 flex-1">
                  <Field label="Nama">
                    <Input value={f.name} onChange={(ev) => { const n = [...facilities]; n[i] = { ...f, name: ev.target.value }; setFacilities(n); }} />
                  </Field>
                </div>
                <MoveDelete i={i} onMove={(idx, d) => {
                  const j = idx + d;
                  if (j < 0 || j >= facilities.length) return;
                  const n = [...facilities];
                  [n[idx], n[j]] = [n[j], n[idx]];
                  setFacilities(n);
                }} onRemove={(idx) => {
                  const next = facilities.filter((_, x) => x !== idx);
                  setFacilities(next);
                }} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}