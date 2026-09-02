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

function lighten(hex: string, amt: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + amt);
  const g = Math.min(255, ((n >> 8) & 0xff) + amt);
  const b = Math.min(255, (n & 0xff) + amt);
  return `rgb(${r}, ${g}, ${b})`;
}

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
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

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

  const activeSeg = active !== null ? segments[active] : null;

  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-7">
      <div>
        <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-500">
          Statistik Konten
        </h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Jumlah item per kategori — hover untuk menyorot, klik untuk kelola.
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center gap-8 md:flex-row">
        <div className="relative h-48 w-48 shrink-0 sm:h-60 sm:w-60">
          <div
            className="pointer-events-none absolute -inset-6 rounded-full opacity-60 blur-2xl transition-all duration-500"
            style={{
              background: activeSeg
                ? `radial-gradient(circle, ${activeSeg.color}55, transparent 70%)`
                : "radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)",
            }}
          />
          <svg
            viewBox={`-10 -10 ${SIZE + 20} ${SIZE + 20}`}
            className="relative h-full w-full -rotate-90 [-webkit-tap-highlight-color:transparent]"
            onMouseLeave={() => setActive(null)}
          >
            <defs>
              {segments.map((seg, i) => (
                <linearGradient
                  key={seg.label}
                  id={`segGrad-${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={lighten(seg.color, 60)} />
                  <stop offset="100%" stopColor={seg.color} />
                </linearGradient>
              ))}
            </defs>
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth={STROKE}
            />
            {segments.map((seg, i) => {
              const isActive = active === i;
              const draw = Math.max(seg.length - GAP, 1);
              return (
                <circle
                  key={seg.label}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke={`url(#segGrad-${i})`}
                  strokeLinecap="round"
                  strokeWidth={isActive ? STROKE + 7 : STROKE}
                  strokeDasharray={
                    mounted ? `${draw} ${CIRC - draw}` : `0 ${CIRC}`
                  }
                  strokeDashoffset={-seg.start}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => onSelect?.(seg.label)}
                  className={`cursor-pointer outline-none ${
                    active !== null && !isActive ? "opacity-25" : ""
                  }`}
                  style={{
                    transition:
                      "stroke-dasharray 0.7s ease, stroke-width 0.25s ease, opacity 0.25s ease",
                    transitionDelay: `${i * 80}ms, 0ms, 0ms`,
                    filter: isActive
                      ? `drop-shadow(0 0 6px ${seg.color})`
                      : undefined,
                  }}
                />
              );
            })}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <CountUp
              value={activeSeg ? activeSeg.count : total}
              className="text-4xl font-extrabold tracking-tight"
              style={{ color: activeSeg ? activeSeg.color : "#0f172a" }}
            />
            <span
              className="mt-1 text-xs font-semibold uppercase tracking-wide"
              style={{ color: activeSeg ? activeSeg.color : "#94a3b8" }}
            >
              {activeSeg ? activeSeg.label : "item"}
            </span>
          </div>
        </div>

        <div className="w-full flex-1 space-y-1.5">
          {segments.map((seg, i) => {
            const isActive = active === i;
            const pct = total > 0 ? Math.round((seg.count / total) * 100) : 0;
            return (
              <button
                key={seg.label}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => onSelect?.(seg.label)}
                className={`flex w-full items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isActive
                    ? ""
                    : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                }`}
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "none" : "translateY(6px)",
                  transition:
                    "opacity 0.5s ease, transform 0.5s ease, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease",
                  transitionDelay: `${i * 80}ms`,
                  borderColor: isActive ? seg.color : undefined,
                  backgroundColor: isActive ? `${seg.color}14` : undefined,
                  boxShadow: isActive ? `0 2px 8px ${seg.color}33` : undefined,
                }}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span
                    className="truncate text-xs font-semibold text-slate-700"
                    style={{ color: isActive ? seg.color : undefined }}
                  >
                    {seg.label}
                  </span>
                </span>
                <span
                  className="shrink-0 text-sm font-extrabold"
                  style={{ color: isActive ? seg.color : "#94a3b8" }}
                >
                  {seg.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}