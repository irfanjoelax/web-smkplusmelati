"use client";

import { useState, useEffect, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { PlusIcon } from "./icons";

export function ConfirmDialog({
  open,
  message = "Yakin ingin menghapus item ini?",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="mx-4 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="mb-1 text-base font-extrabold text-slate-900">Konfirmasi Hapus</h3>
        <p className="mb-6 text-sm text-slate-500">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

export function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${inputCls} min-h-24 resize-y ${props.className ?? ""}`}
    />
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger" | "ghost";
}) {
  const styles = {
    primary:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-md shadow-blue-600/20 hover:from-blue-600 hover:to-blue-800",
    danger: "bg-red-600 text-white shadow-sm hover:bg-red-700",
    ghost:
      "border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50",
  }[variant];
  return (
    <button
      {...props}
      className={`rounded-xl px-4 py-2 text-sm font-bold transition ${styles} ${className}`}
    />
  );
}

export function IconBtn({
  label,
  danger = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; danger?: boolean }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      {...props}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border shadow-sm transition active:scale-95 ${
        danger
          ? "border-red-200 bg-white text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600"
      } ${props.className ?? ""}`}
    />
  );
}

export function Panel({
  title,
  description,
  children,
  action,
  icon,
  className = "",
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-base font-extrabold text-slate-900">{title}</h2>
            {description && (
              <p className="mt-0.5 text-sm text-slate-500">{description}</p>
            )}
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function PageHeader({
  title,
  description,
  right,
}: {
  title: string;
  description?: string;
  right?: ReactNode;
}) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-[#0e5f9c] via-[#0b5c97] to-[#083f68] px-6 py-5 text-white shadow-lg shadow-blue-900/20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-amber-400" />
      <div className="relative flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold tracking-tight text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-0.5 text-sm text-white/70">{description}</p>
          )}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </div>
  );
}

export function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition hover:from-blue-600 hover:to-blue-800"
    >
      <PlusIcon className="h-3.5 w-3.5" />
      {children}
    </button>
  );
}

export function SaveButton({ onSave, className = "" }: { onSave: () => Promise<void>; className?: string }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isSaved) return;
    const t = setTimeout(() => setIsSaved(false), 2000);
    return () => clearTimeout(t);
  }, [isSaved]);

  const handleClick = async () => {
    if (isSaving) return;
    setIsSaving(true);
    setIsSaved(false);
    setHasError(false);
    try {
      await onSave();
      setIsSaved(true);
    } catch {
      setHasError(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isSaving}
      className={`rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition hover:from-blue-600 hover:to-blue-800 active:scale-[0.98] disabled:opacity-50 ${className}`}
    >
      {isSaving ? "Menyimpan..." : isSaved ? "Tersimpan" : hasError ? "Gagal, coba lagi" : "Simpan"}
    </button>
  );
}

export function Chip({
  children,
  tone = "blue",
  className = "",
}: {
  children: ReactNode;
  tone?: "blue" | "gold" | "slate" | "emerald";
  className?: string;
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    gold: "bg-amber-50 text-amber-700",
    slate: "bg-slate-100 text-slate-600",
    emerald: "bg-emerald-50 text-emerald-700",
  }[tone];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${tones} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatCard({
  icon,
  label,
  value,
  tone = "blue",
}: {
  icon: ReactNode;
  label: string;
  value: number | string;
  tone?: "blue" | "gold" | "emerald" | "violet" | "rose" | "cyan";
}) {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    gold: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    violet: "bg-violet-50 text-violet-600",
    rose: "bg-rose-50 text-rose-600",
    cyan: "bg-cyan-50 text-cyan-600",
  };
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-extrabold leading-none tracking-tight text-slate-900">
          {value}
        </p>
        <p className="mt-1 truncate text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}
