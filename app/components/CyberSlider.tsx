"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

type CyberSliderProps = {
  children: ReactNode;
  totalItems: number;
  className?: string;
};

export default function CyberSlider({
  children,
  totalItems,
  className = "",
}: CyberSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const isLeft = el.scrollLeft > 15;
      const isRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 15;
      setCanScrollLeft(isLeft);
      setCanScrollRight(isRight);

      if (totalItems > 0) {
        const scrollFraction = el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth);
        const currentIndex = Math.min(
          totalItems - 1,
          Math.max(0, Math.round(scrollFraction * (totalItems - 1)))
        );
        setActiveIndex(currentIndex);
      }
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [totalItems]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
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

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  // Keyboard Arrow Navigation for WCAG AA
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroll("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scroll("right");
    }
  };

  return (
    <div
      className={`group/slider relative w-full ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Galeri geser interaktif"
    >
      {/* Floating Left Button */}
      <button
        type="button"
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="Geser ke slide sebelumnya"
        className={`absolute -left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/80 bg-white/95 text-primary-dark shadow-[0_8px_25px_rgba(16,112,176,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:-left-6 ${
          canScrollLeft ? "opacity-95 group-hover/slider:opacity-100" : "opacity-0"
        }`}
      >
        <svg
          className="h-5 w-5 transition-transform group-hover/slider:-translate-x-0.5"
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
        aria-label="Geser ke slide berikutnya"
        className={`absolute -right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/80 bg-white/95 text-primary-dark shadow-[0_8px_25px_rgba(16,112,176,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:-right-6 ${
          canScrollRight ? "opacity-95 group-hover/slider:opacity-100" : "opacity-0"
        }`}
      >
        <svg
          className="h-5 w-5 transition-transform group-hover/slider:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Horizontal Scrollable/Draggable Track */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 pt-1 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      {/* Futuristic Interactive Pagination Dots */}
      {totalItems > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2.5">
          {Array.from({ length: totalItems }).map((_, idx) => (
            <button
              key={`dot-${idx}`}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Lihat slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeIndex === idx
                  ? "w-8 bg-accent shadow-[0_0_12px_rgba(245,179,1,0.8)]"
                  : "w-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
