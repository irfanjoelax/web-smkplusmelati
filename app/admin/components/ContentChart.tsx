"use client";

import { useEffect, useState, type CSSProperties } from "react";

export type ChartDatum = {
  label: string;
  count: number;
  color: string;
};

const SIZE = 140;
const RADIUS = 60;
const STROKE = 17;
const CIRC = 2 * Math.PI * RADIUS;
const GAP = 5;

export function CountUp({
  value,
  className,
  style,
}: {
  value: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    let raf = 0;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span className={className} style={style}>
      {display}
    </span>
  );
}

export function ContentChart({
  data,
  onSelect,
}: {
  data: ChartDatum[];
  onSelect?: (label: string) => void;
}) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  if (data.length === 0 || total === 0) {
    return (
      <div className="rounded-xl border border-slate-200/70 bg-white p-6 text-sm text-slate-500 shadow-sm">
        Belum ada data konten untuk ditampilkan.
      </div>
    );
  }

  const segments = data.reduce<
    (ChartDatum & { length: number; start: number })[]
  >((arr, d) => {
    const start =
      arr.length === 0 ? 0 : arr[arr.length - 1].start + arr[arr.length - 1].length;
    const length = (d.count / total) * CIRC;
    return [...arr, { ...d, length, start }];
  }, []);

  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-7">
      <div>
        <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-500">
          Statistik Konten
        </h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Jumlah item per kategori. Klik kategori untuk kelola.
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center gap-8 md:flex-row">
        <div className="relative h-48 w-48 shrink-0 sm:h-56 sm:w-56">
          <svg
            viewBox={`-10 -10 ${SIZE + 20} ${SIZE + 20}`}
            className="h-full w-full -rotate-90"
            role="img"
            aria-label={`Total ${total} item konten`}
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth={STROKE}
            />
            {segments.map((seg) => {
              const draw = Math.max(seg.length - GAP, 1);
              return (
                <circle
                  key={seg.label}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={STROKE}
                  strokeDasharray={`${draw} ${CIRC - draw}`}
                  strokeDashoffset={-seg.start}
                />
              );
            })}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tracking-tight text-slate-900">
              {total}
            </span>
            <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              item
            </span>
          </div>
        </div>

        <div className="w-full flex-1 space-y-1.5">
          {segments.map((seg) => (
            <button
              key={seg.label}
              type="button"
              onClick={() => onSelect?.(seg.label)}
              className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-100 px-2.5 py-1.5 text-left hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="truncate text-xs font-semibold text-slate-700">
                  {seg.label}
                </span>
              </span>
              <span className="shrink-0 text-sm font-extrabold text-slate-400">
                {seg.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
