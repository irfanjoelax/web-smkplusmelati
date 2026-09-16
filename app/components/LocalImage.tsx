import Image from "next/image";
import fs from "fs";
import path from "path";

export function imageExists(src: string): boolean {
  if (!src) return false;
  if (/^https?:\/\//.test(src)) return true;
  try {
    const filePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

export function imageSrc(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  try {
    const filePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
    const stat = fs.statSync(filePath);
    return `${src}?v=${stat.mtimeMs}`;
  } catch {
    return src;
  }
}

type LocalImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  placeholderClassName?: string;
};

export default function LocalImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholderClassName = "",
}: LocalImageProps) {
  if (!imageExists(src)) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-primary-soft/70 p-6 text-center ${placeholderClassName}`}
      >
        <svg
          className="h-10 w-10 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21zM15 8.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        <p className="text-sm font-bold text-primary">Foto segera hadir</p>
        <p className="text-xs text-foreground/60">
          Letakkan file pada{" "}
          <code className="rounded bg-white/60 px-1.5 py-0.5">public{src}</code>
        </p>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc(src)}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
