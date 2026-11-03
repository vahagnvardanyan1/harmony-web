"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

import { Icon } from "@/components/Icon/Icon";

import type { GalleryContent } from "./gallery-context";

type LightboxProps = { content: GalleryContent; onClose: () => void };

const ROUND_BUTTON = "absolute grid place-items-center rounded-full border border-ivory/30 transition-colors hover:border-gold hover:bg-ivory/10";

/* Full-screen swipeable carousel of one product's photos */
export const Lightbox = ({ content: { label, photos }, onClose }: LightboxProps) => {
  const t = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = photos.length;

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const track = () => {
    if (!trackRef.current) throw new Error("Lightbox track is not mounted");
    return trackRef.current;
  };
  const goTo = (index: number) => track().scrollTo({ left: index * track().clientWidth });
  const step = (direction: 1 | -1) => goTo(current + direction);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  /* A click on the dark area around a photo (the dialog or an empty slide) closes it */
  const onBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget || (event.target as HTMLElement).dataset.slide !== undefined) dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={onBackdropClick}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none animate-fade-in overflow-hidden bg-[rgb(20_19_19/.97)] p-0 text-ivory backdrop:bg-[rgb(20_19_19/.97)]"
    >
      <div
        ref={trackRef}
        onScroll={() => setCurrent(Math.round(track().scrollLeft / track().clientWidth))}
        className="grid h-full snap-x snap-mandatory auto-cols-[100%] grid-flow-col overflow-x-auto scroll-smooth [scrollbar-width:none] motion-reduce:scroll-auto"
      >
        {photos.map((src, index) => (
          <figure key={src} data-slide className="m-0 grid cursor-zoom-out snap-center place-items-center px-[clamp(16px,9vw,140px)] py-[clamp(64px,9vh,96px)]">
            <Image
              src={src}
              alt={`${label} — ${index + 1}/${total}`}
              width={1000}
              height={1333}
              sizes="(max-width: 700px) 100vw, 75vh"
              loading={index < 2 ? "eager" : "lazy"}
              className="h-auto max-h-[calc(100svh-2*clamp(64px,9vh,96px))] w-auto max-w-full cursor-default object-contain"
            />
          </figure>
        ))}
      </div>

      <button type="button" aria-label={t("chrome.close")} onClick={() => dialogRef.current?.close()} className={`${ROUND_BUTTON} right-5 top-5 size-13`}>
        <Icon name="close" />
      </button>

      {total > 1 ? (
        <>
          <button type="button" aria-label={t("gallery.previous")} onClick={() => step(-1)} className={`${ROUND_BUTTON} left-[clamp(12px,3vw,40px)] top-1/2 size-14 -translate-y-1/2 max-[700px]:hidden`}>
            <Icon name="previous" />
          </button>
          <button type="button" aria-label={t("gallery.next")} onClick={() => step(1)} className={`${ROUND_BUTTON} right-[clamp(12px,3vw,40px)] top-1/2 size-14 -translate-y-1/2 max-[700px]:hidden`}>
            <Icon name="next" />
          </button>
          <p aria-live="polite" className="absolute bottom-6 left-1/2 m-0 -translate-x-1/2 text-xs tracking-[.24em] text-on-dark-muted tabular-nums max-[700px]:hidden">
            {current + 1} / {total}
          </p>
          <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 gap-0.5 max-[700px]:flex">
            {photos.map((src, index) => (
              <button
                key={src}
                type="button"
                aria-label={`${index + 1} / ${total}`}
                aria-current={index === current}
                onClick={() => goTo(index)}
                className="group grid h-8 w-7 place-items-center"
              >
                <span className="block h-1.75 w-1.75 rounded bg-ivory/35 transition-all duration-300 group-aria-current:w-5 group-aria-current:bg-gold" />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </dialog>
  );
};
