"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Icon } from "@/components/Icon/Icon";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const FILMS = ["london-blue", "diamond-link", "rose"] as const;
type Film = (typeof FILMS)[number];

/* Phones show only the middle reel */
const PHONE_FILM: Film = "diamond-link";

type FilmHeroProps = { children: ReactNode };

/* Three vertical reels side by side (one on phones), with a pause control for WCAG 2.2.2 */
export const FilmHero = ({ children }: FilmHeroProps) => {
  const t = useTranslations("home");
  const videos = useRef<HTMLVideoElement[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState<ReadonlySet<Film>>(new Set());
  const paused = userPaused ?? prefersReducedMotion;

  useEffect(() => {
    for (const video of videos.current) {
      if (paused) video.pause();
      // Reels hidden by the layout are never started (and with preload="none" never fetched), so phones download one film instead of three
      else if (video.checkVisibility())
        // Autoplay can be refused (e.g. low-power mode); the poster stays, which is the intended fallback
        video.play().catch(() => video.pause());
    }
  }, [paused]);

  return (
    <section aria-labelledby="hero-title" className="band relative grid h-svh min-h-160 overflow-hidden md:grid-cols-3">
      {FILMS.map((film, index) => (
        <div key={film} className={`relative size-full ${film === PHONE_FILM ? "" : "hidden md:block"}`}>
          {/* The poster is a real image underneath; the film fades in over it only once frames are playing, so there is never a blank frame */}
          <Image
            src={`/video/${film}-poster.jpg`}
            alt=""
            fill
            loading="eager"
            fetchPriority={film === PHONE_FILM ? "high" : "auto"}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <video
            ref={(element) => {
              if (element) videos.current[index] = element;
            }}
            src={`/video/${film}.mp4`}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlaying={() => setPlaying((current) => new Set(current).add(film))}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${playing.has(film) ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[rgb(18_17_17/.85)] via-[rgb(18_17_17/.25)] to-[rgb(18_17_17/.35)]" />
      <div className="absolute inset-x-0 bottom-0 z-10 grid justify-items-center px-(--gutter) pb-[clamp(72px,10vh,120px)] text-center">{children}</div>
      <button
        type="button"
        aria-label={t(paused ? "playFilm" : "pauseFilm")}
        aria-pressed={paused}
        onClick={() => setUserPaused(!paused)}
        className="absolute bottom-8 right-(--gutter) z-20 grid size-11 place-items-center rounded-full border border-ivory/35 text-ivory"
      >
        <Icon name={paused ? "play" : "pause"} />
      </button>
    </section>
  );
};
