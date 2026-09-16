"use client";

interface Logo {
  src: string;
  alt: string;
}

export default function LogoMarquee({ logos }: { logos: Logo[] }) {
  if (!logos.length) return null;

  return (
    <div className="marquee-wrap overflow-hidden">
      <div className="marquee-track flex w-max items-center gap-16">
        {/* Duplicate for seamless loop. */}
        {[...logos, ...logos].map((l, i) => (
          <div
            key={i}
            className="flex h-24 w-44 shrink-0 items-center justify-center"
          >
            {l.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={l.src}
                alt={l.alt}
                className="max-h-20 max-w-40 object-contain"
                loading="lazy"
              />
            ) : (
              /* Placeholder kotak abu-abu. */
              <span className="flex h-20 w-40 items-center justify-center rounded-xl bg-foreground/10 text-xs font-bold text-foreground/30">
                {l.alt || "Logo"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
