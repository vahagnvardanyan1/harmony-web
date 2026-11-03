"use client";

import { useState, type ReactNode } from "react";

import { GalleryContext, type GalleryContent } from "./gallery-context";
import { Lightbox } from "./Lightbox";

/* One shared pop-up for the whole page; any product card can fill and open it */
export const GalleryProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<GalleryContent | null>(null);

  return (
    <GalleryContext value={setContent}>
      {children}
      {content ? <Lightbox content={content} onClose={() => setContent(null)} /> : null}
    </GalleryContext>
  );
};
