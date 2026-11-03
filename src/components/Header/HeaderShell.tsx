"use client";

import { useEffect, useState, type ReactNode } from "react";

import { usePathname } from "@/i18n/navigation";

/* Floats transparent over the home film, and turns solid once the page scrolls */
export const HeaderShell = ({ children }: { children: ReactNode }) => {
  const overHero = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 24);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  const position = overHero ? "fixed inset-x-0" : "sticky";
  const surface = overHero && !scrolled ? "border-transparent bg-linear-to-b from-[rgb(20_19_19/.55)] to-transparent" : "border-gold-faint bg-charcoal";

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={`group top-0 z-40 border-b text-ivory transition-[background-color,border-color] duration-500 ease-soft ${position} ${surface}`}
    >
      {children}
    </header>
  );
};
