"use client";

import type { TestimoniOrtuItem } from "@/app/lib/types";

export default function TestimonialMarquee({
  testimonials,
}: {
  testimonials: TestimoniOrtuItem[];
}) {
  if (!testimonials || testimonials.length === 0) return null;

  // Pastikan ada cukup item agar loop seamless
  let repeated = [...testimonials];
  while (repeated.length < 6) {
    repeated = [...repeated, ...testimonials];
  }
  const displayItems = [...repeated, ...repeated];

  return (
    <div className="marquee-wrap overflow-hidden py-2">
      <div className="marquee-track-slow flex w-max items-start gap-6">
        {displayItems.map((item, index) => (
          <figure
            key={`${item.text}-${index}`}
            className="clay-inset-blue w-[300px] shrink-0 rounded-2xl p-6 sm:w-[360px]"
          >
            <blockquote className="whitespace-pre-wrap [overflow-wrap:anywhere] text-sm leading-relaxed text-white/90">
              {item.text}
            </blockquote>
          </figure>
        ))}
      </div>
    </div>
  );
}
