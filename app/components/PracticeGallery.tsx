"use client";

import { useRef, useState, useEffect, Children, type ReactNode } from "react";

type PracticeGalleryProps = {
  title?: string;
  subtitle?: string;
  totalItems?: number;
  children: ReactNode;
};

export default function PracticeGallery({
  title = "Dokumentasi Kegiatan Praktik",
  subtitle = "Suasana belajar dan praktik kejuruan siswa di bengkel dan laboratorium.",
  totalItems,
  children,
}: PracticeGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const count = totalItems ?? Children.count(children);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isLeft = el.scrollLeft > 15;
    const isRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 15;
    setCanScrollLeft(isLeft);
    setCanScrollRight(isRight);

    // Calculate approximate active item
    const childrenCount = el.children.length;
    if (childrenCount > 0) {
      const scrollFraction = el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth);
      const currentIndex = Math.min(
        childrenCount - 1,
        Math.max(0, Math.round(scrollFraction * (childrenCount - 1))),
      );
      setActiveIndex(currentIndex);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const scrollAmount = firstChild ? firstChild.offsetWidth + 20 : el.clientWidth;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el || !el.children[index]) return;
    const targetChild = el.children[index] as HTMLElement;
    el.scrollTo({
      left: targetChild.offsetLeft - el.offsetLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <span className="clay-chip-gold mb-2 inline-flex">Galeri Praktik</span>
        <h2 className="text-2xl font-extrabold text-primary-dark sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
          {subtitle}
        </p>
      </div>

      {/* Carousel Container with Overlaid Modern Controls */}
      <div className="group/gallery relative">
        {/* Floating Left Button */}
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Gulir ke kiri"
          className={`absolute -left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/90 bg-white/90 text-primary-dark shadow-[0_8px_25px_rgba(16,112,176,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-0 sm:-left-5 ${
            canScrollLeft ? "opacity-90 sm:opacity-80 group-hover/gallery:opacity-100" : "opacity-0"
          }`}
        >
          <svg
            className="h-5 w-5 transition-transform group-hover/gallery:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Floating Right Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Gulir ke kanan"
          className={`absolute -right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/90 bg-white/90 text-primary-dark shadow-[0_8px_25px_rgba(16,112,176,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-0 sm:-right-5 ${
            canScrollRight ? "opacity-90 sm:opacity-80 group-hover/gallery:opacity-100" : "opacity-0"
          }`}
        >
          <svg
            className="h-5 w-5 transition-transform group-hover/gallery:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 pt-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
      </div>

      {/* Pagination Dots (Mobile & Tablet interactive dots) */}
      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, idx) => (
            <button
              key={`dot-${idx}`}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Lihat foto praktik ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-7 bg-accent shadow-sm"
                  : "w-2 bg-primary-dark/20 hover:bg-primary-dark/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
