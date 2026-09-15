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
        {/* duplicate for seamless loop */}
        {[...logos, ...logos].map((l, i) => (
          <div
            key={i}
            className="flex h-16 w-28 shrink-0 items-center justify-center grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100"
          >
            {l.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={l.src}
                alt={l.alt}
                className="max-h-14 max-w-24 object-contain"
                loading="lazy"
              />
            ) : (
              /* placeholder kotak abu-abu */
              <span className="flex h-14 w-24 items-center justify-center rounded-xl bg-foreground/10 text-xs font-bold text-foreground/30">
                {l.alt || "Logo"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
