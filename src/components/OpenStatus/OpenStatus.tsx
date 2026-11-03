"use client";

import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";

import { isOpenAt } from "@/lib/opening-hours";

const subscribe = (onChange: () => void) => {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
};

/* Depends on the visitor's clock, so it renders only in the browser — the server leaves an empty line of the same height */
export const OpenStatus = () => {
  const t = useTranslations("contact");
  const isOpen = useSyncExternalStore<boolean | null>(subscribe, () => isOpenAt(new Date()), () => null);
  const tone = isOpen ? "text-open" : "text-closed";

  return (
    <p className={`mt-5 inline-flex min-h-5 items-center gap-2.5 text-xs font-semibold uppercase tracking-[.14em] ${isOpen === null ? "" : tone}`}>
      {isOpen === null ? null : (
        <>
          <span aria-hidden="true" className="size-1.75 rounded-full bg-current shadow-[0_0_0_4px_color-mix(in_srgb,currentColor_20%,transparent)]" />
          {t(isOpen ? "openNow" : "closedNow")}
        </>
      )}
    </p>
  );
};
