"use client";

import { Input, IconBtn } from "./ui";
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "./icons";

export default function StringListEditor({
  value,
  onChange,
  placeholder = "Teks…",
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
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
    onChange(next);
  }

  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-2">
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
          <IconBtn label="Hapus" danger onClick={() => remove(i)}>
            <TrashIcon className="h-4 w-4" />
          </IconBtn>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, ""])}
        className="rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
      >
        + Tambah
      </button>
    </div>
  );
}
