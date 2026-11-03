"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Icon } from "@/components/Icon/Icon";

type RailProps = { children: ReactNode };

const NAV_BUTTON = "grid size-13 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg";

/* Horizontal snap-scrolling row; the line beneath tracks how far along it is */
export const Rail = ({ children }: RailProps) => {
  const t = useTranslations("gallery");
  const railRef = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ width: 25, shift: 0 });

  const measure = () => {
    const rail = railRef.current;
    if (!rail) return;
    const visible = rail.clientWidth / rail.scrollWidth;
    const max = rail.scrollWidth - rail.clientWidth;
    setBar({ width: visible * 100, shift: max > 0 ? (rail.scrollLeft / max) * ((1 - visible) / visible) * 100 : 0 });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  const scroll = (direction: 1 | -1) => railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.8 });

  return (
    <>
      <div
        ref={railRef}
        onScroll={measure}
        className="grid snap-x snap-mandatory auto-cols-[74%] grid-flow-col gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] motion-reduce:scroll-auto md:auto-cols-[minmax(250px,calc((100%-3*24px)/4))] md:gap-6 *:snap-start"
      >
        {children}
      </div>
      <div className="mt-12 flex items-center gap-7">
        <div className="relative h-px flex-1 overflow-hidden bg-line-faint">
          <span className="absolute inset-y-0 left-0 bg-fg transition-[transform,width] duration-300" style={{ width: `${bar.width}%`, transform: `translateX(${bar.shift}%)` }} />
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label={t("previous")} onClick={() => scroll(-1)} className={NAV_BUTTON}>
            <Icon name="previous" />
          </button>
          <button type="button" aria-label={t("next")} onClick={() => scroll(1)} className={NAV_BUTTON}>
            <Icon name="next" />
          </button>
        </div>
      </div>
    </>
  );
};
