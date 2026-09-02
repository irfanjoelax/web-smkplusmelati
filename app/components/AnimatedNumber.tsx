"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: string;
  duration?: number;
  className?: string;
};

export default function AnimatedNumber({
  value,
  duration = 1200,
  className = "",
}: AnimatedNumberProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const numberValue = match ? Number(match[1]) : null;
  const suffix = match?.[2] ?? "";
  const [display, setDisplay] = useState(numberValue ?? 0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (numberValue === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(eased * numberValue));
              if (progress < 1) {
                requestAnimationFrame(tick);
              }
            };
            requestAnimationFrame(tick);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [numberValue, duration]);

  return (
    <span ref={ref} className={className}>
      {numberValue === null ? value : display}
      {suffix}
    </span>
  );
}
