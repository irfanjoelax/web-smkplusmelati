"use client";

import { useRef, useState } from "react";
import { Input, IconBtn, ConfirmDialog } from "./ui";
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "./icons";
import { getPersistedArrayItem } from "./deleteContent";

export default function StringListEditor({
  value,
  onChange,
  onRemove: onRemoveProp,
  placeholder = "Teks…",
}: {
  value: string[];
  onChange: (next: string[]) => void;
  onRemove?: (index: number, next: string[], persisted: string | undefined) => void | Promise<void>;
  placeholder?: string;
}) {
  const [confirmIdx, setConfirmIdx] = useState<number | null>(null);
  const snapshots = useRef<(string | undefined)[]>([...value]);

  function update(i: number, v: string) {
    const next = [...value];
    next[i] = v;
    onChange(next);
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    [snapshots.current[i], snapshots.current[j]] = [snapshots.current[j], snapshots.current[i]];
    onChange(next);
  }

  async function remove(i: number) {
    const next = value.filter((_, idx) => idx !== i);
    if (onRemoveProp) {
      await onRemoveProp(
        i,
        next,
        (getPersistedArrayItem(value, i) as string | undefined) ?? snapshots.current[i],
      );
    } else {
      onChange(next);
    }
    snapshots.current.splice(i, 1);
    setConfirmIdx(null);
  }

  return (
    <div className="space-y-2">
      <ConfirmDialog
        open={confirmIdx !== null}
        onConfirm={() => remove(confirmIdx!)}
        onCancel={() => setConfirmIdx(null)}
      />
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
          />
          <IconBtn label="Naikkan" onClick={() => move(i, -1)}>
            <ArrowUpIcon className="h-4 w-4" />
          </IconBtn>
          <IconBtn label="Turunkan" onClick={() => move(i, 1)}>
            <ArrowDownIcon className="h-4 w-4" />
          </IconBtn>
          <IconBtn label="Hapus" danger onClick={() => setConfirmIdx(i)}>
            <TrashIcon className="h-4 w-4" />
          </IconBtn>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          snapshots.current.push(undefined);
          onChange([...value, ""]);
        }}
        className="rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
      >
        + Tambah
      </button>
    </div>
  );
}
